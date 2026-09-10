import { Router } from "express";
import {
  initiateOAuthController,
  oauthCallbackController,
  connectPageController,
  disconnectPageController,
  getConnectedPagesController,
  getPageController,
} from "./facebook.controller";
import { authenticate } from "../../middleware/auth.middleware";

const router = Router();

// OAuth routes (public - Facebook handles the authentication)
router.get("/oauth", initiateOAuthController);
router.get("/callback", oauthCallbackController);

// Protected page management routes
router.post("/pages/connect", authenticate, connectPageController);
router.delete("/pages/:pageId", authenticate, disconnectPageController);
router.get("/pages", authenticate, getConnectedPagesController);
router.get("/pages/:pageId", authenticate, getPageController);

export default router;
