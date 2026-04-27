import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  PawPrint, Bell, Wifi, WifiOff, RefreshCw, ChevronRight,
  LayoutDashboard, Users, Stethoscope, Grid3x3, Receipt,
  BarChart2, CalendarClock, Syringe, Settings, LogOut,
  UserPlus, Plus, TrendingUp, TrendingDown, ArrowUpRight,
  Clock, CheckCircle2, Activity, Menu, X, MoreVertical,
  CircleDot, AlertCircle, Calendar,
} from "lucide-react";

// ─── TOKENS ───────────────────────────────────────────────────────────────────
const C = {
  primary:   "#1B4F72",
  primaryDk: "#0D2F4F",
  primaryMd: "#2874A6",
  primaryLt: "#EBF5FB",
  navy:      "#0D2F4F",
  navyHov:   "#132E48",
  accent:    "#E67E22",
  accentLt:  "#FEF3E8",
  teal:      "#16A085",
  tealLt:    "#E8F8F5",
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
};
const F = "'Plus Jakarta Sans', sans-serif";

// ─── BREAKPOINT HOOK ─────────────────────────────────────────────────────────
function useBreakpoint() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1280);
  useEffect(() => {
    const fn = () => setW(window.innerWidth);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return { isMobile: w < 768, isTablet: w >= 768 && w < 1280, isDesktop: w >= 1280 };
}

// ─── GREETING HOOK ────────────────────────────────────────────────────────────
function useGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good Morning";
  if (h < 17) return "Good Afternoon";
  return "Good Evening";
}

// ─── DATA ─────────────────────────────────────────────────────────────────────
const STATS = [
  {
    key: "visits",
    label: "Today's Visits",
    value: 12,
    icon: <Stethoscope size={18} />,
    border: C.primary,
    iconBg: C.primaryLt,
    iconColor: C.primary,
    trend: "+3 vs yesterday",
    dir: "up" as const,
  },
  {
    key: "income",
    label: "Today's Income",
    value: "₨24,500",
    icon: <Receipt size={18} />,
    border: C.success,
    iconBg: C.successLt,
    iconColor: C.success,
    trend: "+₨3,200 vs yesterday",
    dir: "up" as const,
  },
  {
    key: "followups",
    label: "Follow-ups Due",
    value: 3,
    icon: <CalendarClock size={18} />,
    border: C.accent,
    iconBg: C.accentLt,
    iconColor: C.accent,
    trend: "1 overdue",
    dir: "down" as const,
  },
  {
    key: "vaccinations",
    label: "Vaccinations Due",
    value: 5,
    icon: <Syringe size={18} />,
    border: C.danger,
    iconBg: C.dangerLt,
    iconColor: C.danger,
    trend: "2 critical",
    dir: "down" as const,
  },
];

const VISITS = [
  {
    id: 1, emoji: "🐕", emojiColor: C.accentLt,
    pet: "Max",      owner: "Ali Gauhar",   reason: "General Checkup",     time: "09:30 AM",
    status: "completed" as const,  amount: 1500,
  },
  {
    id: 2, emoji: "🐈", emojiColor: C.blueLt,
    pet: "Whiskers", owner: "Sara Bilal",   reason: "Vaccination",          time: "10:15 AM",
    status: "completed" as const,  amount: 800,
  },
  {
    id: 3, emoji: "🦜", emojiColor: C.successLt,
    pet: "Tweety",   owner: "M. Khan",      reason: "Wing Clipping",        time: "11:00 AM",
    status: "inprogress" as const, amount: 600,
  },
  {
    id: 4, emoji: "🐕", emojiColor: C.primaryLt,
    pet: "Bruno",    owner: "Fatima Raza",  reason: "Surgery Follow-up",    time: "11:45 AM",
    status: "completed" as const,  amount: 2500,
  },
];

const DUE_ITEMS = [
  { id: 1, dot: C.danger,  dotLabel: "Overdue",    pet: "Max",      owner: "Ali Gauhar",  desc: "Rabies vaccination — 3 days overdue" },
  { id: 2, dot: C.warning, dotLabel: "Due Today",  pet: "Whiskers", owner: "Sara Bilal",  desc: "Post-surgery follow-up" },
  { id: 3, dot: C.muted,   dotLabel: "Tomorrow",   pet: "Bruno",    owner: "Fatima Raza", desc: "Annual health checkup" },
];

const QUICK_ACTIONS = [
  { key: "visit",  label: "+New Visit",  Icon: Plus,     bg: C.primary, shadow: "rgba(27,79,114,0.35)"  },
  { key: "owner",  label: "+Add Owner",  Icon: UserPlus, bg: C.teal,    shadow: "rgba(22,160,133,0.35)" },
  { key: "pet",    label: "+Add Pet",    Icon: PawPrint, bg: C.success, shadow: "rgba(39,174,96,0.35)"  },
  { key: "invoice",label: "Invoice",     Icon: Receipt,  bg: C.accent,  shadow: "rgba(230,126,34,0.35)" },
];

