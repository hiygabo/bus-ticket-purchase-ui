import api from "./api";

export const getSchedules = async () => {
  const response = await api.get("/schedule");
  return response.data;
};
