const db = require("../config/db");

const createUser = async (user) => {
  const { name, email, password, address, role } = user;

  const [result] = await db.query(
    `INSERT INTO users (name, email, password, address, role)
     VALUES (?, ?, ?, ?, ?)`,
    [name, email, password, address, role]
  );

  return result;
};

const findUserByEmail = async (email) => {
  const [rows] = await db.query(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );
  return rows[0];
};

module.exports = { createUser, findUserByEmail };