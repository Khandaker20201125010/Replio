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
exports.getOAuthUrl = getOAuthUrl;
exports.exchangeCodeForToken = exchangeCodeForToken;
exports.getLongLivedUserToken = getLongLivedUserToken;
exports.getUserPages = getUserPages;
exports.verifyPage = verifyPage;
exports.connectPage = connectPage;
exports.subscribePageToWebhooks = subscribePageToWebhooks;
exports.getPageWebhookSubscription = getPageWebhookSubscription;
exports.getAppWebhookSubscriptions = getAppWebhookSubscriptions;
exports.resubscribePage = resubscribePage;
exports.disconnectPage = disconnectPage;
exports.getUserConnectedPages = getUserConnectedPages;
exports.getPageById = getPageById;
const axios_1 = __importDefault(require("axios"));
const prisma_1 = __importDefault(require("../../config/prisma"));
const env_1 = require("../../config/env");
const errors_1 = require("../../utils/errors");
const logger_1 = require("../../utils/logger");
function getOAuthUrl(state) {
    const scope = env_1.env.META_OAUTH_SCOPES ||
        "pages_show_list,pages_read_engagement,pages_manage_posts,pages_manage_engagement,pages_manage_metadata,pages_read_user_content";
    if (!env_1.env.META_APP_ID || !env_1.env.META_REDIRECT_URI) {
        throw new Error("META_APP_ID and META_REDIRECT_URI must be configured");
    }
    const redirectUri = env_1.env.META_REDIRECT_URI;
    logger_1.logger.info({ redirectUri, metaAppId: env_1.env.META_APP_ID }, "Generating Facebook OAuth URL");
    let url = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${env_1.env.META_APP_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}&response_type=code&auth_type=rerequest`;
    if (state) {
        url += `&state=${encodeURIComponent(state)}`;
    }
    return url;
}
function exchangeCodeForToken(code) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get("https://graph.facebook.com/v18.0/oauth/access_token", {
                params: {
                    client_id: env_1.env.META_APP_ID,
                    client_secret: env_1.env.META_APP_SECRET,
                    redirect_uri: env_1.env.META_REDIRECT_URI,
                    code,
                },
            });
            if (!response.data.access_token) {
                throw new errors_1.ExternalAPIError("Failed to exchange code for token", "facebook");
            }
            return response.data.access_token;
        }
        catch (error) {
            logger_1.logger.error({ error }, "Facebook token exchange failed");
            throw new errors_1.ExternalAPIError("Failed to exchange code for token", "facebook");
        }
    });
}
function getLongLivedUserToken(shortLivedToken) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const response = yield axios_1.default.get("https://graph.facebook.com/v18.0/oauth/access_token", {
                params: {
                    grant_type: "fb_exchange_token",
                    client_id: env_1.env.META_APP_ID,
                    client_secret: env_1.env.META_APP_SECRET,
                    fb_exchange_token: shortLivedToken,
                },
            });
            if ((_a = response.data) === null || _a === void 0 ? void 0 : _a.access_token) {
                logger_1.logger.info("Successfully exchanged short-lived token for long-lived user token");
                return response.data.access_token;
            }
            return shortLivedToken;
        }
        catch (error) {
            logger_1.logger.warn({ error }, "Failed to exchange for long-lived token, falling back to short-lived token");
            return shortLivedToken;
        }
    });
}
function getUserPages(userAccessToken) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get("https://graph.facebook.com/v18.0/me/accounts", {
                params: {
                    access_token: userAccessToken,
                },
            });
            return response.data;
        }
        catch (error) {
            logger_1.logger.error({ error }, "Facebook pages fetch failed");
            throw new errors_1.ExternalAPIError("Failed to fetch user pages", "facebook");
        }
    });
}
function verifyPage(pageId, pageAccessToken) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get(`https://graph.facebook.com/v18.0/${pageId}`, {
                params: {
                    fields: "id,name,category,picture",
                    access_token: pageAccessToken,
                },
            });
            return response.data;
        }
        catch (error) {
            logger_1.logger.error({ error, pageId }, "Facebook page verification failed");
            throw new errors_1.ExternalAPIError("Failed to verify page", "facebook");
        }
    });
}
function connectPage(userId, pageId, pageName, pageAccessToken) {
    return __awaiter(this, void 0, void 0, function* () {
        // Check if page is already connected by this user or exists
        const existingPage = yield prisma_1.default.facebookPage.findUnique({
            where: {
                pageId,
            },
        });
        let page;
        if (existingPage) {
            // Update existing page
            page = yield prisma_1.default.facebookPage.update({
                where: { id: existingPage.id },
                data: {
                    userId,
                    pageName,
                    pageAccessToken,
                    isConnected: true,
                },
            });
        }
        else {
            // Create new page connection
            page = yield prisma_1.default.facebookPage.create({
                data: {
                    userId,
                    pageId,
                    pageName,
                    pageAccessToken,
                    isConnected: true,
                },
            });
        }
        // Subscribe page to app webhooks for comments
        yield subscribePageToWebhooks(pageId, pageAccessToken);
        logger_1.logger.info({ userId, pageId }, "Facebook page connected successfully");
        return page;
    });
}
function subscribePageToWebhooks(pageId, pageAccessToken) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d;
        try {
            const response = yield axios_1.default.post(`https://graph.facebook.com/v18.0/${pageId}/subscribed_apps`, null, {
                params: {
                    subscribed_fields: "feed",
                    access_token: pageAccessToken,
                },
            });
            logger_1.logger.info({ pageId, data: response.data }, "Facebook page subscribed to webhooks successfully");
            return { success: true, data: response.data };
        }
        catch (subErr) {
            const errorMsg = ((_c = (_b = (_a = subErr === null || subErr === void 0 ? void 0 : subErr.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.error) === null || _c === void 0 ? void 0 : _c.message) ||
                (subErr === null || subErr === void 0 ? void 0 : subErr.message) ||
                "Unknown error";
            logger_1.logger.warn({ pageId, error: ((_d = subErr === null || subErr === void 0 ? void 0 : subErr.response) === null || _d === void 0 ? void 0 : _d.data) || (subErr === null || subErr === void 0 ? void 0 : subErr.message) }, "Failed to subscribe page to webhooks");
            return { success: false, error: errorMsg };
        }
    });
}
function getPageWebhookSubscription(pageId, pageAccessToken) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d;
        var _e;
        try {
            const response = yield axios_1.default.get(`https://graph.facebook.com/v18.0/${pageId}/subscribed_apps`, {
                params: { access_token: pageAccessToken },
            });
            const apps = (_e = (_a = response.data) === null || _a === void 0 ? void 0 : _a.data) !== null && _e !== void 0 ? _e : [];
            const fields = apps.flatMap((app) => { var _a; return (_a = app.subscribed_fields) !== null && _a !== void 0 ? _a : []; });
            return { subscribed: apps.length > 0, fields };
        }
        catch (error) {
            return {
                subscribed: false,
                fields: [],
                error: ((_d = (_c = (_b = error === null || error === void 0 ? void 0 : error.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.error) === null || _d === void 0 ? void 0 : _d.message) ||
                    (error === null || error === void 0 ? void 0 : error.message) ||
                    "Unknown error",
            };
        }
    });
}
function getAppWebhookSubscriptions() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d;
        var _e, _f;
        if (!env_1.env.META_APP_ID || !env_1.env.META_APP_SECRET) {
            return {
                configured: false,
                pageFields: [],
                error: "META_APP_ID / META_APP_SECRET are not configured",
            };
        }
        try {
            const response = yield axios_1.default.get(`https://graph.facebook.com/v18.0/${env_1.env.META_APP_ID}/subscriptions`, {
                params: {
                    access_token: `${env_1.env.META_APP_ID}|${env_1.env.META_APP_SECRET}`,
                },
            });
            const pageSubscription = ((_e = (_a = response.data) === null || _a === void 0 ? void 0 : _a.data) !== null && _e !== void 0 ? _e : []).find((sub) => sub.object === "page");
            return {
                configured: Boolean(pageSubscription),
                pageFields: ((_f = pageSubscription === null || pageSubscription === void 0 ? void 0 : pageSubscription.fields) !== null && _f !== void 0 ? _f : []).map((f) => typeof f === "string" ? f : f.name),
                callbackUrl: pageSubscription === null || pageSubscription === void 0 ? void 0 : pageSubscription.callback_url,
            };
        }
        catch (error) {
            return {
                configured: false,
                pageFields: [],
                error: ((_d = (_c = (_b = error === null || error === void 0 ? void 0 : error.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.error) === null || _d === void 0 ? void 0 : _d.message) ||
                    (error === null || error === void 0 ? void 0 : error.message) ||
                    "Unknown error",
            };
        }
    });
}
function resubscribePage(userId, pageIdOrId) {
    return __awaiter(this, void 0, void 0, function* () {
        const page = yield prisma_1.default.facebookPage.findFirst({
            where: {
                userId,
                OR: [{ id: pageIdOrId }, { pageId: pageIdOrId }],
                isConnected: true,
            },
        });
        if (!page) {
            throw new errors_1.NotFoundError("Connected page not found");
        }
        const result = yield subscribePageToWebhooks(page.pageId, page.pageAccessToken);
        return Object.assign({ pageId: page.pageId, pageName: page.pageName }, result);
    });
}
function disconnectPage(userId, pageIdOrId) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const page = yield prisma_1.default.facebookPage.findFirst({
            where: {
                userId,
                OR: [{ id: pageIdOrId }, { pageId: pageIdOrId }],
            },
        });
        if (!page) {
            throw new errors_1.NotFoundError("Page not found");
        }
        // Attempt to unsubscribe page from app webhooks on Meta
        try {
            yield axios_1.default.delete(`https://graph.facebook.com/v18.0/${page.pageId}/subscribed_apps`, {
                params: {
                    access_token: page.pageAccessToken,
                },
            });
            logger_1.logger.info({ pageId: page.pageId }, "Unsubscribed page from webhooks on Meta");
        }
        catch (subErr) {
            logger_1.logger.warn({ pageId: page.pageId, error: ((_a = subErr === null || subErr === void 0 ? void 0 : subErr.response) === null || _a === void 0 ? void 0 : _a.data) || (subErr === null || subErr === void 0 ? void 0 : subErr.message) }, "Could not unsubscribe page from webhooks on Meta (token may be expired or already revoked)");
        }
        yield prisma_1.default.facebookPage.update({
            where: { id: page.id },
            data: {
                isConnected: false,
            },
        });
        logger_1.logger.info({ userId, pageId: page.pageId }, "Facebook page disconnected successfully");
    });
}
function getUserConnectedPages(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma_1.default.facebookPage.findMany({
            where: {
                userId,
                isConnected: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    });
}
function getPageById(userId, pageIdOrId) {
    return __awaiter(this, void 0, void 0, function* () {
        const page = yield prisma_1.default.facebookPage.findFirst({
            where: {
                userId,
                OR: [{ id: pageIdOrId }, { pageId: pageIdOrId }],
                isConnected: true,
            },
        });
        if (!page) {
            throw new errors_1.NotFoundError("Page not found");
        }
        return page;
    });
}
//# sourceMappingURL=facebook.service.js.map