import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink } from "react-router-dom";

import mockupDashboard from "../assets/mockup.png";
import loginImage from "../assets/login.png";
import addImage from "../assets/add.png";
import saveImage from "../assets/save.png";

export default function Landing() {
  const [selectedStep, setSelectedStep] = useState("login");

  const steps = [
    { key: "login", title: "Login", description: "Sign in securely to access your Betta dashboard." },
    { key: "add", title: "Add Money", description: "Record your income and expenses quickly and easily." },
    { key: "save", title: "Save Money", description: "Set goals, track savings, and see your progress grow." },
  ];

  const getImage = () => {
    switch (selectedStep) {
      case "login":
        return loginImage;
      case "add":
        return addImage;
      case "save":
        return saveImage;
      default:
        return loginImage;
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col font-sans scroll-smooth">

      {/* Navbar */}
      <header className="flex justify-between items-center px-10 py-6 bg-white shadow-md z-50">
        <h1 className="text-2xl font-bold text-blue-600">Betta</h1>
        <nav className="space-x-8 text-sm font-medium flex items-center">
          <ScrollLink to="features" smooth duration={500} offset={-80} className="hover:text-blue-600 cursor-pointer">Features</ScrollLink>
          <ScrollLink to="about" smooth duration={500} offset={-80} className="hover:text-blue-600 cursor-pointer">About</ScrollLink>
          <RouterLink to="/contact" className="hover:text-blue-600">Contact</RouterLink>
          <RouterLink to="/login" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Login</RouterLink>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="text-center px-6 py-20 relative bg-gradient-to-b from-blue-50 to-white">
        <h2 className="text-5xl font-extrabold mb-6 max-w-3xl mx-auto leading-tight">
          Take Control of Your Budget with Betta
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto mb-8">
          Set goals. Track expenses. Visualize progress. Simple and powerful.
        </p>
        <RouterLink to="/register" className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition">
          Get Started
        </RouterLink>
      </main>

      {/* How It Works Section */}
      <section className="bg-white py-24 px-6" id="how-it-works">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Steps List */}
          <div>
            <h3 className="text-4xl font-bold text-gray-800 mb-6">How It Works</h3>
            <ul className="space-y-4">
              {steps.map((step) => (
                <li key={step.key}>
                  <button
                    onClick={() => setSelectedStep(step.key)}
                    className={`text-left w-full border-l-4 pl-4 py-3 rounded transition-all duration-300 ${
                      selectedStep === step.key
                        ? "border-blue-600 bg-blue-50 text-blue-800"
                        : "border-transparent hover:bg-gray-50"
                    }`}
                  >
                    <h4 className="text-lg font-semibold">{step.title}</h4>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Mockup Image */}
          <motion.div
            key={selectedStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-lg shadow-xl overflow-hidden"
          >
            <img src={getImage()} alt={selectedStep} className="w-full max-w-lg mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-gray-50 py-24 px-6">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-800">Smart Features That Empower You</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Betta gives you full control of your money with powerful budgeting tools and visual insights.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <FeatureItem title="Real-Time Tracking" text="Track income and expenses instantly to always stay on top." />
          <FeatureItem title="Goal Setting" text="Set savings goals and track your progress visually." />
          <FeatureItem title="Visual Insights" text="Understand your spending habits through easy-to-read graphs." />
          <FeatureItem title="Simple Interface" text="Minimal, clean design built for clarity and focus." />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-white py-24 px-6">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-800">Why Betta Works for You</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Whether you're budgeting for groceries or long term goals, Betta is designed to guide every financial decision.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <ValueItem title="Built for Simplicity" text="Fast input, fewer clicks. Everything is where you expect it." />
          <ValueItem title="Designed for Clarity" text="Clean layout, no distractions. Only what matters most." />
          <ValueItem title="Goals Made Visible" text="Track progress in charts and visuals not just numbers." />
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-blue-50 py-24 px-6">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">What People Say</h2>
          <p className="text-gray-600">Trusted by everyday users who wanted a better way to manage their money.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <TestimonialCard name="Kalisa C." text="Betta completely changed the way I budget. Simple and stress free." />
          <TestimonialCard name="Muhire L." text="I finally feel in control of my finances thanks to the goal setting tools." />
          <TestimonialCard name="Victor T." text="Beautiful interface and very intuitive. Love the visualizations!" />
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="bg-blue-600 text-white py-20 px-6 text-center">
        <h2 className="text-4xl font-bold mb-4">Take Control of Your Finances Today</h2>
        <p className="mb-6 text-lg max-w-xl mx-auto">
          Join hundreds already budgeting smarter with Betta. It’s fast, free, and easy to get started.
        </p>
        <RouterLink to="/dashboard" className="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-blue-100 transition">
          Launch Dashboard
        </RouterLink>
      </section>

      {/* Footer */}
      <footer className="bg-[#f0f4f8] py-10 px-6 text-center text-sm text-gray-500">
        <div className="max-w-6xl mx-auto">
          <p>© {new Date().getFullYear()} Betta — All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <RouterLink to="/" className="hover:underline">Home</RouterLink>
            <RouterLink to="/dashboard" className="hover:underline">Dashboard</RouterLink>
            <ScrollLink to="features" smooth duration={500} className="hover:underline cursor-pointer">Features</ScrollLink>
          </div>
        </div>
      </footer>
    </div>
  );
}

// FeatureItem
function FeatureItem({ title, text }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
      <h3 className="text-xl font-semibold text-blue-600 mb-2">{title}</h3>
      <p className="text-gray-700">{text}</p>
    </div>
  );
}

// ValueItem
function ValueItem({ title, text }) {
  return (
    <div className="bg-white p-6 rounded-xl border shadow-sm hover:shadow-lg transition">
      <h4 className="text-lg font-semibold text-blue-600 mb-2">{title}</h4>
      <p className="text-gray-700 text-sm">{text}</p>
    </div>
  );
}

// TestimonialCard
function TestimonialCard({ name, text }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow border">
      <p className="text-gray-700 italic mb-4">“{text}”</p>
      <h4 className="text-blue-700 font-semibold">{name}</h4>
    </div>
  );
}
