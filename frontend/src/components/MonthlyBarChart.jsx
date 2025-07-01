import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", total: 400 },
  { month: "Feb", total: 300 },
  { month: "Mar", total: 500 },
  { month: "Apr", total: 200 },
  { month: "May", total: 450 },
];

export default function MonthlyBarChart() {
  return (
    <div className="bg-white rounded-lg shadow p-6 w-full md:w-1/2">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Monthly Spending</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#4CA1FF" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
