import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import {
  PawPrint, Mail, Lock, Eye, EyeOff, Check, X,
  WifiOff, Wifi, ChevronRight, AlertCircle, Loader2,
  Shield, MonitorSmartphone, CloudOff, CheckCircle2,
  ArrowRight, Star,
} from "lucide-react";

// ─── TOKENS ──────────────────────────────────────────────────────────────────
const C = {
  primary:   "#1B4F72",
  primaryDk: "#0D2F4F",
  primaryMd: "#2874A6",
  grad:      "linear-gradient(145deg, #0D2F4F 0%, #1B4F72 45%, #2E86C1 100%)",
  accent:    "#E67E22",
  accentDk:  "#D35400",
  success:   "#27AE60",
  successLt: "#EAFAF1",
  warning:   "#F39C12",
  warningLt: "#FFFBF0",
  danger:    "#E74C3C",
  dangerLt:  "#FDEDEC",
  bg:        "#F5F7FA",
  card:      "#FFFFFF",
  text:      "#1A1A2E",
  textLt:    "#5A6178",
  muted:     "#8E94A7",
  border:    "#E8ECF1",
  primaryLt: "#EBF5FB",
};
const F  = "'Plus Jakarta Sans', sans-serif";

// ─── BREAKPOINTS ─────────────────────────────────────────────────────────────
function useBreakpoint() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1280);
  useEffect(() => {
    const fn = () => setW(window.innerWidth);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return {
    isMobile:  w < 768,
    isTablet:  w >= 768 && w < 1280,
    isDesktop: w >= 1280,
    width: w,
  };
}

// ─── OFFLINE BANNER ──────────────────────────────────────────────────────────
function OfflineBanner({
  onDismiss, isDesktop,
}: { onDismiss: () => void; isDesktop?: boolean }) {
  return (
    <div
      className="flex items-center gap-3 px-4 py-2.5"
      style={{
        backgroundColor: C.warningLt,
        borderBottom: `2px solid ${C.warning}`,
        fontFamily: F,
        zIndex: 100,
      }}
    >
      <div
        className="relative w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: "#FEF3CD" }}
      >
        <WifiOff size={14} style={{ color: C.warning }} />
        <span
          className="absolute inset-0 rounded-full animate-ping"
          style={{ backgroundColor: `${C.warning}30` }}
        />
      </div>
      <div className="flex-1">
        <span className="text-xs font-bold" style={{ color: "#92600A" }}>
          You are offline
        </span>
        {isDesktop && (
          <span className="text-xs ml-2" style={{ color: "#B07A2A" }}>
            · Changes will sync automatically when connection is restored
          </span>
        )}
      </div>
      <button
        onClick={onDismiss}
        className="w-6 h-6 rounded-full flex items-center justify-center transition-colors"
        style={{ backgroundColor: "#FEF3CD" }}
      >
        <X size={12} style={{ color: "#92600A" }} />
      </button>
    </div>
  );
}

// ─── CUSTOM CHECKBOX ─────────────────────────────────────────────────────────
function Checkbox({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <label
      className="flex items-center gap-2.5 cursor-pointer select-none"
      style={{ fontFamily: F }}
      onClick={onChange}
    >
      <div
        className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 transition-all duration-150"
        style={{
          backgroundColor: checked ? C.primary : "transparent",
          border: `2px solid ${checked ? C.primary : C.border}`,
          boxShadow: checked ? `0 0 0 3px ${C.primaryLt}` : "none",
        }}
      >
        {checked && <Check size={11} strokeWidth={3} color="#fff" />}
      </div>
      <span className="text-sm" style={{ color: C.textLt }}>{label}</span>
    </label>
  );
}

// ─── INPUT FIELD ─────────────────────────────────────────────────────────────
function InputField({
  id, label, type = "text", placeholder, value, onChange,
  icon, error, autoComplete,
}: {
  id: string; label: string; type?: string; placeholder: string;
  value: string; onChange: (v: string) => void; icon: React.ReactNode;
  error?: string; autoComplete?: string;
}) {
  const [focused, setFocused] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const borderColor = error ? C.danger : focused ? C.primary : C.border;
  const shadowColor = error ? `rgba(231,76,60,0.12)` : `rgba(27,79,114,0.12)`;

  return (
    <div style={{ fontFamily: F }}>
      <label
        htmlFor={id}
        className="block mb-1.5 text-sm font-semibold"
        style={{ color: C.text }}
      >
        {label}
      </label>
      <div
        className="flex items-center gap-3 rounded-xl px-3.5 transition-all duration-200"
        style={{
          height: "48px",
          backgroundColor: focused ? "#fff" : "#F8FAFC",
          border: `1.5px solid ${borderColor}`,
          boxShadow: focused ? `0 0 0 4px ${shadowColor}` : "none",
        }}
      >
        <span
          className="flex-shrink-0 transition-colors duration-200"
          style={{ color: focused ? C.primary : C.muted, display: "flex" }}
        >
          {icon}
        </span>
        <input
          id={id}
          type={type === "password" ? (showPw ? "text" : "password") : type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="flex-1 bg-transparent outline-none text-sm"
          style={{ color: C.text, fontFamily: F }}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPw((p) => !p)}
            className="flex-shrink-0 transition-colors"
            style={{ color: showPw ? C.primary : C.muted, display: "flex" }}
          >
            {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
      {error && (
        <p className="flex items-center gap-1.5 mt-1.5 text-xs" style={{ color: C.danger }}>
          <AlertCircle size={12} /> {error}
        </p>
      )}
    </div>
  );
}

// ─── SIGN IN BUTTON ───────────────────────────────────────────────────────────
function SignInButton({ loading, success }: { loading: boolean; success: boolean }) {
  return (
    <button
      type="submit"
      disabled={loading || success}
      className="w-full flex items-center justify-center gap-2.5 rounded-xl font-semibold transition-all duration-200 active:scale-[0.98]"
      style={{
        height: "48px",
        background: success
          ? `linear-gradient(135deg, ${C.success}, #2ECC71)`
          : loading
          ? `linear-gradient(135deg, #154060, ${C.primary})`
          : `linear-gradient(135deg, ${C.primary}, #2874A6)`,
        color: "#fff",
        fontSize: "0.9375rem",
        fontFamily: F,
        boxShadow: loading || success ? "none" : `0 6px 20px rgba(27,79,114,0.32)`,
        cursor: loading || success ? "not-allowed" : "pointer",
        letterSpacing: "0.01em",
      }}
    >
      {loading ? (
        <><Loader2 size={18} className="animate-spin" /> Signing in…</>
      ) : success ? (
        <><CheckCircle2 size={18} strokeWidth={2.5} /> Signed In!</>
      ) : (
        <>Sign In <ArrowRight size={17} strokeWidth={2.5} /></>
      )}
    </button>
  );
}

// ─── LOGO MARK ────────────────────────────────────────────────────────────────
function LogoMark({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sz = { sm: 14, md: 18, lg: 26 };
  const box = { sm: "w-9 h-9", md: "w-12 h-12", lg: "w-16 h-16" };
  const radius = { sm: "rounded-xl", md: "rounded-2xl", lg: "rounded-2xl" };
  return (
    <div
      className={`${box[size]} ${radius[size]} flex items-center justify-center`}
      style={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.25), rgba(255,255,255,0.08))",
        border: "1.5px solid rgba(255,255,255,0.3)",
        backdropFilter: "blur(8px)",
        boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
      }}
    >
      <PawPrint size={sz[size]} color="#fff" strokeWidth={1.8} />
    </div>
  );
}

