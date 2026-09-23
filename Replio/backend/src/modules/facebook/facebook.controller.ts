import type { Request, Response } from "express";
import {
  getOAuthUrl,
  exchangeCodeForToken,
  getLongLivedUserToken,
  getUserPages,
  verifyPage,
  connectPage,
  disconnectPage,
  getUserConnectedPages,
  getPageById,
  resubscribePage,
} from "./facebook.service";
import { logger } from "../../utils/logger";
import { env } from "../../config/env";
import prisma from "../../config/prisma";

function getValidFrontendUrl(stateOrigin?: string): string {
  if (stateOrigin) {
    try {
      const parsedUrl = new URL(stateOrigin);
      const allowedOrigins = [
        env.FRONTEND_URL,
        "https://replio-frontend-livid.vercel.app",
        "https://replio-frontend.vercel.app",
        "http://localhost:3000",
      ];
      if (
        allowedOrigins.includes(parsedUrl.origin) ||
        parsedUrl.hostname.endsWith(".vercel.app") ||
        parsedUrl.hostname === "localhost" ||
        parsedUrl.hostname === "127.0.0.1"
      ) {
        return parsedUrl.origin;
      }
    } catch {
      // Fall through to default
    }
  }
  return env.FRONTEND_URL;
}

export async function initiateOAuthController(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const userId = req.user?.userId;
    const origin =
      (typeof req.query.origin === "string" && req.query.origin) ||
      req.headers.origin ||
      env.FRONTEND_URL;

    // Encode state with userId and origin
    const statePayload = {
      userId: userId || "",
      origin,
    };
    const state = Buffer.from(JSON.stringify(statePayload)).toString("base64url");
    const oauthUrl = getOAuthUrl(state);

    // If request explicitly accepts HTML and not JSON (e.g. direct link in browser)
    if (
      req.headers.accept?.includes("text/html") &&
      !req.headers.accept?.includes("application/json") &&
      !req.xhr
    ) {
      res.redirect(oauthUrl);
      return;
    }

    res.status(200).json({
      success: true,
      data: {
        authUrl: oauthUrl,
      },
    });
  } catch (error) {
    logger.error({ error }, "OAuth initiation failed");
    throw error;
  }
}

export async function oauthCallbackController(
  req: Request,
  res: Response,
): Promise<void> {
  const { code, error, state } = req.query;

  let userId: string | undefined = req.user?.userId;
  let frontendUrl = env.FRONTEND_URL;

  if (state && typeof state === "string") {
    try {
      const decoded = JSON.parse(
        Buffer.from(state, "base64url").toString("utf-8"),
      );
      if (decoded.userId) userId = decoded.userId;
      if (decoded.origin) frontendUrl = getValidFrontendUrl(decoded.origin);
    } catch {
      // If state was raw string / userId
      if (!userId) userId = state;
    }
  }

  try {
    if (error) {
      logger.error({ error }, "Facebook OAuth callback error");
      res.redirect(`${frontendUrl}/pages?error=${encodeURIComponent(String(error))}`);
      return;
    }

    if (!code || typeof code !== "string") {
      logger.warn("OAuth callback called without authorization code");
      res.redirect(`${frontendUrl}/pages?error=no_code`);
      return;
    }

    // Exchange code for user access token
    const shortLivedToken = await exchangeCodeForToken(code);

    // Exchange short-lived user token for long-lived user token (60-day expiry).
    // This guarantees that all Page Access Tokens fetched via /me/accounts are permanent (never expire)!
    const userAccessToken = await getLongLivedUserToken(shortLivedToken);

    // Get user's Facebook pages
    const pagesResponse = await getUserPages(userAccessToken);

    if (!pagesResponse.data || pagesResponse.data.length === 0) {
      logger.warn({ userId }, "No Facebook pages returned by Meta");
      res.redirect(`${frontendUrl}/pages?warning=no_pages_found`);
      return;
    }

    // Connect all fetched pages for this user if userId is available
    if (userId) {
      for (const page of pagesResponse.data) {
        await connectPage(
          userId,
          page.id,
          page.name,
          page.access_token,
        );
      }

      logger.info(
        { userId, pageCount: pagesResponse.data.length },
        "Facebook pages connected successfully from OAuth callback",
      );

      res.redirect(
        `${frontendUrl}/pages?connected=true&count=${pagesResponse.data.length}`,
      );
      return;
    }

    // Fallback if userId was not present in state
    res.status(200).json({
      success: true,
      data: {
        pages: pagesResponse.data,
        userAccessToken,
      },
    });
  } catch (err: any) {
    logger.error({ error: err }, "Facebook OAuth callback processing failed");
    res.redirect(
      `${frontendUrl}/pages?error=${encodeURIComponent(err.message || "connection_failed")}`,
    );
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
    const [pages, aiSettings] = await Promise.all([
      getUserConnectedPages(userId),
      prisma.aISettings.findUnique({ where: { userId } }),
    ]);

    const autoReplyEnabled = aiSettings
      ? !aiSettings.humanApprovalMode && aiSettings.status === "ACTIVE"
      : true;

    res.status(200).json({
      success: true,
      data: {
        pages: pages.map((page) => ({
          id: page.id,
          pageId: page.pageId,
          pageName: page.pageName,
          isConnected: page.isConnected,
          isActive: page.isConnected,
          autoReplyEnabled,
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

export async function resubscribePageController(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const userId = req.user!.userId;
    const { pageId } = req.params;

    if (!pageId || Array.isArray(pageId)) {
      res.status(400).json({ success: false, message: "Invalid page ID" });
      return;
    }

    const result = await resubscribePage(userId, pageId);

    res.status(200).json({
      success: result.success,
      data: result,
      message: result.success
        ? "Page subscribed to webhooks successfully"
        : `Subscription failed: ${result.error}`,
    });
  } catch (error) {
    logger.error({ error }, "Resubscribe page failed");
    throw error;
  }
}
