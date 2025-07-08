const express = require("express");
const router = express.Router();
const { 
    createGoal, 
    getGoalsWithProgress,  
    addToGoal,
    updateGoal, 
    deleteGoal, 
} = require("../controllers/goalController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createGoal);
router.get("/", protect, getGoalsWithProgress);
router.patch("/:id/add-savings", protect, addToGoal);
router.delete("/:id", protect, deleteGoal); 
router.put("/:id", protect, updateGoal);

module.exports = router;
