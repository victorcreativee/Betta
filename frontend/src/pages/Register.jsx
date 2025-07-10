import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5050/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");

      localStorage.setItem("user", JSON.stringify(data));
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center p-6">
        <Link to="/" ><h1 className="text-2xl font-bold text-blue-500">Betta</h1></Link>
        <p className="text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="ml-2 bg-blue-600 text-white px-4 py-1.5 rounded shadow hover:bg-blue-700 transition"
          >
            Login
          </Link>
        </p>
      </header>

      {/* Form Container */}
      <main className="flex-1 flex justify-center items-center relative z-10">
        <div className="bg-white shadow-2xl rounded-xl px-8 py-10 w-full max-w-md text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Seconds to sign up!
          </h2>

          {/* Google Placeholder */}
          <button className="w-full flex items-center justify-center gap-2 border border-gray-300 px-4 py-2 rounded hover:bg-gray-100 transition">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
            Continue with Google
          </button>

          <div className="my-6 flex items-center gap-2 text-sm text-gray-400">
            <hr className="flex-grow border-gray-300" />
            OR
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          {/* Form */}
          <form onSubmit={handleRegister} className="space-y-4 text-left">
            <div>
              <label className="text-sm font-medium text-gray-600">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">Password</label>
              <div className="relative mt-1">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 8 characters"
                  className="w-full p-3 border rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  required
                />
                <button
                  type="button"
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Sign Up with Betta
            </button>
          </form>

          <p className="text-xs text-gray-400 mt-4">
            By clicking Sign Up, you agree to our{" "}
            <span className="underline">Terms of Service</span> and{" "}
            <span className="underline">Privacy Policy</span>.
          </p>
        </div>
      </main>

      {/* Slanted Background */}
      <div className="absolute bottom-0 left-0 w-full h-[250px] bg-gradient-to-r from-blue-400 to-purple-400 rounded-tl-[120px] rounded-tr-[60px]"></div>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 mt-auto py-6 z-10 relative">
        © {new Date().getFullYear()} Betta — All rights reserved.
      </footer>
    </div>
  );
}
