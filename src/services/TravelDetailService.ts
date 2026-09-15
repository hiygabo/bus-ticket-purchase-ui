import api from "./api";
export const createTravelDetail = async (detail: any) => {
  const response = await api.post("/travel-detail", detail);
  return response.data;
};

export const getOccupiedSeats = async (id_travel: any) => {
  const response = await api.get(`travel-detail/occupied/${id_travel}`);
  return response.data;
};

export const getUserTravels = async (id_user: number) => {
  const response = await api.get(`travel-detail/user/${id_user}`);
  return response.data;
}
