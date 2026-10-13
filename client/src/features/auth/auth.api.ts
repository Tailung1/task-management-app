import type { LoginCredentials, RegisterCredentials, LoginResponse } from "./auth.types";
import apiClient from "../../api/clientApi";

export async function login(credentials: LoginCredentials): Promise<LoginResponse> {
  return apiClient("auth/login", { body: credentials });
}

export async function register(credentials: RegisterCredentials): Promise<void> {
  return apiClient("auth/register", { body: credentials });
}

export async function logout(): Promise<void> {}
