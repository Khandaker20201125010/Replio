import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.string().default("6000"),

  DATABASE_URL: z.string().url(),

  JWT_SECRET: z.string().min(32),

  FRONTEND_URL: z.string().url(),

  META_APP_ID: z.string().optional(),
  META_APP_SECRET: z.string().optional(),
  META_REDIRECT_URI: z.string().url(),
  META_WEBHOOK_VERIFY_TOKEN: z.string().optional(),

  OPENROUTER_API_KEY: z.string().optional(),
  OPENROUTER_EMBEDDING_MODEL: z.string().optional(),
  OPENROUTER_LLM_MODEL: z.string().optional(),

  USE_MOCK_AI: z
    .string()
    .optional()
    .transform((val) => val === "true"),
  USE_MOCK_META: z
    .string()
    .optional()
    .transform((val) => val === "true"),
  MOCK_MODE: z
    .string()
    .optional()
    .transform((val) => val === "true"),
});

const validateEnv = () => {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.issues.map((e) => e.path.join(".")).join(", ");
      throw new Error(
        `Missing or invalid environment variables: ${missingVars}`,
      );
    }
    throw error;
  }
};

export const env = validateEnv();

export const isDevelopment = env.NODE_ENV === "development";
export const isProduction = env.NODE_ENV === "production";
export const isTest = env.NODE_ENV === "test";
