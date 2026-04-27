import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router";
import {
  Eye, EyeOff, Check, PawPrint, ChevronDown,
  Upload, AlertCircle, ArrowRight, Shield, Star, Activity
} from "lucide-react";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";

const FONT_BODY = "'Plus Jakarta Sans', sans-serif";
const FONT_HEADING = "'DM Serif Display', serif";

const CITIES = [
  "Faisalabad", "Lahore", "Karachi", "Islamabad", "Rawalpindi",
  "Multan", "Peshawar", "Quetta", "Sialkot", "Gujranwala",
  "Hyderabad", "Bahawalpur", "Sargodha", "Abbottabad", "Other",
];

const VET_SPECIALTIES = [
  "General Practice",
  "Small Animal Medicine",
  "Large Animal Medicine",
  "Surgery",
  "Dermatology",
  "Dentistry",
  "Oncology",
  "Cardiology",
  "Ophthalmology",
  "Exotic Animals",
  "Poultry & Livestock",
  "Wildlife Medicine",
];

/* ─── Password Strength ─────────────────────────────────── */
function getPasswordStrength(password: string): {
  score: number; label: string; color: string; bg: string;
} {
  if (!password) return { score: 0, label: "", color: "", bg: "" };
  let score = 0;
  if (password.length >= 6) score++;
  if (password.length >= 10) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { score: 1, label: "Weak", color: "text-red-500", bg: "bg-red-500" };
  if (score === 2) return { score: 2, label: "Fair", color: "text-orange-500", bg: "bg-orange-400" };
  if (score === 3) return { score: 3, label: "Good", color: "text-[#1B4F72]", bg: "bg-[#1B4F72]" };
  return { score: 4, label: "Strong", color: "text-[#27AE60]", bg: "bg-[#27AE60]" };
}

