"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const webhook_controller_1 = require("./webhook.controller");
const router = (0, express_1.Router)();
// Webhook verification (GET)
router.get("/", webhook_controller_1.verifyWebhookController);
// Webhook event handling (POST)
router.post("/", webhook_controller_1.handleWebhookEventController);
exports.default = router;
//# sourceMappingURL=webhook.route.js.map