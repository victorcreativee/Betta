import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Landing from "./pages/Landing";
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from './components/ProtectedRoute';
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
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/budgets" element={<Layout><Budgets /></Layout>} />
        <Route path="/goals" element={<Layout><Goals /></Layout>} />
        {/* More pages soon */}
      </Routes>
      <ToastContainer />  
    </Router>
  );
}