const NAV_ITEMS = [
  { key: "dashboard",    label: "Dashboard",    Icon: LayoutDashboard, badge: null },
  { key: "owners",       label: "Owners",       Icon: Users,           badge: null },
  { key: "pets",         label: "Pets",         Icon: PawPrint,        badge: null },
  { key: "visits",       label: "Visits",       Icon: Stethoscope,     badge: 3    },
  { key: "vaccinations", label: "Vaccinations", Icon: Syringe,         badge: null },
  { key: "followups",    label: "Follow-ups",   Icon: CalendarClock,   badge: 7    },
  { key: "invoices",     label: "Invoices",     Icon: Receipt,         badge: null },
  { key: "reports",      label: "Reports",      Icon: BarChart2,       badge: null },
  { key: "sync",         label: "Sync",         Icon: RefreshCw,       badge: 5    },
  { key: "settings",     label: "Settings",     Icon: Settings,        badge: null },
];

const TABS = [
  { key: "dashboard", label: "Dashboard", Icon: LayoutDashboard },
  { key: "owners",    label: "Owners",    Icon: Users            },
  { key: "pets",      label: "Pets",      Icon: PawPrint         },
  { key: "visits",    label: "Visits",    Icon: Stethoscope      },
  { key: "more",      label: "More",      Icon: Grid3x3          },
];

// ─── STATUS BADGE ─────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: "completed" | "inprogress" }) {
  const cfg = status === "completed"
    ? { label: "Completed",   bg: C.successLt, color: C.success, dot: C.success }
    : { label: "In Progress", bg: C.blueLt,    color: C.blue,    dot: C.blue    };
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full font-semibold whitespace-nowrap"
      style={{ padding: "3px 10px", backgroundColor: cfg.bg, color: cfg.color, fontSize: "0.67rem", fontFamily: F }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cfg.dot }} />
      {cfg.label}
    </span>
  );
}

// ─── SYNC INDICATOR ──────────────────────────────────────────────────────────
function SyncDot({ online }: { online: boolean }) {
  return (
    <div
      className="flex items-center gap-1.5 rounded-full px-2.5 py-1"
      style={{ backgroundColor: online ? "rgba(39,174,96,0.18)" : "rgba(243,156,18,0.18)" }}
    >
      <span className="relative flex-shrink-0 w-2 h-2">
        <span className="w-2 h-2 rounded-full block" style={{ backgroundColor: online ? C.success : C.warning }} />
        {!online && (
          <span className="absolute inset-0 rounded-full animate-ping" style={{ backgroundColor: `${C.warning}60` }} />
        )}
      </span>
      <span style={{ color: online ? "#6FEEA6" : C.warning, fontSize: "0.68rem", fontFamily: F, fontWeight: 600 }}>
        {online ? "Synced" : "Offline"}
      </span>
    </div>
  );
}

// ─── OFFLINE BANNER ──────────────────────────────────────────────────────────
function OfflineBanner({ onSync, syncing }: { onSync: () => void; syncing: boolean }) {
  return (
    <div
      className="flex items-center gap-3 px-4 py-2.5"
      style={{ backgroundColor: C.warningLt, borderBottom: `2px solid ${C.warning}` }}
    >
      <div className="relative w-6 h-6 flex items-center justify-center flex-shrink-0">
        <WifiOff size={14} style={{ color: C.warning }} />
        <span className="absolute inset-0 rounded-full animate-ping" style={{ backgroundColor: `${C.warning}25` }} />
      </div>
      <p className="flex-1 text-xs font-semibold" style={{ color: "#92600A", fontFamily: F }}>
        Offline — 5 records pending sync
      </p>
      <button
        onClick={onSync}
        disabled={syncing}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all"
        style={{
          backgroundColor: C.warning,
          color: "#fff",
          fontFamily: F,
          opacity: syncing ? 0.7 : 1,
        }}
      >
        <RefreshCw size={12} className={syncing ? "animate-spin" : ""} />
        {syncing ? "Syncing…" : "Sync Now"}
      </button>
    </div>
  );
}

