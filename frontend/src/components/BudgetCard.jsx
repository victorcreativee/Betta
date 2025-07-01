export default function BudgetCard({ title, used, limit }) {
    const percent = (used / limit) * 100;
  
    return (
      <div className="bg-white rounded-lg p-4 shadow w-full md:w-1/3">
        <h4 className="font-semibold mb-2">{title}</h4>
        <div className="w-full bg-gray-200 h-3 rounded">
          <div className="bg-primary h-3 rounded" style={{ width: `${percent}%` }} />
        </div>
        <p className="text-sm text-gray-500 mt-1">{used} / {limit}</p>
      </div>
    );
  }
  