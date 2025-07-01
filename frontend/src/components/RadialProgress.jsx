import { PieChart, Pie, Cell } from "recharts";

const data = [
  { name: "Completed", value: 65 },
  { name: "Remaining", value: 35 }
];

const COLORS = ["#4CA1FF", "#E5E7EB"];

export default function RadialProgress() {
  return (
    <div className="bg-white p-6 rounded-lg shadow w-full">
      <h3 className="text-md font-semibold text-gray-700 mb-4">Goal Progress</h3>
      <PieChart width={200} height={200}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          startAngle={90}
          endAngle={-270}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
}
