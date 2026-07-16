import type { AuthResponse, LoginData, RegisterData } from "../Types/auth";

import api from "./api";

export const registerUser = async (
  data: RegisterData,
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/auth/register", data);

  return response.data;
};

export const loginUser = async (data: LoginData): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/auth/login", data);

  return response.data;
};

export const getCurrentUser = async (): Promise<AuthResponse> => {
  const response = await api.get<AuthResponse>("/auth/me");

  return response.data;
};

export const logoutUser = async (): Promise<void> => {
  await api.post("/auth/logout");
};
