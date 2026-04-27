import { useState } from "react";
import { Link, useParams } from "react-router";
import {
  ChevronLeft, Camera, Edit, Share2, Download, Printer,
  Calendar, Clock, MapPin, CheckCircle, AlertCircle,
  ChevronDown, ChevronUp, FileText, CreditCard, Syringe,
  Stethoscope, PlusCircle, Scale, Image, ArrowRight,
  BookOpen, RotateCcw, XCircle, Activity,
} from "lucide-react";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";

// ─── ASSETS ───────────────────────────────────────────────────────────────────
const IMG_MAX = "https://images.unsplash.com/photo-1727216018870-d1a65036a90e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkZW4lMjByZXRyaWV2ZXIlMjBkb2clMjBoYXBweSUyMG91dGRvb3JzfGVufDF8fHx8MTc3NzI3MTk0OHww&ixlib=rb-4.1.0&q=80&w=400";
const IMG_VET1 = "https://images.unsplash.com/photo-1756699279298-c89cdef354ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwdmV0ZXJpbmFyaWFuJTIwZG9jdG9yJTIwcHJvZmVzc2lvbmFsJTIwcG9ydHJhaXQlMjBzbWlsaW5nJTIwd2hpdGUlMjBjb2F0fGVufDF8fHx8MTc3NzI3MDUxMXww&ixlib=rb-4.1.0&q=80&w=80";

// ─── DATA ─────────────────────────────────────────────────────────────────────
const PET = {
  id: "1", name: "Max", species: "Dog", breed: "Golden Retriever",
  gender: "Male", age: "3 years", dob: "March 15, 2023",
  weight: "28 kg", color: "Golden", microchip: "#TAG-00234",
  owner: "Ali Hassan", status: "healthy",
  allergies: "None known",
  notes: "Friendly, no food aggression. Loves outdoor walks. Anxious around loud noises.",
  img: IMG_MAX,
};

const VISITS = [
  {
    id: "1", date: "Apr 15, 2026", fullDate: "April 15, 2026",
    vet: "Dr. Ahmed Khan", vetImg: IMG_VET1, clinic: "PetCare Veterinary Hospital",
    reason: "Annual Checkup & Wellness Exam",
    diagnosis: "Healthy — all vitals within normal range. Mild tartar buildup noted.",
    treatments: ["Full physical examination", "Blood panel ordered", "Dental hygiene advised", "Weight monitoring recommended"],
    notes: "Max is in excellent condition. Recommend starting dental chews.",
    status: "completed", cost: 1500, weight: "28 kg",
  },
  {
    id: "2", date: "Mar 10, 2026", fullDate: "March 10, 2026",
    vet: "Dr. Ahmed Khan", vetImg: IMG_VET1, clinic: "PetCare Veterinary Hospital",
    reason: "Ear Infection",
    diagnosis: "Bacterial otitis externa (right ear). Mild redness and discharge observed.",
    treatments: ["Ear culture swab", "Clotrimazole ear drops prescribed", "Ear cleaning procedure"],
    notes: "Follow-up in 2 weeks. Avoid water in ears. Medication for 7 days.",
    status: "completed", cost: 2200, weight: "27.5 kg",
  },
  {
    id: "3", date: "Feb 5, 2026", fullDate: "February 5, 2026",
    vet: "Dr. Sana Qureshi", vetImg: "", clinic: "Paws & Claws Clinic",
    reason: "Emergency — Limping (right front leg)",
    diagnosis: "Mild muscle strain. No fracture detected on X-ray. Rest advised.",
    treatments: ["X-ray (right forelimb)", "Meloxicam 5mg prescribed", "Rest and restricted movement"],
    notes: "Limit exercise for 2 weeks. Gradual return to normal activity.",
    status: "completed", cost: 5500, weight: "27 kg",
  },
  {
    id: "4", date: "Jan 12, 2026", fullDate: "January 12, 2026",
    vet: "Dr. Ahmed Khan", vetImg: IMG_VET1, clinic: "PetCare Veterinary Hospital",
    reason: "Dental Cleaning & Scaling",
    diagnosis: "Moderate tartar buildup on upper molars. Procedure successful.",
    treatments: ["Full dental scaling", "Polishing", "Fluoride application", "Post-care instructions"],
    notes: "Brush teeth 3x/week. Use enzymatic toothpaste. Next dental in 12 months.",
    status: "completed", cost: 3000, weight: "26 kg",
  },
  {
    id: "5", date: "May 20, 2026", fullDate: "May 20, 2026",
    vet: "Dr. Ahmed Khan", vetImg: IMG_VET1, clinic: "PetCare Veterinary Hospital",
    reason: "Rabies Booster Vaccination",
    diagnosis: "", treatments: ["Rabies booster injection"],
    notes: "Scheduled follow-up for annual booster.",
    status: "scheduled", cost: 800, weight: "",
  },
];

const VACCINATIONS = [
  {
    id: "1", name: "Rabies", dateGiven: "May 1, 2026", nextDue: "May 1, 2027",
    by: "Dr. Ahmed Khan", status: "current", batch: "RB-2026-441", method: "IM",
  },
  {
    id: "2", name: "DHPP (4-in-1)", dateGiven: "Apr 15, 2026", nextDue: "Apr 15, 2027",
    by: "Dr. Ahmed Khan", status: "current", batch: "DH-2026-122", method: "SC",
  },
  {
    id: "3", name: "Bordetella", dateGiven: "Jan 10, 2026", nextDue: "Jul 10, 2026",
    by: "Dr. Fatima Raza", status: "due_soon", batch: "BD-2026-089", method: "IN",
  },
  {
    id: "4", name: "Leptospirosis", dateGiven: "Nov 20, 2025", nextDue: "Nov 20, 2026",
    by: "Dr. Ahmed Khan", status: "current", batch: "LP-2025-503", method: "SC",
  },
  {
    id: "5", name: "Canine Influenza", dateGiven: "Sep 5, 2025", nextDue: "Mar 5, 2026",
    by: "Dr. Ahmed Khan", status: "overdue", batch: "CI-2025-270", method: "IM",
  },
];

