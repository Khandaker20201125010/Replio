import { Router } from "express";
import {
  getSettingsController,
  updateSettingsController,
  resetSettingsController,
} from "./settings.controller";
import { authenticate } from "../../middleware/auth.middleware";

const router = Router();

// Protected routes
router.get("/", authenticate, getSettingsController);
router.put("/", authenticate, updateSettingsController);
router.post("/reset", authenticate, resetSettingsController);

export default router;
