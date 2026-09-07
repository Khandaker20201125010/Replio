import type { Request, Response } from "express";
import {
  getRules,
  createRule,
  updateRule,
  deleteRule,
  reorderRules,
} from "./rules.service";
import { logger } from "../../utils/logger";

export async function getRulesController(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const userId = req.user!.userId;
    const rules = await getRules(userId);

    res.status(200).json({
      success: true,
      data: { rules },
    });
  } catch (error) {
    logger.error({ error }, "Get rules failed");
    throw error;
  }
}

export async function createRuleController(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const userId = req.user!.userId;
    const rule = await createRule(userId, req.body);

    res.status(201).json({
      success: true,
      data: { rule },
    });
  } catch (error) {
    logger.error({ error }, "Create rule failed");
    throw error;
  }
}

export async function updateRuleController(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const userId = req.user!.userId;
    const { ruleId } = req.params;

    if (Array.isArray(ruleId)) {
      throw new Error("Invalid rule ID");
    }

    const rule = await updateRule(userId, ruleId, req.body);

    res.status(200).json({
      success: true,
      data: { rule },
    });
  } catch (error) {
    logger.error({ error }, "Update rule failed");
    throw error;
  }
}

export async function deleteRuleController(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const userId = req.user!.userId;
    const { ruleId } = req.params;

    if (Array.isArray(ruleId)) {
      throw new Error("Invalid rule ID");
    }

    await deleteRule(userId, ruleId);

    res.status(200).json({
      success: true,
      message: "Rule deleted successfully",
    });
  } catch (error) {
    logger.error({ error }, "Delete rule failed");
    throw error;
  }
}

export async function reorderRulesController(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const userId = req.user!.userId;
    const { ruleIds } = req.body;

    if (!Array.isArray(ruleIds)) {
      throw new Error("ruleIds must be an array");
    }

    const rules = await reorderRules(userId, ruleIds);

    res.status(200).json({
      success: true,
      data: { rules },
    });
  } catch (error) {
    logger.error({ error }, "Reorder rules failed");
    throw error;
  }
}
