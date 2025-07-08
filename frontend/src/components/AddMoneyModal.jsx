import { useState } from "react";
import axios from "../api/axios";

export default function AddMoneyModal({ isOpen, onClose, goals, onSuccess }) {
  const [selectedGoalId, setSelectedGoalId] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedGoalId || !amount || amount <= 0) return;

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token;

      await axios.patch(`/goals/${selectedGoalId}/add-savings`, {
        amount: parseFloat(amount),
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      onClose();
      setAmount("");
      setSelectedGoalId("");
      onSuccess();
    } catch (err) {
      console.error("Failed to add money to goal:", err.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-full max-w-sm shadow-lg">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Add Money to a Goal
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            value={selectedGoalId}
            onChange={(e) => setSelectedGoalId(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
            required
          >
            <option value="">Select a goal</option>
            {goals.map((goal) => (
              <option key={goal._id} value={goal._id}>
                {goal.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount to save"
            required
            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
          />

          <div className="flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="text-sm text-gray-500">
              Cancel
            </button>
            <button
              type="submit"
              className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
