import prisma from "../../config/prisma";
import { logger } from "../../utils/logger";
import { env } from "../../config/env";
import { processComment, storeNewComment } from "../comments/comment.service";
import {
  getAppWebhookSubscriptions,
  getPageWebhookSubscription,
} from "../facebook/facebook.service";

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

async function recordEvent(data: {
  objectType?: string | null;
  pageId?: string | null;
  field?: string | null;
  verb?: string | null;
  commentId?: string | null;
  payload: any;
  status: string;
  reason?: string | null;
  error?: string | null;
}) {
  try {
    await prisma.webhookEvent.create({
      data: {
        source: "facebook",
        objectType: data.objectType ?? null,
        pageId: data.pageId ? String(data.pageId) : null,
        field: data.field ?? null,
        verb: data.verb ?? null,
        commentId: data.commentId ? String(data.commentId) : null,
        payload: data.payload ?? {},
        status: data.status,
        reason: data.reason ?? null,
        error: data.error ?? null,
      },
    });
  } catch (error) {
    logger.error({ error }, "Failed to persist webhook event");
  }
}

export async function processWebhookEvent(payload: any) {
  logger.info({ payload }, "Processing webhook event");

  if (!payload || !payload.entry || !Array.isArray(payload.entry)) {
    logger.warn("Invalid webhook payload structure");
    await recordEvent({
      objectType: payload?.object,
      payload,
      status: "IGNORED",
      reason: "Invalid webhook payload structure (no entry array)",
    });
    return;
  }

  for (const entry of payload.entry) {
    if (!entry.changes || !Array.isArray(entry.changes)) {
      await recordEvent({
        objectType: payload?.object,
        pageId: entry?.id,
        payload: entry,
        status: "IGNORED",
        reason: "Entry has no changes array",
      });
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
          await recordEvent({
            objectType: payload?.object,
            pageId: entryPageId,
            field: change.field,
            verb: change.value.verb,
            payload: change,
            status: "IGNORED",
            reason: `Non-comment feed item: ${change.value.item}`,
          });
          continue;
        }

        await handleCommentEvent(
          change.value,
          entryPageId,
          change.field,
          payload?.object,
        );
      } else {
        await recordEvent({
          objectType: payload?.object,
          pageId: entryPageId,
          field: change.field,
          payload: change,
          status: "IGNORED",
          reason: `Unhandled webhook field: ${change.field}`,
        });
      }
    }
  }
}

async function handleCommentEvent(
  event: any,
  entryPageId?: string,
  field?: string,
  objectType?: string,
) {
  const comment_id = event?.comment_id || event?.id;
  const verb = event?.verb || "add";

  const record = (status: string, reason?: string, error?: string) =>
    recordEvent({
      objectType,
      pageId: entryPageId,
      field,
      verb,
      commentId: comment_id,
      payload: event,
      status,
      reason,
      error,
    });

  try {
    const post_id = event.post_id || event.post?.id;
    const message = event.message;
    const from = event.from;

    // Only process new comments
    if (verb !== "add") {
      logger.info({ comment_id, verb }, "Ignoring non-add comment event");
      await record("IGNORED", `Comment event verb is "${verb}", not "add"`);
      return;
    }

    if (!message || !comment_id) {
      logger.info({ event }, "Missing comment_id or message, skipping");
      await record("IGNORED", "Missing comment_id or message in payload");
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
      await record(
        "ERROR",
        `No connected page found for page id ${pageId ?? "unknown"} — connect the page in the dashboard`,
      );
      return;
    }

    // CRITICAL: Ignore comments made by the Page itself (prevents infinite reply loop!)
    if (from && String(from.id) === String(facebookPage.pageId)) {
      logger.info(
        { comment_id, pageId: facebookPage.pageId },
        "Ignoring comment made by the Page itself",
      );
      await record("IGNORED", "Comment authored by the Page itself");
      return;
    }

    const comment = await storeNewComment({
      commentId: comment_id,
      facebookPageId: facebookPage.id,
      postId: post_id || `${facebookPage.pageId}_unknown`,
      authorId: from?.id ?? null,
      authorName: from?.name ?? null,
      message,
      createdTime: event.created_time
        ? new Date(Number(event.created_time) * 1000)
        : new Date(),
    });

    if (!comment) {
      logger.info({ comment_id }, "Comment already exists, skipping");
      await record("IGNORED", "Comment already stored");
      return;
    }

    logger.info(
      { commentId: comment.id, facebookCommentId: comment_id },
      "Comment created from webhook",
    );

    // Process comment immediately so it is not killed on serverless runtimes
    try {
      await processComment(comment.id);
      await record("PROCESSED");
    } catch (error) {
      logger.error(
        { error, commentId: comment.id },
        "Comment processing failed",
      );
      await record(
        "ERROR",
        "Comment stored but AI processing failed",
        error instanceof Error ? error.message : String(error),
      );
    }
  } catch (error) {
    logger.error({ error, event }, "Failed to handle comment event");
    await record(
      "ERROR",
      "Unhandled error while handling comment event",
      error instanceof Error ? error.message : String(error),
    );
  }
}

export async function getWebhookDiagnostics(userId: string) {
  const pages = await prisma.facebookPage.findMany({
    where: { userId, isConnected: true },
  });

  const pageDiagnostics = await Promise.all(
    pages.map(async (page) => ({
      pageId: page.pageId,
      pageName: page.pageName,
      commentCount: await prisma.comment.count({
        where: { facebookPageId: page.id },
      }),
      subscription: await getPageWebhookSubscription(
        page.pageId,
        page.pageAccessToken,
      ),
    })),
  );

  const [recentEvents, aiSettings, lastComment] = await Promise.all([
    prisma.webhookEvent.findMany({
      orderBy: { createdAt: "desc" },
      take: 20,
    }),
    prisma.aISettings.findUnique({ where: { userId } }),
    prisma.comment.findFirst({
      where: { facebookPage: { userId } },
      orderBy: { createdAt: "desc" },
      select: { createdAt: true, userMessage: true, status: true },
    }),
  ]);

  return {
    config: {
      verifyTokenConfigured: Boolean(env.META_WEBHOOK_VERIFY_TOKEN),
      appIdConfigured: Boolean(env.META_APP_ID),
      appSecretConfigured: Boolean(env.META_APP_SECRET),
      aiEnabled: aiSettings ? aiSettings.status === "ACTIVE" : true,
      humanApprovalMode: aiSettings?.humanApprovalMode ?? false,
    },
    appSubscriptions: await getAppWebhookSubscriptions(),
    pages: pageDiagnostics,
    lastComment,
    recentEvents,
  };
}
