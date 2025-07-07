const Goal = require("../models/goal");
const Transaction = require("../models/transaction");

exports.createGoal = async (req, res) => {
  const { name, targetAmount, deadline } = req.body;

  try {
    const goal = await Goal.create({
      user: req.user._id,
      name,
      targetAmount,
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

    const goalsWithProgress = await Promise.all(goals.map(async (goal) => {
      const savings = await Transaction.aggregate([
        { $match: { user: userId, category: "Savings" } },
        {
          $group: {
            _id: null,
            totalSaved: { $sum: "$amount" },
          },
        },
      ]);

      const totalSaved = savings[0]?.totalSaved || 0;
      const progress = Math.min((totalSaved / goal.targetAmount) * 100, 100);

      return {
        _id: goal._id,
        name: goal.name,
        targetAmount: goal.targetAmount,
        deadline: goal.deadline,
        progress: Math.round(progress),
      };
    }));

    res.json(goalsWithProgress);
  } catch (err) {
    res.status(500).json({ message: "Failed to load goals" });
  }
};
