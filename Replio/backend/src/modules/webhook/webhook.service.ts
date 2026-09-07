import prisma from "../../config/prisma";
import { logger } from "../../utils/logger";
import { env } from "../../config/env";
import { processComment } from "../comments/comment.service";

export async function verifyWebhook(
  mode: string,
  token: string,
  challenge: string,
) {
  if (mode === "subscribe" && token === env.META_WEBHOOK_VERIFY_TOKEN) {
    return challenge;
  }
  throw new Error("Invalid webhook verification");
}

export async function processWebhookEvent(payload: any) {
  logger.info({ payload }, "Processing webhook event");

  if (!payload.entry || !Array.isArray(payload.entry)) {
    logger.warn("Invalid webhook payload structure");
    return;
  }

  for (const entry of payload.entry) {
    if (!entry.changes || !Array.isArray(entry.changes)) {
      continue;
    }

    for (const change of entry.changes) {
      if (change.field === "comments" && change.value) {
        await handleCommentEvent(change.value);
      }
    }
  }
}

async function handleCommentEvent(event: any) {
  try {
    const { comment_id, post_id, message, from, verb } = event;

    // Only process new comments
    if (verb !== "add") {
      logger.info({ comment_id, verb }, "Ignoring non-add comment event");
      return;
    }

    // Extract page ID from post_id
    const pageId = post_id.split("_")[0];

    // Find connected page
    const facebookPage = await prisma.facebookPage.findFirst({
      where: {
        pageId,
        isConnected: true,
      },
    });

    if (!facebookPage) {
      logger.warn({ pageId }, "No connected page found for webhook event");
      return;
    }

    // Check for duplicate comment
    const existingComment = await prisma.comment.findFirst({
      where: {
        commentId: comment_id,
      },
    });

    if (existingComment) {
      logger.info({ comment_id }, "Comment already exists, skipping");
      return;
    }

    // Create comment record
    const comment = await prisma.comment.create({
      data: {
        commentId: comment_id,
        facebookPageId: facebookPage.id,
        postId: post_id,
        userId: from.id,
        userName: from.name,
        userMessage: message,
        status: "PENDING",
        createdTime: new Date(),
      },
    });

    logger.info(
      { commentId: comment.id, facebookCommentId: comment_id },
      "Comment created from webhook",
    );

    // Trigger comment processing asynchronously
    // In production, this should use a job queue
    setTimeout(async () => {
      try {
        await processComment(comment.id);
      } catch (error) {
        logger.error(
          { error, commentId: comment.id },
          "Async comment processing failed",
        );
      }
    }, 0);
  } catch (error) {
    logger.error({ error, event }, "Failed to handle comment event");
  }
}
