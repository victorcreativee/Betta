export default function RecentTransactions() {
    const txs = [
      { name: "Groceries", amount: "-$120", type: "expense" },
      { name: "Salary", amount: "+$2000", type: "income" },
      { name: "Transport", amount: "-$45", type: "expense" },
    ];
  
    return (
      <div className="bg-white p-6 rounded-xl shadow-soft border border-gray-100">
        <h3 className="text-md font-semibold text-gray-700 mb-4">Recent Transactions</h3>
        <div className="space-y-2">
          {txs.map((tx, idx) => (
            <div key={idx} className="flex justify-between text-sm py-1 border-b last:border-none">
              <span>{tx.name}</span>
              <span className={tx.type === "income" ? "text-green-500" : "text-red-500"}>
                {tx.amount}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  