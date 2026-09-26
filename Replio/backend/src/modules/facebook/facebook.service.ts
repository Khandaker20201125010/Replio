import axios from "axios";
import prisma from "../../config/prisma";
import { env } from "../../config/env";
import {
  ExternalAPIError,
  NotFoundError,
  ConflictError,
} from "../../utils/errors";
import { logger } from "../../utils/logger";
import type {
  FacebookPagesResponse,
  FacebookPageDetails,
} from "./facebook.types";

export function getOAuthUrl(state?: string): string {
  const scope =
    env.META_OAUTH_SCOPES ||
    "pages_show_list,pages_read_engagement,pages_manage_posts,pages_manage_engagement,pages_manage_metadata,pages_read_user_content";

  if (!env.META_APP_ID || !env.META_REDIRECT_URI) {
    throw new Error("META_APP_ID and META_REDIRECT_URI must be configured");
  }

  const redirectUri = env.META_REDIRECT_URI;
  logger.info(
    { redirectUri, metaAppId: env.META_APP_ID },
    "Generating Facebook OAuth URL",
  );
  let url = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${env.META_APP_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}&response_type=code&auth_type=rerequest`;
  if (state) {
    url += `&state=${encodeURIComponent(state)}`;
  }
  return url;
}

export async function exchangeCodeForToken(code: string): Promise<string> {
  try {
    const response = await axios.get(
      "https://graph.facebook.com/v18.0/oauth/access_token",
      {
        params: {
          client_id: env.META_APP_ID,
          client_secret: env.META_APP_SECRET,
          redirect_uri: env.META_REDIRECT_URI,
          code,
        },
      },
    );

    if (!response.data.access_token) {
      throw new ExternalAPIError(
        "Failed to exchange code for token",
        "facebook",
      );
    }

    return response.data.access_token;
  } catch (error) {
    logger.error({ error }, "Facebook token exchange failed");
    throw new ExternalAPIError("Failed to exchange code for token", "facebook");
  }
}

export async function getLongLivedUserToken(
  shortLivedToken: string,
): Promise<string> {
  try {
    const response = await axios.get(
      "https://graph.facebook.com/v18.0/oauth/access_token",
      {
        params: {
          grant_type: "fb_exchange_token",
          client_id: env.META_APP_ID,
          client_secret: env.META_APP_SECRET,
          fb_exchange_token: shortLivedToken,
        },
      },
    );

    if (response.data?.access_token) {
      logger.info(
        "Successfully exchanged short-lived token for long-lived user token",
      );
      return response.data.access_token;
    }
    return shortLivedToken;
  } catch (error) {
    logger.warn(
      { error },
      "Failed to exchange for long-lived token, falling back to short-lived token",
    );
    return shortLivedToken;
  }
}

export async function getUserPages(
  userAccessToken: string,
): Promise<FacebookPagesResponse> {
  try {
    const response = await axios.get(
      "https://graph.facebook.com/v18.0/me/accounts",
      {
        params: {
          access_token: userAccessToken,
        },
      },
    );

    return response.data;
  } catch (error) {
    logger.error({ error }, "Facebook pages fetch failed");
    throw new ExternalAPIError("Failed to fetch user pages", "facebook");
  }
}

export async function verifyPage(
  pageId: string,
  pageAccessToken: string,
): Promise<FacebookPageDetails> {
  try {
    const response = await axios.get(
      `https://graph.facebook.com/v18.0/${pageId}`,
      {
        params: {
          fields: "id,name,category,picture",
          access_token: pageAccessToken,
        },
      },
    );

    return response.data;
  } catch (error) {
    logger.error({ error, pageId }, "Facebook page verification failed");
    throw new ExternalAPIError("Failed to verify page", "facebook");
  }
}

export async function connectPage(
  userId: string,
  pageId: string,
  pageName: string,
  pageAccessToken: string,
) {
  // Check if page is already connected by this user or exists
  const existingPage = await prisma.facebookPage.findUnique({
    where: {
      pageId,
    },
  });

  let page;
  if (existingPage) {
    // Update existing page
    page = await prisma.facebookPage.update({
      where: { id: existingPage.id },
      data: {
        userId,
        pageName,
        pageAccessToken,
        isConnected: true,
      },
    });
  } else {
    // Create new page connection
    page = await prisma.facebookPage.create({
      data: {
        userId,
        pageId,
        pageName,
        pageAccessToken,
        isConnected: true,
      },
    });
  }

  // Subscribe page to app webhooks for comments
  await subscribePageToWebhooks(pageId, pageAccessToken);

  logger.info({ userId, pageId }, "Facebook page connected successfully");

  return page;
}

