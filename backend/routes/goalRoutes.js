const express = require("express");
const router = express.Router();
const { createGoal, getGoalsWithProgress } = require("../controllers/goalController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createGoal);
router.get("/", protect, getGoalsWithProgress);

module.exports = router;
