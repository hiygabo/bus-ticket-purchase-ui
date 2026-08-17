import api from "./api";
export const createTravelDetail = async (detail) => {
  const response = await api.post("/travel-detail", detail);
  return response.data;
};

export const getOccupiedSeats = async (id_travel) => {
  const response = await api.get(`travel-detail/occupied/${id_travel}`);
  return response.data;
};
