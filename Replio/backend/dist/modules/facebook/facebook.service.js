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
exports.getUserPages = getUserPages;
exports.verifyPage = verifyPage;
exports.connectPage = connectPage;
exports.disconnectPage = disconnectPage;
exports.getUserConnectedPages = getUserConnectedPages;
exports.getPageById = getPageById;
const axios_1 = __importDefault(require("axios"));
const prisma_1 = __importDefault(require("../../config/prisma"));
const env_1 = require("../../config/env");
const errors_1 = require("../../utils/errors");
const logger_1 = require("../../utils/logger");
function getOAuthUrl() {
    const scope = "pages_manage_engagement,pages_manage_posts,pages_read_engagement";
    return `https://www.facebook.com/v18.0/dialog/oauth?client_id=${env_1.env.META_APP_ID}&redirect_uri=${encodeURIComponent(env_1.env.META_REDIRECT_URI)}&scope=${scope}&response_type=code`;
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
        // Check if page is already connected by this user
        const existingPage = yield prisma_1.default.facebookPage.findFirst({
            where: {
                userId,
                pageId,
            },
        });
        if (existingPage) {
            // Update existing page
            return yield prisma_1.default.facebookPage.update({
                where: { id: existingPage.id },
                data: {
                    pageName,
                    pageAccessToken,
                    isConnected: true,
                },
            });
        }
        // Create new page connection
        const page = yield prisma_1.default.facebookPage.create({
            data: {
                userId,
                pageId,
                pageName,
                pageAccessToken,
                isConnected: true,
            },
        });
        logger_1.logger.info({ userId, pageId }, "Facebook page connected successfully");
        return page;
    });
}
function disconnectPage(userId, pageId) {
    return __awaiter(this, void 0, void 0, function* () {
        const page = yield prisma_1.default.facebookPage.findFirst({
            where: {
                userId,
                pageId,
            },
        });
        if (!page) {
            throw new errors_1.NotFoundError("Page not found");
        }
        yield prisma_1.default.facebookPage.update({
            where: { id: page.id },
            data: {
                isConnected: false,
            },
        });
        logger_1.logger.info({ userId, pageId }, "Facebook page disconnected successfully");
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
function getPageById(userId, pageId) {
    return __awaiter(this, void 0, void 0, function* () {
        const page = yield prisma_1.default.facebookPage.findFirst({
            where: {
                userId,
                pageId,
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