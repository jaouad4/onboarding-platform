import apiClient from "./api";

export interface UserProfile {
  id: string;
  username: string;
  email: string | null;
  firstName: string;
  lastName: string;
  role: "ADMIN" | "USER";
  domain: "TECHNIQUE" | "COMMERCE" | "MARKETING" | "FINANCE" | "RH" | null;
  status:
    | "PENDING_CERTIFICATION"
    | "CERTIFICATION_SUBMITTED"
    | "CERTIFICATION_VERIFIED"
    | "READY";
  firstLoginAt: string | null;
  isActive: boolean;
  createdAt: string;
}

export interface LoginResponse {
  user: UserProfile;
}

export const login = async (
  identifier: string,
  password: string
): Promise<LoginResponse> => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ identifier, password }),
  });

  if (!response.ok) {
    const err = await response.json() as { message?: string };
    throw { response: { data: { message: err.message } } };
  }

  const data = await response.json() as { success: boolean; data: LoginResponse };
  return data.data;
};

export const logout = async (): Promise<void> => {
  try {
    await apiClient.post("/auth/logout");
  } finally {
    await fetch("/api/auth/logout", { method: "POST" });
  }
};

export const getMe = async (): Promise<UserProfile> => {
  const response = await apiClient.get<{ success: boolean; data: UserProfile }>("/auth/me");
  return response.data.data;
};
