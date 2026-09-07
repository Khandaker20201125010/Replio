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
exports.MockAIProvider = void 0;
class MockAIProvider {
    analyzeComment(comment, context) {
        return __awaiter(this, void 0, void 0, function* () {
            // Simulate different scenarios based on comment content
            const lowerComment = comment.toLowerCase();
            let intent = "inquiry";
            let sentiment = "neutral";
            let isSpam = false;
            let confidence = 0.85;
            let requiresHumanReview = false;
            // Detect spam keywords
            const spamKeywords = [
                "viagra",
                "cialis",
                "free money",
                "winner",
                "lottery",
            ];
            if (spamKeywords.some((keyword) => lowerComment.includes(keyword))) {
                isSpam = true;
                confidence = 0.95;
                requiresHumanReview = false;
            }
            // Detect sentiment
            if (lowerComment.includes("thank") ||
                lowerComment.includes("great") ||
                lowerComment.includes("awesome")) {
                sentiment = "positive";
                intent = "compliment";
            }
            else if (lowerComment.includes("bad") ||
                lowerComment.includes("terrible") ||
                lowerComment.includes("hate")) {
                sentiment = "negative";
                intent = "complaint";
                requiresHumanReview = true;
            }
            else if (lowerComment.includes("?")) {
                intent = "question";
            }
            // Detect language (simplified)
            let language = "en";
            if (/[^\x00-\x7F]/.test(comment)) {
                language = "other";
            }
            return {
                intent,
                sentiment,
                language,
                isSpam,
                confidence,
                requiresHumanReview,
            };
        });
    }
    generateReply(comment, analysis, settings) {
        return __awaiter(this, void 0, void 0, function* () {
            const { intent, sentiment, language } = analysis;
            const { tone = "professional", emojiUsage = true } = settings;
            let reply = "";
            // Generate contextual replies based on analysis
            if (analysis.isSpam) {
                reply = ""; // No reply for spam
            }
            else if (sentiment === "positive") {
                reply = emojiUsage
                    ? "Thank you for your kind words! 😊 We appreciate your support."
                    : "Thank you for your kind words! We appreciate your support.";
            }
            else if (sentiment === "negative") {
                reply = emojiUsage
                    ? "We are sorry to hear that. We would like to help resolve this. Please DM us with more details. 🙏"
                    : "We are sorry to hear that. We would like to help resolve this. Please DM us with more details.";
            }
            else if (intent === "question") {
                reply = emojiUsage
                    ? "Thanks for your question! We will get back to you shortly with an answer. 📝"
                    : "Thanks for your question! We will get back to you shortly with an answer.";
            }
            else {
                reply = emojiUsage
                    ? "Thank you for your comment! We will review it and respond as needed. 👍"
                    : "Thank you for your comment! We will review it and respond as needed.";
            }
            // Adjust tone
            if (tone === "casual") {
                reply = reply.replace("We will", "We'll").replace("We would", "We'd");
            }
            return {
                reply,
                confidence: 0.9,
            };
        });
    }
    validateReply(reply) {
        return __awaiter(this, void 0, void 0, function* () {
            // Basic validation
            if (!reply || reply.trim().length === 0) {
                return false;
            }
            if (reply.length > 500) {
                return false;
            }
            // Check for obviously unsafe content
            const unsafePatterns = [
                "password",
                "credit card",
                "ssn",
                "social security",
            ];
            if (unsafePatterns.some((pattern) => reply.toLowerCase().includes(pattern))) {
                return false;
            }
            return true;
        });
    }
}
exports.MockAIProvider = MockAIProvider;
//# sourceMappingURL=mock.provider.js.map