import { Router } from "express";
import {
  getRulesController,
  createRuleController,
  updateRuleController,
  deleteRuleController,
  reorderRulesController,
} from "./rules.controller";
import { authenticate } from "../../middleware/auth.middleware";

const router = Router();

// Protected routes
router.get("/", authenticate, getRulesController);
router.post("/", authenticate, createRuleController);
router.put("/:ruleId", authenticate, updateRuleController);
router.delete("/:ruleId", authenticate, deleteRuleController);
router.put("/reorder", authenticate, reorderRulesController);

export default router;