export async function subscribePageToWebhooks(
  pageId: string,
  pageAccessToken: string,
): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    const response = await axios.post(
      `https://graph.facebook.com/v18.0/${pageId}/subscribed_apps`,
      null,
      {
        params: {
          subscribed_fields: "feed",
          access_token: pageAccessToken,
        },
      },
    );
    logger.info(
      { pageId, data: response.data },
      "Facebook page subscribed to webhooks successfully",
    );
    return { success: true, data: response.data };
  } catch (subErr: any) {
    const errorMsg =
      subErr?.response?.data?.error?.message ||
      subErr?.message ||
      "Unknown error";
    logger.warn(
      { pageId, error: subErr?.response?.data || subErr?.message },
      "Failed to subscribe page to webhooks",
    );
    return { success: false, error: errorMsg };
  }
}

export async function getPageWebhookSubscription(
  pageId: string,
  pageAccessToken: string,
): Promise<{ subscribed: boolean; fields: string[]; error?: string }> {
  try {
    const response = await axios.get(
      `https://graph.facebook.com/v18.0/${pageId}/subscribed_apps`,
      {
        params: { access_token: pageAccessToken },
      },
    );

    const apps: any[] = response.data?.data ?? [];
    const fields = apps.flatMap((app) => app.subscribed_fields ?? []);

    return { subscribed: apps.length > 0, fields };
  } catch (error: any) {
    return {
      subscribed: false,
      fields: [],
      error:
        error?.response?.data?.error?.message ||
        error?.message ||
        "Unknown error",
    };
  }
}

export async function getAppWebhookSubscriptions(): Promise<{
  configured: boolean;
  pageFields: string[];
  callbackUrl?: string;
  error?: string;
}> {
  if (!env.META_APP_ID || !env.META_APP_SECRET) {
    return {
      configured: false,
      pageFields: [],
      error: "META_APP_ID / META_APP_SECRET are not configured",
    };
  }

  try {
    const response = await axios.get(
      `https://graph.facebook.com/v18.0/${env.META_APP_ID}/subscriptions`,
      {
        params: {
          access_token: `${env.META_APP_ID}|${env.META_APP_SECRET}`,
        },
      },
    );

    const pageSubscription = (response.data?.data ?? []).find(
      (sub: any) => sub.object === "page",
    );

    return {
      configured: Boolean(pageSubscription),
      pageFields: (pageSubscription?.fields ?? []).map((f: any) =>
        typeof f === "string" ? f : f.name,
      ),
      callbackUrl: pageSubscription?.callback_url,
    };
  } catch (error: any) {
    return {
      configured: false,
      pageFields: [],
      error:
        error?.response?.data?.error?.message ||
        error?.message ||
        "Unknown error",
    };
  }
}

export async function resubscribePage(userId: string, pageIdOrId: string) {
  const page = await prisma.facebookPage.findFirst({
    where: {
      userId,
      OR: [{ id: pageIdOrId }, { pageId: pageIdOrId }],
      isConnected: true,
    },
  });

  if (!page) {
    throw new NotFoundError("Connected page not found");
  }

  const result = await subscribePageToWebhooks(
    page.pageId,
    page.pageAccessToken,
  );
  return {
    pageId: page.pageId,
    pageName: page.pageName,
    ...result,
  };
}

export async function disconnectPage(userId: string, pageIdOrId: string) {
  const page = await prisma.facebookPage.findFirst({
    where: {
      userId,
      OR: [{ id: pageIdOrId }, { pageId: pageIdOrId }],
    },
  });

  if (!page) {
    throw new NotFoundError("Page not found");
  }

  // Attempt to unsubscribe page from app webhooks on Meta
  try {
    await axios.delete(
      `https://graph.facebook.com/v18.0/${page.pageId}/subscribed_apps`,
      {
        params: {
          access_token: page.pageAccessToken,
        },
      },
    );
    logger.info(
      { pageId: page.pageId },
      "Unsubscribed page from webhooks on Meta",
    );
  } catch (subErr: any) {
    logger.warn(
      { pageId: page.pageId, error: subErr?.response?.data || subErr?.message },
      "Could not unsubscribe page from webhooks on Meta (token may be expired or already revoked)",
    );
  }

  await prisma.facebookPage.update({
    where: { id: page.id },
    data: {
      isConnected: false,
    },
  });

  logger.info(
    { userId, pageId: page.pageId },
    "Facebook page disconnected successfully",
  );
}

export async function getUserConnectedPages(userId: string) {
  return await prisma.facebookPage.findMany({
    where: {
      userId,
      isConnected: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getPageById(userId: string, pageIdOrId: string) {
  const page = await prisma.facebookPage.findFirst({
    where: {
      userId,
      OR: [{ id: pageIdOrId }, { pageId: pageIdOrId }],
      isConnected: true,
    },
  });

  if (!page) {
    throw new NotFoundError("Page not found");
  }

  return page;
}

