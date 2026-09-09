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
exports.getAIProvider = getAIProvider;
exports.analyzeComment = analyzeComment;
exports.generateReply = generateReply;
exports.validateReply = validateReply;
const mock_provider_1 = require("./mock.provider");
const openrouter_provider_1 = require("./openrouter.provider");
const env_1 = require("../../config/env");
const logger_1 = require("../../utils/logger");
function getAIProvider(settings) {
    const provider = settings.aiProvider || "openrouter";
    // Use mock if OpenRouter not configured or if explicitly requested
    if (provider === "mock" || !env_1.env.OPENROUTER_API_KEY) {
        logger_1.logger.debug("Using Mock AI provider");
        return new mock_provider_1.MockAIProvider();
    }
    if (provider === "openrouter") {
        logger_1.logger.debug("Using OpenRouter provider");
        return new openrouter_provider_1.OpenRouterProvider();
    }
    // Default to mock for safety
    logger_1.logger.warn(`Unknown AI provider: ${provider}, falling back to mock`);
    return new mock_provider_1.MockAIProvider();
}
function analyzeComment(comment, settings) {
    return __awaiter(this, void 0, void 0, function* () {
        const provider = getAIProvider(settings);
        return yield provider.analyzeComment(comment);
    });
}
function generateReply(comment, analysis, settings) {
    return __awaiter(this, void 0, void 0, function* () {
        const provider = getAIProvider(settings);
        return yield provider.generateReply(comment, analysis, settings);
    });
}
function validateReply(reply, settings) {
    return __awaiter(this, void 0, void 0, function* () {
        const provider = getAIProvider(settings);
        return yield provider.validateReply(reply);
    });
}
//# sourceMappingURL=ai.service.js.map