const TREATMENTS = [
  {
    id: "1", date: "Mar 10, 2026", type: "Medication", isActive: true,
    description: "Ear infection treatment",
    medication: "Clotrimazole Ear Drops 1%", dosage: "3 drops, twice daily",
    duration: "7 days", vet: "Dr. Ahmed Khan", cost: 850,
  },
  {
    id: "2", date: "Feb 5, 2026", type: "Medication", isActive: false,
    description: "Anti-inflammatory for muscle strain",
    medication: "Meloxicam 5mg", dosage: "1 tablet once daily with food",
    duration: "5 days", vet: "Dr. Sana Qureshi", cost: 420,
  },
  {
    id: "3", date: "Jan 12, 2026", type: "Procedure", isActive: false,
    description: "Full dental cleaning and scaling under sedation",
    medication: "Isoflurane (anesthesia)", dosage: "Administered intraoperatively",
    duration: "One-time", vet: "Dr. Ahmed Khan", cost: 3000,
  },
  {
    id: "4", date: "Nov 20, 2025", type: "Supplement", isActive: true,
    description: "Joint support and coat health",
    medication: "Omega-3 Fish Oil + Glucosamine", dosage: "1 capsule daily with meals",
    duration: "Ongoing", vet: "Dr. Ahmed Khan", cost: 1200,
  },
];

const FOLLOWUPS = [
  {
    id: "1", date: "May 20, 2026", dayName: "Wednesday",
    reason: "Rabies Booster — Annual vaccination",
    vet: "Dr. Ahmed Khan", clinic: "PetCare Veterinary Hospital",
    status: "pending",
  },
  {
    id: "2", date: "Apr 25, 2026", dayName: "Saturday",
    reason: "Weight check and diet review",
    vet: "Dr. Ahmed Khan", clinic: "PetCare Veterinary Hospital",
    status: "completed",
  },
  {
    id: "3", date: "Mar 25, 2026", dayName: "Wednesday",
    reason: "Ear infection re-check",
    vet: "Dr. Ahmed Khan", clinic: "PetCare Veterinary Hospital",
    status: "completed",
  },
  {
    id: "4", date: "Feb 20, 2026", dayName: "Friday",
    reason: "Limb re-evaluation post muscle strain",
    vet: "Dr. Sana Qureshi", clinic: "Paws & Claws Clinic",
    status: "missed",
  },
];

const INVOICES = [
  {
    id: "INV-2026-004", date: "Apr 15, 2026",
    services: ["General Checkup", "Blood Work Panel"], amount: 3500, status: "paid",
  },
  {
    id: "INV-2026-003", date: "Mar 10, 2026",
    services: ["Ear Consultation", "Clotrimazole Drops"], amount: 2200, status: "paid",
  },
  {
    id: "INV-2026-002", date: "Feb 5, 2026",
    services: ["Emergency Visit", "X-Ray", "Meloxicam"], amount: 5500, status: "paid",
  },
  {
    id: "INV-2026-001", date: "Jan 12, 2026",
    services: ["Dental Cleaning", "Anesthesia", "Polish & Fluoride"], amount: 3000, status: "unpaid",
  },
];

const WEIGHT_POINTS = [
  { label: "Nov", val: 24 }, { label: "Dec", val: 25 }, { label: "Jan", val: 26 },
  { label: "Feb", val: 27 }, { label: "Mar", val: 27.5 }, { label: "Apr", val: 28 },
];

const TABS = [
  { id: "visits", label: "Visit History", Icon: Stethoscope },
  { id: "vaccinations", label: "Vaccinations", Icon: Syringe },
  { id: "treatments", label: "Treatments", Icon: Activity },
  { id: "followups", label: "Follow-ups", Icon: RotateCcw },
  { id: "invoices", label: "Invoices", Icon: CreditCard },
];

const VAC_STATUS: Record<string, { label: string; bg: string; color: string; icon: string }> = {
  current: { label: "Current", bg: "#EAFAF1", color: "#27AE60", icon: "✅" },
  due_soon: { label: "Due Soon", bg: "#FEF3E8", color: "#E67E22", icon: "⚠️" },
  overdue: { label: "Overdue", bg: "#FDEDEC", color: "#E74C3C", icon: "🔴" },
};

const FOLLOWUP_STATUS: Record<string, { label: string; bg: string; color: string; Icon: React.ElementType }> = {
  pending: { label: "Pending", bg: "#FEF3E8", color: "#E67E22", Icon: Clock },
  completed: { label: "Completed", bg: "#EAFAF1", color: "#27AE60", Icon: CheckCircle },
  missed: { label: "Missed", bg: "#FDEDEC", color: "#E74C3C", Icon: XCircle },
};

const TREATMENT_TYPE: Record<string, { bg: string; color: string }> = {
  Medication: { bg: "#EBF5FB", color: "#1B4F72" },
  Procedure: { bg: "#F5EEF8", color: "#8E44AD" },
  Supplement: { bg: "#EAFAF1", color: "#27AE60" },
};

// ─── MINI WEIGHT CHART ────────────────────────────────────────────────────────
function MiniWeightChart() {
  const W = 200, H = 56;
  const pl = 6, pr = 6, pt = 6, pb = 6;
  const minV = 22, maxV = 30;
  const toX = (i: number) => pl + (i / (WEIGHT_POINTS.length - 1)) * (W - pl - pr);
  const toY = (v: number) => pt + ((maxV - v) / (maxV - minV)) * (H - pt - pb);
  const pts = WEIGHT_POINTS.map((d, i) => ({ x: toX(i), y: toY(d.val), ...d }));
  const linePath = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  const areaPath = `${linePath} L${pts[pts.length - 1].x.toFixed(1)},${(H - pb).toFixed(1)} L${pts[0].x.toFixed(1)},${(H - pb).toFixed(1)} Z`;

  return (
    <div>
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ overflow: "visible" }}>
        <defs>
          <linearGradient id="wgrd" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#27AE60" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#27AE60" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <path d={areaPath} fill="url(#wgrd)" />
        <path d={linePath} fill="none" stroke="#27AE60" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {pts.map((p) => (
          <circle key={p.label} cx={p.x} cy={p.y} r="3" fill="#27AE60" />
        ))}
      </svg>
      <div className="flex justify-between mt-1">
        {WEIGHT_POINTS.map((p) => (
          <span key={p.label} style={{ color: "#C8CDD9", fontSize: "0.6rem" }}>{p.label}</span>
        ))}
      </div>
    </div>
  );
}

