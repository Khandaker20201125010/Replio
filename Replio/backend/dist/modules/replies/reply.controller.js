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
exports.getRepliesController = getRepliesController;
exports.getReplyByIdController = getReplyByIdController;
exports.approveReplyController = approveReplyController;
exports.rejectReplyController = rejectReplyController;
exports.retryReplyController = retryReplyController;
const reply_service_1 = require("./reply.service");
const logger_1 = require("../../utils/logger");
function getRepliesController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.user.userId;
            const filters = req.query;
            const result = yield (0, reply_service_1.getReplies)(userId, filters);
            res.status(200).json({
                success: true,
                data: result,
            });
        }
        catch (error) {
            logger_1.logger.error({ error }, "Get replies failed");
            throw error;
        }
    });
}
function getReplyByIdController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.user.userId;
            const { replyId } = req.params;
            if (Array.isArray(replyId)) {
                throw new Error("Invalid reply ID");
            }
            const reply = yield (0, reply_service_1.getReplyById)(userId, replyId);
            res.status(200).json({
                success: true,
                data: { reply },
            });
        }
        catch (error) {
            logger_1.logger.error({ error }, "Get reply by ID failed");
            throw error;
        }
    });
}
function approveReplyController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.user.userId;
            const { replyId } = req.params;
            if (Array.isArray(replyId)) {
                throw new Error("Invalid reply ID");
            }
            const reply = yield (0, reply_service_1.approveReply)(userId, replyId);
            res.status(200).json({
                success: true,
                data: { reply },
            });
        }
        catch (error) {
            logger_1.logger.error({ error }, "Approve reply failed");
            throw error;
        }
    });
}
function rejectReplyController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.user.userId;
            const { replyId } = req.params;
            if (Array.isArray(replyId)) {
                throw new Error("Invalid reply ID");
            }
            const reply = yield (0, reply_service_1.rejectReply)(userId, replyId);
            res.status(200).json({
                success: true,
                data: { reply },
            });
        }
        catch (error) {
            logger_1.logger.error({ error }, "Reject reply failed");
            throw error;
        }
    });
}
function retryReplyController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.user.userId;
            const { replyId } = req.params;
            if (Array.isArray(replyId)) {
                throw new Error("Invalid reply ID");
            }
            const reply = yield (0, reply_service_1.retryReply)(userId, replyId);
            res.status(200).json({
                success: true,
                data: { reply },
            });
        }
        catch (error) {
            logger_1.logger.error({ error }, "Retry reply failed");
            throw error;
        }
    });
}
//# sourceMappingURL=reply.controller.js.map