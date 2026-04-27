const {
  getDashboardStats,
  getAnalytics,
  getLeaderboard,
  getAllUsers,
  getAllStores,
  createUser,
  createStore
} = require("../models/admin.model");

const getAdminDashboard = async () => {
  return await getDashboardStats();
};

const getChartAnalytics = async () => {
  return await getAnalytics();
};

const getAdminLeaderboard = async () => {
  return await getLeaderboard();
};

const fetchUsers = async (role, sortBy, order) => {
  return await getAllUsers(role, sortBy, order);
};

const fetchStores = async (sortBy, order) => {
  return await getAllStores(sortBy, order);
};

const addUser = async (data) => {
  return await createUser(data);
};

const addStore = async (data) => {
  return await createStore(data);
};

module.exports = {
  getAdminDashboard,
  getChartAnalytics,
  getAdminLeaderboard,
  fetchUsers,
  fetchStores,
  addUser,
  addStore
};