// ─── PET PROFILE HEADER ───────────────────────────────────────────────────────
function PetProfileHeader() {
  const [imgHover, setImgHover] = useState(false);
  return (
    <div
      className="rounded-3xl overflow-hidden"
      style={{ backgroundColor: "#fff", border: "1px solid #E8ECF1" }}
    >
      {/* Banner gradient */}
      <div className="h-28 relative" style={{ background: "linear-gradient(135deg, #0D2F4F 0%, #1B4F72 50%, #2E86C1 100%)" }}>
        {/* Decorative circles */}
        <div className="absolute -top-8 -right-8 w-36 h-36 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.06)" }} />
        <div className="absolute -bottom-10 right-16 w-24 h-24 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.04)" }} />
        {/* Paw print watermark */}
        <span className="absolute top-4 left-1/2 -translate-x-1/2" style={{ fontSize: "5rem", opacity: 0.04, lineHeight: 1 }}>🐾</span>
      </div>

      <div className="px-5 sm:px-8 pb-6">
        {/* Avatar + actions row */}
        <div className="flex items-end justify-between -mt-12 mb-4">
          {/* Pet avatar */}
          <div
            className="relative cursor-pointer flex-shrink-0"
            onMouseEnter={() => setImgHover(true)}
            onMouseLeave={() => setImgHover(false)}
          >
            <div
              className="w-24 h-24 rounded-full overflow-hidden"
              style={{ border: "4px solid #fff", boxShadow: "0 4px 20px rgba(27,79,114,0.2)" }}
            >
              <ImageWithFallback src={IMG_MAX} alt="Max" className="w-full h-full object-cover" />
            </div>
            <div
              className="absolute inset-0 rounded-full flex items-center justify-center transition-all duration-200"
              style={{
                backgroundColor: imgHover ? "rgba(27,79,114,0.55)" : "transparent",
                border: imgHover ? "4px solid #1B4F72" : "4px solid transparent",
              }}
            >
              {imgHover && <Camera size={20} color="#fff" />}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 mb-1">
            <button
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all"
              style={{ border: "1.5px solid #E8ECF1", color: "#5A6178" }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#F0F4F8"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
            >
              <Share2 size={14} />
              <span className="hidden sm:inline">Share Records</span>
            </button>
            <button
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium text-white transition-all"
              style={{ backgroundColor: "#1B4F72" }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#154060"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#1B4F72"; }}
            >
              <Edit size={14} />
              Edit Pet
            </button>
          </div>
        </div>

        {/* Pet name + details */}
        <div>
          <div className="flex flex-wrap items-center gap-3 mb-1.5">
            <h1 style={{ fontFamily: "'DM Serif Display', serif", color: "#0D2F4F", fontSize: "clamp(1.6rem, 4vw, 2.2rem)", lineHeight: 1 }}>
              {PET.name}
            </h1>
            {/* Status badge */}
            <span
              className="flex items-center gap-1.5 px-3 py-1 rounded-full text-sm"
              style={{ backgroundColor: "#EAFAF1", color: "#27AE60", fontWeight: 700, border: "1px solid #A9DFBF" }}
            >
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "#27AE60" }} />
              Healthy
            </span>
          </div>

          {/* Details row */}
          <p style={{ color: "#5A6178", fontSize: "0.9rem" }}>
            {PET.breed} · {PET.gender} · {PET.age} · {PET.weight}
          </p>

          {/* Microchip + Owner row */}
          <div className="flex flex-wrap items-center gap-4 mt-2.5">
            <div className="flex items-center gap-1.5">
              <span style={{ fontSize: "0.75rem", color: "#8E94A7" }}>Microchip/Tag</span>
              <span
                className="px-2 py-0.5 rounded-lg text-xs font-mono"
                style={{ backgroundColor: "#F0F4F8", color: "#1B4F72", fontWeight: 700 }}
              >
                {PET.microchip}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span style={{ fontSize: "0.75rem", color: "#8E94A7" }}>Owner</span>
              <span style={{ color: "#1A1A2E", fontSize: "0.8rem", fontWeight: 600 }}>{PET.owner}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── PET INFO CARD ────────────────────────────────────────────────────────────
