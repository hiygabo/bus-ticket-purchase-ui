import api from "./api";

export const login = async (email: any, password: any) => {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
};
