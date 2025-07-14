import { useEffect, useState, useRef } from "react";
import axios from "../api/axios";
import { toast } from "react-toastify";
import AddTransactionModal from "./AddTransactionModal";

export default function RecentTransactions({ onSuccess }) {
  const [transactions, setTransactions] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const categoryRef = useRef();
  const startRef = useRef();
  const endRef = useRef();

  // Get token from localStorage
  const getAuthConfig = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;
    return token
      ? {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      : {};
  };

  // Fetch all initially
  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await axios.get("/transactions", getAuthConfig());
      setTransactions(res.data);
    } catch (err) {
      console.error("Failed to fetch transactions:", err.message);
      toast.error("Could not load transactions.");
    }
  };

  const handleFilter = async () => {
    try {
      const params = {};
      if (categoryRef.current.value) params.category = categoryRef.current.value;
      if (startRef.current.value) params.start = startRef.current.value;
      if (endRef.current.value) params.end = endRef.current.value;

      const res = await axios.get("/transactions", {
        ...getAuthConfig(),
        params,
      });

      setTransactions(res.data);
    } catch (err) {
      toast.error("Failed to filter transactions");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this transaction?")) return;

    try {
      await axios.delete(`/transactions/${id}`, getAuthConfig());
      toast.success("Transaction deleted.");
      onSuccess && onSuccess();
      fetchTransactions();
    } catch (err) {
      console.error("Delete failed:", err.message);
      toast.error("Failed to delete transaction.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>

      {/* Filter UI */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <select ref={categoryRef} className="border px-3 py-2 rounded">
          <option value="">All Categories</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Shopping">Shopping</option>
          <option value="Rent">Rent</option>
          <option value="Salary">Code</option>
          <option value="Trade">Trade</option>
          <option value="Design">Design</option>
        </select>

        <label>From:</label>
        <input ref={startRef} type="date" className="border px-3 py-2 rounded" />
        <label>To:</label>
        <input ref={endRef} type="date" className="border px-3 py-2 rounded" />

        <button
          onClick={handleFilter}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Filter
        </button>
      </div>

      {transactions.length === 0 ? (
        <p className="text-gray-500">No transactions yet.</p>
      ) : (
        <ul className="space-y-4">
          {transactions.map((tx) => (
            <li key={tx._id} className="flex justify-between items-center border-b pb-2">
              <div>
                <p className="font-medium text-gray-800">{tx.title}</p>
                <p className="text-sm text-gray-500">
                  {tx.category} • {new Date(tx.date).toLocaleDateString()}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <span
                  className={`font-semibold ${
                    tx.type === "income" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  ${tx.amount}
                </span>

                <button
                  onClick={() => {
                    setEditingTransaction(tx);
                    setShowEditModal(true);
                  }}
                  className="text-blue-500 hover:text-blue-700 text-lg"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(tx._id)}
                  className="text-red-500 hover:text-red-700 text-lg"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Edit Modal */}
      <AddTransactionModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSuccess={() => {
          fetchTransactions();
          onSuccess && onSuccess(); 
          setShowEditModal(false);
        }}
        transaction={editingTransaction}
        mode="edit"
      />
    </div>
  );
}
