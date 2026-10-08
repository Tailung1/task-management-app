import type { Request, Response } from "express";
import { registerUser, loginUser } from "../services/auth.service.js";

export const registerController = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const user = await registerUser(name, email, password);

    res.status(201).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);

    if (error instanceof Error && error.message === "Email already exists") {
      res.status(409).json({
        message: error.message,
      });
      return;
    }

    res.status(500).json({
      message: "Failed to register user",
    });
  }
};

export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const result = await loginUser(email, password);

    res.status(200).json(result);
  } catch (error) {
    console.error(error);

    if (error instanceof Error && error.message === "Invalid credentials") {
      res.status(401).json({
        message: error.message,
      });
      return;
    }

    res.status(500).json({
      message: "Failed to login",
    });
  }
};
