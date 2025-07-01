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
    console.log(form); // Later: send to backend
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-lg font-bold mb-4">Add Transaction</h2>

        <input name="amount" placeholder="Amount" className="w-full p-2 mb-2 border rounded" onChange={handleChange} required />
        
        <select name="type" className="w-full p-2 mb-2 border rounded" onChange={handleChange}>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <input name="category" placeholder="Category" className="w-full p-2 mb-2 border rounded" onChange={handleChange} />
        
        <input type="date" name="date" className="w-full p-2 mb-2 border rounded" onChange={handleChange} />
        
        <textarea name="note" placeholder="Note" className="w-full p-2 mb-4 border rounded" onChange={handleChange} />

        <div className="flex justify-between">
          <button type="button" onClick={onClose} className="text-gray-500">Cancel</button>
          <button type="submit" className="bg-primary text-white px-4 py-2 rounded">Save</button>
        </div>
      </form>
    </div>
  );
}
