import { Router } from "express";
import {
  initiateOAuthController,
  oauthCallbackController,
  connectPageController,
  disconnectPageController,
  getConnectedPagesController,
  getPageController,
  resubscribePageController,
} from "./facebook.controller";
import { authenticate } from "../../middleware/auth.middleware";

const router = Router();

// OAuth routes
router.get("/oauth", authenticate, initiateOAuthController);
router.get("/callback", oauthCallbackController);

// Protected page management routes
router.post("/pages/connect", authenticate, connectPageController);
router.delete("/pages/:pageId", authenticate, disconnectPageController);
router.get("/pages", authenticate, getConnectedPagesController);
router.get("/pages/:pageId", authenticate, getPageController);
router.post("/pages/:pageId/subscribe", authenticate, resubscribePageController);

export default router;
