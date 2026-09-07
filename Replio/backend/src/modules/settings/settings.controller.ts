import type { Request, Response } from "express";
import { getSettings, updateSettings, resetSettings } from "./settings.service";
import { logger } from "../../utils/logger";

export async function getSettingsController(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const userId = req.user!.userId;
    const settings = await getSettings(userId);

    res.status(200).json({
      success: true,
      data: { settings },
    });
  } catch (error) {
    logger.error({ error }, "Get settings failed");
    throw error;
  }
}

export async function updateSettingsController(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const userId = req.user!.userId;
    const settings = await updateSettings(userId, req.body);

    res.status(200).json({
      success: true,
      data: { settings },
    });
  } catch (error) {
    logger.error({ error }, "Update settings failed");
    throw error;
  }
}

export async function resetSettingsController(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const userId = req.user!.userId;
    const settings = await resetSettings(userId);

    res.status(200).json({
      success: true,
      data: { settings },
    });
  } catch (error) {
    logger.error({ error }, "Reset settings failed");
    throw error;
  }
}
