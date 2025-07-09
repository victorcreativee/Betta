import { useEffect, useState } from "react";
import axios from "../api/axios";
import RecentTransactions from "../components/RecentTransactions";
import AddTransactionModal from "../components/AddTransactionModal";
import Layout from "../components/Layout";


export default function TransactionsPage() {
  const [showModal, setShowModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSuccess = () => setRefreshKey((prev) => prev + 1);

  return (
    <Layout>
   
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Transactions</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          + Add Transaction
        </button>
      </div>

      <RecentTransactions onSuccess={handleSuccess} key={refreshKey} />

      <AddTransactionModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={handleSuccess}
      />
    </div>
    </Layout>
  );
}
