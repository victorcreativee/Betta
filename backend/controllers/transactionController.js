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

const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    await Transaction.findByIdAndDelete(id);
    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Transaction.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getSummary = async (req, res) => {
  try {
    const transactions = await Transaction.find();

    const income = transactions
      .filter(t => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const expenses = transactions
      .filter(t => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    const balance = income - expenses;

    res.json({ income, expenses, balance });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports = {
  createTransaction,
  getTransactions,
  deleteTransaction,
  updateTransaction,
  getSummary,
};
