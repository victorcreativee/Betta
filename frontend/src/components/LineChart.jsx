import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", total: 400 },
  { month: "Feb", total: 600 },
  { month: "Mar", total: 300 },
  { month: "Apr", total: 500 },
  { month: "May", total: 700 },
  { month: "Jun", total: 650 },
];

export default function ExpenseLineChart() {
  return (
    <div className="bg-white p-6 rounded-lg shadow w-full">
      <h3 className="text-md font-semibold text-gray-700 mb-4">Monthly Expenses</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="total" stroke="#4CA1FF" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