// ─── DECORATIVE SVG PATTERN ───────────────────────────────────────────────────
function GridDots({ opacity = 0.08 }: { opacity?: number }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity }}
    >
      {[...Array(12)].map((_, row) =>
        [...Array(16)].map((_, col) => (
          <circle
            key={`${row}-${col}`}
            cx={col * 56 + 20}
            cy={row * 48 + 16}
            r="1.8"
            fill="white"
          />
        ))
      )}
    </svg>
  );
}

function FloatingBlobs() {
  return (
    <>
      <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full" style={{ backgroundColor: "rgba(46,134,193,0.25)", filter: "blur(40px)" }} />
      <div className="absolute top-1/2 -left-12 w-40 h-40 rounded-full" style={{ backgroundColor: "rgba(230,126,34,0.12)", filter: "blur(30px)" }} />
      <div className="absolute -bottom-10 right-1/3 w-32 h-32 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.05)", filter: "blur(20px)" }} />
    </>
  );
}

// ─── FEATURE POINT (desktop left panel) ──────────────────────────────────────
const FEATURES = [
  {
    Icon: MonitorSmartphone,
    title: "Manage from any device",
    desc: "Access patient records, appointments, and invoices from your phone, tablet, or desktop.",
  },
  {
    Icon: CloudOff,
    title: "Works offline",
    desc: "Keep working even without internet. All data syncs automatically when you reconnect.",
  },
  {
    Icon: Shield,
    title: "Secure data",
    desc: "End-to-end encrypted records with role-based access. Your clinic data stays private.",
  },
];

