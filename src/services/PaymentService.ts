import api from "./api";

export const getPaymentTypes = async () => {
    const response = await api.get("/payment-type");
    return response.data;
}

export const createPayment = async (payment: any) => {
    const response = await api.post("/payment", payment);
    return response.data;
}