const Transaction = require("../models/transaction");

// Create Transaction
const createTransaction = async (req, res) => {
  try {
    const { title, amount, type, date, category } = req.body;

    const transaction = await Transaction.create({
      title,
      amount,
      type,
      date,
      category,
      user: req.user._id, // 🔐 Link to logged-in user
    });

    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get (Filtered) Transactions
const getTransactions = async (req, res) => {
  try {
    const { category, start, end } = req.query;
    const filter = { user: req.user._id }; // 🔐 Filter only this user

    if (category) {
      filter.category = category;
    }

    if (start || end) {
      filter.date = {};
      if (start) filter.date.$gte = new Date(start);
      if (end) filter.date.$lte = new Date(end);
    }

    const transactions = await Transaction.find(filter).sort({ date: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: "Failed to get transactions" });
  }
};

// Delete Transaction 
const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const transaction = await Transaction.findOne({ _id: id, user: req.user._id });
    if (!transaction) return res.status(404).json({ message: "Transaction not found" });

    // 🧠 If it was a savings transaction, deduct from the goal
    if (transaction.type === "transfer" && transaction.goal) {
      const goal = await Goal.findOne({ _id: transaction.goal, user: req.user._id });
      if (goal) {
        goal.savedAmount = Math.max(0, goal.savedAmount - transaction.amount);
        await goal.save();
      }
    }

    await Transaction.deleteOne({ _id: id });

    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Update Transaction
const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Transaction.findOneAndUpdate(
      { _id: id, user: req.user._id },
      req.body,
      { new: true }
    );
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Summary (Income / Expenses / Balance)
const Goal = require("../models/goal");

const getSummary = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user._id });

    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const expenses = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    // 🔥 Get total saved into goals
    const goals = await Goal.find({ user: req.user._id });
    const goalsSaved = goals.reduce((sum, g) => sum + (g.savedAmount || 0), 0);

    const balance = income - expenses - goalsSaved;

    res.json({
      income,
      expenses,
      goalsSaved,
      balance,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


//Export all handlers
module.exports = {
  createTransaction,
  getTransactions,
  deleteTransaction,
  updateTransaction,
  getSummary,
};
