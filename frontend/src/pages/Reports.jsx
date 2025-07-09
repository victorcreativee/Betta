import ExpenseLineChart from "../components/LineChart";
import SpendingBreakdownChart from "../components/SpendingBreakdownChart";
import { useEffect, useState } from "react";
import axios from "../api/axios";
import Layout from "../components/Layout";

export default function ReportsPage() {
  const [topCategories, setTopCategories] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await axios.get("/dashboard/stats", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setTopCategories(res.data.topCategories);
    };

    fetchStats();
  }, []);

  return (
    <Layout>
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white">Reports</h2>

      <div className="grid md:grid-cols-2 gap-6">
        <ExpenseLineChart />
        <SpendingBreakdownChart data={topCategories} />
      </div>
    </div>
    </Layout>
  );
}
