import { useState, useEffect, useRef } from "react";
import {
  LayoutDashboard, Users, PawPrint, Stethoscope, Syringe,
  CalendarClock, Receipt, BarChart2, RefreshCw, Settings,
  Grid3x3, ChevronRight, Plus, ArrowLeft, Bell, Search,
  Mail, Lock, Phone, User, Calendar, MapPin, Eye, EyeOff,
  Check, X, AlertTriangle, Wifi, WifiOff, Clock, CreditCard,
  TrendingUp, TrendingDown, Activity, Heart, Star, FileText,
  LogOut, Menu, ChevronDown,
} from "lucide-react";

// ─── TOKENS ───────────────────────────────────────────────────────────────────
const C = {
  primary:   "#1B4F72",
  primaryDk: "#154060",
  primaryMd: "#2874A6",
  primaryLt: "#EBF5FB",
  navy:      "#0D2F4F",
  navyLt:    "#132E48",
  accent:    "#E67E22",
  accentDk:  "#D35400",
  accentLt:  "#FEF3E8",
  success:   "#27AE60",
  successLt: "#EAFAF1",
  warning:   "#F39C12",
  warningLt: "#FEF9E7",
  danger:    "#E74C3C",
  dangerLt:  "#FDEDEC",
  blue:      "#2980B9",
  blueLt:    "#EBF5FB",
  bg:        "#F5F7FA",
  card:      "#FFFFFF",
  text:      "#1A1A2E",
  textLt:    "#5A6178",
  muted:     "#8E94A7",
  border:    "#E8ECF1",
  borderDk:  "#D0D5DD",
};
const F = "'Plus Jakarta Sans', sans-serif";

// ─── NAV DATA ─────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { key: "dashboard",    label: "Dashboard",    Icon: LayoutDashboard, badge: null },
  { key: "owners",       label: "Owners",       Icon: Users,           badge: null },
  { key: "pets",         label: "Pets",         Icon: PawPrint,        badge: null },
  { key: "visits",       label: "Visits",       Icon: Stethoscope,     badge: 3    },
  { key: "vaccinations", label: "Vaccinations", Icon: Syringe,         badge: null },
  { key: "followups",    label: "Follow-ups",   Icon: CalendarClock,   badge: 7    },
  { key: "invoices",     label: "Invoices",     Icon: Receipt,         badge: null },
  { key: "reports",      label: "Reports",      Icon: BarChart2,       badge: null },
  { key: "sync",         label: "Sync",         Icon: RefreshCw,       badge: 11   },
  { key: "settings",     label: "Settings",     Icon: Settings,        badge: null },
];
const BOTTOM_TABS = [
  { key: "dashboard", label: "Dashboard", Icon: LayoutDashboard },
  { key: "owners",    label: "Owners",    Icon: Users            },
  { key: "pets",      label: "Pets",      Icon: PawPrint         },
  { key: "visits",    label: "Visits",    Icon: Stethoscope      },
  { key: "more",      label: "More",      Icon: Grid3x3          },
];

// ─── BADGE SYSTEM ─────────────────────────────────────────────────────────────
type BadgeVariant =
  | "synced" | "pending" | "failed"
  | "paid"   | "unpaid"
  | "completed" | "inprogress" | "overdue";

const BADGE_MAP: Record<BadgeVariant, { label: string; bg: string; color: string; dot: string }> = {
  synced:     { label: "Synced",      bg: C.successLt, color: C.success, dot: C.success },
  pending:    { label: "Pending",     bg: C.warningLt, color: C.warning, dot: C.warning },
  failed:     { label: "Failed",      bg: C.dangerLt,  color: C.danger,  dot: C.danger  },
  paid:       { label: "Paid",        bg: C.successLt, color: C.success, dot: C.success },
  unpaid:     { label: "Unpaid",      bg: C.dangerLt,  color: C.danger,  dot: C.danger  },
  completed:  { label: "Completed",   bg: C.successLt, color: C.success, dot: C.success },
  inprogress: { label: "In Progress", bg: C.blueLt,    color: C.blue,    dot: C.blue    },
  overdue:    { label: "Overdue",     bg: C.dangerLt,  color: C.danger,  dot: C.danger  },
};

function StatusBadge({ v, size = "md" }: { v: BadgeVariant; size?: "sm" | "md" | "lg" }) {
  const cfg = BADGE_MAP[v];
  const sz = { sm: { p: "4px 10px", f: "0.65rem" }, md: { p: "5px 12px", f: "0.72rem" }, lg: { p: "7px 16px", f: "0.8rem" } }[size];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full font-semibold whitespace-nowrap"
      style={{ padding: sz.p, backgroundColor: cfg.bg, color: cfg.color, fontSize: sz.f, fontFamily: F }}
    >
      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: cfg.dot }} />
      {cfg.label}
    </span>
  );
}

// ─── SYNC INDICATOR ───────────────────────────────────────────────────────────
function SyncIndicator({ online, pending = 0 }: { online: boolean; pending?: number }) {
  return (
    <div
      className="inline-flex items-center gap-2 rounded-full px-3 py-1.5"
      style={{ backgroundColor: online ? C.successLt : C.warningLt, fontFamily: F }}
    >
      <span className="relative flex-shrink-0">
        <span
          className="w-2 h-2 rounded-full block"
          style={{ backgroundColor: online ? C.success : C.warning }}
        />
        {!online && (
          <span
            className="absolute inset-0 rounded-full animate-ping"
            style={{ backgroundColor: `${C.warning}60` }}
          />
        )}
      </span>
      <span className="text-xs font-semibold" style={{ color: online ? C.success : C.warning }}>
        {online ? "Online" : `Offline · ${pending} pending`}
      </span>
      {online ? <Wifi size={12} style={{ color: C.success }} /> : <WifiOff size={12} style={{ color: C.warning }} />}
    </div>
  );
}

// ─── FAB ─────────────────────────────────────────────────────────────────────
function FAB({ onClick, label }: { onClick?: () => void; label?: string }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 rounded-full shadow-2xl transition-all active:scale-95 hover:shadow-xl"
      style={{
        height: "56px",
        padding: label ? "0 20px 0 16px" : "0",
        width:   label ? "auto" : "56px",
        background: `linear-gradient(135deg, ${C.primary}, ${C.primaryMd})`,
        boxShadow: `0 8px 24px rgba(27,79,114,0.4)`,
        fontFamily: F,
        justifyContent: "center",
      }}
    >
      <Plus size={22} color="#fff" strokeWidth={2.5} />
      {label && <span className="text-sm font-semibold text-white">{label}</span>}
    </button>
  );
}

