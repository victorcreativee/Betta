import { useState } from "react";

export default function AddTransactionModal({ isOpen, onClose }) {
  const [form, setForm] = useState({
    amount: '',
    type: 'expense',
    category: '',
    note: '',
    date: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Transaction submitted:", form);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md space-y-4"
      >
        <h2 className="text-lg font-semibold text-gray-700">Add New Transaction</h2>

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:outline-none"
          required
        />

        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />

        <textarea
          name="note"
          placeholder="Note (optional)"
          value={form.note}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />

        <div className="flex justify-end gap-4 pt-2">
          <button type="button" onClick={onClose} className="text-gray-500">Cancel</button>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">Save</button>
        </div>
      </form>
    </div>
  );
}
