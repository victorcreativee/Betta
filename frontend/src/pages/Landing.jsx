import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink } from "react-router-dom";
import {
  ChartBarIcon,
  CurrencyDollarIcon,
  CheckCircleIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import mockupImage from "../assets/mockup.png";

export default function Landing() {
  return (
    <div className="min-h-screen scroll-smooth bg-gradient-to-b from-blue-50 via-white to-blue-100 text-gray-800 flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-6 bg-white shadow-sm sticky top-0 z-50">
        <h1 className="text-2xl font-extrabold text-blue-500">Betta</h1>
        <nav className="space-x-6 text-sm font-medium flex items-center">
          <ScrollLink to="features" smooth duration={500} offset={-70} className="hover:text-blue-600 cursor-pointer">Features</ScrollLink>
          <ScrollLink to="about" smooth duration={500} offset={-70} className="hover:text-blue-600 cursor-pointer">About</ScrollLink>
          <ScrollLink to="contact" smooth duration={500} offset={-70} className="hover:text-blue-600 cursor-pointer">Contact</ScrollLink>
          <RouterLink to="/login" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">Login</RouterLink>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center text-center px-6 py-20 relative">
        <div className="absolute top-20 left-10 w-60 h-60 bg-blue-300 rounded-full opacity-20 blur-3xl" />
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-5xl font-extrabold mb-6 max-w-3xl"
        >
          Take Control of Your Finances with Betta
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-gray-600 text-lg max-w-xl mb-6"
        >
          Set goals. Track expenses. Visualize your budget—all in one beautiful dashboard.
        </motion.p>
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.9, duration: 0.4 }}
        >
          <RouterLink to="/register" className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition">
            Get Started Free
          </RouterLink>
        </motion.div>
      </main>

      {/* Dashboard Showcase */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <ScrollAnimatedText />
          <ScrollAnimatedMockup />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 bg-[#F9FBFD]">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-800">Everything You Need to Budget Smarter</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Betta helps you manage income, track expenses, and save towards your goals—all in real time.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <FeatureCard
            Icon={CurrencyDollarIcon}
            title="Budget Management"
            description="Create budgets and monitor spending habits with clean, visual summaries."
          />
          <FeatureCard
            Icon={ChartBarIcon}
            title="Expense Tracking"
            description="Stay on top of your income and spending using real-time analytics and insights."
          />
          <FeatureCard
            Icon={CheckCircleIcon}
            title="Goal Setting"
            description="Create savings goals and monitor your progress visually with smart goal tracking."
          />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-gradient-to-b from-blue-100 to-white py-24 px-6">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Betta Works for You</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Whether you're saving for short-term goals or managing daily expenses, Betta makes budgeting easy.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <ValueItem title="Designed for Clarity" text="A simple, beautiful interface with zero clutter and full control." />
          <ValueItem title="Made for Speed" text="Track and plan without delays. Everything updates in real time." />
          <ValueItem title="Built for Everyone" text="Whether you're a student or professional—Betta works for every lifestyle." />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">What Users Say</h2>
          <p className="text-gray-600">Thousands of happy users have transformed their budgeting habits with Betta.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <TestimonialCard name="Kalisa C." text="Betta completely changed the way I budget. Simple and stress-free." />
          <TestimonialCard name="Muhire L." text="I finally feel in control of my finances thanks to the goal setting tools." />
          <TestimonialCard name="Victor T." text="Beautiful interface and very intuitive. Love the visualizations!" />
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="bg-blue-600 text-white py-20 px-6 text-center">
        <h2 className="text-4xl font-bold mb-4">Take Control of Your Finances Today</h2>
        <p className="mb-6 text-lg max-w-xl mx-auto">
          Join hundreds already budgeting smarter with Betta. It’s fast, free, and easy to get started.
        </p>
        <RouterLink to="/register" className="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-blue-100 transition">
          Start for Free
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

// --- Helper components ---

function ScrollAnimatedText() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="md:w-1/2 text-center md:text-left"
    >
      <h3 className="text-3xl font-bold text-gray-800 mb-4">All Your Money in One Place</h3>
      <p className="text-gray-600 mb-6">Easily monitor your spending and visualize your goals using Betta’s live dashboard.</p>
      <RouterLink to="/dashboard" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition">
        Try Dashboard
      </RouterLink>
    </motion.div>
  );
}

function ScrollAnimatedMockup() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="md:w-1/2"
    >
      <img src={mockupImage} alt="Betta Dashboard Mockup" className="rounded-xl shadow-2xl w-full max-w-md mx-auto" />
    </motion.div>
  );
}

function FeatureCard({ Icon, title, description }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition text-left">
      <Icon className="h-8 w-8 text-blue-600 mb-4" />
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}

function ValueItem({ title, text }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-lg transition text-left">
      <h4 className="text-lg font-semibold text-blue-600 mb-2">{title}</h4>
      <p className="text-gray-700 text-sm">{text}</p>
    </div>
  );
}

function TestimonialCard({ name, text }) {
  return (
    <div className="bg-blue-50 p-6 rounded-xl shadow-sm border border-blue-100 text-left">
      <p className="text-gray-700 italic mb-4">“{text}”</p>
      <h4 className="text-blue-700 font-semibold">{name}</h4>
    </div>
  );
}