// ─── STAT CARD ────────────────────────────────────────────────────────────────
function StatCard({
  label, value, icon, border, iconBg, iconColor, trend, dir,
}: {
  label: string; value: string | number; icon: React.ReactNode;
  border: string; iconBg: string; iconColor: string;
  trend: string; dir: "up" | "down";
}) {
  return (
    <div
      className="bg-white rounded-2xl p-4 flex gap-3 items-start group cursor-pointer transition-shadow hover:shadow-md"
      style={{
        border: `1px solid ${C.border}`,
        borderLeft: `4px solid ${border}`,
        boxShadow: "0 1px 8px rgba(0,0,0,0.05)",
      }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: iconBg }}
      >
        <span style={{ color: iconColor, display: "flex" }}>{icon}</span>
      </div>
      <div className="flex-1 min-w-0">
        <p style={{ fontFamily: F, fontWeight: 700, fontSize: "1.625rem", color: C.text, lineHeight: 1 }}>
          {value}
        </p>
        <p className="mt-0.5 text-xs truncate" style={{ color: C.muted, fontFamily: F }}>{label}</p>
        <div className="flex items-center gap-1 mt-1.5">
          {dir === "up"
            ? <TrendingUp  size={11} style={{ color: C.success }} />
            : <TrendingDown size={11} style={{ color: C.danger  }} />}
          <span style={{ fontSize: "0.65rem", color: dir === "up" ? C.success : C.danger, fontFamily: F }}>
            {trend}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── QUICK ACTION BUTTON ──────────────────────────────────────────────────────
function QuickActionBtn({
  label, Icon, bg, shadow,
}: {
  label: string; Icon: any; bg: string; shadow: string;
}) {
  const [pressed, setPressed] = useState(false);
  return (
    <button
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      className="flex flex-col items-center gap-2"
      style={{ fontFamily: F }}
    >
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center transition-all"
        style={{
          background: `linear-gradient(135deg, ${bg}, ${bg}CC)`,
          boxShadow: `0 6px 20px ${shadow}`,
          transform: pressed ? "scale(0.92)" : "scale(1)",
        }}
      >
        <Icon size={22} color="#fff" strokeWidth={1.8} />
      </div>
      <span
        className="text-center leading-tight"
        style={{ fontSize: "0.7rem", color: C.textLt, fontWeight: 600, maxWidth: "60px" }}
      >
        {label}
      </span>
    </button>
  );
}

// ─── VISIT CARD ───────────────────────────────────────────────────────────────
function VisitCard({ v }: { v: typeof VISITS[0] }) {
  return (
    <div
      className="flex items-center gap-3 px-4 py-3.5 bg-white rounded-2xl cursor-pointer transition-colors hover:bg-slate-50 group"
      style={{ border: `1px solid ${C.border}`, boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
    >
      {/* Avatar */}
      <div
        className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 text-xl"
        style={{ backgroundColor: v.emojiColor }}
      >
        {v.emoji}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-sm font-semibold" style={{ color: C.text, fontFamily: F }}>{v.pet}</p>
          <StatusBadge status={v.status} />
        </div>
        <p className="text-xs truncate mt-0.5" style={{ color: C.muted, fontFamily: F }}>
          {v.owner} · {v.reason}
        </p>
        <div className="flex items-center gap-1 mt-0.5">
          <Clock size={10} style={{ color: C.muted }} />
          <span style={{ fontSize: "0.65rem", color: C.muted, fontFamily: F }}>{v.time}</span>
        </div>
      </div>

      {/* Amount + chevron */}
      <div className="flex flex-col items-end gap-1 flex-shrink-0">
        <p style={{ fontFamily: F, fontWeight: 700, fontSize: "0.875rem", color: C.primary }}>
          ₨{v.amount.toLocaleString()}
        </p>
        <ChevronRight size={14} style={{ color: C.muted }} className="group-hover:translate-x-0.5 transition-transform" />
      </div>
    </div>
  );
}

// ─── DUE ITEM ─────────────────────────────────────────────────────────────────
function DueItem({ item }: { item: typeof DUE_ITEMS[0] }) {
  return (
    <div
      className="flex items-start gap-3 px-4 py-3.5 bg-white rounded-2xl cursor-pointer hover:bg-slate-50 transition-colors"
      style={{ border: `1px solid ${C.border}`, boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
    >
      {/* Colored dot */}
      <div className="flex flex-col items-center gap-1.5 flex-shrink-0 pt-0.5">
        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.dot }} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-sm font-semibold" style={{ color: C.text, fontFamily: F }}>{item.pet}</p>
          <span
            className="px-2 py-0.5 rounded-full text-xs font-semibold"
            style={{
              backgroundColor: item.dot === C.danger ? C.dangerLt : item.dot === C.warning ? C.warningLt : "#F0F4F8",
              color: item.dot === C.danger ? C.danger : item.dot === C.warning ? C.warning : C.muted,
              fontFamily: F,
            }}
          >
            {item.dotLabel}
          </span>
        </div>
        <p className="text-xs mt-0.5" style={{ color: C.muted, fontFamily: F }}>{item.owner}</p>
        <p className="text-xs mt-0.5 truncate" style={{ color: C.textLt, fontFamily: F }}>{item.desc}</p>
      </div>

      <ChevronRight size={14} style={{ color: C.muted, flexShrink: 0, marginTop: "4px" }} />
    </div>
  );
}

// ─── GREETING ─────────────────────────────────────────────────────────────────
function Greeting({ compact }: { compact?: boolean }) {
  const greeting = useGreeting();
  const date = new Date().toLocaleDateString("en-GB", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });
  return (
    <div style={{ fontFamily: F }}>
      <h1
        style={{
          fontWeight: 700,
          fontSize: compact ? "1.125rem" : "1.375rem",
          color: C.text,
          lineHeight: 1.2,
        }}
      >
        {greeting}, <span style={{ color: C.primary }}>Dr. Ahmed</span> 👋
      </h1>
      <div className="flex items-center gap-1.5 mt-1">
        <Calendar size={12} style={{ color: C.muted }} />
        <p style={{ fontSize: "0.78rem", color: C.muted }}>{date}</p>
      </div>
    </div>
  );
}

// ─── SECTIONS ─────────────────────────────────────────────────────────────────
function SectionHeader({
  title, action, actionLabel,
}: { title: string; action?: () => void; actionLabel?: string }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: "0.9375rem", color: C.text }}>{title}</h2>
      {action && (
        <button
          onClick={action}
          className="flex items-center gap-1 text-xs font-semibold transition-colors"
          style={{ color: C.accent, fontFamily: F }}
        >
          {actionLabel ?? "See all"}
          <ArrowUpRight size={13} />
        </button>
      )}
    </div>
  );
}

