import api from "./api";

export const getPlaces = async () => {
  const response = await api.get("/place");
  return response.data;
};
