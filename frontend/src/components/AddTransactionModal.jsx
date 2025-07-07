import { useState, useEffect } from "react";
import axios from "../api/axios";
import toast from "react-hot-toast";

export default function AddTransactionModal({
  isOpen,
  onClose,
  onSuccess,
  transaction = null,
  mode = "create",
}) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (transaction) {
      setTitle(transaction.title);
      setAmount(transaction.amount);
      setType(transaction.type);
      setDate(transaction.date.split("T")[0]);
      setCategory(transaction.category);
    }
  }, [transaction]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !amount || !date) {
      toast.error("Please fill all required fields");
      return;
    }

    setLoading(true);

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token;

      if (!token) {
        toast.error("No token found. Please log in again.");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      if (mode === "edit") {
        await axios.put(
          `/transactions/${transaction._id}`,
          {
            title,
            amount: parseFloat(amount),
            type,
            date,
            category,
          },
          config
        );
        toast.success("Transaction updated!");
      } else {
        await axios.post(
          "/transactions",
          {
            title,
            amount: parseFloat(amount),
            type,
            date,
            category,
          },
          config
        );
        toast.success("Transaction added!");
      }

      // Reset form
      setTitle("");
      setAmount("");
      setType("expense");
      setDate("");
      setCategory("");

      onSuccess();
      onClose();
    } catch (err) {
      console.error("Failed:", err.response?.data || err.message);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg space-y-4 w-[90%] max-w-md"
      >
        <h3 className="text-lg font-semibold text-gray-800">
          {mode === "edit" ? "Edit Transaction" : "Add Transaction"}
        </h3>

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

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full px-4 py-2 border rounded"
          required
        />

        <input
          type="text"
          placeholder="Category (e.g., Food)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-4 py-2 border rounded"
        />

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
            disabled={loading}
            className={`px-4 py-2 rounded text-white ${
              loading ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading
              ? mode === "edit"
                ? "Updating..."
                : "Adding..."
              : mode === "edit"
              ? "Update"
              : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
}
