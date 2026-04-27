const { getAllStores, searchStores } = require("../models/store.model");

const fetchStores = async (userId) => {
  return await getAllStores(userId);
};

const searchAllStores = async (query, userId) => {
  return await searchStores(query, userId);
};

module.exports = { fetchStores, searchAllStores };