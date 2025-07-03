import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Budgets from "./pages/Budgets";
import Goals from "./pages/Goals";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <Router>
      <Routes>
      {/* Landing page at root */}
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/budgets" element={<Layout><Budgets /></Layout>} />
        <Route path="/goals" element={<Layout><Goals /></Layout>} />
        {/* More pages soon */}
      </Routes>
      <ToastContainer />  
    </Router>
  );
}
