import type { Request, Response } from "express";
import {
  getOverviewAnalytics,
  getCommentsAnalytics,
  getRepliesAnalytics,
  getEvents,
} from "./analytics.service";
import { logger } from "../../utils/logger";

export async function getOverviewController(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const userId = req.user!.userId;
    const filters = req.query;
    const analytics = await getOverviewAnalytics(userId, filters);

    res.status(200).json({
      success: true,
      data: analytics,
    });
  } catch (error) {
    logger.error({ error }, "Get overview analytics failed");
    throw error;
  }
}

export async function getCommentsAnalyticsController(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const userId = req.user!.userId;
    const filters = req.query;
    const analytics = await getCommentsAnalytics(userId, filters);

    res.status(200).json({
      success: true,
      data: analytics,
    });
  } catch (error) {
    logger.error({ error }, "Get comments analytics failed");
    throw error;
  }
}

export async function getRepliesAnalyticsController(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const userId = req.user!.userId;
    const filters = req.query;
    const analytics = await getRepliesAnalytics(userId, filters);

    res.status(200).json({
      success: true,
      data: analytics,
    });
  } catch (error) {
    logger.error({ error }, "Get replies analytics failed");
    throw error;
  }
}

export async function getEventsController(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const userId = req.user!.userId;
    const filters = req.query;
    const result = await getEvents(userId, filters);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    logger.error({ error }, "Get events failed");
    throw error;
  }
}
