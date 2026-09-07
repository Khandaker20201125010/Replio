import type { Request, Response } from "express";
import {
  verifyWebhookChallenge,
  verifyWebhookSignature,
  processWebhookEvent,
} from "./webhook.service";
import { logger } from "../../utils/logger";
import { ValidationError } from "../../utils/errors";

export async function webhookVerificationController(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const {
      "hub.mode": mode,
      "hub.verify_token": token,
      "hub.challenge": challenge,
    } = req.query;

    if (!mode || !token || !challenge) {
      throw new ValidationError(
        "Missing required webhook verification parameters",
      );
    }

    const isValid = verifyWebhookChallenge(
      mode as string,
      token as string,
      challenge as string,
    );

    if (!isValid) {
      logger.warn({ mode, token }, "Webhook verification failed");
      res.status(403).send("Forbidden");
      return;
    }

    logger.info("Webhook verified successfully");
    res.status(200).send(challenge);
  } catch (error) {
    logger.error({ error }, "Webhook verification failed");
    throw error;
  }
}

export async function webhookEventController(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const signature = req.headers["x-hub-signature-256"] as string;
    const payload = JSON.stringify(req.body);

    // Verify signature if present
    if (signature) {
      const isValid = verifyWebhookSignature(payload, signature);
      if (!isValid) {
        logger.warn({ signature }, "Webhook signature verification failed");
        res.status(403).json({ success: false, error: "Invalid signature" });
        return;
      }
    }

    // Process the webhook event asynchronously
    processWebhookEvent(req.body).catch((error) => {
      logger.error({ error }, "Async webhook event processing failed");
    });

    // Respond immediately to Facebook
    res.status(200).json({ success: true });
  } catch (error) {
    logger.error({ error }, "Webhook event handling failed");
    // Still return 200 to avoid Facebook retrying
    res.status(200).json({ success: true });
  }
}
