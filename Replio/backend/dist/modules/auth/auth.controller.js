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
exports.googleOAuthController = googleOAuthController;
exports.googleCallbackController = googleCallbackController;
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
            // Clear HTTP-only cookie with same settings as when set
            res.clearCookie("auth_token", {
                httpOnly: true,
                secure: true,
                sameSite: "none",
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
function getValidFrontendUrl(stateQuery) {
    if (typeof stateQuery === "string" && stateQuery) {
        try {
            const parsedUrl = new URL(stateQuery);
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
function facebookOAuthController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const backendUrl = `${req.protocol}://${req.get("host")}`;
            const redirectUri = env_1.env.META_REDIRECT_URI || `${backendUrl}/api/auth/facebook/callback`;
            const scope = "public_profile,email";
            const state = typeof req.query.state === "string" ? req.query.state : "";
            const oauthUrl = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${env_1.env.META_APP_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}&response_type=code${state ? `&state=${encodeURIComponent(state)}` : ""}`;
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
        const { code, error, state } = req.query;
        const frontendUrl = getValidFrontendUrl(state);
        try {
            if (error) {
                logger_1.logger.error({ error }, "Facebook login callback error");
                res.redirect(`${frontendUrl}/login?error=oauth_failed`);
                return;
            }
            if (!code || typeof code !== "string") {
                res.redirect(`${frontendUrl}/login?error=invalid_code`);
                return;
            }
            const backendUrl = `${req.protocol}://${req.get("host")}`;
            const redirectUri = env_1.env.META_REDIRECT_URI || `${backendUrl}/api/auth/facebook/callback`;
            // 1. Exchange code for access token
            const tokenResponse = yield axios_1.default
                .get("https://graph.facebook.com/v18.0/oauth/access_token", {
                params: {
                    client_id: env_1.env.META_APP_ID,
                    client_secret: env_1.env.META_APP_SECRET,
                    redirect_uri: redirectUri,
                    code,
                },
            })
                .catch(() => null);
            if (!((_a = tokenResponse === null || tokenResponse === void 0 ? void 0 : tokenResponse.data) === null || _a === void 0 ? void 0 : _a.access_token)) {
                throw new errors_1.ExternalAPIError("Failed to get Facebook access token", "facebook");
            }
            // 2. Get user profile
            const profileResponse = yield axios_1.default
                .get("https://graph.facebook.com/v18.0/me", {
                params: {
                    fields: "id,name,email",
                    access_token: tokenResponse.data.access_token,
                },
            })
                .catch(() => null);
            if (!((_b = profileResponse === null || profileResponse === void 0 ? void 0 : profileResponse.data) === null || _b === void 0 ? void 0 : _b.id) || !((_c = profileResponse === null || profileResponse === void 0 ? void 0 : profileResponse.data) === null || _c === void 0 ? void 0 : _c.email)) {
                throw new errors_1.ExternalAPIError("Failed to get Facebook profile or email is missing", "facebook");
            }
            // 3. Login or register user
            const { user, token } = yield (0, auth_service_1.loginWithFacebook)({
                id: profileResponse.data.id,
                name: profileResponse.data.name,
                email: profileResponse.data.email,
            });
            // 4. Set cookie and redirect with token query
            res.cookie("auth_token", token, {
                httpOnly: true,
                secure: true, // Always secure for cross-domain
                sameSite: "none", // Required for cross-domain cookies
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
                path: "/",
            });
            res.redirect(`${frontendUrl}/dashboard?token=${encodeURIComponent(token)}`);
        }
        catch (err) {
            logger_1.logger.error({ error: err }, "Facebook login callback failed");
            res.redirect(`${frontendUrl}/login?error=server_error`);
        }
    });
}
function googleOAuthController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const backendUrl = `${req.protocol}://${req.get("host")}`;
            const redirectUri = env_1.env.GOOGLE_REDIRECT_URI || `${backendUrl}/api/auth/google/callback`;
            const scope = "openid profile email";
            const state = typeof req.query.state === "string" ? req.query.state : "";
            const oauthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${env_1.env.GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}&response_type=code${state ? `&state=${encodeURIComponent(state)}` : ""}`;
            res.redirect(oauthUrl);
        }
        catch (error) {
            logger_1.logger.error({ error }, "Google login initiation failed");
            throw error;
        }
    });
}
function googleCallbackController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        const { code, error, state } = req.query;
        const frontendUrl = getValidFrontendUrl(state);
        try {
            logger_1.logger.info({ code: !!code, error }, "Google callback received");
            if (error) {
                logger_1.logger.error({ error }, "Google login callback error");
                res.redirect(`${frontendUrl}/login?error=oauth_failed`);
                return;
            }
            if (!code || typeof code !== "string") {
                logger_1.logger.error({ code }, "Invalid Google authorization code");
                res.redirect(`${frontendUrl}/login?error=invalid_code`);
                return;
            }
            const backendUrl = `${req.protocol}://${req.get("host")}`;
            const redirectUri = env_1.env.GOOGLE_REDIRECT_URI || `${backendUrl}/api/auth/google/callback`;
            logger_1.logger.info({ redirectUri }, "Exchanging Google code for token");
            // 1. Exchange code for access token
            const tokenResponse = yield axios_1.default
                .post("https://oauth2.googleapis.com/token", {
                client_id: env_1.env.GOOGLE_CLIENT_ID,
                client_secret: env_1.env.GOOGLE_CLIENT_SECRET,
                redirect_uri: redirectUri,
                code,
                grant_type: "authorization_code",
            })
                .catch((err) => {
                logger_1.logger.error({ error: err.message }, "Google token exchange failed");
                return null;
            });
            if (!((_a = tokenResponse === null || tokenResponse === void 0 ? void 0 : tokenResponse.data) === null || _a === void 0 ? void 0 : _a.access_token)) {
                logger_1.logger.error({ response: tokenResponse === null || tokenResponse === void 0 ? void 0 : tokenResponse.data }, "No access token in response");
                throw new errors_1.ExternalAPIError("Failed to get Google access token", "google");
            }
            logger_1.logger.info("Got Google access token successfully");
            // 2. Get user profile
            const profileResponse = yield axios_1.default
                .get("https://www.googleapis.com/oauth2/v2/userinfo", {
                headers: {
                    Authorization: `Bearer ${tokenResponse.data.access_token}`,
                },
            })
                .catch((err) => {
                logger_1.logger.error({ error: err.message }, "Google profile fetch failed");
                return null;
            });
            if (!((_b = profileResponse === null || profileResponse === void 0 ? void 0 : profileResponse.data) === null || _b === void 0 ? void 0 : _b.id) || !((_c = profileResponse === null || profileResponse === void 0 ? void 0 : profileResponse.data) === null || _c === void 0 ? void 0 : _c.email)) {
                logger_1.logger.error({ profile: profileResponse === null || profileResponse === void 0 ? void 0 : profileResponse.data }, "Invalid Google profile data");
                throw new errors_1.ExternalAPIError("Failed to get Google profile or email is missing", "google");
            }
            logger_1.logger.info({ email: profileResponse.data.email }, "Got Google profile successfully");
            // 3. Login or register user
            const { user, token } = yield (0, auth_service_1.loginWithGoogle)({
                id: profileResponse.data.id,
                name: profileResponse.data.name,
                email: profileResponse.data.email,
            });
            logger_1.logger.info({ userId: user.id }, "User logged in with Google successfully");
            // 4. Set cookie and redirect with token query
            res.cookie("auth_token", token, {
                httpOnly: true,
                secure: true, // Always secure for cross-domain
                sameSite: "none", // Required for cross-domain cookies
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
                path: "/",
            });
            logger_1.logger.info({ frontendUrl }, "Redirecting to dashboard");
            res.redirect(`${frontendUrl}/dashboard?token=${encodeURIComponent(token)}`);
        }
        catch (err) {
            logger_1.logger.error({ error: err }, "Google login callback failed");
            res.redirect(`${frontendUrl}/login?error=server_error`);
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