const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/auth.middleware");
const { getStores, search } = require("../controllers/store.controller");

router.use(authenticate);

router.get("/", getStores);
router.get("/search", search);

module.exports = router;