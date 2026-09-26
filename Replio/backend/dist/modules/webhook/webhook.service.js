"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyWebhook = verifyWebhook;
exports.processWebhookEvent = processWebhookEvent;
exports.getWebhookDiagnostics = getWebhookDiagnostics;
const prisma_1 = __importDefault(require("../../config/prisma"));
const logger_1 = require("../../utils/logger");
const env_1 = require("../../config/env");
const comment_service_1 = require("../comments/comment.service");
const facebook_service_1 = require("../facebook/facebook.service");
function verifyWebhook(mode, token, challenge) {
    return __awaiter(this, void 0, void 0, function* () {
        if (mode === "subscribe" && token === env_1.env.META_WEBHOOK_VERIFY_TOKEN) {
            return challenge;
        }
        throw new Error("Invalid webhook verification");
    });
}
function recordEvent(data) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f;
        try {
            yield prisma_1.default.webhookEvent.create({
                data: {
                    source: "facebook",
                    objectType: (_a = data.objectType) !== null && _a !== void 0 ? _a : null,
                    pageId: data.pageId ? String(data.pageId) : null,
                    field: (_b = data.field) !== null && _b !== void 0 ? _b : null,
                    verb: (_c = data.verb) !== null && _c !== void 0 ? _c : null,
                    commentId: data.commentId ? String(data.commentId) : null,
                    payload: (_d = data.payload) !== null && _d !== void 0 ? _d : {},
                    status: data.status,
                    reason: (_e = data.reason) !== null && _e !== void 0 ? _e : null,
                    error: (_f = data.error) !== null && _f !== void 0 ? _f : null,
                },
            });
        }
        catch (error) {
            logger_1.logger.error({ error }, "Failed to persist webhook event");
        }
    });
}
function processWebhookEvent(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.logger.info({ payload }, "Processing webhook event");
        if (!payload || !payload.entry || !Array.isArray(payload.entry)) {
            logger_1.logger.warn("Invalid webhook payload structure");
            yield recordEvent({
                objectType: payload === null || payload === void 0 ? void 0 : payload.object,
                payload,
                status: "IGNORED",
                reason: "Invalid webhook payload structure (no entry array)",
            });
            return;
        }
        for (const entry of payload.entry) {
            if (!entry.changes || !Array.isArray(entry.changes)) {
                yield recordEvent({
                    objectType: payload === null || payload === void 0 ? void 0 : payload.object,
                    pageId: entry === null || entry === void 0 ? void 0 : entry.id,
                    payload: entry,
                    status: "IGNORED",
                    reason: "Entry has no changes array",
                });
                continue;
            }
            const entryPageId = entry.id;
            for (const change of entry.changes) {
                if ((change.field === "feed" || change.field === "comments") &&
                    change.value) {
                    // If feed event, only ignore if it's definitely not a comment (no comment_id and item is not comment)
                    if (change.field === "feed" &&
                        change.value.item &&
                        change.value.item !== "comment" &&
                        !change.value.comment_id) {
                        logger_1.logger.info({ item: change.value.item }, "Ignoring non-comment feed item");
                        yield recordEvent({
                            objectType: payload === null || payload === void 0 ? void 0 : payload.object,
                            pageId: entryPageId,
                            field: change.field,
                            verb: change.value.verb,
                            payload: change,
                            status: "IGNORED",
                            reason: `Non-comment feed item: ${change.value.item}`,
                        });
                        continue;
                    }
                    yield handleCommentEvent(change.value, entryPageId, change.field, payload === null || payload === void 0 ? void 0 : payload.object);
                }
                else {
                    yield recordEvent({
                        objectType: payload === null || payload === void 0 ? void 0 : payload.object,
                        pageId: entryPageId,
                        field: change.field,
                        payload: change,
                        status: "IGNORED",
                        reason: `Unhandled webhook field: ${change.field}`,
                    });
                }
            }
        }
    });
}
function handleCommentEvent(event, entryPageId, field, objectType) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        var _b, _c;
        const comment_id = (event === null || event === void 0 ? void 0 : event.comment_id) || (event === null || event === void 0 ? void 0 : event.id);
        const verb = (event === null || event === void 0 ? void 0 : event.verb) || "add";
        const record = (status, reason, error) => recordEvent({
            objectType,
            pageId: entryPageId,
            field,
            verb,
            commentId: comment_id,
            payload: event,
            status,
            reason,
            error,
        });
        try {
            const post_id = event.post_id || ((_a = event.post) === null || _a === void 0 ? void 0 : _a.id);
            const message = event.message;
            const from = event.from;
            // Only process new comments
            if (verb !== "add") {
                logger_1.logger.info({ comment_id, verb }, "Ignoring non-add comment event");
                yield record("IGNORED", `Comment event verb is "${verb}", not "add"`);
                return;
            }
            if (!message || !comment_id) {
                logger_1.logger.info({ event }, "Missing comment_id or message, skipping");
                yield record("IGNORED", "Missing comment_id or message in payload");
                return;
            }
            // Extract page ID from entryPageId, post_id, or comment_id
            let pageId = entryPageId;
            if (!pageId && post_id) {
                pageId = post_id.split("_")[0];
            }
            // Find connected page
            let facebookPage = null;
            if (pageId) {
                facebookPage = yield prisma_1.default.facebookPage.findFirst({
                    where: {
                        pageId: String(pageId),
                        isConnected: true,
                    },
                });
            }
            // Fallback: extract page ID prefix from post_id if not found yet
            if (!facebookPage && post_id && post_id.includes("_")) {
                const extractedPageId = post_id.split("_")[0];
                facebookPage = yield prisma_1.default.facebookPage.findFirst({
                    where: {
                        pageId: String(extractedPageId),
                        isConnected: true,
                    },
                });
            }
            // Fallback: extract page ID prefix from comment_id if not found yet
            if (!facebookPage && comment_id && comment_id.includes("_")) {
                const extractedPageId = comment_id.split("_")[0];
                facebookPage = yield prisma_1.default.facebookPage.findFirst({
                    where: {
                        pageId: String(extractedPageId),
                        isConnected: true,
                    },
                });
            }
            if (!facebookPage) {
                logger_1.logger.warn({ pageId, entryPageId, post_id, comment_id }, "No connected page found for webhook event");
                yield record("ERROR", `No connected page found for page id ${pageId !== null && pageId !== void 0 ? pageId : "unknown"} — connect the page in the dashboard`);
                return;
            }
            // CRITICAL: Ignore comments made by the Page itself (prevents infinite reply loop!)
            if (from && String(from.id) === String(facebookPage.pageId)) {
                logger_1.logger.info({ comment_id, pageId: facebookPage.pageId }, "Ignoring comment made by the Page itself");
                yield record("IGNORED", "Comment authored by the Page itself");
                return;
            }
            const comment = yield (0, comment_service_1.storeNewComment)({
                commentId: comment_id,
                facebookPageId: facebookPage.id,
                postId: post_id || `${facebookPage.pageId}_unknown`,
                authorId: (_b = from === null || from === void 0 ? void 0 : from.id) !== null && _b !== void 0 ? _b : null,
                authorName: (_c = from === null || from === void 0 ? void 0 : from.name) !== null && _c !== void 0 ? _c : null,
                message,
                createdTime: event.created_time
                    ? new Date(Number(event.created_time) * 1000)
                    : new Date(),
            });
            if (!comment) {
                logger_1.logger.info({ comment_id }, "Comment already exists, skipping");
                yield record("IGNORED", "Comment already stored");
                return;
            }
            logger_1.logger.info({ commentId: comment.id, facebookCommentId: comment_id }, "Comment created from webhook");
            // Process comment immediately so it is not killed on serverless runtimes
            try {
                yield (0, comment_service_1.processComment)(comment.id);
                yield record("PROCESSED");
            }
            catch (error) {
                logger_1.logger.error({ error, commentId: comment.id }, "Comment processing failed");
                yield record("ERROR", "Comment stored but AI processing failed", error instanceof Error ? error.message : String(error));
            }
        }
        catch (error) {
            logger_1.logger.error({ error, event }, "Failed to handle comment event");
            yield record("ERROR", "Unhandled error while handling comment event", error instanceof Error ? error.message : String(error));
        }
    });
}
function getWebhookDiagnostics(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const pages = yield prisma_1.default.facebookPage.findMany({
            where: { userId, isConnected: true },
        });
        const pageDiagnostics = yield Promise.all(pages.map((page) => __awaiter(this, void 0, void 0, function* () {
            return ({
                pageId: page.pageId,
                pageName: page.pageName,
                commentCount: yield prisma_1.default.comment.count({
                    where: { facebookPageId: page.id },
                }),
                subscription: yield (0, facebook_service_1.getPageWebhookSubscription)(page.pageId, page.pageAccessToken),
            });
        })));
        const [recentEvents, aiSettings, lastComment] = yield Promise.all([
            prisma_1.default.webhookEvent.findMany({
                orderBy: { createdAt: "desc" },
                take: 20,
            }),
            prisma_1.default.aISettings.findUnique({ where: { userId } }),
            prisma_1.default.comment.findFirst({
                where: { facebookPage: { userId } },
                orderBy: { createdAt: "desc" },
                select: { createdAt: true, userMessage: true, status: true },
            }),
        ]);
        return {
            config: {
                verifyTokenConfigured: Boolean(env_1.env.META_WEBHOOK_VERIFY_TOKEN),
                appIdConfigured: Boolean(env_1.env.META_APP_ID),
                appSecretConfigured: Boolean(env_1.env.META_APP_SECRET),
                aiEnabled: aiSettings ? aiSettings.status === "ACTIVE" : true,
                humanApprovalMode: (_a = aiSettings === null || aiSettings === void 0 ? void 0 : aiSettings.humanApprovalMode) !== null && _a !== void 0 ? _a : false,
            },
            appSubscriptions: yield (0, facebook_service_1.getAppWebhookSubscriptions)(),
            pages: pageDiagnostics,
            lastComment,
            recentEvents,
        };
    });
}
//# sourceMappingURL=webhook.service.js.map