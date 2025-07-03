import { useEffect, useState } from "react";
import axios from "../api/axios"; 

export default function RecentTransactions() {
  const fallbackTxs = [
    { name: "Groceries", amount: "-$120", type: "expense" },
    { name: "Salary", amount: "+$2000", type: "income" },
    { name: "Transport", amount: "-$45", type: "expense" },
  ];

  const [txs, setTxs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Fetching transactions...");
    axios
      .get("/transactions")
      .then((res) => {
        console.log("API response:", res.data);
        if (Array.isArray(res.data)) {
          const formatted = res.data.map((tx) => ({
            name: tx.title,
            amount: `${tx.type === "income" ? "+" : "-"}$${tx.amount}`,
            type: tx.type,
          }));
          setTxs(formatted);
        } else {
          setTxs(fallbackTxs);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("API error:", err.message);
        setTxs(fallbackTxs);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-soft border border-gray-100">
      <h3 className="text-md font-semibold text-gray-700 mb-4">Recent Transactions</h3>

      {loading ? (
        <p className="text-sm text-gray-400">Loading...</p>
      ) : (
        <div className="space-y-2">
          {txs.map((tx, idx) => (
            <div
              key={idx}
              className="flex justify-between text-sm py-1 border-b last:border-none"
            >
              <span>{tx.name}</span>
              <span className={tx.type === "income" ? "text-green-500" : "text-red-500"}>
                {tx.amount}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
