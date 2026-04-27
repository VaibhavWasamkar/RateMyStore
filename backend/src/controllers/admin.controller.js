const {
  getAdminDashboard,
  getChartAnalytics,
  getAdminLeaderboard,
  fetchUsers,
  fetchStores,
  addUser,
  addStore
} = require("../services/admin.service");

// Dashboard
const dashboard = async (req, res) => {
  try {
    const data = await getAdminDashboard();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Analytics
const getAnalyticsData = async (req, res) => {
  try {
    const data = await getChartAnalytics();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Leaderboard
const fetchLeaderboard = async (req, res) => {
  try {
    const data = await getAdminLeaderboard();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get users
const getUsers = async (req, res) => {
  try {
    const { role, sortBy, order } = req.query;
    const users = await fetchUsers(role, sortBy, order);
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get stores
const getStores = async (req, res) => {
  try {
    const { sortBy, order } = req.query;
    const stores = await fetchStores(sortBy, order);
    res.json(stores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add User
const createNewUser = async (req, res) => {
  try {
    const result = await addUser(req.body);
    res.status(201).json({ message: "User added successfully", result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Add store
const createNewStore = async (req, res) => {
  try {
    const result = await addStore(req.body);
    res.status(201).json({ message: "Store added successfully", result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  dashboard,
  getAnalyticsData,
  fetchLeaderboard,
  getUsers,
  getStores,
  createNewUser,
  createNewStore
};