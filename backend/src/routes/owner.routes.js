const express = require("express");
const router = express.Router();

const { fetchOwnerDashboard } = require("../controllers/owner.controller");
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");

// Only owner can access
router.get("/dashboard", auth, role("owner"), fetchOwnerDashboard);

module.exports = router;