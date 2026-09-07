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
exports.getReplies = getReplies;
exports.getReplyById = getReplyById;
exports.approveReply = approveReply;
exports.rejectReply = rejectReply;
exports.retryReply = retryReply;
exports.sendReplyToFacebook = sendReplyToFacebook;
const prisma_1 = __importDefault(require("../../config/prisma"));
const errors_1 = require("../../utils/errors");
const logger_1 = require("../../utils/logger");
const axios_1 = __importDefault(require("axios"));
function getReplies(userId, filters) {
    return __awaiter(this, void 0, void 0, function* () {
        const { commentId, pageId, status, limit = 20, offset = 0 } = filters;
        const where = {
            comment: {
                facebookPage: {
                    userId,
                },
            },
        };
        if (commentId) {
            where.commentId = commentId;
        }
        if (pageId) {
            where.facebookPageId = pageId;
        }
        if (status) {
            where.status = status;
        }
        const [replies, total] = yield Promise.all([
            prisma_1.default.reply.findMany({
                where,
                include: {
                    comment: {
                        select: {
                            id: true,
                            commentId: true,
                            userMessage: true,
                        },
                    },
                    facebookPage: {
                        select: {
                            pageId: true,
                            pageName: true,
                        },
                    },
                },
                orderBy: {
                    createdAt: "desc",
                },
                take: limit,
                skip: offset,
            }),
            prisma_1.default.reply.count({ where }),
        ]);
        return {
            replies,
            total,
            limit,
            offset,
        };
    });
}
function getReplyById(userId, replyId) {
    return __awaiter(this, void 0, void 0, function* () {
        const reply = yield prisma_1.default.reply.findFirst({
            where: {
                id: replyId,
                facebookPage: {
                    userId,
                },
            },
            include: {
                comment: true,
                facebookPage: true,
            },
        });
        if (!reply) {
            throw new errors_1.NotFoundError("Reply not found");
        }
        return reply;
    });
}
function approveReply(userId, replyId) {
    return __awaiter(this, void 0, void 0, function* () {
        const reply = yield prisma_1.default.reply.findFirst({
            where: {
                id: replyId,
                facebookPage: {
                    userId,
                },
            },
        });
        if (!reply) {
            throw new errors_1.NotFoundError("Reply not found");
        }
        if (reply.status !== "PENDING") {
            throw new Error("Reply can only be approved when in PENDING status");
        }
        const updated = yield prisma_1.default.reply.update({
            where: { id: replyId },
            data: {
                status: "APPROVED",
                approvedBy: userId,
            },
        });
        logger_1.logger.info({ userId, replyId }, "Reply approved");
        return updated;
    });
}
function rejectReply(userId, replyId) {
    return __awaiter(this, void 0, void 0, function* () {
        const reply = yield prisma_1.default.reply.findFirst({
            where: {
                id: replyId,
                facebookPage: {
                    userId,
                },
            },
        });
        if (!reply) {
            throw new errors_1.NotFoundError("Reply not found");
        }
        if (reply.status !== "PENDING") {
            throw new Error("Reply can only be rejected when in PENDING status");
        }
        const updated = yield prisma_1.default.reply.update({
            where: { id: replyId },
            data: {
                status: "SKIPPED",
            },
        });
        logger_1.logger.info({ userId, replyId }, "Reply rejected");
        return updated;
    });
}
function retryReply(userId, replyId) {
    return __awaiter(this, void 0, void 0, function* () {
        const reply = yield prisma_1.default.reply.findFirst({
            where: {
                id: replyId,
                facebookPage: {
                    userId,
                },
            },
            include: {
                comment: true,
                facebookPage: true,
            },
        });
        if (!reply) {
            throw new errors_1.NotFoundError("Reply not found");
        }
        if (reply.status !== "FAILED") {
            throw new Error("Reply can only be retried when in FAILED status");
        }
        // Update status to PENDING for retry
        const updated = yield prisma_1.default.reply.update({
            where: { id: replyId },
            data: {
                status: "PENDING",
            },
        });
        logger_1.logger.info({ userId, replyId }, "Reply marked for retry");
        return updated;
    });
}
function sendReplyToFacebook(replyId) {
    return __awaiter(this, void 0, void 0, function* () {
        const reply = yield prisma_1.default.reply.findUnique({
            where: { id: replyId },
            include: {
                comment: true,
                facebookPage: true,
            },
        });
        if (!reply) {
            throw new errors_1.NotFoundError("Reply not found");
        }
        if (!reply.facebookPage.isConnected) {
            throw new Error("Facebook page is not connected");
        }
        try {
            // Send reply to Facebook Graph API
            const response = yield axios_1.default.post(`https://graph.facebook.com/v18.0/${reply.comment.commentId}/comments`, {
                message: reply.generatedReply,
            }, {
                params: {
                    access_token: reply.facebookPage.pageAccessToken,
                },
            });
            if (response.data && response.data.id) {
                // Update reply with Facebook reply ID
                const updated = yield prisma_1.default.reply.update({
                    where: { id: replyId },
                    data: {
                        replyId: response.data.id,
                        status: "SENT",
                    },
                });
                // Update comment status
                yield prisma_1.default.comment.update({
                    where: { id: reply.commentId },
                    data: { status: "REPLIED" },
                });
                logger_1.logger.info({ replyId, facebookReplyId: response.data.id }, "Reply sent to Facebook successfully");
                return updated;
            }
            else {
                throw new Error("Failed to send reply to Facebook");
            }
        }
        catch (error) {
            logger_1.logger.error({ error, replyId }, "Failed to send reply to Facebook");
            // Update reply status to FAILED
            yield prisma_1.default.reply.update({
                where: { id: replyId },
                data: {
                    status: "FAILED",
                    errorMessage: error instanceof Error ? error.message : "Unknown error",
                },
            });
            throw error;
        }
    });
}
//# sourceMappingURL=reply.service.js.map