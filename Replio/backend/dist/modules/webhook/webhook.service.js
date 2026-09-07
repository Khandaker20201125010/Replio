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
const prisma_1 = __importDefault(require("../../config/prisma"));
const logger_1 = require("../../utils/logger");
const env_1 = require("../../config/env");
const comment_service_1 = require("../comments/comment.service");
function verifyWebhook(mode, token, challenge) {
    return __awaiter(this, void 0, void 0, function* () {
        if (mode === "subscribe" && token === env_1.env.META_WEBHOOK_VERIFY_TOKEN) {
            return challenge;
        }
        throw new Error("Invalid webhook verification");
    });
}
function processWebhookEvent(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.logger.info({ payload }, "Processing webhook event");
        if (!payload.entry || !Array.isArray(payload.entry)) {
            logger_1.logger.warn("Invalid webhook payload structure");
            return;
        }
        for (const entry of payload.entry) {
            if (!entry.changes || !Array.isArray(entry.changes)) {
                continue;
            }
            for (const change of entry.changes) {
                if (change.field === "comments" && change.value) {
                    yield handleCommentEvent(change.value);
                }
            }
        }
    });
}
function handleCommentEvent(event) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { comment_id, post_id, message, from, verb } = event;
            // Only process new comments
            if (verb !== "add") {
                logger_1.logger.info({ comment_id, verb }, "Ignoring non-add comment event");
                return;
            }
            // Extract page ID from post_id
            const pageId = post_id.split("_")[0];
            // Find connected page
            const facebookPage = yield prisma_1.default.facebookPage.findFirst({
                where: {
                    pageId,
                    isConnected: true,
                },
            });
            if (!facebookPage) {
                logger_1.logger.warn({ pageId }, "No connected page found for webhook event");
                return;
            }
            // Check for duplicate comment
            const existingComment = yield prisma_1.default.comment.findFirst({
                where: {
                    commentId: comment_id,
                },
            });
            if (existingComment) {
                logger_1.logger.info({ comment_id }, "Comment already exists, skipping");
                return;
            }
            // Create comment record
            const comment = yield prisma_1.default.comment.create({
                data: {
                    commentId: comment_id,
                    facebookPageId: facebookPage.id,
                    postId: post_id,
                    userId: from.id,
                    userName: from.name,
                    userMessage: message,
                    status: "PENDING",
                    createdTime: new Date(),
                },
            });
            logger_1.logger.info({ commentId: comment.id, facebookCommentId: comment_id }, "Comment created from webhook");
            // Trigger comment processing asynchronously
            // In production, this should use a job queue
            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield (0, comment_service_1.processComment)(comment.id);
                }
                catch (error) {
                    logger_1.logger.error({ error, commentId: comment.id }, "Async comment processing failed");
                }
            }), 0);
        }
        catch (error) {
            logger_1.logger.error({ error, event }, "Failed to handle comment event");
        }
    });
}
//# sourceMappingURL=webhook.service.js.map