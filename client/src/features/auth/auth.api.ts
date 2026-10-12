import type { AuthResponse, LoginCredentials, RegisterCredentials } from "./auth.types";

export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  throw new Error("Not implemented");
}

export async function register(credentials: RegisterCredentials): Promise<AuthResponse> {
  throw new Error("Not implemented");
}

export async function logout(): Promise<void> {}
