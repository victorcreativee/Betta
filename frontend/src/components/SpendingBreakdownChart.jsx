import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

export default function SpendingBreakdownChart({ data }) {
  const categories = data.map(item => item.category);
  const totals = data.map(item => item.total);

  const chartData = {
    labels: categories,
    datasets: [
      {
        label: "Spending by Category",
        data: totals,
        backgroundColor: [
          "#3B82F6", "#EF4444", "#10B981", "#F59E0B", "#8B5CF6",
          "#EC4899", "#14B8A6", "#F43F5E", "#F87171"
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    cutout: "60%", 
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#6B7280", 
          boxWidth: 12,
          padding: 20,
        },
      },
    },
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow h-[300px]">
      <h3 className="text-base font-semibold text-gray-800 dark:text-white mb-4">Spending Breakdown</h3>
      <div className="relative h-[200px] w-[200px] mx-auto">
        <Doughnut data={chartData} options={options} />
      </div>
    </div>
  );
}
