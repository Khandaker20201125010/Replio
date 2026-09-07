import { Router } from "express";
import {
  verifyWebhookController,
  handleWebhookEventController,
} from "./webhook.controller";

const router = Router();

// Webhook verification (GET)
router.get("/", verifyWebhookController);

// Webhook event handling (POST)
router.post("/", handleWebhookEventController);

export default router;
