import type { AuthResponse, LoginPayload, RegisterPayload } from "../types/auth";

const BASE_URL = "http://localhost:3002/api/auth";

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function postAuth<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => null);
    throw new ApiError(data?.message || `HTTP ${res.status}`, res.status);
  }
  return res.json();
}

export function registerUser(payload: RegisterPayload): Promise<AuthResponse> {
  return postAuth<AuthResponse>("/register", payload);
}

export function loginUser(payload: LoginPayload): Promise<AuthResponse> {
  return postAuth<AuthResponse>("/login", payload);
}
