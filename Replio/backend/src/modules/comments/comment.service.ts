import prisma from "../../config/prisma";
import { NotFoundError } from "../../utils/errors";
import { logger } from "../../utils/logger";
import { analyzeComment, generateReply, validateReply } from "../ai/ai.service";
import type {
  GetCommentsInput,
  UpdateCommentStatusInput,
} from "./comment.validation";

export async function getComments(userId: string, filters: GetCommentsInput) {
  const { pageId, status, limit = 20, offset = 0 } = filters;

  const where: any = {
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

  const [comments, total] = await Promise.all([
    prisma.comment.findMany({
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
    prisma.comment.count({ where }),
  ]);

  return {
    comments,
    total,
    limit,
    offset,
  };
}

export async function getCommentById(userId: string, commentId: string) {
  const comment = await prisma.comment.findFirst({
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
    throw new NotFoundError("Comment not found");
  }

  return comment;
}

export async function updateCommentStatus(
  userId: string,
  commentId: string,
  data: UpdateCommentStatusInput,
) {
  const comment = await prisma.comment.findFirst({
    where: {
      id: commentId,
      facebookPage: {
        userId,
      },
    },
  });

  if (!comment) {
    throw new NotFoundError("Comment not found");
  }

  const updated = await prisma.comment.update({
    where: { id: commentId },
    data: {
      status: data.status,
    },
  });

  logger.info(
    { userId, commentId, status: data.status },
    "Comment status updated",
  );

  return updated;
}

export async function processComment(commentId: string) {
  const comment = await prisma.comment.findUnique({
    where: { id: commentId },
    include: {
      facebookPage: true,
    },
  });

  if (!comment) {
    throw new NotFoundError("Comment not found");
  }

  // Check if comment is already processed
  if (comment.status !== "PENDING") {
    logger.info(
      { commentId, status: comment.status },
      "Comment already processed",
    );
    return comment;
  }

  // Get AI settings for the user
  const aiSettings = await prisma.aISettings.findUnique({
    where: { userId: comment.facebookPage.userId },
  });

  if (!aiSettings || aiSettings.status !== "ACTIVE") {
    await prisma.comment.update({
      where: { id: commentId },
      data: { status: "IGNORED" },
    });
    logger.info({ commentId }, "AI not enabled, comment ignored");
    return comment;
  }

  try {
    // Analyze comment with AI
    const analysis = await analyzeComment(comment.userMessage, aiSettings);

    // Update comment with AI analysis
    await prisma.comment.update({
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
      await prisma.comment.update({
        where: { id: commentId },
        data: { status: "IGNORED" },
      });
      logger.info(
        { commentId, confidence: analysis.confidence },
        "Low confidence, comment ignored",
      );
      return comment;
    }

    // Check spam handling
    if (analysis.isSpam) {
      if (aiSettings.spamHandling === "ignore") {
        await prisma.comment.update({
          where: { id: commentId },
          data: { status: "IGNORED" },
        });
        logger.info({ commentId }, "Spam detected, comment ignored");
        return comment;
      }
      // For 'reply' or 'review', continue to reply generation
    }

    // Check if human review is required
    if (analysis.requiresHumanReview || aiSettings.humanApprovalMode) {
      await prisma.comment.update({
        where: { id: commentId },
        data: { status: "PROCESSED" },
      });
      logger.info({ commentId }, "Human review required");
      return comment;
    }

    // Generate reply
    const replyResult = await generateReply(
      comment.userMessage,
      analysis,
      aiSettings,
    );

    // Validate reply
    const isValid = await validateReply(replyResult.reply, aiSettings);
    if (!isValid) {
      await prisma.comment.update({
        where: { id: commentId },
        data: { status: "ERROR" },
      });
      logger.error({ commentId }, "Generated reply failed validation");
      return comment;
    }

    // Create reply record
    const reply = await prisma.reply.create({
      data: {
        commentId: comment.id,
        facebookPageId: comment.facebookPageId,
        generatedReply: replyResult.reply,
        status: "PENDING",
        aiProvider: aiSettings.aiProvider,
        confidence: replyResult.confidence,
        requiresHumanReview:
          analysis.requiresHumanReview || aiSettings.humanApprovalMode,
      },
    });

    // Update comment status
    await prisma.comment.update({
      where: { id: commentId },
      data: { status: "PROCESSED" },
    });

    logger.info(
      { commentId, replyId: reply.id },
      "Comment processed successfully, reply created",
    );

    return comment;
  } catch (error) {
    logger.error({ error, commentId }, "Comment processing failed");
    await prisma.comment.update({
      where: { id: commentId },
      data: { status: "ERROR" },
    });
    throw error;
  }
}
