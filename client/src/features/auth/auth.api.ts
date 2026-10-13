import type { LoginCredentials, RegisterCredentials, LoginResponse } from "./auth.types";
import apiClient from "../../api/clientApi";

export function login(credentials: LoginCredentials): Promise<LoginResponse> {
  return apiClient("auth/login", { method: "POST", body: credentials });
}

export function register(credentials: RegisterCredentials): Promise<void> {
  return apiClient("auth/register", { method: "POST", body: credentials });
}

// export async function logout(): Promise<void> {}
