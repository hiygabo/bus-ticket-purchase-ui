import api from "./api";

export const createTravel = async (travel) => {
  const response = await api.post("/travel", travel);
  return response.data;
};
