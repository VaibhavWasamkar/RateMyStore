import api from "./api";

export const rateStore = (data) => api.post("/ratings", data);