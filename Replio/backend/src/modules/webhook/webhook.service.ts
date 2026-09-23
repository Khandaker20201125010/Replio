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

    const entryPageId = entry.id;

    for (const change of entry.changes) {
      if (
        (change.field === "feed" || change.field === "comments") &&
        change.value
      ) {
        // If feed event, only ignore if it's definitely not a comment (no comment_id and item is not comment)
        if (
          change.field === "feed" &&
          change.value.item &&
          change.value.item !== "comment" &&
          !change.value.comment_id
        ) {
          logger.info(
            { item: change.value.item },
            "Ignoring non-comment feed item",
          );
          continue;
        }

        await handleCommentEvent(change.value, entryPageId);
      }
    }
  }
}

async function handleCommentEvent(event: any, entryPageId?: string) {
  try {
    const comment_id = event.comment_id || event.id;
    const post_id = event.post_id || event.post?.id;
    const message = event.message;
    const from = event.from;
    const verb = event.verb || "add";

    // Only process new comments
    if (verb !== "add") {
      logger.info({ comment_id, verb }, "Ignoring non-add comment event");
      return;
    }

    if (!message || !comment_id) {
      logger.info({ event }, "Missing comment_id or message, skipping");
      return;
    }

    // Extract page ID from entryPageId, post_id, or comment_id
    let pageId = entryPageId;
    if (!pageId && post_id) {
      pageId = post_id.split("_")[0];
    }

    // Find connected page
    let facebookPage = null;
    if (pageId) {
      facebookPage = await prisma.facebookPage.findFirst({
        where: {
          pageId: String(pageId),
          isConnected: true,
        },
      });
    }

    // Fallback: extract page ID prefix from post_id if not found yet
    if (!facebookPage && post_id && post_id.includes("_")) {
      const extractedPageId = post_id.split("_")[0];
      facebookPage = await prisma.facebookPage.findFirst({
        where: {
          pageId: String(extractedPageId),
          isConnected: true,
        },
      });
    }

    // Fallback: extract page ID prefix from comment_id if not found yet
    if (!facebookPage && comment_id && comment_id.includes("_")) {
      const extractedPageId = comment_id.split("_")[0];
      facebookPage = await prisma.facebookPage.findFirst({
        where: {
          pageId: String(extractedPageId),
          isConnected: true,
        },
      });
    }

    if (!facebookPage) {
      logger.warn(
        { pageId, entryPageId, post_id, comment_id },
        "No connected page found for webhook event",
      );
      return;
    }

    // CRITICAL: Ignore comments made by the Page itself (prevents infinite reply loop!)
    if (from && String(from.id) === String(facebookPage.pageId)) {
      logger.info(
        { comment_id, pageId: facebookPage.pageId },
        "Ignoring comment made by the Page itself",
      );
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
        postId: post_id || `${facebookPage.pageId}_unknown`,
        userId: from?.id || null,
        userName: from?.name || null,
        userMessage: message,
        status: "PENDING",
        createdTime: new Date(),
      },
    });

    logger.info(
      { commentId: comment.id, facebookCommentId: comment_id },
      "Comment created from webhook",
    );

    // Process comment immediately so it is not killed on serverless runtimes
    try {
      await processComment(comment.id);
    } catch (error) {
      logger.error(
        { error, commentId: comment.id },
        "Comment processing failed",
      );
    }
  } catch (error) {
    logger.error({ error, event }, "Failed to handle comment event");
  }
}
