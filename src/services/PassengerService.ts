import api from "./api";

export const createPassenger = async (passenger: any) => {
  const response = await api.post("/passenger", passenger);
  return response.data;
};
