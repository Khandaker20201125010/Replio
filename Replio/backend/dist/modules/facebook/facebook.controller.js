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
Object.defineProperty(exports, "__esModule", { value: true });
exports.initiateOAuthController = initiateOAuthController;
exports.oauthCallbackController = oauthCallbackController;
exports.connectPageController = connectPageController;
exports.disconnectPageController = disconnectPageController;
exports.getConnectedPagesController = getConnectedPagesController;
exports.getPageController = getPageController;
const facebook_service_1 = require("./facebook.service");
const logger_1 = require("../../utils/logger");
const env_1 = require("../../config/env");
function initiateOAuthController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const oauthUrl = (0, facebook_service_1.getOAuthUrl)();
            res.redirect(oauthUrl);
        }
        catch (error) {
            logger_1.logger.error({ error }, "OAuth initiation failed");
            throw error;
        }
    });
}
function oauthCallbackController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { code, error } = req.query;
            if (error) {
                logger_1.logger.error({ error }, "OAuth callback error");
                res.redirect(`${env_1.env.FRONTEND_URL}/login?error=oauth_failed`);
                return;
            }
            if (!code || typeof code !== "string") {
                throw new Error("Invalid authorization code");
            }
            // Exchange code for user access token
            const userAccessToken = yield (0, facebook_service_1.exchangeCodeForToken)(code);
            // Get user's Facebook pages
            const pagesResponse = yield (0, facebook_service_1.getUserPages)(userAccessToken);
            res.status(200).json({
                success: true,
                data: {
                    pages: pagesResponse.data,
                    userAccessToken,
                },
            });
        }
        catch (error) {
            logger_1.logger.error({ error }, "OAuth callback failed");
            throw error;
        }
    });
}
function connectPageController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.user.userId;
            const { pageId, pageName, accessToken } = req.body;
            // Verify page with Facebook
            yield (0, facebook_service_1.verifyPage)(pageId, accessToken);
            // Connect page in database
            const page = yield (0, facebook_service_1.connectPage)(userId, pageId, pageName, accessToken);
            res.status(200).json({
                success: true,
                data: {
                    page: {
                        id: page.id,
                        pageId: page.pageId,
                        pageName: page.pageName,
                        isConnected: page.isConnected,
                    },
                },
            });
        }
        catch (error) {
            logger_1.logger.error({ error }, "Page connection failed");
            throw error;
        }
    });
}
function disconnectPageController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.user.userId;
            const { pageId } = req.params;
            if (Array.isArray(pageId)) {
                throw new Error("Invalid page ID");
            }
            yield (0, facebook_service_1.disconnectPage)(userId, pageId);
            res.status(200).json({
                success: true,
                message: "Page disconnected successfully",
            });
        }
        catch (error) {
            logger_1.logger.error({ error }, "Page disconnection failed");
            throw error;
        }
    });
}
function getConnectedPagesController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.user.userId;
            const pages = yield (0, facebook_service_1.getUserConnectedPages)(userId);
            res.status(200).json({
                success: true,
                data: {
                    pages: pages.map((page) => ({
                        id: page.id,
                        pageId: page.pageId,
                        pageName: page.pageName,
                        isConnected: page.isConnected,
                        createdAt: page.createdAt,
                    })),
                },
            });
        }
        catch (error) {
            logger_1.logger.error({ error }, "Get connected pages failed");
            throw error;
        }
    });
}
function getPageController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.user.userId;
            const { pageId } = req.params;
            if (Array.isArray(pageId)) {
                throw new Error("Invalid page ID");
            }
            const page = yield (0, facebook_service_1.getPageById)(userId, pageId);
            res.status(200).json({
                success: true,
                data: {
                    page: {
                        id: page.id,
                        pageId: page.pageId,
                        pageName: page.pageName,
                        isConnected: page.isConnected,
                        createdAt: page.createdAt,
                    },
                },
            });
        }
        catch (error) {
            logger_1.logger.error({ error }, "Get page failed");
            throw error;
        }
    });
}
//# sourceMappingURL=facebook.controller.js.map