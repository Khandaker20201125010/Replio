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

export function getOAuthUrl(): string {
  const scope =
    "pages_manage_engagement,pages_manage_posts,pages_read_engagement";
  return `https://www.facebook.com/v18.0/dialog/oauth?client_id=${env.META_APP_ID}&redirect_uri=${encodeURIComponent(env.META_REDIRECT_URI)}&scope=${scope}&response_type=code`;
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
  // Check if page is already connected by this user
  const existingPage = await prisma.facebookPage.findFirst({
    where: {
      userId,
      pageId,
    },
  });

  if (existingPage) {
    // Update existing page
    return await prisma.facebookPage.update({
      where: { id: existingPage.id },
      data: {
        pageName,
        pageAccessToken,
        isConnected: true,
      },
    });
  }

  // Create new page connection
  const page = await prisma.facebookPage.create({
    data: {
      userId,
      pageId,
      pageName,
      pageAccessToken,
      isConnected: true,
    },
  });

  logger.info({ userId, pageId }, "Facebook page connected successfully");

  return page;
}

export async function disconnectPage(userId: string, pageId: string) {
  const page = await prisma.facebookPage.findFirst({
    where: {
      userId,
      pageId,
    },
  });

  if (!page) {
    throw new NotFoundError("Page not found");
  }

  await prisma.facebookPage.update({
    where: { id: page.id },
    data: {
      isConnected: false,
    },
  });

  logger.info({ userId, pageId }, "Facebook page disconnected successfully");
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

export async function getPageById(userId: string, pageId: string) {
  const page = await prisma.facebookPage.findFirst({
    where: {
      userId,
      pageId,
      isConnected: true,
    },
  });

  if (!page) {
    throw new NotFoundError("Page not found");
  }

  return page;
}
