import api from "./api";

export const getStops = async () => {
  const response = await api.get("/stop");
  return response.data;
};
