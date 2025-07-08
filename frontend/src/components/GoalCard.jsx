import { Pencil, Trash2 } from "lucide-react";

export default function GoalCard({ name, progress, targetAmount, onEdit, onDelete }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow relative">
      <div className="absolute top-3 right-3 flex gap-2">
        <button onClick={onEdit} className="text-blue-500 hover:text-blue-700">
          <Pencil size={16} />
        </button>
        <button onClick={onDelete} className="text-red-500 hover:text-red-700">
          <Trash2 size={16} />
        </button>
      </div>

      <div className="mb-2">
        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-100">{name}</h4>
        <p className="text-xs text-gray-500 dark:text-gray-400">{progress}% of {targetAmount} RWF</p>
      </div>
      <div className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
        <div className="h-full bg-green-500" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
