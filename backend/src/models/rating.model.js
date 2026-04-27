const db = require("../config/db");

// Check if rating exists
const findRating = async (userId, storeId) => {
  const [rows] = await db.query(
    "SELECT * FROM ratings WHERE user_id = ? AND store_id = ?",
    [userId, storeId]
  );
  return rows[0];
};

// Create rating
const createRating = async (userId, storeId, rating) => {
  const [result] = await db.query(
    "INSERT INTO ratings (user_id, store_id, rating) VALUES (?, ?, ?)",
    [userId, storeId, rating]
  );
  return result;
};

// Update rating
const updateRating = async (userId, storeId, rating) => {
  const [result] = await db.query(
    "UPDATE ratings SET rating = ? WHERE user_id = ? AND store_id = ?",
    [rating, userId, storeId]
  );
  return result;
};

module.exports = { findRating, createRating, updateRating };