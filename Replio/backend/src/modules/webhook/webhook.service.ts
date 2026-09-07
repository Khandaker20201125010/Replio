import crypto from "crypto";
import prisma from "../../config/prisma";
import { env } from "../../config/env";
import { logger } from "../../utils/logger";
import { ValidationError } from "../../utils/errors";

export function verifyWebhookSignature(
  payload: string,
  signature: string,
): boolean {
  if (!env.META_WEBHOOK_VERIFY_TOKEN) {
    logger.warn(
      "META_WEBHOOK_VERIFY_TOKEN not set, skipping signature verification",
    );
    return true;
  }

  const expectedSignature =
    "sha256=" +
    crypto
      .createHmac("sha256", env.META_WEBHOOK_VERIFY_TOKEN)
      .update(payload)
      .digest("hex");

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature),
  );
}

export function verifyWebhookChallenge(
  mode: string,
  token: string,
  challenge: string,
): boolean {
  if (!env.META_WEBHOOK_VERIFY_TOKEN) {
    logger.warn(
      "META_WEBHOOK_VERIFY_TOKEN not set, webhook verification may fail",
    );
    return false;
  }

  return mode === "subscribe" && token === env.META_WEBHOOK_VERIFY_TOKEN;
}

export async function processWebhookEvent(payload: any): Promise<void> {
  try {
    // Validate webhook structure
    if (payload.object !== "page") {
      logger.warn({ object: payload.object }, "Invalid webhook object");
      return;
    }

    // Process each entry
    for (const entry of payload.entry || []) {
      // Process each messaging event
      for (const messaging of entry.messaging || []) {
        if (messaging.field === "comments") {
          await processCommentEvent(messaging.value, entry.id);
        }
      }
    }

    logger.info("Webhook event processed successfully");
  } catch (error) {
    logger.error({ error }, "Webhook event processing failed");
    throw error;
  }
}

async function processCommentEvent(value: any, pageId: string): Promise<void> {
  try {
    // Extract comment data
    const commentId = value.comment_id;
    const postId = value.post_id;
    const userId = value.sender_id;
    const message = value.message;
    const createdTime = new Date(value.created_time * 1000); // Convert Unix timestamp

    if (!commentId || !postId || !message) {
      logger.warn({ value }, "Invalid comment event data");
      return;
    }

    // Check if comment already exists (idempotency)
    const existingComment = await prisma.comment.findUnique({
      where: { commentId },
    });

    if (existingComment) {
      logger.debug({ commentId }, "Comment already exists, skipping");
      return;
    }

    // Find the Facebook page in our database
    const facebookPage = await prisma.facebookPage.findFirst({
      where: {
        pageId,
        isConnected: true,
      },
    });

    if (!facebookPage) {
      logger.warn({ pageId }, "Facebook page not found in database");
      return;
    }

    // Create comment record
    const comment = await prisma.comment.create({
      data: {
        facebookPageId: facebookPage.id,
        commentId,
        postId,
        userId,
        userName: null, // Will be fetched from Facebook if needed
        userMessage: message,
        createdTime,
        status: "PENDING",
      },
    });

    logger.info(
      {
        commentId: comment.id,
        facebookCommentId: commentId,
        pageId,
      },
      "Comment created successfully",
    );

    // Trigger comment processing (in real implementation, this would be a background job)
    // For now, we'll just log that processing should happen
    logger.info(
      { commentId: comment.id },
      "Comment processing should be triggered",
    );
  } catch (error) {
    logger.error({ error, value }, "Comment event processing failed");
    throw error;
  }
}
