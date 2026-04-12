import apiClient, { setTokens, clearTokens } from "./api";

export interface UserProfile {
  id: string;
  username: string;
  email: string | null;
  firstName: string;
  lastName: string;
  role: "ADMIN" | "USER";
  domain: "TECHNIQUE" | "COMMERCE" | "MARKETING" | "FINANCE" | "RH" | null;
  status: "PENDINGCERTIFICATION" | "CERTIFICATIONSUBMITTED" | "CERTIFICATIONVERIFIED" | "READY";
  firstLoginAt: string | null;
  isActive: boolean;
  createdAt: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: UserProfile;
}

export const login = async (
  identifier: string,
  password: string
): Promise<LoginResponse> => {
  const response = await apiClient.post<{ success: boolean; data: LoginResponse }>(
    "/auth/login",
    { identifier, password }
  );
  const { accessToken, refreshToken, user } = response.data.data;
  setTokens(accessToken, refreshToken);
  return { accessToken, refreshToken, user };
};

export const logout = async (): Promise<void> => {
  try {
    await apiClient.post("/auth/logout");
  } finally {
    clearTokens();
  }
};

export const getMe = async (): Promise<UserProfile> => {
  const response = await apiClient.get<{ success: boolean; data: UserProfile }>("/auth/me");
  return response.data.data;
};
