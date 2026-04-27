import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import {
  PawPrint, ChevronRight, ChevronDown, CheckCircle2, Check,
  Upload, X, Phone, Mail, MapPin, FileText, Building2,
  CreditCard, Banknote, Smartphone, MoreHorizontal,
  AlertCircle, ArrowLeft, Loader2, Receipt, Percent,
  Shield, Sparkles, Eye,
} from "lucide-react";

// ─── TOKENS ───────────────────────────────────────────────────────────────────
const C = {
  primary:   "#1B4F72",
  primaryDk: "#0D2F4F",
  primaryMd: "#2874A6",
  primaryLt: "#EBF5FB",
  accent:    "#E67E22",
  accentLt:  "#FEF3E8",
  success:   "#27AE60",
  successDk: "#1E8449",
  successLt: "#EAFAF1",
  warning:   "#F39C12",
  warningLt: "#FEF9E7",
  danger:    "#E74C3C",
  dangerLt:  "#FDEDEC",
  bg:        "#F5F7FA",
  card:      "#FFFFFF",
  text:      "#1A1A2E",
  textLt:    "#5A6178",
  muted:     "#8E94A7",
  border:    "#E8ECF1",
  borderDk:  "#D0D5DD",
  navy:      "#0D2F4F",
};
const F = "'Plus Jakarta Sans', sans-serif";

// ─── BREAKPOINT HOOK ──────────────────────────────────────────────────────────
function useBreakpoint() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1280);
  useEffect(() => {
    const fn = () => setW(window.innerWidth);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return { isMobile: w < 768, isTablet: w >= 768 && w < 1280, isDesktop: w >= 1280 };
}

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const CITIES = [
  "Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad",
  "Multan", "Peshawar", "Quetta", "Sialkot", "Gujranwala",
  "Hyderabad", "Abbottabad", "Bahawalpur", "Sargodha", "Sukkur",
];
const CURRENCIES = [
  { code: "PKR", label: "PKR — Pakistani Rupee" },
  { code: "USD", label: "USD — US Dollar" },
  { code: "AED", label: "AED — UAE Dirham" },
  { code: "GBP", label: "GBP — British Pound" },
  { code: "EUR", label: "EUR — Euro" },
];
const PAYMENT_METHODS = [
  { key: "cash",   label: "Cash",   Icon: Banknote },
  { key: "card",   label: "Card",   Icon: CreditCard },
  { key: "online", label: "Online", Icon: Smartphone },
  { key: "other",  label: "Other",  Icon: MoreHorizontal },
];
const CURR_SYMBOLS: Record<string, string> = {
  PKR: "₨", USD: "$", AED: "د.إ", GBP: "£", EUR: "€",
};

// ─── FORM DATA ────────────────────────────────────────────────────────────────
interface Step1 {
  clinicName:    string;
  address:       string;
  city:          string;
  phone:         string;
  email:         string;
  licenseNumber: string;
  logoPreview:   string;
}
interface Step2 {
  currency:       string;
  taxRate:        string;
  invoicePrefix:  string;
  paymentMethods: string[];
}

// ─── SHARED INPUT COMPONENTS ──────────────────────────────────────────────────
function Label({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block mb-1.5 text-xs font-semibold uppercase tracking-wide" style={{ color: C.textLt, fontFamily: F }}>
      {children}
      {required && <span className="ml-1" style={{ color: C.danger }}>*</span>}
    </label>
  );
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <p className="flex items-center gap-1.5 mt-1.5 text-xs" style={{ color: C.danger, fontFamily: F }}>
      <AlertCircle size={11} /> {msg}
    </p>
  );
}

function TextInput({
  value, onChange, placeholder, icon, error, disabled, readOnly, prefix,
}: {
  value: string; onChange: (v: string) => void; placeholder?: string;
  icon?: React.ReactNode; error?: string; disabled?: boolean; readOnly?: boolean; prefix?: string;
}) {
  const [focused, setFocused] = useState(false);
  const borderColor = error ? C.danger : focused ? C.primary : C.border;
  return (
    <>
      <div
        className="flex items-center rounded-xl transition-all duration-150"
        style={{
          height: "48px",
          backgroundColor: disabled || readOnly ? "#F8FAFC" : focused ? "#fff" : "#F8FAFC",
          border: `1.5px solid ${borderColor}`,
          boxShadow: focused ? `0 0 0 3px ${error ? "rgba(231,76,60,0.1)" : C.primaryLt}` : "none",
          overflow: "hidden",
        }}
      >
        {prefix && (
          <div
            className="flex items-center justify-center h-full px-3 flex-shrink-0 border-r"
            style={{ backgroundColor: C.border, borderColor: borderColor, color: C.textLt, fontSize: "0.875rem", fontFamily: F, fontWeight: 600 }}
          >
            {prefix}
          </div>
        )}
        {icon && !prefix && (
          <span className="pl-3.5 flex-shrink-0" style={{ color: focused ? C.primary : C.muted, display: "flex" }}>
            {icon}
          </span>
        )}
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          className="flex-1 bg-transparent outline-none text-sm px-3.5"
          style={{ color: C.text, fontFamily: F, height: "100%" }}
        />
      </div>
      <FieldError msg={error} />
    </>
  );
}

