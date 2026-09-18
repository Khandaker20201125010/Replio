import type { Request, Response } from "express";
import axios from "axios";
import { env } from "../../config/env";
import {
  loginWithFacebook,
  loginWithGoogle,
  getCurrentUser,
  updateProfile,
} from "./auth.service";
import { updateProfileSchema } from "./auth.validation";
import { logger } from "../../utils/logger";
import { ExternalAPIError } from "../../utils/errors";

export async function logoutController(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    // Clear HTTP-only cookie with same settings as when set
    res.clearCookie("auth_token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    });

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    logger.error({ error }, "Logout failed");
    throw error;
  }
}

export async function getCurrentUserController(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const userId = req.user!.userId;
    const user = await getCurrentUser(userId);

    res.status(200).json({
      success: true,
      data: {
        user,
      },
    });
  } catch (error) {
    logger.error({ error }, "Get current user failed");
    throw error;
  }
}

function getValidFrontendUrl(stateQuery: unknown): string {
  if (typeof stateQuery === "string" && stateQuery) {
    try {
      const parsedUrl = new URL(stateQuery);
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

export async function facebookOAuthController(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const backendUrl = `${req.protocol}://${req.get("host")}`;
    const redirectUri =
      env.META_REDIRECT_URI || `${backendUrl}/api/auth/facebook/callback`;
    const scope = "public_profile,email";
    const state = typeof req.query.state === "string" ? req.query.state : "";

    const oauthUrl = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${env.META_APP_ID}&redirect_uri=${encodeURIComponent(
      redirectUri,
    )}&scope=${scope}&response_type=code${state ? `&state=${encodeURIComponent(state)}` : ""}`;

    res.redirect(oauthUrl);
  } catch (error) {
    logger.error({ error }, "Facebook login initiation failed");
    throw error;
  }
}

export async function facebookCallbackController(
  req: Request,
  res: Response,
): Promise<void> {
  const { code, error, state } = req.query;
  const frontendUrl = getValidFrontendUrl(state);

  try {
    if (error) {
      logger.error({ error }, "Facebook login callback error");
      res.redirect(`${frontendUrl}/login?error=oauth_failed`);
      return;
    }

    if (!code || typeof code !== "string") {
      res.redirect(`${frontendUrl}/login?error=invalid_code`);
      return;
    }

    const backendUrl = `${req.protocol}://${req.get("host")}`;
    const redirectUri =
      env.META_REDIRECT_URI || `${backendUrl}/api/auth/facebook/callback`;

    // 1. Exchange code for access token
    const tokenResponse = await axios
      .get("https://graph.facebook.com/v18.0/oauth/access_token", {
        params: {
          client_id: env.META_APP_ID,
          client_secret: env.META_APP_SECRET,
          redirect_uri: redirectUri,
          code,
        },
      })
      .catch(() => null);

    if (!tokenResponse?.data?.access_token) {
      throw new ExternalAPIError(
        "Failed to get Facebook access token",
        "facebook",
      );
    }

    // 2. Get user profile
    const profileResponse = await axios
      .get("https://graph.facebook.com/v18.0/me", {
        params: {
          fields: "id,name,email",
          access_token: tokenResponse.data.access_token,
        },
      })
      .catch(() => null);

    if (!profileResponse?.data?.id || !profileResponse?.data?.email) {
      throw new ExternalAPIError(
        "Failed to get Facebook profile or email is missing",
        "facebook",
      );
    }

    // 3. Login or register user
    const { user, token } = await loginWithFacebook({
      id: profileResponse.data.id,
      name: profileResponse.data.name,
      email: profileResponse.data.email,
    });

    // 4. Set cookie and redirect with token query
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: true, // Always secure for cross-domain
      sameSite: "none", // Required for cross-domain cookies
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: "/",
    });
    res.redirect(`${frontendUrl}/dashboard?token=${encodeURIComponent(token)}`);
  } catch (err) {
    logger.error({ error: err }, "Facebook login callback failed");
    res.redirect(`${frontendUrl}/login?error=server_error`);
  }
}

