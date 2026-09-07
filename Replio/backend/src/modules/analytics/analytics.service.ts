import prisma from "../../config/prisma";
import { logger } from "../../utils/logger";

export async function getOverviewAnalytics(userId: string, filters: any) {
  const { pageId, startDate, endDate } = filters;

  const where: any = {
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

  const [totalComments, totalReplies, recentComments] = await Promise.all([
    prisma.comment.count({
      where: {
        facebookPage: {
          userId,
        },
        ...(pageId && { facebookPageId: pageId }),
        ...(startDate && { createdAt: { gte: new Date(startDate) } }),
        ...(endDate && { createdAt: { lte: new Date(endDate) } }),
      },
    }),
    prisma.reply.count({
      where: {
        comment: {
          facebookPage: {
            userId,
          },
        },
        ...(pageId && { facebookPageId: pageId }),
        ...(startDate && {
          comment: { createdAt: { gte: new Date(startDate) } },
        }),
        ...(endDate && { comment: { createdAt: { lte: new Date(endDate) } } }),
      },
    }),
    prisma.comment.findMany({
      where: {
        facebookPage: {
          userId,
        },
        ...(pageId && { facebookPageId: pageId }),
        ...(startDate && { createdAt: { gte: new Date(startDate) } }),
        ...(endDate && { createdAt: { lte: new Date(endDate) } }),
      },
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
      sentimentBreakdown[
        comment.aiSentiment as keyof typeof sentimentBreakdown
      ]++;
    }
  });

  return {
    totalComments,
    totalReplies,
    sentimentBreakdown,
    spamRate: 0, // Would need spam analysis
  };
}

export async function getCommentsAnalytics(userId: string, filters: any) {
  const { pageId, startDate, endDate, interval = "day" } = filters;

  const where: any = {
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

  const comments = await prisma.comment.findMany({
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
  const byLanguage: Record<string, number> = {};

  // Group by intent
  const byIntent: Record<string, number> = {};

  comments.forEach((comment) => {
    if (comment.aiSentiment) {
      bySentiment[comment.aiSentiment as keyof typeof bySentiment]++;
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
}

export async function getRepliesAnalytics(userId: string, filters: any) {
  const { pageId, startDate, endDate, interval = "day" } = filters;

  const where: any = {
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

  const replies = await prisma.reply.findMany({
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
  const byProvider: Record<string, number> = {};

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
}

export async function getEvents(userId: string, filters: any) {
  const {
    eventType,
    pageId,
    commentId,
    replyId,
    limit = 50,
    offset = 0,
  } = filters;

  const where: any = {
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

  const [events, total] = await Promise.all([
    prisma.analyticsEvent.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
      skip: offset,
    }),
    prisma.analyticsEvent.count({ where }),
  ]);

  return {
    events,
    total,
    limit,
    offset,
  };
}
