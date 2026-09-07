import prisma from "../../config/prisma";
import { NotFoundError } from "../../utils/errors";
import { logger } from "../../utils/logger";

const DEFAULT_SETTINGS = {
  status: "ACTIVE" as const,
  aiProvider: "openai",
  model: "gpt-4",
  confidenceThreshold: 0.7,
  tone: "professional",
  language: "en",
  emojiUsage: true,
  maxLength: 500,
  spamHandling: "ignore",
  humanApprovalMode: false,
  fallbackBehavior: "skip",
};

export async function getSettings(userId: string) {
  let settings = await prisma.aISettings.findUnique({
    where: { userId },
  });

  if (!settings) {
    // Create default settings for user
    settings = await prisma.aISettings.create({
      data: {
        userId,
        ...DEFAULT_SETTINGS,
      },
    });
    logger.info({ userId }, "Created default AI settings for user");
  }

  return settings;
}

export async function updateSettings(userId: string, data: any) {
  const settings = await prisma.aISettings.upsert({
    where: { userId },
    update: data,
    create: {
      userId,
      ...DEFAULT_SETTINGS,
      ...data,
    },
  });

  logger.info({ userId }, "AI settings updated");

  return settings;
}

export async function resetSettings(userId: string) {
  const settings = await prisma.aISettings.upsert({
    where: { userId },
    update: DEFAULT_SETTINGS,
    create: {
      userId,
      ...DEFAULT_SETTINGS,
    },
  });

  logger.info({ userId }, "AI settings reset to defaults");

  return settings;
}
