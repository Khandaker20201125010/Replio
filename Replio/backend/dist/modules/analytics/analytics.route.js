"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const analytics_controller_1 = require("./analytics.controller");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const router = (0, express_1.Router)();
// Protected routes
router.get("/overview", auth_middleware_1.authenticate, analytics_controller_1.getOverviewController);
router.get("/comments", auth_middleware_1.authenticate, analytics_controller_1.getCommentsAnalyticsController);
router.get("/replies", auth_middleware_1.authenticate, analytics_controller_1.getRepliesAnalyticsController);
router.get("/events", auth_middleware_1.authenticate, analytics_controller_1.getEventsController);
exports.default = router;
//# sourceMappingURL=analytics.route.js.map