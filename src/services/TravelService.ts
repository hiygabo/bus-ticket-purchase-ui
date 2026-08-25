import api from "./api";

export const createTravel = async (travel: any) => {
  const response = await api.post("/travel", travel);
  return response.data;
};

export const getTravels = async () => {
  const response = await api.get("/travel");
  return response.data;
};

export const getActiveTravels = async () => {
  const response = await api.get("/travel/active");
  return response.data;
};

export const desactivateTravel = async (id: number) => {
  const response = await api.delete(`/travel/${id}`);
  return response.data;
};

export const editTravel = async (id: number, travel: any) => {
  const response = await api.patch(`/travel/${id}`, travel);
  return response.data;
};
