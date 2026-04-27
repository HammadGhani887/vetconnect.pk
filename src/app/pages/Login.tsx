import { useState } from "react";
import { useNavigate } from "react-router";
import { PawPrint, Eye, EyeOff, Lock, Mail, AlertCircle } from "lucide-react";
import { useApp } from "../context/AppContext";

export function Login() {
  const [email, setEmail] = useState("admin@pawcare.clinic");
  const [password, setPassword] = useState("password123");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useApp();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const success = login(email, password);
      if (success) {
        navigate("/dashboard");
      } else {
        setError("Invalid credentials. Please try again.");
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1B4F72] via-[#1B4F72] to-[#2E86C1] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/15 backdrop-blur rounded-2xl mb-4 shadow-xl">
            <PawPrint size={40} className="text-white" />
          </div>
          <h1 className="text-white text-2xl font-bold tracking-tight">PawCare</h1>
          <p className="text-[#AED6F1] mt-1">Veterinary Management System</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-6">
          <h2 className="text-[#1B4F72] mb-6 text-center">Welcome Back</h2>

          {error && (
            <div className="flex items-center gap-2 bg-red-50 text-red-600 rounded-xl px-4 py-3 mb-4">
              <AlertCircle size={18} />
              <p className="text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[#333333] text-sm mb-1.5">Email Address</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3.5 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-[#2E86C1] focus:bg-white transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#333333] text-sm mb-1.5">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-12 py-3.5 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-[#2E86C1] focus:bg-white transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setRememberMe(!rememberMe)}
                className={`w-5 h-5 rounded flex items-center justify-center border-2 transition-colors flex-shrink-0 ${
                  rememberMe ? "bg-[#1B4F72] border-[#1B4F72]" : "border-gray-300"
                }`}
              >
                {rememberMe && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
              <label className="text-sm text-gray-600 cursor-pointer" onClick={() => setRememberMe(!rememberMe)}>
                Remember me
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1B4F72] hover:bg-[#2E86C1] text-white py-4 rounded-xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-2 shadow-md"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Signing in...
                </span>
              ) : "Sign In"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-400 mt-4">
            Demo: any email + any password
          </p>
        </div>

        <p className="text-center text-[#AED6F1] text-sm mt-6 opacity-70">
          PawCare VMS v1.0 · Clinic Staff Portal
        </p>
      </div>
    </div>
  );
}
