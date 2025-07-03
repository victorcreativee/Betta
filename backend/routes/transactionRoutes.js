const express = require("express");
const router = express.Router();


const {
  createTransaction,
  getTransactions,
  deleteTransaction,
  updateTransaction,
  getSummary,
} = require("../controllers/transactionController");

router.get("/", getTransactions);
router.post("/", createTransaction);
router.delete("/:id", deleteTransaction);
router.put("/:id", updateTransaction);
router.get("/summary", getSummary);

module.exports = router;