export async function googleOAuthController(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const backendUrl = `${req.protocol}://${req.get("host")}`;
    const redirectUri =
      env.GOOGLE_REDIRECT_URI || `${backendUrl}/api/auth/google/callback`;
    const scope = "openid profile email";
    const state = typeof req.query.state === "string" ? req.query.state : "";

    const oauthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${env.GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(
      redirectUri,
    )}&scope=${encodeURIComponent(scope)}&response_type=code${state ? `&state=${encodeURIComponent(state)}` : ""}`;

    res.redirect(oauthUrl);
  } catch (error) {
    logger.error({ error }, "Google login initiation failed");
    throw error;
  }
}

export async function googleCallbackController(
  req: Request,
  res: Response,
): Promise<void> {
  const { code, error, state } = req.query;
  const frontendUrl = getValidFrontendUrl(state);

  try {
    logger.info({ code: !!code, error }, "Google callback received");

    if (error) {
      logger.error({ error }, "Google login callback error");
      res.redirect(`${frontendUrl}/login?error=oauth_failed`);
      return;
    }

    if (!code || typeof code !== "string") {
      logger.error({ code }, "Invalid Google authorization code");
      res.redirect(`${frontendUrl}/login?error=invalid_code`);
      return;
    }

    const backendUrl = `${req.protocol}://${req.get("host")}`;
    const redirectUri =
      env.GOOGLE_REDIRECT_URI || `${backendUrl}/api/auth/google/callback`;

    logger.info({ redirectUri }, "Exchanging Google code for token");

    // 1. Exchange code for access token
    const tokenResponse = await axios
      .post("https://oauth2.googleapis.com/token", {
        client_id: env.GOOGLE_CLIENT_ID,
        client_secret: env.GOOGLE_CLIENT_SECRET,
        redirect_uri: redirectUri,
        code,
        grant_type: "authorization_code",
      })
      .catch((err) => {
        logger.error({ error: err.message }, "Google token exchange failed");
        return null;
      });

    if (!tokenResponse?.data?.access_token) {
      logger.error(
        { response: tokenResponse?.data },
        "No access token in response",
      );
      throw new ExternalAPIError("Failed to get Google access token", "google");
    }

    logger.info("Got Google access token successfully");

    // 2. Get user profile
    const profileResponse = await axios
      .get("https://www.googleapis.com/oauth2/v2/userinfo", {
        headers: {
          Authorization: `Bearer ${tokenResponse.data.access_token}`,
        },
      })
      .catch((err) => {
        logger.error({ error: err.message }, "Google profile fetch failed");
        return null;
      });

    if (!profileResponse?.data?.id || !profileResponse?.data?.email) {
      logger.error(
        { profile: profileResponse?.data },
        "Invalid Google profile data",
      );
      throw new ExternalAPIError(
        "Failed to get Google profile or email is missing",
        "google",
      );
    }

    logger.info(
      { email: profileResponse.data.email },
      "Got Google profile successfully",
    );

    // 3. Login or register user
    const { user, token } = await loginWithGoogle({
      id: profileResponse.data.id,
      name: profileResponse.data.name,
      email: profileResponse.data.email,
    });

    logger.info({ userId: user.id }, "User logged in with Google successfully");

    // 4. Set cookie and redirect with token query
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: true, // Always secure for cross-domain
      sameSite: "none", // Required for cross-domain cookies
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: "/",
    });

    logger.info({ frontendUrl }, "Redirecting to dashboard");
    res.redirect(`${frontendUrl}/dashboard?token=${encodeURIComponent(token)}`);
  } catch (err) {
    logger.error({ error: err }, "Google login callback failed");
    res.redirect(`${frontendUrl}/login?error=server_error`);
  }
}

export async function updateProfileController(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const userId = req.user!.userId;
    const validatedData = updateProfileSchema.parse(req.body);
    const user = await updateProfile(userId, validatedData);

    res.status(200).json({
      success: true,
      data: {
        user,
      },
    });
  } catch (error) {
    logger.error({ error }, "Update profile failed");
    throw error;
  }
}
