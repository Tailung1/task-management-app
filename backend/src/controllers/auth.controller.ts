import type { Request, Response } from "express";
import { getUserByEmail, registerUser } from "../services/auth.service.js";

export const registerController = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      res.status(409).json({ message: "Email already exists" });
      return;
    }

    const user = await registerUser(name, email, password);

    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to register user" });
  }
};
