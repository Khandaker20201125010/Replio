"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const facebook_controller_1 = require("./facebook.controller");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const router = (0, express_1.Router)();
// OAuth routes (public - Facebook handles the authentication)
router.get("/oauth", facebook_controller_1.initiateOAuthController);
router.get("/callback", facebook_controller_1.oauthCallbackController);
// Protected page management routes
router.post("/pages/connect", auth_middleware_1.authenticate, facebook_controller_1.connectPageController);
router.delete("/pages/:pageId", auth_middleware_1.authenticate, facebook_controller_1.disconnectPageController);
router.get("/pages", auth_middleware_1.authenticate, facebook_controller_1.getConnectedPagesController);
router.get("/pages/:pageId", auth_middleware_1.authenticate, facebook_controller_1.getPageController);
exports.default = router;
//# sourceMappingURL=facebook.route.js.map