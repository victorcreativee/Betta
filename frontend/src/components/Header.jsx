export default function Header() {
    return (
      <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center sticky top-0 z-30">
        <h1 className="text-xl font-bold text-text">Betta Dashboard</h1>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search"
            className="border border-gray-200 rounded-lg px-4 py-2 w-64 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Victor</span>
            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">V</div>
          </div>
        </div>
      </header>
    );
  }
  