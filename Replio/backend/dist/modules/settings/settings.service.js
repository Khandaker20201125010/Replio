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
exports.formatSettingsResponse = formatSettingsResponse;
exports.getSettings = getSettings;
exports.updateSettings = updateSettings;
exports.resetSettings = resetSettings;
const prisma_1 = __importDefault(require("../../config/prisma"));
const logger_1 = require("../../utils/logger");
const DEFAULT_SETTINGS = {
    status: "ACTIVE",
    aiProvider: "openrouter",
    model: "google/gemma-4-31b-it:free",
    confidenceThreshold: 0.7,
    tone: "professional",
    language: "en",
    emojiUsage: true,
    maxLength: 500,
    spamHandling: "ignore",
    humanApprovalMode: false,
    fallbackBehavior: "skip",
};
function formatSettingsResponse(settings) {
    var _a;
    if (!settings)
        return null;
    return Object.assign(Object.assign({}, settings), { provider: settings.aiProvider || "openrouter", model: settings.model || "google/gemma-4-31b-it:free", confidenceThreshold: (_a = settings.confidenceThreshold) !== null && _a !== void 0 ? _a : 0.7, autoReplyEnabled: !settings.humanApprovalMode, requireHumanReview: Boolean(settings.humanApprovalMode), maxReplyLength: settings.maxLength || 500, tone: settings.tone || "professional", language: settings.language || "en", status: settings.status || "ACTIVE" });
}
function getSettings(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        let settings = yield prisma_1.default.aISettings.findUnique({
            where: { userId },
        });
        if (!settings) {
            // Create default settings for user
            settings = yield prisma_1.default.aISettings.create({
                data: Object.assign({ userId }, DEFAULT_SETTINGS),
            });
            logger_1.logger.info({ userId }, "Created default AI settings for user");
        }
        return formatSettingsResponse(settings);
    });
}
function updateSettings(userId, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const updateData = {};
        if (data.provider !== undefined)
            updateData.aiProvider = data.provider;
        if (data.aiProvider !== undefined)
            updateData.aiProvider = data.aiProvider;
        if (data.model !== undefined)
            updateData.model = data.model;
        if (data.confidenceThreshold !== undefined) {
            updateData.confidenceThreshold = parseFloat(String(data.confidenceThreshold));
        }
        if (data.tone !== undefined)
            updateData.tone = data.tone;
        if (data.language !== undefined)
            updateData.language = data.language;
        if (data.emojiUsage !== undefined)
            updateData.emojiUsage = Boolean(data.emojiUsage);
        if (data.maxReplyLength !== undefined) {
            updateData.maxLength = parseInt(String(data.maxReplyLength), 10);
        }
        if (data.maxLength !== undefined) {
            updateData.maxLength = parseInt(String(data.maxLength), 10);
        }
        if (data.requireHumanReview !== undefined) {
            updateData.humanApprovalMode = Boolean(data.requireHumanReview);
        }
        else if (data.autoReplyEnabled !== undefined) {
            updateData.humanApprovalMode = !data.autoReplyEnabled;
        }
        else if (data.humanApprovalMode !== undefined) {
            updateData.humanApprovalMode = Boolean(data.humanApprovalMode);
        }
        if (data.spamHandling !== undefined)
            updateData.spamHandling = data.spamHandling;
        if (data.fallbackBehavior !== undefined)
            updateData.fallbackBehavior = data.fallbackBehavior;
        if (data.status !== undefined)
            updateData.status = data.status;
        const settings = yield prisma_1.default.aISettings.upsert({
            where: { userId },
            update: updateData,
            create: Object.assign(Object.assign({ userId }, DEFAULT_SETTINGS), updateData),
        });
        logger_1.logger.info({ userId, humanApprovalMode: settings.humanApprovalMode }, "AI settings updated");
        return formatSettingsResponse(settings);
    });
}
function resetSettings(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const settings = yield prisma_1.default.aISettings.upsert({
            where: { userId },
            update: DEFAULT_SETTINGS,
            create: Object.assign({ userId }, DEFAULT_SETTINGS),
        });
        logger_1.logger.info({ userId }, "AI settings reset to defaults");
        return formatSettingsResponse(settings);
    });
}
//# sourceMappingURL=settings.service.js.map