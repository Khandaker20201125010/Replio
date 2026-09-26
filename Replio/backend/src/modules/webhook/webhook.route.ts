import { Router } from "express";
import {
  verifyWebhookController,
  handleWebhookEventController,
  webhookDiagnosticsController,
} from "./webhook.controller";
import { authenticate } from "../../middleware/auth.middleware";

const router = Router();

// Webhook verification (GET)
router.get("/", verifyWebhookController);

// Delivery diagnostics for the dashboard (GET)
router.get("/diagnostics", authenticate, webhookDiagnosticsController);

// Webhook event handling (POST)
router.post("/", handleWebhookEventController);

export default router;
