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
exports.getUserProfileController = getUserProfileController;
const prisma_1 = __importDefault(require("../../config/prisma"));
const errors_1 = require("../../utils/errors");
const logger_1 = require("../../utils/logger");
function getUserProfileController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.user.userId;
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
                throw new errors_1.NotFoundError('User not found');
            }
            res.status(200).json({
                success: true,
                data: { user },
            });
        }
        catch (error) {
            logger_1.logger.error({ error }, 'Get user profile failed');
            throw error;
        }
    });
}
//# sourceMappingURL=users.controller.js.map