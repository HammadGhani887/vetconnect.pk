import React, { useState } from "react";
import {
  ArrowLeft, Bell, Search, Plus, MoreVertical, ChevronRight,
  LayoutDashboard, Users, PawPrint, Stethoscope, Grid3x3,
  Check, X, AlertTriangle, Clock, Eye, EyeOff, Mail, Lock,
  Phone, Calendar, MapPin, Star, TrendingUp, TrendingDown,
  RefreshCw, CreditCard, Activity, Heart,
} from "lucide-react";

// ─── TOKENS ───────────────────────────────────────────────────────────────────
const C = {
  primary:    "#1B4F72",
  primaryDk:  "#154060",
  primaryLt:  "#EBF5FB",
  accent:     "#E67E22",
  accentDk:   "#D35400",
  accentLt:   "#FEF3E8",
  success:    "#27AE60",
  successLt:  "#EAFAF1",
  warning:    "#F39C12",
  warningLt:  "#FEF9E7",
  danger:     "#E74C3C",
  dangerLt:   "#FDEDEC",
  bg:         "#F5F7FA",
  card:       "#FFFFFF",
  text:       "#1A1A2E",
  sub:        "#5A6178",
  muted:      "#8E94A7",
  border:     "#E8ECF1",
  borderDk:   "#D0D5DD",
};

const FONT = "'Plus Jakarta Sans', sans-serif";
const FONT_H = "'DM Serif Display', serif";

