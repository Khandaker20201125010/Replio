import type { Request, Response } from "express";
import {
  getOAuthUrl,
  exchangeCodeForToken,
  getUserPages,
  verifyPage,
  connectPage,
  disconnectPage,
  getUserConnectedPages,
  getPageById,
} from "./facebook.service";
import { logger } from "../../utils/logger";
import { env } from "../../config/env";

export async function initiateOAuthController(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const oauthUrl = getOAuthUrl();

    res.redirect(oauthUrl);
  } catch (error) {
    logger.error({ error }, "OAuth initiation failed");
    throw error;
  }
}

export async function oauthCallbackController(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const { code, error } = req.query;

    if (error) {
      logger.error({ error }, "OAuth callback error");
      res.redirect(`${env.FRONTEND_URL}/login?error=oauth_failed`);
      return;
    }

    if (!code || typeof code !== "string") {
      logger.warn("OAuth callback called without authorization code");
      res.status(400).json({
        success: false,
        error: {
          code: "VALIDATION_ERROR",
          message:
            "This endpoint should only be called by Facebook OAuth with an authorization code",
          info: "To test Facebook OAuth, access /api/facebook/oauth first to initiate the flow",
        },
      });
      return;
    }

    // Exchange code for user access token
    const userAccessToken = await exchangeCodeForToken(code);

    // Get user's Facebook pages
    const pagesResponse = await getUserPages(userAccessToken);

    res.status(200).json({
      success: true,
      data: {
        pages: pagesResponse.data,
        userAccessToken,
      },
    });
  } catch (error) {
    logger.error({ error }, "OAuth callback failed");
    throw error;
  }
}

export async function connectPageController(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const userId = req.user!.userId;
    const { pageId, pageName, accessToken } = req.body;

    // Verify page with Facebook
    await verifyPage(pageId, accessToken);

    // Connect page in database
    const page = await connectPage(userId, pageId, pageName, accessToken);

    res.status(200).json({
      success: true,
      data: {
        page: {
          id: page.id,
          pageId: page.pageId,
          pageName: page.pageName,
          isConnected: page.isConnected,
        },
      },
    });
  } catch (error) {
    logger.error({ error }, "Page connection failed");
    throw error;
  }
}

export async function disconnectPageController(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const userId = req.user!.userId;
    const { pageId } = req.params;

    if (Array.isArray(pageId)) {
      throw new Error("Invalid page ID");
    }

    await disconnectPage(userId, pageId);

    res.status(200).json({
      success: true,
      message: "Page disconnected successfully",
    });
  } catch (error) {
    logger.error({ error }, "Page disconnection failed");
    throw error;
  }
}

export async function getConnectedPagesController(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const userId = req.user!.userId;
    const pages = await getUserConnectedPages(userId);

    res.status(200).json({
      success: true,
      data: {
        pages: pages.map((page) => ({
          id: page.id,
          pageId: page.pageId,
          pageName: page.pageName,
          isConnected: page.isConnected,
          createdAt: page.createdAt,
        })),
      },
    });
  } catch (error) {
    logger.error({ error }, "Get connected pages failed");
    throw error;
  }
}

export async function getPageController(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const userId = req.user!.userId;
    const { pageId } = req.params;

    if (Array.isArray(pageId)) {
      throw new Error("Invalid page ID");
    }

    const page = await getPageById(userId, pageId);

    res.status(200).json({
      success: true,
      data: {
        page: {
          id: page.id,
          pageId: page.pageId,
          pageName: page.pageName,
          isConnected: page.isConnected,
          createdAt: page.createdAt,
        },
      },
    });
  } catch (error) {
    logger.error({ error }, "Get page failed");
    throw error;
  }
}
