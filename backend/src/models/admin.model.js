const db = require("../config/db");
const { hashPassword } = require("../utils/hash");

// Dashboard stats
const getDashboardStats = async () => {
  const [[users]] = await db.query("SELECT COUNT(*) as total FROM users");
  const [[stores]] = await db.query("SELECT COUNT(*) as total FROM stores");
  const [[ratings]] = await db.query("SELECT COUNT(*) as total FROM ratings");

  return {
    totalUsers: users.total,
    totalStores: stores.total,
    totalRatings: ratings.total
  };
};

// ANALYTICS
const getAnalytics = async () => {

  // Users by role (Pie)
  const [roles] = await db.query(`
    SELECT role, COUNT(*) as count
    FROM users
    GROUP BY role
  `);

  // Top 5 stores (Bar)
  const [topStores] = await db.query(`
    SELECT s.id, s.name, ROUND(AVG(r.rating),1) as rating
    FROM stores s
    LEFT JOIN ratings r ON s.id = r.store_id
    GROUP BY s.id
    ORDER BY rating DESC
    LIMIT 5
  `);

  // Rating distribution (Area)
  const [ratingDistribution] = await db.query(`
    SELECT rating, COUNT(*) as count
    FROM ratings
    GROUP BY rating
    ORDER BY rating
  `);

  return {
    roles,
    topStores,
    ratingDistribution
  };
};

// Leaderboard
const getLeaderboard = async () => {
  const [rows] = await db.query(`
    SELECT 
      u.id,
      u.name,
      u.email,
      COUNT(r.id) AS total_ratings,
      ROUND(AVG(r.rating),1) AS avg_rating
    FROM users u
    JOIN ratings r ON u.id = r.user_id
    GROUP BY u.id
    ORDER BY total_ratings DESC
  `);

  return rows;
};

// Get all users
const getAllUsers = async (role, sortBy = "name", order = "ASC") => {
  let query = `
    SELECT 
      u.id,
      u.name,
      u.email,
      u.address,
      u.role,
      ROUND(AVG(r.rating), 1) AS rating
    FROM users u
    LEFT JOIN stores s ON s.owner_id = u.id
    LEFT JOIN ratings r ON r.store_id = s.id
  `;

  let values = [];

  if (role) {
    query += " WHERE u.role = ?";
    values.push(role);
  }

  query += " GROUP BY u.id";

  // whitelist fields
  const allowedFields = ["name", "email", "address", "role", "rating"];
  if (!allowedFields.includes(sortBy)) sortBy = "name";

  const sortOrder = order === "DESC" ? "DESC" : "ASC";

  query += ` ORDER BY ${sortBy === "rating" ? "rating" : "u." + sortBy} ${sortOrder}`;

  const [rows] = await db.query(query, values);
  return rows;
};

// Get all stores with avg rating
const getAllStores = async (sortBy = "name", order = "ASC") => {
  const allowedFields = ["name", "email", "address", "rating", "owner_name"];
  if (!allowedFields.includes(sortBy)) sortBy = "name";

  const sortOrder = order === "DESC" ? "DESC" : "ASC";

  const [rows] = await db.query(`
    SELECT 
      s.id,
      s.name,
      s.email,
      s.address,
      u.name AS owner_name,
      ROUND(AVG(r.rating),1) AS rating
    FROM stores s
    LEFT JOIN users u ON s.owner_id = u.id
    LEFT JOIN ratings r ON s.id = r.store_id
    GROUP BY s.id
    ORDER BY ${sortBy === "rating" ? "rating" : sortBy === "owner_name" ? "owner_name" : "s." + sortBy} ${sortOrder}
  `);

  return rows;
};

// Add User
const createUser = async ({ name, email, password, address, role }) => {
  const hashedPassword = await hashPassword(password);
  const [result] = await db.query(
    `INSERT INTO users (name, email, password, address, role)
     VALUES (?, ?, ?, ?, ?)`,
    [name, email, hashedPassword, address, role]
  );
  return result;
};

// Add store
const createStore = async ({ name, email, address, owner_id }) => {
  const [result] = await db.query(
    `INSERT INTO stores (name, email, address, owner_id)
     VALUES (?, ?, ?, ?)`,
    [name, email, address, owner_id]
  );
  return result;
};

module.exports = {
  getDashboardStats,
  getAnalytics,
  getLeaderboard,
  getAllUsers,
  getAllStores,
  createUser,
  createStore
};