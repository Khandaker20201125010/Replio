import type { Request, Response } from "express";
import {
  getComments,
  getCommentById,
  updateCommentStatus,
  syncComments,
} from "./comment.service";
import {
  getCommentsSchema,
  updateCommentStatusSchema,
} from "./comment.validation";
import { logger } from "../../utils/logger";

export async function getCommentsController(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const userId = req.user!.userId;
    const filters = getCommentsSchema.parse(req.query);
    const result = await getComments(userId, filters);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    logger.error({ error }, "Get comments failed");
    throw error;
  }
}

export async function syncCommentsController(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const userId = req.user!.userId;
    const pageIdOrId =
      typeof req.body?.pageId === "string" ? req.body.pageId : undefined;

    const result = await syncComments(userId, { pageIdOrId });

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    logger.error({ error }, "Sync comments failed");
    throw error;
  }
}

export async function getCommentByIdController(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const userId = req.user!.userId;
    const { commentId } = req.params;

    if (Array.isArray(commentId)) {
      throw new Error("Invalid comment ID");
    }

    const comment = await getCommentById(userId, commentId);

    res.status(200).json({
      success: true,
      data: { comment },
    });
  } catch (error) {
    logger.error({ error }, "Get comment by ID failed");
    throw error;
  }
}

export async function updateCommentStatusController(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const userId = req.user!.userId;
    const { commentId } = req.params;

    if (Array.isArray(commentId)) {
      throw new Error("Invalid comment ID");
    }

    const data = updateCommentStatusSchema.parse(req.body);
    const comment = await updateCommentStatus(userId, commentId, data);

    res.status(200).json({
      success: true,
      data: { comment },
    });
  } catch (error) {
    logger.error({ error }, "Update comment status failed");
    throw error;
  }
}
