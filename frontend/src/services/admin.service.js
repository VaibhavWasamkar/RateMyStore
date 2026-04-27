import api from "./api";

export const getDashboard = () => api.get("/admin/dashboard");
export const getAnalytics = () => api.get("/admin/analytics");
export const getLeaderboard = () => api.get("/admin/leaderboard");
export const getUsers = (params) => api.get("/admin/users", { params });
export const getStores = (params) => api.get("/admin/stores", { params });
export const addUser = (data) => api.post("/admin/add-user", data);
export const addStore = (data) => api.post("/admin/stores", data);
export const getOwners = () => api.get("/admin/users?role=owner");