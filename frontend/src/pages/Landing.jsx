import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import mockupImage from "../assets/mockup.png";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen scroll-smooth bg-gradient-to-b from-blue-50 to-white text-gray-800 flex flex-col">

      {/* Navbar */}
      <motion.header
        className="flex justify-between items-center px-10 py-6 z-50 bg-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-2xl font-bold text-blue-500">Betta</h1>
        <nav className="space-x-6 text-sm font-medium flex items-center">
          <ScrollLink to="features" smooth={true} duration={500} offset={-80} className="hover:text-blue-600 cursor-pointer" href="#">
            Features
          </ScrollLink>
          <ScrollLink to="about" smooth={true} duration={500} offset={-80} className="hover:text-blue-600 cursor-pointer" href="#">
            About
          </ScrollLink>
          <ScrollLink to="contact" smooth={true} duration={500} offset={-80} className="hover:text-blue-600 cursor-pointer" href="#">
            Contact
          </ScrollLink>
          <RouterLink to="/login" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Login
          </RouterLink>
        </nav>
      </motion.header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 relative">
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

        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ delay: 0.9, duration: 0.6 }}>
          <RouterLink to="/register" className="bg-primary text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600">
            Get Started
          </RouterLink>
        </motion.div>
      </main>

      {/* SVG Divider */}
      <div className="w-full overflow-hidden leading-none rotate-180 -mb-1">
        <svg viewBox="0 0 500 150" preserveAspectRatio="none" className="w-full h-20">
          <path d="M0.00,49.98 C150.00,150.00 349.84,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z" style={{ stroke: "none", fill: "#F9FBFD" }} />
        </svg>
      </div>

      {/* Mockup Showcase Section */}
      <section className="mt-0 px-6 py-20 bg-gradient-to-b from-white via-blue-50 to-blue-100">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <ScrollAnimatedText />
          <ScrollAnimatedMockup />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-24 px-6">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Smart Features That Empower You</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Betta gives you full control of your money with powerful budgeting tools and visual insights.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <FeatureItem title="Real-Time Tracking" text="Track income and expenses as they happen — always know where your money is." />
          <FeatureItem title="Goal Setting" text="Set savings goals and monitor progress visually, so you stay motivated and accountable." />
          <FeatureItem title="Visual Insights" text="Pie charts, line graphs, and radial progress bars to help you understand your habits." />
          <FeatureItem title="Simple Interface" text="Designed to feel effortless — smooth UI with a calming light-blue theme." />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-gradient-to-b from-blue-100 via-white to-white py-24 px-6">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Betta Works for You</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Whether you're budgeting for groceries or planning long-term goals, Betta is designed to guide every financial decision.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <ValueItem title="Built for Simplicity" text="Minimal clicks. Fast input. Everything where you expect it." />
          <ValueItem title="Designed for Clarity" text="No clutter — just numbers and insights that make sense." />
          <ValueItem title="Goals Made Visible" text="Your progress is always visual — not just numbers, but purpose." />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">What People Say</h2>
          <p className="text-gray-600">Trusted by everyday users who wanted a better way to manage their money.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <TestimonialCard name="Sarah M." text="Betta completely changed the way I budget. Simple and stress-free." />
          <TestimonialCard name="James L." text="I finally feel in control of my finances thanks to the goal setting tools." />
          <TestimonialCard name="Lina K." text="Beautiful interface and very intuitive. Love the visualizations!" />
        </div>
      </section>

      {/* CTA Section */}
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
            <ScrollLink to="features" smooth={true} duration={500} className="hover:underline cursor-pointer" href="#">Features</ScrollLink>
          </div>
        </div>
      </footer>
    </div>
  );

  // Animated helper components

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
        <h3 className="text-3xl font-bold text-gray-800 mb-4">All your money in one place</h3>
        <p className="text-gray-600 mb-6">Easily monitor spending and visualize your goals using Betta’s dashboard.</p>
        <RouterLink to="/dashboard" className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition">
          Explore Dashboard
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
        <img src={mockupImage} alt="App Mockup" className="rounded-xl shadow-2xl w-full max-w-md mx-auto" />
      </motion.div>
    );
  }

  function FeatureItem({ title, text }) {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="bg-[#F9FBFD] p-6 rounded-xl shadow-md hover:shadow-xl transition"
      >
        <h3 className="text-xl font-semibold text-blue-600 mb-2">{title}</h3>
        <p className="text-gray-700">{text}</p>
      </motion.div>
    );
  }

  function ValueItem({ title, text }) {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-lg transition"
      >
        <h4 className="text-lg font-semibold text-blue-600 mb-2">{title}</h4>
        <p className="text-gray-700 text-sm">{text}</p>
      </motion.div>
    );
  }

  function TestimonialCard({ name, text }) {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5 }}
        className="bg-blue-50 p-6 rounded-xl shadow-sm border border-blue-100"
      >
        <p className="text-gray-700 italic mb-4">“{text}”</p>
        <h4 className="text-blue-700 font-semibold">{name}</h4>
      </motion.div>
    );
  }
}