function FeaturePoint({ Icon, title, desc, delay = 0 }: { Icon: any; title: string; desc: string; delay?: number }) {
  return (
    <div
      className="flex items-start gap-4"
      style={{ fontFamily: F }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.18)" }}
      >
        <Icon size={18} color="rgba(255,255,255,0.9)" strokeWidth={1.8} />
      </div>
      <div>
        <p className="font-semibold mb-1" style={{ color: "#fff", fontSize: "0.9375rem" }}>{title}</p>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.8125rem", lineHeight: 1.65 }}>{desc}</p>
      </div>
    </div>
  );
}

// ─── LOGIN FORM (shared across all breakpoints) ───────────────────────────────
function LoginForm({
  onSuccess, compact,
}: { onSuccess: () => void; compact?: boolean }) {
  const navigate = useNavigate();
  const [email,     setEmail]     = useState("");
  const [password,  setPassword]  = useState("");
  const [remember,  setRemember]  = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [success,   setSuccess]   = useState(false);
  const [emailErr,  setEmailErr]  = useState("");
  const [pwErr,     setPwErr]     = useState("");
  const [globalErr, setGlobalErr] = useState("");

  function validate() {
    let ok = true;
    setEmailErr(""); setPwErr(""); setGlobalErr("");
    if (!email.trim()) { setEmailErr("Email is required"); ok = false; }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setEmailErr("Enter a valid email"); ok = false; }
    if (!password) { setPwErr("Password is required"); ok = false; }
    else if (password.length < 6) { setPwErr("Minimum 6 characters"); ok = false; }
    return ok;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1800));
    if (email !== "admin@vetconnect.pk" || password !== "password123") {
      setGlobalErr("Invalid credentials. Try admin@vetconnect.pk / password123");
      setLoading(false);
      return;
    }
    setSuccess(true);
    setTimeout(() => navigate("/vetconnect-lite/dashboard"), 1200);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5" style={{ fontFamily: F }}>

      {/* Heading */}
      <div className={compact ? "mb-5" : "mb-6"}>
        <h1
          style={{
            fontSize: compact ? "1.5rem" : "1.875rem",
            fontWeight: 700,
            color: C.text,
            lineHeight: 1.2,
            fontFamily: F,
          }}
        >
          Welcome Back
        </h1>
        <p className="mt-1.5 text-sm" style={{ color: C.muted }}>
          Sign in to your clinic dashboard
        </p>
      </div>

      {/* Global error */}
      {globalErr && (
        <div
          className="flex items-start gap-3 rounded-xl px-4 py-3"
          style={{ backgroundColor: C.dangerLt, border: `1.5px solid #FADBD8` }}
        >
          <AlertCircle size={15} style={{ color: C.danger, flexShrink: 0, marginTop: "1px" }} />
          <p className="text-xs leading-relaxed" style={{ color: "#922B21" }}>{globalErr}</p>
        </div>
      )}

      {/* Success */}
      {success && (
        <div
          className="flex items-center gap-3 rounded-xl px-4 py-3"
          style={{ backgroundColor: C.successLt, border: `1.5px solid #A9DFBF` }}
        >
          <CheckCircle2 size={15} style={{ color: C.success }} />
          <p className="text-xs font-semibold" style={{ color: "#1E8449" }}>Login successful! Redirecting…</p>
        </div>
      )}

      {/* Email */}
      <InputField
        id="email"
        label="Email Address"
        type="email"
        placeholder="admin@clinic.pk"
        value={email}
        onChange={(v) => { setEmail(v); setEmailErr(""); setGlobalErr(""); }}
        icon={<Mail size={16} />}
        error={emailErr}
        autoComplete="email"
      />

      {/* Password */}
      <InputField
        id="password"
        label="Password"
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(v) => { setPassword(v); setPwErr(""); setGlobalErr(""); }}
        icon={<Lock size={16} />}
        error={pwErr}
        autoComplete="current-password"
      />

      {/* Remember + Forgot */}
      <div className="flex items-center justify-between">
        <Checkbox checked={remember} onChange={() => setRemember((v) => !v)} label="Remember me" />
        <button
          type="button"
          className="text-sm font-semibold transition-colors"
          style={{ color: C.accent }}
          onMouseEnter={(e) => (e.currentTarget.style.color = C.accentDk)}
          onMouseLeave={(e) => (e.currentTarget.style.color = C.accent)}
        >
          Forgot Password?
        </button>
      </div>

      {/* Sign In */}
      <SignInButton loading={loading} success={success} />

      {/* Demo hint */}
      {!loading && !success && (
        <p className="text-center text-xs" style={{ color: C.muted }}>
          Demo:{" "}
          <code className="px-1.5 py-0.5 rounded" style={{ backgroundColor: "#F0F4F8", color: C.primary, fontSize: "0.7rem" }}>
            admin@vetconnect.pk
          </code>
          {" / "}
          <code className="px-1.5 py-0.5 rounded" style={{ backgroundColor: "#F0F4F8", color: C.primary, fontSize: "0.7rem" }}>
            password123
          </code>
        </p>
      )}

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px" style={{ backgroundColor: C.border }} />
        <span className="text-xs" style={{ color: C.muted }}>or</span>
        <div className="flex-1 h-px" style={{ backgroundColor: C.border }} />
      </div>

      {/* Contact admin */}
      <p className="text-center text-sm" style={{ color: C.muted }}>
        Need an account?{" "}
        <button
          type="button"
          className="font-semibold transition-colors"
          style={{ color: C.primary }}
          onMouseEnter={(e) => (e.currentTarget.style.color = C.accent)}
          onMouseLeave={(e) => (e.currentTarget.style.color = C.primary)}
        >
          Contact admin
        </button>
      </p>
    </form>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// LAYOUT A — MOBILE (< 768px)
