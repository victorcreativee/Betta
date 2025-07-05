const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");


const {
  createTransaction,
  getTransactions,
  deleteTransaction,
  updateTransaction,
  getSummary,
} = require("../controllers/transactionController");

router.get("/", protect, getTransactions);
router.post("/", protect, createTransaction);
router.delete("/:id", protect, deleteTransaction);
router.put("/:id", protect, updateTransaction);
router.get("/summary", protect, getSummary);

module.exports = router;
