import prisma from "../../config/prisma";
import { NotFoundError, AuthorizationError } from "../../utils/errors";
import { logger } from "../../utils/logger";
import axios from "axios";

export async function getReplies(userId: string, filters: any) {
  const { commentId, pageId, status, limit = 20, offset = 0 } = filters;

  const where: any = {
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

  const [replies, total] = await Promise.all([
    prisma.reply.findMany({
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
    prisma.reply.count({ where }),
  ]);

  return {
    replies,
    total,
    limit,
    offset,
  };
}

export async function getReplyById(userId: string, replyId: string) {
  const reply = await prisma.reply.findFirst({
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
    throw new NotFoundError("Reply not found");
  }

  return reply;
}

export async function approveReply(userId: string, replyId: string) {
  const reply = await prisma.reply.findFirst({
    where: {
      id: replyId,
      facebookPage: {
        userId,
      },
    },
  });

  if (!reply) {
    throw new NotFoundError("Reply not found");
  }

  if (reply.status !== "PENDING") {
    throw new Error("Reply can only be approved when in PENDING status");
  }

  const updated = await prisma.reply.update({
    where: { id: replyId },
    data: {
      status: "APPROVED",
      approvedBy: userId,
    },
  });

  logger.info({ userId, replyId }, "Reply approved");

  return updated;
}

export async function rejectReply(userId: string, replyId: string) {
  const reply = await prisma.reply.findFirst({
    where: {
      id: replyId,
      facebookPage: {
        userId,
      },
    },
  });

  if (!reply) {
    throw new NotFoundError("Reply not found");
  }

  if (reply.status !== "PENDING") {
    throw new Error("Reply can only be rejected when in PENDING status");
  }

  const updated = await prisma.reply.update({
    where: { id: replyId },
    data: {
      status: "SKIPPED",
    },
  });

  logger.info({ userId, replyId }, "Reply rejected");

  return updated;
}

export async function retryReply(userId: string, replyId: string) {
  const reply = await prisma.reply.findFirst({
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
    throw new NotFoundError("Reply not found");
  }

  if (reply.status !== "FAILED") {
    throw new Error("Reply can only be retried when in FAILED status");
  }

  // Update status to PENDING for retry
  const updated = await prisma.reply.update({
    where: { id: replyId },
    data: {
      status: "PENDING",
    },
  });

  logger.info({ userId, replyId }, "Reply marked for retry");

  return updated;
}

export async function sendReplyToFacebook(replyId: string) {
  const reply = await prisma.reply.findUnique({
    where: { id: replyId },
    include: {
      comment: true,
      facebookPage: true,
    },
  });

  if (!reply) {
    throw new NotFoundError("Reply not found");
  }

  if (!reply.facebookPage.isConnected) {
    throw new Error("Facebook page is not connected");
  }

  try {
    // Send reply to Facebook Graph API
    const response = await axios.post(
      `https://graph.facebook.com/v18.0/${reply.comment.commentId}/comments`,
      {
        message: reply.generatedReply,
      },
      {
        params: {
          access_token: reply.facebookPage.pageAccessToken,
        },
      },
    );

    if (response.data && response.data.id) {
      // Update reply with Facebook reply ID
      const updated = await prisma.reply.update({
        where: { id: replyId },
        data: {
          replyId: response.data.id,
          status: "SENT",
        },
      });

      // Update comment status
      await prisma.comment.update({
        where: { id: reply.commentId },
        data: { status: "REPLIED" },
      });

      logger.info(
        { replyId, facebookReplyId: response.data.id },
        "Reply sent to Facebook successfully",
      );

      return updated;
    } else {
      throw new Error("Failed to send reply to Facebook");
    }
  } catch (error) {
    logger.error({ error, replyId }, "Failed to send reply to Facebook");

    // Update reply status to FAILED
    await prisma.reply.update({
      where: { id: replyId },
      data: {
        status: "FAILED",
        errorMessage: error instanceof Error ? error.message : "Unknown error",
      },
    });

    throw error;
  }
}
