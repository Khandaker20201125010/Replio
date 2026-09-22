import prisma from "../../config/prisma";
import { NotFoundError } from "../../utils/errors";
import { logger } from "../../utils/logger";

const DEFAULT_SETTINGS = {
  status: "ACTIVE" as const,
  aiProvider: "openrouter",
  model: "google/gemma-4-31b-it:free",
  confidenceThreshold: 0.7,
  tone: "professional",
  language: "en",
  emojiUsage: true,
  maxLength: 500,
  spamHandling: "ignore",
  humanApprovalMode: false,
  fallbackBehavior: "skip",
};

export function formatSettingsResponse(settings: any) {
  if (!settings) return null;
  return {
    ...settings,
    provider: settings.aiProvider || "openrouter",
    model: settings.model || "google/gemma-4-31b-it:free",
    confidenceThreshold: settings.confidenceThreshold ?? 0.7,
    autoReplyEnabled: !settings.humanApprovalMode,
    requireHumanReview: Boolean(settings.humanApprovalMode),
    maxReplyLength: settings.maxLength || 500,
    tone: settings.tone || "professional",
    language: settings.language || "en",
    status: settings.status || "ACTIVE",
  };
}

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

  return formatSettingsResponse(settings);
}

export async function updateSettings(userId: string, data: any) {
  const updateData: any = {};

  if (data.provider !== undefined) updateData.aiProvider = data.provider;
  if (data.aiProvider !== undefined) updateData.aiProvider = data.aiProvider;

  if (data.model !== undefined) updateData.model = data.model;
  if (data.confidenceThreshold !== undefined) {
    updateData.confidenceThreshold = parseFloat(String(data.confidenceThreshold));
  }
  if (data.tone !== undefined) updateData.tone = data.tone;
  if (data.language !== undefined) updateData.language = data.language;
  if (data.emojiUsage !== undefined) updateData.emojiUsage = Boolean(data.emojiUsage);

  if (data.maxReplyLength !== undefined) {
    updateData.maxLength = parseInt(String(data.maxReplyLength), 10);
  }
  if (data.maxLength !== undefined) {
    updateData.maxLength = parseInt(String(data.maxLength), 10);
  }

  if (data.requireHumanReview !== undefined) {
    updateData.humanApprovalMode = Boolean(data.requireHumanReview);
  } else if (data.autoReplyEnabled !== undefined) {
    updateData.humanApprovalMode = !data.autoReplyEnabled;
  } else if (data.humanApprovalMode !== undefined) {
    updateData.humanApprovalMode = Boolean(data.humanApprovalMode);
  }

  if (data.spamHandling !== undefined) updateData.spamHandling = data.spamHandling;
  if (data.fallbackBehavior !== undefined) updateData.fallbackBehavior = data.fallbackBehavior;
  if (data.status !== undefined) updateData.status = data.status;

  const settings = await prisma.aISettings.upsert({
    where: { userId },
    update: updateData,
    create: {
      userId,
      ...DEFAULT_SETTINGS,
      ...updateData,
    },
  });

  logger.info(
    { userId, humanApprovalMode: settings.humanApprovalMode },
    "AI settings updated",
  );

  return formatSettingsResponse(settings);
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

  return formatSettingsResponse(settings);
}
