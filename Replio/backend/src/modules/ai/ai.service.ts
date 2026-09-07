import { MockAIProvider } from "./mock.provider";
import { OpenAIProvider } from "./openai.provider";
import { env } from "../../config/env";
import { logger } from "../../utils/logger";
import type {
  AIProvider,
  AIAnalysisResult,
  AIReplyResult,
} from "./ai.provider";

export function getAIProvider(settings: any): AIProvider {
  const provider = settings.aiProvider || "openai";

  // Use mock if OpenAI not configured or if explicitly requested
  if (provider === "mock" || !env.OPENAI_API_KEY) {
    logger.debug("Using Mock AI provider");
    return new MockAIProvider();
  }

  if (provider === "openai") {
    logger.debug("Using OpenAI provider");
    return new OpenAIProvider();
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
