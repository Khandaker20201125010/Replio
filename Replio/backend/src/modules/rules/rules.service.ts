import prisma from "../../config/prisma";
import { NotFoundError } from "../../utils/errors";
import { logger } from "../../utils/logger";

export async function getRules(userId: string) {
  return await prisma.replyRule.findMany({
    where: { userId },
    orderBy: [{ priority: "desc" }, { createdAt: "desc" }],
  });
}

export async function createRule(userId: string, data: any) {
  const rule = await prisma.replyRule.create({
    data: {
      userId,
      ...data,
    },
  });

  logger.info({ userId, ruleId: rule.id }, "Rule created");

  return rule;
}

export async function updateRule(userId: string, ruleId: string, data: any) {
  const rule = await prisma.replyRule.findFirst({
    where: {
      id: ruleId,
      userId,
    },
  });

  if (!rule) {
    throw new NotFoundError("Rule not found");
  }

  const updated = await prisma.replyRule.update({
    where: { id: ruleId },
    data,
  });

  logger.info({ userId, ruleId }, "Rule updated");

  return updated;
}

export async function deleteRule(userId: string, ruleId: string) {
  const rule = await prisma.replyRule.findFirst({
    where: {
      id: ruleId,
      userId,
    },
  });

  if (!rule) {
    throw new NotFoundError("Rule not found");
  }

  await prisma.replyRule.delete({
    where: { id: ruleId },
  });

  logger.info({ userId, ruleId }, "Rule deleted");
}

export async function reorderRules(userId: string, ruleIds: string[]) {
  // Update priorities for all rules
  for (let i = 0; i < ruleIds.length; i++) {
    await prisma.replyRule.updateMany({
      where: {
        id: ruleIds[i],
        userId,
      },
      data: {
        priority: ruleIds.length - i,
      },
    });
  }

  logger.info({ userId, ruleIds }, "Rules reordered");

  return await getRules(userId);
}

export async function evaluateRules(comment: string, userId: string) {
  const rules = await prisma.replyRule.findMany({
    where: {
      userId,
      enabled: true,
    },
    orderBy: {
      priority: "desc",
    },
  });

  for (const rule of rules) {
    const matches = await checkRuleCondition(comment, rule);
    if (matches) {
      return rule;
    }
  }

  return null;
}

async function checkRuleCondition(
  comment: string,
  rule: any,
): Promise<boolean> {
  const { conditionType, conditionValue } = rule;
  const lowerComment = comment.toLowerCase();

  switch (conditionType) {
    case "KEYWORD":
      const keywords = conditionValue
        .toLowerCase()
        .split(",")
        .map((k: string) => k.trim());
      return keywords.some((keyword: string) => lowerComment.includes(keyword));

    case "PHRASE":
      const phrases = conditionValue
        .toLowerCase()
        .split(",")
        .map((p: string) => p.trim());
      return phrases.some((phrase: string) => lowerComment.includes(phrase));

    case "SENTIMENT":
      // This would require AI analysis, for now return false
      return false;

    case "LANGUAGE":
      // This would require AI analysis, for now return false
      return false;

    case "SPAM_THRESHOLD":
      // This would require AI analysis, for now return false
      return false;

    default:
      return false;
  }
}