// ─── TOP BAR ─────────────────────────────────────────────────────────────────
function TopBar({
  title, back = true, action, actionIcon, rightSlot, transparent,
}: {
  title: string; back?: boolean; action?: string; actionIcon?: React.ReactNode;
  rightSlot?: React.ReactNode; transparent?: boolean;
}) {
  return (
    <div
      className="flex items-center gap-3 px-4 flex-shrink-0"
      style={{
        height: "56px",
        backgroundColor: transparent ? "transparent" : C.primary,
        borderBottom: transparent ? `1px solid ${C.border}` : "none",
      }}
    >
      {back && (
        <button
          className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-all"
          style={{ backgroundColor: transparent ? C.primaryLt : "rgba(255,255,255,0.14)" }}
        >
          <ArrowLeft size={17} color={transparent ? C.primary : "#fff"} />
        </button>
      )}
      <p
        className="flex-1 font-semibold truncate"
        style={{
          color: transparent ? C.text : "#fff",
          fontSize: "0.9375rem",
          fontFamily: F,
        }}
      >
        {title}
      </p>
      {rightSlot}
      {action && (
        <button
          className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold"
          style={{ backgroundColor: C.accent, color: "#fff", fontFamily: F }}
        >
          {actionIcon}
          {action}
        </button>
      )}
    </div>
  );
}

