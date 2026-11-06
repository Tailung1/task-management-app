import type { Request, Response } from "express";
import { registerUser, loginUser } from "../services/auth.service.js";
import {
  validateForgotPasswordInput,
  validateLoginInput,
  validatePasswordResetInput,
  validateRegistrationInput,
} from "../utils/auth.validation.js";
import type { AppConfig } from "../config.js";
import {
  requestPasswordReset,
  resetPassword,
} from "../services/password-reset.service.js";

interface PasswordResetEmailService {
  sendPasswordResetEmail(email: string, resetUrl: string): Promise<void>;
}

export const registerController = async (req: Request, res: Response) => {
  const validation = validateRegistrationInput(req.body);

  if (!validation.valid) {
    res.status(400).json({ message: validation.message });
    return;
  }

  try {
    const user = await registerUser(
      validation.value.name,
      validation.value.email,
      validation.value.password,
    );

    res.status(201).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    if (
      error instanceof Error &&
      (error.message === "Email already exists" ||
        ("code" in error && error.code === "23505"))
    ) {
      res.status(409).json({ message: "An account with this email already exists" });
      return;
    }

    console.error("Registration failed", error);
    res.status(500).json({
      message: "Failed to register user",
    });
  }
};

export const createLoginController = (jwtSecret: AppConfig["jwtSecret"]) =>
  async (req: Request, res: Response) => {
    const validation = validateLoginInput(req.body);

    if (!validation.valid) {
      res.status(400).json({ message: validation.message });
      return;
    }

    try {
      const result = await loginUser(
        validation.value.email,
        validation.value.password,
        jwtSecret,
      );
      res.status(200).json(result);
    } catch (error) {
      if (error instanceof Error && error.message === "Invalid credentials") {
        res.status(401).json({
          message: error.message,
        });
        return;
      }

      console.error("Login failed", error);
      res.status(500).json({
        message: "Failed to login",
      });
    }
  };

export const createForgotPasswordController = (
  appUrl: AppConfig["appUrl"],
  emailService: PasswordResetEmailService,
  emailEnabled: boolean,
) => async (req: Request, res: Response) => {
  const validation = validateForgotPasswordInput(req.body);

  if (!validation.valid) {
    res.status(400).json({ message: validation.message });
    return;
  }

  if (!emailEnabled) {
    res.status(503).json({ message: "Password reset email is not configured." });
    return;
  }

  try {
    await requestPasswordReset(validation.value.email, appUrl, emailService);
    res.status(202).json({
      message: "If an account exists for that email, a password reset link will be sent.",
    });
  } catch (error) {
    console.error("Password reset request failed", error);
    res.status(500).json({ message: "Unable to process the password reset request." });
  }
};

export const resetPasswordController = async (req: Request, res: Response) => {
  const validation = validatePasswordResetInput(req.body);

  if (!validation.valid) {
    res.status(400).json({ message: validation.message });
    return;
  }

  try {
    const updated = await resetPassword(
      validation.value.token,
      validation.value.password,
    );

    if (!updated) {
      res.status(400).json({ message: "Reset link is invalid or has expired." });
      return;
    }

    res.status(200).json({ message: "Password has been reset. You can now sign in." });
  } catch (error) {
    console.error("Password reset failed", error);
    res.status(500).json({ message: "Unable to reset the password." });
  }
};
