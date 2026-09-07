import { Router } from "express";
import {
  getRepliesController,
  getReplyByIdController,
  approveReplyController,
  rejectReplyController,
  retryReplyController,
} from "./reply.controller";
import { authenticate } from "../../middleware/auth.middleware";

const router = Router();

// Protected routes
router.get("/", authenticate, getRepliesController);
router.get("/:replyId", authenticate, getReplyByIdController);
router.post("/:replyId/approve", authenticate, approveReplyController);
router.post("/:replyId/reject", authenticate, rejectReplyController);
router.post("/:replyId/retry", authenticate, retryReplyController);

export default router;
