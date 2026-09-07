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
exports.getSettings = getSettings;
exports.updateSettings = updateSettings;
exports.resetSettings = resetSettings;
const prisma_1 = __importDefault(require("../../config/prisma"));
const logger_1 = require("../../utils/logger");
const DEFAULT_SETTINGS = {
    status: "ACTIVE",
    aiProvider: "openai",
    model: "gpt-4",
    confidenceThreshold: 0.7,
    tone: "professional",
    language: "en",
    emojiUsage: true,
    maxLength: 500,
    spamHandling: "ignore",
    humanApprovalMode: false,
    fallbackBehavior: "skip",
};
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
        return settings;
    });
}
function updateSettings(userId, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const settings = yield prisma_1.default.aISettings.upsert({
            where: { userId },
            update: data,
            create: Object.assign(Object.assign({ userId }, DEFAULT_SETTINGS), data),
        });
        logger_1.logger.info({ userId }, "AI settings updated");
        return settings;
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
        return settings;
    });
}
//# sourceMappingURL=settings.service.js.map