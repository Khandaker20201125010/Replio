"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rules_controller_1 = require("./rules.controller");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const router = (0, express_1.Router)();
// Protected routes
router.get("/", auth_middleware_1.authenticate, rules_controller_1.getRulesController);
router.post("/", auth_middleware_1.authenticate, rules_controller_1.createRuleController);
router.put("/:ruleId", auth_middleware_1.authenticate, rules_controller_1.updateRuleController);
router.delete("/:ruleId", auth_middleware_1.authenticate, rules_controller_1.deleteRuleController);
router.put("/reorder", auth_middleware_1.authenticate, rules_controller_1.reorderRulesController);
exports.default = router;
//# sourceMappingURL=rules.route.js.map