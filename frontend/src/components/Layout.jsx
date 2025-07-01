import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-0 md:ml-64">
        <Header />
        <main className="p-6 bg-[#F9FBFD] min-h-screen">{children}</main>
      </div>
    </div>
  );
}
