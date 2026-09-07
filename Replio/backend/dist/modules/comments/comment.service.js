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
exports.getComments = getComments;
exports.getCommentById = getCommentById;
exports.updateCommentStatus = updateCommentStatus;
exports.processComment = processComment;
const prisma_1 = __importDefault(require("../../config/prisma"));
const errors_1 = require("../../utils/errors");
const logger_1 = require("../../utils/logger");
const ai_service_1 = require("../ai/ai.service");
function getComments(userId, filters) {
    return __awaiter(this, void 0, void 0, function* () {
        const { pageId, status, limit = 20, offset = 0 } = filters;
        const where = {
            facebookPage: {
                userId,
            },
        };
        if (pageId) {
            where.facebookPageId = pageId;
        }
        if (status) {
            where.status = status;
        }
        const [comments, total] = yield Promise.all([
            prisma_1.default.comment.findMany({
                where,
                include: {
                    facebookPage: {
                        select: {
                            pageId: true,
                            pageName: true,
                        },
                    },
                    replies: {
                        orderBy: {
                            createdAt: "desc",
                        },
                    },
                },
                orderBy: {
                    createdAt: "desc",
                },
                take: limit,
                skip: offset,
            }),
            prisma_1.default.comment.count({ where }),
        ]);
        return {
            comments,
            total,
            limit,
            offset,
        };
    });
}
function getCommentById(userId, commentId) {
    return __awaiter(this, void 0, void 0, function* () {
        const comment = yield prisma_1.default.comment.findFirst({
            where: {
                id: commentId,
                facebookPage: {
                    userId,
                },
            },
            include: {
                facebookPage: {
                    select: {
                        pageId: true,
                        pageName: true,
                    },
                },
                replies: {
                    orderBy: {
                        createdAt: "desc",
                    },
                },
            },
        });
        if (!comment) {
            throw new errors_1.NotFoundError("Comment not found");
        }
        return comment;
    });
}
function updateCommentStatus(userId, commentId, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const comment = yield prisma_1.default.comment.findFirst({
            where: {
                id: commentId,
                facebookPage: {
                    userId,
                },
            },
        });
        if (!comment) {
            throw new errors_1.NotFoundError("Comment not found");
        }
        const updated = yield prisma_1.default.comment.update({
            where: { id: commentId },
            data: {
                status: data.status,
            },
        });
        logger_1.logger.info({ userId, commentId, status: data.status }, "Comment status updated");
        return updated;
    });
}
function processComment(commentId) {
    return __awaiter(this, void 0, void 0, function* () {
        const comment = yield prisma_1.default.comment.findUnique({
            where: { id: commentId },
            include: {
                facebookPage: true,
            },
        });
        if (!comment) {
            throw new errors_1.NotFoundError("Comment not found");
        }
        // Check if comment is already processed
        if (comment.status !== "PENDING") {
            logger_1.logger.info({ commentId, status: comment.status }, "Comment already processed");
            return comment;
        }
        // Get AI settings for the user
        const aiSettings = yield prisma_1.default.aISettings.findUnique({
            where: { userId: comment.facebookPage.userId },
        });
        if (!aiSettings || aiSettings.status !== "ACTIVE") {
            yield prisma_1.default.comment.update({
                where: { id: commentId },
                data: { status: "IGNORED" },
            });
            logger_1.logger.info({ commentId }, "AI not enabled, comment ignored");
            return comment;
        }
        try {
            // Analyze comment with AI
            const analysis = yield (0, ai_service_1.analyzeComment)(comment.userMessage, aiSettings);
            // Update comment with AI analysis
            yield prisma_1.default.comment.update({
                where: { id: commentId },
                data: {
                    aiIntent: analysis.intent,
                    aiSentiment: analysis.sentiment,
                    aiLanguage: analysis.language,
                    aiIsSpam: analysis.isSpam,
                    aiConfidence: analysis.confidence,
                    aiRequiresReview: analysis.requiresHumanReview,
                },
            });
            // Check confidence threshold
            if (analysis.confidence < aiSettings.confidenceThreshold) {
                yield prisma_1.default.comment.update({
                    where: { id: commentId },
                    data: { status: "IGNORED" },
                });
                logger_1.logger.info({ commentId, confidence: analysis.confidence }, "Low confidence, comment ignored");
                return comment;
            }
            // Check spam handling
            if (analysis.isSpam) {
                if (aiSettings.spamHandling === "ignore") {
                    yield prisma_1.default.comment.update({
                        where: { id: commentId },
                        data: { status: "IGNORED" },
                    });
                    logger_1.logger.info({ commentId }, "Spam detected, comment ignored");
                    return comment;
                }
                // For 'reply' or 'review', continue to reply generation
            }
            // Check if human review is required
            if (analysis.requiresHumanReview || aiSettings.humanApprovalMode) {
                yield prisma_1.default.comment.update({
                    where: { id: commentId },
                    data: { status: "PROCESSED" },
                });
                logger_1.logger.info({ commentId }, "Human review required");
                return comment;
            }
            // Generate reply
            const replyResult = yield (0, ai_service_1.generateReply)(comment.userMessage, analysis, aiSettings);
            // Validate reply
            const isValid = yield (0, ai_service_1.validateReply)(replyResult.reply, aiSettings);
            if (!isValid) {
                yield prisma_1.default.comment.update({
                    where: { id: commentId },
                    data: { status: "ERROR" },
                });
                logger_1.logger.error({ commentId }, "Generated reply failed validation");
                return comment;
            }
            // Create reply record
            const reply = yield prisma_1.default.reply.create({
                data: {
                    commentId: comment.id,
                    facebookPageId: comment.facebookPageId,
                    generatedReply: replyResult.reply,
                    status: "PENDING",
                    aiProvider: aiSettings.aiProvider,
                    confidence: replyResult.confidence,
                    requiresHumanReview: analysis.requiresHumanReview || aiSettings.humanApprovalMode,
                },
            });
            // Update comment status
            yield prisma_1.default.comment.update({
                where: { id: commentId },
                data: { status: "PROCESSED" },
            });
            logger_1.logger.info({ commentId, replyId: reply.id }, "Comment processed successfully, reply created");
            return comment;
        }
        catch (error) {
            logger_1.logger.error({ error, commentId }, "Comment processing failed");
            yield prisma_1.default.comment.update({
                where: { id: commentId },
                data: { status: "ERROR" },
            });
            throw error;
        }
    });
}
//# sourceMappingURL=comment.service.js.map