// ─── SIDEBAR ─────────────────────────────────────────────────────────────────
function Sidebar({
  active, onChange, collapsed = false,
}: {
  active: string; onChange: (k: string) => void; collapsed?: boolean;
}) {
  return (
    <aside
      className="flex flex-col flex-shrink-0 h-full overflow-y-auto"
      style={{
        width: collapsed ? "64px" : "240px",
        backgroundColor: C.navy,
        transition: "width 0.25s ease",
      }}
    >
      {/* Brand */}
      <div
        className="flex items-center gap-3 px-4 flex-shrink-0"
        style={{
          height: "64px",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: `linear-gradient(135deg, ${C.accent}, ${C.accentDk})` }}
        >
          <PawPrint size={18} color="#fff" strokeWidth={1.8} />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <p style={{ color: "#fff", fontFamily: F, fontSize: "0.875rem", fontWeight: 700, lineHeight: 1.2 }}>
              VetConnect Lite
            </p>
            <p style={{ color: "rgba(255,255,255,0.45)", fontFamily: F, fontSize: "0.65rem" }}>
              Clinic Admin
            </p>
          </div>
        )}
      </div>

      {/* Nav section label */}
      {!collapsed && (
        <p
          className="px-4 pt-4 pb-1"
          style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.625rem", fontFamily: F, fontWeight: 700, letterSpacing: "0.1em" }}
        >
          MAIN MENU
        </p>
      )}

      {/* Nav items */}
      <nav className="flex-1 px-2 py-2 space-y-0.5">
        {NAV_ITEMS.map(({ key, label, Icon, badge }) => {
          const isActive = active === key;
          return (
            <button
              key={key}
              onClick={() => onChange(key)}
              title={collapsed ? label : undefined}
              className="w-full flex items-center gap-3 rounded-xl px-3 transition-all duration-150 group relative"
              style={{
                height: "42px",
                backgroundColor: isActive ? "rgba(230,126,34,0.15)" : "transparent",
                color: isActive ? C.accent : "rgba(255,255,255,0.65)",
                justifyContent: collapsed ? "center" : "flex-start",
              }}
            >
              {/* Active indicator */}
              {isActive && (
                <span
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-full"
                  style={{ backgroundColor: C.accent }}
                />
              )}

              <Icon
                size={17}
                strokeWidth={isActive ? 2.2 : 1.6}
                style={{
                  color: isActive ? C.accent : "rgba(255,255,255,0.6)",
                  flexShrink: 0,
                  transition: "color 0.15s",
                }}
              />

              {!collapsed && (
                <>
                  <span
                    className="flex-1 text-left text-sm truncate"
                    style={{ fontFamily: F, fontWeight: isActive ? 600 : 400, color: isActive ? "#fff" : "rgba(255,255,255,0.7)" }}
                  >
                    {label}
                  </span>
                  {badge !== null && (
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center text-white flex-shrink-0"
                      style={{ backgroundColor: C.danger, fontSize: "0.6rem", fontWeight: 700 }}
                    >
                      {badge}
                    </span>
                  )}
                </>
              )}

              {/* Tooltip on collapsed */}
              {collapsed && (
                <div
                  className="absolute left-full ml-2 px-2.5 py-1 rounded-lg text-xs whitespace-nowrap z-50 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: C.navy, color: "#fff", fontFamily: F, border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  {label}
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Sync status + user */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", padding: "12px 8px" }}>
        {!collapsed && (
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-xl mb-2"
            style={{ backgroundColor: "rgba(39,174,96,0.12)" }}
          >
            <span className="relative">
              <span className="w-2 h-2 rounded-full block" style={{ backgroundColor: C.success }} />
              <span className="absolute inset-0 rounded-full animate-ping" style={{ backgroundColor: `${C.success}50` }} />
            </span>
            <span style={{ color: C.success, fontFamily: F, fontSize: "0.72rem", fontWeight: 600 }}>Online · Synced</span>
            <Wifi size={11} style={{ color: C.success, marginLeft: "auto" }} />
          </div>
        )}
        <button
          className="w-full flex items-center gap-3 rounded-xl px-3 py-2 transition-colors hover:bg-white/5"
          style={{ color: "rgba(255,255,255,0.6)", justifyContent: collapsed ? "center" : "flex-start" }}
        >
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: C.accent, fontSize: "0.7rem", color: "#fff", fontWeight: 700, fontFamily: F }}
          >
            DR
          </div>
          {!collapsed && (
            <div className="flex-1 text-left overflow-hidden">
              <p style={{ color: "#fff", fontSize: "0.75rem", fontFamily: F, fontWeight: 600, lineHeight: 1.2 }}>Dr. Raza</p>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.65rem", fontFamily: F }}>Admin</p>
            </div>
          )}
          {!collapsed && <LogOut size={14} style={{ flexShrink: 0 }} />}
        </button>
      </div>
    </aside>
  );
}

// ─── BOTTOM TAB BAR ───────────────────────────────────────────────────────────
function BottomTabBar({ active, onChange }: { active: string; onChange: (k: string) => void }) {
  return (
    <div
      className="flex items-stretch flex-shrink-0"
      style={{
        height: "64px",
        backgroundColor: C.card,
        borderTop: `1px solid ${C.border}`,
        boxShadow: "0 -4px 20px rgba(0,0,0,0.06)",
      }}
    >
      {BOTTOM_TABS.map(({ key, label, Icon }) => {
        const isActive = active === key;
        return (
          <button
            key={key}
            onClick={() => onChange(key)}
            className="flex-1 flex flex-col items-center justify-center gap-0.5 relative"
            style={{ color: isActive ? C.primary : C.muted }}
          >
            {isActive && (
              <span
                className="absolute top-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full"
                style={{ backgroundColor: C.accent, width: "28px" }}
              />
            )}
            <div
              className="w-9 h-7 rounded-xl flex items-center justify-center transition-all"
              style={{ backgroundColor: isActive ? C.primaryLt : "transparent" }}
            >
              <Icon size={18} strokeWidth={isActive ? 2.2 : 1.5} />
            </div>
            <span style={{ fontSize: "0.6rem", fontWeight: isActive ? 700 : 500, fontFamily: F, lineHeight: 1 }}>
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ─── BUTTONS ─────────────────────────────────────────────────────────────────
function Btn({
  label, variant = "primary", size = "md", icon, disabled, loading, fullWidth,
}: {
  label: string; variant?: "primary" | "accent" | "outline" | "danger" | "ghost";
  size?: "sm" | "md" | "lg"; icon?: React.ReactNode;
  disabled?: boolean; loading?: boolean; fullWidth?: boolean;
}) {
  const variants = {
    primary: { bg: `linear-gradient(135deg, ${C.primary}, ${C.primaryMd})`, color: "#fff", border: "none", shadow: `0 4px 14px rgba(27,79,114,0.3)` },
    accent:  { bg: `linear-gradient(135deg, ${C.accent}, ${C.accentDk})`,   color: "#fff", border: "none", shadow: `0 4px 14px rgba(230,126,34,0.3)` },
    outline: { bg: "transparent", color: C.primary, border: `1.5px solid ${C.primary}`, shadow: "none" },
    danger:  { bg: `linear-gradient(135deg, ${C.danger}, #C0392B)`,  color: "#fff", border: "none", shadow: `0 4px 14px rgba(231,76,60,0.3)` },
    ghost:   { bg: C.primaryLt,   color: C.primary, border: "none", shadow: "none" },
  };
  const sizes = {
    sm: { h: "36px", px: "14px", fs: "0.78rem" },
    md: { h: "48px", px: "20px", fs: "0.875rem" },
    lg: { h: "52px", px: "24px", fs: "0.9375rem" },
  };
  const v = variants[variant];
  const s = sizes[size];
  return (
    <button
      disabled={disabled || loading}
      className="inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all active:scale-95"
      style={{
        height: s.h, padding: `0 ${s.px}`, fontSize: s.fs,
        background: v.bg, color: v.color, border: v.border,
        boxShadow: v.shadow, fontFamily: F,
        opacity: disabled ? 0.45 : 1,
        cursor: disabled || loading ? "not-allowed" : "pointer",
        width: fullWidth ? "100%" : "auto",
      }}
    >
      {loading ? (
        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
      ) : icon}
      {label}
    </button>
  );
}

// ─── INPUT FIELD ─────────────────────────────────────────────────────────────
function InputField({
  label, placeholder, type = "text", icon, error, disabled, value, onChange, hint, trailing,
}: {
  label?: string; placeholder: string; type?: string; icon?: React.ReactNode;
  error?: string; disabled?: boolean; value?: string; onChange?: (v: string) => void;
  hint?: string; trailing?: React.ReactNode;
}) {
  const [focused, setFocused] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const inputType = type === "password" ? (showPw ? "text" : "password") : type;
  const borderColor = error ? C.danger : focused ? C.primary : C.border;
  return (
    <div style={{ fontFamily: F }}>
      {label && (
        <label className="block mb-1.5 text-xs font-semibold uppercase tracking-wide" style={{ color: C.textLt }}>
          {label}
        </label>
      )}
      <div
        className="flex items-center gap-3 rounded-lg px-3.5 transition-all"
        style={{
          height: "48px",
          backgroundColor: disabled ? "#F8FAFC" : focused ? "#fff" : "#F8FAFC",
          border: `1.5px solid ${borderColor}`,
          borderRadius: "8px",
          boxShadow: focused ? `0 0 0 3px ${error ? C.dangerLt : C.primaryLt}` : "none",
        }}
      >
        {icon && <span style={{ color: focused ? C.primary : C.muted, display: "flex", flexShrink: 0 }}>{icon}</span>}
        <input
          type={inputType}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="flex-1 bg-transparent outline-none text-sm"
          style={{ color: C.text, fontFamily: F }}
        />
        {type === "password" ? (
          <button type="button" onClick={() => setShowPw((p) => !p)} style={{ color: C.muted, display: "flex" }}>
            {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        ) : trailing ? (
          <span style={{ color: C.muted, display: "flex", flexShrink: 0 }}>{trailing}</span>
        ) : null}
      </div>
      {error && (
        <p className="flex items-center gap-1 mt-1.5 text-xs" style={{ color: C.danger }}>
          <AlertTriangle size={11} /> {error}
        </p>
      )}
      {hint && !error && (
        <p className="mt-1 text-xs" style={{ color: C.muted }}>{hint}</p>
      )}
    </div>
  );
}

// ─── STAT CARD ───────────────────────────────────────────────────────────────
function StatCard({
  icon, label, value, sub, borderColor, iconBg, iconColor, trend,
}: {
  icon: React.ReactNode; label: string; value: string | number; sub?: string;
  borderColor: string; iconBg: string; iconColor: string; trend?: "up" | "down";
}) {
  return (
    <div
      className="bg-white rounded-xl p-4 relative overflow-hidden flex gap-3 items-start"
      style={{ border: `1px solid ${C.border}`, borderLeft: `4px solid ${borderColor}`, boxShadow: "0 1px 8px rgba(0,0,0,0.05)" }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: iconBg }}
      >
        <span style={{ color: iconColor, display: "flex" }}>{icon}</span>
      </div>
      <div className="flex-1 min-w-0">
        <p style={{ fontFamily: F, fontSize: "1.625rem", fontWeight: 700, color: C.text, lineHeight: 1 }}>{value}</p>
        <p className="mt-0.5 text-xs" style={{ color: C.muted, fontFamily: F }}>{label}</p>
        {sub && (
          <div className="flex items-center gap-1 mt-1.5">
            {trend === "up" ? <TrendingUp size={11} style={{ color: C.success }} /> :
             trend === "down" ? <TrendingDown size={11} style={{ color: C.danger }} /> :
             <Activity size={11} style={{ color: C.muted }} />}
            <span style={{ fontSize: "0.68rem", color: trend === "up" ? C.success : trend === "down" ? C.danger : C.muted, fontFamily: F }}>{sub}</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── LIST CARD ────────────────────────────────────────────────────────────────
function ListCard({
  avatar, avatarBg, title, subtitle, badge, meta, onClick,
}: {
  avatar: React.ReactNode; avatarBg?: string; title: string; subtitle: string;
  badge?: React.ReactNode; meta?: string; onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-3.5 bg-white rounded-xl text-left transition-colors hover:bg-slate-50 active:bg-slate-100"
      style={{ border: `1px solid ${C.border}`, boxShadow: "0 1px 4px rgba(0,0,0,0.04)", fontFamily: F }}
    >
      <div
        className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden"
        style={{ backgroundColor: avatarBg ?? C.primaryLt }}
      >
        {avatar}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-semibold truncate" style={{ color: C.text }}>{title}</span>
          {badge}
        </div>
        <p className="text-xs truncate mt-0.5" style={{ color: C.muted }}>{subtitle}</p>
        {meta && <p className="text-xs mt-0.5" style={{ color: C.textLt }}>{meta}</p>}
      </div>
      <ChevronRight size={16} style={{ color: C.muted, flexShrink: 0 }} />
    </button>
  );
}

// ─── SECTION WRAPPER ─────────────────────────────────────────────────────────
function Section({ title, subtitle, id, children }: { title: string; subtitle?: string; id?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mb-12 scroll-mt-6">
      <div className="flex items-start gap-3 mb-6">
        <div className="flex-1">
          <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: "1.125rem", color: C.text, lineHeight: 1.3 }}>{title}</h2>
          {subtitle && <p className="mt-1 text-sm" style={{ color: C.muted, fontFamily: F }}>{subtitle}</p>}
        </div>
      </div>
      {children}
    </section>
  );
}

// ─── PANEL (card wrapper) ─────────────────────────────────────────────────────
function Panel({ title, children, className = "" }: { title?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-2xl ${className}`} style={{ border: `1px solid ${C.border}` }}>
      {title && (
        <div className="px-5 py-3 border-b" style={{ borderColor: C.border }}>
          <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: C.muted, fontFamily: F }}>{title}</p>
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  );
}

// ─── COLOR SWATCH ─────────────────────────────────────────────────────────────
function Swatch({ label, hex, dark }: { label: string; hex: string; dark?: boolean }) {
  return (
    <div className="flex flex-col" style={{ fontFamily: F }}>
      <div className="w-full h-12 rounded-xl mb-2 shadow-sm" style={{ backgroundColor: hex, border: `1px solid rgba(0,0,0,0.06)` }} />
      <p className="text-xs font-semibold" style={{ color: C.text }}>{label}</p>
      <p className="text-xs" style={{ color: C.muted }}>{hex}</p>
    </div>
  );
}

// ─── BREAKPOINT PILL ─────────────────────────────────────────────────────────
function BpPill({ label, active }: { label: string; active: boolean }) {
  return (
    <span
      className="px-2.5 py-1 rounded-full text-xs font-semibold"
      style={{
        backgroundColor: active ? C.primary : C.border,
        color: active ? "#fff" : C.muted,
        fontFamily: F,
      }}
    >
      {label}
    </span>
  );
}

// ─── MAIN LAYOUT ─────────────────────────────────────────────────────────────
export function DesignSystemV2Page() {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [collapsed,  setCollapsed]  = useState(false);
  const [mobileNav, setMobileNav]  = useState(false);
  const [online,    setOnline]     = useState(true);
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1280);

  useEffect(() => {
    const fn = () => setWidth(window.innerWidth);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024;

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: C.bg, fontFamily: F }}>

      {/* ── SIDEBAR (tablet+) ── */}
      {!isMobile && (
        <Sidebar active={activeNav} onChange={setActiveNav} collapsed={collapsed && isDesktop} />
      )}

      {/* ── MOBILE NAV OVERLAY ── */}
      {isMobile && mobileNav && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/50" onClick={() => setMobileNav(false)} />
          <div className="w-72 h-full flex-shrink-0">
            <Sidebar active={activeTab} onChange={(k) => { setActiveTab(k); setMobileNav(false); }} />
          </div>
        </div>
      )}

      {/* ── MAIN CONTENT ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* ── GLOBAL TOP BAR ── */}
        <div
          className="flex items-center gap-3 px-4 flex-shrink-0"
          style={{ height: "56px", backgroundColor: C.primary }}
        >
          {/* Mobile: hamburger + brand */}
          {isMobile && (
            <button
              onClick={() => setMobileNav(true)}
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: "rgba(255,255,255,0.13)" }}
            >
              <Menu size={17} color="#fff" />
            </button>
          )}

          {/* Desktop: collapse toggle */}
          {isDesktop && (
            <button
              onClick={() => setCollapsed((c) => !c)}
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: "rgba(255,255,255,0.13)" }}
            >
              <Menu size={17} color="#fff" />
            </button>
          )}

          <p style={{ color: "#fff", fontFamily: F, fontWeight: 700, fontSize: "0.9375rem", flex: 1 }} className="truncate">
            {isMobile ? "VetConnect Lite" : "Design System · Responsive"}
          </p>

          {/* Breakpoint chips */}
          <div className="hidden sm:flex items-center gap-1.5">
            <BpPill label="360px" active={isMobile} />
            <BpPill label="768px" active={isTablet} />
            <BpPill label="1280px" active={isDesktop} />
          </div>

          {/* Online toggle */}
          <button
            onClick={() => setOnline((v) => !v)}
            className="flex items-center gap-1.5 rounded-full px-2.5 py-1 ml-2"
            style={{ backgroundColor: online ? "rgba(39,174,96,0.2)" : "rgba(243,156,18,0.2)" }}
          >
            {online ? <Wifi size={13} style={{ color: "#6FEEA6" }} /> : <WifiOff size={13} style={{ color: C.warning }} />}
            {!isMobile && (
              <span style={{ fontSize: "0.7rem", color: online ? "#6FEEA6" : C.warning, fontFamily: F }}>
                {online ? "Online" : "Offline"}
              </span>
            )}
          </button>

          <button
            className="w-8 h-8 rounded-xl flex items-center justify-center relative"
            style={{ backgroundColor: "rgba(255,255,255,0.13)" }}
          >
            <Bell size={16} color="#fff" />
            <span
              className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-white"
              style={{ backgroundColor: C.danger, fontSize: "0.5rem", fontWeight: 700 }}
            >3</span>
          </button>
        </div>

        {/* ── SCROLLABLE CONTENT ── */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 pb-24">

            {/* ── HERO ── */}
            <div
              className="rounded-2xl p-6 mb-8 relative overflow-hidden"
              style={{ background: `linear-gradient(135deg, ${C.navy} 0%, ${C.primary} 70%, ${C.primaryMd} 100%)` }}
            >
              <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.04)" }} />
              <div className="absolute bottom-0 left-1/3 w-24 h-24 rounded-full" style={{ backgroundColor: "rgba(230,126,34,0.1)" }} />
              <div className="relative z-10">
                <div className="flex items-start justify-between flex-wrap gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.72rem", fontFamily: F }}>
                        Design System · Prompt 0 · Responsive Edition
                      </span>
                    </div>
                    <h1 style={{ fontFamily: F, fontWeight: 700, fontSize: "clamp(1.25rem,3vw,1.75rem)", color: "#fff", lineHeight: 1.25 }}>
                      VetConnect Lite Design System
                    </h1>
                    <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.875rem", fontFamily: F, marginTop: "6px", maxWidth: "480px", lineHeight: 1.6 }}>
                      Mobile-first PWA design system. Resize the window to see the nav switch between bottom tab bar (mobile) and sidebar (tablet/desktop).
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <SyncIndicator online={online} pending={11} />
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-5">
                  {["Colors", "Typography", "Buttons", "Inputs", "Badges", "Stat Cards", "List Cards", "Top Bar", "Navigation", "Sync", "FAB"].map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-lg text-xs font-semibold"
                      style={{ backgroundColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.8)", fontFamily: F }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* ─────────────────────────────────────── */}
            {/* 1. COLORS                              */}
            {/* ─────────────────────────────────────── */}
            <Section title="Color Palette" subtitle="Design tokens used across all components">
              <div className="space-y-5">
                <Panel title="Brand">
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
                    <Swatch label="Primary"  hex={C.primary} />
                    <Swatch label="Navy"     hex={C.navy} />
                    <Swatch label="Accent"   hex={C.accent} />
                    <Swatch label="Bg"       hex={C.bg} />
                    <Swatch label="Card"     hex={C.card} />
                    <Swatch label="Text"     hex={C.text} />
                  </div>
                </Panel>
                <Panel title="Semantic">
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
                    <Swatch label="Success"  hex={C.success} />
                    <Swatch label="Warning"  hex={C.warning} />
                    <Swatch label="Danger"   hex={C.danger} />
                    <Swatch label="Blue"     hex={C.blue} />
                    <Swatch label="Text Lt"  hex={C.textLt} />
                    <Swatch label="Muted"    hex={C.muted} />
                  </div>
                </Panel>
              </div>
            </Section>

            {/* ─────────────────────────────────────── */}
            {/* 2. TYPOGRAPHY                           */}
            {/* ─────────────────────────────────────── */}
            <Section title="Typography" subtitle="Plus Jakarta Sans · Titles 20px semibold · Body 14px · Labels 12px uppercase">
              <Panel>
                <div className="space-y-4">
                  {[
                    { role: "Title",   size: "20px semibold", sample: "Appointment Dashboard",    fs: "1.25rem",   fw: 600 },
                    { role: "Section", size: "18px semibold", sample: "Patient Health Records",   fs: "1.125rem",  fw: 600 },
                    { role: "Body",    size: "14px regular",  sample: "Ali Gauhar's golden retriever Max had a general checkup today.", fs: "0.875rem", fw: 400 },
                    { role: "Label",   size: "12px uppercase",sample: "STATUS · LAST SYNCED · OWNER NAME", fs: "0.75rem", fw: 700, upper: true },
                    { role: "Caption", size: "12px regular",  sample: "Last synced 3 minutes ago", fs: "0.75rem",  fw: 400 },
                  ].map((t) => (
                    <div key={t.role} className="flex flex-col sm:flex-row sm:items-baseline gap-2 pb-4 border-b last:border-0 last:pb-0" style={{ borderColor: C.border }}>
                      <div className="w-28 flex-shrink-0">
                        <span className="text-xs font-semibold px-2 py-0.5 rounded" style={{ backgroundColor: C.primaryLt, color: C.primary, fontFamily: F }}>{t.role}</span>
                        <p className="text-xs mt-1" style={{ color: C.muted, fontFamily: F }}>{t.size}</p>
                      </div>
                      <p style={{ fontFamily: F, fontSize: t.fs, fontWeight: t.fw, color: C.text, letterSpacing: t.upper ? "0.08em" : "normal", lineHeight: 1.4 }}>
                        {t.sample}
                      </p>
                    </div>
                  ))}
                </div>
              </Panel>
            </Section>

            {/* ─────────────────────────────────────── */}
            {/* 3. BUTTONS                             */}
            {/* ─────────────────────────────────────── */}
            <Section title="Buttons" subtitle="4 variants · 3 sizes · 48px min height · Loading + Disabled states">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Panel title="Variants · Default (48px)">
                  <div className="flex flex-wrap gap-3">
                    <Btn label="Primary"  variant="primary"  icon={<Plus size={15} />} />
                    <Btn label="Accent"   variant="accent"   icon={<Calendar size={15} />} />
                    <Btn label="Outline"  variant="outline"  icon={<Search size={15} />} />
                    <Btn label="Danger"   variant="danger"   icon={<X size={15} />} />
                  </div>
                </Panel>

                <Panel title="Sizes">
                  <div className="flex flex-wrap items-center gap-3">
                    <Btn label="Small · 36px"  size="sm" />
                    <Btn label="Default · 48px" size="md" />
                    <Btn label="Large · 52px"  size="lg" />
                  </div>
                </Panel>

                <Panel title="States">
                  <div className="flex flex-wrap gap-3">
                    <Btn label="Normal"   />
                    <Btn label="Loading…" loading />
                    <Btn label="Disabled" disabled />
                    <Btn label="Outline disabled" variant="outline" disabled />
                  </div>
                </Panel>

                <Panel title="Full Width">
                  <div className="space-y-3">
                    <Btn label="Sign In" variant="primary" fullWidth icon={<ChevronRight size={15} />} />
                    <Btn label="Book Appointment" variant="accent" fullWidth icon={<Calendar size={15} />} />
                    <Btn label="Delete Record" variant="danger" fullWidth icon={<X size={15} />} />
                  </div>
                </Panel>
              </div>
            </Section>

            {/* ─────────────────────────────────────── */}
            {/* 4. INPUTS                              */}
            {/* ─────────────────────────────────────── */}
            <Section title="Input Fields" subtitle="48px height · 8px radius · Left icon · Multiple states">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Panel title="Default States">
                  <div className="space-y-4">
                    <InputField label="Email Address" placeholder="doctor@clinic.pk" icon={<Mail size={16} />} />
                    <InputField label="Password" type="password" placeholder="Enter password" icon={<Lock size={16} />} />
                    <InputField label="Phone" placeholder="+92 300 0000000" icon={<Phone size={16} />} />
                  </div>
                </Panel>

                <Panel title="Validation &amp; Utility">
                  <div className="space-y-4">
                    <InputField label="Pet Name" placeholder="e.g. Max" icon={<PawPrint size={16} />} error="Pet name is required" />
                    <InputField label="Clinic ID" placeholder="VC-2026-00142" icon={<FileText size={16} />} disabled hint="Auto-generated" />
                    <InputField
                      label="Search"
                      placeholder="Search owners, pets…"
                      icon={<Search size={16} />}
                      trailing={<X size={14} />}
                    />
                  </div>
                </Panel>
              </div>
            </Section>

            {/* ─────────────────────────────────────── */}
            {/* 5. STATUS BADGES                        */}
            {/* ─────────────────────────────────────── */}
            <Section title="Status Badges" subtitle="8 semantic pill variants · 3 sizes">
              <Panel>
                <div className="space-y-6">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: C.muted, fontFamily: F }}>Sync Status</p>
                    <div className="flex flex-wrap gap-2.5">
                      <StatusBadge v="synced" />
                      <StatusBadge v="pending" />
                      <StatusBadge v="failed" />
                    </div>
                  </div>
                  <div className="h-px" style={{ backgroundColor: C.border }} />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: C.muted, fontFamily: F }}>Payment Status</p>
                    <div className="flex flex-wrap gap-2.5">
                      <StatusBadge v="paid" />
                      <StatusBadge v="unpaid" />
                    </div>
                  </div>
                  <div className="h-px" style={{ backgroundColor: C.border }} />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: C.muted, fontFamily: F }}>Task / Visit Status</p>
                    <div className="flex flex-wrap gap-2.5">
                      <StatusBadge v="completed" />
                      <StatusBadge v="inprogress" />
                      <StatusBadge v="overdue" />
                    </div>
                  </div>
                  <div className="h-px" style={{ backgroundColor: C.border }} />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: C.muted, fontFamily: F }}>Sizes</p>
                    <div className="flex flex-wrap items-center gap-3">
                      <StatusBadge v="synced" size="sm" />
                      <StatusBadge v="synced" size="md" />
                      <StatusBadge v="synced" size="lg" />
                      <StatusBadge v="inprogress" size="sm" />
                      <StatusBadge v="inprogress" size="md" />
                      <StatusBadge v="overdue" size="lg" />
                    </div>
                  </div>
                </div>
              </Panel>
            </Section>

            {/* ─────────────────────────────────────── */}
            {/* 6. STAT CARDS                           */}
            {/* ─────────────────────────────────────── */}
            <Section title="Stat Cards" subtitle="Colored left border · Icon circle · Big number · Label · Trend">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                  icon={<Users size={18} />} label="Total Owners" value="248"
                  borderColor={C.primary} iconBg={C.primaryLt} iconColor={C.primary}
                  sub="+12 this week" trend="up"
                />
                <StatCard
                  icon={<PawPrint size={18} />} label="Pets Registered" value="416"
                  borderColor={C.accent} iconBg={C.accentLt} iconColor={C.accent}
                  sub="+8 today" trend="up"
                />
                <StatCard
                  icon={<Stethoscope size={18} />} label="Visits Today" value="19"
                  borderColor={C.success} iconBg={C.successLt} iconColor={C.success}
                  sub="Same as yesterday"
                />
                <StatCard
                  icon={<CreditCard size={18} />} label="Revenue (PKR)" value="87.4K"
                  borderColor="#8E44AD" iconBg="#F5EEF8" iconColor="#8E44AD"
                  sub="-3% vs last week" trend="down"
                />
                <StatCard
                  icon={<CalendarClock size={18} />} label="Follow-ups Due" value="7"
                  borderColor={C.warning} iconBg={C.warningLt} iconColor={C.warning}
                  sub="3 overdue" trend="down"
                />
                <StatCard
                  icon={<Syringe size={18} />} label="Vaccinations" value="34"
                  borderColor={C.success} iconBg={C.successLt} iconColor={C.success}
                  sub="This month" trend="up"
                />
                <StatCard
                  icon={<RefreshCw size={18} />} label="Pending Sync" value="11"
                  borderColor={C.warning} iconBg={C.warningLt} iconColor={C.warning}
                  sub="Last sync: 5m ago"
                />
                <StatCard
                  icon={<Heart size={18} />} label="Critical Cases" value="2"
                  borderColor={C.danger} iconBg={C.dangerLt} iconColor={C.danger}
                  sub="Needs attention" trend="down"
                />
              </div>
            </Section>

            {/* ─────────────────────────────────────── */}
            {/* 7. LIST CARDS                           */}
            {/* ─────────────────────────────────────── */}
            <Section title="List Cards" subtitle="Avatar · Title · Subtitle · Badge · Meta · Chevron right">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <Panel title="Pet Owners">
                  <div className="space-y-2.5">
                    {[
                      { init: "AG", bg: C.primary, name: "Ali Gauhar",      sub: "2 pets · +92 300 1234567", badge: "synced" as BadgeVariant,  meta: "Last visit: Apr 25, 2026" },
                      { init: "SB", bg: "#8E44AD", name: "Sara Bilal",      sub: "1 pet · +92 321 9876543",  badge: "pending" as BadgeVariant, meta: "Last visit: Apr 20, 2026" },
                      { init: "MK", bg: C.accent,  name: "Muhammad Khan",   sub: "3 pets · +92 333 5554444", badge: "synced" as BadgeVariant,  meta: "Last visit: Mar 12, 2026" },
                      { init: "FR", bg: C.success, name: "Fatima Raza",     sub: "1 pet · +92 345 1231234",  badge: "failed" as BadgeVariant,  meta: "Last visit: Apr 10, 2026" },
                    ].map((o) => (
                      <ListCard
                        key={o.name}
                        avatar={<span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#fff", fontFamily: F }}>{o.init}</span>}
                        avatarBg={o.bg}
                        title={o.name}
                        subtitle={o.sub}
                        badge={<StatusBadge v={o.badge} size="sm" />}
                        meta={o.meta}
                      />
                    ))}
                  </div>
                </Panel>

                <Panel title="Pets">
                  <div className="space-y-2.5">
                    {[
                      { emo: "🐕", bg: C.accentLt,  name: "Max",     breed: "Golden Retriever · 3y", badge: "completed" as BadgeVariant },
                      { emo: "🐈", bg: C.blueLt,    name: "Whiskers",breed: "Persian Cat · 5y",       badge: "inprogress" as BadgeVariant},
                      { emo: "🦜", bg: C.successLt, name: "Tweety",  breed: "African Grey · 2y",      badge: "overdue" as BadgeVariant   },
                      { emo: "🐕", bg: C.primaryLt, name: "Bruno",   breed: "German Shepherd · 4y",   badge: "completed" as BadgeVariant },
                    ].map((p) => (
                      <ListCard
                        key={p.name}
                        avatar={<span style={{ fontSize: "1.25rem" }}>{p.emo}</span>}
                        avatarBg={p.bg}
                        title={p.name}
                        subtitle={p.breed}
                        badge={<StatusBadge v={p.badge} size="sm" />}
                        meta={`Visits: ${Math.floor(Math.random() * 8) + 1}`}
                      />
                    ))}
                  </div>
                </Panel>

                <Panel title="Visits">
                  <div className="space-y-2.5">
                    {[
                      { Icon: Stethoscope, bg: C.primaryLt, c: C.primary, title: "General Checkup",   sub: "Max · Dr. Ahmed",   badge: "paid" as BadgeVariant,    meta: "Apr 25 · PKR 1,500" },
                      { Icon: Syringe,     bg: C.accentLt,  c: C.accent,  title: "Vaccination",        sub: "Whiskers · Dr. Raza",badge: "unpaid" as BadgeVariant,  meta: "Apr 22 · PKR 800"   },
                      { Icon: Heart,       bg: C.dangerLt,  c: C.danger,  title: "Emergency Visit",    sub: "Bruno · Dr. Ahmed", badge: "paid" as BadgeVariant,    meta: "Apr 18 · PKR 4,200" },
                    ].map((v) => (
                      <ListCard
                        key={v.title}
                        avatar={<v.Icon size={18} style={{ color: v.c }} />}
                        avatarBg={v.bg}
                        title={v.title}
                        subtitle={v.sub}
                        badge={<StatusBadge v={v.badge} size="sm" />}
                        meta={v.meta}
                      />
                    ))}
                  </div>
                </Panel>

                <Panel title="Invoices">
                  <div className="space-y-2.5">
                    {[
                      { Icon: Receipt, bg: C.successLt, c: C.success, title: "INV-2026-0041", sub: "Ali Gauhar · Checkup",   badge: "paid" as BadgeVariant,   meta: "PKR 1,500 · Apr 25" },
                      { Icon: Receipt, bg: C.dangerLt,  c: C.danger,  title: "INV-2026-0039", sub: "M. Khan · Surgery",      badge: "unpaid" as BadgeVariant, meta: "PKR 12,000 · Apr 18"},
                      { Icon: Receipt, bg: C.warningLt, c: C.warning, title: "INV-2026-0035", sub: "Sara Bilal · Dental",    badge: "unpaid" as BadgeVariant, meta: "PKR 3,500 · Apr 10" },
                    ].map((i) => (
                      <ListCard
                        key={i.title}
                        avatar={<i.Icon size={18} style={{ color: i.c }} />}
                        avatarBg={i.bg}
                        title={i.title}
                        subtitle={i.sub}
                        badge={<StatusBadge v={i.badge} size="sm" />}
                        meta={i.meta}
                      />
                    ))}
                  </div>
                </Panel>
              </div>
            </Section>

            {/* ─────────────────────────────────────── */}
            {/* 8. TOP BAR                             */}
            {/* ─────────────────────────────────────── */}
            <Section title="Top Bar" subtitle="56px · Back arrow · Title · Action button · 4 real-world variants">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  {
                    label: "List screen",
                    node: <TopBar title="Pet Owners" action="Add" actionIcon={<Plus size={13} />} />,
                  },
                  {
                    label: "Detail screen",
                    node: <TopBar title="Max — Golden Retriever" action="Edit" />,
                  },
                  {
                    label: "White / transparent",
                    node: <TopBar title="Invoice #0041" transparent action="Print" />,
                  },
                  {
                    label: "With search + bell",
                    node: (
                      <TopBar
                        title="Visits"
                        rightSlot={
                          <div className="flex items-center gap-2">
                            <button className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: "rgba(255,255,255,0.13)" }}>
                              <Search size={15} color="#fff" />
                            </button>
                            <button className="w-8 h-8 rounded-xl flex items-center justify-center relative" style={{ backgroundColor: "rgba(255,255,255,0.13)" }}>
                              <Bell size={15} color="#fff" />
                              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: C.danger, fontSize: "0.5rem", fontWeight: 700 }}>3</span>
                            </button>
                          </div>
                        }
                      />
                    ),
                  },
                ].map(({ label, node }) => (
                  <Panel key={label} title={label}>
                    <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${C.border}` }}>
                      {node}
                      <div className="px-4 py-3" style={{ backgroundColor: C.bg }}>
                        <p className="text-xs" style={{ color: C.muted, fontFamily: F }}>Screen content area</p>
                      </div>
                    </div>
                  </Panel>
                ))}
              </div>
            </Section>

            {/* ─────────────────────────────────────── */}
            {/* 9. NAVIGATION (responsive demo)         */}
            {/* ─────────────────────────────────────── */}
            <Section title="Navigation" subtitle="Bottom tab bar (mobile 360px) → Left sidebar (tablet/desktop) · Resize to see it switch live above">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Mobile bottom tabs */}
                <Panel title="Mobile · Bottom Tab Bar (360px)">
                  <div
                    className="rounded-2xl overflow-hidden mx-auto"
                    style={{ width: "320px", border: "6px solid #1A1A2E", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}
                  >
                    {/* Status bar */}
                    <div className="flex justify-between items-center px-4 py-1.5" style={{ backgroundColor: C.primary }}>
                      <span style={{ color: "#fff", fontSize: "0.65rem", fontWeight: 700, fontFamily: F }}>9:41</span>
                      <div className="flex gap-1">{[1,2,3].map(i => <div key={i} className="w-3 h-1.5 rounded bg-white opacity-70" />)}</div>
                    </div>
                    {/* Top bar */}
                    <div className="flex items-center gap-2 px-3" style={{ height: "48px", backgroundColor: C.primary }}>
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: C.accent }}>
                        <PawPrint size={13} color="#fff" />
                      </div>
                      <span style={{ color: "#fff", fontFamily: F, fontWeight: 700, fontSize: "0.8rem" }}>VetConnect Lite</span>
                      <div className="ml-auto flex gap-1.5">
                        <button className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: "rgba(255,255,255,0.13)" }}>
                          <Bell size={13} color="#fff" />
                        </button>
                      </div>
                    </div>
                    {/* Content */}
                    <div className="px-3 py-3" style={{ backgroundColor: C.bg, minHeight: "160px" }}>
                      <div className="grid grid-cols-2 gap-2">
                        <StatCard icon={<Users size={13} />} label="Owners" value="248" borderColor={C.primary} iconBg={C.primaryLt} iconColor={C.primary} />
                        <StatCard icon={<PawPrint size={13} />} label="Pets" value="416" borderColor={C.accent} iconBg={C.accentLt} iconColor={C.accent} />
                      </div>
                    </div>
                    {/* Bottom tabs */}
                    <BottomTabBar active="dashboard" onChange={() => {}} />
                  </div>
                  <div className="mt-4 space-y-1.5">
                    {[
                      { label: "5 tabs", desc: "Dashboard · Owners · Pets · Visits · More" },
                      { label: "Height", desc: "64px with safe-area padding" },
                      { label: "Active", desc: "Orange indicator stripe + blue icon bg" },
                      { label: "Labels", desc: "12px · bold when active" },
                    ].map(({ label, desc }) => (
                      <div key={label} className="flex items-start gap-3 text-xs" style={{ fontFamily: F }}>
                        <span className="px-2 py-0.5 rounded font-semibold" style={{ backgroundColor: C.primaryLt, color: C.primary }}>{label}</span>
                        <span style={{ color: C.muted }}>{desc}</span>
                      </div>
                    ))}
                  </div>
                </Panel>

                {/* Desktop sidebar */}
                <Panel title="Desktop · Left Sidebar (1280px)">
                  <div
                    className="rounded-2xl overflow-hidden flex"
                    style={{ height: "380px", border: "6px solid #1A1A2E", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}
                  >
                    <Sidebar active="owners" onChange={() => {}} />
                    <div className="flex-1 flex flex-col overflow-hidden" style={{ backgroundColor: C.bg }}>
                      <TopBar title="Owners" action="Add" actionIcon={<Plus size={12} />} />
                      <div className="flex-1 p-3 overflow-hidden space-y-2">
                        <ListCard
                          avatar={<span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#fff", fontFamily: F }}>AG</span>}
                          avatarBg={C.primary} title="Ali Gauhar" subtitle="2 pets" badge={<StatusBadge v="synced" size="sm" />} meta="Apr 25"
                        />
                        <ListCard
                          avatar={<span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#fff", fontFamily: F }}>SB</span>}
                          avatarBg="#8E44AD" title="Sara Bilal" subtitle="1 pet" badge={<StatusBadge v="pending" size="sm" />} meta="Apr 20"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 space-y-1.5">
                    {[
                      { label: "10 items",  desc: "Dashboard · Owners · Pets · Visits · Vaccinations · Follow-ups · Invoices · Reports · Sync · Settings" },
                      { label: "Width",     desc: "240px expanded · 64px collapsed" },
                      { label: "Nav bg",    desc: "Dark navy #0D2F4F" },
                      { label: "Active",    desc: "Orange left stripe + accent icon + white label" },
                      { label: "Badges",    desc: "Red counter badges on Visits, Follow-ups, Sync" },
                    ].map(({ label, desc }) => (
                      <div key={label} className="flex items-start gap-3 text-xs" style={{ fontFamily: F }}>
                        <span className="px-2 py-0.5 rounded font-semibold flex-shrink-0" style={{ backgroundColor: C.primaryLt, color: C.primary }}>{label}</span>
                        <span style={{ color: C.muted }}>{desc}</span>
                      </div>
                    ))}
                  </div>
                </Panel>
              </div>
            </Section>

            {/* ─────────────────────────────────────── */}
            {/* 10. SYNC INDICATOR                      */}
            {/* ─────────────────────────────────────── */}
            <Section title="Sync Indicator" subtitle="Online · Offline with pending count · Click the Online/Offline toggle in the header to see it change">
              <Panel>
                <div className="flex flex-wrap items-center gap-4">
                  <SyncIndicator online={true}  pending={0}  />
                  <SyncIndicator online={false} pending={11} />
                  <SyncIndicator online={false} pending={3}  />
                  {/* Live one */}
                  <div className="flex items-center gap-2">
                    <SyncIndicator online={online} pending={11} />
                    <span className="text-xs" style={{ color: C.muted, fontFamily: F }}>← Live (toggle in header)</span>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* In-sidebar style */}
                  <div className="rounded-xl p-3" style={{ backgroundColor: C.navy }}>
                    <p className="text-xs mb-2" style={{ color: "rgba(255,255,255,0.4)", fontFamily: F }}>In Sidebar</p>
                    <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ backgroundColor: "rgba(39,174,96,0.12)" }}>
                      <span className="relative">
                        <span className="w-2 h-2 rounded-full block" style={{ backgroundColor: C.success }} />
                        <span className="absolute inset-0 rounded-full animate-ping" style={{ backgroundColor: `${C.success}50` }} />
                      </span>
                      <span style={{ color: C.success, fontFamily: F, fontSize: "0.72rem", fontWeight: 600 }}>Online · Synced</span>
                      <Wifi size={11} style={{ color: C.success, marginLeft: "auto" }} />
                    </div>
                  </div>
                  {/* Top bar style */}
                  <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${C.border}` }}>
                    <div className="flex items-center gap-3 px-3" style={{ backgroundColor: C.primary, height: "48px" }}>
                      <span style={{ color: "#fff", fontFamily: F, fontSize: "0.8rem", fontWeight: 600, flex: 1 }}>Dashboard</span>
                      <div className="flex items-center gap-1.5 rounded-full px-2.5 py-1" style={{ backgroundColor: "rgba(39,174,96,0.2)" }}>
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#6FEEA6" }} />
                        <span style={{ color: "#6FEEA6", fontSize: "0.65rem", fontFamily: F }}>Online</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Panel>
            </Section>

            {/* ─────────────────────────────────────── */}
            {/* 11. FAB                                 */}
            {/* ─────────────────────────────────────── */}
            <Section title="Floating Action Button" subtitle="56px circle · Primary blue gradient · Bottom-right · Extended variant with label">
              <Panel>
                <div className="flex flex-wrap items-end gap-6">
                  <div className="flex flex-col items-center gap-2">
                    <FAB />
                    <p className="text-xs text-center" style={{ color: C.muted, fontFamily: F }}>Icon only · 56×56</p>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <FAB label="Add Owner" />
                    <p className="text-xs text-center" style={{ color: C.muted, fontFamily: F }}>Extended · with label</p>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <FAB label="New Visit" />
                    <p className="text-xs text-center" style={{ color: C.muted, fontFamily: F }}>Context-aware label</p>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl overflow-hidden relative" style={{ height: "200px", backgroundColor: C.bg, border: `1px solid ${C.border}` }}>
                  <div className="p-4">
                    <p className="text-xs" style={{ color: C.muted, fontFamily: F }}>Screen content</p>
                    <div className="mt-3 space-y-2">
                      <div className="h-8 rounded-lg" style={{ backgroundColor: C.border, width: "80%" }} />
                      <div className="h-8 rounded-lg" style={{ backgroundColor: C.border, width: "60%" }} />
                    </div>
                  </div>
                  <div className="absolute bottom-5 right-5">
                    <FAB />
                  </div>
                </div>
              </Panel>
            </Section>

            {/* ─────────────────────────────────────── */}
            {/* 12. SPACING & RADIUS GUIDE              */}
            {/* ─────────────────────────────────────── */}
            <Section title="Spacing &amp; Radius" subtitle="Consistent spatial tokens used across the system">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Panel title="Border Radius">
                  <div className="space-y-3">
                    {[
                      { label: "Input / Button",   r: "8px",  cls: "rounded-lg"   },
                      { label: "Card",             r: "12px", cls: "rounded-xl"   },
                      { label: "Large Card",       r: "16px", cls: "rounded-2xl"  },
                      { label: "Modal / Sheet",    r: "24px", cls: "rounded-3xl"  },
                      { label: "Pill / Badge",     r: "999px",cls: "rounded-full" },
                    ].map(({ label, r, cls }) => (
                      <div key={label} className="flex items-center gap-4">
                        <div className={`w-12 h-8 ${cls}`} style={{ backgroundColor: C.primaryLt, border: `1.5px solid ${C.primary}` }} />
                        <div>
                          <p className="text-xs font-semibold" style={{ color: C.text, fontFamily: F }}>{label}</p>
                          <p className="text-xs" style={{ color: C.muted, fontFamily: F }}>{r}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Panel>

                <Panel title="Touch Targets">
                  <div className="space-y-3">
                    {[
                      { label: "FAB",          h: "56px", desc: "Primary creation action" },
                      { label: "Button (lg)",  h: "52px", desc: "Full-width forms"         },
                      { label: "Button (md)",  h: "48px", desc: "Standard actions — min"   },
                      { label: "Input",        h: "48px", desc: "All form inputs"          },
                      { label: "Button (sm)",  h: "36px", desc: "Secondary / compact"      },
                      { label: "Icon button",  h: "40px", desc: "Min for icon-only tap"    },
                    ].map(({ label, h, desc }) => (
                      <div key={label} className="flex items-center gap-3">
                        <div
                          className="rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ width: "40px", height: h, backgroundColor: C.accentLt, border: `1.5px solid ${C.accent}` }}
                        >
                          <span style={{ fontSize: "0.55rem", color: C.accent, fontWeight: 700, fontFamily: F }}>{h}</span>
                        </div>
                        <div>
                          <p className="text-xs font-semibold" style={{ color: C.text, fontFamily: F }}>{label}</p>
                          <p className="text-xs" style={{ color: C.muted, fontFamily: F }}>{desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Panel>
              </div>
            </Section>

            {/* Footer */}
            <div className="pt-8 pb-10 border-t text-center" style={{ borderColor: C.border }}>
              <div className="inline-flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-xl flex items-center justify-center" style={{ backgroundColor: C.accent }}>
                  <PawPrint size={14} color="#fff" />
                </div>
                <span style={{ fontFamily: F, fontWeight: 700, color: C.primary }}>VetConnect Lite Design System</span>
              </div>
              <p className="text-xs" style={{ color: C.muted, fontFamily: F }}>
                Responsive · 360px · 768px · 1280px · Plus Jakarta Sans · v2.0
              </p>
            </div>
          </div>
        </div>

        {/* ── BOTTOM TAB BAR (mobile only) ── */}
        {isMobile && (
          <BottomTabBar active={activeTab} onChange={setActiveTab} />
        )}
      </div>

      {/* ── FAB (fixed, mobile + tablet) ── */}
      {!isDesktop && (
        <div className="fixed bottom-20 right-5 z-40">
          <FAB />
        </div>
      )}
    </div>
  );
}
