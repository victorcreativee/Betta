import { useState } from "react";
import Header from "../components/Header";
import SummaryCard from "../components/SummaryCard";
import ExpenseLineChart from "../components/LineChart";
import RadialProgress from "../components/RadialProgress";
import RecentTransactions from "../components/RecentTransactions";
import AddTransactionModal from "../components/AddTransactionModal";

export default function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const handleSuccess = () => setRefreshKey((prev) => prev + 1);

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SummaryCard title="Total Balance" amount="$1,420" color="text-blue-500" />
          <SummaryCard title="Income" amount="$2,000" color="text-green-500" />
          <SummaryCard title="Expenses" amount="$580" color="text-red-500" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ExpenseLineChart />
          <RadialProgress />
        </div>

        <RecentTransactions key={refreshKey} />
        <AddTransactionModal isOpen={showModal}
        onClose={() => setShowModal(false)} 
        onSuccess={handleSuccess}/>
      </div>
    </div>
  );
}
