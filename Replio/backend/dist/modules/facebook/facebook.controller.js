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
function getValidFrontendUrl(stateOrigin) {
    if (stateOrigin) {
        try {
            const parsedUrl = new URL(stateOrigin);
            const allowedOrigins = [
                env_1.env.FRONTEND_URL,
                "https://replio-frontend-livid.vercel.app",
                "https://replio-frontend.vercel.app",
                "http://localhost:3000",
            ];
            if (allowedOrigins.includes(parsedUrl.origin) ||
                parsedUrl.hostname.endsWith(".vercel.app") ||
                parsedUrl.hostname === "localhost" ||
                parsedUrl.hostname === "127.0.0.1") {
                return parsedUrl.origin;
            }
        }
        catch (_a) {
            // Fall through to default
        }
    }
    return env_1.env.FRONTEND_URL;
}
function initiateOAuthController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        try {
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
            const origin = (typeof req.query.origin === "string" && req.query.origin) ||
                req.headers.origin ||
                env_1.env.FRONTEND_URL;
            // Encode state with userId and origin
            const statePayload = {
                userId: userId || "",
                origin,
            };
            const state = Buffer.from(JSON.stringify(statePayload)).toString("base64url");
            const oauthUrl = (0, facebook_service_1.getOAuthUrl)(state);
            // If request explicitly accepts HTML and not JSON (e.g. direct link in browser)
            if (((_b = req.headers.accept) === null || _b === void 0 ? void 0 : _b.includes("text/html")) &&
                !((_c = req.headers.accept) === null || _c === void 0 ? void 0 : _c.includes("application/json")) &&
                !req.xhr) {
                res.redirect(oauthUrl);
                return;
            }
            res.status(200).json({
                success: true,
                data: {
                    authUrl: oauthUrl,
                },
            });
        }
        catch (error) {
            logger_1.logger.error({ error }, "OAuth initiation failed");
            throw error;
        }
    });
}
function oauthCallbackController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const { code, error, state } = req.query;
        let userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        let frontendUrl = env_1.env.FRONTEND_URL;
        if (state && typeof state === "string") {
            try {
                const decoded = JSON.parse(Buffer.from(state, "base64url").toString("utf-8"));
                if (decoded.userId)
                    userId = decoded.userId;
                if (decoded.origin)
                    frontendUrl = getValidFrontendUrl(decoded.origin);
            }
            catch (_b) {
                // If state was raw string / userId
                if (!userId)
                    userId = state;
            }
        }
        try {
            if (error) {
                logger_1.logger.error({ error }, "Facebook OAuth callback error");
                res.redirect(`${frontendUrl}/pages?error=${encodeURIComponent(String(error))}`);
                return;
            }
            if (!code || typeof code !== "string") {
                logger_1.logger.warn("OAuth callback called without authorization code");
                res.redirect(`${frontendUrl}/pages?error=no_code`);
                return;
            }
            // Exchange code for user access token
            const userAccessToken = yield (0, facebook_service_1.exchangeCodeForToken)(code);
            // Get user's Facebook pages
            const pagesResponse = yield (0, facebook_service_1.getUserPages)(userAccessToken);
            if (!pagesResponse.data || pagesResponse.data.length === 0) {
                logger_1.logger.warn({ userId }, "No Facebook pages returned by Meta");
                res.redirect(`${frontendUrl}/pages?warning=no_pages_found`);
                return;
            }
            // Connect all fetched pages for this user if userId is available
            if (userId) {
                for (const page of pagesResponse.data) {
                    yield (0, facebook_service_1.connectPage)(userId, page.id, page.name, page.access_token);
                }
                logger_1.logger.info({ userId, pageCount: pagesResponse.data.length }, "Facebook pages connected successfully from OAuth callback");
                res.redirect(`${frontendUrl}/pages?connected=true&count=${pagesResponse.data.length}`);
                return;
            }
            // Fallback if userId was not present in state
            res.status(200).json({
                success: true,
                data: {
                    pages: pagesResponse.data,
                    userAccessToken,
                },
            });
        }
        catch (err) {
            logger_1.logger.error({ error: err }, "Facebook OAuth callback processing failed");
            res.redirect(`${frontendUrl}/pages?error=${encodeURIComponent(err.message || "connection_failed")}`);
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