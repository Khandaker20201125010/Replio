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
exports.register = register;
exports.login = login;
exports.getCurrentUser = getCurrentUser;
exports.updateProfile = updateProfile;
const prisma_1 = __importDefault(require("../../config/prisma"));
const password_1 = require("../../utils/password");
const jwt_1 = require("../../utils/jwt");
const errors_1 = require("../../utils/errors");
const logger_1 = require("../../utils/logger");
function register(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password, name } = data;
        // Check if user already exists
        const existingUser = yield prisma_1.default.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            throw new errors_1.ConflictError("User with this email already exists");
        }
        // Hash password
        const passwordHash = yield (0, password_1.hashPassword)(password);
        // Create user
        const user = yield prisma_1.default.user.create({
            data: {
                email,
                passwordHash,
                name: name || null,
                role: "USER",
            },
        });
        // Generate token
        const token = (0, jwt_1.generateToken)(user.id, user.email);
        logger_1.logger.info({ userId: user.id, email }, "User registered successfully");
        return {
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            },
            token,
        };
    });
}
function login(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = data;
        // Find user
        const user = yield prisma_1.default.user.findUnique({
            where: { email },
        });
        if (!user) {
            throw new errors_1.AuthenticationError("Invalid credentials");
        }
        // Verify password
        const isValid = yield (0, password_1.comparePassword)(password, user.passwordHash);
        if (!isValid) {
            throw new errors_1.AuthenticationError("Invalid credentials");
        }
        // Generate token
        const token = (0, jwt_1.generateToken)(user.id, user.email);
        logger_1.logger.info({ userId: user.id, email }, "User logged in successfully");
        return {
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            },
            token,
        };
    });
}
function getCurrentUser(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield prisma_1.default.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        if (!user) {
            throw new errors_1.NotFoundError("User not found");
        }
        return user;
    });
}
function updateProfile(userId, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, email } = data;
        // If email is being updated, check if it's already taken
        if (email) {
            const existingUser = yield prisma_1.default.user.findFirst({
                where: {
                    email,
                    NOT: { id: userId },
                },
            });
            if (existingUser) {
                throw new errors_1.ConflictError("Email already in use");
            }
        }
        const user = yield prisma_1.default.user.update({
            where: { id: userId },
            data: Object.assign(Object.assign({}, (name !== undefined && { name })), (email !== undefined && { email })),
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        logger_1.logger.info({ userId }, "User profile updated successfully");
        return user;
    });
}
//# sourceMappingURL=auth.service.js.map