const { fetchStores, searchAllStores } = require("../services/store.service");

const getStores = async (req, res) => {
  try {
    const userId = req.user.id;
    const stores = await fetchStores(userId);
    res.json(stores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const search = async (req, res) => {
  try {
    const userId = req.user.id;
    const { q } = req.query;

    const stores = await searchAllStores(q || "", userId);
    res.json(stores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getStores, search };