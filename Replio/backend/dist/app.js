"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const env_1 = require("./config/env");
const error_middleware_1 = require("./middleware/error.middleware");
const rate_limit_middleware_1 = require("./middleware/rate-limit.middleware");
const auth_route_1 = __importDefault(require("./modules/auth/auth.route"));
const facebook_route_1 = __importDefault(require("./modules/facebook/facebook.route"));
const webhook_route_1 = __importDefault(require("./modules/webhook/webhook.route"));
const comment_route_1 = __importDefault(require("./modules/comments/comment.route"));
const reply_route_1 = __importDefault(require("./modules/replies/reply.route"));
const settings_route_1 = __importDefault(require("./modules/settings/settings.route"));
const rules_route_1 = __importDefault(require("./modules/rules/rules.route"));
const analytics_route_1 = __importDefault(require("./modules/analytics/analytics.route"));
const app = (0, express_1.default)();
// Security middleware
app.use((0, helmet_1.default)());
// CORS
app.use((0, cors_1.default)({
    origin: env_1.env.FRONTEND_URL,
    credentials: true,
}));
// Body parsing
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
// Rate limiting
app.use("/api/auth", rate_limit_middleware_1.authLimiter);
app.use("/api", rate_limit_middleware_1.apiLimiter);
// Root route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Replio API Server",
        version: "1.0.0",
        environment: env_1.env.NODE_ENV,
        endpoints: {
            health: "/api/health",
            auth: {
                register: "POST /api/auth/register",
                login: "POST /api/auth/login",
                logout: "POST /api/auth/logout",
                me: "GET /api/auth/me",
            },
            facebook: {
                oauth: "GET /api/facebook/oauth",
                callback: "GET /api/facebook/callback",
                pages: "GET /api/facebook/pages",
                connect: "POST /api/facebook/pages/connect",
                disconnect: "DELETE /api/facebook/pages/:pageId",
            },
            comments: {
                list: "GET /api/comments",
                detail: "GET /api/comments/:commentId",
                updateStatus: "PUT /api/comments/:commentId/status",
            },
            replies: {
                list: "GET /api/replies",
                detail: "GET /api/replies/:replyId",
                approve: "POST /api/replies/:replyId/approve",
                reject: "POST /api/replies/:replyId/reject",
                retry: "POST /api/replies/:replyId/retry",
            },
            settings: {
                get: "GET /api/settings",
                update: "PUT /api/settings",
                reset: "POST /api/settings/reset",
            },
            rules: {
                list: "GET /api/rules",
                create: "POST /api/rules",
                update: "PUT /api/rules/:ruleId",
                delete: "DELETE /api/rules/:ruleId",
                reorder: "PUT /api/rules/reorder",
            },
            analytics: {
                overview: "GET /api/analytics/overview",
                comments: "GET /api/analytics/comments",
                replies: "GET /api/analytics/replies",
                events: "GET /api/analytics/events",
            },
            webhook: {
                verify: "GET /api/webhook",
                events: "POST /api/webhook",
            },
        },
    });
});
// Health check
app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        status: "ok",
        timestamp: new Date().toISOString(),
        environment: env_1.env.NODE_ENV,
        database: "connected",
    });
});
// API routes
app.use("/api/auth", auth_route_1.default);
app.use("/api/facebook", facebook_route_1.default);
app.use("/api/webhook", webhook_route_1.default);
app.use("/api/comments", comment_route_1.default);
app.use("/api/replies", reply_route_1.default);
app.use("/api/settings", settings_route_1.default);
app.use("/api/rules", rules_route_1.default);
app.use("/api/analytics", analytics_route_1.default);
// Error handling (must be last)
app.use(error_middleware_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map