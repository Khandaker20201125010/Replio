import { Router } from "express";
import {
  registerController,
  loginController,
  logoutController,
  getCurrentUserController,
  updateProfileController,
} from "./auth.controller";
import { authenticate } from "../../middleware/auth.middleware";

const router = Router();

// Public routes
router.post("/register", registerController);
router.post("/login", loginController);

// Protected routes
router.post("/logout", authenticate, logoutController);
router.get("/me", authenticate, getCurrentUserController);
router.put("/profile", authenticate, updateProfileController);

export default router;
