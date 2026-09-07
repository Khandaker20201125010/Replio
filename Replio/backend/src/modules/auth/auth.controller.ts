import type { Request, Response } from "express";
import { register, login, getCurrentUser, updateProfile } from "./auth.service";
import {
  registerSchema,
  loginSchema,
  updateProfileSchema,
} from "./auth.validation";
import { logger } from "../../utils/logger";
import { env } from "../../config/env";

export async function registerController(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const validatedData = registerSchema.parse(req.body);
    const result = await register(validatedData);

    // Set HTTP-only cookie
    res.cookie("auth_token", result.token, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: "/",
    });

    res.status(201).json({
      success: true,
      data: {
        user: result.user,
      },
    });
  } catch (error) {
    logger.error({ error }, "Registration failed");
    throw error;
  }
}

export async function loginController(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const validatedData = loginSchema.parse(req.body);
    const result = await login(validatedData);

    // Set HTTP-only cookie
    res.cookie("auth_token", result.token, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: "/",
    });

    res.status(200).json({
      success: true,
      data: {
        user: result.user,
      },
    });
  } catch (error) {
    logger.error({ error }, "Login failed");
    throw error;
  }
}

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
