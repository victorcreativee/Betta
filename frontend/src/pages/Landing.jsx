import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import FeatureCard from "../components/FeatureCard";
import mockupImage from "../assets/mockup.png";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white text-gray-800 flex flex-col">
      {/* Navbar */}
      <motion.header
        className="flex justify-between items-center px-10 py-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-2xl font-bold text-blue-500">Betta</h1>
        <nav className="space-x-6 text-sm font-medium">
          <a href="#features" className="hover:text-blue-600">Features</a>
          <a href="#about" className="hover:text-blue-600">About</a>
          <a href="#contact" className="hover:text-blue-600">Contact</a>
          <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Login</Link>
        </nav>
      </motion.header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 relative">
        {/* Abstract Shapes */}
        <div className="absolute top-10 left-10 w-56 h-56 bg-blue-200 rounded-full opacity-30 blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-primary rounded-full opacity-20 blur-2xl" />

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-5xl font-extrabold mb-4 max-w-2xl"
        >
          Take Control of Your Budget with Betta
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-gray-600 max-w-xl mb-6"
        >
          Set goals. Track expenses. Visualize progress. Simple and powerful.
        </motion.p>

        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <Link
            to="/signup"
            className="bg-primary text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600"
          >
            Get Started
          </Link>
        </motion.div>
      </main>
    {/* Mockup Showcase Section */}
        <section className="mt-16 px-6 py-20 bg-blue-50 relative overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2 text-center md:text-left">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
                All your money in one place
            </h3>
            <p className="text-gray-600 mb-6">
                Easily monitor spending and visualize your goals using Betta’s dashboard.
                Clean charts, instant insights, and one-click tracking.
            </p>
            <Link to="/dashboard" className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition">
                Explore Dashboard
            </Link>
            </div>

            <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="md:w-1/2"
            >
            <img
              src={mockupImage}
              alt="App Mockup"
              className="rounded-xl shadow-2xl w-full max-w-md mx-auto"
            />

            </motion.div>
        </div>
        </section>

      {/* Features Section */}
      <section id="features" className="px-6 py-16 bg-white">
        <h3 className="text-center text-2xl font-semibold text-gray-800 mb-10">Why Betta?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <FeatureCard icon="📈" title="Track Spending" description="See where your money goes in real time." />
          <FeatureCard icon="🎯" title="Set Goals" description="Save for the things that matter most." />
          <FeatureCard icon="📊" title="Visualize Trends" description="Get insights into your spending habits." />
        </div>
      </section>
      
      <footer className="text-center text-sm py-6 border-t border-gray-200 text-gray-500">
        © 2025 Betta. All rights reserved.
      </footer>
    </div>
  );
}
