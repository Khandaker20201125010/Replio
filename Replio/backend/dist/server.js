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
require("dotenv/config");
const app_1 = __importDefault(require("./app"));
const env_1 = require("./config/env");
const logger_1 = require("./utils/logger");
const prisma_1 = __importDefault(require("./config/prisma"));
const PORT = parseInt(env_1.env.PORT, 10);
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Test database connection
            yield prisma_1.default.$connect();
            logger_1.logger.info("Database connected successfully");
            // Start server
            app_1.default.listen(PORT, () => {
                logger_1.logger.info(`Server running on port ${PORT} in ${env_1.env.NODE_ENV} mode`);
            });
        }
        catch (error) {
            logger_1.logger.error({ error }, "Failed to start server");
            process.exit(1);
        }
    });
}
// Graceful shutdown
process.on("SIGTERM", () => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.logger.info("SIGTERM received, shutting down gracefully");
    yield prisma_1.default.$disconnect();
    process.exit(0);
}));
process.on("SIGINT", () => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.logger.info("SIGINT received, shutting down gracefully");
    yield prisma_1.default.$disconnect();
    process.exit(0);
}));
startServer();
//server
//# sourceMappingURL=server.js.map