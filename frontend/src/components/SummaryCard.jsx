export default function SummaryCard({ title, amount, color }) {
  return (
    <div className="bg-card p-5 rounded-xl shadow-soft border border-gray-100 transition hover:shadow-md">
      <p className="text-sm text-gray-500">{title}</p>
      <p className={`text-2xl font-semibold mt-2 ${color}`}>{amount}</p>
    </div>
  );
}
