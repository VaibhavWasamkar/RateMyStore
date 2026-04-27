const { getOwnerDashboard } = require("../models/owner.model");

// Dashboard API
const fetchOwnerDashboard = async (req, res) => {
  try {
    const ownerId = req.user.id; // from auth middleware

    const data = await getOwnerDashboard(ownerId);

    res.json(data);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
};

module.exports = {
  fetchOwnerDashboard
};