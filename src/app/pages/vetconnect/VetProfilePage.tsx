import { useState } from "react";
import { Link, useParams } from "react-router";
import {
  MapPin, Star, CheckCircle, Award, Clock, Phone, MessageCircle,
  ChevronLeft, ChevronRight, GraduationCap, Globe, Tag,
  Calendar, Send, Navigation, Camera, User,
} from "lucide-react";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";

// ─── PROFILE DATA ─────────────────────────────────────────────────────────────
const DR_AHMED_KHAN = {
  id: 8,
  name: "Dr. Ahmed Khan",
  credentials: "DVM",
  specialty: "Small Animal Surgery",
  clinic: "PetCare Veterinary Hospital",
  area: "Model Town",
  city: "Lahore",
  province: "Punjab",
  rating: 4.9,
  reviews: 128,
  experience: 12,
  patients: "2,500+",
  available: true,
  phone: "+92-42-3572-8800",
  whatsapp: "+92-300-1234567",
  languages: ["Urdu", "English", "Punjabi"],
  specializations: ["Surgery", "Orthopedics", "Emergency Care", "Dental"],
  avatar: "https://images.unsplash.com/photo-1756699279298-c89cdef354ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwdmV0ZXJpbmFyaWFuJTIwZG9jdG9yJTIwcHJvZmVzc2lvbmFsJTIwcG9ydHJhaXQlMjBzbWlsaW5nJTIwd2hpdGUlMjBjb2F0fGVufDF8fHx8MTc3NzI3MDUxMXww&ixlib=rb-4.1.0&q=80&w=400",
  bio: [
    "Dr. Ahmed Khan is a highly regarded veterinary surgeon with over 12 years of clinical experience at PetCare Veterinary Hospital in Model Town, Lahore. He completed his DVM from the University of Veterinary & Animal Sciences (UVAS) and later earned his postgraduate degree in Veterinary Surgery, specializing in small animal orthopedic and soft tissue procedures.",
    "Throughout his career, Dr. Khan has treated more than 2,500 patients ranging from companion animals to rare breeds, earning a reputation for his compassionate care and surgical precision. He has been a keynote speaker at several national veterinary conferences and remains an active member of the Pakistan Veterinary Medical Council (PVMC).",
    "Dr. Khan believes in a holistic approach to pet wellness — combining modern diagnostics with preventive medicine. He is fluent in Urdu, English, and Punjabi, ensuring clear communication with pet owners from all backgrounds across Punjab.",
  ],
  education: [
    { degree: "DVM", institution: "University of Veterinary & Animal Sciences, Lahore", year: "2012" },
    { degree: "MS Veterinary Surgery", institution: "UVAS, Lahore — Postgraduate Studies", year: "2015" },
    { degree: "Member, Pakistan Veterinary Medical Council", institution: "PVMC Registration No. 14872", year: "2013" },
  ],
  services: [
    { name: "General Checkup", duration: "30 min", fee: 1500 },
    { name: "Vaccination", duration: "15 min", fee: 800 },
    { name: "Surgery Consultation", duration: "45 min", fee: 3000 },
    { name: "Dental Cleaning", duration: "60 min", fee: 5000 },
    { name: "Emergency Visit", duration: "Varies", fee: 2500 },
    { name: "Orthopedic Assessment", duration: "45 min", fee: 2000 },
    { name: "Post-op Follow-up", duration: "20 min", fee: 700 },
  ],
  reviews_data: [
    {
      id: 1,
      name: "Mehwish Iqbal",
      avatar: "MI",
      rating: 5,
      date: "April 20, 2026",
      text: "Dr. Ahmed Khan is absolutely wonderful. My German Shepherd, Bruno, had a complex knee surgery and recovered completely within 6 weeks. The doctor's patience in explaining the procedure and aftercare was truly commendable.",
      pet: "Bruno — German Shepherd",
    },
    {
      id: 2,
      name: "Kamran Siddiqui",
      avatar: "KS",
      rating: 5,
      date: "April 14, 2026",
      text: "Took my Persian cat for dental cleaning. The procedure was smooth and professional. The clinic is spotless and the staff is very welcoming. Highly recommend Dr. Khan to any pet owner in Lahore!",
      pet: "Whiskers — Persian Cat",
    },
    {
      id: 3,
      name: "Rabia Tahir",
      avatar: "RT",
      rating: 4,
      date: "March 28, 2026",
      text: "Very knowledgeable vet. He correctly diagnosed my dog's condition which two other vets had missed. His fees are reasonable for the quality of service. Waiting time can be a bit long during peak hours.",
      pet: "Max — Labrador Retriever",
    },
    {
      id: 4,
      name: "Farrukh Malik",
      avatar: "FM",
      rating: 5,
      date: "March 15, 2026",
      text: "Emergency situation with my kitten — Dr. Khan was available late in the evening and handled everything with calm professionalism. I'm so grateful for his quick response and expertise. Truly a lifesaver!",
      pet: "Mochi — Domestic Shorthair",
    },
  ],
  ratingDistribution: { 5: 89, 4: 28, 3: 8, 2: 2, 1: 1 },
  photos: [
    "https://images.unsplash.com/photo-1705909772639-69d68969ab00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZXRlcmluYXJ5JTIwY2xpbmljJTIwcmVjZXB0aW9uJTIwaW50ZXJpb3IlMjBtb2Rlcm58ZW58MXx8fHwxNzc3MjcwNTEzfDA&ixlib=rb-4.1.0&q=80&w=600",
    "https://images.unsplash.com/photo-1770836037793-95bdbf190f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZXRlcmluYXJpYW4lMjBleGFtaW5pbmclMjBkb2clMjBzdGV0aG9zY29wZSUyMGNsaW5pY3xlbnwxfHx8fDE3NzcyNzA1MTR8MA&ixlib=rb-4.1.0&q=80&w=600",
    "https://images.unsplash.com/photo-1770836037326-d2df574278b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZXRlcmluYXJ5JTIwc3VyZ2VyeSUyMG9wZXJhdGluZyUyMHJvb20lMjBwcm9jZWR1cmV8ZW58MXx8fHwxNzc3MjcwNTE2fDA&ixlib=rb-4.1.0&q=80&w=600",
    "https://images.unsplash.com/photo-1560112284-4d9d20a6cdd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGNhdCUyMGRvZyUyMHBsYXlpbmclMjBwZXRzJTIwdG9nZXRoZXJ8ZW58MXx8fHwxNzc3MjcwNTE2fDA&ixlib=rb-4.1.0&q=80&w=600",
  ],
  hours: [
    { day: "Monday", open: "9:00 AM", close: "8:00 PM" },
    { day: "Tuesday", open: "9:00 AM", close: "8:00 PM" },
    { day: "Wednesday", open: "9:00 AM", close: "8:00 PM" },
    { day: "Thursday", open: "9:00 AM", close: "8:00 PM" },
    { day: "Friday", open: "9:00 AM", close: "8:00 PM" },
    { day: "Saturday", open: "9:00 AM", close: "8:00 PM" },
    { day: "Sunday", open: "10:00 AM", close: "2:00 PM" },
  ],
};

