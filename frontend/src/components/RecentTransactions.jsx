import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function RecentTransactions() {
  const [txs, setTxs] = useState([]);

  useEffect(() => {
    axios
      .get("/transactions")
      .then((res) => setTxs(res.data))
      .catch((err) => console.error("Failed to fetch transactions", err));
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-soft border border-gray-100">
      <h3 className="text-md font-semibold text-gray-700 mb-4">Recent Transactions</h3>
      <div className="space-y-2">
        {txs.length === 0 && <p className="text-sm text-gray-400">No transactions yet.</p>}
        {txs.map((tx) => (
          <div key={tx._id} className="flex justify-between items-start text-sm py-2 border-b last:border-none">
            <div>
              <div className="font-medium">{tx.title}</div>
              <div className="text-gray-400 text-xs">
                {tx.category || "General"} • {new Date(tx.date).toLocaleDateString()}
              </div>
            </div>
            <span className={tx.type === "income" ? "text-green-500" : "text-red-500"}>
              {tx.type === "income" ? `+$${tx.amount}` : `-$${Math.abs(tx.amount)}`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
