import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import axios from "../api/axios";

export default function ExpenseLineChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const res = await axios.get("/transactions");
        const txs = res.data;

        const monthlyData = {};

        txs.forEach((tx) => {
          const date = new Date(tx.date);
          const month = date.toLocaleString("default", { month: "short" });

          if (!monthlyData[month]) {
            monthlyData[month] = { month, income: 0, expense: 0 };
          }

          if (tx.type === "income") {
            monthlyData[month].income += tx.amount;
          } else if (tx.type === "expense") {
            monthlyData[month].expense += tx.amount;
          }
        });

        const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const chartData = monthOrder.map((month) => monthlyData[month] || { month, income: 0, expense: 0 });

        setData(chartData);
      } catch (err) {
        console.error("Failed to load chart data:", err.message);
      }
    };

    fetchChartData();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow w-full">
      <h3 className="text-md font-semibold text-gray-700 mb-4">Monthly Income vs Expense</h3>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="income" stroke="#10B981" strokeWidth={3} />
          <Line type="monotone" dataKey="expense" stroke="#EF4444" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
