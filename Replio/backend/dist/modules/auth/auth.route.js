"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const router = (0, express_1.Router)();
// Public routes
router.get("/facebook", auth_controller_1.facebookOAuthController);
router.get("/facebook/callback", auth_controller_1.facebookCallbackController);
// Protected routes
router.post("/logout", auth_middleware_1.authenticate, auth_controller_1.logoutController);
router.get("/me", auth_middleware_1.authenticate, auth_controller_1.getCurrentUserController);
router.put("/profile", auth_middleware_1.authenticate, auth_controller_1.updateProfileController);
exports.default = router;
//# sourceMappingURL=auth.route.js.map