// ─── STAR RATING COMPONENT ────────────────────────────────────────────────────
function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={size}
          fill={s <= Math.round(rating) ? "#F39C12" : "none"}
          style={{ color: "#F39C12" }}
        />
      ))}
    </div>
  );
}

function InteractiveStar({ index, rating, onHover, onClick }: {
  index: number; rating: number; onHover: (r: number) => void; onClick: (r: number) => void;
}) {
  return (
    <Star
      size={22}
      fill={index <= rating ? "#F39C12" : "none"}
      style={{ color: "#F39C12", cursor: "pointer" }}
      onMouseEnter={() => onHover(index)}
      onClick={() => onClick(index)}
    />
  );
}

// ─── CALENDAR COMPONENT ───────────────────────────────────────────────────────
const AVAILABLE_DAYS_APRIL = new Set([28, 29, 30]);
const BOOKED_DAYS_APRIL = new Set([4, 11, 18, 25]);

function MiniCalendar({
  selectedDate,
  onSelect,
}: {
  selectedDate: number | null;
  onSelect: (d: number) => void;
}) {
  const [month, setMonth] = useState(3); // 0-indexed, 3 = April
  const [year, setYear] = useState(2026);

  const today = { day: 27, month: 3, year: 2026 };
  const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  function getDaysInMonth(m: number, y: number) {
    return new Date(y, m + 1, 0).getDate();
  }
  function getFirstDay(m: number, y: number) {
    return new Date(y, m, 1).getDay(); // 0 = Sun
  }

  const daysInMonth = getDaysInMonth(month, year);
  const firstDay = getFirstDay(month, year);

  function isAvailable(day: number) {
    if (month === today.month && year === today.year && day <= today.day) return false;
    if (month === today.month && year === today.year && BOOKED_DAYS_APRIL.has(day)) return false;
    const dow = new Date(year, month, day).getDay();
    return dow !== 0 || day % 7 === 1; // Sundays: limited
  }

  function isPast(day: number) {
    if (year < today.year) return true;
    if (year === today.year && month < today.month) return true;
    if (year === today.year && month === today.month && day < today.day) return true;
    return false;
  }

  function prevMonth() {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
  }
  function nextMonth() {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
  }

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div>
      {/* Month header */}
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={prevMonth}
          className="w-7 h-7 rounded-full flex items-center justify-center transition-colors hover:bg-gray-100"
        >
          <ChevronLeft size={16} style={{ color: "#5A6178" }} />
        </button>
        <span style={{ color: "#1A1A2E", fontWeight: 600, fontSize: "0.875rem" }}>
          {monthNames[month]} {year}
        </span>
        <button
          onClick={nextMonth}
          className="w-7 h-7 rounded-full flex items-center justify-center transition-colors hover:bg-gray-100"
        >
          <ChevronRight size={16} style={{ color: "#5A6178" }} />
        </button>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 mb-1">
        {["Su","Mo","Tu","We","Th","Fr","Sa"].map((d) => (
          <div key={d} className="text-center" style={{ color: "#8E94A7", fontSize: "0.65rem", fontWeight: 600 }}>
            {d}
          </div>
        ))}
      </div>

      {/* Cells */}
      <div className="grid grid-cols-7 gap-y-1">
        {cells.map((day, idx) => {
          if (!day) return <div key={`empty-${idx}`} />;
          const past = isPast(day);
          const avail = !past && isAvailable(day);
          const isSel = selectedDate === day && !past;
          const isToday = day === today.day && month === today.month && year === today.year;

          return (
            <button
              key={day}
              disabled={past || !avail}
              onClick={() => avail && onSelect(day)}
              className="flex items-center justify-center rounded-full mx-auto transition-all"
              style={{
                width: "30px",
                height: "30px",
                fontSize: "0.75rem",
                fontWeight: isSel ? 700 : 400,
                backgroundColor: isSel ? "#1B4F72" : isToday && !isSel ? "#EBF5FB" : "transparent",
                color: isSel ? "#fff" : past ? "#C8CDD9" : avail ? "#1A1A2E" : "#C8CDD9",
                cursor: past || !avail ? "not-allowed" : "pointer",
                border: isToday && !isSel ? "2px solid #1B4F72" : "2px solid transparent",
              }}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── TIME SLOTS ───────────────────────────────────────────────────────────────
const TIME_SLOTS = [
  { time: "9:00", booked: false },
  { time: "9:30", booked: true },
  { time: "10:00", booked: false },
  { time: "10:30", booked: false },
  { time: "11:00", booked: true },
  { time: "11:30", booked: false },
  { time: "2:00", booked: false },
  { time: "2:30", booked: true },
  { time: "3:00", booked: false },
  { time: "3:30", booked: false },
  { time: "4:00", booked: true },
  { time: "4:30", booked: false },
  { time: "5:00", booked: false },
  { time: "5:30", booked: true },
];

// ─── ABOUT TAB ────────────────────────────────────────────────────────────────
function AboutTab({ vet }: { vet: typeof DR_AHMED_KHAN }) {
  return (
    <div className="space-y-8">
      {/* Bio */}
      <section>
        <h2 style={{ fontFamily: "'DM Serif Display', serif", color: "#0D2F4F", fontSize: "1.4rem" }} className="mb-4">
          About {vet.name}
        </h2>
        <div className="space-y-3">
          {vet.bio.map((para, i) => (
            <p key={i} style={{ color: "#5A6178", lineHeight: 1.8, fontSize: "0.9375rem" }}>
              {para}
            </p>
          ))}
        </div>
      </section>

      {/* Education */}
      <section>
        <h3 style={{ fontFamily: "'DM Serif Display', serif", color: "#0D2F4F", fontSize: "1.15rem" }} className="mb-4">
          Education & Qualifications
        </h3>
        <div className="space-y-3">
          {vet.education.map((edu, i) => (
            <div key={i} className="flex gap-3 items-start p-4 rounded-xl" style={{ backgroundColor: "#F0F4F8" }}>
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "#EBF5FB" }}
              >
                <GraduationCap size={18} style={{ color: "#1B4F72" }} />
              </div>
              <div>
                <p style={{ color: "#1A1A2E", fontWeight: 700, fontSize: "0.9rem" }}>{edu.degree}</p>
                <p style={{ color: "#5A6178", fontSize: "0.825rem" }}>{edu.institution}</p>
                <p style={{ color: "#8E94A7", fontSize: "0.75rem" }}>{edu.year}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Languages */}
      <section>
        <h3 style={{ fontFamily: "'DM Serif Display', serif", color: "#0D2F4F", fontSize: "1.15rem" }} className="mb-3">
          Languages
        </h3>
        <div className="flex flex-wrap gap-2">
          {vet.languages.map((lang) => (
            <span
              key={lang}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm"
              style={{ backgroundColor: "#EBF5FB", color: "#1B4F72", fontWeight: 600 }}
            >
              <Globe size={13} />
              {lang}
            </span>
          ))}
        </div>
      </section>

      {/* Specializations */}
      <section>
        <h3 style={{ fontFamily: "'DM Serif Display', serif", color: "#0D2F4F", fontSize: "1.15rem" }} className="mb-3">
          Specializes In
        </h3>
        <div className="flex flex-wrap gap-2">
          {vet.specializations.map((spec) => (
            <span
              key={spec}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm"
              style={{ backgroundColor: "#FEF3E8", color: "#E67E22", fontWeight: 600 }}
            >
              <Tag size={13} />
              {spec}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}

// ─── SERVICES TAB ─────────────────────────────────────────────────────────────
function ServicesTab({ vet }: { vet: typeof DR_AHMED_KHAN }) {
  return (
    <div>
      <h2 style={{ fontFamily: "'DM Serif Display', serif", color: "#0D2F4F", fontSize: "1.4rem" }} className="mb-6">
        Services & Pricing
      </h2>
      {/* Desktop table */}
      <div className="hidden sm:block rounded-2xl overflow-hidden border" style={{ borderColor: "#E8ECF1" }}>
        <table className="w-full">
          <thead>
            <tr style={{ backgroundColor: "#1B4F72" }}>
              <th className="text-left px-5 py-3.5 text-sm text-white" style={{ fontWeight: 600 }}>Service</th>
              <th className="text-left px-5 py-3.5 text-sm text-white" style={{ fontWeight: 600 }}>Duration</th>
              <th className="text-right px-5 py-3.5 text-sm text-white" style={{ fontWeight: 600 }}>Consultation Fee</th>
              <th className="px-5 py-3.5"></th>
            </tr>
          </thead>
          <tbody>
            {vet.services.map((svc, i) => (
              <tr
                key={svc.name}
                style={{ backgroundColor: i % 2 === 0 ? "#fff" : "#F8FAFC", borderBottom: "1px solid #F0F4F8" }}
              >
                <td className="px-5 py-4">
                  <span style={{ color: "#1A1A2E", fontWeight: 600, fontSize: "0.9rem" }}>{svc.name}</span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-1.5">
                    <Clock size={13} style={{ color: "#8E94A7" }} />
                    <span style={{ color: "#5A6178", fontSize: "0.875rem" }}>{svc.duration}</span>
                  </div>
                </td>
                <td className="px-5 py-4 text-right">
                  <span style={{ color: "#1B4F72", fontWeight: 700, fontSize: "0.9375rem" }}>
                    PKR {svc.fee.toLocaleString()}
                  </span>
                </td>
                <td className="px-5 py-4 text-right">
                  <button
                    className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                    style={{ backgroundColor: "#FEF3E8", color: "#E67E22" }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#E67E22"; e.currentTarget.style.color = "#fff"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#FEF3E8"; e.currentTarget.style.color = "#E67E22"; }}
                  >
                    Book
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="sm:hidden space-y-3">
        {vet.services.map((svc) => (
          <div
            key={svc.name}
            className="rounded-xl p-4 border flex items-center justify-between"
            style={{ backgroundColor: "#fff", borderColor: "#E8ECF1" }}
          >
            <div>
              <p style={{ color: "#1A1A2E", fontWeight: 700, fontSize: "0.9rem" }}>{svc.name}</p>
              <div className="flex items-center gap-1 mt-1">
                <Clock size={11} style={{ color: "#8E94A7" }} />
                <span style={{ color: "#8E94A7", fontSize: "0.75rem" }}>{svc.duration}</span>
              </div>
            </div>
            <div className="text-right">
              <p style={{ color: "#1B4F72", fontWeight: 700 }}>PKR {svc.fee.toLocaleString()}</p>
              <button
                className="mt-1 text-xs px-2.5 py-1 rounded-lg"
                style={{ backgroundColor: "#FEF3E8", color: "#E67E22", fontWeight: 600 }}
              >
                Book
              </button>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-4 text-xs" style={{ color: "#8E94A7" }}>
        * Fees are indicative. Final charges may vary based on complexity of procedure and additional diagnostics required.
      </p>
    </div>
  );
}

// ─── REVIEWS TAB ──────────────────────────────────────────────────────────────
function ReviewsTab({ vet }: { vet: typeof DR_AHMED_KHAN }) {
  const [hoveredStar, setHoveredStar] = useState(0);
  const [selectedStar, setSelectedStar] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [showForm, setShowForm] = useState(false);

  const total = Object.values(vet.ratingDistribution).reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-8">
      <h2 style={{ fontFamily: "'DM Serif Display', serif", color: "#0D2F4F", fontSize: "1.4rem" }}>
        Patient Reviews
      </h2>

      {/* Overall + Distribution */}
      <div
        className="rounded-2xl p-6 flex flex-col sm:flex-row gap-8 items-center sm:items-start"
        style={{ backgroundColor: "#fff", border: "1px solid #E8ECF1" }}
      >
        {/* Big rating */}
        <div className="text-center flex-shrink-0">
          <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: "4rem", color: "#1B4F72", lineHeight: 1 }}>
            {vet.rating}
          </div>
          <StarRating rating={vet.rating} size={20} />
          <p className="mt-1" style={{ color: "#8E94A7", fontSize: "0.8rem" }}>
            Based on {vet.reviews} reviews
          </p>
        </div>

        {/* Distribution bars */}
        <div className="flex-1 w-full space-y-2">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = vet.ratingDistribution[star as keyof typeof vet.ratingDistribution] ?? 0;
            const pct = Math.round((count / total) * 100);
            return (
              <div key={star} className="flex items-center gap-3">
                <div className="flex items-center gap-1 flex-shrink-0" style={{ width: "40px" }}>
                  <span style={{ color: "#5A6178", fontSize: "0.8rem", fontWeight: 600 }}>{star}</span>
                  <Star size={11} fill="#F39C12" style={{ color: "#F39C12" }} />
                </div>
                <div className="flex-1 h-2.5 rounded-full overflow-hidden" style={{ backgroundColor: "#F0F4F8" }}>
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${pct}%`, backgroundColor: star >= 4 ? "#27AE60" : star === 3 ? "#F39C12" : "#E74C3C" }}
                  />
                </div>
                <span style={{ color: "#8E94A7", fontSize: "0.75rem", width: "36px", textAlign: "right" }}>
                  {pct}%
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Individual reviews */}
      <div className="space-y-4">
        {vet.reviews_data.map((rev) => (
          <div
            key={rev.id}
            className="rounded-2xl p-5 border"
            style={{ backgroundColor: "#fff", borderColor: "#E8ECF1" }}
          >
            <div className="flex items-start gap-3 mb-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-sm"
                style={{ backgroundColor: "#1B4F72", color: "#fff", fontWeight: 700 }}
              >
                {rev.avatar}
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <p style={{ color: "#1A1A2E", fontWeight: 700, fontSize: "0.9rem" }}>{rev.name}</p>
                  <span style={{ color: "#8E94A7", fontSize: "0.75rem" }}>{rev.date}</span>
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <StarRating rating={rev.rating} size={12} />
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: "#F0F4F8", color: "#5A6178" }}>
                    🐾 {rev.pet}
                  </span>
                </div>
              </div>
            </div>
            <p style={{ color: "#5A6178", fontSize: "0.875rem", lineHeight: 1.7 }}>{rev.text}</p>
          </div>
        ))}
      </div>

      {/* Write review button / form */}
      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-5 py-3 rounded-xl border transition-all"
          style={{ color: "#1B4F72", borderColor: "#1B4F72", fontWeight: 600 }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#EBF5FB"; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
        >
          <Star size={16} />
          Write a Review
        </button>
      ) : (
        <div className="rounded-2xl p-6 border" style={{ backgroundColor: "#fff", borderColor: "#E8ECF1" }}>
          <h4 style={{ color: "#1A1A2E", fontWeight: 700, fontSize: "1rem" }} className="mb-4">
            Share Your Experience
          </h4>
          <div className="flex items-center gap-2 mb-4">
            <span style={{ color: "#5A6178", fontSize: "0.875rem" }}>Your Rating:</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <InteractiveStar
                  key={s}
                  index={s}
                  rating={hoveredStar || selectedStar}
                  onHover={setHoveredStar}
                  onClick={setSelectedStar}
                />
              ))}
            </div>
          </div>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Share details about your experience with Dr. Ahmed Khan..."
            className="w-full rounded-xl p-4 text-sm resize-none outline-none"
            rows={4}
            style={{ border: "1.5px solid #E8ECF1", color: "#1A1A2E", backgroundColor: "#F8FAFC" }}
            onFocus={(e) => { e.currentTarget.style.borderColor = "#1B4F72"; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = "#E8ECF1"; }}
          />
          <div className="flex gap-3 mt-4">
            <button
              className="px-5 py-2.5 rounded-xl text-sm font-medium text-white transition-all"
              style={{ backgroundColor: "#E67E22" }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#D35400"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#E67E22"; }}
            >
              Submit Review
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="px-5 py-2.5 rounded-xl text-sm transition-all"
              style={{ color: "#5A6178", backgroundColor: "#F0F4F8" }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── LOCATION TAB ─────────────────────────────────────────────────────────────
function LocationTab({ vet }: { vet: typeof DR_AHMED_KHAN }) {
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const todayHours = vet.hours.find((h) => h.day === today);

  return (
    <div className="space-y-6">
      <h2 style={{ fontFamily: "'DM Serif Display', serif", color: "#0D2F4F", fontSize: "1.4rem" }}>
        Clinic & Location
      </h2>

      {/* Clinic card */}
      <div className="rounded-2xl p-5 border" style={{ backgroundColor: "#fff", borderColor: "#E8ECF1" }}>
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#EBF5FB" }}>
            <Award size={20} style={{ color: "#1B4F72" }} />
          </div>
          <div>
            <p style={{ color: "#1A1A2E", fontWeight: 700, fontSize: "1rem" }}>{vet.clinic}</p>
            <div className="flex items-center gap-1 mt-0.5">
              <MapPin size={13} style={{ color: "#E67E22" }} />
              <span style={{ color: "#5A6178", fontSize: "0.875rem" }}>
                {vet.area}, {vet.city}, {vet.province}
              </span>
            </div>
          </div>
        </div>

        {/* Map placeholder */}
        <div
          className="rounded-xl overflow-hidden mb-4 relative flex items-center justify-center"
          style={{ height: "200px", backgroundColor: "#D6EAF8", border: "1px solid #AED6F1" }}
        >
          <div className="text-center">
            <MapPin size={32} style={{ color: "#1B4F72" }} className="mx-auto mb-2" />
            <p style={{ color: "#1B4F72", fontWeight: 600, fontSize: "0.875rem" }}>PetCare Veterinary Hospital</p>
            <p style={{ color: "#5A6178", fontSize: "0.75rem" }}>Model Town, Lahore</p>
          </div>
          {/* Decorative grid */}
          <svg className="absolute inset-0 w-full h-full opacity-30" style={{ pointerEvents: "none" }}>
            {[20, 40, 60, 80].map((v) => (
              <g key={v}>
                <line x1={`${v}%`} y1="0" x2={`${v}%`} y2="100%" stroke="#1B4F72" strokeWidth="0.5" />
                <line x1="0" y1={`${v}%`} x2="100%" y2={`${v}%`} stroke="#1B4F72" strokeWidth="0.5" />
              </g>
            ))}
          </svg>
        </div>

        <button
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium text-white transition-all mb-4"
          style={{ backgroundColor: "#1B4F72" }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#154060"; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#1B4F72"; }}
        >
          <Navigation size={16} />
          Get Directions
        </button>

        {/* Contact */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <a
            href={`tel:${vet.phone}`}
            className="flex items-center gap-3 p-3 rounded-xl border transition-all"
            style={{ borderColor: "#E8ECF1", color: "#1A1A2E" }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#F0F4F8"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
          >
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#EBF5FB" }}>
              <Phone size={16} style={{ color: "#1B4F72" }} />
            </div>
            <div>
              <p style={{ color: "#8E94A7", fontSize: "0.7rem" }}>Phone</p>
              <p style={{ color: "#1A1A2E", fontSize: "0.85rem", fontWeight: 600 }}>{vet.phone}</p>
            </div>
          </a>
          <a
            href={`https://wa.me/${vet.whatsapp.replace(/\D/g, "")}`}
            className="flex items-center gap-3 p-3 rounded-xl border transition-all"
            style={{ borderColor: "#E8ECF1", color: "#1A1A2E" }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#EAFAF1"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
          >
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#EAFAF1" }}>
              <MessageCircle size={16} style={{ color: "#27AE60" }} />
            </div>
            <div>
              <p style={{ color: "#8E94A7", fontSize: "0.7rem" }}>WhatsApp</p>
              <p style={{ color: "#1A1A2E", fontSize: "0.85rem", fontWeight: 600 }}>{vet.whatsapp}</p>
            </div>
          </a>
        </div>
      </div>

      {/* Hours */}
      <div className="rounded-2xl p-5 border" style={{ backgroundColor: "#fff", borderColor: "#E8ECF1" }}>
        <h3 style={{ fontFamily: "'DM Serif Display', serif", color: "#0D2F4F", fontSize: "1.1rem" }} className="mb-4">
          Working Hours
        </h3>
        <div className="space-y-2">
          {vet.hours.map((h) => {
            const isToday = h.day === today;
            return (
              <div
                key={h.day}
                className="flex items-center justify-between py-2.5 px-3 rounded-xl"
                style={{ backgroundColor: isToday ? "#EBF5FB" : "transparent" }}
              >
                <span
                  style={{
                    color: isToday ? "#1B4F72" : "#5A6178",
                    fontWeight: isToday ? 700 : 400,
                    fontSize: "0.875rem",
                  }}
                >
                  {h.day}
                  {isToday && (
                    <span
                      className="ml-2 text-xs px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: "#1B4F72", color: "#fff" }}
                    >
                      Today
                    </span>
                  )}
                </span>
                <span style={{ color: isToday ? "#1B4F72" : "#8E94A7", fontSize: "0.875rem", fontWeight: isToday ? 600 : 400 }}>
                  {h.open} — {h.close}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── PHOTOS TAB ───────────────────────────────────────────────────────────────
function PhotosTab({ vet }: { vet: typeof DR_AHMED_KHAN }) {
  const [selected, setSelected] = useState<string | null>(null);
  const labels = ["Clinic Reception", "Consultation", "Surgery Suite", "Happy Patients"];

  return (
    <div>
      <h2 style={{ fontFamily: "'DM Serif Display', serif", color: "#0D2F4F", fontSize: "1.4rem" }} className="mb-6">
        Clinic Photos
      </h2>
      <div className="grid grid-cols-2 gap-3">
        {vet.photos.map((src, i) => (
          <button
            key={i}
            className="relative rounded-2xl overflow-hidden group"
            style={{ aspectRatio: "4/3" }}
            onClick={() => setSelected(src)}
          >
            <ImageWithFallback
              src={src}
              alt={labels[i]}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3"
              style={{ background: "linear-gradient(to top, rgba(13,47,79,0.8), transparent)" }}
            >
              <span className="text-white text-sm font-medium">{labels[i]}</span>
            </div>
          </button>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-2">
        <Camera size={15} style={{ color: "#8E94A7" }} />
        <span style={{ color: "#8E94A7", fontSize: "0.8rem" }}>4 photos · Last updated April 2026</span>
      </div>

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.85)" }}
          onClick={() => setSelected(null)}
        >
          <div className="relative max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
            <ImageWithFallback src={selected} alt="Gallery" className="w-full rounded-2xl object-cover" />
            <button
              onClick={() => setSelected(null)}
              className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center text-white"
              style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── BOOKING SIDEBAR ──────────────────────────────────────────────────────────
function BookingSidebar({ vet }: { vet: typeof DR_AHMED_KHAN }) {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [visitType, setVisitType] = useState("General Checkup");
  const [pet, setPet] = useState("");

  const visitTypes = ["General Checkup", "Follow-up", "Emergency", "Vaccination", "Surgery Consultation"];
  const selectedService = vet.services.find((s) => s.name === visitType);
  const fee = selectedService?.fee ?? 1500;

  return (
    <div
      className="rounded-2xl border overflow-hidden"
      style={{ backgroundColor: "#fff", borderColor: "#E8ECF1", boxShadow: "0 4px 24px rgba(27,79,114,0.08)" }}
    >
      {/* Header */}
      <div className="px-5 py-4" style={{ backgroundColor: "#1B4F72" }}>
        <div className="flex items-center justify-between">
          <h3 className="text-white" style={{ fontWeight: 700, fontSize: "1rem" }}>Book Appointment</h3>
          <span
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs"
            style={{ backgroundColor: "rgba(39,174,96,0.2)", color: "#5DADE2" }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "#27AE60" }} />
            Available Today
          </span>
        </div>
      </div>

      <div className="p-5 space-y-5">
        {/* Calendar */}
        <div>
          <p className="mb-3" style={{ color: "#1A1A2E", fontWeight: 600, fontSize: "0.875rem" }}>
            Select Date
          </p>
          <MiniCalendar selectedDate={selectedDate} onSelect={setSelectedDate} />
        </div>

        <hr style={{ borderColor: "#F0F4F8" }} />

        {/* Time slots */}
        <div>
          <p className="mb-3" style={{ color: "#1A1A2E", fontWeight: 600, fontSize: "0.875rem" }}>
            Available Times
          </p>
          <div className="grid grid-cols-3 gap-2">
            {TIME_SLOTS.map((slot) => (
              <button
                key={slot.time}
                disabled={slot.booked}
                onClick={() => !slot.booked && setSelectedTime(slot.time)}
                className="py-2 rounded-lg text-xs font-medium transition-all"
                style={{
                  backgroundColor:
                    selectedTime === slot.time
                      ? "#1B4F72"
                      : slot.booked
                      ? "#F0F4F8"
                      : "#EBF5FB",
                  color:
                    selectedTime === slot.time
                      ? "#fff"
                      : slot.booked
                      ? "#C8CDD9"
                      : "#1B4F72",
                  cursor: slot.booked ? "not-allowed" : "pointer",
                  textDecoration: slot.booked ? "line-through" : "none",
                }}
              >
                {slot.time}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs" style={{ color: "#8E94A7" }}>
            <span style={{ color: "#C8CDD9" }}>Strikethrough</span> = Booked
          </p>
        </div>

        <hr style={{ borderColor: "#F0F4F8" }} />

        {/* Pet selector */}
        <div>
          <label style={{ color: "#1A1A2E", fontWeight: 600, fontSize: "0.875rem", display: "block" }} className="mb-2">
            Your Pet
          </label>
          <div className="relative">
            <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#8E94A7" }} />
            <select
              value={pet}
              onChange={(e) => setPet(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none appearance-none"
              style={{
                border: "1.5px solid #E8ECF1",
                color: pet ? "#1A1A2E" : "#8E94A7",
                backgroundColor: "#F8FAFC",
              }}
            >
              <option value="">Select your pet</option>
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
              <option value="bird">Bird</option>
              <option value="rabbit">Rabbit</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        {/* Visit type */}
        <div>
          <label style={{ color: "#1A1A2E", fontWeight: 600, fontSize: "0.875rem", display: "block" }} className="mb-2">
            Visit Type
          </label>
          <div className="space-y-2">
            {visitTypes.map((vt) => (
              <label
                key={vt}
                className="flex items-center gap-2.5 p-2.5 rounded-xl cursor-pointer transition-colors"
                style={{ backgroundColor: visitType === vt ? "#EBF5FB" : "transparent" }}
              >
                <div
                  className="w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                  style={{
                    borderColor: visitType === vt ? "#1B4F72" : "#C8CDD9",
                    backgroundColor: visitType === vt ? "#1B4F72" : "transparent",
                  }}
                >
                  {visitType === vt && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
                <input
                  type="radio"
                  className="hidden"
                  name="visitType"
                  value={vt}
                  checked={visitType === vt}
                  onChange={() => setVisitType(vt)}
                />
                <span style={{ color: "#1A1A2E", fontSize: "0.8rem" }}>{vt}</span>
              </label>
            ))}
          </div>
        </div>

        <hr style={{ borderColor: "#F0F4F8" }} />

        {/* Fee & confirm */}
        <div className="rounded-xl p-3.5" style={{ backgroundColor: "#F8FAFC", border: "1px solid #E8ECF1" }}>
          <div className="flex items-center justify-between mb-1">
            <span style={{ color: "#8E94A7", fontSize: "0.8rem" }}>Consultation Fee</span>
            <span style={{ color: "#1B4F72", fontWeight: 700, fontSize: "1rem" }}>
              PKR {fee.toLocaleString()}
            </span>
          </div>
          {selectedDate && selectedTime && (
            <p className="text-xs" style={{ color: "#27AE60" }}>
              📅 Apr {selectedDate}, {selectedTime} AM
            </p>
          )}
        </div>

        <Link
          to={`/vetconnect/book/${vet.id}`}
          className="w-full py-3.5 rounded-xl text-white font-medium transition-all flex items-center justify-center gap-2"
          style={{ backgroundColor: "#E67E22", fontSize: "0.9375rem" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#D35400"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#E67E22"; }}
        >
          <Calendar size={17} />
          Book Appointment
        </Link>
      </div>
    </div>
  );
}

// ─── MOBILE BOOKING BUTTON ────────────────────────────────────────────────────
function MobileBookingBar({ vet }: { vet: typeof DR_AHMED_KHAN }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div
        className="fixed bottom-0 left-0 right-0 z-40 lg:hidden px-4 py-3"
        style={{ backgroundColor: "#fff", borderTop: "1px solid #E8ECF1", boxShadow: "0 -4px 24px rgba(0,0,0,0.08)" }}
      >
        <div className="flex gap-3 max-w-lg mx-auto">
          <button
            className="flex-1 py-3 rounded-xl border font-medium text-sm transition-all"
            style={{ color: "#1B4F72", borderColor: "#1B4F72" }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#EBF5FB"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
          >
            <Send size={15} className="inline mr-1.5" />
            Message
          </button>
          <Link
            to={`/vetconnect/book/${vet.id}`}
            className="flex-1 py-3 rounded-xl font-medium text-sm text-white text-center flex items-center justify-center gap-1.5 transition-all"
            style={{ backgroundColor: "#E67E22" }}
          >
            <Calendar size={15} />
            Book Appointment
          </Link>
        </div>
      </div>

      {/* Mobile booking modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full rounded-t-3xl overflow-y-auto"
            style={{ backgroundColor: "#fff", maxHeight: "90vh" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: "#F0F4F8" }}>
              <h3 style={{ color: "#1A1A2E", fontWeight: 700 }}>Book Appointment</h3>
              <button onClick={() => setOpen(false)} style={{ color: "#8E94A7" }}>✕</button>
            </div>
            <div className="p-5">
              <BookingSidebar vet={vet} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
const TABS = [
  { key: "about", label: "About" },
  { key: "services", label: "Services" },
  { key: "reviews", label: "Reviews" },
  { key: "location", label: "Location" },
  { key: "photos", label: "Photos" },
];

export function VetProfilePage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("about");
  const vet = DR_AHMED_KHAN; // Could map by id in real app

  return (
    <div style={{ backgroundColor: "#FAFBFD" }} className="pb-24 lg:pb-0">
      {/* ── BANNER ──────────────────────────────────────────────── */}
      <div
        className="relative h-48 sm:h-56"
        style={{
          background: "linear-gradient(135deg, #0D2F4F 0%, #1B4F72 45%, #2E86C1 100%)",
        }}
      >
        {/* Decorative pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-10" style={{ pointerEvents: "none" }}>
          <defs>
            <pattern id="heroGrid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#heroGrid)" />
        </svg>

        {/* Breadcrumb */}
        <div className="absolute top-4 left-4 sm:left-8">
          <Link
            to="/vetconnect/find-vet"
            className="flex items-center gap-1.5 text-sm transition-opacity hover:opacity-80"
            style={{ color: "rgba(255,255,255,0.75)" }}
          >
            <ChevronLeft size={16} />
            Back to Find a Vet
          </Link>
        </div>

        {/* Available indicator */}
        <div className="absolute top-4 right-4 sm:right-8 flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ backgroundColor: "rgba(39,174,96,0.25)", border: "1px solid rgba(39,174,96,0.4)" }}>
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "#27AE60" }} />
          <span className="text-sm" style={{ color: "#5DADE2", fontWeight: 600 }}>Available Today</span>
        </div>
      </div>

      {/* ── PROFILE HEADER CARD ──────────────────────────────────── */}
      <div className="px-4 sm:px-8 max-w-6xl mx-auto">
        <div
          className="relative rounded-2xl -mt-6 p-5 sm:p-8"
          style={{ backgroundColor: "#fff", boxShadow: "0 8px 40px rgba(27,79,114,0.1)", border: "1px solid #E8ECF1" }}
        >
          <div className="flex flex-col sm:flex-row gap-5 sm:gap-6 items-center sm:items-start">
            {/* Avatar */}
            <div
              className="relative flex-shrink-0 -mt-16 sm:-mt-20"
              style={{ zIndex: 10 }}
            >
              <div
                className="rounded-full overflow-hidden"
                style={{
                  width: "110px",
                  height: "110px",
                  border: "4px solid #fff",
                  boxShadow: "0 4px 20px rgba(27,79,114,0.2)",
                }}
              >
                <ImageWithFallback
                  src={vet.avatar}
                  alt={vet.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Verified badge */}
              <div
                className="absolute bottom-1 right-1 w-7 h-7 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#27AE60", border: "2px solid #fff" }}
              >
                <CheckCircle size={14} color="#fff" />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div>
                  <h1
                    style={{
                      fontFamily: "'DM Serif Display', serif",
                      color: "#0D2F4F",
                      fontSize: "1.75rem",
                      lineHeight: 1.2,
                    }}
                  >
                    {vet.name}, {vet.credentials}
                  </h1>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-2">
                    <span
                      className="px-3 py-1 rounded-full text-sm"
                      style={{ backgroundColor: "#EBF5FB", color: "#1B4F72", fontWeight: 600 }}
                    >
                      {vet.specialty}
                    </span>
                    <span
                      className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs"
                      style={{ backgroundColor: "#EAFAF1", color: "#27AE60", fontWeight: 600 }}
                    >
                      <CheckCircle size={11} />
                      Verified
                    </span>
                  </div>
                  <div className="flex items-center justify-center sm:justify-start gap-1.5 mt-2">
                    <MapPin size={14} style={{ color: "#E67E22" }} />
                    <span style={{ color: "#5A6178", fontSize: "0.875rem" }}>
                      {vet.area}, {vet.city}, {vet.province}
                    </span>
                  </div>
                  <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
                    <StarRating rating={vet.rating} size={15} />
                    <span style={{ color: "#1A1A2E", fontWeight: 700, fontSize: "0.9rem" }}>
                      {vet.rating}
                    </span>
                    <span style={{ color: "#8E94A7", fontSize: "0.8rem" }}>
                      ({vet.reviews} reviews)
                    </span>
                  </div>
                </div>

                {/* Desktop action buttons */}
                <div className="hidden sm:flex flex-col gap-2 flex-shrink-0">
                  <Link
                    to={`/vetconnect/book/${vet.id}`}
                    className="px-6 py-3 rounded-xl text-white font-medium transition-all flex items-center gap-2"
                    style={{ backgroundColor: "#E67E22" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#D35400"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#E67E22"; }}
                  >
                    <Calendar size={16} />
                    Book Appointment
                  </Link>
                  <button
                    className="px-6 py-3 rounded-xl font-medium border transition-all flex items-center gap-2"
                    style={{ color: "#1B4F72", borderColor: "#1B4F72" }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#EBF5FB"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                  >
                    <Send size={16} />
                    Send Message
                  </button>
                </div>
              </div>

              {/* Stats row */}
              <div
                className="grid grid-cols-3 gap-4 mt-5 pt-5"
                style={{ borderTop: "1px solid #F0F4F8" }}
              >
                {[
                  { label: "Experience", value: `${vet.experience} Years` },
                  { label: "Patients", value: vet.patients },
                  { label: "Rating", value: `${vet.rating} / 5.0` },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p style={{ fontFamily: "'DM Serif Display', serif", color: "#1B4F72", fontSize: "1.25rem" }}>
                      {stat.value}
                    </p>
                    <p style={{ color: "#8E94A7", fontSize: "0.75rem" }}>{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ─────────────────────────────────────────── */}
      <div className="px-4 sm:px-8 max-w-6xl mx-auto mt-6">
        <div className="flex gap-6 items-start">
          {/* Left: Tabs + Content */}
          <div className="flex-1 min-w-0">
            {/* Tab bar */}
            <div
              className="flex rounded-2xl p-1 mb-6 overflow-x-auto"
              style={{ backgroundColor: "#fff", border: "1px solid #E8ECF1", gap: "4px" }}
            >
              {TABS.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className="flex-1 py-2.5 px-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap"
                  style={{
                    backgroundColor: activeTab === tab.key ? "#1B4F72" : "transparent",
                    color: activeTab === tab.key ? "#fff" : "#5A6178",
                    minWidth: "70px",
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div
              className="rounded-2xl p-5 sm:p-7"
              style={{ backgroundColor: "#fff", border: "1px solid #E8ECF1" }}
            >
              {activeTab === "about" && <AboutTab vet={vet} />}
              {activeTab === "services" && <ServicesTab vet={vet} />}
              {activeTab === "reviews" && <ReviewsTab vet={vet} />}
              {activeTab === "location" && <LocationTab vet={vet} />}
              {activeTab === "photos" && <PhotosTab vet={vet} />}
            </div>
          </div>

          {/* Right: Booking sidebar (desktop only) */}
          <div className="hidden lg:block w-80 flex-shrink-0 sticky top-24">
            <BookingSidebar vet={vet} />
          </div>
        </div>
      </div>

      {/* Mobile booking bar */}
      <MobileBookingBar vet={vet} />
    </div>
  );
}
