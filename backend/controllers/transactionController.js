const Transaction = require("../models/Transaction");

// @desc   Get all transactions
exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ createdAt: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
};

// @desc   Add new transaction
exports.addTransaction = async (req, res) => {
  try {
    const { title, amount, category, type } = req.body;
    const transaction = await Transaction.create({ title, amount, category, type });
    res.status(201).json(transaction);
  } catch (err) {
    res.status(400).json({ error: "Failed to add transaction" });
  }
};

// @desc   Delete transaction
exports.deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    await Transaction.findByIdAndDelete(id);
    res.json({ message: "Transaction deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete transaction" });
  }
};
