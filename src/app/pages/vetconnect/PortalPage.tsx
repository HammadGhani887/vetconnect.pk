import { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import {
  LayoutDashboard, Heart, Calendar, FileText, ShieldCheck,
  CreditCard, Settings, LogOut, Bell, Search, ChevronDown,
  MapPin, Clock, CheckCircle, AlertCircle, PlusCircle,
  Navigation, RotateCcw, X, Menu, User, ArrowRight,
  Activity, Stethoscope, BookOpen, Plus, ChevronRight,
} from "lucide-react";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";

// ─── ASSETS ───────────────────────────────────────────────────────────────────
const IMG_MAX = "https://images.unsplash.com/photo-1721656363841-93e97a879979?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkZW4lMjByZXRyaWV2ZXIlMjBkb2clMjBwb3J0cmFpdCUyMGN1dGV8ZW58MXx8fHwxNzc3MjcxNDMyfDA&ixlib=rb-4.1.0&q=80&w=400";
const IMG_WHISKERS = "https://images.unsplash.com/photo-1772170439567-d94c377b5c92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzaWFuJTIwY2F0JTIwZmx1ZmZ5JTIwcG9ydHJhaXQlMjBjbG9zZSUyMHVwfGVufDF8fHx8MTc3NzI3MTQzNnww&ixlib=rb-4.1.0&q=80&w=400";
const IMG_TWEETY = "https://images.unsplash.com/photo-1610264570841-dbba66cd3bb5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwZ3JleSUyMHBhcnJvdCUyMGNvbG9yZnVsJTIwYmlyZCUyMHBvcnRyYWl0fGVufDF8fHx8MTc3NzI3MTQzNnww&ixlib=rb-4.1.0&q=80&w=400";
const IMG_VET = "https://images.unsplash.com/photo-1756699279298-c89cdef354ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwdmV0ZXJpbmFyaWFuJTIwZG9jdG9yJTIwcHJvZmVzc2lvbmFsJTIwcG9ydHJhaXQlMjBzbWlsaW5nJTIwd2hpdGUlMjBjb2F0fGVufDF8fHx8MTc3NzI3MDUxMXww&ixlib=rb-4.1.0&q=80&w=200";

// ─── DATA ─────────────────────────────────────────────────────────────────────
const PETS = [
  {
    id: "1", name: "Max", species: "Dog", breed: "Golden Retriever",
    age: "3 yrs", lastVisit: "Apr 15, 2026", status: "healthy",
    img: IMG_MAX, weight: "28 kg", gender: "Male",
  },
  {
    id: "2", name: "Whiskers", species: "Cat", breed: "Persian",
    age: "5 yrs", lastVisit: "Mar 20, 2026", status: "needs_attention",
    img: IMG_WHISKERS, weight: "4.2 kg", gender: "Female",
  },
  {
    id: "3", name: "Tweety", species: "Bird", breed: "African Grey Parrot",
    age: "2 yrs", lastVisit: "Apr 1, 2026", status: "healthy",
    img: IMG_TWEETY, weight: "420 g", gender: "Male",
  },
];

const APPOINTMENTS = [
  {
    id: "1", day: "15", month: "MAY", year: "2026", time: "10:30 AM", dayName: "Saturday",
    vet: "Dr. Ahmed Khan", vetImg: IMG_VET, specialty: "Small Animal Surgery",
    clinic: "PetCare Veterinary Hospital", area: "Model Town, Lahore",
    pet: "Max", petEmoji: "🐕", visitType: "General Checkup",
    status: "confirmed", fee: 1500,
  },
  {
    id: "2", day: "22", month: "MAY", year: "2026", time: "2:00 PM", dayName: "Saturday",
    vet: "Dr. Sana Qureshi", vetImg: "", specialty: "Veterinary Dentistry",
    clinic: "Paws & Claws Clinic", area: "F-7/2, Islamabad",
    pet: "Whiskers", petEmoji: "🐈", visitType: "Dental Cleaning",
    status: "pending", fee: 5000,
  },
];

const VACCINATIONS = [
  {
    id: "1", name: "Rabies Booster", pet: "Max", petEmoji: "🐕",
    dueDate: "May 20, 2026", status: "upcoming", daysLeft: 23,
  },
  {
    id: "2", name: "DHPP (4-in-1)", pet: "Max", petEmoji: "🐕",
    completedDate: "May 1, 2026", status: "completed",
  },
  {
    id: "3", name: "Feline Distemper", pet: "Whiskers", petEmoji: "🐈",
    overdueDays: 5, status: "overdue",
  },
  {
    id: "4", name: "Newcastle Disease", pet: "Tweety", petEmoji: "🦜",
    dueDate: "Jun 5, 2026", status: "upcoming", daysLeft: 39,
  },
];

const ACTIVITIES = [
  {
    id: "1", icon: "visit", color: "#1B4F72",
    text: "Visited Dr. Ahmed Khan for Max's checkup",
    time: "3 days ago", sub: "PetCare Veterinary Hospital",
  },
  {
    id: "2", icon: "vaccine", color: "#27AE60",
    text: "Vaccination completed for Tweety",
    time: "1 week ago", sub: "Newcastle Disease vaccine administered",
  },
  {
    id: "3", icon: "pet", color: "#E67E22",
    text: "New pet Whiskers registered",
    time: "2 weeks ago", sub: "Persian Cat — Female — 5 years",
  },
  {
    id: "4", icon: "invoice", color: "#8E94A7",
    text: "Invoice paid — Dr. Ahmed Khan visit",
    time: "3 weeks ago", sub: "PKR 1,500 · General Checkup",
  },
];

const NOTIFICATIONS = [
  {
    id: "1", text: "Max's appointment confirmed for May 15",
    sub: "PetCare Veterinary Hospital · 10:30 AM", time: "Just now", color: "#27AE60", unread: true,
  },
  {
    id: "2", text: "Vaccination due: Rabies Booster for Max",
    sub: "Due in 23 days — Book an appointment", time: "2 hrs ago", color: "#E67E22", unread: true,
  },
  {
    id: "3", text: "New message from Dr. Ahmed Khan",
    sub: "Your post-op report for Max is ready", time: "Yesterday", color: "#1B4F72", unread: true,
  },
];

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", Icon: LayoutDashboard },
  { id: "pets", label: "My Pets", Icon: Heart },
  { id: "appointments", label: "Appointments", Icon: Calendar },
  { id: "records", label: "Health Records", Icon: FileText },
  { id: "vaccinations", label: "Vaccinations", Icon: ShieldCheck },
  { id: "invoices", label: "Invoices", Icon: CreditCard },
];

