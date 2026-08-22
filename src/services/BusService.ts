import api from "./api";
export const getBuses = async () => {
  const response = await api.get("/bus");
  return response.data;
};

export const desactivateBus = async (id: number) => {
  const response = await api.delete(`/bus/${id}`);
  return response.data;
};

export const editBus = async (id: number, bus: any) => {
  const response = await api.patch(`/bus/${id}`, bus);
  return response.data;
};
