import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { findUserByEmail, createUser } from "../db/queries/auth.query.js";
import type { AppConfig } from "../config.js";

export const registerUser = async (name: string, email: string, password: string) => {
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new Error("Email already exists");
  }

  const passwordHash = await bcrypt.hash(password, 12);

  return createUser(name, email, passwordHash);
};

export const loginUser = async (email: string, password: string, jwtSecret: AppConfig["jwtSecret"]) => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign({ userId: user.id }, jwtSecret, {
    algorithm: "HS256",
    expiresIn: "7d",
  });

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
};
