const Goal = require("../models/goal");
const Transaction = require("../models/transaction");



exports.createGoal = async (req, res) => {
  const { name, targetAmount, deadline } = req.body;

  try {
    const goal = await Goal.create({
      user: req.user._id,
      name,
      targetAmount,
      savedAmount: { type: Number, default: 0 },
      deadline,
    });

    res.status(201).json(goal);
  } catch (err) {
    res.status(400).json({ message: "Failed to create goal" });
  }
};

exports.getGoalsWithProgress = async (req, res) => {
  try {
    const userId = req.user._id;
    const goals = await Goal.find({ user: userId });

    const goalsWithProgress = goals.map(goal => {
      const savedAmount = goal.savedAmount || 0;
      const progress = Math.min((savedAmount / goal.targetAmount) * 100, 100);

      return {
        _id: goal._id,
        name: goal.name,
        targetAmount: goal.targetAmount,
        deadline: goal.deadline,
        savedAmount,
        progress: Math.round(progress),
      };
    });

    res.json(goalsWithProgress);
  } catch (err) {
    console.error("Failed to load goals", err);
    res.status(500).json({ message: "Failed to load goals" });
  }
};


// ADD money to goal
exports.addToGoal = async (req, res) => {
  const { amount } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ message: "Amount must be greater than zero." });
  }

  try {
    const goal = await Goal.findOne({ _id: req.params.id, user: req.user._id });
    if (!goal) return res.status(404).json({ message: "Goal not found." });

    // 1. Save transaction
    await Transaction.create({
      title: `Saved for ${goal.name}`,
      amount,
      type: "expense",
      category: "Savings",
      user: req.user._id,
      date: new Date(),
      goal: goal._id, // ✅ attach goal ID
    });

    // 2. Increment savedAmount in goal
    goal.savedAmount = (goal.savedAmount || 0) + amount;
    await goal.save();

    res.status(200).json({
      message: "Amount added to goal successfully.",
      goal: {
        _id: goal._id,
        name: goal.name,
        targetAmount: goal.targetAmount,
        savedAmount: goal.savedAmount,
        progress: Math.min((goal.savedAmount / goal.targetAmount) * 100, 100),
      },
    });

  } catch (err) {
    console.error("Error adding to goal:", err);
    res.status(500).json({ message: "Server error" });
  }
};




// Update Goal
exports.updateGoal = async (req, res) => {
  const { name, targetAmount, deadline } = req.body;

  if (!name || !targetAmount) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const goal = await Goal.findOne({ _id: req.params.id, user: req.user._id });

    if (!goal) return res.status(404).json({ message: "Goal not found." });

    goal.name = name;
    goal.targetAmount = targetAmount;
    goal.deadline = deadline;

    await goal.save();

    res.status(200).json({ message: "Goal updated successfully.", goal });
  } catch (err) {
    console.error("Update goal error:", err);
    res.status(500).json({ message: "Server error while updating goal." });
  }
};

// DELETE Goals
exports.deleteGoal = async (req, res) => {
  try {
    const goal = await Goal.findOneAndDelete({ _id: req.params.id, user: req.user._id });

    if (!goal) return res.status(404).json({ message: "Goal not found." });

    res.status(200).json({ message: "Goal deleted successfully." });
  } catch (err) {
    console.error("Delete goal error:", err);
    res.status(500).json({ message: "Server error while deleting goal." });
  }
};
