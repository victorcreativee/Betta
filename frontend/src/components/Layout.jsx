// src/components/Layout.jsx
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen bg-[#F4F9FF] dark:bg-gray-900">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-6">
          {children}
        </main>
      </div>
    </div>
  );
}
