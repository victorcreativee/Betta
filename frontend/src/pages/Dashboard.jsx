import { useState, useEffect } from "react";
import Header from "../components/Header";
import SummaryCard from "../components/SummaryCard";
import ExpenseLineChart from "../components/LineChart";
import RadialProgress from "../components/RadialProgress";
import RecentTransactions from "../components/RecentTransactions";
import AddTransactionModal from "../components/AddTransactionModal";
import axios from "../api/axios";

export default function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [summary, setSummary] = useState({ income: 0, expenses: 0, balance: 0 }); // 🆕 summary state

  const handleSuccess = () => setRefreshKey((prev) => prev + 1);

 
  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await axios.get("/transactions/summary");
        setSummary(res.data);
      } catch (err) {
        console.error("Failed to fetch summary:", err.message);
      }
    };

    fetchSummary();
  }, [refreshKey]);

  return (
    <div className="bg-[#F9FBFD] min-h-screen pl-20">
      <Header />

      <div className="p-6 max-w-7xl mx-auto space-y-8">
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          + Add Transaction
        </button>

        {/* 🆕 Realtime Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SummaryCard
            title="Total Balance"
            amount={`$${summary.balance.toFixed(2)}`}
            color="text-blue-500"
          />
          <SummaryCard
            title="Income"
            amount={`$${summary.income.toFixed(2)}`}
            color="text-green-500"
          />
          <SummaryCard
            title="Expenses"
            amount={`$${summary.expenses.toFixed(2)}`}
            color="text-red-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ExpenseLineChart />
          <RadialProgress />
        </div>

        <RecentTransactions onSuccess={handleSuccess} key={refreshKey} />

        <AddTransactionModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSuccess={handleSuccess}
        />
      </div>
    </div>
  );
}
