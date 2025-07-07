const Transaction = require("../models/transaction");

const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user._id;

    //  Recent Transactions (last 5)
    const recentTrends = await Transaction.find({ user: userId })
      .sort({ date: -1 })
      .limit(5)
      .select("date category amount");

    // Top Categories (grouped by category)
    const topCategories = await Transaction.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" },
        },
      },
      { $sort: { total: -1 } },
      { $limit: 5 },
    ]);

    // Smart Goals (static sample — can be dynamic later)
    const smartGoals = [
      { name: "Monthly Expense Cap", progress: 68 },
      { name: "Savings Target", progress: 40 },
    ];

    res.status(200).json({
      recentTrends,
      topCategories: topCategories.map((c) => ({
        category: c._id,
        total: c.total,
      })),
      smartGoals,
    });
  } catch (err) {
    res.status(500).json({ message: "Error loading dashboard stats" });
  }
};

module.exports = { getDashboardStats };
