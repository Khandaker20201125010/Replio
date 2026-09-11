import type { Request, Response } from "express";
import axios from "axios";
import { env } from "../../config/env";
import {
  loginWithFacebook,
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
    // Clear HTTP-only cookie
    res.clearCookie("auth_token", {
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

export async function facebookOAuthController(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const backendUrl = `${req.protocol}://${req.get("host")}`;
    const redirectUri = `${backendUrl}/api/auth/facebook/callback`; // We'll handle this in backend at /api/auth/facebook/callback
    const scope = "public_profile,email";
    
    // We reuse the META_APP_ID but with a different redirect URL for user login vs page connection
    const oauthUrl = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${env.META_APP_ID}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${scope}&response_type=code`;

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
  try {
    const { code, error } = req.query;

    if (error) {
      logger.error({ error }, "Facebook login callback error");
      res.redirect(`${env.FRONTEND_URL}/login?error=oauth_failed`);
      return;
    }

    if (!code || typeof code !== "string") {
      res.redirect(`${env.FRONTEND_URL}/login?error=invalid_code`);
      return;
    }

    const backendUrl = `${req.protocol}://${req.get("host")}`;
    const redirectUri = `${backendUrl}/api/auth/facebook/callback`;

    // 1. Exchange code for access token
    const tokenResponse = await axios.get(
      "https://graph.facebook.com/v18.0/oauth/access_token",
      {
        params: {
          client_id: env.META_APP_ID,
          client_secret: env.META_APP_SECRET,
          redirect_uri: redirectUri,
          code,
        },
      }
    ).catch(() => null);

    if (!tokenResponse?.data?.access_token) {
      throw new ExternalAPIError("Failed to get Facebook access token", "facebook");
    }

    // 2. Get user profile
    const profileResponse = await axios.get(
      "https://graph.facebook.com/v18.0/me",
      {
        params: {
          fields: "id,name,email",
          access_token: tokenResponse.data.access_token,
        },
      }
    ).catch(() => null);

    if (!profileResponse?.data?.id || !profileResponse?.data?.email) {
      throw new ExternalAPIError("Failed to get Facebook profile or email is missing", "facebook");
    }

    // 3. Login or register user
    const { user, token } = await loginWithFacebook({
      id: profileResponse.data.id,
      name: profileResponse.data.name,
      email: profileResponse.data.email,
    });

    // 4. Set cookie and redirect
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: "/",
    });
    res.redirect(`${env.FRONTEND_URL}/dashboard`);
  } catch (error) {
    logger.error({ error }, "Facebook login callback failed");
    res.redirect(`${env.FRONTEND_URL}/login?error=server_error`);
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
