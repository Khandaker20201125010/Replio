"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
const logger_1 = require("../utils/logger");
const errors_1 = require("../utils/errors");
function errorHandler(err, req, res, next) {
    logger_1.logger.error({
        error: err.message,
        stack: err.stack,
        path: req.path,
        method: req.method,
    });
    if (err instanceof errors_1.AppError) {
        res.status(err.statusCode).json({
            success: false,
            error: {
                code: err.code,
                message: err.message,
            },
        });
        return;
    }
    if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2002") {
            res.status(409).json({
                success: false,
                error: {
                    code: "CONFLICT_ERROR",
                    message: "Resource already exists",
                },
            });
            return;
        }
        if (err.code === "P2025") {
            res.status(404).json({
                success: false,
                error: {
                    code: "NOT_FOUND",
                    message: "Resource not found",
                },
            });
            return;
        }
    }
    if (err instanceof zod_1.ZodError) {
        res.status(400).json({
            success: false,
            error: {
                code: "VALIDATION_ERROR",
                message: "Validation failed",
                details: err.issues,
            },
        });
        return;
    }
    res.status(500).json({
        success: false,
        error: {
            code: "INTERNAL_ERROR",
            message: "An unexpected error occurred",
        },
    });
}
//# sourceMappingURL=error.middleware.js.map