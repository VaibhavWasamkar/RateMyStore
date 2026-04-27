const db = require("../config/db");

// Get Owner Dashboard Data
const getOwnerDashboard = async (ownerId) => {

  // 🔹 Get all stores of owner
  const [stores] = await db.query(`
    SELECT id, name
    FROM stores
    WHERE owner_id = ?
  `, [ownerId]);

  if (stores.length === 0) {
    return { avgRating: 0, stores: [] };
  }

  // 🔹 Get all ratings for owner's stores
  const [ratings] = await db.query(`
    SELECT 
      r.store_id,
      r.rating,
      u.name
    FROM ratings r
    JOIN users u ON r.user_id = u.id
    WHERE r.store_id IN (
      SELECT id FROM stores WHERE owner_id = ?
    )
  `, [ownerId]);

  // 🔹 Group data store-wise
  const storeMap = {};

  stores.forEach(store => {
    storeMap[store.id] = {
      id: store.id,
      name: store.name,
      users: [],
      ratingSum: 0,
      ratingCount: 0
    };
  });

  ratings.forEach(r => {
    const store = storeMap[r.store_id];

    if (store) {
      store.users.push({
        name: r.name,
        rating: r.rating
      });

      store.ratingSum += r.rating;
      store.ratingCount += 1;
    }
  });

  // 🔹 Calculate per-store rating
  const resultStores = Object.values(storeMap).map(store => ({
    id: store.id,
    name: store.name,
    users: store.users,
    rating:
      store.ratingCount > 0
        ? (store.ratingSum / store.ratingCount).toFixed(1)
        : null
  }));

  // 🔹 Overall average
  const totalRatings = ratings.reduce((sum, r) => sum + r.rating, 0);
  const overallAvg =
    ratings.length > 0
      ? (totalRatings / ratings.length).toFixed(1)
      : 0;

  return {
    avgRating: overallAvg,
    stores: resultStores
  };
};

module.exports = {
  getOwnerDashboard
};