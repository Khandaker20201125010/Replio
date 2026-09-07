"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const settings_controller_1 = require("./settings.controller");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const router = (0, express_1.Router)();
// Protected routes
router.get("/", auth_middleware_1.authenticate, settings_controller_1.getSettingsController);
router.put("/", auth_middleware_1.authenticate, settings_controller_1.updateSettingsController);
router.post("/reset", auth_middleware_1.authenticate, settings_controller_1.resetSettingsController);
exports.default = router;
//# sourceMappingURL=settings.route.js.map