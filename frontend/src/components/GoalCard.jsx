export default function GoalCard({ name, progress, targetAmount }) {
    return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
        <div className="mb-2">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-100">{name}</h4>
          <p className="text-xs text-gray-500 dark:text-gray-400">{progress}% of {targetAmount} RWF</p>
        </div>
        <div className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    );
  }
  