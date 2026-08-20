import api from "./api";

export const createTravel = async (travel) => {
  const response = await api.post("/travel", travel);
  return response.data;
};

export const getTravels = async () => {
  const response = await api.get("/travel");
  return response.data;
};

export const desactivateTravel = async (id) => {
  const response = await api.delete(`/travel/${id}`);
  return response.data;
};
