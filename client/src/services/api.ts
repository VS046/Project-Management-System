import api from "@/lib/axios";

export interface LoginRequest {
  email: string;
  password: string;
}
export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}
export const loginUser = async (data: LoginRequest) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};
export const registerUser = async (data: RegisterRequest) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

export const changePassword = async (payload: { currentPassword: string; newPassword: string }) => {
  const response = await api.post("/auth/change-password", payload);
  return response.data;
};
