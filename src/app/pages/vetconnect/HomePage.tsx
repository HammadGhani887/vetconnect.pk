import { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  Search, MapPin, Star, ArrowRight, Shield, Clock, Bell,
  HeartPulse, Syringe, Calendar, BookOpen, Smartphone, CheckCircle,
  ChevronRight, Users, Building2, PawPrint, Zap, Globe,
  AlarmClock, FileText, Stethoscope, CalendarCheck, Phone, Mail,
} from "lucide-react";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";

// ─── HERO ──────────────────────────────────────────────────────────────────
function HeroSection() {
  const navigate = useNavigate();

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0D2F4F 0%, #1B4F72 55%, #2874A6 100%)" }}
    >
      {/* decorative blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-10" style={{ backgroundColor: "#E67E22" }} />
        <div className="absolute bottom-0 -left-20 w-72 h-72 rounded-full opacity-10" style={{ backgroundColor: "#2E86C1" }} />
        <div className="absolute top-1/2 left-1/3 w-48 h-48 rounded-full opacity-5" style={{ backgroundColor: "#F39C12" }} />
        <div className="absolute top-1/4 right-1/4 w-32 h-32 rounded-full opacity-5" style={{ backgroundColor: "#27AE60" }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-16 lg:py-24">

          {/* LEFT: text */}
          <div>
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 text-white text-xs px-4 py-2 rounded-full mb-6"
              style={{ backgroundColor: "rgba(39,174,96,0.25)", border: "1px solid rgba(39,174,96,0.45)" }}
            >
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span style={{ color: "#6FEEA6" }}>Pakistan's #1 Veterinary Platform</span>
            </div>

            {/* Headline */}
            <h1
              className="text-white mb-5"
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: "clamp(2.2rem, 5vw, 3.6rem)",
                lineHeight: 1.12,
                fontWeight: 400,
              }}
            >
              Give Your Pets the{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #E67E22, #F39C12)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Best Care
              </span>{" "}
              They Deserve
            </h1>

            <p className="text-base mb-8 max-w-lg" style={{ color: "#AED6F1", lineHeight: 1.75 }}>
              Connect with verified veterinarians, track your pet's health records, manage vaccinations,
              and book appointments — all in one place.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3 mb-10">
              <Link
                to="/vetconnect/find-vet"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-full text-white font-medium transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                style={{ backgroundColor: "#E67E22", fontSize: "1rem" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#D35400")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#E67E22")}
              >
                <Search size={18} />
                Find a Vet Near You
              </Link>
              <Link
                to="/vetconnect/for-clinics"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-medium transition-all hover:-translate-y-0.5"
                style={{
                  color: "#fff",
                  border: "2px solid rgba(255,255,255,0.35)",
                  fontSize: "1rem",
                  backgroundColor: "rgba(255,255,255,0.07)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "rgba(255,255,255,0.15)";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.6)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "rgba(255,255,255,0.07)";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.35)";
                }}
              >
                <Stethoscope size={18} />
                I'm a Veterinarian
              </Link>
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap gap-8">
              {[
                { value: "500+", label: "Verified Vets" },
                { value: "12K+", label: "Pets Registered" },
                { value: "50+", label: "Cities" },
              ].map(({ value, label }) => (
                <div key={label} className="flex flex-col">
                  <span
                    style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.75rem", color: "#fff", lineHeight: 1 }}
                  >
                    {value}
                  </span>
                  <span className="text-xs mt-1" style={{ color: "#8E94A7" }}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: dashboard card + floating notifications */}
          <div className="relative hidden lg:flex items-center justify-center">

            {/* Notification: vaccination */}
            <div
              className="absolute -top-4 -left-6 z-20 rounded-2xl px-4 py-3 shadow-2xl flex items-center gap-3"
              style={{ backgroundColor: "#fff", minWidth: "220px" }}
            >
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#EAFAF1" }}>
                <Syringe size={18} style={{ color: "#27AE60" }} />
              </div>
              <div>
                <p className="text-xs" style={{ color: "#1A1A2E", fontWeight: 700 }}>Vaccination Done ✅</p>
                <p className="text-xs" style={{ color: "#5A6178" }}>Rabies — Max</p>
              </div>
            </div>

            {/* Notification: appointment */}
            <div
              className="absolute -bottom-4 -right-4 z-20 rounded-2xl px-4 py-3 shadow-2xl flex items-center gap-3"
              style={{ backgroundColor: "#fff", minWidth: "210px" }}
            >
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#FEF9F0" }}>
                <Calendar size={18} style={{ color: "#E67E22" }} />
              </div>
              <div>
                <p className="text-xs" style={{ color: "#1A1A2E", fontWeight: 700 }}>Appointment 📅</p>
                <p className="text-xs" style={{ color: "#5A6178" }}>Tomorrow 10:00 AM</p>
              </div>
            </div>

            {/* Main dashboard card */}
            <div
              className="relative z-10 rounded-3xl overflow-hidden shadow-2xl w-full max-w-sm"
              style={{ border: "2px solid rgba(255,255,255,0.15)" }}
            >
              {/* Card header */}
              <div
                className="px-5 py-4"
                style={{ background: "linear-gradient(135deg, #1B4F72, #2874A6)" }}
              >
                <div className="flex items-center justify-between mb-1">
                  <p className="text-white text-xs" style={{ opacity: 0.75 }}>Good morning, Bilal 👋</p>
                  <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                    <Bell size={13} className="text-white" />
                  </div>
                </div>
                <p className="text-white" style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.2rem" }}>
                  My Pets Dashboard
                </p>
              </div>

              {/* Pet list */}
              <div className="bg-white px-5 py-4 space-y-3">
                {[
                  { emoji: "🐕", name: "Max", breed: "Golden Retriever", badge: "Healthy", badgeColor: "#27AE60", badgeBg: "#EAFAF1" },
                  { emoji: "🐈", name: "Whiskers", breed: "Persian Cat", badge: "Check-up Due", badgeColor: "#E67E22", badgeBg: "#FEF9F0" },
                  { emoji: "🦜", name: "Tweety", breed: "Parakeet", badge: "Healthy", badgeColor: "#27AE60", badgeBg: "#EAFAF1" },
                ].map((pet) => (
                  <div
                    key={pet.name}
                    className="flex items-center justify-between rounded-xl px-3 py-2.5"
                    style={{ backgroundColor: "#F8FAFC", border: "1px solid #E8ECF1" }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                        style={{ backgroundColor: "#EBF5FB" }}
                      >
                        {pet.emoji}
                      </div>
                      <div>
                        <p className="text-sm" style={{ color: "#1A1A2E", fontWeight: 600 }}>{pet.name}</p>
                        <p className="text-xs" style={{ color: "#8E94A7" }}>{pet.breed}</p>
                      </div>
                    </div>
                    <span
                      className="text-xs px-2.5 py-1 rounded-full"
                      style={{ color: pet.badgeColor, backgroundColor: pet.badgeBg, fontWeight: 600 }}
                    >
                      {pet.badge}
                    </span>
                  </div>
                ))}

                {/* Quick actions */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    className="py-2.5 rounded-xl text-xs text-white font-medium"
                    style={{ backgroundColor: "#1B4F72" }}
                  >
                    + Book Appointment
                  </button>
                  <button
                    className="py-2.5 rounded-xl text-xs font-medium"
                    style={{ backgroundColor: "#FEF9F0", color: "#E67E22" }}
                  >
                    View Records
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-12">
          <path d="M0,60 C360,0 1080,0 1440,60 L1440,60 L0,60 Z" fill="#FAFBFD" />
        </svg>
      </div>
    </section>
  );
}

// ─── HOW IT WORKS ──────────────────────────────────────────────────────────
function HowItWorksSection() {
  const steps = [
    {
      num: "1",
      title: "Create Account",
      desc: "Sign up free in seconds and add your pets with their details and health history.",
      icon: Users,
      color: "#1B4F72",
      gradFrom: "#1B4F72",
      gradTo: "#2874A6",
    },
    {
      num: "2",
      title: "Find a Vet",
      desc: "Browse by location, specialty, and ratings. Filter by city, pet type, or service needed.",
      icon: Search,
      color: "#E67E22",
      gradFrom: "#E67E22",
      gradTo: "#F39C12",
    },
    {
      num: "3",
      title: "Book Appointment",
      desc: "Select your preferred time slot and get instant confirmation — no phone calls needed.",
      icon: CalendarCheck,
      color: "#27AE60",
      gradFrom: "#27AE60",
      gradTo: "#2ECC71",
    },
    {
      num: "4",
      title: "Track Health",
      desc: "Access records, vaccination schedules, and follow-up reminders all in one place.",
      icon: HeartPulse,
      color: "#8E44AD",
      gradFrom: "#8E44AD",
      gradTo: "#A569BD",
    },
  ];

  return (
    <section className="py-16 lg:py-24" style={{ backgroundColor: "#FAFBFD" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <p
            className="text-xs tracking-widest uppercase mb-3"
            style={{ color: "#E67E22", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700 }}
          >
            How It Works
          </p>
          <h2
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
              color: "#1A1A2E",
              lineHeight: 1.2,
            }}
          >
            Pet Care Made Simple
          </h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connector line (desktop only) */}
          <div
            className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5 z-0"
            style={{ backgroundColor: "#E8ECF1" }}
          />

          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={step.num} className="relative z-10 flex flex-col items-center text-center">
                {/* Number circle */}
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mb-5 shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${step.gradFrom}, ${step.gradTo})`,
                    border: "4px solid #FAFBFD",
                  }}
                >
                  <span className="text-white text-2xl" style={{ fontFamily: "'DM Serif Display', serif" }}>
                    {step.num}
                  </span>
                </div>

                {/* Arrow (between steps on desktop) */}
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 -right-3 z-20">
                    <ChevronRight size={20} style={{ color: "#CBD5E0" }} />
                  </div>
                )}

                <div
                  className="rounded-2xl p-6 w-full border transition-all hover:-translate-y-1 hover:shadow-md"
                  style={{ backgroundColor: "#fff", borderColor: "#E8ECF1" }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3"
                    style={{ backgroundColor: `${step.color}15` }}
                  >
                    <Icon size={20} style={{ color: step.color }} />
                  </div>
                  <h3 className="mb-2" style={{ color: "#1A1A2E", fontWeight: 700 }}>
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#5A6178" }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── FEATURES ──────────────────────────────────────────────────────────────
const features = [
  {
    emoji: "🔍",
    title: "Vet Discovery",
    desc: "Search and discover verified veterinarians near you by specialty, city, language, and ratings.",
    color: "#2E86C1",
    bg: "#EBF5FB",
    accent: "#2E86C1",
  },
  {
    emoji: "📋",
    title: "Health Records",
    desc: "Keep all your pet's medical history, diagnoses, prescriptions, and lab results in one secure place.",
    color: "#27AE60",
    bg: "#EAFAF1",
    accent: "#27AE60",
  },
  {
    emoji: "💉",
    title: "Vaccination Tracker",
    desc: "Never miss a shot. Track vaccine schedules with automated reminders sent right to your phone.",
    color: "#E67E22",
    bg: "#FEF9F0",
    accent: "#E67E22",
  },
  {
    emoji: "📅",
    title: "Easy Booking",
    desc: "Book, reschedule, or cancel appointments instantly — no waiting on hold, no phone tag.",
    color: "#8E44AD",
    bg: "#F5EEF8",
    accent: "#8E44AD",
  },
  {
    emoji: "📱",
    title: "Works Everywhere",
    desc: "Access VetConnect from any device, browser, or location. Your pet's data is always with you.",
    color: "#1B4F72",
    bg: "#EBF5FB",
    accent: "#1B4F72",
  },
  {
    emoji: "🔔",
    title: "Smart Reminders",
    desc: "AI-powered reminders for follow-ups, medications, checkups, and grooming appointments.",
    color: "#E74C3C",
    bg: "#FDEDEC",
    accent: "#E74C3C",
  },
];

function FeaturesSection() {
  return (
    <section className="py-16 lg:py-24" style={{ backgroundColor: "#fff" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <p
            className="text-xs tracking-widest uppercase mb-3"
            style={{ color: "#E67E22", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700 }}
          >
            Features
          </p>
          <h2
            className="mb-3"
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
              color: "#1A1A2E",
              lineHeight: 1.2,
            }}
          >
            Everything Your Pet Needs
          </h2>
          <p className="max-w-xl mx-auto" style={{ color: "#5A6178", lineHeight: 1.7 }}>
            A complete platform built for Pakistani pet owners and veterinarians — from first-time pet parents to expert clinics.
          </p>
        </div>

        {/* 3x2 Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              className="group relative rounded-2xl p-6 border overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
              style={{ backgroundColor: "#fff", borderColor: "#E8ECF1" }}
            >
              {/* Top accent line on hover */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl"
                style={{ backgroundColor: f.accent }}
              />

              {/* Icon box */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: f.bg }}
              >
                <span style={{ fontSize: "1.6rem" }}>{f.emoji}</span>
              </div>

              <h3 className="mb-2" style={{ color: "#1A1A2E", fontWeight: 700 }}>
                {f.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#5A6178" }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── VET DIRECTORY PREVIEW ─────────────────────────────────────────────────
const sampleVets = [
  {
    name: "Dr. Ahmed Khan",
    specialty: "Surgery & Orthopedics",
    location: "Lahore, Punjab",
    rating: 4.9,
    reviews: 287,
    gradFrom: "#1B4F72",
    gradTo: "#2874A6",
    emoji: "👨‍⚕️",
    img: "https://images.unsplash.com/photo-1622253694238-3b22139576c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwdmV0ZXJpbmFyaWFuJTIwZG9jdG9yJTIwc21pbGluZyUyMHBvcnRyYWl0fGVufDF8fHx8MTc3NzI2OTQzNHww&ixlib=rb-4.1.0&q=80&w=400",
    available: true,
  },
  {
    name: "Dr. Fatima Raza",
    specialty: "Livestock & Farm Animals",
    location: "Faisalabad, Punjab",
    rating: 4.8,
    reviews: 194,
    gradFrom: "#27AE60",
    gradTo: "#1E8449",
    emoji: "👩‍⚕️",
    img: "https://images.unsplash.com/photo-1721907043535-318e2f352757?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjB2ZXRlcmluYXJpYW4lMjB3b21hbiUyMGRvY3RvciUyMGNsaW5pY3xlbnwxfHx8fDE3NzcyNjk0MzV8MA&ixlib=rb-4.1.0&q=80&w=400",
    available: true,
  },
  {
    name: "Dr. Usman Ali",
    specialty: "Avian & Exotic Pets",
    location: "Islamabad, ICT",
    rating: 4.7,
    reviews: 152,
    gradFrom: "#8E44AD",
    gradTo: "#6C3483",
    emoji: "👨‍⚕️",
    img: "https://images.unsplash.com/photo-1629224840465-cb61148cc7f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZXRlcmluYXJpYW4lMjBtYW4lMjBleGFtaW5pbmclMjBiaXJkJTIwYXZpYW58ZW58MXx8fHwxNzc3MjY5NDM1fDA&ixlib=rb-4.1.0&q=80&w=400",
    available: false,
  },
];

function VetDirectorySection() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/vetconnect/find-vet?q=${encodeURIComponent(search)}`);
  };

  return (
    <section className="py-16 lg:py-24" style={{ backgroundColor: "#FAFBFD" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <p
            className="text-xs tracking-widest uppercase mb-3"
            style={{ color: "#E67E22", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700 }}
          >
            Find a Vet
          </p>
          <h2
            className="mb-3"
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
              color: "#1A1A2E",
              lineHeight: 1.2,
            }}
          >
            Top Veterinarians Near You
          </h2>
          <p className="max-w-xl mx-auto mb-8" style={{ color: "#5A6178", lineHeight: 1.7 }}>
            Browse profiles of verified and rated veterinarians across Pakistan.
          </p>

          {/* Search bar */}
          <div className="max-w-2xl mx-auto">
            <div
              className="flex items-center gap-3 rounded-full px-5 py-3 shadow-md"
              style={{ backgroundColor: "#fff", border: "2px solid #E8ECF1" }}
            >
              <Search size={18} style={{ color: "#8E94A7", flexShrink: 0 }} />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Search by name, specialty, or city..."
                className="flex-1 outline-none text-sm bg-transparent"
                style={{ color: "#1A1A2E" }}
              />
              <button
                onClick={handleSearch}
                className="px-6 py-2 rounded-full text-white text-sm font-medium transition-all flex-shrink-0"
                style={{ backgroundColor: "#1B4F72" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "#0D2F4F")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "#1B4F72")}
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Vet Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleVets.map((vet) => (
            <div
              key={vet.name}
              className="rounded-2xl overflow-hidden border transition-all hover:-translate-y-1 hover:shadow-xl"
              style={{ backgroundColor: "#fff", borderColor: "#E8ECF1" }}
            >
              {/* Gradient banner */}
              <div
                className="h-28 relative flex items-end px-5 pb-0"
                style={{ background: `linear-gradient(135deg, ${vet.gradFrom}, ${vet.gradTo})` }}
              >
                {/* Availability badge */}
                <div
                  className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs text-white"
                  style={{ backgroundColor: vet.available ? "rgba(39,174,96,0.85)" : "rgba(231,76,60,0.85)" }}
                >
                  <span className={`w-1.5 h-1.5 rounded-full bg-white ${vet.available ? "animate-pulse" : ""}`} />
                  {vet.available ? "Available" : "Busy"}
                </div>
                {/* Avatar */}
                <div
                  className="w-20 h-20 rounded-2xl overflow-hidden border-4 border-white shadow-lg translate-y-10 flex-shrink-0"
                  style={{ backgroundColor: "#EBF5FB" }}
                >
                  <ImageWithFallback src={vet.img} alt={vet.name} className="w-full h-full object-cover" />
                </div>
              </div>

              {/* Info */}
              <div className="px-5 pt-12 pb-5">
                <h3 className="mb-0.5" style={{ color: "#1A1A2E", fontWeight: 700 }}>
                  {vet.name}
                </h3>
                <span
                  className="inline-block text-xs px-3 py-1 rounded-full mb-2"
                  style={{ backgroundColor: "#EBF5FB", color: "#2E86C1", fontWeight: 600 }}
                >
                  {vet.specialty}
                </span>
                <div className="flex items-center gap-1.5 mb-3">
                  <MapPin size={13} style={{ color: "#8E94A7", flexShrink: 0 }} />
                  <span className="text-xs" style={{ color: "#8E94A7" }}>{vet.location}</span>
                </div>
                <div className="flex items-center gap-1.5 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={13}
                      fill={i < Math.floor(vet.rating) ? "#F39C12" : "none"}
                      style={{ color: "#F39C12" }}
                    />
                  ))}
                  <span className="text-xs" style={{ color: "#1A1A2E", fontWeight: 700 }}>{vet.rating}</span>
                  <span className="text-xs" style={{ color: "#8E94A7" }}>({vet.reviews} reviews)</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to="/vetconnect/find-vet"
                    className="py-2.5 rounded-xl text-xs text-center font-medium border transition-all"
                    style={{ color: "#1B4F72", borderColor: "#1B4F72" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#1B4F72";
                      (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent";
                      (e.currentTarget as HTMLAnchorElement).style.color = "#1B4F72";
                    }}
                  >
                    View Profile
                  </Link>
                  <Link
                    to="/vetconnect/find-vet"
                    className="py-2.5 rounded-xl text-xs text-center font-medium text-white transition-all"
                    style={{ backgroundColor: "#E67E22" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#D35400")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#E67E22")}
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/vetconnect/find-vet"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-white text-sm font-medium transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
            style={{ backgroundColor: "#1B4F72" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#0D2F4F")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#1B4F72")}
          >
            Browse All Veterinarians
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── PET OWNER PORTAL ──────────────────────────────────────────────────────
function PetPortalSection() {
  const portalFeatures = [
    { text: "Complete Health Records — all diagnoses, prescriptions, and lab reports" },
    { text: "Vaccination Calendar — automated reminders so you never miss a shot" },
    { text: "Appointment Booking — pick a slot and confirm in under 60 seconds" },
    { text: "Follow-up Reminders — smart notifications for medication and checkups" },
  ];

  return (
    <section className="py-16 lg:py-24" style={{ backgroundColor: "#fff" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* Left: text */}
          <div>
            <h2
              className="mb-5"
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
                color: "#1A1A2E",
                lineHeight: 1.2,
              }}
            >
              Your Pet's Health, Always at Your Fingertips
            </h2>
            <p className="mb-8" style={{ color: "#5A6178", lineHeight: 1.75 }}>
              The VetConnect Pet Portal gives you everything you need to be a proactive, informed
              pet owner. From vaccination tracking to instant appointment booking — it's all here.
            </p>

            <div className="space-y-4 mb-8">
              {portalFeatures.map((f) => (
                <div key={f.text} className="flex gap-3">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: "#EAFAF1" }}
                  >
                    <CheckCircle size={14} style={{ color: "#27AE60" }} />
                  </div>
                  <p className="text-sm" style={{ color: "#5A6178", lineHeight: 1.65 }}>
                    {f.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/vetconnect/find-vet"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-white text-sm font-medium transition-all shadow-md hover:shadow-lg"
                style={{ backgroundColor: "#1B4F72" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#0D2F4F")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#1B4F72")}
              >
                Get Started Free
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Right: phone mockup */}
          <div className="flex items-center justify-center">
            <div className="relative">
              {/* Phone frame */}
              <div
                className="relative w-72 rounded-[3rem] overflow-hidden shadow-2xl"
                style={{
                  background: "#0D2F4F",
                  border: "8px solid #1A1A2E",
                  minHeight: "560px",
                }}
              >
                {/* Status bar */}
                <div className="flex items-center justify-between px-5 pt-4 pb-2">
                  <span className="text-white text-xs" style={{ opacity: 0.7 }}>9:41</span>
                  <div className="w-24 h-5 rounded-full bg-black" />
                  <div className="flex gap-1">
                    <div className="w-3 h-2 rounded-sm bg-white opacity-70" />
                    <div className="w-3 h-2 rounded-sm bg-white opacity-70" />
                  </div>
                </div>

                {/* App content */}
                <div className="px-4 pb-4">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-white text-xs opacity-70">Good morning 👋</p>
                      <p className="text-white text-sm" style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400 }}>
                        Pet Dashboard
                      </p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-orange-400 flex items-center justify-center">
                      <span className="text-white text-xs">B</span>
                    </div>
                  </div>

                  {/* Pet cards */}
                  <div className="space-y-2.5 mb-4">
                    {[
                      { emoji: "🐕", name: "Max", status: "Healthy", color: "#27AE60" },
                      { emoji: "🐈", name: "Whiskers", status: "Due Checkup", color: "#E67E22" },
                    ].map((pet) => (
                      <div
                        key={pet.name}
                        className="flex items-center justify-between rounded-2xl p-3"
                        style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-base">
                            {pet.emoji}
                          </div>
                          <span className="text-white text-xs" style={{ fontWeight: 600 }}>{pet.name}</span>
                        </div>
                        <span
                          className="text-xs px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: `${pet.color}30`, color: pet.color, fontWeight: 600 }}
                        >
                          {pet.status}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Vaccination reminder notification */}
                  <div
                    className="rounded-2xl p-3 mb-3"
                    style={{ backgroundColor: "rgba(230,126,34,0.2)", border: "1px solid rgba(230,126,34,0.4)" }}
                  >
                    <div className="flex items-start gap-2">
                      <Bell size={14} style={{ color: "#E67E22", flexShrink: 0 }} />
                      <div>
                        <p className="text-white text-xs" style={{ fontWeight: 600 }}>Vaccination Reminder</p>
                        <p className="text-xs mt-0.5" style={{ color: "#AED6F1" }}>Max's Rabies booster due in 3 days</p>
                      </div>
                    </div>
                  </div>

                  {/* Next appointment */}
                  <div
                    className="rounded-2xl p-3"
                    style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
                  >
                    <p className="text-white text-xs mb-2" style={{ fontWeight: 600 }}>Next Appointment</p>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-blue-500/30 flex items-center justify-center">
                        <Calendar size={13} style={{ color: "#AED6F1" }} />
                      </div>
                      <div>
                        <p className="text-white text-xs">Dr. Ahmed Khan</p>
                        <p className="text-xs" style={{ color: "#8E94A7" }}>Tomorrow, 10:00 AM</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom nav */}
                <div
                  className="px-4 py-3 flex items-center justify-around"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
                >
                  {["🏠", "🔍", "📅", "👤"].map((icon) => (
                    <button key={icon} className="text-base opacity-70 hover:opacity-100">
                      {icon}
                    </button>
                  ))}
                </div>
              </div>

              {/* Floating badge */}
              <div
                className="absolute -right-8 top-16 rounded-2xl p-3 shadow-xl"
                style={{ backgroundColor: "#fff", minWidth: "160px" }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Smartphone size={14} style={{ color: "#2E86C1" }} />
                  <span className="text-xs" style={{ color: "#1A1A2E", fontWeight: 700 }}>Mobile Ready</span>
                </div>
                <p className="text-xs" style={{ color: "#5A6178" }}>Works on any smartphone</p>
              </div>

              <div
                className="absolute -left-8 bottom-20 rounded-2xl p-3 shadow-xl"
                style={{ backgroundColor: "#fff", minWidth: "150px" }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Shield size={14} style={{ color: "#27AE60" }} />
                  <span className="text-xs" style={{ color: "#1A1A2E", fontWeight: 700 }}>100% Secure</span>
                </div>
                <p className="text-xs" style={{ color: "#5A6178" }}>Data encrypted & private</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── BLOG PREVIEW ──────────────────────────────────────────────────────────
const blogPosts = [
  {
    img: "https://images.unsplash.com/photo-1770836037275-38b44e4b101f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdXBweSUyMHZhY2NpbmF0aW9uJTIwZG9nJTIwaGVhbHRoJTIwY2xpbmljfGVufDF8fHx8MTc3NzI2OTQzMHww&ixlib=rb-4.1.0&q=80&w=800",
    category: "Health",
    categoryColor: "#27AE60",
    categoryBg: "#EAFAF1",
    title: "Essential Vaccinations for Puppies — A Complete Guide",
    desc: "Everything new puppy owners in Pakistan need to know about core vaccines, schedules, and where to get them done.",
    date: "April 20, 2026",
    readTime: "5 min read",
    emoji: "🐶",
  },
  {
    img: "https://images.unsplash.com/photo-1761360386654-7abee9c4b8c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzaWFuJTIwY2F0JTIwcG9ydHJhaXQlMjBmbHVmZnklMjBpbmRvb3J8ZW58MXx8fHwxNzc3MjY5NDMxfDA&ixlib=rb-4.1.0&q=80&w=800",
    category: "Nutrition",
    categoryColor: "#E67E22",
    categoryBg: "#FEF9F0",
    title: "Nutrition Guide for Persian Cats — What to Feed & Avoid",
    desc: "Persian cats have unique dietary needs. Learn what proteins, vitamins, and foods are best for their fluffy coat and health.",
    date: "April 15, 2026",
    readTime: "6 min read",
    emoji: "🐱",
  },
  {
    img: "https://images.unsplash.com/photo-1613698990148-bdf3fd3d34c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW1tZXIlMjBoZWF0JTIwZG9nJTIwb3V0ZG9vcnMlMjBwYW50aW5nfGVufDF8fHx8MTc3NzI2OTQzMXww&ixlib=rb-4.1.0&q=80&w=800",
    category: "Tips",
    categoryColor: "#2E86C1",
    categoryBg: "#EBF5FB",
    title: "Summer Heat Safety Tips for Pets in Pakistan",
    desc: "Pakistan's summers can be brutal. Keep your pets cool and safe with these expert-approved summer care tips.",
    date: "April 10, 2026",
    readTime: "4 min read",
    emoji: "☀️",
  },
];

function BlogSection() {
  return (
    <section className="py-16 lg:py-24" style={{ backgroundColor: "#FAFBFD" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
          <div>
            <p
              className="text-xs tracking-widest uppercase mb-3"
              style={{ color: "#E67E22", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700 }}
            >
              Pet Health Blog
            </p>
            <h2
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
                color: "#1A1A2E",
                lineHeight: 1.2,
              }}
            >
              Expert Tips for Pet Care
            </h2>
          </div>
          <Link
            to="/vetconnect/about"
            className="flex items-center gap-1.5 text-sm font-medium flex-shrink-0"
            style={{ color: "#2E86C1" }}
          >
            View All Articles <ChevronRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <article
              key={post.title}
              className="group rounded-2xl overflow-hidden border transition-all hover:-translate-y-1 hover:shadow-xl cursor-pointer"
              style={{ backgroundColor: "#fff", borderColor: "#E8ECF1" }}
            >
              {/* Thumbnail */}
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback
                  src={post.img}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Overlay */}
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)" }} />
                {/* Category */}
                <span
                  className="absolute top-3 left-3 text-xs px-3 py-1 rounded-full"
                  style={{ backgroundColor: post.categoryBg, color: post.categoryColor, fontWeight: 700 }}
                >
                  {post.category}
                </span>
                {/* Emoji */}
                <span className="absolute bottom-3 right-3 text-2xl">{post.emoji}</span>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3
                  className="mb-2 leading-snug group-hover:text-blue-700 transition-colors"
                  style={{ color: "#1A1A2E", fontWeight: 700 }}
                >
                  {post.title}
                </h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "#5A6178" }}>
                  {post.desc}
                </p>
                <div className="flex items-center gap-2 text-xs" style={{ color: "#8E94A7" }}>
                  <span>{post.date}</span>
                  <span>·</span>
                  <Clock size={11} />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA SECTION ───────────────────────────────────────────────────────────
function CTASection() {
  return (
    <section
      className="py-20 lg:py-28 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0D2F4F 0%, #1B4F72 50%, #2874A6 100%)" }}
    >
      {/* Decorative */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-10" style={{ backgroundColor: "#E67E22" }} />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full opacity-10" style={{ backgroundColor: "#2E86C1" }} />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
        <div
          className="inline-flex items-center gap-2 text-xs px-4 py-2 rounded-full mb-6"
          style={{ backgroundColor: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", color: "#AED6F1" }}
        >
          <PawPrint size={14} style={{ color: "#F39C12" }} />
          Join 12,000+ happy pet families
        </div>

        <h2
          className="text-white mb-4"
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "clamp(2rem, 5vw, 3.2rem)",
            lineHeight: 1.15,
          }}
        >
          Ready to Give Your Pet the Best Care?
        </h2>
        <p className="mb-10 text-base" style={{ color: "#AED6F1", lineHeight: 1.75 }}>
          Join thousands of pet owners and veterinarians on VetConnect — Pakistan's most trusted pet care platform.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/vetconnect/find-vet"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-medium transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            style={{ backgroundColor: "#fff", color: "#1B4F72" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#F0F4F8")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#fff")}
          >
            Get Started Free
            <ArrowRight size={18} />
          </Link>
          <Link
            to="/vetconnect/about"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-medium transition-all hover:-translate-y-0.5"
            style={{
              color: "#fff",
              border: "2px solid rgba(255,255,255,0.45)",
              backgroundColor: "rgba(255,255,255,0.08)",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "rgba(255,255,255,0.15)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "rgba(255,255,255,0.08)")}
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── PAGE ───────────────────────────────────────────────────────────────────
export function HomePage() {
  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />
      <VetDirectorySection />
      <PetPortalSection />
      <BlogSection />
      <CTASection />
    </div>
  );
}
