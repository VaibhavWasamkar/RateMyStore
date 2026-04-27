const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");

const {
  dashboard,
  getAnalyticsData,
  fetchLeaderboard,
  getUsers,
  getStores,
  createNewUser,
  createNewStore
} = require("../controllers/admin.controller");

// All routes protected + admin only
router.use(authenticate, authorize("admin"));

router.get("/dashboard", dashboard);
router.get("/analytics", getAnalyticsData);
router.get("/leaderboard", fetchLeaderboard);
router.get("/users", getUsers);
router.get("/stores", getStores);
router.post("/add-user", createNewUser);
router.post("/stores", createNewStore);

module.exports = router;