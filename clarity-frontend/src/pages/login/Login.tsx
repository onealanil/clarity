import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = (): React.ReactElement => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-10 rounded-3xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-8 text-center text-clarity-charcoal">
          Welcome Back
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-clarity-green/50 transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-clarity-green/50 transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-clarity-green hover:bg-clarity-lightGreen text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transition"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center mt-6 text-clarity-charcoal">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-clarity-green font-semibold hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
