import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch('axios.post("/users/login")', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      localStorage.setItem("user", JSON.stringify(data));
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);

      const res = await fetch('axios.post("/users/google-login")', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: decoded.name,
          email: decoded.email,
          avatar: decoded.picture,
          googleId: decoded.sub,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Google login failed");

      localStorage.setItem("user", JSON.stringify(data));
      navigate("/dashboard");
    } catch (err) {
      console.error("Google Auth Error:", err.message);
      setError("Google sign-in failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center p-6">
        <Link to="/">
          <h1 className="text-2xl font-bold text-blue-500">Betta</h1>
        </Link>
        <p className="text-sm">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="ml-2 bg-blue-600 text-white px-4 py-1.5 rounded shadow hover:bg-blue-700 transition"
          >
            Register
          </Link>
        </p>
      </header>

      {/* Form Container */}
      <main className="flex-1 flex justify-center items-center relative z-10">
        <div className="bg-white shadow-2xl rounded-xl px-8 py-10 w-full max-w-md text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Welcome back!
          </h2>

          {/* Google Login */}
          <div className="w-full flex justify-center mb-6">
            <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => setError("Google login failed")} />
          </div>

          <div className="my-6 flex items-center gap-2 text-sm text-gray-400">
            <hr className="flex-grow border-gray-300" />
            OR
            <hr className="flex-grow border-gray-300" />
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          {/* Email Login Form */}
          <form onSubmit={handleLogin} className="space-y-4 text-left">
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
                  placeholder="Enter your password"
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
              Log In to Betta
            </button>
          </form>

          <p className="text-xs text-gray-400 mt-4">
            Need an account?{" "}
            <Link to="/register" className="underline text-blue-600">
              Create one here
            </Link>
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
