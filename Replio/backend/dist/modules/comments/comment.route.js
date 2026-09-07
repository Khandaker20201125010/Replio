"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const comment_controller_1 = require("./comment.controller");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const router = (0, express_1.Router)();
// Protected routes
router.get("/", auth_middleware_1.authenticate, comment_controller_1.getCommentsController);
router.get("/:commentId", auth_middleware_1.authenticate, comment_controller_1.getCommentByIdController);
router.put("/:commentId/status", auth_middleware_1.authenticate, comment_controller_1.updateCommentStatusController);
exports.default = router;
//# sourceMappingURL=comment.route.js.map