function TextareaInput({
  value, onChange, placeholder, error, rows = 3,
}: {
  value: string; onChange: (v: string) => void; placeholder?: string; error?: string; rows?: number;
}) {
  const [focused, setFocused] = useState(false);
  const borderColor = error ? C.danger : focused ? C.primary : C.border;
  return (
    <>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        rows={rows}
        className="w-full outline-none text-sm p-3.5 transition-all duration-150 resize-none rounded-xl"
        style={{
          backgroundColor: focused ? "#fff" : "#F8FAFC",
          border: `1.5px solid ${borderColor}`,
          boxShadow: focused ? `0 0 0 3px ${C.primaryLt}` : "none",
          color: C.text,
          fontFamily: F,
        }}
      />
      <FieldError msg={error} />
    </>
  );
}

function SelectInput({
  value, onChange, options, placeholder, error,
}: {
  value: string; onChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string; error?: string;
}) {
  const [focused, setFocused] = useState(false);
  const borderColor = error ? C.danger : focused ? C.primary : C.border;
  return (
    <>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full outline-none text-sm appearance-none pr-10 pl-3.5 rounded-xl transition-all duration-150"
          style={{
            height: "48px",
            backgroundColor: focused ? "#fff" : "#F8FAFC",
            border: `1.5px solid ${borderColor}`,
            boxShadow: focused ? `0 0 0 3px ${C.primaryLt}` : "none",
            color: value ? C.text : C.muted,
            fontFamily: F,
            cursor: "pointer",
          }}
        >
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {options.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <ChevronDown
          size={16}
          className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
          style={{ color: C.muted }}
        />
      </div>
      <FieldError msg={error} />
    </>
  );
}

// ─── LOGO UPLOAD ─────────────────────────────────────────────────────────────
function LogoUpload({
  preview, onUpload, onRemove,
}: {
  preview: string; onUpload: (dataUrl: string) => void; onRemove: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => onUpload(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div
      onClick={() => !preview && inputRef.current?.click()}
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault(); setDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) handleFile(file);
      }}
      className="relative flex flex-col items-center justify-center rounded-2xl transition-all duration-200"
      style={{
        height: "120px",
        border: `2px dashed ${dragging ? C.primary : preview ? C.success : C.border}`,
        backgroundColor: dragging ? C.primaryLt : preview ? C.successLt : "#F8FAFC",
        cursor: preview ? "default" : "pointer",
      }}
    >
      {preview ? (
        <>
          <img src={preview} alt="Logo" className="h-16 w-auto object-contain rounded-xl" />
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onRemove(); }}
            className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center shadow"
            style={{ backgroundColor: C.danger, color: "#fff" }}
          >
            <X size={12} />
          </button>
          <p className="absolute bottom-2 text-xs" style={{ color: C.success, fontFamily: F, fontWeight: 600 }}>
            Logo uploaded ✓
          </p>
        </>
      ) : (
        <>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-2" style={{ backgroundColor: C.primaryLt }}>
            <Upload size={18} style={{ color: C.primary }} />
          </div>
          <p className="text-sm font-semibold" style={{ color: C.primary, fontFamily: F }}>
            {dragging ? "Drop here!" : "Upload Clinic Logo"}
          </p>
          <p className="text-xs mt-0.5" style={{ color: C.muted, fontFamily: F }}>PNG, JPG up to 2MB · optional</p>
        </>
      )}
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
    </div>
  );
}

// ─── PROGRESS BAR ─────────────────────────────────────────────────────────────
function ProgressBar({ step }: { step: 1 | 2 }) {
  const pct = step === 1 ? 50 : 100;
  const steps = ["Clinic Information", "Billing Settings"];
  return (
    <div style={{ fontFamily: F }}>
      <div className="flex items-center justify-between mb-2">
        {steps.map((label, i) => {
          const done = i + 1 < step;
          const active = i + 1 === step;
          return (
            <div key={label} className="flex items-center gap-1.5">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all duration-300"
                style={{
                  backgroundColor: done ? C.success : active ? C.primary : C.border,
                  color: done || active ? "#fff" : C.muted,
                }}
              >
                {done ? <Check size={12} strokeWidth={2.5} /> : i + 1}
              </div>
              <span
                className="text-xs font-semibold hidden sm:block"
                style={{ color: active ? C.primary : done ? C.success : C.muted }}
              >
                {label}
              </span>
            </div>
          );
        })}
        <span className="text-xs font-bold" style={{ color: C.primary }}>{pct}%</span>
      </div>
      <div className="relative h-2 rounded-full overflow-hidden" style={{ backgroundColor: C.border }}>
        <div
          className="absolute inset-y-0 left-0 rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${pct}%`,
            background: pct === 100 ? `linear-gradient(90deg, ${C.success}, #2ECC71)` : `linear-gradient(90deg, ${C.primary}, ${C.primaryMd})`,
          }}
        />
      </div>
    </div>
  );
}