/* ─── Input Component ───────────────────────────────────── */
function Field({
  label, required, children,
}: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label
        className="block text-sm font-semibold text-gray-700 mb-1.5"
        style={{ fontFamily: FONT_BODY }}
      >
        {label}
        {required && <span className="text-[#E67E22] ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-[#1B4F72] focus:ring-2 focus:ring-[#1B4F72]/10 transition bg-white";

/* ─── Left Panel ─────────────────────────────────────────── */
function LeftPanel() {
  const benefits = [
    { icon: <Check size={14} />, text: "Free for pet owners — forever" },
    { icon: <Shield size={14} />, text: "Verified veterinarians only" },
    { icon: <Activity size={14} />, text: "Complete health tracking" },
  ];

  return (
    <div
      className="hidden lg:flex flex-col justify-between p-10 xl:p-14 relative overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #0d2f44 0%, #1B4F72 50%, #2471a3 100%)",
        minHeight: "100vh",
      }}
    >
      {/* Decorative blobs */}
      <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-white/5 pointer-events-none" />
      <div className="absolute bottom-20 -right-20 w-72 h-72 rounded-full bg-[#E67E22]/10 pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-40 h-40 rounded-full bg-white/3 pointer-events-none" />

      {/* Logo */}
      <div className="relative z-10">
        <Link to="/vetconnect" className="inline-flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md"
            style={{ background: "linear-gradient(135deg, #E67E22, #d06c14)" }}
          >
            <PawPrint size={20} className="text-white" />
          </div>
          <span className="text-white text-2xl" style={{ fontFamily: FONT_HEADING }}>
            VetConnect
          </span>
        </Link>
      </div>

      {/* Illustration */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center py-8">
        <div className="w-full max-w-xs xl:max-w-sm rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1753685724521-8b37790adfcc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHdvbWFuJTIwd2l0aCUyMGRvZyUyMGNhdCUyMHBldCUyMG93bmVyJTIwc21pbGluZ3xlbnwxfHx8fDE3NzcyNzQwNzV8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Happy pet owner with dog"
            className="w-full h-64 xl:h-72 object-cover"
          />
        </div>

        {/* Tagline */}
        <div className="text-center mt-8">
          <h2
            className="text-white text-2xl xl:text-3xl leading-snug"
            style={{ fontFamily: FONT_HEADING }}
          >
            Join Pakistan&apos;s Growing<br />Pet Care Community
          </h2>
          <p className="text-blue-200 mt-2 text-sm">
            Trusted by 50,000+ pet owners across Pakistan
          </p>
        </div>

        {/* Benefits */}
        <ul className="mt-8 space-y-3 w-full max-w-xs">
          {benefits.map((b) => (
            <li key={b.text} className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-[#27AE60] flex items-center justify-center flex-shrink-0 text-white">
                {b.icon}
              </span>
              <span className="text-blue-100 text-sm" style={{ fontFamily: FONT_BODY }}>
                {b.text}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer note */}
      <div className="relative z-10 text-blue-300 text-xs text-center" style={{ fontFamily: FONT_BODY }}>
        © 2026 VetConnect Pakistan · All Rights Reserved
      </div>
    </div>
  );
}

/* ─── Main Page ─────────────────────────────────────────── */
export function SignUpPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState<"owner" | "vet">("owner");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [certFileName, setCertFileName] = useState("");

  const [form, setForm] = useState({
    fullName: "", email: "", phone: "", city: "",
    password: "", confirmPassword: "",
    // vet only
    pmdc: "", specialty: "", clinicName: "", clinicAddress: "", experience: "",
  });

  const strength = useMemo(() => getPasswordStrength(form.password), [form.password]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) setCertFileName(file.name);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!agreed) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1600);
  }

  const passwordMatch =
    form.confirmPassword.length > 0 && form.password === form.confirmPassword;
  const passwordMismatch =
    form.confirmPassword.length > 0 && form.password !== form.confirmPassword;

  if (submitted) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{ background: "linear-gradient(135deg, #0d2f44, #1B4F72 60%, #2471a3)", fontFamily: FONT_BODY }}
      >
        <div className="bg-white rounded-3xl p-12 max-w-md w-full text-center shadow-2xl">
          <div className="w-20 h-20 rounded-full bg-[#27AE60]/10 flex items-center justify-center mx-auto mb-6">
            <Check size={40} className="text-[#27AE60]" strokeWidth={2.5} />
          </div>
          <h2 className="text-[#1B4F72] mb-3 text-3xl" style={{ fontFamily: FONT_HEADING }}>
            {role === "vet" ? "Application Submitted!" : "Welcome to VetConnect!"}
          </h2>
          <p className="text-gray-500 mb-2 text-sm leading-relaxed">
            {role === "vet"
              ? "Thanks for applying as a veterinarian. Your PMDC certificate is under review. We'll notify you within 48 hours once your profile is verified."
              : `Account created successfully for ${form.fullName || "you"}! Start exploring verified vets near you.`}
          </p>
          {role === "vet" && (
            <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-amber-700 text-xs flex items-start gap-2 text-left">
              <AlertCircle size={15} className="flex-shrink-0 mt-0.5" />
              <span>Profile verification usually takes 24–48 hours on business days.</span>
            </div>
          )}
          <div className="mt-8 flex flex-col gap-3">
            <button
              onClick={() => navigate("/vetconnect")}
              className="w-full py-3.5 rounded-xl bg-[#E67E22] hover:bg-[#d06c14] text-white font-semibold transition-colors flex items-center justify-center gap-2"
            >
              Go to Home <ArrowRight size={16} />
            </button>
            <button
              onClick={() => navigate("/vetconnect/find-vet")}
              className="w-full py-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium transition-colors"
            >
              Browse Veterinarians
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen grid lg:grid-cols-2"
      style={{ fontFamily: FONT_BODY }}
    >
      {/* ── LEFT PANEL ── */}
      <LeftPanel />

      {/* ── RIGHT PANEL ── */}
      <div className="flex flex-col min-h-screen bg-white overflow-y-auto">
        {/* Mobile logo bar */}
        <div
          className="lg:hidden flex items-center gap-2.5 px-6 py-5 border-b border-gray-100"
          style={{ background: "#0d2f44" }}
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg,#E67E22,#d06c14)" }}
          >
            <PawPrint size={16} className="text-white" />
          </div>
          <span className="text-white" style={{ fontFamily: FONT_HEADING, fontSize: "1.25rem" }}>
            VetConnect
          </span>
        </div>

        <div className="flex-1 px-6 sm:px-10 xl:px-16 py-10">
          {/* Heading */}
          <div className="mb-8">
            <h1
              className="text-[#1B4F72] mb-1"
              style={{ fontFamily: FONT_HEADING, fontSize: "clamp(1.7rem, 3vw, 2.2rem)" }}
            >
              Create Your Account
            </h1>
            <p className="text-gray-500 text-sm">
              Join thousands of pet owners and vets on VetConnect.
            </p>
          </div>

          {/* ── ROLE TOGGLE ── */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            {(["owner", "vet"] as const).map((r) => {
              const active = role === r;
              return (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={`flex flex-col items-center gap-2 py-4 px-3 rounded-2xl border-2 transition-all ${
                    active
                      ? "border-[#1B4F72] bg-[#1B4F72]/5"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <span className="text-2xl">{r === "owner" ? "🐾" : "🩺"}</span>
                  <span
                    className={`text-sm font-semibold ${active ? "text-[#1B4F72]" : "text-gray-500"}`}
                  >
                    {r === "owner" ? "I'm a Pet Owner" : "I'm a Veterinarian"}
                  </span>
                  {active && (
                    <span className="text-xs bg-[#1B4F72] text-white px-2 py-0.5 rounded-full">
                      Selected
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* ── FORM ── */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Vet notice */}
            {role === "vet" && (
              <div className="flex items-start gap-2.5 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
                <AlertCircle size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-amber-700 text-xs leading-relaxed">
                  Your profile will be reviewed by our team. Please ensure your PMDC certificate is valid and clearly visible.
                  <strong className="block mt-0.5">Verification takes up to 48 hours.</strong>
                </p>
              </div>
            )}

            {/* COMMON FIELDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Full Name" required>
                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Ahmed Raza"
                  className={inputCls}
                />
              </Field>

              <Field label="Email Address" required>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  className={inputCls}
                />
              </Field>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Phone with +92 prefix */}
              <Field label="Phone Number" required>
                <div className="flex">
                  <span
                    className="flex items-center px-3 bg-gray-50 border border-r-0 border-gray-200 rounded-l-xl text-sm text-gray-600 font-semibold flex-shrink-0"
                  >
                    🇵🇰 +92
                  </span>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    placeholder="3XX XXXXXXX"
                    className="flex-1 border border-gray-200 rounded-r-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-[#1B4F72] focus:ring-2 focus:ring-[#1B4F72]/10 transition"
                  />
                </div>
              </Field>

              {/* City */}
              <Field label="City" required>
                <div className="relative">
                  <select
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    required
                    className={`${inputCls} appearance-none pr-10`}
                  >
                    <option value="">Select your city…</option>
                    {CITIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  <ChevronDown size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </Field>
            </div>

            {/* ── VET EXTRA FIELDS ── */}
            {role === "vet" && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="PMDC Registration Number" required>
                    <input
                      type="text"
                      name="pmdc"
                      value={form.pmdc}
                      onChange={handleChange}
                      required
                      placeholder="e.g. VET-12345"
                      className={inputCls}
                    />
                  </Field>

                  <Field label="Specialty" required>
                    <div className="relative">
                      <select
                        name="specialty"
                        value={form.specialty}
                        onChange={handleChange}
                        required
                        className={`${inputCls} appearance-none pr-10`}
                      >
                        <option value="">Select specialty…</option>
                        {VET_SPECIALTIES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      <ChevronDown size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </Field>
                </div>

                <Field label="Clinic Name" required>
                  <input
                    type="text"
                    name="clinicName"
                    value={form.clinicName}
                    onChange={handleChange}
                    required
                    placeholder="e.g. PawCare Veterinary Clinic"
                    className={inputCls}
                  />
                </Field>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Clinic Address" required>
                    <input
                      type="text"
                      name="clinicAddress"
                      value={form.clinicAddress}
                      onChange={handleChange}
                      required
                      placeholder="Street, Area, City"
                      className={inputCls}
                    />
                  </Field>

                  <Field label="Years of Experience" required>
                    <div className="relative">
                      <select
                        name="experience"
                        value={form.experience}
                        onChange={handleChange}
                        required
                        className={`${inputCls} appearance-none pr-10`}
                      >
                        <option value="">Select…</option>
                        <option value="0-1">Less than 1 year</option>
                        <option value="1-3">1–3 years</option>
                        <option value="3-5">3–5 years</option>
                        <option value="5-10">5–10 years</option>
                        <option value="10+">10+ years</option>
                      </select>
                      <ChevronDown size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </Field>
                </div>

                {/* Certificate upload */}
                <Field label="PMDC Certificate (PDF or Image)" required>
                  <label
                    className={`flex items-center justify-between gap-3 border-2 border-dashed rounded-xl px-4 py-4 cursor-pointer transition-colors ${
                      certFileName
                        ? "border-[#27AE60] bg-[#27AE60]/5"
                        : "border-gray-200 hover:border-[#1B4F72]/40 bg-gray-50 hover:bg-[#1B4F72]/3"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${certFileName ? "bg-[#27AE60]/10" : "bg-white border border-gray-200"}`}>
                        {certFileName
                          ? <Check size={16} className="text-[#27AE60]" />
                          : <Upload size={16} className="text-gray-400" />}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-700">
                          {certFileName || "Upload PMDC Certificate"}
                        </p>
                        <p className="text-xs text-gray-400">PDF, JPG or PNG · Max 5MB</p>
                      </div>
                    </div>
                    <span className="text-xs text-[#1B4F72] font-semibold flex-shrink-0">
                      {certFileName ? "Change" : "Browse"}
                    </span>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                </Field>
              </>
            )}

            {/* PASSWORD */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Field label="Password" required>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      required
                      placeholder="Min. 8 characters"
                      className={`${inputCls} pr-11`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>
                  </div>
                </Field>

                {/* Strength bar */}
                {form.password.length > 0 && (
                  <div className="mt-2">
                    <div className="flex gap-1 mb-1">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                            i <= strength.score ? strength.bg : "bg-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                    <p className={`text-xs font-semibold ${strength.color}`}>
                      {strength.label}
                    </p>
                  </div>
                )}
              </div>

              <Field label="Confirm Password" required>
                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    required
                    placeholder="Re-enter password"
                    className={`${inputCls} pr-11 ${
                      passwordMismatch
                        ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                        : passwordMatch
                        ? "border-[#27AE60] focus:border-[#27AE60] focus:ring-green-100"
                        : ""
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirm ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                  {passwordMatch && (
                    <Check size={15} className="absolute right-9 top-1/2 -translate-y-1/2 text-[#27AE60]" />
                  )}
                </div>
                {passwordMismatch && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle size={12} /> Passwords do not match
                  </p>
                )}
              </Field>
            </div>

            {/* TERMS */}
            <label className="flex items-start gap-3 cursor-pointer group">
              <div
                onClick={() => setAgreed(!agreed)}
                className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
                  agreed
                    ? "bg-[#1B4F72] border-[#1B4F72]"
                    : "border-gray-300 group-hover:border-[#1B4F72]/40"
                }`}
              >
                {agreed && <Check size={11} className="text-white" strokeWidth={3} />}
              </div>
              <span className="text-sm text-gray-600">
                I agree to VetConnect's{" "}
                <a href="#" className="text-[#1B4F72] font-semibold hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-[#1B4F72] font-semibold hover:underline">
                  Privacy Policy
                </a>
              </span>
            </label>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading || !agreed || passwordMismatch}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-[#E67E22] hover:bg-[#d06c14] text-white font-semibold transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
              style={{ fontSize: "1rem" }}
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Creating Account…
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight size={18} />
                </>
              )}
            </button>

            {/* DIVIDER */}
            <div className="flex items-center gap-3 my-1">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400 font-medium">Or sign up with</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* GOOGLE */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold text-sm transition-all"
            >
              {/* Google G icon */}
              <svg viewBox="0 0 24 24" className="w-5 h-5">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Continue with Google
            </button>

            {/* LOG IN LINK */}
            <p className="text-center text-sm text-gray-500 pt-2">
              Already have an account?{" "}
              <Link to="/login" className="text-[#1B4F72] font-semibold hover:underline">
                Log In
              </Link>
            </p>
          </form>
        </div>

        {/* Mobile footer */}
        <div className="lg:hidden px-6 py-4 border-t border-gray-100 text-center text-xs text-gray-400">
          © 2026 VetConnect Pakistan
        </div>
      </div>
    </div>
  );
}
