const express = require("express");
const router = express.Router();

const {
  getProfile,
  updateProfile,
  changePassword
} = require("../controllers/user.controller");

const authMiddleware = require("../middleware/auth.middleware");

// 🔐 Protected routes
router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authMiddleware, updateProfile);
router.put("/change-password", authMiddleware, changePassword);

module.exports = router;