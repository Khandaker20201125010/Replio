"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRulesController = getRulesController;
exports.createRuleController = createRuleController;
exports.updateRuleController = updateRuleController;
exports.deleteRuleController = deleteRuleController;
exports.reorderRulesController = reorderRulesController;
const rules_service_1 = require("./rules.service");
const logger_1 = require("../../utils/logger");
function getRulesController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.user.userId;
            const rules = yield (0, rules_service_1.getRules)(userId);
            res.status(200).json({
                success: true,
                data: { rules },
            });
        }
        catch (error) {
            logger_1.logger.error({ error }, "Get rules failed");
            throw error;
        }
    });
}
function createRuleController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.user.userId;
            const rule = yield (0, rules_service_1.createRule)(userId, req.body);
            res.status(201).json({
                success: true,
                data: { rule },
            });
        }
        catch (error) {
            logger_1.logger.error({ error }, "Create rule failed");
            throw error;
        }
    });
}
function updateRuleController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.user.userId;
            const { ruleId } = req.params;
            if (Array.isArray(ruleId)) {
                throw new Error("Invalid rule ID");
            }
            const rule = yield (0, rules_service_1.updateRule)(userId, ruleId, req.body);
            res.status(200).json({
                success: true,
                data: { rule },
            });
        }
        catch (error) {
            logger_1.logger.error({ error }, "Update rule failed");
            throw error;
        }
    });
}
function deleteRuleController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.user.userId;
            const { ruleId } = req.params;
            if (Array.isArray(ruleId)) {
                throw new Error("Invalid rule ID");
            }
            yield (0, rules_service_1.deleteRule)(userId, ruleId);
            res.status(200).json({
                success: true,
                message: "Rule deleted successfully",
            });
        }
        catch (error) {
            logger_1.logger.error({ error }, "Delete rule failed");
            throw error;
        }
    });
}
function reorderRulesController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.user.userId;
            const { ruleIds } = req.body;
            if (!Array.isArray(ruleIds)) {
                throw new Error("ruleIds must be an array");
            }
            const rules = yield (0, rules_service_1.reorderRules)(userId, ruleIds);
            res.status(200).json({
                success: true,
                data: { rules },
            });
        }
        catch (error) {
            logger_1.logger.error({ error }, "Reorder rules failed");
            throw error;
        }
    });
}
//# sourceMappingURL=rules.controller.js.map