const STATUS_CONFIG = {
  healthy: { label: "Healthy", bg: "#EAFAF1", color: "#27AE60", dot: "#27AE60" },
  needs_attention: { label: "Needs Attention", bg: "#FEF3E8", color: "#E67E22", dot: "#E67E22" },
  overdue: { label: "Overdue", bg: "#FDEDEC", color: "#E74C3C", dot: "#E74C3C" },
};

// ─── SIDEBAR ──────────────────────────────────────────────────────────────────
function Sidebar({
  active,
  setActive,
  open,
  onClose,
}: {
  active: string;
  setActive: (id: string) => void;
  open: boolean;
  onClose: () => void;
}) {
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-30 lg:hidden"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={onClose}
        />
      )}

      <aside
        className="fixed lg:static z-40 inset-y-0 left-0 flex flex-col transition-transform duration-300 lg:translate-x-0"
        style={{
          width: "240px",
          backgroundColor: "#0D2F4F",
          transform: open ? "translateX(0)" : undefined,
          flexShrink: 0,
        }}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: "#E67E22" }}
            >
              <Stethoscope size={16} color="#fff" />
            </div>
            <div>
              <p style={{ color: "#fff", fontFamily: "'DM Serif Display', serif", fontSize: "1rem", lineHeight: 1 }}>
                VetConnect
              </p>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.65rem" }}>Pet Owner Portal</p>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden" style={{ color: "rgba(255,255,255,0.5)" }}>
            <X size={18} />
          </button>
        </div>

        {/* User mini card */}
        <div className="mx-4 my-4 px-3 py-3 rounded-xl" style={{ backgroundColor: "rgba(255,255,255,0.06)" }}>
          <div className="flex items-center gap-2.5">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-sm flex-shrink-0"
              style={{ backgroundColor: "#E67E22", color: "#fff", fontWeight: 700 }}
            >
              AG
            </div>
            <div className="min-w-0">
              <p style={{ color: "#fff", fontWeight: 600, fontSize: "0.85rem" }} className="truncate">
                Ali Gauhar
              </p>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.7rem" }} className="truncate">
                3 Pets · Premium Plan
              </p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 overflow-y-auto">
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.65rem", fontWeight: 600 }} className="px-2 mb-2">
            MAIN MENU
          </p>
          {NAV_ITEMS.map(({ id, label, Icon }) => {
            const isActive = active === id;
            return (
              <button
                key={id}
                onClick={() => { setActive(id); onClose(); }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 text-left transition-all duration-150"
                style={{
                  backgroundColor: isActive ? "rgba(230,126,34,0.2)" : "transparent",
                  color: isActive ? "#E67E22" : "rgba(255,255,255,0.65)",
                  borderLeft: isActive ? "3px solid #E67E22" : "3px solid transparent",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.06)";
                    e.currentTarget.style.color = "#fff";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "rgba(255,255,255,0.65)";
                  }
                }}
              >
                <Icon size={17} />
                <span style={{ fontSize: "0.875rem", fontWeight: isActive ? 700 : 400 }}>{label}</span>
                {isActive && <ChevronRight size={14} className="ml-auto" />}
              </button>
            );
          })}

          <div className="mt-4 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.65rem", fontWeight: 600 }} className="px-2 mb-2">
              ACCOUNT
            </p>
            {[
              { id: "settings", label: "Profile Settings", Icon: Settings },
              { id: "logout", label: "Logout", Icon: LogOut },
            ].map(({ id, label, Icon }) => (
              <button
                key={id}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 text-left transition-all"
                style={{ color: id === "logout" ? "#E74C3C" : "rgba(255,255,255,0.55)" }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.06)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
              >
                <Icon size={17} />
                <span style={{ fontSize: "0.875rem" }}>{label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Bottom ad / upgrade */}
        <div className="m-4 p-4 rounded-2xl" style={{ background: "linear-gradient(135deg, #1B4F72, #2E86C1)" }}>
          <p style={{ color: "#fff", fontWeight: 700, fontSize: "0.8rem" }}>🌟 Premium Active</p>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.7rem", marginTop: "3px" }}>
            Unlimited pets & records
          </p>
        </div>
      </aside>
    </>
  );
}

// ─── TOP BAR ──────────────────────────────────────────────────────────────────
function TopBar({
  onMenuToggle,
  showNotif,
  setShowNotif,
  showUser,
  setShowUser,
}: {
  onMenuToggle: () => void;
  showNotif: boolean;
  setShowNotif: (v: boolean) => void;
  showUser: boolean;
  setShowUser: (v: boolean) => void;
}) {
  const notifRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setShowNotif(false);
      if (userRef.current && !userRef.current.contains(e.target as Node)) setShowUser(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [setShowNotif, setShowUser]);

  return (
    <header
      className="flex items-center gap-3 px-4 sm:px-6 py-3.5 flex-shrink-0"
      style={{
        backgroundColor: "#fff",
        borderBottom: "1px solid #E8ECF1",
        boxShadow: "0 1px 8px rgba(0,0,0,0.04)",
        zIndex: 20,
      }}
    >
      {/* Hamburger */}
      <button
        onClick={onMenuToggle}
        className="lg:hidden p-2 rounded-xl"
        style={{ backgroundColor: "#F0F4F8" }}
      >
        <Menu size={18} style={{ color: "#1B4F72" }} />
      </button>

      {/* Search */}
      <div className="flex-1 max-w-sm relative">
        <Search
          size={15}
          className="absolute left-3 top-1/2 -translate-y-1/2"
          style={{ color: "#8E94A7" }}
        />
        <input
          type="text"
          placeholder="Search pets, appointments..."
          className="w-full pl-9 pr-4 py-2 rounded-xl text-sm outline-none"
          style={{
            border: "1.5px solid #E8ECF1",
            backgroundColor: "#F8FAFC",
            color: "#1A1A2E",
          }}
          onFocus={(e) => { e.currentTarget.style.borderColor = "#1B4F72"; e.currentTarget.style.backgroundColor = "#fff"; }}
          onBlur={(e) => { e.currentTarget.style.borderColor = "#E8ECF1"; e.currentTarget.style.backgroundColor = "#F8FAFC"; }}
        />
      </div>

      <div className="flex items-center gap-2 ml-auto">
        {/* Notifications */}
        <div ref={notifRef} className="relative">
          <button
            onClick={() => { setShowNotif(!showNotif); setShowUser(false); }}
            className="relative p-2.5 rounded-xl transition-all"
            style={{ backgroundColor: showNotif ? "#EBF5FB" : "#F0F4F8" }}
          >
            <Bell size={18} style={{ color: "#1B4F72" }} />
            <span
              className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-white"
              style={{ backgroundColor: "#E74C3C", fontSize: "0.6rem", fontWeight: 700 }}
            >
              3
            </span>
          </button>

          {showNotif && (
            <div
              className="absolute right-0 top-full mt-2 rounded-2xl shadow-2xl overflow-hidden"
              style={{
                width: "320px",
                backgroundColor: "#fff",
                border: "1px solid #E8ECF1",
                zIndex: 50,
              }}
            >
              <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: "1px solid #F0F4F8" }}>
                <p style={{ color: "#1A1A2E", fontWeight: 700, fontSize: "0.9rem" }}>
                  Notifications
                </p>
                <span
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: "#FDEDEC", color: "#E74C3C", fontWeight: 600 }}
                >
                  3 unread
                </span>
              </div>
              <div>
                {NOTIFICATIONS.map((n) => (
                  <div
                    key={n.id}
                    className="flex items-start gap-3 px-4 py-3.5 cursor-pointer transition-colors"
                    style={{ backgroundColor: n.unread ? "#FAFBFD" : "#fff", borderBottom: "1px solid #F0F4F8" }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#F0F4F8"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = n.unread ? "#FAFBFD" : "#fff"; }}
                  >
                    <div
                      className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                      style={{ backgroundColor: n.color }}
                    />
                    <div className="flex-1 min-w-0">
                      <p style={{ color: "#1A1A2E", fontSize: "0.8rem", fontWeight: 600, lineHeight: 1.4 }}>{n.text}</p>
                      <p style={{ color: "#8E94A7", fontSize: "0.72rem", marginTop: "2px" }}>{n.sub}</p>
                      <p style={{ color: "#C8CDD9", fontSize: "0.68rem", marginTop: "3px" }}>{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 text-center">
                <button style={{ color: "#1B4F72", fontSize: "0.78rem", fontWeight: 600 }}>
                  Mark all as read
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User menu */}
        <div ref={userRef} className="relative">
          <button
            onClick={() => { setShowUser(!showUser); setShowNotif(false); }}
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all"
            style={{ backgroundColor: showUser ? "#EBF5FB" : "#F0F4F8" }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white flex-shrink-0"
              style={{ backgroundColor: "#E67E22", fontSize: "0.8rem", fontWeight: 700 }}
            >
              AG
            </div>
            <span className="hidden sm:block" style={{ color: "#1A1A2E", fontSize: "0.85rem", fontWeight: 600 }}>
              Ali Gauhar
            </span>
            <ChevronDown
              size={14}
              style={{ color: "#8E94A7", transform: showUser ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}
            />
          </button>

          {showUser && (
            <div
              className="absolute right-0 top-full mt-2 rounded-2xl shadow-xl overflow-hidden"
              style={{ width: "200px", backgroundColor: "#fff", border: "1px solid #E8ECF1", zIndex: 50 }}
            >
              <div className="p-4" style={{ borderBottom: "1px solid #F0F4F8" }}>
                <p style={{ color: "#1A1A2E", fontWeight: 700, fontSize: "0.875rem" }}>Ali Gauhar</p>
                <p style={{ color: "#8E94A7", fontSize: "0.75rem" }}>ali.gauhar@gmail.com</p>
              </div>
              {[
                { icon: User, label: "My Profile" },
                { icon: Calendar, label: "Appointments" },
                { icon: Settings, label: "Settings" },
              ].map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-left transition-colors"
                  style={{ color: "#5A6178", fontSize: "0.85rem" }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#F0F4F8"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                >
                  <Icon size={15} />
                  {label}
                </button>
              ))}
              <div style={{ borderTop: "1px solid #F0F4F8" }}>
                <button
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-left transition-colors"
                  style={{ color: "#E74C3C", fontSize: "0.85rem" }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#FEF5F5"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                >
                  <LogOut size={15} />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

// ─── STAT CARDS ───────────────────────────────────────────────────────────────
const STATS = [
  {
    label: "Pets Registered",
    value: "3",
    icon: "🐾",
    gradient: "linear-gradient(135deg, #1B4F72, #2E86C1)",
    badge: "",
  },
  {
    label: "Upcoming Appointments",
    value: "2",
    icon: "📅",
    gradient: "linear-gradient(135deg, #E67E22, #F39C12)",
    badge: "",
  },
  {
    label: "Vaccination Due",
    value: "1",
    icon: "💉",
    gradient: "linear-gradient(135deg, #E74C3C, #EC7063)",
    badge: "Action needed",
  },
  {
    label: "Next Visit",
    value: "May 15",
    icon: "🕐",
    gradient: "linear-gradient(135deg, #27AE60, #2ECC71)",
    badge: "Confirmed",
  },
];

function StatCards() {
  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
      {STATS.map((stat) => (
        <div
          key={stat.label}
          className="relative rounded-2xl p-5 overflow-hidden transition-transform hover:-translate-y-0.5"
          style={{ background: stat.gradient, boxShadow: "0 4px 20px rgba(0,0,0,0.12)" }}
        >
          {/* Decorative circle */}
          <div
            className="absolute -top-4 -right-4 w-20 h-20 rounded-full"
            style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
          />
          <div
            className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full"
            style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
          />
          <div className="relative">
            <p style={{ fontSize: "1.6rem", lineHeight: 1 }}>{stat.icon}</p>
            <p
              style={{
                color: "#fff",
                fontFamily: "'DM Serif Display', serif",
                fontSize: "1.75rem",
                lineHeight: 1,
                marginTop: "8px",
              }}
            >
              {stat.value}
            </p>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.78rem", marginTop: "3px" }}>
              {stat.label}
            </p>
            {stat.badge && (
              <span
                className="inline-block mt-2 px-2 py-0.5 rounded-full text-xs"
                style={{ backgroundColor: "rgba(255,255,255,0.25)", color: "#fff", fontWeight: 600 }}
              >
                {stat.badge}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── MY PETS SECTION ──────────────────────────────────────────────────────────
function PetCard({ pet }: { pet: typeof PETS[0] }) {
  const cfg = STATUS_CONFIG[pet.status as keyof typeof STATUS_CONFIG];
  return (
    <div
      className="flex-shrink-0 rounded-2xl overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-1 group"
      style={{
        width: "200px",
        backgroundColor: "#fff",
        border: "1.5px solid #E8ECF1",
      }}
    >
      {/* Photo */}
      <div className="relative h-36 overflow-hidden">
        <ImageWithFallback
          src={pet.img}
          alt={pet.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(13,47,79,0.6), transparent 50%)" }} />
        {/* Status badge */}
        <div
          className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2 py-0.5 rounded-full"
          style={{ backgroundColor: cfg.bg, border: `1px solid ${cfg.dot}` }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cfg.dot }} />
          <span style={{ color: cfg.color, fontSize: "0.62rem", fontWeight: 700 }}>{cfg.label}</span>
        </div>
        {/* Name overlay */}
        <div className="absolute bottom-2.5 left-3">
          <p style={{ color: "#fff", fontWeight: 700, fontSize: "0.95rem" }}>{pet.name}</p>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.7rem" }}>{pet.breed}</p>
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <div className="grid grid-cols-2 gap-1.5 mb-3">
          {[
            { label: "Species", val: pet.species },
            { label: "Age", val: pet.age },
            { label: "Weight", val: pet.weight },
            { label: "Gender", val: pet.gender },
          ].map((item) => (
            <div key={item.label}>
              <p style={{ color: "#8E94A7", fontSize: "0.62rem" }}>{item.label}</p>
              <p style={{ color: "#1A1A2E", fontWeight: 600, fontSize: "0.75rem" }}>{item.val}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-1 mb-3 pb-3" style={{ borderBottom: "1px solid #F0F4F8" }}>
          <Clock size={11} style={{ color: "#8E94A7" }} />
          <span style={{ color: "#8E94A7", fontSize: "0.68rem" }}>Last visit: {pet.lastVisit}</span>
        </div>

        <div className="grid grid-cols-2 gap-1.5">
          <Link
            to={`/vetconnect/portal/pets/${pet.id}`}
            className="flex items-center justify-center gap-1 py-2 rounded-xl text-xs font-medium transition-all"
            style={{ backgroundColor: "#EBF5FB", color: "#1B4F72" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#1B4F72"; (e.currentTarget as HTMLAnchorElement).style.color = "#fff"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#EBF5FB"; (e.currentTarget as HTMLAnchorElement).style.color = "#1B4F72"; }}
          >
            <BookOpen size={11} />
            Records
          </Link>
          <Link
            to="/vetconnect/book/8"
            className="flex items-center justify-center gap-1 py-2 rounded-xl text-xs font-medium text-white transition-all"
            style={{ backgroundColor: "#E67E22" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#D35400"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#E67E22"; }}
          >
            <Calendar size={11} />
            Book
          </Link>
        </div>
      </div>
    </div>
  );
}

function MyPetsSection() {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 style={{ fontFamily: "'DM Serif Display', serif", color: "#0D2F4F", fontSize: "1.25rem" }}>
          My Pets
        </h2>
        <button
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all"
          style={{ backgroundColor: "#EBF5FB", color: "#1B4F72" }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#1B4F72"; e.currentTarget.style.color = "#fff"; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#EBF5FB"; e.currentTarget.style.color = "#1B4F72"; }}
        >
          <Plus size={15} />
          Add New Pet
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
        {PETS.map((pet) => (
          <PetCard key={pet.id} pet={pet} />
        ))}
        {/* Add new pet card */}
        <div
          className="flex-shrink-0 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all hover:border-blue-400 hover:bg-blue-50"
          style={{ width: "160px", minHeight: "280px", borderColor: "#C8CDD9", backgroundColor: "#F8FAFC" }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#1B4F72"; e.currentTarget.style.backgroundColor = "#EBF5FB"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#C8CDD9"; e.currentTarget.style.backgroundColor = "#F8FAFC"; }}
        >
          <PlusCircle size={28} style={{ color: "#8E94A7" }} className="mb-2" />
          <p style={{ color: "#5A6178", fontWeight: 600, fontSize: "0.85rem" }}>Add Pet</p>
          <p style={{ color: "#8E94A7", fontSize: "0.72rem", textAlign: "center", padding: "0 12px", marginTop: "4px" }}>
            Register a new pet profile
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── APPOINTMENTS ─────────────────────────────────────────────────────────────
function AppointmentCard({ appt }: { appt: typeof APPOINTMENTS[0] }) {
  return (
    <div
      className="rounded-2xl p-4 sm:p-5 transition-all hover:shadow-md"
      style={{ backgroundColor: "#fff", border: "1px solid #E8ECF1" }}
    >
      <div className="flex items-start gap-4">
        {/* Calendar mini */}
        <div
          className="rounded-2xl overflow-hidden flex-shrink-0 text-center"
          style={{ width: "60px", backgroundColor: "#1B4F72" }}
        >
          <div className="py-1.5 text-xs font-bold" style={{ backgroundColor: "#E67E22", color: "#fff" }}>
            {appt.month}
          </div>
          <div className="py-2">
            <p style={{ fontFamily: "'DM Serif Display', serif", color: "#fff", fontSize: "1.5rem", lineHeight: 1 }}>
              {appt.day}
            </p>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.6rem" }}>{appt.year}</p>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0" style={{ border: "2px solid #E8ECF1" }}>
                {appt.vetImg ? (
                  <ImageWithFallback src={appt.vetImg} alt={appt.vet} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: "#1B4F72", color: "#fff" }}>
                    {appt.vet.split(" ")[1]?.[0]}{appt.vet.split(" ")[2]?.[0]}
                  </div>
                )}
              </div>
              <div>
                <p style={{ color: "#1A1A2E", fontWeight: 700, fontSize: "0.9rem" }}>{appt.vet}</p>
                <p style={{ color: "#5A6178", fontSize: "0.75rem" }}>{appt.specialty}</p>
              </div>
            </div>
            <span
              className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs"
              style={{
                backgroundColor: appt.status === "confirmed" ? "#EAFAF1" : "#FEF9E7",
                color: appt.status === "confirmed" ? "#27AE60" : "#E67E22",
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: appt.status === "confirmed" ? "#27AE60" : "#E67E22" }} />
              {appt.status === "confirmed" ? "Confirmed" : "Pending"}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2.5">
            <div className="flex items-center gap-1">
              <MapPin size={12} style={{ color: "#8E94A7" }} />
              <span style={{ color: "#5A6178", fontSize: "0.78rem" }}>{appt.clinic}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={12} style={{ color: "#8E94A7" }} />
              <span style={{ color: "#5A6178", fontSize: "0.78rem" }}>{appt.dayName}, {appt.time}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 mt-2">
            <span
              className="text-xs px-2.5 py-1 rounded-full"
              style={{ backgroundColor: "#F0F4F8", color: "#5A6178" }}
            >
              {appt.petEmoji} {appt.pet}
            </span>
            <span
              className="text-xs px-2.5 py-1 rounded-full"
              style={{ backgroundColor: "#EBF5FB", color: "#1B4F72" }}
            >
              {appt.visitType}
            </span>
            <span
              className="text-xs px-2.5 py-1 rounded-full"
              style={{ backgroundColor: "#F8FAFC", color: "#8E94A7" }}
            >
              PKR {appt.fee.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div
        className="flex flex-wrap items-center gap-2 mt-4 pt-4"
        style={{ borderTop: "1px solid #F0F4F8" }}
      >
        <button
          className="flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-xl transition-all"
          style={{ color: "#1B4F72", backgroundColor: "#EBF5FB" }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#1B4F72"; e.currentTarget.style.color = "#fff"; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#EBF5FB"; e.currentTarget.style.color = "#1B4F72"; }}
        >
          <RotateCcw size={12} />
          Reschedule
        </button>
        <button
          className="flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-xl transition-all"
          style={{ color: "#E74C3C", backgroundColor: "#FEF5F5" }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#E74C3C"; e.currentTarget.style.color = "#fff"; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#FEF5F5"; e.currentTarget.style.color = "#E74C3C"; }}
        >
          <X size={12} />
          Cancel
        </button>
        <button
          className="flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-xl ml-auto text-white transition-all"
          style={{ backgroundColor: "#27AE60" }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#1E8449"; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#27AE60"; }}
        >
          <Navigation size={12} />
          Get Directions
        </button>
      </div>
    </div>
  );
}

function UpcomingAppointments() {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 style={{ fontFamily: "'DM Serif Display', serif", color: "#0D2F4F", fontSize: "1.25rem" }}>
          Upcoming Appointments
        </h2>
        <Link
          to="/vetconnect/portal"
          className="flex items-center gap-1 text-sm transition-opacity hover:opacity-70"
          style={{ color: "#1B4F72", fontWeight: 600 }}
        >
          View All <ArrowRight size={14} />
        </Link>
      </div>
      <div className="space-y-4">
        {APPOINTMENTS.map((appt) => (
          <AppointmentCard key={appt.id} appt={appt} />
        ))}
      </div>
    </section>
  );
}

// ─── VACCINATION SCHEDULE ─────────────────────────────────────────────────────
function VaccinationSchedule() {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? VACCINATIONS : VACCINATIONS.filter((v) => v.pet.toLowerCase() === filter);

  const petOptions = [
    { value: "all", label: "All Pets" },
    { value: "max", label: "🐕 Max" },
    { value: "whiskers", label: "🐈 Whiskers" },
    { value: "tweety", label: "🦜 Tweety" },
  ];

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 style={{ fontFamily: "'DM Serif Display', serif", color: "#0D2F4F", fontSize: "1.25rem" }}>
          Vaccination Schedule
        </h2>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="text-xs px-3 py-1.5 rounded-xl outline-none"
          style={{ border: "1.5px solid #E8ECF1", color: "#5A6178", backgroundColor: "#F8FAFC" }}
        >
          {petOptions.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      <div
        className="rounded-2xl overflow-hidden"
        style={{ backgroundColor: "#fff", border: "1px solid #E8ECF1" }}
      >
        {filtered.map((vac, idx) => {
          const isLast = idx === filtered.length - 1;
          const isUpcoming = vac.status === "upcoming";
          const isCompleted = vac.status === "completed";
          const isOverdue = vac.status === "overdue";

          return (
            <div
              key={vac.id}
              className="flex items-start gap-3 px-4 py-4"
              style={{ borderBottom: isLast ? "none" : "1px solid #F0F4F8" }}
            >
              {/* Timeline dot */}
              <div className="flex flex-col items-center mt-0.5 flex-shrink-0">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: isCompleted ? "#EAFAF1" : isOverdue ? "#FDEDEC" : "#FEF3E8",
                  }}
                >
                  {isCompleted ? (
                    <CheckCircle size={15} style={{ color: "#27AE60" }} />
                  ) : isOverdue ? (
                    <AlertCircle size={15} style={{ color: "#E74C3C" }} />
                  ) : (
                    <Clock size={14} style={{ color: "#E67E22" }} />
                  )}
                </div>
                {!isLast && (
                  <div className="w-0.5 h-6 mt-1" style={{ backgroundColor: "#F0F4F8" }} />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p style={{ color: "#1A1A2E", fontWeight: 700, fontSize: "0.85rem" }}>
                      {vac.name}
                    </p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span style={{ fontSize: "0.8rem" }}>{vac.petEmoji}</span>
                      <span style={{ color: "#5A6178", fontSize: "0.75rem" }}>{vac.pet}</span>
                    </div>
                    <p
                      className="mt-0.5 text-xs"
                      style={{
                        color: isCompleted ? "#27AE60" : isOverdue ? "#E74C3C" : "#E67E22",
                        fontWeight: 600,
                      }}
                    >
                      {isCompleted
                        ? `✓ Completed ${vac.completedDate}`
                        : isOverdue
                        ? `⚠ Overdue by ${vac.overdueDays} days`
                        : `Due ${vac.dueDate} · ${vac.daysLeft} days left`}
                    </p>
                  </div>

                  {!isCompleted && (
                    <button
                      className="text-xs font-medium px-3 py-1.5 rounded-xl flex-shrink-0 transition-all text-white"
                      style={{ backgroundColor: isOverdue ? "#E74C3C" : "#E67E22" }}
                      onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.85"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
                    >
                      {isOverdue ? "Book Urgently" : "Book Now"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="py-8 text-center">
            <ShieldCheck size={28} style={{ color: "#27AE60" }} className="mx-auto mb-2" />
            <p style={{ color: "#5A6178", fontSize: "0.875rem" }}>All vaccinations up to date!</p>
          </div>
        )}
      </div>
    </section>
  );
}

// ─── RECENT ACTIVITY ──────────────────────────────────────────────────────────
const ACTIVITY_ICONS: Record<string, { icon: React.ElementType; bg: string; color: string }> = {
  visit: { icon: Stethoscope, bg: "#EBF5FB", color: "#1B4F72" },
  vaccine: { icon: ShieldCheck, bg: "#EAFAF1", color: "#27AE60" },
  pet: { icon: Heart, bg: "#FEF3E8", color: "#E67E22" },
  invoice: { icon: CreditCard, bg: "#F0F4F8", color: "#8E94A7" },
};

function RecentActivity() {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 style={{ fontFamily: "'DM Serif Display', serif", color: "#0D2F4F", fontSize: "1.25rem" }}>
          Recent Activity
        </h2>
        <button className="flex items-center gap-1 text-sm" style={{ color: "#1B4F72", fontWeight: 600 }}>
          See all <ArrowRight size={14} />
        </button>
      </div>

      <div
        className="rounded-2xl overflow-hidden"
        style={{ backgroundColor: "#fff", border: "1px solid #E8ECF1" }}
      >
        {ACTIVITIES.map((act, idx) => {
          const cfg = ACTIVITY_ICONS[act.icon];
          const Icon = cfg.icon;
          const isLast = idx === ACTIVITIES.length - 1;
          return (
            <div
              key={act.id}
              className="flex items-start gap-3 px-4 py-4 cursor-pointer transition-colors"
              style={{ borderBottom: isLast ? "none" : "1px solid #F0F4F8" }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#F8FAFC"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: cfg.bg }}
              >
                <Icon size={16} style={{ color: cfg.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <p style={{ color: "#1A1A2E", fontSize: "0.8rem", fontWeight: 600, lineHeight: 1.4 }}>
                  {act.text}
                </p>
                <p style={{ color: "#8E94A7", fontSize: "0.72rem", marginTop: "2px" }}>{act.sub}</p>
              </div>
              <span style={{ color: "#C8CDD9", fontSize: "0.68rem", flexShrink: 0, marginTop: "2px" }}>
                {act.time}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ─── MOBILE QUICK ACTIONS ─────────────────────────────────────────────────────
function QuickActions({ onNav }: { onNav: (id: string) => void }) {
  const actions = [
    { label: "Book Appt", icon: Calendar, color: "#1B4F72", bg: "#EBF5FB", page: "appointments" },
    { label: "Add Pet", icon: PlusCircle, color: "#E67E22", bg: "#FEF3E8", page: "pets" },
    { label: "Find Vet", icon: Stethoscope, color: "#27AE60", bg: "#EAFAF1", page: "findvet" },
    { label: "Records", icon: FileText, color: "#8E94A7", bg: "#F0F4F8", page: "records" },
  ];
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-20 lg:hidden px-4 py-3"
      style={{
        backgroundColor: "#fff",
        borderTop: "1px solid #E8ECF1",
        boxShadow: "0 -4px 20px rgba(0,0,0,0.08)",
      }}
    >
      <div className="flex justify-around">
        {actions.map(({ label, icon: Icon, color, bg, page }) => (
          <button
            key={label}
            onClick={() => onNav(page)}
            className="flex flex-col items-center gap-1.5 px-3 py-1"
          >
            <div
              className="w-11 h-11 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: bg }}
            >
              <Icon size={20} style={{ color }} />
            </div>
            <span style={{ color: "#5A6178", fontSize: "0.65rem", fontWeight: 600 }}>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export function PortalPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");
  const [showNotif, setShowNotif] = useState(false);
  const [showUser, setShowUser] = useState(false);

  return (
    <div
      className="flex overflow-hidden"
      style={{
        height: "100dvh",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        backgroundColor: "#F2F5F9",
      }}
    >
      {/* Sidebar */}
      <div
        className="hidden lg:block flex-shrink-0"
        style={{ width: "240px" }}
      >
        <Sidebar
          active={activePage}
          setActive={setActivePage}
          open={false}
          onClose={() => {}}
        />
      </div>

      {/* Mobile sidebar (drawer) */}
      <div className="lg:hidden">
        {sidebarOpen && (
          <Sidebar
            active={activePage}
            setActive={setActivePage}
            open={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
        )}
      </div>

      {/* Main area */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <TopBar
          onMenuToggle={() => setSidebarOpen(true)}
          showNotif={showNotif}
          setShowNotif={setShowNotif}
          showUser={showUser}
          setShowUser={setShowUser}
        />

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto pb-24 lg:pb-6" style={{ scrollbarWidth: "thin" }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-7">

            {/* Welcome */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1
                  style={{
                    fontFamily: "'DM Serif Display', serif",
                    color: "#0D2F4F",
                    fontSize: "clamp(1.4rem, 3vw, 1.9rem)",
                    lineHeight: 1.2,
                  }}
                >
                  Good Morning, Ali! 👋
                </h1>
                <p style={{ color: "#8E94A7", fontSize: "0.9rem", marginTop: "4px" }}>
                  Here's an overview of your pets' health
                </p>
              </div>
              <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
                <span style={{ color: "#8E94A7", fontSize: "0.8rem" }}>Mon, Apr 27, 2026</span>
                <Activity size={15} style={{ color: "#27AE60" }} />
              </div>
            </div>

            {/* Stat cards */}
            <StatCards />

            {/* Two-column layout */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Left: Pets + Appointments */}
              <div className="xl:col-span-2 space-y-7">
                <MyPetsSection />
                <UpcomingAppointments />
              </div>

              {/* Right: Vaccinations + Activity */}
              <div className="space-y-6">
                <VaccinationSchedule />
                <RecentActivity />

                {/* Find a vet CTA */}
                <div
                  className="rounded-2xl p-5 text-center"
                  style={{
                    background: "linear-gradient(135deg, #0D2F4F, #1B4F72)",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div
                    className="absolute -top-6 -right-6 w-24 h-24 rounded-full"
                    style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
                  />
                  <Stethoscope size={28} color="rgba(255,255,255,0.6)" className="mx-auto mb-3" />
                  <p
                    style={{
                      fontFamily: "'DM Serif Display', serif",
                      color: "#fff",
                      fontSize: "1.1rem",
                      marginBottom: "6px",
                    }}
                  >
                    Need a Vet?
                  </p>
                  <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.78rem", marginBottom: "16px" }}>
                    Browse 10+ verified veterinarians in your city
                  </p>
                  <Link
                    to="/vetconnect/find-vet"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all"
                    style={{ backgroundColor: "#E67E22", color: "#fff" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#D35400"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#E67E22"; }}
                  >
                    Find a Vet <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Quick Actions */}
      <QuickActions onNav={setActivePage} />
    </div>
  );
}