import { Router } from "express";
import {
  getOverviewController,
  getCommentsAnalyticsController,
  getRepliesAnalyticsController,
  getEventsController,
} from "./analytics.controller";
import { authenticate } from "../../middleware/auth.middleware";

const router = Router();

// Protected routes
router.get("/overview", authenticate, getOverviewController);
router.get("/comments", authenticate, getCommentsAnalyticsController);
router.get("/replies", authenticate, getRepliesAnalyticsController);
router.get("/events", authenticate, getEventsController);

export default router;
