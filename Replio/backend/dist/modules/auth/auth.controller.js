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
exports.logoutController = logoutController;
exports.getCurrentUserController = getCurrentUserController;
exports.facebookOAuthController = facebookOAuthController;
exports.facebookCallbackController = facebookCallbackController;
exports.updateProfileController = updateProfileController;
const axios_1 = __importDefault(require("axios"));
const env_1 = require("../../config/env");
const auth_service_1 = require("./auth.service");
const auth_validation_1 = require("./auth.validation");
const logger_1 = require("../../utils/logger");
const errors_1 = require("../../utils/errors");
function logoutController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Clear HTTP-only cookie
            res.clearCookie("auth_token", {
                path: "/",
            });
            res.status(200).json({
                success: true,
                message: "Logged out successfully",
            });
        }
        catch (error) {
            logger_1.logger.error({ error }, "Logout failed");
            throw error;
        }
    });
}
function getCurrentUserController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.user.userId;
            const user = yield (0, auth_service_1.getCurrentUser)(userId);
            res.status(200).json({
                success: true,
                data: {
                    user,
                },
            });
        }
        catch (error) {
            logger_1.logger.error({ error }, "Get current user failed");
            throw error;
        }
    });
}
function facebookOAuthController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const backendUrl = `${req.protocol}://${req.get("host")}`;
            const redirectUri = `${backendUrl}/api/auth/facebook/callback`; // We'll handle this in backend at /api/auth/facebook/callback
            const scope = "public_profile,email";
            // We reuse the META_APP_ID but with a different redirect URL for user login vs page connection
            const oauthUrl = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${env_1.env.META_APP_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}&response_type=code`;
            res.redirect(oauthUrl);
        }
        catch (error) {
            logger_1.logger.error({ error }, "Facebook login initiation failed");
            throw error;
        }
    });
}
function facebookCallbackController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        try {
            const { code, error } = req.query;
            if (error) {
                logger_1.logger.error({ error }, "Facebook login callback error");
                res.redirect(`${env_1.env.FRONTEND_URL}/login?error=oauth_failed`);
                return;
            }
            if (!code || typeof code !== "string") {
                res.redirect(`${env_1.env.FRONTEND_URL}/login?error=invalid_code`);
                return;
            }
            const backendUrl = `${req.protocol}://${req.get("host")}`;
            const redirectUri = `${backendUrl}/api/auth/facebook/callback`;
            // 1. Exchange code for access token
            const tokenResponse = yield axios_1.default.get("https://graph.facebook.com/v18.0/oauth/access_token", {
                params: {
                    client_id: env_1.env.META_APP_ID,
                    client_secret: env_1.env.META_APP_SECRET,
                    redirect_uri: redirectUri,
                    code,
                },
            }).catch(() => null);
            if (!((_a = tokenResponse === null || tokenResponse === void 0 ? void 0 : tokenResponse.data) === null || _a === void 0 ? void 0 : _a.access_token)) {
                throw new errors_1.ExternalAPIError("Failed to get Facebook access token", "facebook");
            }
            // 2. Get user profile
            const profileResponse = yield axios_1.default.get("https://graph.facebook.com/v18.0/me", {
                params: {
                    fields: "id,name,email",
                    access_token: tokenResponse.data.access_token,
                },
            }).catch(() => null);
            if (!((_b = profileResponse === null || profileResponse === void 0 ? void 0 : profileResponse.data) === null || _b === void 0 ? void 0 : _b.id) || !((_c = profileResponse === null || profileResponse === void 0 ? void 0 : profileResponse.data) === null || _c === void 0 ? void 0 : _c.email)) {
                throw new errors_1.ExternalAPIError("Failed to get Facebook profile or email is missing", "facebook");
            }
            // 3. Login or register user
            const { user, token } = yield (0, auth_service_1.loginWithFacebook)({
                id: profileResponse.data.id,
                name: profileResponse.data.name,
                email: profileResponse.data.email,
            });
            // 4. Set cookie and redirect
            res.cookie("auth_token", token, {
                httpOnly: true,
                secure: env_1.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
                path: "/",
            });
            res.redirect(`${env_1.env.FRONTEND_URL}/dashboard`);
        }
        catch (error) {
            logger_1.logger.error({ error }, "Facebook login callback failed");
            res.redirect(`${env_1.env.FRONTEND_URL}/login?error=server_error`);
        }
    });
}
function updateProfileController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.user.userId;
            const validatedData = auth_validation_1.updateProfileSchema.parse(req.body);
            const user = yield (0, auth_service_1.updateProfile)(userId, validatedData);
            res.status(200).json({
                success: true,
                data: {
                    user,
                },
            });
        }
        catch (error) {
            logger_1.logger.error({ error }, "Update profile failed");
            throw error;
        }
    });
}
//# sourceMappingURL=auth.controller.js.map