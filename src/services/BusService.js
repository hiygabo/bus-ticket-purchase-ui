import api from "./api";
export const getBuses = async () => {
  const response = await api.get("/bus");
  return response.data;
};

export const desactivateBus = async (id) => {
  const response = await api.delete(`/bus/${id}`);
  return response.data;
};

export const editBus = async (id, bus) => {
  const response = await api.patch(`/bus/${id}`, bus);
  return response.data;
};
