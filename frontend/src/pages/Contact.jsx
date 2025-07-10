import { Link as RouterLink } from "react-router-dom";

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      
      {/* Header */}
      <header className="flex justify-between items-center px-10 py-6 bg-white shadow-md">
        <RouterLink to="/" className="text-2xl font-bold text-blue-500">Betta</RouterLink>
        <nav className="space-x-6 text-sm font-medium flex items-center">
          <RouterLink to="/" className="hover:text-blue-600">Home</RouterLink>
          <RouterLink to="/#features" className="hover:text-blue-600">Features</RouterLink>
          <RouterLink to="/contact" className="text-blue-600 font-semibold">Contact</RouterLink>
          <RouterLink to="/login" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Login</RouterLink>
        </nav>
      </header>

      {/* Main Contact Form Section */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-16">
        <div className="max-w-2xl w-full text-center mb-10">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">Contact Us</h1>
          <p className="text-gray-600">
            Have questions, feedback, or need support? We'd love to hear from you.
            Fill out the form below and our team will get back to you shortly.
          </p>
        </div>

        <form className="w-full max-w-2xl bg-gray-50 p-8 rounded-xl shadow-md space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold mb-1">Name</label>
            <input id="name" type="text" placeholder="Your name"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-semibold mb-1">Email</label>
            <input id="email" type="email" placeholder="you@example.com"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-semibold mb-1">Message</label>
            <textarea id="message" rows="5" placeholder="Your message..."
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
          </div>
          <button type="submit"
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
            Send Message
          </button>
        </form>
      </main>

      {/* Footer */}
      <footer className="bg-[#f0f4f8] py-10 px-6 text-center text-sm text-gray-500">
        <div className="max-w-6xl mx-auto">
          <p>© {new Date().getFullYear()} Betta — All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <RouterLink to="/" className="hover:underline">Home</RouterLink>
            <RouterLink to="/dashboard" className="hover:underline">Dashboard</RouterLink>
            <RouterLink to="/contact" className="hover:underline">Contact</RouterLink>
          </div>
        </div>
      </footer>
    </div>
  );
}
