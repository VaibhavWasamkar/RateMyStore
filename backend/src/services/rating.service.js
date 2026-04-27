const {
  findRating,
  createRating,
  updateRating
} = require("../models/rating.model");

const submitOrUpdateRating = async (userId, storeId, rating) => {
  const existing = await findRating(userId, storeId);

  if (existing) {
    await updateRating(userId, storeId, rating);
    return { message: "Rating updated" };
  } else {
    await createRating(userId, storeId, rating);
    return { message: "Rating submitted" };
  }
};

module.exports = { submitOrUpdateRating };