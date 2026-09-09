"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTest = exports.isProduction = exports.isDevelopment = exports.env = void 0;
const zod_1 = require("zod");
const envSchema = zod_1.z.object({
    NODE_ENV: zod_1.z
        .enum(["development", "production", "test"])
        .default("development"),
    PORT: zod_1.z.string().default("6000"),
    DATABASE_URL: zod_1.z.string().url(),
    JWT_SECRET: zod_1.z.string().min(32),
    FRONTEND_URL: zod_1.z.string().url(),
    META_APP_ID: zod_1.z.string().optional(),
    META_APP_SECRET: zod_1.z.string().optional(),
    META_REDIRECT_URI: zod_1.z.string().url(),
    META_WEBHOOK_VERIFY_TOKEN: zod_1.z.string().optional(),
    OPENROUTER_API_KEY: zod_1.z.string().optional(),
    OPENROUTER_EMBEDDING_MODEL: zod_1.z.string().optional(),
    OPENROUTER_LLM_MODEL: zod_1.z.string().optional(),
    USE_MOCK_AI: zod_1.z
        .string()
        .optional()
        .transform((val) => val === "true"),
    USE_MOCK_META: zod_1.z
        .string()
        .optional()
        .transform((val) => val === "true"),
    MOCK_MODE: zod_1.z
        .string()
        .optional()
        .transform((val) => val === "true"),
});
const validateEnv = () => {
    try {
        return envSchema.parse(process.env);
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            const missingVars = error.issues.map((e) => e.path.join(".")).join(", ");
            throw new Error(`Missing or invalid environment variables: ${missingVars}`);
        }
        throw error;
    }
};
exports.env = validateEnv();
exports.isDevelopment = exports.env.NODE_ENV === "development";
exports.isProduction = exports.env.NODE_ENV === "production";
exports.isTest = exports.env.NODE_ENV === "test";
//# sourceMappingURL=env.js.map