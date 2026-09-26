import { Router } from "express";
import {
  getCommentsController,
  getCommentByIdController,
  updateCommentStatusController,
  syncCommentsController,
} from "./comment.controller";
import { authenticate } from "../../middleware/auth.middleware";

const router = Router();

// Protected routes
router.get("/", authenticate, getCommentsController);
router.post("/sync", authenticate, syncCommentsController);
router.get("/:commentId", authenticate, getCommentByIdController);
router.put("/:commentId/status", authenticate, updateCommentStatusController);

export default router;
