const express = require("express");
const router = express.Router();
const {
  getTransactions,
  addTransaction,
  deleteTransaction,
} = require("../controllers/transactionController");

// GET /api/transactions
router.get("/", getTransactions);

// POST /api/transactions
router.post("/", addTransaction);

// DELETE /api/transactions/:id
router.delete("/:id", deleteTransaction);

module.exports = router;
