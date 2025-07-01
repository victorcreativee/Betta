import { useState } from "react";
import AddTransactionModal from "../components/AddTransactionModal";
import BudgetCard from "../components/BudgetCard";

export default function Dashboard() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-4">Dashboard Overview</h2>
      <button onClick={() => setShowModal(true)} className="bg-primary text-white px-4 py-2 rounded">
        + Add Transaction
      </button>

      <AddTransactionModal isOpen={showModal} onClose={() => setShowModal(false)} />

      <div className="mt-6 flex flex-wrap gap-4">
      <BudgetCard title="Food" used={120} limit={300} />
      <BudgetCard title="Transport" used={80} limit={150} />
      <BudgetCard title="Entertainment" used={200} limit={250} />
      </div>
      
    </div>
  );
}
