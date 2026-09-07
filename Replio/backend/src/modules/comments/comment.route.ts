import { Router } from "express";
import {
  getCommentsController,
  getCommentByIdController,
  updateCommentStatusController,
} from "./comment.controller";
import { authenticate } from "../../middleware/auth.middleware";

const router = Router();

// Protected routes
router.get("/", authenticate, getCommentsController);
router.get("/:commentId", authenticate, getCommentByIdController);
router.put("/:commentId/status", authenticate, updateCommentStatusController);

export default router;
