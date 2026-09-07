import type { Request, Response } from "express";
import {
  getReplies,
  getReplyById,
  approveReply,
  rejectReply,
  retryReply,
} from "./reply.service";
import { logger } from "../../utils/logger";

export async function getRepliesController(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const userId = req.user!.userId;
    const filters = req.query;
    const result = await getReplies(userId, filters);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    logger.error({ error }, "Get replies failed");
    throw error;
  }
}

export async function getReplyByIdController(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const userId = req.user!.userId;
    const { replyId } = req.params;

    if (Array.isArray(replyId)) {
      throw new Error("Invalid reply ID");
    }

    const reply = await getReplyById(userId, replyId);

    res.status(200).json({
      success: true,
      data: { reply },
    });
  } catch (error) {
    logger.error({ error }, "Get reply by ID failed");
    throw error;
  }
}

export async function approveReplyController(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const userId = req.user!.userId;
    const { replyId } = req.params;

    if (Array.isArray(replyId)) {
      throw new Error("Invalid reply ID");
    }

    const reply = await approveReply(userId, replyId);

    res.status(200).json({
      success: true,
      data: { reply },
    });
  } catch (error) {
    logger.error({ error }, "Approve reply failed");
    throw error;
  }
}

export async function rejectReplyController(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const userId = req.user!.userId;
    const { replyId } = req.params;

    if (Array.isArray(replyId)) {
      throw new Error("Invalid reply ID");
    }

    const reply = await rejectReply(userId, replyId);

    res.status(200).json({
      success: true,
      data: { reply },
    });
  } catch (error) {
    logger.error({ error }, "Reject reply failed");
    throw error;
  }
}

export async function retryReplyController(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const userId = req.user!.userId;
    const { replyId } = req.params;

    if (Array.isArray(replyId)) {
      throw new Error("Invalid reply ID");
    }

    const reply = await retryReply(userId, replyId);

    res.status(200).json({
      success: true,
      data: { reply },
    });
  } catch (error) {
    logger.error({ error }, "Retry reply failed");
    throw error;
  }
}
