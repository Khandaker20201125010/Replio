import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { env } from "./config/env";
import { errorHandler } from "./middleware/error.middleware";
import { authLimiter, apiLimiter } from "./middleware/rate-limit.middleware";
import authRoutes from "./modules/auth/auth.route";
import facebookRoutes from "./modules/facebook/facebook.route";
import webhookRoutes from "./modules/webhook/webhook.route";
import commentsRoutes from "./modules/comments/comment.route";
import repliesRoutes from "./modules/replies/reply.route";
import settingsRoutes from "./modules/settings/settings.route";
import rulesRoutes from "./modules/rules/rules.route";
import analyticsRoutes from "./modules/analytics/analytics.route";

const app = express();

// Security middleware
app.use(helmet());

// CORS
app.use(
  cors({
    origin: env.FRONTEND_URL,
    credentials: true,
  }),
);

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Rate limiting
app.use("/api/auth", authLimiter);
app.use("/api", apiLimiter);

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    status: "ok",
    timestamp: new Date().toISOString(),
    environment: env.NODE_ENV,
    database: "connected",
  });
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/facebook", facebookRoutes);
app.use("/api/webhook", webhookRoutes);
app.use("/api/comments", commentsRoutes);
app.use("/api/replies", repliesRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/rules", rulesRoutes);
app.use("/api/analytics", analyticsRoutes);

// Error handling (must be last)
app.use(errorHandler);

export default app;
