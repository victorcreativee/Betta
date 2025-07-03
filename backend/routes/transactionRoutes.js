const express = require("express");
const router = express.Router();


const {
  createTransaction,
  getTransactions
} = require("../controllers/transactionController");

router.get("/", getTransactions);
router.post("/", createTransaction);

module.exports = router;
