const db = require("../config/db");
const { hashPassword, comparePassword } = require("../utils/hash");

const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const [rows] = await db.query(
      "SELECT name, email, address FROM users WHERE id = ?",
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(rows[0]);

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, email, address } = req.body;

    // 🔹 VALIDATION (same rules as frontend)
    if (!name || name.length < 20 || name.length > 60) {
      return res.status(400).json({
        error: "Name must be 20–60 characters"
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({
        error: "Invalid email format"
      });
    }

    if (!address || address.length > 400) {
      return res.status(400).json({
        error: "Address must be under 400 characters"
      });
    }

    // 🔹 Check duplicate email
    const [existing] = await db.query(
      "SELECT id FROM users WHERE email = ? AND id != ?",
      [email, userId]
    );

    if (existing.length > 0) {
      return res.status(400).json({
        error: "Email already in use"
      });
    }

    // 🔹 Update
    await db.query(
      "UPDATE users SET name=?, email=?, address=? WHERE id=?",
      [name, email, address, userId]
    );

    res.json({ message: "Profile updated successfully" });

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { oldPassword, newPassword } = req.body;

    // Get current password
    const [rows] = await db.query(
      "SELECT password FROM users WHERE id = ?",
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = rows[0];

    // ✅ Compare using your util
    const isMatch = await comparePassword(oldPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Incorrect current password" });
    }

    // ✅ Validate new password
    const passRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}$/;

    if (!passRegex.test(newPassword)) {
      return res.status(400).json({
        error:
          "Password must be 8–16 chars, include 1 uppercase & 1 special character"
      });
    }

    // ✅ Hash using your util
    const hashed = await hashPassword(newPassword);

    // Update DB
    await db.query(
      "UPDATE users SET password = ? WHERE id = ?",
      [hashed, userId]
    );

    res.json({ message: "Password updated successfully" });

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  changePassword
};