import type {
  LoginCredentials,
  LoginResponse,
  RegisterCredentials,
  RegisterResponse,
  User,
} from "./auth.types";
import apiClient from "../../api/clientApi";

function decodeUser(value: unknown): User {
  if (
    typeof value !== "object" ||
    value === null ||
    !("id" in value) ||
    typeof value.id !== "string" ||
    !("name" in value) ||
    typeof value.name !== "string" ||
    !("email" in value) ||
    typeof value.email !== "string"
  ) {
    throw new Error("Invalid user");
  }

  return { id: value.id, name: value.name, email: value.email };
}

function decodeLoginResponse(value: unknown): LoginResponse {
  if (
    typeof value !== "object" ||
    value === null ||
    !("token" in value) ||
    typeof value.token !== "string" ||
    !value.token.trim() ||
    !("user" in value)
  ) {
    throw new Error("Invalid login response");
  }

  return { token: value.token, user: decodeUser(value.user) };
}

function decodeRegisterResponse(value: unknown): RegisterResponse {
  if (typeof value !== "object" || value === null || !("user" in value)) {
    throw new Error("Invalid registration response");
  }

  return { user: decodeUser(value.user) };
}

export function login(credentials: LoginCredentials): Promise<LoginResponse> {
  return apiClient("auth/login", decodeLoginResponse, { method: "POST", body: credentials });
}

export function register(credentials: RegisterCredentials): Promise<RegisterResponse> {
  return apiClient("auth/register", decodeRegisterResponse, {
    method: "POST",
    body: credentials,
  });
}

// export async function logout(): Promise<void> {}
