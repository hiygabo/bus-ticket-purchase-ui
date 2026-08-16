import api from "./api";
export const createTravelDetail = async (detail) => {
  const response = await axios.post("travel-detail", detail);
  return response.data;
};
