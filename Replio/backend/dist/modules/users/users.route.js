"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = require("./users.controller");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const router = (0, express_1.Router)();
// Protected routes
router.get('/profile', auth_middleware_1.authenticate, users_controller_1.getUserProfileController);
exports.default = router;
//# sourceMappingURL=users.route.js.map