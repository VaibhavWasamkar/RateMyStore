const { submitOrUpdateRating } = require("../services/rating.service");

const rateStore = async (req, res) => {
  try {
    const userId = req.user.id;
    const { store_id, rating } = req.body;

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: "Rating must be between 1 and 5" });
    }

    const result = await submitOrUpdateRating(userId, store_id, rating);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { rateStore };