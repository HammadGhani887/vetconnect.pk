import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Mail, Lock, Eye, EyeOff, PawPrint, AlertCircle, ArrowRight, Check } from "lucide-react";

const FONT_BODY    = "'Plus Jakarta Sans', sans-serif";
const FONT_HEADING = "'DM Serif Display', serif";

/* ─── Floating emoji badge ───────────────────────────────── */
function FloatingBadge({
  emoji, top, left, right, bottom, rotate = "0deg", delay = "0s",
}: {
  emoji: string; top?: string; left?: string; right?: string;
  bottom?: string; rotate?: string; delay?: string;
}) {
  return (
    <div
      className="absolute select-none pointer-events-none"
      style={{
        top, left, right, bottom,
        transform: `rotate(${rotate})`,
        animation: `floatBadge 4s ease-in-out ${delay} infinite`,
      }}
    >
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-3 text-2xl shadow-lg">
        {emoji}
      </div>
    </div>
  );
}

/* ─── Left panel ─────────────────────────────────────────── */
function LeftPanel() {
  return (
    <div
      className="hidden lg:flex flex-col justify-between px-12 xl:px-16 py-14 relative overflow-hidden"
      style={{
        background: "linear-gradient(155deg, #0d2f44 0%, #1B4F72 55%, #2471a3 100%)",
        minHeight: "100vh",
      }}
    >
      {/* keyframes injected inline */}
      <style>{`
        @keyframes floatBadge {
          0%,100% { transform: translateY(0px) rotate(var(--r, 0deg)); }
          50%      { transform: translateY(-12px) rotate(var(--r, 0deg)); }
        }
      `}</style>

      {/* Decorative blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-white/4 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-[#E67E22]/10 pointer-events-none" />
      <div className="absolute top-1/3 -right-16 w-48 h-48 rounded-full bg-white/5 pointer-events-none" />

      {/* Floating pet emoji badges */}
      <FloatingBadge emoji="🐾" top="18%"  left="8%"   rotate="-8deg"  delay="0s"    />
      <FloatingBadge emoji="🩺" top="28%"  right="10%" rotate="6deg"   delay="0.8s"  />
      <FloatingBadge emoji="🐶" top="52%"  left="5%"   rotate="4deg"   delay="1.6s"  />
      <FloatingBadge emoji="🐱" bottom="22%" right="8%"  rotate="-5deg"  delay="0.4s"  />
      <FloatingBadge emoji="💉" bottom="36%" left="12%"  rotate="10deg"  delay="1.2s"  />
      <FloatingBadge emoji="❤️" top="68%"  right="14%" rotate="-6deg"  delay="2s"    />

      {/* Logo */}
      <div className="relative z-10">
        <Link to="/vetconnect" className="inline-flex items-center gap-3">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center shadow-md"
            style={{ background: "linear-gradient(135deg,#E67E22,#d06c14)" }}
          >
            <PawPrint size={22} className="text-white" />
          </div>
          <span className="text-white text-2xl" style={{ fontFamily: FONT_HEADING }}>
            VetConnect
          </span>
        </Link>
      </div>

      {/* Centre copy */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center py-16">
        <div className="text-6xl mb-8 select-none">🐾</div>
        <h1
          className="text-white leading-snug mb-4"
          style={{ fontFamily: FONT_HEADING, fontSize: "clamp(2rem, 3vw, 2.8rem)" }}
        >
          Welcome Back!
        </h1>
        <p className="text-blue-200 max-w-xs leading-relaxed" style={{ fontFamily: FONT_BODY }}>
          Access your pet's health records, upcoming appointments, and trusted vets — all in one place.
        </p>

        {/* Mini stats row */}
        <div className="mt-10 grid grid-cols-3 gap-6 w-full max-w-sm">
          {[
            { value: "50K+", label: "Pet Owners" },
            { value: "800+", label: "Verified Vets" },
            { value: "6",    label: "Cities" },
          ].map((s) => (
            <div key={s.label} className="bg-white/10 rounded-2xl p-4 border border-white/10">
              <p className="text-white text-xl font-bold" style={{ fontFamily: FONT_HEADING }}>{s.value}</p>
              <p className="text-blue-200 text-xs mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Trust strip */}
        <div className="mt-8 flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-5 py-2.5">
          <Check size={14} className="text-[#27AE60]" />
          <span className="text-blue-100 text-xs" style={{ fontFamily: FONT_BODY }}>
            Trusted by pet owners across Pakistan
          </span>
        </div>
      </div>

      {/* Footer */}
      <p className="relative z-10 text-blue-300 text-xs text-center" style={{ fontFamily: FONT_BODY }}>
        © 2026 VetConnect Pakistan · All Rights Reserved
      </p>
    </div>
  );
}

/* ─── Forgot Password modal ──────────────────────────────── */
function ForgotModal({ onClose }: { onClose: () => void }) {
  const [fpEmail, setFpEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1200);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-sm relative"
        style={{ fontFamily: FONT_BODY }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
        >
          ✕
        </button>

        {sent ? (
          <div className="text-center py-4">
            <div className="w-16 h-16 bg-[#27AE60]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check size={30} className="text-[#27AE60]" strokeWidth={2.5} />
            </div>
            <h3 className="text-[#1B4F72] mb-2" style={{ fontFamily: FONT_HEADING, fontSize: "1.4rem" }}>
              Email Sent!
            </h3>
            <p className="text-gray-500 text-sm mb-6">
              Password reset instructions have been sent to <strong>{fpEmail}</strong>.
              Check your inbox (and spam folder).
            </p>
            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-[#1B4F72] text-white font-semibold text-sm hover:bg-[#15406b] transition-colors"
            >
              Back to Login
            </button>
          </div>
        ) : (
          <>
            <div className="w-12 h-12 bg-[#1B4F72]/8 rounded-xl flex items-center justify-center mb-4">
              <Lock size={20} className="text-[#1B4F72]" />
            </div>
            <h3 className="text-[#1B4F72] mb-1" style={{ fontFamily: FONT_HEADING, fontSize: "1.4rem" }}>
              Forgot Password?
            </h3>
            <p className="text-gray-500 text-sm mb-6">
              Enter your email and we'll send you a link to reset your password.
            </p>
            <form onSubmit={submit} className="space-y-4">
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={fpEmail}
                  onChange={e => setFpEmail(e.target.value)}
                  required
                  placeholder="your@email.com"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#1B4F72] focus:ring-2 focus:ring-[#1B4F72]/10 transition"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-[#E67E22] hover:bg-[#d06c14] text-white font-semibold text-sm transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {loading
                  ? <><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg> Sending…</>
                  : "Send Reset Link"}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                Cancel
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

/* ─── Main page ──────────────────────────────────────────── */
export function VetConnectLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail]               = useState("");
  const [password, setPassword]         = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember]         = useState(false);
  const [error, setError]               = useState("");
  const [loading, setLoading]           = useState(false);
  const [showForgot, setShowForgot]     = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Demo: any credentials accepted — navigate to portal
      navigate("/vetconnect/portal");
    }, 1200);
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2" style={{ fontFamily: FONT_BODY }}>

      {/* ── LEFT PANEL ── */}
      <LeftPanel />

      {/* ── RIGHT PANEL ── */}
      <div className="flex flex-col min-h-screen bg-white">

        {/* Mobile logo bar */}
        <div
          className="lg:hidden flex items-center justify-center gap-3 px-6 py-6"
          style={{ background: "linear-gradient(135deg,#0d2f44,#1B4F72)" }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shadow"
            style={{ background: "linear-gradient(135deg,#E67E22,#d06c14)" }}
          >
            <PawPrint size={20} className="text-white" />
          </div>
          <span className="text-white text-2xl" style={{ fontFamily: FONT_HEADING }}>
            VetConnect
          </span>
        </div>

        {/* Form area */}
        <div className="flex-1 flex items-center justify-center px-6 sm:px-10 xl:px-16 py-12">
          <div className="w-full max-w-md">

            {/* Heading */}
            <div className="mb-8">
              <h1
                className="text-[#1B4F72] mb-1.5"
                style={{ fontFamily: FONT_HEADING, fontSize: "clamp(1.8rem,3vw,2.4rem)" }}
              >
                Log In to VetConnect
              </h1>
              <p className="text-gray-500 text-sm">
                New here?{" "}
                <Link to="/vetconnect/signup" className="text-[#E67E22] font-semibold hover:underline">
                  Create a free account
                </Link>
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2.5 bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 mb-6 text-sm">
                <AlertCircle size={16} className="flex-shrink-0" />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Email Address <span className="text-[#E67E22]">*</span>
                </label>
                <div className="relative">
                  <Mail
                    size={17}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-3.5 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 bg-gray-50 outline-none focus:bg-white focus:border-[#1B4F72] focus:ring-2 focus:ring-[#1B4F72]/10 transition"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Password <span className="text-[#E67E22]">*</span>
                </label>
                <div className="relative">
                  <Lock
                    size={17}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-12 py-3.5 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 bg-gray-50 outline-none focus:bg-white focus:border-[#1B4F72] focus:ring-2 focus:ring-[#1B4F72]/10 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </div>

              {/* Remember me + Forgot */}
              <div className="flex items-center justify-between gap-4">
                <label
                  className="flex items-center gap-2.5 cursor-pointer group"
                  onClick={() => setRemember(!remember)}
                >
                  <div
                    className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                      remember
                        ? "bg-[#1B4F72] border-[#1B4F72]"
                        : "border-gray-300 group-hover:border-[#1B4F72]/40"
                    }`}
                  >
                    {remember && (
                      <Check size={11} className="text-white" strokeWidth={3} />
                    )}
                  </div>
                  <span className="text-sm text-gray-600 select-none">Remember me</span>
                </label>

                <button
                  type="button"
                  onClick={() => setShowForgot(true)}
                  className="text-sm text-[#E67E22] font-semibold hover:underline flex-shrink-0"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2.5 py-4 rounded-xl bg-[#1B4F72] hover:bg-[#15406b] text-white font-semibold text-base transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Signing in…
                  </>
                ) : (
                  <>
                    Log In
                    <ArrowRight size={18} />
                  </>
                )}
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-xs text-gray-400 font-medium">Or continue with</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              {/* Google */}
              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold text-sm transition-all"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Sign in with Google
              </button>

              {/* Sign up link */}
              <p className="text-center text-sm text-gray-500 pt-1">
                Don't have an account?{" "}
                <Link to="/vetconnect/signup" className="text-[#1B4F72] font-semibold hover:underline">
                  Sign Up Free
                </Link>
              </p>
            </form>

            {/* Demo hint */}
            <div className="mt-8 bg-[#1B4F72]/5 border border-[#1B4F72]/15 rounded-xl px-4 py-3 flex items-start gap-2.5">
              <span className="text-base mt-0.5">💡</span>
              <p className="text-xs text-[#1B4F72]/70 leading-relaxed">
                <strong className="text-[#1B4F72]">Demo mode:</strong> Enter any email and password to explore the platform. No real account required.
              </p>
            </div>
          </div>
        </div>

        {/* Mobile bottom link */}
        <div className="lg:hidden px-6 py-4 border-t border-gray-100 text-center text-xs text-gray-400">
          © 2026 VetConnect Pakistan
        </div>
      </div>

      {/* Forgot password modal */}
      {showForgot && <ForgotModal onClose={() => setShowForgot(false)} />}
    </div>
  );
}
