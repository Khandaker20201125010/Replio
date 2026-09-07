import { Router } from "express";
import {
  webhookVerificationController,
  webhookEventController,
} from "./webhook.controller";

const router = Router();

// Webhook verification (GET) - public
router.get("/", webhookVerificationController);

// Webhook events (POST) - public (but verified)
router.post("/", webhookEventController);

export default router;