// Top 35% gradient + Bottom 65% white card overlapping
// ═══════════════════════════════════════════════════════════════════════════════
function MobileLayout({ offline, setOffline }: { offline: boolean; setOffline: (v: boolean) => void }) {
  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: C.bg }}>

      {/* Offline banner */}
      <div
        className="transition-all duration-300 overflow-hidden flex-shrink-0"
        style={{ maxHeight: offline ? "56px" : "0", opacity: offline ? 1 : 0 }}
      >
        <OfflineBanner onDismiss={() => setOffline(false)} />
      </div>

      {/* Blue gradient top */}
      <div
        className="relative flex flex-col items-center justify-center flex-shrink-0"
        style={{ background: C.grad, height: offline ? "calc(35vh - 40px)" : "35vh", minHeight: "200px" }}
      >
        <FloatingBlobs />
        <GridDots opacity={0.07} />

        <div className="relative z-10 flex flex-col items-center text-center px-6">
          <LogoMark size="lg" />
          <h1
            className="mt-4 text-white"
            style={{ fontFamily: F, fontWeight: 700, fontSize: "1.5rem", lineHeight: 1.15 }}
          >
            VetConnect Lite
          </h1>
          <div
            className="flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full"
            style={{ backgroundColor: "rgba(255,255,255,0.14)", border: "1px solid rgba(255,255,255,0.22)" }}
          >
            <Shield size={10} color="rgba(255,255,255,0.75)" />
            <span style={{ color: "rgba(255,255,255,0.82)", fontSize: "0.72rem", fontFamily: F, letterSpacing: "0.05em" }}>
              Clinic Management System
            </span>
          </div>
        </div>
      </div>

      {/* White card overlapping */}
      <div
        className="flex-1 relative z-10 flex flex-col"
        style={{
          backgroundColor: C.card,
          borderRadius: "24px 24px 0 0",
          marginTop: "-24px",
          boxShadow: "0 -8px 40px rgba(0,0,0,0.1)",
        }}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
          <div className="w-9 h-1 rounded-full" style={{ backgroundColor: C.border }} />
        </div>

        <div className="flex-1 px-6 py-5 overflow-y-auto">
          <LoginForm onSuccess={() => {}} />

          {/* Bottom safe area */}
          <div className="h-8" />
        </div>
      </div>

      {/* Offline toggle (demo) */}
      <button
        onClick={() => setOffline((v: boolean) => !v)}
        className="fixed bottom-6 right-4 z-50 flex items-center gap-2 px-3 py-2 rounded-full text-xs font-semibold shadow-lg"
        style={{ backgroundColor: offline ? C.warning : C.success, color: "#fff", fontFamily: F }}
      >
        {offline ? <Wifi size={13} /> : <WifiOff size={13} />}
        {offline ? "Go Online" : "Go Offline"}
      </button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// LAYOUT B — TABLET (768px – 1279px)
