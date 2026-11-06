import { Router } from "express";
import { rateLimit } from "express-rate-limit";
import {
  createForgotPasswordController,
  createLoginController,
  registerController,
  resetPasswordController,
} from "../controllers/auth.controller.js";
import { createEmailService } from "../services/email.service.js";
import type { AppConfig } from "../config.js";

export function createAuthRouter(config: AppConfig) {
  const router = Router();
  const emailService = createEmailService(config);
  const forgotPasswordRateLimit = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: { message: "Too many password reset requests. Try again later." },
  });
  const resetPasswordRateLimit = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: { message: "Too many password reset attempts. Try again later." },
  });

  router.post("/register", registerController);
  router.post("/login", createLoginController(config.jwtSecret));
  router.post(
    "/forgot-password",
    forgotPasswordRateLimit,
    createForgotPasswordController(config.appUrl, emailService, config.smtp !== undefined),
  );
  router.post("/reset-password", resetPasswordRateLimit, resetPasswordController);

  return router;
}
