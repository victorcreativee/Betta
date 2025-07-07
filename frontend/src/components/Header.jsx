import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Sun, Moon, LogOut } from "lucide-react"; 
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm px-6 py-4 flex justify-between items-center sticky top-0 z-30">
      <h1 className="text-xl font-bold text-text dark:text-white">Betta Dashboard</h1>

      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search"
          className="border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 w-64 text-sm focus:outline-none focus:ring-1 focus:ring-primary bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
        />

        {/* Theme toggle + user info + logout */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            title="Toggle theme"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <span className="text-sm text-gray-600 dark:text-gray-300">Victor</span>

          <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
            V
          </div>

          {/* 🔓 Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            title="Logout"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}