// Full blue gradient background + centered white card (400px)
// ═══════════════════════════════════════════════════════════════════════════════
function TabletLayout({ offline, setOffline }: { offline: boolean; setOffline: (v: boolean) => void }) {
  return (
    <div
      className="min-h-screen flex flex-col relative"
      style={{ background: C.grad }}
    >
      <FloatingBlobs />
      <GridDots opacity={0.06} />

      {/* Offline banner */}
      <div
        className="relative z-10 transition-all duration-300 overflow-hidden flex-shrink-0"
        style={{ maxHeight: offline ? "48px" : "0", opacity: offline ? 1 : 0 }}
      >
        <OfflineBanner onDismiss={() => setOffline(false)} />
      </div>

      {/* Centered content */}
      <div className="flex-1 relative z-10 flex flex-col items-center justify-center py-10 px-6">

        {/* Logo above card */}
        <div className="flex flex-col items-center mb-8">
          <LogoMark size="lg" />
          <h1
            className="mt-4 text-white text-center"
            style={{ fontFamily: F, fontWeight: 700, fontSize: "1.75rem", lineHeight: 1.15 }}
          >
            VetConnect Lite
          </h1>
          <div
            className="flex items-center gap-1.5 mt-2 px-3 py-1.5 rounded-full"
            style={{ backgroundColor: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)" }}
          >
            <Shield size={10} color="rgba(255,255,255,0.75)" />
            <span style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.72rem", fontFamily: F, letterSpacing: "0.05em" }}>
              Clinic Management System
            </span>
          </div>
        </div>

        {/* White card */}
        <div
          className="w-full flex flex-col"
          style={{
            maxWidth: "400px",
            backgroundColor: C.card,
            borderRadius: "24px",
            padding: "36px 32px",
            boxShadow: "0 32px 80px rgba(0,0,0,0.22), 0 8px 32px rgba(0,0,0,0.1)",
          }}
        >
          <LoginForm onSuccess={() => {}} compact />
        </div>

        {/* Version tag */}
        <p className="mt-6 text-xs" style={{ color: "rgba(255,255,255,0.35)", fontFamily: F }}>
          VetConnect Lite · Tablet view · 768px+
        </p>
      </div>

      {/* Offline toggle */}
      <button
        onClick={() => setOffline((v: boolean) => !v)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-3 py-2 rounded-full text-xs font-semibold shadow-lg"
        style={{ backgroundColor: offline ? C.warning : C.success, color: "#fff", fontFamily: F }}
      >
        {offline ? <Wifi size={13} /> : <WifiOff size={13} />}
        {offline ? "Go Online" : "Go Offline"}
      </button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// LAYOUT C — DESKTOP (≥ 1280px)
// Left 50% blue gradient (logo + features) | Right 50% white (centered 380px form)
// ═══════════════════════════════════════════════════════════════════════════════
function DesktopLayout({ offline, setOffline }: { offline: boolean; setOffline: (v: boolean) => void }) {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: C.card }}>

      {/* Offline banner — full width */}
      <div
        className="transition-all duration-300 overflow-hidden flex-shrink-0 relative z-50"
        style={{ maxHeight: offline ? "48px" : "0", opacity: offline ? 1 : 0 }}
      >
        <OfflineBanner onDismiss={() => setOffline(false)} isDesktop />
      </div>

      {/* Split layout */}
      <div className="flex-1 flex">

        {/* ── LEFT PANEL ── */}
        <div
          className="relative flex flex-col justify-between overflow-hidden"
          style={{ flex: "0 0 50%", background: C.grad, minHeight: "100vh" }}
        >
          <FloatingBlobs />
          <GridDots opacity={0.06} />

          {/* Top: Logo */}
          <div className="relative z-10 p-10 flex-shrink-0">
            <div className="flex items-center gap-3">
              <LogoMark size="md" />
              <div>
                <p style={{ color: "#fff", fontFamily: F, fontWeight: 700, fontSize: "1rem", lineHeight: 1.2 }}>
                  VetConnect Lite
                </p>
                <p style={{ color: "rgba(255,255,255,0.5)", fontFamily: F, fontSize: "0.7rem" }}>
                  Clinic Management System
                </p>
              </div>
            </div>
          </div>

          {/* Centre: Hero text + features */}
          <div className="relative z-10 px-10 flex-1 flex flex-col justify-center">
            {/* Hero headline */}
            <div className="mb-10">
              <div
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full mb-5"
                style={{ backgroundColor: "rgba(39,174,96,0.18)", border: "1px solid rgba(39,174,96,0.3)" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span style={{ color: "#6FEEA6", fontSize: "0.72rem", fontFamily: F, fontWeight: 600 }}>
                  Trusted by 200+ clinics in Pakistan
                </span>
              </div>
              <h1
                style={{
                  fontFamily: F, fontWeight: 700,
                  fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                  color: "#fff", lineHeight: 1.2,
                  maxWidth: "440px",
                }}
              >
                Modern clinic management, built for Pakistan
              </h1>
              <p
                style={{
                  color: "rgba(255,255,255,0.6)", fontSize: "0.9375rem",
                  fontFamily: F, lineHeight: 1.7,
                  maxWidth: "400px", marginTop: "14px",
                }}
              >
                Manage patients, visits, vaccinations, and invoices — all in one place, even offline.
              </p>
            </div>

            {/* Feature points */}
            <div className="space-y-6">
              {FEATURES.map((f, i) => (
                <FeaturePoint key={i} {...f} delay={i * 120} />
              ))}
            </div>

            {/* Testimonial */}
            <div
              className="mt-10 p-4 rounded-2xl flex items-start gap-3"
              style={{ backgroundColor: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: C.accent, fontSize: "0.8rem", fontWeight: 700, color: "#fff", fontFamily: F }}
              >
                DR
              </div>
              <div>
                <div className="flex gap-0.5 mb-1">
                  {[1,2,3,4,5].map((s) => (
                    <Star key={s} size={12} fill={C.accent} color={C.accent} />
                  ))}
                </div>
                <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.8125rem", fontFamily: F, lineHeight: 1.6 }}>
                  "Transformed how we manage 40+ patients daily. The offline mode is a lifesaver."
                </p>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.72rem", fontFamily: F, marginTop: "4px" }}>
                  Dr. Raza Hassan · City Veterinary Clinic, Lahore
                </p>
              </div>
            </div>
          </div>

          {/* Bottom: copyright */}
          <div className="relative z-10 p-10 flex-shrink-0">
            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.72rem", fontFamily: F }}>
              © 2026 VetConnect Lite · All rights reserved
            </p>
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div
          className="flex flex-col items-center justify-center relative overflow-y-auto"
          style={{ flex: "0 0 50%", backgroundColor: C.card, padding: "40px 24px" }}
        >
          {/* Online indicator - top right */}
          <div
            className="absolute top-6 right-6 flex items-center gap-1.5 rounded-full px-3 py-1.5"
            style={{ backgroundColor: offline ? "#FEF9E7" : C.successLt, border: `1px solid ${offline ? "#F9E07A" : "#A9DFBF"}` }}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: offline ? C.warning : C.success }}
            />
            <span style={{ color: offline ? "#92600A" : "#1E8449", fontSize: "0.72rem", fontFamily: F, fontWeight: 600 }}>
              {offline ? "Offline" : "Online"}
            </span>
          </div>

          {/* Centered form container */}
          <div style={{ width: "100%", maxWidth: "380px" }}>

            {/* Small logo (right panel) */}
            <div className="flex items-center gap-2 mb-8">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${C.primary}, ${C.primaryMd})` }}
              >
                <PawPrint size={15} color="#fff" strokeWidth={1.8} />
              </div>
              <span style={{ fontFamily: F, fontWeight: 700, fontSize: "0.875rem", color: C.primary }}>
                VetConnect Lite
              </span>
            </div>

            {/* Form */}
            <LoginForm onSuccess={() => {}} />

            {/* Footer note */}
            <div className="mt-8 pt-6 border-t" style={{ borderColor: C.border }}>
              <p className="text-center text-xs" style={{ color: C.muted, fontFamily: F }}>
                Restricted to authorised clinic staff only.
                <br />
                Contact your clinic administrator for access.
              </p>
            </div>
          </div>

          {/* Version footer */}
          <p
            className="absolute bottom-6 left-0 right-0 text-center text-xs"
            style={{ color: C.muted, fontFamily: F }}
          >
            Desktop view · 1280px+ · VetConnect Lite v2.0
          </p>
        </div>
      </div>

      {/* Offline toggle (demo) */}
      <button
        onClick={() => setOffline((v: boolean) => !v)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold shadow-xl transition-all"
        style={{
          backgroundColor: offline ? C.warning : C.success,
          color: "#fff",
          fontFamily: F,
          boxShadow: `0 8px 24px ${offline ? "rgba(243,156,18,0.4)" : "rgba(39,174,96,0.4)"}`,
        }}
      >
        {offline ? <Wifi size={15} /> : <WifiOff size={15} />}
        {offline ? "Go Online" : "Simulate Offline"}
      </button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ROOT COMPONENT — picks layout by breakpoint
// ═══════════════════════════════════════════════════════════════════════════════
export function LoginResponsivePage() {
  const { isMobile, isTablet, isDesktop } = useBreakpoint();
  const [offline, setOffline] = useState(false);

  if (isMobile)  return <MobileLayout  offline={offline} setOffline={setOffline} />;
  if (isTablet)  return <TabletLayout  offline={offline} setOffline={setOffline} />;
  return               <DesktopLayout  offline={offline} setOffline={setOffline} />;
}