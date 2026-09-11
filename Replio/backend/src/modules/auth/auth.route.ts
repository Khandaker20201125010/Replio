import { Router } from "express";
import {
  facebookOAuthController,
  facebookCallbackController,
  logoutController,
  getCurrentUserController,
  updateProfileController,
} from "./auth.controller";
import { authenticate } from "../../middleware/auth.middleware";

const router = Router();

// Public routes
router.get("/facebook", facebookOAuthController);
router.get("/facebook/callback", facebookCallbackController);

// Protected routes
router.post("/logout", authenticate, logoutController);
router.get("/me", authenticate, getCurrentUserController);
router.put("/profile", authenticate, updateProfileController);

export default router;