function RecentVisitsSection() {
  return (
    <div>
      <SectionHeader title="Recent Visits" actionLabel="All visits" />
      <div className="space-y-2.5">
        {VISITS.map((v) => <VisitCard key={v.id} v={v} />)}
      </div>
    </div>
  );
}

function DueTodaySection() {
  return (
    <div>
      <SectionHeader title="Due Today" actionLabel="View all" />
      <div className="space-y-2.5">
        {DUE_ITEMS.map((item) => <DueItem key={item.id} item={item} />)}
      </div>
    </div>
  );
}

function QuickActionsSection({ compact }: { compact?: boolean }) {
  return (
    <div>
      <SectionHeader title="Quick Actions" />
      <div
        className="bg-white rounded-2xl p-4 flex justify-around"
        style={{ border: `1px solid ${C.border}`, boxShadow: "0 1px 8px rgba(0,0,0,0.05)" }}
      >
        {QUICK_ACTIONS.map(({ key, label, Icon, bg, shadow }) => (
          <QuickActionBtn key={key} label={label} Icon={Icon} bg={bg} shadow={shadow} />
        ))}
      </div>
    </div>
  );
}

// ─── SIDEBAR ─────────────────────────────────────────────────────────────────
function Sidebar({
  active, collapsed = false, onCollapse,
}: {
  active: string; collapsed?: boolean; onCollapse?: () => void;
}) {
  const navigate = useNavigate();
  return (
    <aside
      className="flex flex-col h-full flex-shrink-0 overflow-y-auto"
      style={{ width: collapsed ? "64px" : "240px", backgroundColor: C.navy, transition: "width 0.25s ease" }}
    >
      {/* Brand */}
      <div
        className="flex items-center gap-3 px-4 flex-shrink-0"
        style={{ height: "64px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
      >
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: `linear-gradient(135deg, ${C.accent}, #D35400)` }}
        >
          <PawPrint size={18} color="#fff" strokeWidth={1.8} />
        </div>
        {!collapsed && (
          <div className="overflow-hidden flex-1">
            <p style={{ color: "#fff", fontFamily: F, fontSize: "0.85rem", fontWeight: 700, lineHeight: 1.2 }}>
              PetCare Clinic
            </p>
            <p style={{ color: "rgba(255,255,255,0.4)", fontFamily: F, fontSize: "0.6rem" }}>
              VetConnect Lite
            </p>
          </div>
        )}
        {!collapsed && onCollapse && (
          <button
            onClick={onCollapse}
            className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)" }}
          >
            <ChevronRight size={14} />
          </button>
        )}
      </div>

      {!collapsed && (
        <p
          className="px-4 pt-4 pb-1"
          style={{ color: "rgba(255,255,255,0.28)", fontSize: "0.6rem", fontFamily: F, fontWeight: 700, letterSpacing: "0.1em" }}
        >
          MAIN MENU
        </p>
      )}

      <nav className="flex-1 px-2 py-2 space-y-0.5">
        {NAV_ITEMS.map(({ key, label, Icon, badge }) => {
          const isActive = active === key;
          return (
            <button
              key={key}
              title={collapsed ? label : undefined}
              className="w-full flex items-center gap-3 rounded-xl px-3 transition-all duration-150 group relative"
              style={{
                height: "42px",
                backgroundColor: isActive ? "rgba(230,126,34,0.14)" : "transparent",
                justifyContent: collapsed ? "center" : "flex-start",
              }}
            >
              {isActive && (
                <span
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-full"
                  style={{ backgroundColor: C.accent }}
                />
              )}
              <Icon
                size={17}
                strokeWidth={isActive ? 2.2 : 1.6}
                style={{ color: isActive ? C.accent : "rgba(255,255,255,0.55)", flexShrink: 0 }}
              />
              {!collapsed && (
                <>
                  <span
                    className="flex-1 text-left text-sm truncate"
                    style={{ fontFamily: F, fontWeight: isActive ? 600 : 400, color: isActive ? "#fff" : "rgba(255,255,255,0.65)" }}
                  >
                    {label}
                  </span>
                  {badge !== null && (
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center text-white flex-shrink-0"
                      style={{ backgroundColor: C.danger, fontSize: "0.58rem", fontWeight: 700 }}
                    >
                      {badge}
                    </span>
                  )}
                </>
              )}
              {/* Tooltip */}
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

      {/* Footer */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", padding: "10px 8px" }}>
        {!collapsed && (
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-xl mb-1.5"
            style={{ backgroundColor: "rgba(39,174,96,0.1)" }}
          >
            <span className="relative w-2 h-2 flex-shrink-0">
              <span className="w-2 h-2 rounded-full block" style={{ backgroundColor: C.success }} />
              <span className="absolute inset-0 rounded-full animate-ping" style={{ backgroundColor: `${C.success}50` }} />
            </span>
            <span style={{ color: C.success, fontFamily: F, fontSize: "0.7rem", fontWeight: 600 }}>Online · All synced</span>
          </div>
        )}
        <button
          onClick={() => navigate("/vetconnect-lite/login-v2")}
          className="w-full flex items-center gap-3 rounded-xl px-3 py-2 transition-colors hover:bg-white/5"
          style={{ color: "rgba(255,255,255,0.55)", justifyContent: collapsed ? "center" : "flex-start" }}
        >
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: C.accent, fontSize: "0.7rem", color: "#fff", fontWeight: 700 }}
          >
            DA
          </div>
          {!collapsed && (
            <div className="flex-1 text-left overflow-hidden">
              <p style={{ color: "#fff", fontSize: "0.75rem", fontFamily: F, fontWeight: 600, lineHeight: 1.2 }}>Dr. Ahmed</p>
              <p style={{ color: "rgba(255,255,255,0.38)", fontSize: "0.62rem", fontFamily: F }}>Admin</p>
            </div>
          )}
          {!collapsed && <LogOut size={13} style={{ flexShrink: 0 }} />}
        </button>
      </div>
    </aside>
  );
}

// ─── BOTTOM TAB BAR ───────────────────────────────────────────────────────────
function BottomTabBar({ active }: { active: string }) {
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
      {TABS.map(({ key, label, Icon }) => {
        const isActive = active === key;
        return (
          <button
            key={key}
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
            <span style={{ fontSize: "0.59rem", fontWeight: isActive ? 700 : 500, fontFamily: F, lineHeight: 1 }}>
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ─── MOBILE TOP BAR ───────────────────────────────────────────────────────────
function MobileTopBar({
  online, onMenuOpen,
}: { online: boolean; onMenuOpen: () => void }) {
  return (
    <div
      className="flex items-center gap-2.5 px-4 flex-shrink-0"
      style={{ height: "56px", background: `linear-gradient(135deg, ${C.navy}, ${C.primary})` }}
    >
      <button
        onClick={onMenuOpen}
        className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
      >
        <Menu size={17} color="#fff" />
      </button>
      <div
        className="w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: `linear-gradient(135deg, ${C.accent}, #D35400)` }}
      >
        <PawPrint size={14} color="#fff" strokeWidth={1.8} />
      </div>
      <div className="flex-1 min-w-0">
        <p style={{ color: "#fff", fontFamily: F, fontWeight: 700, fontSize: "0.875rem", lineHeight: 1.15 }}>PetCare Clinic</p>
        <p style={{ color: "rgba(255,255,255,0.45)", fontFamily: F, fontSize: "0.6rem" }}>VetConnect Lite</p>
      </div>
      <SyncDot online={online} />
      <button
        className="w-8 h-8 rounded-xl flex items-center justify-center relative ml-0.5 flex-shrink-0"
        style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
      >
        <Bell size={16} color="#fff" />
        <span
          className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center"
          style={{ backgroundColor: C.danger, color: "#fff", fontSize: "0.52rem", fontWeight: 700 }}
        >3</span>
      </button>
    </div>
  );
}

// ─── DESKTOP TOP BAR ─────────────────────────────────────────────────────────
function DesktopTopBar({
  online, collapsed, onCollapse,
}: { online: boolean; collapsed: boolean; onCollapse: () => void }) {
  return (
    <div
      className="flex items-center gap-4 px-6 flex-shrink-0"
      style={{ height: "60px", background: `linear-gradient(135deg, ${C.navy}, ${C.primary})` }}
    >
      <button
        onClick={onCollapse}
        className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
      >
        <Menu size={16} color="#fff" />
      </button>

      <div className="flex items-center gap-2 flex-shrink-0">
        <div
          className="w-7 h-7 rounded-xl flex items-center justify-center"
          style={{ background: `linear-gradient(135deg, ${C.accent}, #D35400)` }}
        >
          <PawPrint size={13} color="#fff" strokeWidth={1.8} />
        </div>
        <span style={{ color: "#fff", fontFamily: F, fontWeight: 700, fontSize: "0.9375rem" }}>PetCare Clinic</span>
        <span style={{ color: "rgba(255,255,255,0.35)", fontFamily: F, fontSize: "0.72rem" }}>· Dashboard</span>
      </div>

      <div className="flex-1" />

      <SyncDot online={online} />

      {/* Search */}
      <div
        className="flex items-center gap-2 rounded-xl px-3 py-1.5"
        style={{ backgroundColor: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.14)" }}
      >
        <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.78rem", fontFamily: F }}>Search…</span>
      </div>

      {/* Bell */}
      <button
        className="w-9 h-9 rounded-xl flex items-center justify-center relative"
        style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
      >
        <Bell size={17} color="#fff" />
        <span
          className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full flex items-center justify-center"
          style={{ backgroundColor: C.danger, color: "#fff", fontSize: "0.52rem", fontWeight: 700, width: "18px", height: "18px" }}
        >3</span>
      </button>

      {/* Avatar */}
      <button
        className="flex items-center gap-2 rounded-xl px-3 py-1.5 transition-colors"
        style={{ backgroundColor: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.14)" }}
      >
        <div
          className="w-6 h-6 rounded-full flex items-center justify-center"
          style={{ backgroundColor: C.accent, fontSize: "0.6rem", color: "#fff", fontWeight: 700, fontFamily: F }}
        >
          DA
        </div>
        <span style={{ color: "#fff", fontFamily: F, fontSize: "0.78rem", fontWeight: 600 }}>Dr. Ahmed</span>
        <ChevronRight size={12} color="rgba(255,255,255,0.5)" style={{ transform: "rotate(90deg)" }} />
      </button>
    </div>
  );
}

// ─── MOBILE DRAWER ────────────────────────────────────────────────────────────
function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const navigate = useNavigate();
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/50" onClick={onClose} />
      <div className="w-72 h-full flex-shrink-0" style={{ backgroundColor: C.navy }}>
        {/* Close button */}
        <div className="flex items-center justify-between px-4" style={{ height: "56px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${C.accent}, #D35400)` }}>
              <PawPrint size={14} color="#fff" strokeWidth={1.8} />
            </div>
            <span style={{ color: "#fff", fontFamily: F, fontWeight: 700, fontSize: "0.875rem" }}>PetCare Clinic</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
          >
            <X size={16} color="#fff" />
          </button>
        </div>
        <nav className="px-2 py-3 space-y-0.5">
          {NAV_ITEMS.map(({ key, label, Icon, badge }) => {
            const isActive = key === "dashboard";
            return (
              <button
                key={key}
                onClick={onClose}
                className="w-full flex items-center gap-3 rounded-xl px-3 transition-all duration-150"
                style={{ height: "42px", backgroundColor: isActive ? "rgba(230,126,34,0.14)" : "transparent" }}
              >
                <Icon size={17} strokeWidth={isActive ? 2.2 : 1.6} style={{ color: isActive ? C.accent : "rgba(255,255,255,0.55)", flexShrink: 0 }} />
                <span className="flex-1 text-left text-sm" style={{ fontFamily: F, fontWeight: isActive ? 600 : 400, color: isActive ? "#fff" : "rgba(255,255,255,0.65)" }}>
                  {label}
                </span>
                {badge !== null && (
                  <span className="w-5 h-5 rounded-full flex items-center justify-center text-white flex-shrink-0" style={{ backgroundColor: C.danger, fontSize: "0.58rem", fontWeight: 700 }}>
                    {badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", margin: "0 8px", padding: "10px 0" }}>
          <button
            onClick={() => { onClose(); navigate("/vetconnect-lite/login-v2"); }}
            className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-white/5"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            <LogOut size={15} />
            <span style={{ fontFamily: F, fontSize: "0.875rem", color: "rgba(255,255,255,0.65)" }}>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── MINI ACTIVITY CHART ──────────────────────────────────────────────────────
function MiniChart() {
  const bars = [4, 7, 5, 9, 6, 12, 8];
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const max = Math.max(...bars);
  return (
    <div
      className="bg-white rounded-2xl p-4"
      style={{ border: `1px solid ${C.border}`, boxShadow: "0 1px 8px rgba(0,0,0,0.05)" }}
    >
      <div className="flex items-center justify-between mb-3">
        <p style={{ fontFamily: F, fontWeight: 700, fontSize: "0.875rem", color: C.text }}>This Week's Visits</p>
        <span
          className="px-2 py-0.5 rounded-full text-xs font-semibold"
          style={{ backgroundColor: C.successLt, color: C.success, fontFamily: F }}
        >
          +18% vs last week
        </span>
      </div>
      <div className="flex items-end gap-2 h-16">
        {bars.map((val, i) => {
          const isToday = i === 5;
          const heightPct = (val / max) * 100;
          return (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full relative flex items-end" style={{ height: "52px" }}>
                <div
                  className="w-full rounded-md transition-all"
                  style={{
                    height: `${heightPct}%`,
                    background: isToday
                      ? `linear-gradient(180deg, ${C.primary}, ${C.primaryMd})`
                      : `linear-gradient(180deg, ${C.primaryLt}, #D6EAF8)`,
                  }}
                />
              </div>
              <span style={{ fontSize: "0.6rem", color: isToday ? C.primary : C.muted, fontFamily: F, fontWeight: isToday ? 700 : 400 }}>
                {days[i]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── NOTICE CARD ─────────────────────────────────────────────────────────────
function NoticeCard() {
  return (
    <div
      className="rounded-2xl p-4 flex items-start gap-3 relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${C.primary}, ${C.primaryMd})`,
        boxShadow: `0 4px 16px rgba(27,79,114,0.25)`,
      }}
    >
      <div className="absolute -right-4 -bottom-4 w-20 h-20 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.06)" }} />
      <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(255,255,255,0.15)" }}>
        <Activity size={18} color="#fff" />
      </div>
      <div className="flex-1 relative z-10">
        <p style={{ fontFamily: F, fontWeight: 700, fontSize: "0.875rem", color: "#fff" }}>System is healthy</p>
        <p style={{ fontFamily: F, fontSize: "0.72rem", color: "rgba(255,255,255,0.65)", marginTop: "2px", lineHeight: 1.5 }}>
          All records synced · Last backup: 3 mins ago
        </p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// LAYOUTS
// ═══════════════════════════════════════════════════════════════════════════════

// ── MOBILE ────────────────────────────────────────────────────────────────────
function MobileLayout({
  online, setOnline,
}: { online: boolean; setOnline: (v: boolean) => void }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [syncing, setSyncing] = useState(false);

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => { setSyncing(false); setOnline(true); }, 2000);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden" style={{ backgroundColor: C.bg }}>
      <MobileTopBar online={online} onMenuOpen={() => setDrawerOpen(true)} />

      {!online && <OfflineBanner onSync={handleSync} syncing={syncing} />}

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 pt-4 pb-6 space-y-5">

          {/* Greeting */}
          <Greeting compact />

          {/* Stats 2×2 */}
          <div className="grid grid-cols-2 gap-3">
            {STATS.map((s) => <StatCard key={s.key} {...s} />)}
          </div>

          {/* Quick actions */}
          <QuickActionsSection compact />

          {/* Recent visits */}
          <RecentVisitsSection />

          {/* Due today */}
          <DueTodaySection />

          {/* Mini chart */}
          <MiniChart />
        </div>
      </div>

      <BottomTabBar active="dashboard" />

      {/* Drawer */}
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      {/* Toggle online/offline (demo) */}
      <button
        onClick={() => setOnline((v) => !v)}
        className="fixed bottom-20 right-4 z-40 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all"
        style={{ backgroundColor: online ? C.success : C.warning, boxShadow: `0 4px 14px ${online ? "rgba(39,174,96,0.4)" : "rgba(243,156,18,0.4)"}` }}
      >
        {online ? <Wifi size={16} color="#fff" /> : <WifiOff size={16} color="#fff" />}
      </button>
    </div>
  );
}

// ── TABLET ────────────────────────────────────────────────────────────────────
function TabletLayout({
  online, setOnline,
}: { online: boolean; setOnline: (v: boolean) => void }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [syncing, setSyncing] = useState(false);

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => { setSyncing(false); setOnline(true); }, 2000);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden" style={{ backgroundColor: C.bg }}>
      {/* Top bar */}
      <div
        className="flex items-center gap-3 px-5 flex-shrink-0"
        style={{ height: "56px", background: `linear-gradient(135deg, ${C.navy}, ${C.primary})` }}
      >
        <button
          onClick={() => setDrawerOpen(true)}
          className="w-8 h-8 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
        >
          <Menu size={17} color="#fff" />
        </button>
        <div className="flex items-center gap-2 flex-1">
          <div className="w-7 h-7 rounded-xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${C.accent}, #D35400)` }}>
            <PawPrint size={14} color="#fff" strokeWidth={1.8} />
          </div>
          <span style={{ color: "#fff", fontFamily: F, fontWeight: 700, fontSize: "0.9375rem" }}>PetCare Clinic</span>
        </div>
        <SyncDot online={online} />
        <button
          className="w-8 h-8 rounded-xl flex items-center justify-center relative"
          style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
        >
          <Bell size={16} color="#fff" />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center" style={{ backgroundColor: C.danger, color: "#fff", fontSize: "0.52rem", fontWeight: 700 }}>3</span>
        </button>
      </div>

      {!online && <OfflineBanner onSync={handleSync} syncing={syncing} />}

      <div className="flex-1 overflow-y-auto">
        <div className="px-5 pt-5 pb-8 space-y-5">

          {/* Greeting */}
          <Greeting />

          {/* Stats 2×2 */}
          <div className="grid grid-cols-2 gap-4">
            {STATS.map((s) => <StatCard key={s.key} {...s} />)}
          </div>

          {/* Quick actions */}
          <QuickActionsSection />

          {/* Recent + Due today side by side */}
          <div className="grid grid-cols-2 gap-5">
            <RecentVisitsSection />
            <div className="space-y-5">
              <DueTodaySection />
              <MiniChart />
            </div>
          </div>
        </div>
      </div>

      <BottomTabBar active="dashboard" />
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <button
        onClick={() => setOnline((v) => !v)}
        className="fixed bottom-20 right-5 z-40 w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
        style={{ backgroundColor: online ? C.success : C.warning }}
      >
        {online ? <Wifi size={16} color="#fff" /> : <WifiOff size={16} color="#fff" />}
      </button>
    </div>
  );
}

// ── DESKTOP ───────────────────────────────────────────────────────────────────
function DesktopLayout({
  online, setOnline,
}: { online: boolean; setOnline: (v: boolean) => void }) {
  const [collapsed, setCollapsed] = useState(false);
  const [syncing, setSyncing] = useState(false);

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => { setSyncing(false); setOnline(true); }, 2000);
  };

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: C.bg }}>
      {/* Sidebar */}
      <Sidebar active="dashboard" collapsed={collapsed} onCollapse={() => setCollapsed((c) => !c)} />

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <DesktopTopBar online={online} collapsed={collapsed} onCollapse={() => setCollapsed((c) => !c)} />

        {!online && <OfflineBanner onSync={handleSync} syncing={syncing} />}

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-7 pt-6 pb-10 space-y-6" style={{ maxWidth: "1400px" }}>

            {/* Greeting row */}
            <div className="flex items-start justify-between gap-4">
              <Greeting />
              <div className="flex items-center gap-3 flex-shrink-0">
                <NoticeCard />
              </div>
            </div>

            {/* 4 stat cards in one row */}
            <div className="grid grid-cols-4 gap-5">
              {STATS.map((s) => <StatCard key={s.key} {...s} />)}
            </div>

            {/* Main content: 60% left + 40% right */}
            <div className="flex gap-6">

              {/* LEFT 60% — Recent Visits */}
              <div className="flex-[3] min-w-0 space-y-5">
                <RecentVisitsSection />
                <MiniChart />
              </div>

              {/* RIGHT 40% — Due Today + Quick Actions */}
              <div className="flex-[2] min-w-0 space-y-5">
                <QuickActionsSection />
                <DueTodaySection />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toggle online/offline demo */}
      <button
        onClick={() => setOnline((v) => !v)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold shadow-xl"
        style={{
          backgroundColor: online ? C.success : C.warning,
          color: "#fff",
          fontFamily: F,
          boxShadow: `0 8px 24px ${online ? "rgba(39,174,96,0.4)" : "rgba(243,156,18,0.4)"}`,
        }}
      >
        {online ? <WifiOff size={15} /> : <Wifi size={15} />}
        {online ? "Simulate Offline" : "Go Online"}
      </button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ROOT EXPORT
// ═══════════════════════════════════════════════════════════════════════════════
export function DashboardPage() {
  const { isMobile, isTablet, isDesktop } = useBreakpoint();
  const [online, setOnline] = useState(true);

  if (isMobile)  return <MobileLayout  online={online} setOnline={setOnline} />;
  if (isTablet)  return <TabletLayout  online={online} setOnline={setOnline} />;
  return               <DesktopLayout  online={online} setOnline={setOnline} />;
}
