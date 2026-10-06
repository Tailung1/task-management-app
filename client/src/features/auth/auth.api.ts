import type { AuthResponse, LoginCredentials, RegisterCredentials } from "./auth.types";

export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  // TODO: connect to your backend
  throw new Error("Not implemented");
}

export async function register(credentials: RegisterCredentials): Promise<AuthResponse> {
  // TODO: connect to your backend
  throw new Error("Not implemented");
}

export async function logout(): Promise<void> {
  // TODO: connect to your backend
}
