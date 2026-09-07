import type { Request, Response } from "express";
import { verifyWebhook, processWebhookEvent } from "./webhook.service";
import { logger } from "../../utils/logger";

export async function verifyWebhookController(
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
      res.status(400).send("Missing required parameters");
      return;
    }

    const response = await verifyWebhook(
      mode as string,
      token as string,
      challenge as string,
    );
    res.status(200).send(response);
  } catch (error) {
    logger.error({ error }, "Webhook verification failed");
    res.status(403).send("Verification failed");
  }
}

export async function handleWebhookEventController(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const payload = req.body;

    // Acknowledge immediately
    res.status(200).send("OK");

    // Process asynchronously
    processWebhookEvent(payload).catch((error) => {
      logger.error({ error }, "Async webhook event processing failed");
    });
  } catch (error) {
    logger.error({ error }, "Webhook event handling failed");
    // Still return 200 to avoid Facebook retry loops
    res.status(200).send("OK");
  }
}
