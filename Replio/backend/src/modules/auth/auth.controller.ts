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
    // Clear HTTP-only cookie with same options as when set
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
      redirectUri,
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

    // 4. Set cookie and redirect
    logger.info(
      {
        token: token.substring(0, 20) + "...",
        frontendUrl: env.FRONTEND_URL,
        cookieOptions: {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          maxAge: 7 * 24 * 60 * 60 * 1000,
          path: "/",
        },
      },
      "Setting auth cookie",
    );

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: "/",
    });
    res.redirect(`${env.FRONTEND_URL}/dashboard`);
  } catch (error) {
    logger.error({ error }, "Facebook login callback failed");
    res.redirect(`${env.FRONTEND_URL}/login?error=server_error`);
  }
}

export async function googleOAuthController(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const backendUrl = `${req.protocol}://${req.get("host")}`;
    const redirectUri = `${backendUrl}/api/auth/google/callback`;
    const scope = "openid profile email";

    const oauthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${env.GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(
      redirectUri,
    )}&scope=${encodeURIComponent(scope)}&response_type=code`;

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
  try {
    const { code, error } = req.query;

    if (error) {
      logger.error({ error }, "Google login callback error");
      res.redirect(`${env.FRONTEND_URL}/login?error=oauth_failed`);
      return;
    }

    if (!code || typeof code !== "string") {
      res.redirect(`${env.FRONTEND_URL}/login?error=invalid_code`);
      return;
    }

    const backendUrl = `${req.protocol}://${req.get("host")}`;
    const redirectUri = `${backendUrl}/api/auth/google/callback`;

    // 1. Exchange code for access token
    const tokenResponse = await axios
      .post("https://oauth2.googleapis.com/token", {
        client_id: env.GOOGLE_CLIENT_ID,
        client_secret: env.GOOGLE_CLIENT_SECRET,
        redirect_uri: redirectUri,
        code,
        grant_type: "authorization_code",
      })
      .catch(() => null);

    if (!tokenResponse?.data?.access_token) {
      throw new ExternalAPIError("Failed to get Google access token", "google");
    }

    // 2. Get user profile
    const profileResponse = await axios
      .get("https://www.googleapis.com/oauth2/v2/userinfo", {
        headers: {
          Authorization: `Bearer ${tokenResponse.data.access_token}`,
        },
      })
      .catch(() => null);

    if (!profileResponse?.data?.id || !profileResponse?.data?.email) {
      throw new ExternalAPIError(
        "Failed to get Google profile or email is missing",
        "google",
      );
    }

    // 3. Login or register user
    const { user, token } = await loginWithGoogle({
      id: profileResponse.data.id,
      name: profileResponse.data.name,
      email: profileResponse.data.email,
    });

    // 4. Set cookie and redirect
    logger.info(
      {
        token: token.substring(0, 20) + "...",
        frontendUrl: env.FRONTEND_URL,
        cookieOptions: {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          maxAge: 7 * 24 * 60 * 60 * 1000,
          path: "/",
        },
      },
      "Setting auth cookie",
    );

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: "/",
    });
    res.redirect(`${env.FRONTEND_URL}/dashboard`);
  } catch (error) {
    logger.error({ error }, "Google login callback failed");
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
