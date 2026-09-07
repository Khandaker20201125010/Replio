"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reply_controller_1 = require("./reply.controller");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const router = (0, express_1.Router)();
// Protected routes
router.get("/", auth_middleware_1.authenticate, reply_controller_1.getRepliesController);
router.get("/:replyId", auth_middleware_1.authenticate, reply_controller_1.getReplyByIdController);
router.post("/:replyId/approve", auth_middleware_1.authenticate, reply_controller_1.approveReplyController);
router.post("/:replyId/reject", auth_middleware_1.authenticate, reply_controller_1.rejectReplyController);
router.post("/:replyId/retry", auth_middleware_1.authenticate, reply_controller_1.retryReplyController);
exports.default = router;
//# sourceMappingURL=reply.route.js.map