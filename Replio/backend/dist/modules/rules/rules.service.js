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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRules = getRules;
exports.createRule = createRule;
exports.updateRule = updateRule;
exports.deleteRule = deleteRule;
exports.reorderRules = reorderRules;
exports.evaluateRules = evaluateRules;
const prisma_1 = __importDefault(require("../../config/prisma"));
const errors_1 = require("../../utils/errors");
const logger_1 = require("../../utils/logger");
function getRules(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma_1.default.replyRule.findMany({
            where: { userId },
            orderBy: [{ priority: "desc" }, { createdAt: "desc" }],
        });
    });
}
function createRule(userId, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const rule = yield prisma_1.default.replyRule.create({
            data: Object.assign({ userId }, data),
        });
        logger_1.logger.info({ userId, ruleId: rule.id }, "Rule created");
        return rule;
    });
}
function updateRule(userId, ruleId, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const rule = yield prisma_1.default.replyRule.findFirst({
            where: {
                id: ruleId,
                userId,
            },
        });
        if (!rule) {
            throw new errors_1.NotFoundError("Rule not found");
        }
        const updated = yield prisma_1.default.replyRule.update({
            where: { id: ruleId },
            data,
        });
        logger_1.logger.info({ userId, ruleId }, "Rule updated");
        return updated;
    });
}
function deleteRule(userId, ruleId) {
    return __awaiter(this, void 0, void 0, function* () {
        const rule = yield prisma_1.default.replyRule.findFirst({
            where: {
                id: ruleId,
                userId,
            },
        });
        if (!rule) {
            throw new errors_1.NotFoundError("Rule not found");
        }
        yield prisma_1.default.replyRule.delete({
            where: { id: ruleId },
        });
        logger_1.logger.info({ userId, ruleId }, "Rule deleted");
    });
}
function reorderRules(userId, ruleIds) {
    return __awaiter(this, void 0, void 0, function* () {
        // Update priorities for all rules
        for (let i = 0; i < ruleIds.length; i++) {
            yield prisma_1.default.replyRule.updateMany({
                where: {
                    id: ruleIds[i],
                    userId,
                },
                data: {
                    priority: ruleIds.length - i,
                },
            });
        }
        logger_1.logger.info({ userId, ruleIds }, "Rules reordered");
        return yield getRules(userId);
    });
}
function evaluateRules(comment, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const rules = yield prisma_1.default.replyRule.findMany({
            where: {
                userId,
                enabled: true,
            },
            orderBy: {
                priority: "desc",
            },
        });
        for (const rule of rules) {
            const matches = yield checkRuleCondition(comment, rule);
            if (matches) {
                return rule;
            }
        }
        return null;
    });
}
function checkRuleCondition(comment, rule) {
    return __awaiter(this, void 0, void 0, function* () {
        const { conditionType, conditionValue } = rule;
        const lowerComment = comment.toLowerCase();
        switch (conditionType) {
            case "KEYWORD":
                const keywords = conditionValue
                    .toLowerCase()
                    .split(",")
                    .map((k) => k.trim());
                return keywords.some((keyword) => lowerComment.includes(keyword));
            case "PHRASE":
                const phrases = conditionValue
                    .toLowerCase()
                    .split(",")
                    .map((p) => p.trim());
                return phrases.some((phrase) => lowerComment.includes(phrase));
            case "SENTIMENT":
                // This would require AI analysis, for now return false
                return false;
            case "LANGUAGE":
                // This would require AI analysis, for now return false
                return false;
            case "SPAM_THRESHOLD":
                // This would require AI analysis, for now return false
                return false;
            default:
                return false;
        }
    });
}
//# sourceMappingURL=rules.service.js.map