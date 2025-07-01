import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-softBlue h-screen p-6 fixed top-0 left-0 hidden md:block">
      <nav className="flex flex-col gap-4">
        <Link to="/dashboard" className="text-primary font-medium">Dashboard</Link>
        <Link to="/budgets" className="text-primary font-medium">Budgets</Link>
        <Link to="/goals" className="text-primary font-medium">Goals</Link>
      </nav>
    </aside>
  );
}
