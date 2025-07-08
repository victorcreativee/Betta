import { Pencil, Trash2 } from "lucide-react";

export default function GoalCard({
  name,
  targetAmount = 0,
  savedAmount = 0,
  onEdit,
  onDelete,
}) {
  const progress = targetAmount > 0 ? (savedAmount / targetAmount) * 100 : 0;

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow relative transition-all duration-300">
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
        <p className="text-sm text-gray-500 dark:text-gray-400">
          ${savedAmount.toFixed(2)} / ${targetAmount.toFixed(2)}
        </p>
      </div>

      <div className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
        <div
          className="h-full bg-green-500 transition-all duration-700 ease-in-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
