const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    type: { type: String, 
      enum: ["income", "expense"], 
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
    },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