// ─── PAYMENT METHOD CHIP ──────────────────────────────────────────────────────
function PaymentChip({
  label, Icon: IconComp, selected, onClick,
}: {
  label: string; Icon: any; selected: boolean; onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-2 rounded-xl px-4 py-2.5 transition-all duration-150 font-semibold text-sm"
      style={{
        border: `1.5px solid ${selected ? C.primary : C.border}`,
        backgroundColor: selected ? C.primaryLt : "#F8FAFC",
        color: selected ? C.primary : C.muted,
        fontFamily: F,
      }}
    >
      <IconComp size={15} strokeWidth={selected ? 2.2 : 1.6} />
      {label}
      {selected && <Check size={13} strokeWidth={2.5} style={{ color: C.primary }} />}
    </button>
  );
}

// ─── LIVE PREVIEW PANEL ───────────────────────────────────────────────────────
function LivePreviewPanel({ s1, s2, step }: { s1: Step1; s2: Step2; step: 1 | 2 }) {
  const sym = CURR_SYMBOLS[s2.currency] || "₨";
  const prefix = s2.invoicePrefix || "INV-";
  const taxAmt = Math.round(1500 * (parseFloat(s2.taxRate) || 0) / 100);
  const total = 1500 + taxAmt;
  const today = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

  return (
    <div className="flex flex-col gap-5 flex-1 min-w-0">
      {/* Preview header */}
      <div className="flex items-center gap-2">
        <div className="w-1.5 h-5 rounded-full" style={{ backgroundColor: C.accent }} />
        <p style={{ fontFamily: F, fontWeight: 700, fontSize: "0.875rem", color: C.text }}>Live Preview</p>
        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full ml-1" style={{ backgroundColor: C.primaryLt }}>
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: C.primary }} />
          <span style={{ fontSize: "0.65rem", color: C.primary, fontFamily: F, fontWeight: 600 }}>Live</span>
        </div>
      </div>

      {/* Clinic Profile Card */}
      <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${C.border}`, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
        {/* Card header */}
        <div className="px-5 py-3 flex items-center gap-2" style={{ background: `linear-gradient(135deg, ${C.navy}, ${C.primary})` }}>
          <Eye size={13} style={{ color: "rgba(255,255,255,0.6)" }} />
          <span style={{ color: "rgba(255,255,255,0.6)", fontFamily: F, fontSize: "0.7rem" }}>Clinic Profile Card</span>
        </div>
        <div className="p-5 flex gap-4">
          {/* Logo / initials */}
          <div
            className="w-14 h-14 rounded-xl flex-shrink-0 flex items-center justify-center overflow-hidden"
            style={{
              backgroundColor: s1.logoPreview ? "transparent" : C.primaryLt,
              border: `2px solid ${C.border}`,
            }}
          >
            {s1.logoPreview ? (
              <img src={s1.logoPreview} alt="Logo" className="w-full h-full object-cover" />
            ) : s1.clinicName ? (
              <span style={{ fontFamily: F, fontWeight: 700, fontSize: "1.25rem", color: C.primary }}>
                {s1.clinicName.charAt(0).toUpperCase()}
              </span>
            ) : (
              <PawPrint size={24} style={{ color: C.muted }} />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p style={{ fontFamily: F, fontWeight: 700, fontSize: "1rem", color: C.text, lineHeight: 1.2 }}>
              {s1.clinicName || <span style={{ color: C.muted, fontWeight: 400 }}>Clinic Name</span>}
            </p>
            {(s1.address || s1.city) && (
              <div className="flex items-start gap-1 mt-1.5">
                <MapPin size={12} style={{ color: C.muted, flexShrink: 0, marginTop: "2px" }} />
                <p style={{ fontFamily: F, fontSize: "0.78rem", color: C.textLt, lineHeight: 1.5 }}>
                  {[s1.address, s1.city].filter(Boolean).join(", ")}
                </p>
              </div>
            )}
            <div className="flex flex-wrap gap-3 mt-2">
              {s1.phone && (
                <div className="flex items-center gap-1">
                  <Phone size={11} style={{ color: C.muted }} />
                  <span style={{ fontFamily: F, fontSize: "0.72rem", color: C.textLt }}>+92 {s1.phone}</span>
                </div>
              )}
              {s1.email && (
                <div className="flex items-center gap-1">
                  <Mail size={11} style={{ color: C.muted }} />
                  <span style={{ fontFamily: F, fontSize: "0.72rem", color: C.textLt }}>{s1.email}</span>
                </div>
              )}
            </div>
            {s1.licenseNumber && (
              <div className="flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded-full w-fit" style={{ backgroundColor: C.primaryLt }}>
                <Shield size={10} style={{ color: C.primary }} />
                <span style={{ fontFamily: F, fontSize: "0.65rem", color: C.primary, fontWeight: 600 }}>
                  Lic: {s1.licenseNumber}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sample Invoice */}
      {step === 2 && (
        <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${C.border}`, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
          <div className="px-5 py-3 flex items-center gap-2" style={{ background: `linear-gradient(135deg, ${C.accent}, #D35400)` }}>
            <Receipt size={13} style={{ color: "rgba(255,255,255,0.8)" }} />
            <span style={{ color: "#fff", fontFamily: F, fontSize: "0.7rem", fontWeight: 600 }}>Sample Invoice</span>
          </div>
          <div className="p-5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p style={{ fontFamily: F, fontWeight: 700, fontSize: "1rem", color: C.text }}>{prefix}001</p>
                <p style={{ fontFamily: F, fontSize: "0.72rem", color: C.muted, marginTop: "2px" }}>{today}</p>
              </div>
              <div className="text-right">
                <p style={{ fontFamily: F, fontWeight: 700, fontSize: "0.8rem", color: C.primary }}>
                  {s1.clinicName || "Clinic Name"}
                </p>
                {s1.city && <p style={{ fontFamily: F, fontSize: "0.7rem", color: C.muted }}>{s1.city}</p>}
              </div>
            </div>

            <div className="rounded-xl overflow-hidden mb-3" style={{ border: `1px solid ${C.border}` }}>
              <div className="px-3 py-1.5" style={{ backgroundColor: C.bg }}>
                <div className="flex justify-between text-xs" style={{ color: C.muted, fontFamily: F }}>
                  <span>Item</span><span>Amount</span>
                </div>
              </div>
              <div className="px-3 py-2 space-y-1.5">
                <div className="flex justify-between text-xs" style={{ fontFamily: F }}>
                  <span style={{ color: C.text }}>General Consultation</span>
                  <span style={{ color: C.text, fontWeight: 600 }}>{sym}1,500</span>
                </div>
                {parseFloat(s2.taxRate) > 0 && (
                  <div className="flex justify-between text-xs" style={{ fontFamily: F }}>
                    <span style={{ color: C.muted }}>Tax ({s2.taxRate}%)</span>
                    <span style={{ color: C.muted }}>{sym}{taxAmt.toLocaleString()}</span>
                  </div>
                )}
              </div>
              <div className="px-3 py-2 border-t flex justify-between" style={{ borderColor: C.border, backgroundColor: C.primaryLt }}>
                <span style={{ fontFamily: F, fontWeight: 700, fontSize: "0.8rem", color: C.primary }}>Total</span>
                <span style={{ fontFamily: F, fontWeight: 700, fontSize: "0.875rem", color: C.primary }}>{sym}{total.toLocaleString()}</span>
              </div>
            </div>

            {s2.paymentMethods.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                <span style={{ fontFamily: F, fontSize: "0.65rem", color: C.muted }}>Accepted:</span>
                {s2.paymentMethods.map((m) => {
                  const pm = PAYMENT_METHODS.find((p) => p.key === m);
                  return (
                    <span
                      key={m}
                      className="px-2 py-0.5 rounded-full text-xs"
                      style={{ backgroundColor: C.successLt, color: C.success, fontFamily: F, fontWeight: 600 }}
                    >
                      {pm?.label}
                    </span>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Step 1: Prompt */}
      {step === 1 && (
        <div
          className="rounded-2xl p-5 flex items-start gap-3"
          style={{ backgroundColor: C.primaryLt, border: `1px solid #BDD7EE` }}
        >
          <Sparkles size={16} style={{ color: C.primary, flexShrink: 0, marginTop: "2px" }} />
          <div>
            <p style={{ fontFamily: F, fontWeight: 600, fontSize: "0.8rem", color: C.primary }}>
              Preview updates live
            </p>
            <p style={{ fontFamily: F, fontSize: "0.75rem", color: C.textLt, marginTop: "2px", lineHeight: 1.6 }}>
              Your clinic profile card updates as you fill in the form. Complete billing settings in Step 2 to see the invoice preview.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── SUCCESS OVERLAY ──────────────────────────────────────────────────────────
function SuccessOverlay({ clinicName, onDashboard }: { clinicName: string; onDashboard: () => void }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 80); return () => clearTimeout(t); }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      style={{
        backgroundColor: "rgba(13,47,79,0.85)",
        backdropFilter: "blur(12px)",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.4s ease",
      }}
    >
      <div
        className="flex flex-col items-center text-center"
        style={{
          backgroundColor: C.card,
          borderRadius: "28px",
          padding: "48px 40px",
          maxWidth: "400px",
          width: "100%",
          boxShadow: "0 40px 100px rgba(0,0,0,0.3)",
          transform: visible ? "scale(1) translateY(0)" : "scale(0.92) translateY(20px)",
          transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1)",
          fontFamily: F,
        }}
      >
        {/* Animated checkmark */}
        <div className="relative mb-6">
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center"
            style={{
              background: `radial-gradient(circle, ${C.successLt} 0%, rgba(39,174,96,0.08) 100%)`,
              border: `3px solid ${C.success}`,
            }}
          >
            <CheckCircle2 size={48} style={{ color: C.success }} strokeWidth={1.5} />
          </div>
          {/* Rings */}
          <div
            className="absolute inset-0 rounded-full animate-ping"
            style={{ border: `2px solid ${C.success}`, opacity: 0.25 }}
          />
        </div>

        <p style={{ fontFamily: F, fontWeight: 700, fontSize: "1.5rem", color: C.text, lineHeight: 1.2 }}>
          Clinic Setup Complete!
        </p>
        <p style={{ color: C.muted, fontSize: "0.875rem", marginTop: "8px", lineHeight: 1.65, maxWidth: "280px" }}>
          <strong style={{ color: C.text }}>{clinicName || "Your clinic"}</strong> is ready. You can now start managing patients, visits, and invoices.
        </p>

        {/* Stats */}
        <div className="flex gap-4 my-6">
          {[
            { label: "Patients", val: "0" },
            { label: "Invoices", val: "0" },
            { label: "Synced",   val: "✓" },
          ].map(({ label, val }) => (
            <div key={label} className="flex flex-col items-center">
              <p style={{ fontFamily: F, fontWeight: 700, fontSize: "1.25rem", color: C.primary }}>{val}</p>
              <p style={{ fontFamily: F, fontSize: "0.7rem", color: C.muted }}>{label}</p>
            </div>
          ))}
        </div>

        <button
          onClick={onDashboard}
          className="w-full flex items-center justify-center gap-2 rounded-xl font-semibold transition-all active:scale-95"
          style={{
            height: "52px",
            background: `linear-gradient(135deg, ${C.success}, #2ECC71)`,
            color: "#fff",
            fontSize: "0.9375rem",
            boxShadow: `0 8px 24px rgba(39,174,96,0.35)`,
          }}
        >
          Go to Dashboard
          <ChevronRight size={17} strokeWidth={2.5} />
        </button>

        <p style={{ color: C.muted, fontSize: "0.75rem", marginTop: "16px" }}>
          You can update these settings anytime in <strong style={{ color: C.primary }}>Settings → Clinic Profile</strong>
        </p>
      </div>
    </div>
  );
}

// ─── STEP 1 FORM ─────────────────────────────────────────────────────────────
function Step1Form({
  data, setData, onNext,
}: {
  data: Step1; setData: (d: Step1) => void; onNext: () => void;
}) {
  const [errors, setErrors] = useState<Partial<Record<keyof Step1, string>>>({});

  const validate = () => {
    const e: typeof errors = {};
    if (!data.clinicName.trim()) e.clinicName = "Clinic name is required";
    if (data.phone && !/^\d{9,11}$/.test(data.phone.replace(/\s/g, "")))
      e.phone = "Enter a valid number (after +92)";
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      e.email = "Enter a valid email address";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => { if (validate()) onNext(); };
  const up = (k: keyof Step1) => (v: any) => setData({ ...data, [k]: v });

  return (
    <div className="space-y-5">
      {/* Clinic Name */}
      <div>
        <Label required>Clinic Name</Label>
        <TextInput value={data.clinicName} onChange={up("clinicName")} placeholder="City Veterinary Clinic" icon={<Building2 size={16} />} error={errors.clinicName} />
      </div>

      {/* Address */}
      <div>
        <Label>Address</Label>
        <TextareaInput value={data.address} onChange={up("address")} placeholder="Shop 12, Block B, Main Boulevard" rows={2} />
      </div>

      {/* City */}
      <div>
        <Label>City</Label>
        <SelectInput
          value={data.city}
          onChange={up("city")}
          placeholder="Select city"
          options={CITIES.map((c) => ({ value: c, label: c }))}
        />
      </div>

      {/* Phone */}
      <div>
        <Label>Phone Number</Label>
        <TextInput value={data.phone} onChange={up("phone")} placeholder="300 0000000" prefix="+92" error={errors.phone} />
      </div>

      {/* Email */}
      <div>
        <Label>Email <span style={{ color: C.muted, fontSize: "0.68rem", fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>(optional)</span></Label>
        <TextInput value={data.email} onChange={up("email")} placeholder="clinic@email.pk" icon={<Mail size={16} />} error={errors.email} />
      </div>

      {/* License */}
      <div>
        <Label>License Number <span style={{ color: C.muted, fontSize: "0.68rem", fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>(optional)</span></Label>
        <TextInput value={data.licenseNumber} onChange={up("licenseNumber")} placeholder="VET-2026-XXXXX" icon={<FileText size={16} />} />
      </div>

      {/* Logo */}
      <div>
        <Label>Clinic Logo <span style={{ color: C.muted, fontSize: "0.68rem", fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>(optional)</span></Label>
        <LogoUpload
          preview={data.logoPreview}
          onUpload={(url) => setData({ ...data, logoPreview: url })}
          onRemove={() => setData({ ...data, logoPreview: "" })}
        />
      </div>

      {/* Next button */}
      <button
        type="button"
        onClick={handleNext}
        className="w-full flex items-center justify-center gap-2 rounded-xl font-semibold transition-all active:scale-[0.98]"
        style={{
          height: "52px",
          background: `linear-gradient(135deg, ${C.primary}, ${C.primaryMd})`,
          color: "#fff",
          fontSize: "0.9375rem",
          fontFamily: F,
          boxShadow: `0 6px 20px rgba(27,79,114,0.3)`,
          marginTop: "8px",
        }}
      >
        Next — Billing Settings
        <ChevronRight size={17} strokeWidth={2.5} />
      </button>
    </div>
  );
}

// ─── STEP 2 FORM ─────────────────────────────────────────────────────────────
function Step2Form({
  data, setData, onBack, onComplete,
}: {
  data: Step2; setData: (d: Step2) => void; onBack: () => void; onComplete: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [taxErr, setTaxErr] = useState("");

  const togglePayment = (key: string) => {
    const methods = data.paymentMethods.includes(key)
      ? data.paymentMethods.filter((m) => m !== key)
      : [...data.paymentMethods, key];
    setData({ ...data, paymentMethods: methods });
  };

  const handleComplete = async () => {
    const rate = parseFloat(data.taxRate);
    if (data.taxRate && (isNaN(rate) || rate < 0 || rate > 100)) {
      setTaxErr("Enter a valid rate between 0 and 100");
      return;
    }
    setTaxErr("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    onComplete();
  };

  const up = (k: keyof Step2) => (v: any) => setData({ ...data, [k]: v });

  return (
    <div className="space-y-5">
      {/* Currency */}
      <div>
        <Label>Currency</Label>
        <SelectInput
          value={data.currency}
          onChange={up("currency")}
          options={CURRENCIES.map((c) => ({ value: c.code, label: c.label }))}
        />
      </div>

      {/* Tax Rate */}
      <div>
        <Label>Tax Rate <span style={{ color: C.muted, fontSize: "0.68rem", fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>(% — leave blank if none)</span></Label>
        <div className="relative">
          <TextInput
            value={data.taxRate}
            onChange={(v) => { up("taxRate")(v); setTaxErr(""); }}
            placeholder="e.g. 15"
            icon={<Percent size={16} />}
            error={taxErr}
          />
        </div>
      </div>

      {/* Invoice Prefix */}
      <div>
        <Label>Invoice Prefix</Label>
        <TextInput value={data.invoicePrefix} onChange={up("invoicePrefix")} placeholder="INV-" icon={<Receipt size={16} />} />
        <p className="mt-1.5 text-xs" style={{ color: C.muted, fontFamily: F }}>
          Invoices will be numbered: <strong style={{ color: C.primary }}>{data.invoicePrefix || "INV-"}001</strong>, {data.invoicePrefix || "INV-"}002…
        </p>
      </div>

      {/* Payment Methods */}
      <div>
        <Label>Payment Methods Accepted</Label>
        <div className="flex flex-wrap gap-2.5 mt-1">
          {PAYMENT_METHODS.map(({ key, label, Icon }) => (
            <PaymentChip
              key={key}
              label={label}
              Icon={Icon}
              selected={data.paymentMethods.includes(key)}
              onClick={() => togglePayment(key)}
            />
          ))}
        </div>
        {data.paymentMethods.length === 0 && (
          <p className="mt-1.5 text-xs" style={{ color: C.muted, fontFamily: F }}>Select at least one payment method</p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center justify-center gap-2 rounded-xl font-semibold transition-all"
          style={{
            height: "52px",
            width: "52px",
            flexShrink: 0,
            backgroundColor: "#F0F4F8",
            color: C.primary,
            border: `1.5px solid ${C.border}`,
            fontFamily: F,
          }}
        >
          <ArrowLeft size={18} />
        </button>
        <button
          type="button"
          onClick={handleComplete}
          disabled={loading}
          className="flex-1 flex items-center justify-center gap-2.5 rounded-xl font-semibold transition-all active:scale-[0.98]"
          style={{
            height: "52px",
            background: loading
              ? `linear-gradient(135deg, #1E8449, ${C.success})`
              : `linear-gradient(135deg, ${C.success}, #2ECC71)`,
            color: "#fff",
            fontSize: "0.9375rem",
            fontFamily: F,
            boxShadow: `0 6px 20px rgba(39,174,96,0.3)`,
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? (
            <><Loader2 size={18} className="animate-spin" /> Setting up…</>
          ) : (
            <><CheckCircle2 size={18} /> Complete Setup</>
          )}
        </button>
      </div>
    </div>
  );
}

// ─── FORM CARD WRAPPER ────────────────────────────────────────────────────────
function FormCard({
  step, s1, s2, setS1, setS2, onNext, onBack, onComplete, maxWidth = "480px",
}: {
  step: 1 | 2; s1: Step1; s2: Step2;
  setS1: (d: Step1) => void; setS2: (d: Step2) => void;
  onNext: () => void; onBack: () => void; onComplete: () => void;
  maxWidth?: string;
}) {
  return (
    <div
      className="w-full"
      style={{ maxWidth, fontFamily: F }}
    >
      {/* Card header */}
      <div
        className="rounded-t-2xl px-6 py-4"
        style={{ background: `linear-gradient(135deg, ${C.navy}, ${C.primary})` }}
      >
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: "rgba(255,255,255,0.12)" }}>
            <PawPrint size={15} color="#fff" strokeWidth={1.8} />
          </div>
          <span style={{ color: "#fff", fontWeight: 700, fontSize: "0.9rem" }}>VetConnect Lite</span>
          <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem" }}>· First-time Setup</span>
        </div>
        <ProgressBar step={step} />
        <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.7rem", marginTop: "8px" }}>
          Step {step} of 2 · {step === 1 ? "Clinic Information" : "Billing Settings"}
        </p>
      </div>

      {/* Card body */}
      <div className="bg-white rounded-b-2xl px-6 py-6" style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.1), 0 4px 16px rgba(0,0,0,0.06)" }}>
        <div className="mb-5">
          <h2 style={{ fontWeight: 700, fontSize: "1.25rem", color: C.text, lineHeight: 1.2 }}>
            {step === 1 ? "Tell us about your clinic" : "Configure billing settings"}
          </h2>
          <p className="mt-1 text-sm" style={{ color: C.muted }}>
            {step === 1
              ? "This information will appear on patient records and invoices."
              : "Set up how you'd like to bill your clients."}
          </p>
        </div>

        {/* Step content with crossfade */}
        <div className="relative">
          <div
            className="transition-all duration-300"
            style={{ opacity: step === 1 ? 1 : 0, height: step === 1 ? "auto" : 0, overflow: "hidden", pointerEvents: step === 1 ? "auto" : "none" }}
          >
            <Step1Form data={s1} setData={setS1} onNext={onNext} />
          </div>
          <div
            className="transition-all duration-300"
            style={{ opacity: step === 2 ? 1 : 0, height: step === 2 ? "auto" : 0, overflow: "hidden", pointerEvents: step === 2 ? "auto" : "none" }}
          >
            <Step2Form data={s2} setData={setS2} onBack={onBack} onComplete={onComplete} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── TOP BAR (mobile) ─────────────────────────────────────────────────────────
function MobileTopBar({ step }: { step: 1 | 2 }) {
  return (
    <div
      className="flex items-center gap-3 px-4 flex-shrink-0"
      style={{ height: "56px", background: `linear-gradient(135deg, ${C.navy}, ${C.primary})` }}
    >
      <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: "rgba(255,255,255,0.12)" }}>
        <PawPrint size={16} color="#fff" strokeWidth={1.8} />
      </div>
      <div className="flex-1">
        <p style={{ color: "#fff", fontFamily: F, fontWeight: 700, fontSize: "0.875rem", lineHeight: 1 }}>Clinic Setup</p>
        <p style={{ color: "rgba(255,255,255,0.5)", fontFamily: F, fontSize: "0.65rem" }}>Step {step} of 2</p>
      </div>
      <div className="flex items-center gap-1 px-2.5 py-1 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.12)" }}>
        <span style={{ color: "#fff", fontFamily: F, fontSize: "0.7rem", fontWeight: 600 }}>{step === 1 ? "50%" : "100%"}</span>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
export function ClinicSetupPage() {
  const navigate = useNavigate();
  const { isMobile, isTablet, isDesktop } = useBreakpoint();

  const [step, setStep] = useState<1 | 2>(1);
  const [done, setDone] = useState(false);

  const [s1, setS1] = useState<Step1>({
    clinicName: "", address: "", city: "", phone: "",
    email: "", licenseNumber: "", logoPreview: "",
  });
  const [s2, setS2] = useState<Step2>({
    currency: "PKR", taxRate: "", invoicePrefix: "INV-",
    paymentMethods: ["cash"],
  });

  const handleComplete = () => setDone(true);
  const handleDashboard = () => navigate("/vetconnect-lite/dashboard");

  // ── MOBILE ────────────────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: C.bg }}>
        <MobileTopBar step={step} />

        <div className="flex-1 overflow-y-auto">
          {/* Progress bar strip */}
          <div className="px-4 pt-4">
            <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: C.border }}>
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: step === 1 ? "50%" : "100%",
                  background: step === 2 ? `linear-gradient(90deg, ${C.success}, #2ECC71)` : `linear-gradient(90deg, ${C.primary}, ${C.primaryMd})`,
                }}
              />
            </div>
            <div className="flex justify-between mt-1.5">
              {["Clinic Info", "Billing"].map((l, i) => (
                <p key={l} style={{ fontFamily: F, fontSize: "0.65rem", color: step === i + 1 ? C.primary : C.muted, fontWeight: step === i + 1 ? 700 : 400 }}>{l}</p>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="px-4 pt-4 pb-8">
            <div className="mb-5">
              <h1 style={{ fontFamily: F, fontWeight: 700, fontSize: "1.25rem", color: C.text }}>
                {step === 1 ? "Tell us about your clinic" : "Configure billing settings"}
              </h1>
              <p className="mt-1 text-sm" style={{ color: C.muted, fontFamily: F }}>
                {step === 1 ? "This info will appear on patient records and invoices." : "Set up how you'll bill your clients."}
              </p>
            </div>

            {step === 1 && <Step1Form data={s1} setData={setS1} onNext={() => setStep(2)} />}
            {step === 2 && <Step2Form data={s2} setData={setS2} onBack={() => setStep(1)} onComplete={handleComplete} />}
          </div>
        </div>

        {done && <SuccessOverlay clinicName={s1.clinicName} onDashboard={handleDashboard} />}
      </div>
    );
  }

  // ── TABLET ────────────────────────────────────────────────────────────────
  if (isTablet) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-6 py-10"
        style={{ background: `linear-gradient(145deg, ${C.navy} 0%, ${C.primary} 50%, #2E86C1 100%)` }}
      >
        {/* Decorative blobs */}
        <div className="fixed -top-20 -right-20 w-80 h-80 rounded-full pointer-events-none" style={{ backgroundColor: "rgba(46,134,193,0.2)", filter: "blur(60px)" }} />
        <div className="fixed bottom-0 left-0 w-60 h-60 rounded-full pointer-events-none" style={{ backgroundColor: "rgba(230,126,34,0.12)", filter: "blur(40px)" }} />

        <div className="w-full relative z-10" style={{ maxWidth: "500px" }}>
          <FormCard
            step={step} s1={s1} s2={s2} setS1={setS1} setS2={setS2}
            onNext={() => setStep(2)} onBack={() => setStep(1)}
            onComplete={handleComplete} maxWidth="500px"
          />
          <p className="text-center mt-4 text-xs" style={{ color: "rgba(255,255,255,0.35)", fontFamily: F }}>
            Tablet view · 768px+ · VetConnect Lite Setup
          </p>
        </div>

        {done && <SuccessOverlay clinicName={s1.clinicName} onDashboard={handleDashboard} />}
      </div>
    );
  }

  // ── DESKTOP ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: C.bg }}>
      {/* Desktop top bar */}
      <div
        className="flex items-center gap-4 px-8 flex-shrink-0"
        style={{ height: "60px", background: `linear-gradient(135deg, ${C.navy}, ${C.primary})` }}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: "rgba(255,255,255,0.12)" }}>
            <PawPrint size={16} color="#fff" strokeWidth={1.8} />
          </div>
          <span style={{ color: "#fff", fontFamily: F, fontWeight: 700, fontSize: "0.9375rem" }}>VetConnect Lite</span>
          <span style={{ color: "rgba(255,255,255,0.4)", fontFamily: F, fontSize: "0.75rem" }}>· First-time Clinic Setup</span>
        </div>
        <div className="flex-1" />
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)" }}>
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: step === 2 ? "#6FEEA6" : "rgba(255,255,255,0.5)" }} />
          <span style={{ color: step === 2 ? "#6FEEA6" : "rgba(255,255,255,0.6)", fontFamily: F, fontSize: "0.72rem", fontWeight: 600 }}>
            Step {step} of 2 · {step === 1 ? "50%" : "100%"} complete
          </span>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-start justify-center px-8 py-10 overflow-y-auto">
        <div className="flex gap-8 w-full" style={{ maxWidth: "1100px" }}>

          {/* Left: Form card (480px) */}
          <div className="flex-shrink-0" style={{ width: "480px" }}>
            <FormCard
              step={step} s1={s1} s2={s2} setS1={setS1} setS2={setS2}
              onNext={() => setStep(2)} onBack={() => setStep(1)}
              onComplete={handleComplete} maxWidth="480px"
            />
          </div>

          {/* Right: Live preview */}
          <div className="flex-1 min-w-0 pt-1">
            <LivePreviewPanel s1={s1} s2={s2} step={step} />
          </div>
        </div>
      </div>

      {done && <SuccessOverlay clinicName={s1.clinicName} onDashboard={handleDashboard} />}
    </div>
  );
}