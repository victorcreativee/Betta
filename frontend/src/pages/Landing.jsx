import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white text-gray-800 flex flex-col">
      {/* Navbar */}
      <header className="flex justify-between items-center px-10 py-6">
        <h1 className="text-2xl font-bold text-blue-500">Betta</h1>
        <nav className="space-x-6 text-sm font-medium">
          <a href="#features" className="text-gray-600 hover:text-blue-600">Features</a>
          <a href="#about" className="text-gray-600 hover:text-blue-600">About</a>
          <a href="#contact" className="text-gray-600 hover:text-blue-600">Contact</a>
          <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Login
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-4xl font-extrabold mb-4 max-w-2xl leading-snug">
          Take Control of Your Budget with Betta
        </h2>
        <p className="text-gray-600 max-w-xl mb-6">
          Set goals. Track expenses. Visualize your progress. It's simple and powerful.
        </p>
        <Link
          to="/signup"
          className="bg-blue-500 text-white px-6 py-3 rounded text-lg font-semibold hover:bg-blue-600"
        >
          Get Started
        </Link>
      </main>

      {/* Footer */}
      <footer className="text-center text-sm py-6 border-t border-gray-200 text-gray-500">
        © 2025 Betta. All rights reserved.
      </footer>
    </div>
  );
}
