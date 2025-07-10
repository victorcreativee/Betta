import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthHeader from '../components/AuthHeader';
import AuthFooter from '../components/AuthFooter';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback('');

    try {
      const res = await fetch('http://localhost:5050/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        setFeedback(
          res.status === 409
            ? 'Account already exists. Please log in instead.'
            : data.message || 'Registration failed.'
        );
        return;
      }

      localStorage.setItem('user', JSON.stringify(data));
      navigate('/dashboard');
    } catch (err) {
      setLoading(false);
      setFeedback('Something went wrong. Please try again.');
    }
  };

  return (
    <>
      <AuthHeader />
      <main className="max-w-md mx-auto mt-20 p-8 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6 text-center text-green-600">Create Your Betta Account</h2>

        {feedback && <p className="text-red-500 text-sm text-center mb-4">{feedback}</p>}

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>

        <div className="text-sm text-center mt-4">
          Already have an account?{' '}
          <a href="/login" className="text-green-500 hover:underline">
            Log in
          </a>
        </div>
      </main>
      <AuthFooter />
    </>
  );
}

export default Register;
