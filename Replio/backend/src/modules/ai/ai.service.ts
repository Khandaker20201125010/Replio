import { MockAIProvider } from "./mock.provider";
import { OpenRouterProvider } from "./openrouter.provider";
import { env } from "../../config/env";
import { logger } from "../../utils/logger";
import type {
  AIProvider,
  AIAnalysisResult,
  AIReplyResult,
} from "./ai.provider";

export function getAIProvider(settings: any): AIProvider {
  const provider = settings.aiProvider || "openrouter";

  // Use mock if OpenRouter not configured or if explicitly requested
  if (provider === "mock" || !env.OPENROUTER_API_KEY) {
    logger.debug("Using Mock AI provider");
    return new MockAIProvider();
  }

  if (provider === "openrouter") {
    logger.debug("Using OpenRouter provider");
    return new OpenRouterProvider();
  }

  // Default to mock for safety
  logger.warn(`Unknown AI provider: ${provider}, falling back to mock`);
  return new MockAIProvider();
}

export async function analyzeComment(
  comment: string,
  settings: any,
): Promise<AIAnalysisResult> {
  const provider = getAIProvider(settings);
  return await provider.analyzeComment(comment);
}

export async function generateReply(
  comment: string,
  analysis: AIAnalysisResult,
  settings: any,
): Promise<AIReplyResult> {
  const provider = getAIProvider(settings);
  return await provider.generateReply(comment, analysis, settings);
}

export async function validateReply(
  reply: string,
  settings: any,
): Promise<boolean> {
  const provider = getAIProvider(settings);
  return await provider.validateReply(reply);
}
