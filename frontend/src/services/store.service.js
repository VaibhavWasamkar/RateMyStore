import api from "./api";

export const getStores = () => api.get("/stores");
export const searchStores = (query) => api.get(`/stores/search?q=${query}`);