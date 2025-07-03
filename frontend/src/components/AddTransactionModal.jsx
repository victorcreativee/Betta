import { useState } from "react";
import axios from "../api/axios";

export default function AddTransactionModal({ isOpen, onClose, onSuccess }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/transactions", {
        title,
        amount: parseFloat(amount),
        type,
      });

      setTitle("");
      setAmount("");
      setType("expense");
      onSuccess(); // refresh data
      onClose();   // close modal
    } catch (err) {
      console.error("Failed to add transaction:", err.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg space-y-4 w-[90%] max-w-md"
      >
        <h3 className="text-lg font-semibold text-gray-800">Add Transaction</h3>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border rounded"
          required
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-4 py-2 border rounded"
          required
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full px-4 py-2 border rounded"
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-500 hover:text-black"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
