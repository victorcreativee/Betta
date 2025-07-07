export default function DashboardCard({ title, icon, children }) {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-5">
        <div className="flex items-center mb-4">
          {icon && (
            <div className="w-10 h-10 flex items-center justify-center bg-blue-100 text-blue-500 dark:bg-gray-700 dark:text-blue-400 rounded-full mr-3">
              {icon}
            </div>
          )}
          <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100">{title}</h3>
        </div>
        <div className="text-sm text-gray-700 dark:text-gray-300">{children}</div>
      </div>
    );
  }
  