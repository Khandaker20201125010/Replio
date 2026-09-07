"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const router = (0, express_1.Router)();
// Public routes
router.post("/register", auth_controller_1.registerController);
router.post("/login", auth_controller_1.loginController);
// Protected routes
router.post("/logout", auth_middleware_1.authenticate, auth_controller_1.logoutController);
router.get("/me", auth_middleware_1.authenticate, auth_controller_1.getCurrentUserController);
router.put("/profile", auth_middleware_1.authenticate, auth_controller_1.updateProfileController);
exports.default = router;
//# sourceMappingURL=auth.route.js.map