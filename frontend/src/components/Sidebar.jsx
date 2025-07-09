import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  CreditCard,
  Target,
  BarChart2,
  Settings,
  LogOut,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={18} /> },
  { name: "Transactions", path: "/transactions", icon: <CreditCard size={18} /> },
  { name: "Goals", path: "/goals", icon: <Target size={18} /> },
  { name: "Reports", path: "/reports", icon: <BarChart2 size={18} /> },
  { name: "Settings", path: "/settings", icon: <Settings size={18} /> },
];

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <aside className="fixed top-0 left-0 h-full w-56 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 shadow-sm flex flex-col justify-between z-50">
      {/* Logo/Header */}
      <div className="h-16 flex items-center justify-center border-b border-gray-100 dark:border-gray-800 text-xl font-bold text-blue-500">
        Betta
      </div>

      {/* Navigation */}
      <nav className="flex flex-col p-4 space-y-1 flex-1">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition ${
                isActive
                  ? "bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-300"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`
            }
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-100 dark:border-gray-800">
      <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full text-sm text-gray-500 hover:text-red-500 transition"
        >
          <LogOut size={18} />
          Logout
        </button>

        
      </div>
    </aside>
  );
}
