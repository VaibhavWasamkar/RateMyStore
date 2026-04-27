const db = require("../config/db");

// Get all stores with avg rating + user's rating
const getAllStores = async (userId) => {
  const [rows] = await db.query(`
    SELECT 
      s.id,
      s.name,
      s.address,
      IFNULL(AVG(r.rating), 0) AS average_rating,
      (
        SELECT rating FROM ratings 
        WHERE user_id = ? AND store_id = s.id
      ) AS user_rating
    FROM stores s
    LEFT JOIN ratings r ON s.id = r.store_id
    GROUP BY s.id
  `, [userId]);

  return rows;
};

// Search stores
const searchStores = async (query, userId) => {
  const [rows] = await db.query(`
    SELECT 
      s.id,
      s.name,
      s.address,
      IFNULL(AVG(r.rating), 0) AS average_rating,
      (
        SELECT rating FROM ratings 
        WHERE user_id = ? AND store_id = s.id
      ) AS user_rating
    FROM stores s
    LEFT JOIN ratings r ON s.id = r.store_id
    WHERE s.name LIKE ? OR s.address LIKE ?
    GROUP BY s.id
  `, [userId, `%${query}%`, `%${query}%`]);

  return rows;
};

module.exports = { getAllStores, searchStores };