// ─── SECTION WRAPPER ──────────────────────────────────────────────────────────
function Section({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section className="mb-14">
      <div className="mb-6">
        <h2 style={{ fontFamily: FONT_H, color: C.primary, fontSize: "1.5rem", lineHeight: 1.2 }}>{title}</h2>
        {subtitle && <p className="mt-1" style={{ color: C.muted, fontSize: "0.875rem" }}>{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}

function Token({ label, value, bg, text = "#fff" }: { label: string; value: string; bg: string; text?: string }) {
  return (
    <div className="flex flex-col" style={{ fontFamily: FONT }}>
      <div className="w-full h-14 rounded-xl shadow-sm mb-2" style={{ backgroundColor: bg }} />
      <p className="text-xs font-bold" style={{ color: C.text }}>{label}</p>
      <p className="text-xs" style={{ color: C.muted }}>{value}</p>
    </div>
  );
}

// ─── BUTTONS ──────────────────────────────────────────────────────────────────
function Btn({
  label, bg, color, border, disabled, size = "md", icon,
}: {
  label: string; bg: string; color: string; border?: string; disabled?: boolean; size?: "sm" | "md" | "lg"; icon?: React.ReactNode;
}) {
  const heights = { sm: "36px", md: "48px", lg: "52px" };
  const pads   = { sm: "0 16px", md: "0 20px", lg: "0 24px" };
  const fonts  = { sm: "0.8rem", md: "0.875rem", lg: "0.95rem" };
  return (
    <button
      disabled={disabled}
      className="inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all"
      style={{
        height: heights[size],
        padding: pads[size],
        backgroundColor: bg,
        color,
        border: border ?? "none",
        fontSize: fonts[size],
        opacity: disabled ? 0.45 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
        fontFamily: FONT,
      }}
    >
      {icon}
      {label}
    </button>
  );
}

// ─── INPUT FIELDS ─────────────────────────────────────────────────────────────
function InputDemo({
  label, placeholder, hint, error, disabled, leadingIcon, trailingIcon, type = "text",
}: {
  label: string; placeholder: string; hint?: string; error?: string; disabled?: boolean;
  leadingIcon?: React.ReactNode; trailingIcon?: React.ReactNode; type?: string;
}) {
  const [focused, setFocused] = useState(false);
  const [show, setShow] = useState(false);

  const borderColor = error ? C.danger : focused ? C.primary : C.border;
  const bg = disabled ? "#F8FAFC" : focused ? "#fff" : "#F8FAFC";

  return (
    <div style={{ fontFamily: FONT, width: "100%" }}>
      {label && (
        <label className="block mb-1.5 text-sm font-semibold" style={{ color: C.text }}>
          {label}
        </label>
      )}
      <div
        className="flex items-center gap-2.5 rounded-xl px-3.5 transition-all"
        style={{
          height: "48px",
          backgroundColor: bg,
          border: `1.5px solid ${borderColor}`,
          boxShadow: focused ? `0 0 0 3px ${error ? C.dangerLt : C.primaryLt}` : "none",
        }}
      >
        {leadingIcon && (
          <span style={{ color: C.muted, flexShrink: 0, display: "flex" }}>{leadingIcon}</span>
        )}
        <input
          type={type === "password" ? (show ? "text" : "password") : type}
          placeholder={placeholder}
          disabled={disabled}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="flex-1 bg-transparent outline-none text-sm"
          style={{ color: C.text, fontFamily: FONT }}
        />
        {type === "password" ? (
          <button onClick={() => setShow(!show)} style={{ color: C.muted, display: "flex" }}>
            {show ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        ) : trailingIcon ? (
          <span style={{ color: C.muted, flexShrink: 0, display: "flex" }}>{trailingIcon}</span>
        ) : null}
      </div>
      {error && (
        <p className="mt-1 text-xs flex items-center gap-1" style={{ color: C.danger }}>
          <AlertTriangle size={12} /> {error}
        </p>
      )}
      {hint && !error && (
        <p className="mt-1 text-xs" style={{ color: C.muted }}>{hint}</p>
      )}
    </div>
  );
}

// ─── BADGES ───────────────────────────────────────────────────────────────────
type BadgeVariant = "synced" | "pending" | "failed" | "paid" | "unpaid" | "active" | "inactive";
const BADGE_CONFIG: Record<BadgeVariant, { label: string; bg: string; color: string; dot: string }> = {
  synced:   { label: "Synced",   bg: C.successLt, color: C.success, dot: C.success },
  pending:  { label: "Pending",  bg: C.warningLt, color: C.warning, dot: C.warning },
  failed:   { label: "Failed",   bg: C.dangerLt,  color: C.danger,  dot: C.danger  },
  paid:     { label: "Paid",     bg: C.successLt, color: C.success, dot: C.success },
  unpaid:   { label: "Unpaid",   bg: C.dangerLt,  color: C.danger,  dot: C.danger  },
  active:   { label: "Active",   bg: C.primaryLt, color: C.primary, dot: C.primary },
  inactive: { label: "Inactive", bg: "#F0F4F8",   color: C.muted,   dot: C.muted   },
};

function Badge({ variant, size = "md" }: { variant: BadgeVariant; size?: "sm" | "md" | "lg" }) {
  const cfg = BADGE_CONFIG[variant];
  const sizes = { sm: { px: "8px 10px", font: "0.65rem" }, md: { px: "8px 12px", font: "0.75rem" }, lg: { px: "10px 16px", font: "0.8rem" } };
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full font-semibold"
      style={{ padding: sizes[size].px, backgroundColor: cfg.bg, color: cfg.color, fontSize: sizes[size].font, fontFamily: FONT }}
    >
      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: cfg.dot }} />
      {cfg.label}
    </span>
  );
}

// ─── STAT CARD ────────────────────────────────────────────────────────────────
function StatCard({
  icon, label, value, trend, trendLabel, gradient, iconBg,
}: {
  icon: React.ReactNode; label: string; value: string; trend?: "up" | "down" | "flat";
  trendLabel?: string; gradient?: string; iconBg?: string;
}) {
  const trendColor = trend === "up" ? C.success : trend === "down" ? C.danger : C.muted;
  const TrendIcon  = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Activity;

  return (
    <div
      className="rounded-2xl p-4 relative overflow-hidden"
      style={{
        background: gradient ?? C.card,
        border: gradient ? "none" : `1px solid ${C.border}`,
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
      }}
    >
      {/* Decorative blob */}
      <div className="absolute -top-5 -right-5 w-20 h-20 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.1)" }} />
      <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.06)" }} />

      <div className="relative">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
          style={{ backgroundColor: iconBg ?? "rgba(255,255,255,0.2)" }}
        >
          {icon}
        </div>
        <p
          style={{
            fontFamily: FONT_H,
            fontSize: "1.75rem",
            lineHeight: 1,
            color: gradient ? "#fff" : C.primary,
          }}
        >
          {value}
        </p>
        <p className="mt-1 text-xs" style={{ color: gradient ? "rgba(255,255,255,0.8)" : C.muted }}>
          {label}
        </p>
        {trendLabel && (
          <div className="flex items-center gap-1 mt-2">
            <TrendIcon size={12} style={{ color: gradient ? "rgba(255,255,255,0.7)" : trendColor }} />
            <span className="text-xs" style={{ color: gradient ? "rgba(255,255,255,0.7)" : trendColor }}>
              {trendLabel}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── LIST ITEM CARD ───────────────────────────────────────────────────────────
function ListItemCard({
  initials, avatarBg, imgSrc, title, subtitle, badge, meta, trailingIcon = true,
}: {
  initials?: string; avatarBg?: string; imgSrc?: string; title: string; subtitle: string;
  badge?: React.ReactNode; meta?: string; trailingIcon?: boolean;
}) {
  return (
    <div
      className="flex items-center gap-3 px-4 py-3.5 bg-white rounded-2xl cursor-pointer active:bg-gray-50"
      style={{ border: `1px solid ${C.border}`, boxShadow: "0 1px 6px rgba(0,0,0,0.04)", fontFamily: FONT }}
    >
      {/* Avatar */}
      <div
        className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden"
        style={{ backgroundColor: avatarBg ?? C.primaryLt }}
      >
        {imgSrc ? (
          <img src={imgSrc} alt={title} className="w-full h-full object-cover" />
        ) : (
          <span className="text-sm font-bold" style={{ color: avatarBg ? "#fff" : C.primary }}>
            {initials}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold truncate" style={{ color: C.text }}>{title}</p>
          {badge}
        </div>
        <p className="text-xs truncate mt-0.5" style={{ color: C.muted }}>{subtitle}</p>
        {meta && <p className="text-xs mt-0.5" style={{ color: C.sub }}>{meta}</p>}
      </div>

      {/* Trailing */}
      {trailingIcon && <ChevronRight size={16} style={{ color: C.muted, flexShrink: 0 }} />}
    </div>
  );
}

// ─── TOP BAR ─────────────────────────────────────────────────────────────────
function TopBar({
  title, showBack = true, action, actionIcon,
}: {
  title: string; showBack?: boolean; action?: string; actionIcon?: React.ReactNode;
}) {
  return (
    <div
      className="flex items-center gap-3 px-4"
      style={{
        height: "56px",
        backgroundColor: C.primary,
        fontFamily: FONT,
      }}
    >
      {showBack && (
        <button className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(255,255,255,0.12)" }}>
          <ArrowLeft size={18} className="text-white" />
        </button>
      )}
      <p className="flex-1 text-white font-semibold text-base truncate">{title}</p>
      {action && (
        <button
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
          style={{ backgroundColor: C.accent, color: "#fff" }}
        >
          {actionIcon}
          {action}
        </button>
      )}
    </div>
  );
}

// Notification top bar variant
function TopBarNotif({ title }: { title: string }) {
  return (
    <div
      className="flex items-center gap-3 px-4"
      style={{ height: "56px", backgroundColor: C.primary, fontFamily: FONT }}
    >
      <button className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "rgba(255,255,255,0.12)" }}>
        <ArrowLeft size={18} className="text-white" />
      </button>
      <p className="flex-1 text-white font-semibold text-base">{title}</p>
      <div className="flex items-center gap-2">
        <button className="w-8 h-8 rounded-lg flex items-center justify-center relative" style={{ backgroundColor: "rgba(255,255,255,0.12)" }}>
          <Search size={16} className="text-white" />
        </button>
        <button className="w-8 h-8 rounded-lg flex items-center justify-center relative" style={{ backgroundColor: "rgba(255,255,255,0.12)" }}>
          <Bell size={16} className="text-white" />
          <span
            className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-white"
            style={{ backgroundColor: C.danger, fontSize: "0.55rem", fontWeight: 700 }}
          >
            3
          </span>
        </button>
      </div>
    </div>
  );
}

// ─── BOTTOM TAB BAR ───────────────────────────────────────────────────────────
const TABS = [
  { key: "dashboard", label: "Dashboard", Icon: LayoutDashboard },
  { key: "owners",    label: "Owners",    Icon: Users },
  { key: "pets",      label: "Pets",      Icon: PawPrint },
  { key: "visits",    label: "Visits",    Icon: Stethoscope },
  { key: "more",      label: "More",      Icon: Grid3x3 },
];

function BottomTabBar({ active, onChange }: { active: string; onChange: (k: string) => void }) {
  return (
    <div
      className="flex items-stretch border-t"
      style={{
        backgroundColor: C.card,
        borderColor: C.border,
        boxShadow: "0 -4px 20px rgba(0,0,0,0.07)",
        height: "64px",
        fontFamily: FONT,
      }}
    >
      {TABS.map(({ key, label, Icon }) => {
        const isActive = active === key;
        return (
          <button
            key={key}
            onClick={() => onChange(key)}
            className="flex-1 flex flex-col items-center justify-center gap-0.5 relative transition-colors"
            style={{ color: isActive ? C.primary : C.muted }}
          >
            {isActive && (
              <span
                className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full"
                style={{ backgroundColor: C.accent }}
              />
            )}
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center transition-all"
              style={{ backgroundColor: isActive ? C.primaryLt : "transparent" }}
            >
              <Icon size={18} strokeWidth={isActive ? 2.2 : 1.6} />
            </div>
            <span style={{ fontSize: "0.6rem", fontWeight: isActive ? 700 : 500, lineHeight: 1 }}>
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ─── PHONE FRAME ─────────────────────────────────────────────────────────────
function PhoneFrame({ children, title }: { children: React.ReactNode; title?: string }) {
  return (
    <div className="flex flex-col items-center">
      {title && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color: C.muted }}>{title}</p>
      )}
      <div
        className="relative rounded-[2.5rem] overflow-hidden shadow-2xl"
        style={{
          width: "360px",
          border: "8px solid #1A1A2E",
          maxWidth: "100%",
        }}
      >
        {/* Status bar */}
        <div className="flex items-center justify-between px-5 py-2" style={{ backgroundColor: C.primary }}>
          <span className="text-white text-xs font-bold">9:41</span>
          <div className="flex items-center gap-1">
            {["wifi", "signal", "battery"].map((i) => (
              <div key={i} className="w-4 h-2 rounded-sm bg-white opacity-80" />
            ))}
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

// ─── CODE CHIP ────────────────────────────────────────────────────────────────
function Chip({ label }: { label: string }) {
  return (
    <code
      className="inline-block px-2 py-0.5 rounded-md text-xs"
      style={{ backgroundColor: "#F0F4F8", color: C.primary, fontFamily: "monospace" }}
    >
      {label}
    </code>
  );
}

// ─── DIVIDER ─────────────────────────────────────────────────────────────────
function Divider() {
  return <div className="h-px my-6" style={{ backgroundColor: C.border }} />;
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export function DesignSystemPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showPw, setShowPw]       = useState(false);

  return (
    <div style={{ backgroundColor: C.bg, minHeight: "100vh", fontFamily: FONT }}>

      {/* ── HEADER ── */}
      <header
        className="sticky top-0 z-50 px-4 sm:px-6 flex items-center gap-4 border-b"
        style={{ backgroundColor: C.primary, height: "64px", borderColor: "rgba(255,255,255,0.08)" }}
      >
        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: C.accent }}>
          <PawPrint size={18} className="text-white" />
        </div>
        <div className="flex-1">
          <p style={{ fontFamily: FONT_H, color: "#fff", fontSize: "1.1rem", lineHeight: 1 }}>VetConnect Lite</p>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.7rem" }}>Design System v1.0</p>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: C.successLt, color: C.success }}>
            Mobile-first · 360px
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: "rgba(255,255,255,0.12)", color: "#fff" }}>
            Plus Jakarta Sans
          </span>
        </div>
      </header>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* INTRO */}
        <div className="mb-12">
          <div
            className="rounded-3xl p-6 sm:p-8 relative overflow-hidden"
            style={{ background: `linear-gradient(135deg, #0D2F4F 0%, ${C.primary} 60%, #2874A6 100%)` }}
          >
            <div className="absolute -top-8 -right-8 w-48 h-48 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.05)" }} />
            <div className="absolute -bottom-10 left-1/4 w-32 h-32 rounded-full" style={{ backgroundColor: "rgba(230,126,34,0.12)" }} />
            <div className="relative z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs mb-4" style={{ backgroundColor: "rgba(39,174,96,0.2)", color: "#6FEEA6" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Design System · Prompt 0
              </span>
              <h1 style={{ fontFamily: FONT_H, color: "#fff", fontSize: "clamp(1.8rem,4vw,2.8rem)", lineHeight: 1.2 }}>
                VetConnect Lite
              </h1>
              <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.95rem", maxWidth: "480px", marginTop: "8px", lineHeight: 1.7 }}>
                A comprehensive design system for the veterinary clinic admin panel. All components are mobile-first (360px), touch-optimised with 48px targets.
              </p>
              <div className="flex flex-wrap gap-3 mt-6">
                {[
                  { label: "4 Button variants" },
                  { label: "5 Input states" },
                  { label: "7 Status badges" },
                  { label: "4 Stat cards" },
                  { label: "List items" },
                  { label: "Top bar" },
                  { label: "Bottom tabs" },
                ].map(({ label }) => (
                  <span key={label} className="px-3 py-1.5 rounded-xl text-xs font-semibold" style={{ backgroundColor: "rgba(255,255,255,0.1)", color: "#fff" }}>
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 1 ── COLORS ───────────────────────────────────────────────────────── */}
        <Section title="Color Palette" subtitle="Core design tokens used across all VetConnect Lite components">
          <div className="space-y-6">
            {/* Primary row */}
            <div>
              <p className="text-xs font-semibold mb-3 uppercase tracking-widest" style={{ color: C.muted }}>Brand</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <Token label="Primary"  value="#1B4F72" bg={C.primary} />
                <Token label="Accent"   value="#E67E22" bg={C.accent}  />
                <Token label="Bg"       value="#F5F7FA" bg={C.bg} text={C.text} />
                <Token label="Card"     value="#FFFFFF" bg={C.card}    text={C.text} />
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold mb-3 uppercase tracking-widest" style={{ color: C.muted }}>Semantic</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <Token label="Success"  value="#27AE60" bg={C.success}  />
                <Token label="Warning"  value="#F39C12" bg={C.warning}  />
                <Token label="Danger"   value="#E74C3C" bg={C.danger}   />
                <Token label="Muted"    value="#8E94A7" bg={C.muted}    />
              </div>
            </div>
            {/* Light variants */}
            <div>
              <p className="text-xs font-semibold mb-3 uppercase tracking-widest" style={{ color: C.muted }}>Light Tints (Backgrounds)</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <Token label="Primary Lt"  value="#EBF5FB"  bg={C.primaryLt}  text={C.primary} />
                <Token label="Accent Lt"   value="#FEF3E8"  bg={C.accentLt}   text={C.accent}  />
                <Token label="Success Lt"  value="#EAFAF1"  bg={C.successLt}  text={C.success} />
                <Token label="Danger Lt"   value="#FDEDEC"  bg={C.dangerLt}   text={C.danger}  />
              </div>
            </div>
          </div>
        </Section>

        {/* 2 ── TYPOGRAPHY ───────────────────────────────────────────────────── */}
        <Section title="Typography" subtitle="Plus Jakarta Sans for UI, DM Serif Display for headings">
          <div className="bg-white rounded-2xl p-6 sm:p-8 space-y-5" style={{ border: `1px solid ${C.border}` }}>
            {[
              { label: "H1 · DM Serif Display 32px",   el: "h1",   size: "2rem",    font: FONT_H, color: C.text,    weight: "400" },
              { label: "H2 · DM Serif Display 24px",   el: "h2",   size: "1.5rem",  font: FONT_H, color: C.text,    weight: "400" },
              { label: "H3 · Plus Jakarta Sans 18px",  el: "h3",   size: "1.125rem",font: FONT,   color: C.text,    weight: "700" },
              { label: "Body · Plus Jakarta Sans 14px", el: "p",   size: "0.875rem",font: FONT,   color: C.sub,     weight: "400" },
              { label: "Caption · 12px",               el: "span",  size: "0.75rem", font: FONT,   color: C.muted,   weight: "500" },
              { label: "Label · 12px Bold",            el: "label", size: "0.75rem", font: FONT,   color: C.primary, weight: "700" },
            ].map((t) => (
              <div key={t.label} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 pb-4" style={{ borderBottom: `1px solid ${C.border}` }}>
                <p className="text-xs w-48 flex-shrink-0" style={{ color: C.muted, fontFamily: FONT }}>{t.label}</p>
                <p style={{ fontFamily: t.font, fontSize: t.size, color: t.color, fontWeight: t.weight, lineHeight: 1.3 }}>
                  {t.el === "h1" ? "Give Your Pets the Best Care" :
                   t.el === "h2" ? "Appointment Dashboard" :
                   t.el === "h3" ? "Patient Health Records" :
                   t.el === "p"  ? "Connect with verified veterinarians across Pakistan." :
                   t.label.includes("Caption") ? "Last synced: 2 mins ago" :
                   "ACTIVE STATUS"}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* 3 ── BUTTONS ──────────────────────────────────────────────────────── */}
        <Section title="Buttons" subtitle="4 variants · 3 sizes · Disabled state · 48px default touch target">

          {/* Variants */}
          <div className="bg-white rounded-2xl p-6 mb-4" style={{ border: `1px solid ${C.border}` }}>
            <p className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: C.muted }}>Variants</p>
            <div className="flex flex-wrap gap-3">
              <Btn label="Primary"  bg={C.primary} color="#fff" />
              <Btn label="Accent"   bg={C.accent}  color="#fff" />
              <Btn label="Outline"  bg="transparent" color={C.primary} border={`1.5px solid ${C.primary}`} />
              <Btn label="Danger"   bg={C.danger}  color="#fff" />
            </div>
          </div>

          {/* With icons */}
          <div className="bg-white rounded-2xl p-6 mb-4" style={{ border: `1px solid ${C.border}` }}>
            <p className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: C.muted }}>With Icons</p>
            <div className="flex flex-wrap gap-3">
              <Btn label="Add Owner"      bg={C.primary} color="#fff" icon={<Plus size={16} />} />
              <Btn label="Book Appointment" bg={C.accent} color="#fff" icon={<Calendar size={16} />} />
              <Btn label="Sync Data"      bg="transparent" color={C.primary} border={`1.5px solid ${C.primary}`} icon={<RefreshCw size={16} />} />
              <Btn label="Delete"         bg={C.danger}  color="#fff" icon={<X size={16} />} />
            </div>
          </div>

          {/* Sizes */}
          <div className="bg-white rounded-2xl p-6 mb-4" style={{ border: `1px solid ${C.border}` }}>
            <p className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: C.muted }}>Sizes</p>
            <div className="flex flex-wrap items-center gap-3">
              <Btn label="Small · 36px"   bg={C.primary} color="#fff" size="sm" />
              <Btn label="Default · 48px" bg={C.primary} color="#fff" size="md" />
              <Btn label="Large · 52px"   bg={C.primary} color="#fff" size="lg" />
            </div>
          </div>

          {/* States */}
          <div className="bg-white rounded-2xl p-6" style={{ border: `1px solid ${C.border}` }}>
            <p className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: C.muted }}>States</p>
            <div className="flex flex-wrap gap-3">
              <Btn label="Normal"   bg={C.primary} color="#fff" />
              <Btn label="Disabled" bg={C.primary} color="#fff" disabled />
              <Btn label="Outline Disabled" bg="transparent" color={C.primary} border={`1.5px solid ${C.primary}`} disabled />
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              {/* Loading button */}
              <button
                className="inline-flex items-center justify-center gap-2 rounded-xl font-semibold"
                style={{ height: "48px", padding: "0 20px", backgroundColor: C.primary, color: "#fff", fontSize: "0.875rem", fontFamily: FONT }}
              >
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Saving…
              </button>
              {/* Success state */}
              <button
                className="inline-flex items-center justify-center gap-2 rounded-xl font-semibold"
                style={{ height: "48px", padding: "0 20px", backgroundColor: C.success, color: "#fff", fontSize: "0.875rem", fontFamily: FONT }}
              >
                <Check size={16} />
                Saved!
              </button>
            </div>
          </div>
        </Section>

        {/* 4 ── INPUT FIELDS ────────────────────────────────────────────────── */}
        <Section title="Input Fields" subtitle="All inputs are 48px height for touch accessibility. Labels, hints, error states included.">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

            {/* Default */}
            <div className="bg-white rounded-2xl p-5" style={{ border: `1px solid ${C.border}` }}>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: C.muted }}>Default</p>
              <InputDemo label="Owner Name" placeholder="e.g. Ali Gauhar" hint="Full legal name as on ID card" />
            </div>

            {/* With leading icon */}
            <div className="bg-white rounded-2xl p-5" style={{ border: `1px solid ${C.border}` }}>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: C.muted }}>With Leading Icon</p>
              <div className="space-y-3">
                <InputDemo label="Email" placeholder="owner@email.com" leadingIcon={<Mail size={16} />} />
                <InputDemo label="Phone" placeholder="+92 300 0000000" leadingIcon={<Phone size={16} />} />
              </div>
            </div>

            {/* Password */}
            <div className="bg-white rounded-2xl p-5" style={{ border: `1px solid ${C.border}` }}>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: C.muted }}>Password (Toggle Visibility)</p>
              <InputDemo label="Password" placeholder="Enter clinic PIN" type="password" leadingIcon={<Lock size={16} />} hint="Minimum 8 characters" />
            </div>

            {/* Error state */}
            <div className="bg-white rounded-2xl p-5" style={{ border: `1px solid ${C.border}` }}>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: C.muted }}>Error State</p>
              <div className="space-y-3">
                <InputDemo label="Pet Name" placeholder="e.g. Max" error="Pet name is required" />
                <InputDemo label="Date of Birth" placeholder="DD / MM / YYYY" leadingIcon={<Calendar size={16} />} error="Invalid date format" />
              </div>
            </div>

            {/* Disabled */}
            <div className="bg-white rounded-2xl p-5" style={{ border: `1px solid ${C.border}` }}>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: C.muted }}>Disabled</p>
              <InputDemo label="Clinic ID" placeholder="VC-2026-00142" disabled hint="Auto-generated by system" />
            </div>

            {/* Search */}
            <div className="bg-white rounded-2xl p-5" style={{ border: `1px solid ${C.border}` }}>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: C.muted }}>Search Input</p>
              <InputDemo label="" placeholder="Search owners, pets, visits…" leadingIcon={<Search size={16} />} trailingIcon={<X size={14} />} />
            </div>
          </div>
        </Section>

        {/* 5 ── STATUS BADGES ───────────────────────────────────────────────── */}
        <Section title="Status Badges" subtitle="Semantic pill badges for sync status, payment status, and entity state">
          <div className="bg-white rounded-2xl p-6" style={{ border: `1px solid ${C.border}` }}>

            <div className="space-y-6">
              {/* Sync status */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: C.muted }}>Sync Status</p>
                <div className="flex flex-wrap gap-3">
                  <Badge variant="synced" />
                  <Badge variant="pending" />
                  <Badge variant="failed" />
                </div>
              </div>
              <Divider />
              {/* Payment status */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: C.muted }}>Payment Status</p>
                <div className="flex flex-wrap gap-3">
                  <Badge variant="paid" />
                  <Badge variant="unpaid" />
                </div>
              </div>
              <Divider />
              {/* Entity status */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: C.muted }}>Entity Status</p>
                <div className="flex flex-wrap gap-3">
                  <Badge variant="active" />
                  <Badge variant="inactive" />
                </div>
              </div>
              <Divider />
              {/* Sizes */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: C.muted }}>Sizes</p>
                <div className="flex flex-wrap items-center gap-3">
                  <Badge variant="synced" size="sm" />
                  <Badge variant="synced" size="md" />
                  <Badge variant="synced" size="lg" />
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* 6 ── STAT CARDS ──────────────────────────────────────────────────── */}
        <Section title="Stat Cards" subtitle="Dashboard summary cards with icon, value, label and trend indicators">
          {/* Gradient variants */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <StatCard
              icon={<Users size={20} className="text-white" />}
              label="Total Owners"
              value="248"
              trend="up"
              trendLabel="+12 this week"
              gradient={`linear-gradient(135deg, ${C.primary}, #2874A6)`}
            />
            <StatCard
              icon={<PawPrint size={20} className="text-white" />}
              label="Pets Registered"
              value="416"
              trend="up"
              trendLabel="+8 today"
              gradient={`linear-gradient(135deg, ${C.accent}, #F39C12)`}
            />
            <StatCard
              icon={<Stethoscope size={20} className="text-white" />}
              label="Visits Today"
              value="19"
              trend="flat"
              trendLabel="Same as yesterday"
              gradient={`linear-gradient(135deg, ${C.success}, #2ECC71)`}
            />
            <StatCard
              icon={<CreditCard size={20} className="text-white" />}
              label="Revenue (PKR)"
              value="87.4K"
              trend="down"
              trendLabel="-3% vs last week"
              gradient={`linear-gradient(135deg, #8E44AD, #A569BD)`}
            />
          </div>
          {/* White card variants */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              icon={<Clock size={18} style={{ color: C.warning }} />}
              label="Follow-ups Due"
              value="7"
              trend="up"
              trendLabel="3 overdue"
              iconBg={C.warningLt}
            />
            <StatCard
              icon={<Heart size={18} style={{ color: C.danger }} />}
              label="Critical Cases"
              value="2"
              trend="down"
              trendLabel="Improving"
              iconBg={C.dangerLt}
            />
            <StatCard
              icon={<Check size={18} style={{ color: C.success }} />}
              label="Vaccinations"
              value="34"
              trend="up"
              trendLabel="This month"
              iconBg={C.successLt}
            />
            <StatCard
              icon={<RefreshCw size={18} style={{ color: C.primary }} />}
              label="Pending Sync"
              value="11"
              trend="flat"
              trendLabel="Last sync: 5m ago"
              iconBg={C.primaryLt}
            />
          </div>
        </Section>

        {/* 7 ── LIST ITEM CARDS ─────────────────────────────────────────────── */}
        <Section title="List Item Cards" subtitle="Avatar + title + subtitle + chevron. Used in owner lists, pet lists, visit history.">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

            {/* Owner list items */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: C.muted }}>Pet Owners</p>
              <div className="space-y-2.5">
                <ListItemCard
                  initials="AG"
                  avatarBg={C.primary}
                  title="Ali Gauhar"
                  subtitle="2 pets · +92 300 1234567"
                  badge={<Badge variant="active" size="sm" />}
                  meta="Last visit: Apr 25, 2026"
                />
                <ListItemCard
                  initials="SB"
                  avatarBg="#8E44AD"
                  title="Sara Bilal"
                  subtitle="1 pet · +92 321 9876543"
                  badge={<Badge variant="synced" size="sm" />}
                  meta="Last visit: Apr 20, 2026"
                />
                <ListItemCard
                  initials="MK"
                  avatarBg={C.accent}
                  title="Muhammad Khan"
                  subtitle="3 pets · +92 333 5554444"
                  badge={<Badge variant="pending" size="sm" />}
                  meta="Last visit: Mar 12, 2026"
                />
              </div>
            </div>

            {/* Pet list items */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: C.muted }}>Pets</p>
              <div className="space-y-2.5">
                <ListItemCard
                  initials="🐕"
                  avatarBg="#FEF3E8"
                  title="Max"
                  subtitle="Golden Retriever · 3 years · Male"
                  badge={<Badge variant="synced" size="sm" />}
                  meta="Owner: Ali Gauhar"
                />
                <ListItemCard
                  initials="🐈"
                  avatarBg="#EBF5FB"
                  title="Whiskers"
                  subtitle="Persian Cat · 5 years · Female"
                  badge={<Badge variant="active" size="sm" />}
                  meta="Owner: Sara Bilal"
                />
                <ListItemCard
                  initials="🦜"
                  avatarBg="#EAFAF1"
                  title="Tweety"
                  subtitle="African Grey Parrot · 2 years"
                  badge={<Badge variant="failed" size="sm" />}
                  meta="Vaccination overdue!"
                />
              </div>
            </div>

            {/* Visit history */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: C.muted }}>Visit History</p>
              <div className="space-y-2.5">
                <ListItemCard
                  initials={<Stethoscope size={18} style={{ color: C.primary }} />}
                  avatarBg={C.primaryLt}
                  title="General Checkup"
                  subtitle="Max · Dr. Ahmed Khan"
                  badge={<Badge variant="paid" size="sm" />}
                  meta="Apr 25, 2026 · PKR 1,500"
                />
                <ListItemCard
                  initials={<Calendar size={18} style={{ color: C.accent }} />}
                  avatarBg={C.accentLt}
                  title="Vaccination"
                  subtitle="Whiskers · Rabies Booster"
                  badge={<Badge variant="unpaid" size="sm" />}
                  meta="Apr 22, 2026 · PKR 800"
                />
              </div>
            </div>

            {/* Invoice items */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: C.muted }}>Invoices</p>
              <div className="space-y-2.5">
                <ListItemCard
                  initials={<CreditCard size={18} style={{ color: C.success }} />}
                  avatarBg={C.successLt}
                  title="Invoice #VC-2026-0041"
                  subtitle="Ali Gauhar · General Checkup"
                  badge={<Badge variant="paid" size="sm" />}
                  meta="PKR 1,500 · Apr 25"
                />
                <ListItemCard
                  initials={<CreditCard size={18} style={{ color: C.danger }} />}
                  avatarBg={C.dangerLt}
                  title="Invoice #VC-2026-0039"
                  subtitle="Muhammad Khan · Surgery"
                  badge={<Badge variant="unpaid" size="sm" />}
                  meta="PKR 12,000 · Apr 18"
                />
              </div>
            </div>
          </div>
        </Section>

        {/* 8 ── TOP BAR ─────────────────────────────────────────────────────── */}
        <Section title="Top Bar" subtitle="56px sticky header with back navigation, page title, and contextual action button">
          <div className="space-y-6">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Variant 1: Back + title + CTA */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: C.muted }}>With Action Button</p>
                <div className="rounded-2xl overflow-hidden shadow-lg" style={{ border: `8px solid #1A1A2E` }}>
                  <TopBar title="Pet Owners" action="Add" actionIcon={<Plus size={14} />} />
                  <div className="p-4 space-y-2" style={{ backgroundColor: C.bg }}>
                    <ListItemCard initials="AG" avatarBg={C.primary} title="Ali Gauhar" subtitle="2 pets · Last visit Apr 25" badge={<Badge variant="active" size="sm" />} />
                    <ListItemCard initials="SB" avatarBg="#8E44AD" title="Sara Bilal" subtitle="1 pet · Last visit Apr 20" badge={<Badge variant="synced" size="sm" />} />
                  </div>
                </div>
              </div>

              {/* Variant 2: Search + Bell */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: C.muted }}>With Search &amp; Notification</p>
                <div className="rounded-2xl overflow-hidden shadow-lg" style={{ border: `8px solid #1A1A2E` }}>
                  <TopBarNotif title="Dashboard" />
                  <div className="p-4" style={{ backgroundColor: C.bg }}>
                    <div className="grid grid-cols-2 gap-3">
                      <StatCard icon={<Users size={16} className="text-white" />} label="Owners" value="248" gradient={`linear-gradient(135deg, ${C.primary}, #2874A6)`} />
                      <StatCard icon={<PawPrint size={16} className="text-white" />} label="Pets" value="416" gradient={`linear-gradient(135deg, ${C.accent}, #F39C12)`} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Variant 3: Detail page */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: C.muted }}>Detail Page</p>
                <div className="rounded-2xl overflow-hidden shadow-lg" style={{ border: `8px solid #1A1A2E` }}>
                  <TopBar title="Max — Golden Retriever" action="Edit" />
                  <div className="p-4 space-y-3" style={{ backgroundColor: C.bg }}>
                    {[
                      { label: "Species", val: "Dog · Golden Retriever" },
                      { label: "Age", val: "3 years, 2 months" },
                      { label: "Owner", val: "Ali Gauhar" },
                    ].map(({ label, val }) => (
                      <div key={label} className="flex items-center justify-between py-2.5 px-3 bg-white rounded-xl" style={{ border: `1px solid ${C.border}` }}>
                        <span className="text-xs" style={{ color: C.muted }}>{label}</span>
                        <span className="text-xs font-semibold" style={{ color: C.text }}>{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Variant 4: No back button (root screen) */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: C.muted }}>Root Screen (No Back)</p>
                <div className="rounded-2xl overflow-hidden shadow-lg" style={{ border: `8px solid #1A1A2E` }}>
                  <div className="flex items-center justify-between px-4" style={{ height: "56px", backgroundColor: C.primary }}>
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: C.accent }}>
                        <PawPrint size={14} className="text-white" />
                      </div>
                      <span style={{ fontFamily: FONT_H, color: "#fff", fontSize: "1rem" }}>VetConnect Lite</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "rgba(255,255,255,0.12)" }}>
                        <Bell size={16} className="text-white" />
                      </button>
                      <button className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "rgba(255,255,255,0.12)" }}>
                        <MoreVertical size={16} className="text-white" />
                      </button>
                    </div>
                  </div>
                  <div className="p-4" style={{ backgroundColor: C.bg }}>
                    <p className="text-xs" style={{ color: C.muted, fontFamily: FONT }}>
                      Root screen — no back arrow, shows clinic name with logo.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* 9 ── BOTTOM TAB BAR ──────────────────────────────────────────────── */}
        <Section title="Bottom Tab Bar" subtitle="5-tab navigation: Dashboard · Owners · Pets · Visits · More. 64px height, orange active indicator.">
          <div className="space-y-8">

            {/* Interactive demo in phone frame */}
            <PhoneFrame title="Interactive Demo — Click to change tabs">
              <div style={{ backgroundColor: C.bg }}>
                {/* Top bar */}
                <div className="flex items-center justify-between px-4" style={{ height: "56px", backgroundColor: C.primary }}>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: C.accent }}>
                      <PawPrint size={14} className="text-white" />
                    </div>
                    <span style={{ fontFamily: FONT_H, color: "#fff", fontSize: "0.95rem" }}>VetConnect Lite</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "rgba(255,255,255,0.12)" }}>
                      <Bell size={15} className="text-white" />
                    </button>
                  </div>
                </div>

                {/* Content area */}
                <div className="px-4 py-4" style={{ minHeight: "200px" }}>
                  <p style={{ fontFamily: FONT_H, color: C.primary, fontSize: "1.1rem" }}>
                    {activeTab === "dashboard" && "📊 Dashboard"}
                    {activeTab === "owners"    && "👥 Owners"}
                    {activeTab === "pets"      && "🐾 Pets"}
                    {activeTab === "visits"    && "🩺 Visits"}
                    {activeTab === "more"      && "⋯ More"}
                  </p>
                  <p className="mt-2 text-sm" style={{ color: C.muted, fontFamily: FONT }}>
                    Tap the tabs below to switch sections.
                  </p>

                  {/* Mock content */}
                  <div className="mt-4 space-y-2">
                    {activeTab === "dashboard" && (
                      <div className="grid grid-cols-2 gap-2.5">
                        <StatCard icon={<Users size={14} className="text-white" />} label="Owners" value="248" gradient={`linear-gradient(135deg,${C.primary},#2874A6)`} />
                        <StatCard icon={<PawPrint size={14} className="text-white" />} label="Pets" value="416" gradient={`linear-gradient(135deg,${C.accent},#F39C12)`} />
                      </div>
                    )}
                    {activeTab === "owners" && (
                      <div className="space-y-2">
                        <ListItemCard initials="AG" avatarBg={C.primary} title="Ali Gauhar" subtitle="2 pets" badge={<Badge variant="active" size="sm" />} />
                        <ListItemCard initials="SB" avatarBg="#8E44AD" title="Sara Bilal" subtitle="1 pet" badge={<Badge variant="synced" size="sm" />} />
                      </div>
                    )}
                    {activeTab === "pets" && (
                      <div className="space-y-2">
                        <ListItemCard initials="🐕" avatarBg="#FEF3E8" title="Max" subtitle="Golden Retriever" badge={<Badge variant="synced" size="sm" />} />
                        <ListItemCard initials="🐈" avatarBg="#EBF5FB" title="Whiskers" subtitle="Persian Cat" badge={<Badge variant="active" size="sm" />} />
                      </div>
                    )}
                    {activeTab === "visits" && (
                      <div className="space-y-2">
                        <ListItemCard initials={<Stethoscope size={14} style={{ color: C.primary }} />} avatarBg={C.primaryLt} title="General Checkup" subtitle="Max · Today" badge={<Badge variant="paid" size="sm" />} />
                        <ListItemCard initials={<Calendar size={14} style={{ color: C.accent }} />} avatarBg={C.accentLt} title="Vaccination" subtitle="Whiskers · Yesterday" badge={<Badge variant="unpaid" size="sm" />} />
                      </div>
                    )}
                    {activeTab === "more" && (
                      <div className="space-y-2">
                        {["Sync Data", "Reports", "Clinic Profile", "Settings"].map((item) => (
                          <div key={item} className="flex items-center justify-between px-3 py-2.5 bg-white rounded-xl" style={{ border: `1px solid ${C.border}` }}>
                            <span className="text-sm" style={{ color: C.text, fontFamily: FONT }}>{item}</span>
                            <ChevronRight size={15} style={{ color: C.muted }} />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom tab bar */}
                <BottomTabBar active={activeTab} onChange={setActiveTab} />
              </div>
            </PhoneFrame>

            {/* Specs */}
            <div className="bg-white rounded-2xl p-6" style={{ border: `1px solid ${C.border}` }}>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: C.muted }}>Tab Specs</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { label: "Height", value: "64px" },
                  { label: "Active indicator", value: "Orange (#E67E22) top bar · 2px · 32px wide" },
                  { label: "Active icon bg", value: "Primary light (#EBF5FB) · 32×32 · rounded-xl" },
                  { label: "Icon size", value: "18px · strokeWidth 2.2 (active) / 1.6 (inactive)" },
                  { label: "Label size", value: "9.6px (0.6rem) · bold active · normal inactive" },
                  { label: "Touch target", value: "Full flex-1 column · exceeds 48px minimum" },
                ].map(({ label, value }) => (
                  <div key={label} className="p-3 rounded-xl" style={{ backgroundColor: C.bg }}>
                    <p className="text-xs font-semibold mb-1" style={{ color: C.primary }}>{label}</p>
                    <p className="text-xs" style={{ color: C.sub }}>{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* 10 ── COMBINED SCREEN ─────────────────────────────────────────────── */}
        <Section title="Full Screen Composition" subtitle="All components combined in a realistic 360px dashboard screen">
          <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
            <PhoneFrame title="Dashboard Screen">
              <div style={{ backgroundColor: C.bg, fontFamily: FONT }}>
                {/* Top bar */}
                <div className="flex items-center justify-between px-4" style={{ height: "56px", backgroundColor: C.primary }}>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: C.accent }}>
                      <PawPrint size={14} className="text-white" />
                    </div>
                    <span style={{ fontFamily: FONT_H, color: "#fff", fontSize: "0.95rem" }}>VetConnect Lite</span>
                  </div>
                  <div className="flex gap-1.5">
                    <button className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "rgba(255,255,255,0.12)" }}>
                      <Bell size={15} className="text-white" />
                    </button>
                    <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg" style={{ backgroundColor: "rgba(39,174,96,0.2)" }}>
                      <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "#27AE60" }} />
                      <span className="text-xs" style={{ color: "#6FEEA6" }}>Synced</span>
                    </div>
                  </div>
                </div>

                {/* Search */}
                <div className="px-4 pt-4 pb-2">
                  <div className="flex items-center gap-2 rounded-xl px-3 py-2.5" style={{ backgroundColor: "#fff", border: `1.5px solid ${C.border}`, height: "44px" }}>
                    <Search size={15} style={{ color: C.muted }} />
                    <span className="text-sm" style={{ color: C.muted }}>Search owners, pets…</span>
                  </div>
                </div>

                {/* Greeting */}
                <div className="px-4 pt-2 pb-3">
                  <p style={{ fontFamily: FONT_H, color: C.primary, fontSize: "1.1rem" }}>Good Morning, Dr. Hassan 👋</p>
                  <p className="text-xs mt-0.5" style={{ color: C.muted }}>Monday, April 27, 2026</p>
                </div>

                {/* 2×2 stat grid */}
                <div className="px-4 grid grid-cols-2 gap-2.5 mb-4">
                  <StatCard icon={<Users size={14} className="text-white" />} label="Owners" value="248" trend="up" trendLabel="+12 this week" gradient={`linear-gradient(135deg,${C.primary},#2874A6)`} />
                  <StatCard icon={<PawPrint size={14} className="text-white" />} label="Pets" value="416" trend="up" trendLabel="+8 today" gradient={`linear-gradient(135deg,${C.accent},#F39C12)`} />
                  <StatCard icon={<Stethoscope size={14} className="text-white" />} label="Today's Visits" value="19" gradient={`linear-gradient(135deg,${C.success},#2ECC71)`} />
                  <StatCard icon={<CreditCard size={14} className="text-white" />} label="Revenue" value="87.4K" gradient={`linear-gradient(135deg,#8E44AD,#A569BD)`} />
                </div>

                {/* Recent section */}
                <div className="px-4 mb-3">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-bold" style={{ color: C.text }}>Recent Visits</p>
                    <button className="text-xs font-semibold" style={{ color: C.accent }}>See all</button>
                  </div>
                  <div className="space-y-2">
                    <ListItemCard initials="🐕" avatarBg="#FEF3E8" title="Max" subtitle="Checkup · Ali Gauhar" badge={<Badge variant="paid" size="sm" />} meta="Today · 10:30 AM" />
                    <ListItemCard initials="🐈" avatarBg="#EBF5FB" title="Whiskers" subtitle="Vaccination · Sara Bilal" badge={<Badge variant="unpaid" size="sm" />} meta="Today · 11:15 AM" />
                  </div>
                </div>

                {/* FAB + bottom bar */}
                <div className="relative">
                  <div className="absolute -top-5 right-4 z-10">
                    <button
                      className="w-12 h-12 rounded-full flex items-center justify-center shadow-xl"
                      style={{ background: `linear-gradient(135deg,${C.accent},#D35400)` }}
                    >
                      <Plus size={22} className="text-white" />
                    </button>
                  </div>
                  <BottomTabBar active="dashboard" onChange={() => {}} />
                </div>
              </div>
            </PhoneFrame>

            <PhoneFrame title="Pet List Screen">
              <div style={{ backgroundColor: C.bg, fontFamily: FONT }}>
                <TopBar title="All Pets" action="Add" actionIcon={<Plus size={14} />} />

                {/* Search */}
                <div className="px-4 pt-4 pb-2">
                  <div className="flex items-center gap-2 rounded-xl px-3 py-2.5" style={{ backgroundColor: "#fff", border: `1.5px solid ${C.border}`, height: "44px" }}>
                    <Search size={15} style={{ color: C.muted }} />
                    <span className="text-sm" style={{ color: C.muted }}>Search pets…</span>
                  </div>
                </div>

                {/* Filter chips */}
                <div className="flex gap-2 px-4 pb-3 overflow-x-hidden">
                  {["All", "Dogs", "Cats", "Birds", "Other"].map((f, i) => (
                    <span
                      key={f}
                      className="px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap"
                      style={{
                        backgroundColor: i === 0 ? C.primary : "#fff",
                        color: i === 0 ? "#fff" : C.muted,
                        border: `1px solid ${i === 0 ? C.primary : C.border}`,
                      }}
                    >
                      {f}
                    </span>
                  ))}
                </div>

                {/* Pets */}
                <div className="px-4 space-y-2 pb-4">
                  {[
                    { e: "🐕", bg: "#FEF3E8", name: "Max",     breed: "Golden Retriever", owner: "Ali Gauhar",   v: "synced" as BadgeVariant },
                    { e: "🐈", bg: "#EBF5FB", name: "Whiskers",breed: "Persian Cat",       owner: "Sara Bilal",  v: "pending" as BadgeVariant },
                    { e: "🦜", bg: "#EAFAF1", name: "Tweety",  breed: "African Grey",      owner: "M. Khan",     v: "failed" as BadgeVariant },
                    { e: "🐕", bg: "#FEF3E8", name: "Bruno",   breed: "German Shepherd",   owner: "Fatima Raza", v: "synced" as BadgeVariant },
                    { e: "🐈", bg: "#EBF5FB", name: "Luna",    breed: "Siamese Cat",       owner: "Bilal Ahmed", v: "active" as BadgeVariant },
                  ].map((p) => (
                    <ListItemCard
                      key={p.name}
                      initials={p.e}
                      avatarBg={p.bg}
                      title={p.name}
                      subtitle={`${p.breed} · ${p.owner}`}
                      badge={<Badge variant={p.v} size="sm" />}
                    />
                  ))}
                </div>

                <BottomTabBar active="pets" onChange={() => {}} />
              </div>
            </PhoneFrame>
          </div>
        </Section>

        {/* Footer */}
        <div className="pt-10 pb-16 border-t text-center" style={{ borderColor: C.border }}>
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: C.accent }}>
              <PawPrint size={16} className="text-white" />
            </div>
            <span style={{ fontFamily: FONT_H, color: C.primary, fontSize: "1.1rem" }}>VetConnect Lite Design System</span>
          </div>
          <p className="text-sm" style={{ color: C.muted }}>
            Mobile-first · 360px · Plus Jakarta Sans · Design System v1.0
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {["Buttons", "Inputs", "Badges", "Stat Cards", "List Items", "Top Bar", "Bottom Tabs"].map((t) => (
              <Chip key={t} label={t} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
