import type { Request, Response } from "express";
import { registerUser, loginUser } from "../services/auth.service.js";
import {
  validateLoginInput,
  validateRegistrationInput,
} from "../utils/auth.validation.js";
import type { AppConfig } from "../config.js";

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