function PetInfoCard() {
  const fields = [
    { label: "Species", value: PET.species, icon: "🐾" },
    { label: "Breed", value: PET.breed, icon: "🏷" },
    { label: "Gender", value: PET.gender, icon: "⚧" },
    { label: "Date of Birth", value: PET.dob, icon: "🎂" },
    { label: "Weight", value: PET.weight, icon: "⚖️" },
    { label: "Color / Coat", value: PET.color, icon: "🎨" },
    { label: "Allergies", value: PET.allergies, icon: "🚫" },
    { label: "Special Notes", value: PET.notes, icon: "📝", wide: true },
  ];

  return (
    <div
      className="rounded-2xl p-5 sm:p-6"
      style={{ backgroundColor: "#fff", border: "1px solid #E8ECF1" }}
    >
      <p style={{ fontFamily: "'DM Serif Display', serif", color: "#0D2F4F", fontSize: "1.1rem" }} className="mb-4">
        Pet Information
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {fields.map((f) => (
          <div
            key={f.label}
            className={`p-3 rounded-xl ${f.wide ? "sm:col-span-2 xl:col-span-4" : ""}`}
            style={{ backgroundColor: "#F8FAFC", border: "1px solid #F0F4F8" }}
          >
            <div className="flex items-center gap-1.5 mb-1">
              <span style={{ fontSize: "0.85rem" }}>{f.icon}</span>
              <span style={{ color: "#8E94A7", fontSize: "0.7rem", fontWeight: 600 }}>{f.label.toUpperCase()}</span>
            </div>
            <p style={{ color: "#1A1A2E", fontWeight: 600, fontSize: "0.875rem", lineHeight: 1.5 }}>
              {f.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── VISIT HISTORY TAB ────────────────────────────────────────────────────────
function VisitHistory() {
  const [expanded, setExpanded] = useState<Set<string>>(new Set(["1"]));

  const toggle = (id: string) => {
    const next = new Set(expanded);
    if (next.has(id)) next.delete(id); else next.add(id);
    setExpanded(next);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <p style={{ fontFamily: "'DM Serif Display', serif", color: "#0D2F4F", fontSize: "1.1rem" }}>
          Visit History ({VISITS.length})
        </p>
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all text-white"
          style={{ backgroundColor: "#1B4F72" }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#154060"; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#1B4F72"; }}
        >
          <Download size={14} />
          Download Full History (PDF)
        </button>
      </div>

      <div className="relative">
        {/* Vertical timeline line */}
        <div
          className="absolute top-4 left-[22px] bottom-0 w-0.5"
          style={{ backgroundColor: "#E8ECF1", zIndex: 0 }}
        />

        <div className="space-y-4">
          {VISITS.map((visit) => {
            const isExpanded = expanded.has(visit.id);
            const isScheduled = visit.status === "scheduled";
            return (
              <div key={visit.id} className="relative flex gap-4">
                {/* Timeline dot */}
                <div className="flex-shrink-0 relative z-10 mt-4">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: isScheduled ? "#EBF5FB" : "#EAFAF1",
                      border: `2px solid ${isScheduled ? "#1B4F72" : "#27AE60"}`,
                      boxShadow: `0 0 0 4px ${isScheduled ? "rgba(27,79,114,0.08)" : "rgba(39,174,96,0.08)"}`,
                    }}
                  >
                    {isScheduled
                      ? <Calendar size={17} style={{ color: "#1B4F72" }} />
                      : <CheckCircle size={17} style={{ color: "#27AE60" }} />
                    }
                  </div>
                </div>

                {/* Card */}
                <div
                  className="flex-1 rounded-2xl overflow-hidden transition-all duration-200"
                  style={{
                    backgroundColor: "#fff",
                    border: `1.5px solid ${isExpanded ? "#1B4F72" : "#E8ECF1"}`,
                    boxShadow: isExpanded ? "0 4px 20px rgba(27,79,114,0.08)" : "none",
                  }}
                >
                  {/* Header row */}
                  <button
                    className="w-full flex items-start gap-3 p-4 text-left"
                    onClick={() => toggle(visit.id)}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span
                          className="text-xs px-2 py-0.5 rounded-full font-medium"
                          style={{
                            backgroundColor: isScheduled ? "#EBF5FB" : "#EAFAF1",
                            color: isScheduled ? "#1B4F72" : "#27AE60",
                          }}
                        >
                          {isScheduled ? "📅 Scheduled" : "✓ Completed"}
                        </span>
                        <span style={{ color: "#8E94A7", fontSize: "0.78rem" }}>{visit.date}</span>
                        {visit.weight && (
                          <span style={{ color: "#8E94A7", fontSize: "0.78rem" }}>· {visit.weight}</span>
                        )}
                      </div>
                      <p style={{ color: "#1A1A2E", fontWeight: 700, fontSize: "0.9rem" }}>
                        {visit.reason}
                      </p>
                      <div className="flex flex-wrap items-center gap-3 mt-1">
                        <div className="flex items-center gap-1.5">
                          <div className="w-5 h-5 rounded-full overflow-hidden">
                            {visit.vetImg ? (
                              <ImageWithFallback src={visit.vetImg} alt={visit.vet} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-white" style={{ backgroundColor: "#1B4F72", fontSize: "0.55rem", fontWeight: 700 }}>
                                {visit.vet.split(" ").slice(1).map(w => w[0]).join("")}
                              </div>
                            )}
                          </div>
                          <span style={{ color: "#5A6178", fontSize: "0.78rem" }}>{visit.vet}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin size={11} style={{ color: "#8E94A7" }} />
                          <span style={{ color: "#8E94A7", fontSize: "0.75rem" }}>{visit.clinic}</span>
                        </div>
                      </div>
                    </div>
                    <div style={{ color: "#8E94A7", marginTop: "2px", flexShrink: 0 }}>
                      {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </div>
                  </button>

                  {/* Expanded details */}
                  {isExpanded && (
                    <div className="px-4 pb-5" style={{ borderTop: "1px solid #F0F4F8" }}>
                      <div className="pt-4 grid sm:grid-cols-2 gap-4">
                        {visit.diagnosis && (
                          <div className="sm:col-span-2">
                            <p style={{ color: "#8E94A7", fontSize: "0.72rem", fontWeight: 700 }} className="mb-1.5">
                              DIAGNOSIS / ASSESSMENT
                            </p>
                            <div
                              className="p-3 rounded-xl text-sm"
                              style={{ backgroundColor: "#F8FAFC", color: "#1A1A2E", lineHeight: 1.6 }}
                            >
                              {visit.diagnosis}
                            </div>
                          </div>
                        )}

                        <div>
                          <p style={{ color: "#8E94A7", fontSize: "0.72rem", fontWeight: 700 }} className="mb-2">
                            TREATMENTS GIVEN
                          </p>
                          <ul className="space-y-1.5">
                            {visit.treatments.map((t, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm">
                                <span style={{ color: "#27AE60", marginTop: "1px" }}>•</span>
                                <span style={{ color: "#5A6178" }}>{t}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {visit.notes && (
                          <div>
                            <p style={{ color: "#8E94A7", fontSize: "0.72rem", fontWeight: 700 }} className="mb-2">
                              DOCTOR'S NOTES
                            </p>
                            <p style={{ color: "#5A6178", fontSize: "0.85rem", lineHeight: 1.6 }}>
                              {visit.notes}
                            </p>
                          </div>
                        )}
                      </div>

                      {!isScheduled && (
                        <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-4" style={{ borderTop: "1px dashed #E8ECF1" }}>
                          <span style={{ color: "#1B4F72", fontWeight: 700, fontSize: "0.875rem" }}>
                            PKR {visit.cost.toLocaleString()}
                          </span>
                          <div className="flex gap-2">
                            <button
                              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all"
                              style={{ backgroundColor: "#F0F4F8", color: "#5A6178" }}
                            >
                              <FileText size={12} />
                              View Invoice
                            </button>
                            <button
                              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-white transition-all"
                              style={{ backgroundColor: "#1B4F72" }}
                            >
                              <Download size={12} />
                              Download
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── VACCINATIONS TAB ─────────────────────────────────────────────────────────
function VaccinationsTab() {
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <p style={{ fontFamily: "'DM Serif Display', serif", color: "#0D2F4F", fontSize: "1.1rem" }}>
          Vaccination Passport
        </p>
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all"
          style={{ backgroundColor: "#EBF5FB", color: "#1B4F72" }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#1B4F72"; e.currentTarget.style.color = "#fff"; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#EBF5FB"; e.currentTarget.style.color = "#1B4F72"; }}
        >
          <Printer size={14} />
          Print Vaccination Card
        </button>
      </div>

      {/* Passport-style card */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          border: "1px solid #E8ECF1",
          boxShadow: "0 2px 20px rgba(27,79,114,0.06)",
        }}
      >
        {/* Passport header */}
        <div
          className="px-6 py-4 flex items-center gap-4"
          style={{ background: "linear-gradient(135deg, #0D2F4F, #1B4F72)" }}
        >
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
          >
            <span style={{ fontSize: "1.5rem" }}>🛂</span>
          </div>
          <div>
            <p style={{ color: "#fff", fontFamily: "'DM Serif Display', serif", fontSize: "1.1rem" }}>
              Official Vaccination Record
            </p>
            <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.78rem" }}>
              Max · Golden Retriever · {PET.microchip}
            </p>
          </div>
          <div className="ml-auto text-right">
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.65rem" }}>LAST UPDATED</p>
            <p style={{ color: "#fff", fontSize: "0.8rem", fontWeight: 600 }}>May 1, 2026</p>
          </div>
        </div>

        {/* Table header */}
        <div
          className="grid grid-cols-12 gap-2 px-5 py-2.5 text-xs font-semibold"
          style={{ backgroundColor: "#F8FAFC", borderBottom: "1px solid #F0F4F8", color: "#8E94A7" }}
        >
          <div className="col-span-3">Vaccine</div>
          <div className="col-span-2">Date Given</div>
          <div className="col-span-2">Next Due</div>
          <div className="col-span-2 hidden sm:block">Administered By</div>
          <div className="col-span-1 hidden sm:block">Method</div>
          <div className="col-span-2">Status</div>
        </div>

        {/* Table rows */}
        <div className="divide-y" style={{ borderColor: "#F0F4F8" }}>
          {VACCINATIONS.map((vac) => {
            const s = VAC_STATUS[vac.status];
            return (
              <div
                key={vac.id}
                className="grid grid-cols-12 gap-2 items-center px-5 py-3.5 transition-colors"
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#F8FAFC"; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
              >
                <div className="col-span-3">
                  <p style={{ color: "#1A1A2E", fontWeight: 700, fontSize: "0.85rem" }}>{vac.name}</p>
                  <p style={{ color: "#8E94A7", fontSize: "0.68rem" }}>#{vac.batch}</p>
                </div>
                <div className="col-span-2">
                  <p style={{ color: "#5A6178", fontSize: "0.8rem" }}>{vac.dateGiven}</p>
                </div>
                <div className="col-span-2">
                  <p style={{ color: "#5A6178", fontSize: "0.8rem" }}>{vac.nextDue}</p>
                </div>
                <div className="col-span-2 hidden sm:block">
                  <p style={{ color: "#5A6178", fontSize: "0.8rem" }}>{vac.by}</p>
                </div>
                <div className="col-span-1 hidden sm:block">
                  <span
                    className="text-xs px-2 py-0.5 rounded-lg font-mono font-bold"
                    style={{ backgroundColor: "#F0F4F8", color: "#5A6178" }}
                  >
                    {vac.method}
                  </span>
                </div>
                <div className="col-span-2">
                  <span
                    className="flex items-center gap-1 px-2 py-1 rounded-full text-xs w-fit"
                    style={{ backgroundColor: s.bg, color: s.color, fontWeight: 700 }}
                  >
                    <span style={{ fontSize: "0.75rem" }}>{s.icon.replace(/\uFE0F/g, "")}</span>
                    {s.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Overdue warning */}
        <div
          className="mx-5 mb-5 mt-4 p-4 rounded-xl flex items-start gap-3"
          style={{ backgroundColor: "#FEF3E8", border: "1px solid #F9E79F" }}
        >
          <AlertCircle size={16} style={{ color: "#E67E22", flexShrink: 0, marginTop: "1px" }} />
          <div>
            <p style={{ color: "#1A1A2E", fontWeight: 700, fontSize: "0.8rem" }}>
              Bordetella & Canine Influenza need attention
            </p>
            <p style={{ color: "#5A6178", fontSize: "0.75rem", marginTop: "2px" }}>
              2 vaccinations are overdue or due soon. Book an appointment to keep Max protected.
            </p>
          </div>
          <Link
            to="/vetconnect/book/8"
            className="ml-auto flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-medium text-white transition-all"
            style={{ backgroundColor: "#E67E22" }}
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── TREATMENTS TAB ───────────────────────────────────────────────────────────
function TreatmentsTab() {
  const active = TREATMENTS.filter((t) => t.isActive);
  const past = TREATMENTS.filter((t) => !t.isActive);

  return (
    <div className="space-y-6">
      <p style={{ fontFamily: "'DM Serif Display', serif", color: "#0D2F4F", fontSize: "1.1rem" }}>
        Treatments & Medications
      </p>

      {/* Current medications */}
      {active.length > 0 && (
        <div>
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-xl mb-3"
            style={{ backgroundColor: "#EBF5FB" }}
          >
            <Activity size={15} style={{ color: "#1B4F72" }} />
            <span style={{ color: "#1B4F72", fontWeight: 700, fontSize: "0.8rem" }}>
              CURRENTLY ACTIVE ({active.length})
            </span>
          </div>
          <div className="space-y-3">
            {active.map((t) => (
              <TreatmentCard key={t.id} treatment={t} highlighted />
            ))}
          </div>
        </div>
      )}

      {/* Past treatments */}
      <div>
        <p style={{ color: "#8E94A7", fontSize: "0.75rem", fontWeight: 700 }} className="mb-3">
          PAST TREATMENTS
        </p>
        <div className="space-y-3">
          {past.map((t) => (
            <TreatmentCard key={t.id} treatment={t} highlighted={false} />
          ))}
        </div>
      </div>
    </div>
  );
}

function TreatmentCard({ treatment: t, highlighted }: { treatment: typeof TREATMENTS[0]; highlighted: boolean }) {
  const typeStyle = TREATMENT_TYPE[t.type] ?? { bg: "#F0F4F8", color: "#5A6178" };
  return (
    <div
      className="rounded-2xl p-4 sm:p-5"
      style={{
        backgroundColor: "#fff",
        border: `1.5px solid ${highlighted ? "#AED6F1" : "#E8ECF1"}`,
        boxShadow: highlighted ? "0 2px 16px rgba(27,79,114,0.08)" : "none",
      }}
    >
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <span
            className="text-xs px-2.5 py-1 rounded-full font-medium"
            style={{ backgroundColor: typeStyle.bg, color: typeStyle.color }}
          >
            {t.type}
          </span>
          {highlighted && (
            <span
              className="text-xs px-2 py-0.5 rounded-full animate-pulse"
              style={{ backgroundColor: "#EAFAF1", color: "#27AE60", fontWeight: 600 }}
            >
              Active
            </span>
          )}
        </div>
        <span style={{ color: "#8E94A7", fontSize: "0.78rem" }}>{t.date}</span>
      </div>

      <p style={{ color: "#1A1A2E", fontWeight: 700, fontSize: "0.9rem" }} className="mt-2 mb-3">
        {t.description}
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Medication", value: t.medication },
          { label: "Dosage", value: t.dosage },
          { label: "Duration", value: t.duration },
          { label: "Prescribed by", value: t.vet },
        ].map((item) => (
          <div key={item.label} className="p-2.5 rounded-xl" style={{ backgroundColor: "#F8FAFC" }}>
            <p style={{ color: "#8E94A7", fontSize: "0.65rem", fontWeight: 600 }}>{item.label.toUpperCase()}</p>
            <p style={{ color: "#1A1A2E", fontSize: "0.8rem", fontWeight: 600, marginTop: "2px" }}>{item.value}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mt-3 pt-3" style={{ borderTop: "1px solid #F0F4F8" }}>
        <span style={{ color: "#8E94A7", fontSize: "0.78rem" }}>Cost: PKR {t.cost.toLocaleString()}</span>
      </div>
    </div>
  );
}

// ─── FOLLOW-UPS TAB ───────────────────────────────────────────────────────────
function FollowUpsTab() {
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <p style={{ fontFamily: "'DM Serif Display', serif", color: "#0D2F4F", fontSize: "1.1rem" }}>
          Follow-up Appointments
        </p>
        <Link
          to="/vetconnect/book/8"
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium text-white transition-all"
          style={{ backgroundColor: "#E67E22" }}
        >
          <PlusCircle size={14} />
          Schedule Follow-up
        </Link>
      </div>

      <div className="space-y-3">
        {FOLLOWUPS.map((fu) => {
          const s = FOLLOWUP_STATUS[fu.status];
          const Icon = s.Icon;
          return (
            <div
              key={fu.id}
              className="rounded-2xl p-4 sm:p-5 flex items-start gap-4"
              style={{ backgroundColor: "#fff", border: "1.5px solid #E8ECF1" }}
            >
              {/* Calendar mini */}
              <div
                className="rounded-2xl overflow-hidden flex-shrink-0 text-center"
                style={{ width: "54px", backgroundColor: "#1B4F72" }}
              >
                <div
                  className="py-1"
                  style={{ backgroundColor: fu.status === "missed" ? "#E74C3C" : fu.status === "pending" ? "#E67E22" : "#27AE60" }}
                >
                  <span style={{ color: "#fff", fontSize: "0.6rem", fontWeight: 700 }}>
                    {fu.date.split(", ")[0].split(" ")[0].toUpperCase()}
                  </span>
                </div>
                <div className="py-2">
                  <p style={{ fontFamily: "'DM Serif Display', serif", color: "#fff", fontSize: "1.25rem", lineHeight: 1 }}>
                    {fu.date.split(", ")[0].split(" ")[1]}
                  </p>
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p style={{ color: "#1A1A2E", fontWeight: 700, fontSize: "0.9rem" }}>{fu.reason}</p>
                    <div className="flex flex-wrap items-center gap-3 mt-1">
                      <span style={{ color: "#5A6178", fontSize: "0.78rem" }}>{fu.vet}</span>
                      <div className="flex items-center gap-1">
                        <MapPin size={11} style={{ color: "#8E94A7" }} />
                        <span style={{ color: "#8E94A7", fontSize: "0.75rem" }}>{fu.clinic}</span>
                      </div>
                    </div>
                    <span style={{ color: "#8E94A7", fontSize: "0.72rem" }}>{fu.dayName} · {fu.date}</span>
                  </div>
                  <span
                    className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs flex-shrink-0"
                    style={{ backgroundColor: s.bg, color: s.color, fontWeight: 700 }}
                  >
                    <Icon size={11} />
                    {s.label}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── INVOICES TAB ─────────────────────────────────────────────────────────────
function InvoicesTab() {
  const total = INVOICES.reduce((s, i) => s + i.amount, 0);
  const unpaid = INVOICES.filter((i) => i.status === "unpaid").reduce((s, i) => s + i.amount, 0);

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <p style={{ fontFamily: "'DM Serif Display', serif", color: "#0D2F4F", fontSize: "1.1rem" }}>
          Invoices & Billing
        </p>
      </div>

      {/* Summary row */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { label: "Total Spent", val: `PKR ${total.toLocaleString()}`, color: "#1B4F72", bg: "#EBF5FB" },
          { label: "Paid", val: `PKR ${(total - unpaid).toLocaleString()}`, color: "#27AE60", bg: "#EAFAF1" },
          { label: "Outstanding", val: `PKR ${unpaid.toLocaleString()}`, color: unpaid > 0 ? "#E74C3C" : "#27AE60", bg: unpaid > 0 ? "#FDEDEC" : "#EAFAF1" },
        ].map((s) => (
          <div key={s.label} className="p-3 rounded-2xl text-center" style={{ backgroundColor: s.bg }}>
            <p style={{ color: "#8E94A7", fontSize: "0.68rem", fontWeight: 600 }}>{s.label.toUpperCase()}</p>
            <p style={{ color: s.color, fontWeight: 700, fontSize: "1rem", marginTop: "3px" }}>{s.val}</p>
          </div>
        ))}
      </div>

      {/* Invoice list */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{ border: "1px solid #E8ECF1" }}
      >
        {/* Table header */}
        <div
          className="grid grid-cols-12 gap-2 px-5 py-3 text-xs font-semibold"
          style={{ backgroundColor: "#F8FAFC", borderBottom: "1px solid #F0F4F8", color: "#8E94A7" }}
        >
          <div className="col-span-3">Invoice #</div>
          <div className="col-span-2">Date</div>
          <div className="col-span-4">Services</div>
          <div className="col-span-2">Amount</div>
          <div className="col-span-1">Action</div>
        </div>

        <div className="divide-y" style={{ borderColor: "#F0F4F8", backgroundColor: "#fff" }}>
          {INVOICES.map((inv) => (
            <div
              key={inv.id}
              className="grid grid-cols-12 gap-2 items-center px-5 py-4 transition-colors"
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#F8FAFC"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
            >
              <div className="col-span-3">
                <p style={{ color: "#1B4F72", fontWeight: 700, fontSize: "0.82rem" }}>{inv.id}</p>
                <span
                  className="text-xs px-1.5 py-0.5 rounded-full"
                  style={{
                    backgroundColor: inv.status === "paid" ? "#EAFAF1" : "#FDEDEC",
                    color: inv.status === "paid" ? "#27AE60" : "#E74C3C",
                    fontWeight: 700,
                  }}
                >
                  {inv.status === "paid" ? "Paid" : "Unpaid"}
                </span>
              </div>
              <div className="col-span-2">
                <p style={{ color: "#5A6178", fontSize: "0.8rem" }}>{inv.date}</p>
              </div>
              <div className="col-span-4">
                <div className="flex flex-wrap gap-1">
                  {inv.services.map((s) => (
                    <span
                      key={s}
                      className="text-xs px-1.5 py-0.5 rounded-md"
                      style={{ backgroundColor: "#F0F4F8", color: "#5A6178" }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div className="col-span-2">
                <p style={{ color: "#1A1A2E", fontWeight: 700, fontSize: "0.875rem" }}>
                  PKR {inv.amount.toLocaleString()}
                </p>
              </div>
              <div className="col-span-1">
                <button
                  className="w-8 h-8 rounded-xl flex items-center justify-center transition-all"
                  style={{ backgroundColor: "#F0F4F8", color: "#1B4F72" }}
                  title="Download PDF"
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#1B4F72"; e.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#F0F4F8"; e.currentTarget.style.color = "#1B4F72"; }}
                >
                  <Download size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── RIGHT SIDEBAR ────────────────────────────────────────────────────────────
function RightSidebar() {
  return (
    <div className="space-y-5">
      {/* Quick Actions */}
      <div
        className="rounded-2xl p-5"
        style={{ backgroundColor: "#fff", border: "1px solid #E8ECF1" }}
      >
        <p style={{ fontFamily: "'DM Serif Display', serif", color: "#0D2F4F", fontSize: "1rem" }} className="mb-4">
          Quick Actions
        </p>
        <div className="space-y-2">
          {[
            {
              icon: Calendar, label: "Book Appointment", sub: "Schedule with a vet",
              color: "#E67E22", bg: "#FEF3E8", to: "/vetconnect/book/8",
            },
            {
              icon: Scale, label: "Record Weight", sub: "Log today's weight",
              color: "#1B4F72", bg: "#EBF5FB", to: null,
            },
            {
              icon: Image, label: "Upload Photo", sub: "Add to pet gallery",
              color: "#27AE60", bg: "#EAFAF1", to: null,
            },
          ].map(({ icon: Icon, label, sub, color, bg, to }) => {
            const content = (
              <>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: bg }}
                >
                  <Icon size={18} style={{ color }} />
                </div>
                <div>
                  <p style={{ color: "#1A1A2E", fontWeight: 600, fontSize: "0.85rem" }}>{label}</p>
                  <p style={{ color: "#8E94A7", fontSize: "0.72rem" }}>{sub}</p>
                </div>
                <ArrowRight size={14} style={{ color: "#C8CDD9", marginLeft: "auto" }} />
              </>
            );

            return to ? (
              <Link
                key={label}
                to={to}
                className="flex items-center gap-3 p-3 rounded-xl transition-all"
                style={{ border: "1px solid #F0F4F8" }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#F8FAFC"; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
              >
                {content}
              </Link>
            ) : (
              <button
                key={label}
                className="w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all"
                style={{ border: "1px solid #F0F4F8" }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#F8FAFC"; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
              >
                {content}
              </button>
            );
          })}
        </div>
      </div>

      {/* Health Summary */}
      <div
        className="rounded-2xl p-5"
        style={{ backgroundColor: "#fff", border: "1px solid #E8ECF1" }}
      >
        <p style={{ fontFamily: "'DM Serif Display', serif", color: "#0D2F4F", fontSize: "1rem" }} className="mb-4">
          Health Summary
        </p>

        <div className="space-y-3 mb-5">
          {[
            { label: "Last Visit", value: "April 15, 2026", icon: Clock, color: "#1B4F72" },
            { label: "Next Appointment", value: "May 20, 2026", icon: Calendar, color: "#E67E22" },
            { label: "Vaccinations", value: "3/5 up to date", icon: CheckCircle, color: "#27AE60" },
            { label: "Active Medications", value: "2 ongoing", icon: Activity, color: "#8E44AD" },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${color}15` }}>
                <Icon size={15} style={{ color }} />
              </div>
              <div>
                <p style={{ color: "#8E94A7", fontSize: "0.68rem" }}>{label}</p>
                <p style={{ color: "#1A1A2E", fontWeight: 600, fontSize: "0.82rem" }}>{value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Weight trend chart */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <p style={{ color: "#8E94A7", fontSize: "0.72rem", fontWeight: 700 }}>
              WEIGHT TREND (6 MONTHS)
            </p>
            <span style={{ color: "#27AE60", fontSize: "0.72rem", fontWeight: 700 }}>
              +4 kg ↑
            </span>
          </div>
          <MiniWeightChart />
          <div className="flex items-center justify-between mt-2">
            <span style={{ color: "#8E94A7", fontSize: "0.72rem" }}>24 kg</span>
            <span style={{ color: "#1A1A2E", fontWeight: 700, fontSize: "0.85rem" }}>28 kg</span>
          </div>
        </div>
      </div>

      {/* Vet contact card */}
      <div
        className="rounded-2xl p-4"
        style={{ backgroundColor: "#fff", border: "1px solid #E8ECF1" }}
      >
        <p style={{ color: "#8E94A7", fontSize: "0.7rem", fontWeight: 700 }} className="mb-3">
          PRIMARY VET
        </p>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
            <ImageWithFallback src={IMG_VET1} alt="Dr. Ahmed Khan" className="w-full h-full object-cover" />
          </div>
          <div>
            <p style={{ color: "#1A1A2E", fontWeight: 700, fontSize: "0.875rem" }}>Dr. Ahmed Khan</p>
            <p style={{ color: "#8E94A7", fontSize: "0.72rem" }}>Small Animal Surgery</p>
          </div>
        </div>
        <Link
          to="/vetconnect/vet/8"
          className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all"
          style={{ backgroundColor: "#EBF5FB", color: "#1B4F72" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#1B4F72"; (e.currentTarget as HTMLAnchorElement).style.color = "#fff"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#EBF5FB"; (e.currentTarget as HTMLAnchorElement).style.color = "#1B4F72"; }}
        >
          <BookOpen size={14} />
          View Profile
        </Link>
      </div>
    </div>
  );
}

// ─── TAB NAVIGATION ───────────────────────────────────────────────────────────
function TabNav({
  active,
  setActive,
}: {
  active: string;
  setActive: (t: string) => void;
}) {
  return (
    <div
      className="flex overflow-x-auto rounded-2xl p-1.5 gap-1"
      style={{ backgroundColor: "#F0F4F8", scrollbarWidth: "none" }}
    >
      {TABS.map(({ id, label, Icon }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            onClick={() => setActive(id)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm whitespace-nowrap flex-shrink-0 transition-all duration-150"
            style={{
              backgroundColor: isActive ? "#fff" : "transparent",
              color: isActive ? "#1B4F72" : "#8E94A7",
              fontWeight: isActive ? 700 : 500,
              boxShadow: isActive ? "0 1px 8px rgba(27,79,114,0.12)" : "none",
            }}
          >
            <Icon size={14} />
            {label}
          </button>
        );
      })}
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export function PetHealthRecord() {
  const { petId } = useParams();
  const [activeTab, setActiveTab] = useState("visits");

  const TAB_CONTENT: Record<string, React.ReactNode> = {
    visits: <VisitHistory />,
    vaccinations: <VaccinationsTab />,
    treatments: <TreatmentsTab />,
    followups: <FollowUpsTab />,
    invoices: <InvoicesTab />,
  };

  return (
    <div
      style={{
        minHeight: "100dvh",
        backgroundColor: "#F2F5F9",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      {/* Breadcrumb top bar */}
      <div
        className="sticky top-0 z-20 px-4 sm:px-6 py-3"
        style={{
          backgroundColor: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(8px)",
          borderBottom: "1px solid #E8ECF1",
          boxShadow: "0 1px 8px rgba(0,0,0,0.04)",
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <Link
            to="/vetconnect/portal"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm transition-all"
            style={{ backgroundColor: "#F0F4F8", color: "#5A6178" }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#E8ECF1"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#F0F4F8"; }}
          >
            <ChevronLeft size={15} />
            Portal
          </Link>
          <span style={{ color: "#C8CDD9" }}>/</span>
          <span style={{ color: "#8E94A7", fontSize: "0.85rem" }}>My Pets</span>
          <span style={{ color: "#C8CDD9" }}>/</span>
          <span style={{ color: "#1B4F72", fontWeight: 700, fontSize: "0.85rem" }}>Max</span>

          <div className="ml-auto flex items-center gap-2">
            <span
              className="hidden sm:flex items-center gap-1 text-xs px-2.5 py-1 rounded-full"
              style={{ backgroundColor: "#EAFAF1", color: "#27AE60", fontWeight: 700 }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "#27AE60" }} />
              Healthy
            </span>
            <span style={{ color: "#8E94A7", fontSize: "0.78rem" }}>Pet ID: #{petId ?? "1"}</span>
          </div>
        </div>
      </div>

      {/* Main layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Main column */}
          <div className="xl:col-span-3 space-y-5">
            {/* Profile header */}
            <PetProfileHeader />

            {/* Pet info card */}
            <PetInfoCard />

            {/* Tab content card */}
            <div
              className="rounded-2xl p-5 sm:p-6"
              style={{ backgroundColor: "#fff", border: "1px solid #E8ECF1" }}
            >
              <TabNav active={activeTab} setActive={setActiveTab} />
              <div className="mt-6">
                {TAB_CONTENT[activeTab]}
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="xl:col-span-1">
            {/* Sticky on desktop */}
            <div className="xl:sticky xl:top-20">
              <RightSidebar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
