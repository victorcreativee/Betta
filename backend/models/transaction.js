const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    type: { type: String, 
      enum: ["income", "expense", "transfer"], 
      required: true 
    },
    date: {
       type: Date, 
       default: Date.now 
      },
    category: {
       type: String, 
       default: "General" 
      },
      goal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Goal",       
      },
    },
  { timestamps: true }
);

module.exports = mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema); 

