import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  PawPrint, Mail, Lock, Eye, EyeOff, Check,
  WifiOff, X, ChevronRight, AlertCircle, Loader2,
  Shield, Clock,
} from "lucide-react";

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const C = {
  primary:   "#1B4F72",
  primaryDk: "#154060",
  grad:      "linear-gradient(160deg, #1B4F72 0%, #1D6FA4 55%, #2E86C1 100%)",
  accent:    "#E67E22",
  accentDk:  "#D35400",
  success:   "#27AE60",
  warning:   "#F39C12",
  danger:    "#E74C3C",
  bg:        "#F5F7FA",
  card:      "#FFFFFF",
  text:      "#1A1A2E",
  sub:       "#5A6178",
  muted:     "#8E94A7",
  border:    "#E8ECF1",
};
const FONT = "'Plus Jakarta Sans', sans-serif";
const FONT_H = "'DM Serif Display', serif";

// ─── OFFLINE BANNER ───────────────────────────────────────────────────────────
function OfflineBanner({ onDismiss }: { onDismiss: () => void }) {
  return (
    <div
      className="flex items-center gap-3 px-4 py-3 relative"
      style={{ backgroundColor: "#FFFBF0", borderBottom: `2px solid ${C.warning}` }}
    >
      {/* Animated pulse dot */}
      <div className="relative flex-shrink-0">
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center"
          style={{ backgroundColor: "#FEF9E7" }}
        >
          <WifiOff size={14} style={{ color: C.warning }} />
        </div>
        <span
          className="absolute inset-0 rounded-full animate-ping"
          style={{ backgroundColor: `${C.warning}30` }}
        />
      </div>

      <div className="flex-1 min-w-0">
        <p
          className="text-xs font-bold"
          style={{ color: "#92600A", fontFamily: FONT }}
        >
          You are offline
        </p>
        <p
          className="text-xs truncate"
          style={{ color: "#B07A2A", fontFamily: FONT }}
        >
          Changes will sync when connection restores
        </p>
      </div>

      <button
        onClick={onDismiss}
        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-colors"
        style={{ backgroundColor: "#FEF3CD" }}
        aria-label="Dismiss"
      >
        <X size={12} style={{ color: "#92600A" }} />
      </button>
    </div>
  );
}

// ─── CHECKBOX ─────────────────────────────────────────────────────────────────
function Checkbox({
  checked, onChange, label,
}: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <label
      className="flex items-center gap-2.5 cursor-pointer select-none"
      style={{ fontFamily: FONT }}
      onClick={onChange}
    >
      <div
        className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 transition-all duration-150"
        style={{
          backgroundColor: checked ? C.primary : "#fff",
          border: `2px solid ${checked ? C.primary : C.border}`,
          boxShadow: checked ? `0 0 0 3px rgba(27,79,114,0.12)` : "none",
        }}
      >
        {checked && <Check size={11} strokeWidth={3} color="#fff" />}
      </div>
      <span className="text-sm" style={{ color: C.sub }}>{label}</span>
    </label>
  );
}

// ─── INPUT FIELD ──────────────────────────────────────────────────────────────
function InputField({
  id, label, type = "text", placeholder, value, onChange, leadingIcon, trailingAction, error, autoComplete,
}: {
  id: string; label: string; type?: string; placeholder: string; value: string;
  onChange: (v: string) => void; leadingIcon: React.ReactNode;
  trailingAction?: React.ReactNode; error?: string; autoComplete?: string;
}) {
  const [focused, setFocused] = useState(false);
  const borderColor = error ? C.danger : focused ? C.primary : C.border;
  const shadowColor = error ? "rgba(231,76,60,0.12)" : "rgba(27,79,114,0.12)";

  return (
    <div style={{ fontFamily: FONT }}>
      <label
        htmlFor={id}
        className="block mb-1.5 text-sm font-semibold"
        style={{ color: C.text }}
      >
        {label}
      </label>

      <div
        className="flex items-center gap-3 rounded-2xl px-4 transition-all duration-200"
        style={{
          height: "52px",
          backgroundColor: focused ? "#fff" : "#F8FAFC",
          border: `1.5px solid ${borderColor}`,
          boxShadow: focused ? `0 0 0 4px ${shadowColor}` : "none",
        }}
      >
        {/* Leading icon */}
        <span
          className="flex-shrink-0 transition-colors duration-200"
          style={{ color: focused ? C.primary : C.muted, display: "flex" }}
        >
          {leadingIcon}
        </span>

        {/* Input */}
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="flex-1 bg-transparent outline-none text-sm"
          style={{ color: C.text, fontFamily: FONT }}
        />

        {/* Trailing action */}
        {trailingAction}
      </div>

      {/* Error message */}
      {error && (
        <p
          className="flex items-center gap-1.5 mt-1.5 text-xs"
          style={{ color: C.danger, fontFamily: FONT }}
        >
          <AlertCircle size={12} />
          {error}
        </p>
      )}
    </div>
  );
}

