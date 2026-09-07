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
exports.registerController = registerController;
exports.loginController = loginController;
exports.logoutController = logoutController;
exports.getCurrentUserController = getCurrentUserController;
exports.updateProfileController = updateProfileController;
const auth_service_1 = require("./auth.service");
const auth_validation_1 = require("./auth.validation");
const logger_1 = require("../../utils/logger");
const env_1 = require("../../config/env");
function registerController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const validatedData = auth_validation_1.registerSchema.parse(req.body);
            const result = yield (0, auth_service_1.register)(validatedData);
            // Set HTTP-only cookie
            res.cookie("auth_token", result.token, {
                httpOnly: true,
                secure: env_1.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
                path: "/",
            });
            res.status(201).json({
                success: true,
                data: {
                    user: result.user,
                },
            });
        }
        catch (error) {
            logger_1.logger.error({ error }, "Registration failed");
            throw error;
        }
    });
}
function loginController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const validatedData = auth_validation_1.loginSchema.parse(req.body);
            const result = yield (0, auth_service_1.login)(validatedData);
            // Set HTTP-only cookie
            res.cookie("auth_token", result.token, {
                httpOnly: true,
                secure: env_1.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
                path: "/",
            });
            res.status(200).json({
                success: true,
                data: {
                    user: result.user,
                },
            });
        }
        catch (error) {
            logger_1.logger.error({ error }, "Login failed");
            throw error;
        }
    });
}
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