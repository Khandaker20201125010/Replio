"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyWebhookController = verifyWebhookController;
exports.handleWebhookEventController = handleWebhookEventController;
const webhook_service_1 = require("./webhook.service");
const logger_1 = require("../../utils/logger");
function verifyWebhookController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { "hub.mode": mode, "hub.verify_token": token, "hub.challenge": challenge, } = req.query;
            if (!mode || !token || !challenge) {
                res.status(400).send("Missing required parameters");
                return;
            }
            const response = yield (0, webhook_service_1.verifyWebhook)(mode, token, challenge);
            res.status(200).send(response);
        }
        catch (error) {
            logger_1.logger.error({ error }, "Webhook verification failed");
            res.status(403).send("Verification failed");
        }
    });
}
function handleWebhookEventController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const payload = req.body;
            // Acknowledge immediately
            res.status(200).send("OK");
            // Process asynchronously
            (0, webhook_service_1.processWebhookEvent)(payload).catch((error) => {
                logger_1.logger.error({ error }, "Async webhook event processing failed");
            });
        }
        catch (error) {
            logger_1.logger.error({ error }, "Webhook event handling failed");
            // Still return 200 to avoid Facebook retry loops
            res.status(200).send("OK");
        }
    });
}
//# sourceMappingURL=webhook.controller.js.map