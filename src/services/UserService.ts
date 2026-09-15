import api from "./api";

export const createUser = async (user) => {
  const response = await api.post("/users", user);
  return response.data;
};
