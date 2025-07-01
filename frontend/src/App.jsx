import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        {/* More pages soon */}
      </Routes>
    </Router>
  );
}
