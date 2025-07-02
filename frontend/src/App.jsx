import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Budgets from "./pages/Budgets";
import Goals from "./pages/Goals";

export default function App() {
  return (
    <Router>
    <div className="min-h-screen bg-[#F9FBFD] dark:bg-gray-900 text-gray-800 dark:text-gray-100"></div>
      <Routes>
      {/* Landing page at root */}
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/budgets" element={<Layout><Budgets /></Layout>} />
        <Route path="/goals" element={<Layout><Goals /></Layout>} />
        {/* More pages soon */}
      </Routes>
      </div>
    </Router>
    /d
  );
}
