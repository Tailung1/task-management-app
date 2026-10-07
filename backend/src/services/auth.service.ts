import { findUserByEmail, createUser } from "../db/queries/auth.query.js";

export const getUserByEmail = async (email: string) => {
  return findUserByEmail(email);
};

export const registerUser = async (name: string, email: string, passwordHash: string) => {
  return createUser(name, email, passwordHash);
};
