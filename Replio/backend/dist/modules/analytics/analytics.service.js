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
exports.getOverviewAnalytics = getOverviewAnalytics;
exports.getCommentsAnalytics = getCommentsAnalytics;
exports.getRepliesAnalytics = getRepliesAnalytics;
exports.getEvents = getEvents;
const prisma_1 = __importDefault(require("../../config/prisma"));
function getOverviewAnalytics(userId, filters) {
    return __awaiter(this, void 0, void 0, function* () {
        const { pageId, startDate, endDate } = filters;
        const where = {
            userId,
        };
        if (pageId) {
            where.facebookPageId = pageId;
        }
        if (startDate || endDate) {
            where.createdAt = {};
            if (startDate) {
                where.createdAt.gte = new Date(startDate);
            }
            if (endDate) {
                where.createdAt.lte = new Date(endDate);
            }
        }
        const [totalComments, totalReplies, recentComments] = yield Promise.all([
            prisma_1.default.comment.count({
                where: Object.assign(Object.assign(Object.assign({ facebookPage: {
                        userId,
                    } }, (pageId && { facebookPageId: pageId })), (startDate && { createdAt: { gte: new Date(startDate) } })), (endDate && { createdAt: { lte: new Date(endDate) } })),
            }),
            prisma_1.default.reply.count({
                where: Object.assign(Object.assign(Object.assign({ comment: {
                        facebookPage: {
                            userId,
                        },
                    } }, (pageId && { facebookPageId: pageId })), (startDate && {
                    comment: { createdAt: { gte: new Date(startDate) } },
                })), (endDate && { comment: { createdAt: { lte: new Date(endDate) } } })),
            }),
            prisma_1.default.comment.findMany({
                where: Object.assign(Object.assign(Object.assign({ facebookPage: {
                        userId,
                    } }, (pageId && { facebookPageId: pageId })), (startDate && { createdAt: { gte: new Date(startDate) } })), (endDate && { createdAt: { lte: new Date(endDate) } })),
                select: {
                    aiSentiment: true,
                },
                take: 1000,
            }),
        ]);
        // Calculate sentiment breakdown
        const sentimentBreakdown = {
            positive: 0,
            negative: 0,
            neutral: 0,
        };
        recentComments.forEach((comment) => {
            if (comment.aiSentiment) {
                sentimentBreakdown[comment.aiSentiment]++;
            }
        });
        return {
            totalComments,
            totalReplies,
            sentimentBreakdown,
            spamRate: 0, // Would need spam analysis
        };
    });
}
function getCommentsAnalytics(userId, filters) {
    return __awaiter(this, void 0, void 0, function* () {
        const { pageId, startDate, endDate, interval = "day" } = filters;
        const where = {
            facebookPage: {
                userId,
            },
        };
        if (pageId) {
            where.facebookPageId = pageId;
        }
        if (startDate || endDate) {
            where.createdAt = {};
            if (startDate) {
                where.createdAt.gte = new Date(startDate);
            }
            if (endDate) {
                where.createdAt.lte = new Date(endDate);
            }
        }
        const comments = yield prisma_1.default.comment.findMany({
            where,
            select: {
                createdAt: true,
                aiSentiment: true,
                aiLanguage: true,
                aiIntent: true,
            },
            orderBy: {
                createdAt: "asc",
            },
        });
        // Group by sentiment
        const bySentiment = {
            positive: 0,
            negative: 0,
            neutral: 0,
        };
        // Group by language
        const byLanguage = {};
        // Group by intent
        const byIntent = {};
        comments.forEach((comment) => {
            if (comment.aiSentiment) {
                bySentiment[comment.aiSentiment]++;
            }
            if (comment.aiLanguage) {
                byLanguage[comment.aiLanguage] =
                    (byLanguage[comment.aiLanguage] || 0) + 1;
            }
            if (comment.aiIntent) {
                byIntent[comment.aiIntent] = (byIntent[comment.aiIntent] || 0) + 1;
            }
        });
        return {
            timeline: comments.map((c) => ({
                date: c.createdAt.toISOString().split("T")[0],
                count: 1,
            })),
            bySentiment,
            byLanguage,
            byIntent,
        };
    });
}
function getRepliesAnalytics(userId, filters) {
    return __awaiter(this, void 0, void 0, function* () {
        const { pageId, startDate, endDate, interval = "day" } = filters;
        const where = {
            comment: {
                facebookPage: {
                    userId,
                },
            },
        };
        if (pageId) {
            where.facebookPageId = pageId;
        }
        if (startDate || endDate) {
            where.createdAt = {};
            if (startDate) {
                where.createdAt.gte = new Date(startDate);
            }
            if (endDate) {
                where.createdAt.lte = new Date(endDate);
            }
        }
        const replies = yield prisma_1.default.reply.findMany({
            where,
            select: {
                createdAt: true,
                status: true,
                aiProvider: true,
                confidence: true,
            },
            orderBy: {
                createdAt: "asc",
            },
        });
        // Group by status
        const byStatus = {
            PENDING: 0,
            APPROVED: 0,
            SENT: 0,
            FAILED: 0,
            SKIPPED: 0,
        };
        // Group by provider
        const byProvider = {};
        replies.forEach((reply) => {
            byStatus[reply.status]++;
            if (reply.aiProvider) {
                byProvider[reply.aiProvider] = (byProvider[reply.aiProvider] || 0) + 1;
            }
        });
        return {
            timeline: replies.map((r) => ({
                date: r.createdAt.toISOString().split("T")[0],
                count: 1,
            })),
            byStatus,
            byProvider,
            avgLength: 0, // Would need to calculate from actual replies
        };
    });
}
function getEvents(userId, filters) {
    return __awaiter(this, void 0, void 0, function* () {
        const { eventType, pageId, commentId, replyId, limit = 50, offset = 0, } = filters;
        const where = {
            userId,
        };
        if (eventType) {
            where.eventType = eventType;
        }
        if (pageId) {
            where.facebookPageId = pageId;
        }
        if (commentId) {
            where.commentId = commentId;
        }
        if (replyId) {
            where.replyId = replyId;
        }
        const [events, total] = yield Promise.all([
            prisma_1.default.analyticsEvent.findMany({
                where,
                orderBy: {
                    createdAt: "desc",
                },
                take: limit,
                skip: offset,
            }),
            prisma_1.default.analyticsEvent.count({ where }),
        ]);
        return {
            events,
            total,
            limit,
            offset,
        };
    });
}
//# sourceMappingURL=analytics.service.js.map