// ─── DECORATIVE BLOB ──────────────────────────────────────────────────────────
function Blobs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute -top-10 -right-10 rounded-full opacity-20"
        style={{ width: "180px", height: "180px", backgroundColor: "#2E86C1" }}
      />
      <div
        className="absolute top-1/2 -left-12 rounded-full opacity-10"
        style={{ width: "140px", height: "140px", backgroundColor: "#AED6F1" }}
      />
      <div
        className="absolute bottom-0 right-1/3 rounded-full opacity-15"
        style={{ width: "80px", height: "80px", backgroundColor: C.accent }}
      />
      {/* Grid dots */}
      <svg className="absolute inset-0 w-full h-full opacity-10" style={{ pointerEvents: "none" }}>
        {[...Array(6)].map((_, row) =>
          [...Array(8)].map((_, col) => (
            <circle
              key={`${row}-${col}`}
              cx={col * 48 + 20}
              cy={row * 32 + 12}
              r="1.5"
              fill="white"
            />
          ))
        )}
      </svg>
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export function VetConnectLiteLoginPage() {
  const navigate = useNavigate();

  // Form state
  const [email,       setEmail]       = useState("");
  const [password,    setPassword]    = useState("");
  const [showPw,      setShowPw]      = useState(false);
  const [remember,    setRemember]    = useState(false);
  const [loading,     setLoading]     = useState(false);
  const [success,     setSuccess]     = useState(false);
  const [emailErr,    setEmailErr]    = useState("");
  const [pwErr,       setPwErr]       = useState("");
  const [globalErr,   setGlobalErr]   = useState("");

  // Offline banner
  const [showOffline, setShowOffline] = useState(true);

  // Demo: toggle offline banner
  const [offlineDemo, setOfflineDemo] = useState(true);

  // Floating label entrance animation counter
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 80); return () => clearTimeout(t); }, []);

  function validate() {
    let ok = true;
    setEmailErr("");
    setPwErr("");
    setGlobalErr("");

    if (!email.trim()) {
      setEmailErr("Email address is required"); ok = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailErr("Enter a valid email address"); ok = false;
    }
    if (!password) {
      setPwErr("Password is required"); ok = false;
    } else if (password.length < 6) {
      setPwErr("Password must be at least 6 characters"); ok = false;
    }
    return ok;
  }

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    await new Promise((r) => setTimeout(r, 1800));

    // Demo: wrong credentials on purpose
    if (email !== "admin@vetconnect.pk" || password !== "password123") {
      setGlobalErr("Invalid credentials. Use admin@vetconnect.pk / password123");
      setLoading(false);
      return;
    }

    setSuccess(true);
    setTimeout(() => navigate("/vetconnect-lite/design-system"), 1200);
  }

  return (
    /* ── OUTER SHELL ── centres the 360px frame on desktop */
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "#0D2233" }}
    >
      {/* Toggle offline banner (dev control, outside phone) */}
      <button
        onClick={() => setOfflineDemo((v) => !v)}
        className="fixed top-4 right-4 z-50 text-xs px-3 py-1.5 rounded-full font-semibold transition-all"
        style={{
          backgroundColor: offlineDemo ? C.warning : "#2E2E2E",
          color: "#fff",
          fontFamily: FONT,
        }}
      >
        {offlineDemo ? "⚡ Online" : "📴 Go Offline"}
      </button>

      {/* ── PHONE FRAME ── */}
      <div
        className="relative flex flex-col overflow-hidden"
        style={{
          width: "360px",
          minHeight: "100vh",
          maxHeight: "812px",
          borderRadius: "0px",
          backgroundColor: C.bg,
          boxShadow: "0 32px 80px rgba(0,0,0,0.5)",
        }}
      >
        {/* ── OFFLINE BANNER ── */}
        <div
          className="transition-all duration-300 overflow-hidden"
          style={{
            maxHeight: offlineDemo ? "60px" : "0px",
            opacity: offlineDemo ? 1 : 0,
          }}
        >
          <OfflineBanner onDismiss={() => setOfflineDemo(false)} />
        </div>

        {/* ── TOP BLUE SECTION (35%) ── */}
        <div
          className="relative flex-shrink-0 flex flex-col items-center justify-center"
          style={{
            background: C.grad,
            height: "260px",
            paddingBottom: "48px", // overlap buffer
          }}
        >
          <Blobs />

          <div className="relative z-10 flex flex-col items-center">
            {/* Logo mark */}
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-2xl"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.25), rgba(255,255,255,0.08))",
                border: "1.5px solid rgba(255,255,255,0.3)",
                backdropFilter: "blur(8px)",
              }}
            >
              <PawPrint size={32} color="#fff" strokeWidth={1.8} />
            </div>

            {/* Brand name */}
            <h1
              className="text-white mb-1 tracking-tight"
              style={{
                fontFamily: FONT_H,
                fontSize: "1.625rem",
                lineHeight: 1.1,
                textShadow: "0 2px 12px rgba(0,0,0,0.2)",
              }}
            >
              VetConnect Lite
            </h1>

            {/* Subtitle pill */}
            <div
              className="flex items-center gap-1.5 px-3 py-1 rounded-full"
              style={{
                backgroundColor: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.25)",
              }}
            >
              <Shield size={10} color="rgba(255,255,255,0.8)" />
              <span
                className="text-xs tracking-wide"
                style={{ color: "rgba(255,255,255,0.85)", fontFamily: FONT, fontWeight: 500, letterSpacing: "0.04em" }}
              >
                Clinic Management System
              </span>
            </div>

            {/* Trust badges */}
            <div className="flex items-center gap-3 mt-4">
              {[
                { icon: <Shield size={11} />, label: "Secure" },
                { icon: <Clock size={11} />, label: "Offline-ready" },
              ].map(({ icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-full"
                  style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                >
                  <span style={{ color: "rgba(255,255,255,0.65)", display: "flex" }}>{icon}</span>
                  <span className="text-xs" style={{ color: "rgba(255,255,255,0.65)", fontFamily: FONT }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── WHITE CARD (65%) overlapping blue ── */}
        <div
          className="flex-1 flex flex-col relative"
          style={{
            backgroundColor: C.card,
            borderRadius: "28px 28px 0 0",
            marginTop: "-28px",
            boxShadow: "0 -8px 40px rgba(0,0,0,0.12)",
            zIndex: 10,
          }}
        >
          {/* Card drag handle */}
          <div className="flex justify-center pt-3 pb-1">
            <div
              className="w-9 h-1 rounded-full"
              style={{ backgroundColor: C.border }}
            />
          </div>

          <div className="flex-1 px-6 pt-4 pb-6 flex flex-col overflow-y-auto">

            {/* Heading */}
            <div
              className="mb-7 transition-all duration-500"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(16px)",
              }}
            >
              <h2
                style={{
                  fontFamily: FONT_H,
                  fontSize: "1.75rem",
                  color: C.text,
                  lineHeight: 1.15,
                }}
              >
                Welcome Back
              </h2>
              <p
                className="mt-1.5 text-sm"
                style={{ color: C.muted, fontFamily: FONT }}
              >
                Sign in to your clinic dashboard
              </p>
            </div>

            {/* Global error */}
            {globalErr && (
              <div
                className="flex items-start gap-3 rounded-2xl px-4 py-3 mb-5"
                style={{
                  backgroundColor: "#FDEDEC",
                  border: `1.5px solid #FADBD8`,
                }}
              >
                <AlertCircle size={16} style={{ color: C.danger, flexShrink: 0, marginTop: "1px" }} />
                <p className="text-xs leading-relaxed" style={{ color: "#922B21", fontFamily: FONT }}>
                  {globalErr}
                </p>
              </div>
            )}

            {/* Success banner */}
            {success && (
              <div
                className="flex items-center gap-3 rounded-2xl px-4 py-3 mb-5"
                style={{ backgroundColor: "#EAFAF1", border: `1.5px solid #A9DFBF` }}
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: C.success }}
                >
                  <Check size={14} color="#fff" strokeWidth={2.5} />
                </div>
                <p className="text-xs font-semibold" style={{ color: "#1E8449", fontFamily: FONT }}>
                  Login successful! Redirecting…
                </p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSignIn} className="space-y-4 flex-1" noValidate>

              {/* Email */}
              <div
                className="transition-all duration-500"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? "translateY(0)" : "translateY(20px)",
                  transitionDelay: "80ms",
                }}
              >
                <InputField
                  id="email"
                  label="Email Address"
                  type="email"
                  placeholder="doctor@clinic.pk"
                  value={email}
                  onChange={(v) => { setEmail(v); setEmailErr(""); setGlobalErr(""); }}
                  leadingIcon={<Mail size={17} />}
                  error={emailErr}
                  autoComplete="email"
                />
              </div>

              {/* Password */}
              <div
                className="transition-all duration-500"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? "translateY(0)" : "translateY(20px)",
                  transitionDelay: "160ms",
                }}
              >
                <InputField
                  id="password"
                  label="Password"
                  type={showPw ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(v) => { setPassword(v); setPwErr(""); setGlobalErr(""); }}
                  leadingIcon={<Lock size={17} />}
                  trailingAction={
                    <button
                      type="button"
                      onClick={() => setShowPw((v) => !v)}
                      className="flex-shrink-0 transition-colors"
                      style={{ color: showPw ? C.primary : C.muted, display: "flex" }}
                      aria-label={showPw ? "Hide password" : "Show password"}
                    >
                      {showPw ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>
                  }
                  error={pwErr}
                  autoComplete="current-password"
                />
              </div>

              {/* Remember me + Forgot */}
              <div
                className="flex items-center justify-between transition-all duration-500"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? "translateY(0)" : "translateY(20px)",
                  transitionDelay: "240ms",
                }}
              >
                <Checkbox
                  checked={remember}
                  onChange={() => setRemember((v) => !v)}
                  label="Remember me"
                />
                <button
                  type="button"
                  className="text-sm font-semibold transition-colors"
                  style={{ color: C.accent, fontFamily: FONT }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = C.accentDk)}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = C.accent)}
                >
                  Forgot Password?
                </button>
              </div>

              {/* Sign In button */}
              <div
                className="pt-1 transition-all duration-500"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? "translateY(0)" : "translateY(20px)",
                  transitionDelay: "320ms",
                }}
              >
                <button
                  type="submit"
                  disabled={loading || success}
                  className="w-full flex items-center justify-center gap-2.5 rounded-2xl font-semibold transition-all duration-200 active:scale-[0.98]"
                  style={{
                    height: "52px",
                    background: success
                      ? `linear-gradient(135deg, ${C.success}, #2ECC71)`
                      : loading
                      ? `linear-gradient(135deg, ${C.primaryDk}, #1B4F72)`
                      : `linear-gradient(135deg, ${C.primary}, #2874A6)`,
                    color: "#fff",
                    fontSize: "0.9375rem",
                    fontFamily: FONT,
                    boxShadow: loading || success
                      ? "none"
                      : `0 6px 20px rgba(27,79,114,0.35)`,
                    cursor: loading || success ? "not-allowed" : "pointer",
                    letterSpacing: "0.01em",
                  }}
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Signing in…
                    </>
                  ) : success ? (
                    <>
                      <Check size={18} strokeWidth={2.5} />
                      Signed In!
                    </>
                  ) : (
                    <>
                      Sign In
                      <ChevronRight size={17} strokeWidth={2.5} />
                    </>
                  )}
                </button>
              </div>

              {/* Hint */}
              {!loading && !success && (
                <p
                  className="text-center text-xs transition-all duration-500"
                  style={{
                    color: C.muted,
                    fontFamily: FONT,
                    opacity: mounted ? 1 : 0,
                    transitionDelay: "400ms",
                  }}
                >
                  Demo: <code className="text-xs px-1 py-0.5 rounded" style={{ backgroundColor: "#F0F4F8", color: C.primary }}>
                    admin@vetconnect.pk
                  </code>
                  {" "}/ <code className="text-xs px-1 py-0.5 rounded" style={{ backgroundColor: "#F0F4F8", color: C.primary }}>
                    password123
                  </code>
                </p>
              )}
            </form>

            {/* Divider */}
            <div
              className="flex items-center gap-3 my-5 transition-all duration-500"
              style={{
                opacity: mounted ? 1 : 0,
                transitionDelay: "480ms",
              }}
            >
              <div className="flex-1 h-px" style={{ backgroundColor: C.border }} />
              <span className="text-xs" style={{ color: C.muted, fontFamily: FONT }}>or</span>
              <div className="flex-1 h-px" style={{ backgroundColor: C.border }} />
            </div>

            {/* Contact admin */}
            <div
              className="text-center transition-all duration-500"
              style={{
                opacity: mounted ? 1 : 0,
                transitionDelay: "560ms",
              }}
            >
              <p className="text-sm" style={{ color: C.muted, fontFamily: FONT }}>
                Need an account?{" "}
                <button
                  type="button"
                  className="font-semibold transition-colors"
                  style={{ color: C.primary }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = C.accent)}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = C.primary)}
                >
                  Contact admin
                </button>
              </p>
              <p className="text-xs mt-2" style={{ color: C.muted, fontFamily: FONT, opacity: 0.7 }}>
                Restricted to authorised clinic staff only
              </p>
            </div>

            {/* View design system link */}
            <div className="mt-5 text-center">
              <button
                onClick={() => navigate("/vetconnect-lite/design-system")}
                className="text-xs transition-colors"
                style={{ color: C.muted, fontFamily: FONT }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = C.primary)}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = C.muted)}
              >
                View Design System →
              </button>
            </div>
          </div>

          {/* Bottom safe-area spacer */}
          <div className="h-5" />
        </div>
      </div>

      {/* ── DESKTOP ANNOTATION ── */}
      <div
        className="hidden lg:block absolute bottom-6 left-1/2 -translate-x-1/2 text-center"
        style={{ fontFamily: FONT }}
      >
        <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
          VetConnect Lite · Login · Mobile-first 360px · Prompt 1
        </p>
      </div>
    </div>
  );
}
