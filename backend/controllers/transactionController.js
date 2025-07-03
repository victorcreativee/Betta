
const Transaction = require("../models/Transaction");

const createTransaction = async (req, res) => {
  try {
    const { title, amount, type, date, category } = req.body;

    const transaction = await Transaction.create({
      title,
      amount,
      type,
      date,
      category,
    });

    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createTransaction,
  getTransactions,
};
