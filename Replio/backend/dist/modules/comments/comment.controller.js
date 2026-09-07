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
exports.getCommentsController = getCommentsController;
exports.getCommentByIdController = getCommentByIdController;
exports.updateCommentStatusController = updateCommentStatusController;
const comment_service_1 = require("./comment.service");
const comment_validation_1 = require("./comment.validation");
const logger_1 = require("../../utils/logger");
function getCommentsController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.user.userId;
            const filters = comment_validation_1.getCommentsSchema.parse(req.query);
            const result = yield (0, comment_service_1.getComments)(userId, filters);
            res.status(200).json({
                success: true,
                data: result,
            });
        }
        catch (error) {
            logger_1.logger.error({ error }, "Get comments failed");
            throw error;
        }
    });
}
function getCommentByIdController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.user.userId;
            const { commentId } = req.params;
            if (Array.isArray(commentId)) {
                throw new Error("Invalid comment ID");
            }
            const comment = yield (0, comment_service_1.getCommentById)(userId, commentId);
            res.status(200).json({
                success: true,
                data: { comment },
            });
        }
        catch (error) {
            logger_1.logger.error({ error }, "Get comment by ID failed");
            throw error;
        }
    });
}
function updateCommentStatusController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.user.userId;
            const { commentId } = req.params;
            if (Array.isArray(commentId)) {
                throw new Error("Invalid comment ID");
            }
            const data = comment_validation_1.updateCommentStatusSchema.parse(req.body);
            const comment = yield (0, comment_service_1.updateCommentStatus)(userId, commentId, data);
            res.status(200).json({
                success: true,
                data: { comment },
            });
        }
        catch (error) {
            logger_1.logger.error({ error }, "Update comment status failed");
            throw error;
        }
    });
}
//# sourceMappingURL=comment.controller.js.map