import { useState, useMemo } from "react";
import { Link } from "react-router";
import {
  Search, MapPin, Star, Clock, Award, CheckCircle, X,
  LayoutGrid, List, Map, ChevronLeft,
  ChevronRight, Navigation, Video, Filter,
  Calendar,
} from "lucide-react";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";

// ─── DATA ───────────────────────────────────────────────────────────────────
const ALL_VETS = [
  {
    id: 1,
    name: "Dr. Aisha Malik",
    clinic: "PetCare Clinic",
    city: "Karachi",
    area: "PECHS Block 7",
    specialty: "Small Animal",
    gender: "Female",
    rating: 4.9,
    reviews: 312,
    experience: 12,
    available: true,
    nextSlot: "Today, 3:00 PM",
    onlineConsult: true,
    fee: 1500,
    verified: true,
    bio: "Specializes in small animal medicine with a focus on preventive care and internal medicine for dogs and cats.",
    services: ["Checkups", "Vaccination", "Surgery", "Dentistry"],
    img: "https://images.unsplash.com/photo-1774279922369-755504a8b495?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjB2ZXRlcmluYXJpYW4lMjBob2xkaW5nJTIwY2F0JTIwc21pbGluZ3xlbnwxfHx8fDE3NzcyNjg0OTh8MA&ixlib=rb-4.1.0&q=80&w=400",
    mapX: 20, mapY: 78,
  },
  {
    id: 2,
    name: "Dr. Bilal Ahmed",
    clinic: "City Vet Hospital",
    city: "Lahore",
    area: "DHA Phase 5",
    specialty: "Surgery",
    gender: "Male",
    rating: 4.8,
    reviews: 245,
    experience: 9,
    available: true,
    nextSlot: "Today, 5:30 PM",
    onlineConsult: false,
    fee: 2000,
    verified: true,
    bio: "Experienced surgical specialist performing complex procedures including orthopedic and soft tissue surgeries.",
    services: ["Surgery", "Emergency", "Orthopedics"],
    img: "https://images.unsplash.com/photo-1622253694238-3b22139576c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwdmV0ZXJpbmFyaWFuJTIwZG9jdG9yJTIwc21pbGluZyUyMHBvcnRyYWl0fGVufDF8fHx8MTc3NzI2OTQzNHww&ixlib=rb-4.1.0&q=80&w=400",
    mapX: 42, mapY: 28,
  },
  {
    id: 3,
    name: "Dr. Sana Qureshi",
    clinic: "Paws & Claws Clinic",
    city: "Islamabad",
    area: "F-7/2 Markaz",
    specialty: "Dental",
    gender: "Female",
    rating: 4.9,
    reviews: 189,
    experience: 7,
    available: false,
    nextSlot: "Tomorrow, 10:00 AM",
    onlineConsult: true,
    fee: 1800,
    verified: true,
    bio: "Certified veterinary dentist providing comprehensive oral health care and dental procedures for all pet types.",
    services: ["Dental Care", "Oral Surgery", "Checkups", "Vaccination"],
    img: "https://images.unsplash.com/photo-1673865641073-4479f93a7776?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBkb2N0b3IlMjB2ZXRlcmluYXJpYW4lMjBzbWlsaW5nJTIwd2hpdGUlMjBjb2F0fGVufDF8fHx8MTc3NzI2OTgyOHww&ixlib=rb-4.1.0&q=80&w=400",
    mapX: 52, mapY: 24,
  },
  {
    id: 4,
    name: "Dr. Hassan Tariq",
    clinic: "Animal Wellness Center",
    city: "Karachi",
    area: "Clifton Block 8",
    specialty: "Emergency",
    gender: "Male",
    rating: 4.7,
    reviews: 421,
    experience: 15,
    available: true,
    nextSlot: "Today, 2:00 PM",
    onlineConsult: false,
    fee: 3000,
    verified: true,
    bio: "Veteran emergency care specialist providing 24/7 critical care, triage, and intensive veterinary services.",
    services: ["Emergency", "Surgery", "ICU", "Critical Care"],
    img: "https://images.unsplash.com/photo-1612531386530-97286d97c2d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwZG9jdG9yJTIwcHJvZmVzc2lvbmFsJTIwcG9ydHJhaXQlMjBjb25maWRlbnR8ZW58MXx8fHwxNzc3MjY5ODI5fDA&ixlib=rb-4.1.0&q=80&w=400",
    mapX: 22, mapY: 80,
  },
  {
    id: 5,
    name: "Dr. Nadia Farooq",
    clinic: "Happy Paws Vet",
    city: "Rawalpindi",
    area: "Saddar Cantt",
    specialty: "Avian & Exotic",
    gender: "Female",
    rating: 4.8,
    reviews: 167,
    experience: 10,
    available: true,
    nextSlot: "Today, 6:00 PM",
    onlineConsult: true,
    fee: 1200,
    verified: true,
    bio: "Leading expert in avian and exotic pet medicine, treating birds, reptiles, rabbits, and small mammals.",
    services: ["Exotic Pets", "Avian Care", "Checkups", "Nutrition"],
    img: "https://images.unsplash.com/photo-1649172000612-6aa53867391d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZXRlcmluYXJpYW4lMjB3b21hbiUyMGV4YW1pbmluZyUyMHBldCUyMHN0ZXRob3Njb3BlfGVufDF8fHx8MTc3NzI2OTgyOXww&ixlib=rb-4.1.0&q=80&w=400",
    mapX: 50, mapY: 26,
  },
  {
    id: 6,
    name: "Dr. Usman Ali",
    clinic: "Metro Animal Hospital",
    city: "Lahore",
    area: "Johar Town",
    specialty: "Dermatology",
    gender: "Male",
    rating: 4.6,
    reviews: 293,
    experience: 11,
    available: false,
    nextSlot: "Tomorrow, 9:30 AM",
    onlineConsult: true,
    fee: 1600,
    verified: true,
    bio: "Specialized in veterinary dermatology, treating skin conditions, allergies, and coat disorders in dogs and cats.",
    services: ["Skin Care", "Allergy Treatment", "Dermatoscopy", "Checkups"],
    img: "https://images.unsplash.com/photo-1629224840465-cb61148cc7f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZXRlcmluYXJpYW4lMjBtYW4lMjBleGFtaW5pbmclMjBiaXJkJTIwYXZpYW58ZW58MXx8fHwxNzc3MjY5NDM1fDA&ixlib=rb-4.1.0&q=80&w=400",
    mapX: 44, mapY: 30,
  },
  {
    id: 7,
    name: "Dr. Fatima Raza",
    clinic: "FarmCare Veterinary",
    city: "Faisalabad",
    area: "Madina Town",
    specialty: "Livestock",
    gender: "Female",
    rating: 4.8,
    reviews: 194,
    experience: 13,
    available: true,
    nextSlot: "Today, 4:00 PM",
    onlineConsult: false,
    fee: 900,
    verified: true,
    bio: "Dedicated livestock veterinarian serving dairy farms and agricultural communities across central Punjab.",
    services: ["Livestock Care", "Farm Visits", "Vaccination", "Reproduction"],
    img: "https://images.unsplash.com/photo-1721907043535-318e2f352757?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjB2ZXRlcmluYXJpYW4lMjB3b21hbiUyMGRvY3RvciUyMGNsaW5pY3xlbnwxfHx8fDE3NzcyNjk0MzV8MA&ixlib=rb-4.1.0&q=80&w=400",
    mapX: 36, mapY: 34,
  },
  {
    id: 8,
    name: "Dr. Ahmed Khan",
    clinic: "Royal Veterinary Care",
    city: "Lahore",
    area: "Gulberg III",
    specialty: "Surgery",
    gender: "Male",
    rating: 4.9,
    reviews: 287,
    experience: 16,
    available: true,
    nextSlot: "Today, 7:00 PM",
    onlineConsult: false,
    fee: 2500,
    verified: true,
    bio: "Senior surgical specialist with over 16 years of experience in advanced veterinary procedures and trauma care.",
    services: ["Surgery", "Trauma Care", "Orthopedics", "Post-op Care"],
    img: "https://images.unsplash.com/photo-1758691463393-a2aa9900af8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMG1hbGUlMjBkb2N0b3IlMjBoZWFsdGhjYXJlJTIwcHJvZmVzc2lvbmFsJTIwc21pbGluZ3xlbnwxfHx8fDE3NzcyNjk4MzB8MA&ixlib=rb-4.1.0&q=80&w=400",
    mapX: 40, mapY: 32,
  },
  {
    id: 9,
    name: "Dr. Zara Hussain",
    clinic: "CityPet Clinic",
    city: "Islamabad",
    area: "G-11 Markaz",
    specialty: "Small Animal",
    gender: "Female",
    rating: 4.7,
    reviews: 138,
    experience: 5,
    available: true,
    nextSlot: "Today, 3:30 PM",
    onlineConsult: true,
    fee: 1300,
    verified: false,
    bio: "Compassionate general practitioner focused on preventive medicine and wellness care for pets of all breeds.",
    services: ["General Care", "Vaccination", "Deworming", "Grooming Advice"],
    img: "https://images.unsplash.com/photo-1755189118414-14c8dacdb082?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZXRlcmluYXJpYW4lMjB0ZWFtJTIwcHJvZmVzc2lvbmFscyUyMHNtaWxpbmd8ZW58MXx8fHwxNzc3MjY4NDk1fDA&ixlib=rb-4.1.0&q=80&w=400",
    mapX: 54, mapY: 22,
  },
  {
    id: 10,
    name: "Dr. Omar Sheikh",
    clinic: "Karachi Bird Hospital",
    city: "Karachi",
    area: "North Nazimabad",
    specialty: "Avian & Exotic",
    gender: "Male",
    rating: 4.6,
    reviews: 112,
    experience: 8,
    available: false,
    nextSlot: "Tomorrow, 11:00 AM",
    onlineConsult: true,
    fee: 1100,
    verified: true,
    bio: "Avian medicine specialist with unique expertise in parrots, finches, pigeons, and other exotic bird species.",
    services: ["Avian Care", "Wing Clipping", "Beak Care", "Health Screening"],
    img: "https://images.unsplash.com/photo-1770836037793-95bdbf190f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZXRlcmluYXJpYW4lMjBkb2N0b3IlMjBleGFtaW5pbmclMjBkb2clMjBjbGluaWN8ZW58MXx8fHwxNzc3MjY4NDkxfDA&ixlib=rb-4.1.0&q=80&w=400",
    mapX: 18, mapY: 82,
  },
];

const CITIES = ["All Cities", "Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad"];
const SPECIALTIES_LIST = ["Small Animal", "Livestock", "Avian & Exotic", "Surgery", "Dermatology", "Dental", "Emergency"];
const RATING_OPTIONS = ["Any", "5 Stars", "4+ Stars", "3+ Stars"];
const SORT_OPTIONS = [
  { value: "relevance", label: "Relevance" },
  { value: "rating", label: "Highest Rated" },
  { value: "reviews", label: "Most Reviewed" },
  { value: "fee_asc", label: "Fee: Low to High" },
];

// ─── STAR RATING ─────────────────────────────────────────────────────────────
function StarRating({ rating, size = 13 }: { rating: number; size?: number }) {
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

// ─── LIST VIEW CARD ───────────────────────────────────────────────────────────
function VetCardList({ vet }: { vet: typeof ALL_VETS[0] }) {
  return (
    <div
      className="group rounded-2xl border overflow-hidden flex flex-col sm:flex-row transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5"
      style={{ backgroundColor: "#fff", borderColor: "#E8ECF1" }}
    >
      {/* Avatar col */}
      <div className="relative flex-shrink-0 w-full sm:w-40 h-44 sm:h-auto overflow-hidden">
        <ImageWithFallback
          src={vet.img}
          alt={vet.name}
          className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
        />
        {vet.verified && (
          <div
            className="absolute top-2.5 left-2.5 flex items-center gap-1 px-2 py-1 rounded-full text-white text-xs"
            style={{ backgroundColor: "rgba(27,79,114,0.9)", backdropFilter: "blur(4px)" }}
          >
            <CheckCircle size={11} />
            Verified
          </div>
        )}
        {vet.onlineConsult && (
          <div
            className="absolute bottom-2.5 left-2.5 flex items-center gap-1 px-2 py-1 rounded-full text-white text-xs"
            style={{ backgroundColor: "rgba(46,134,193,0.9)", backdropFilter: "blur(4px)" }}
          >
            <Video size={10} />
            Online
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 p-5 flex flex-col">
        <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
          <div>
            <h3 className="mb-0.5" style={{ color: "#1A1A2E", fontWeight: 700, fontSize: "1rem" }}>
              {vet.name}
            </h3>
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="text-xs px-2.5 py-0.5 rounded-full"
                style={{ backgroundColor: "#EBF5FB", color: "#2E86C1", fontWeight: 600 }}
              >
                {vet.specialty}
              </span>
              <span
                className={`flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full ${
                  vet.available ? "" : ""
                }`}
                style={{
                  backgroundColor: vet.available ? "#EAFAF1" : "#FEF9E7",
                  color: vet.available ? "#27AE60" : "#E67E22",
                  fontWeight: 600,
                }}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${vet.available ? "animate-pulse" : ""}`}
                  style={{ backgroundColor: vet.available ? "#27AE60" : "#E67E22" }}
                />
                {vet.available ? "Available Today" : `Next: ${vet.nextSlot}`}
              </span>
            </div>
          </div>

          {/* Fee */}
          <div className="text-right flex-shrink-0">
            <p className="text-sm" style={{ color: "#1A1A2E", fontWeight: 700 }}>
              PKR {vet.fee.toLocaleString()}
            </p>
            <p className="text-xs" style={{ color: "#8E94A7" }}>per visit</p>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1.5 mb-2">
          <MapPin size={13} style={{ color: "#8E94A7", flexShrink: 0 }} />
          <span className="text-xs" style={{ color: "#8E94A7" }}>
            {vet.clinic} — {vet.area}, {vet.city}
          </span>
        </div>

        {/* Rating + experience */}
        <div className="flex flex-wrap items-center gap-4 mb-3">
          <div className="flex items-center gap-1.5">
            <StarRating rating={vet.rating} />
            <span className="text-sm" style={{ color: "#1A1A2E", fontWeight: 700 }}>{vet.rating}</span>
            <span className="text-xs" style={{ color: "#8E94A7" }}>({vet.reviews} reviews)</span>
          </div>
          <div className="flex items-center gap-1 text-xs" style={{ color: "#5A6178" }}>
            <Award size={12} />
            {vet.experience} yrs experience
          </div>
        </div>

        {/* Bio */}
        <p className="text-xs leading-relaxed mb-3 line-clamp-2" style={{ color: "#5A6178" }}>
          {vet.bio}
        </p>

        {/* Service tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {vet.services.slice(0, 4).map((s) => (
            <span
              key={s}
              className="text-xs px-2 py-0.5 rounded-full"
              style={{ backgroundColor: "#F0F4F8", color: "#5A6178" }}
            >
              {s}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-auto">
          <Link
            to={`/vetconnect/vet/${vet.id}`}
            className="flex-1 py-2.5 rounded-xl text-xs text-center font-medium border transition-all"
            style={{ color: "#1B4F72", borderColor: "#1B4F72" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#EBF5FB";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent";
            }}
          >
            View Profile
          </Link>
          <Link
            to={`/vetconnect/vet/${vet.id}`}
            className="flex-1 py-2.5 rounded-xl text-xs text-center font-medium text-white transition-all"
            style={{ backgroundColor: "#E67E22" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#D35400")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#E67E22")}
          >
            Book Appointment
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── GRID VIEW CARD ───────────────────────────────────────────────────────────
function VetCardGrid({ vet }: { vet: typeof ALL_VETS[0] }) {
  return (
    <div
      className="group rounded-2xl border overflow-hidden transition-all duration-200 hover:shadow-xl hover:-translate-y-1"
      style={{ backgroundColor: "#fff", borderColor: "#E8ECF1" }}
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <ImageWithFallback
          src={vet.img}
          alt={vet.name}
          className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent 60%)" }} />
        {vet.verified && (
          <div
            className="absolute top-2.5 left-2.5 flex items-center gap-1 px-2 py-1 rounded-full text-white text-xs"
            style={{ backgroundColor: "rgba(27,79,114,0.9)" }}
          >
            <CheckCircle size={11} />
            Verified
          </div>
        )}
        <div
          className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2 py-1 rounded-full text-xs text-white"
          style={{ backgroundColor: vet.available ? "rgba(39,174,96,0.9)" : "rgba(230,126,34,0.9)" }}
        >
          <span className={`w-1.5 h-1.5 rounded-full bg-white ${vet.available ? "animate-pulse" : ""}`} />
          {vet.available ? "Available" : "Busy"}
        </div>
        <div className="absolute bottom-3 left-3">
          <p className="text-white text-sm" style={{ fontWeight: 700 }}>{vet.name}</p>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.8)" }}>{vet.specialty}</p>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-1.5 mb-2">
          <MapPin size={12} style={{ color: "#8E94A7" }} />
          <span className="text-xs" style={{ color: "#8E94A7" }}>{vet.area}, {vet.city}</span>
        </div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <StarRating rating={vet.rating} size={12} />
            <span className="text-xs" style={{ color: "#1A1A2E", fontWeight: 700 }}>{vet.rating}</span>
            <span className="text-xs" style={{ color: "#8E94A7" }}>({vet.reviews})</span>
          </div>
          <span className="text-xs" style={{ color: "#5A6178" }}>{vet.experience} yrs exp.</span>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm" style={{ color: "#1A1A2E", fontWeight: 700 }}>
              PKR {vet.fee.toLocaleString()}
            </p>
            <p className="text-xs" style={{ color: "#8E94A7" }}>per visit</p>
          </div>
          {vet.onlineConsult && (
            <span
              className="flex items-center gap-1 text-xs px-2 py-1 rounded-full"
              style={{ backgroundColor: "#EBF5FB", color: "#2E86C1" }}
            >
              <Video size={10} /> Online
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Link
            to={`/vetconnect/vet/${vet.id}`}
            className="py-2 rounded-xl text-xs text-center font-medium border transition-all"
            style={{ color: "#1B4F72", borderColor: "#1B4F72" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#EBF5FB")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent")}
          >
            View Profile
          </Link>
          <Link
            to={`/vetconnect/vet/${vet.id}`}
            className="py-2 rounded-xl text-xs text-center font-medium text-white transition-all"
            style={{ backgroundColor: "#E67E22" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#D35400")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#E67E22")}
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── MAP VIEW ─────────────────────────────────────────────────────────────────
function MapView({ vets }: { vets: typeof ALL_VETS }) {
  const [activePin, setActivePin] = useState<number | null>(null);
  const activeVet = vets.find((v) => v.id === activePin);

  const cityLabels = [
    { name: "Karachi", x: 20, y: 82 },
    { name: "Lahore", x: 43, y: 33 },
    { name: "Islamabad", x: 53, y: 22 },
    { name: "Faisalabad", x: 36, y: 36 },
    { name: "Rawalpindi", x: 50, y: 27 },
    { name: "Peshawar", x: 46, y: 14 },
    { name: "Multan", x: 32, y: 46 },
    { name: "Quetta", x: 14, y: 56 },
  ];

  return (
    <div
      className="relative rounded-2xl overflow-hidden border"
      style={{ backgroundColor: "#E8F4F8", borderColor: "#E8ECF1", height: "580px" }}
    >
      {/* Map background SVG */}
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
        style={{ opacity: 0.4 }}
      >
        {/* Grid lines */}
        {[10, 20, 30, 40, 50, 60, 70, 80, 90].map((v) => (
          <g key={v}>
            <line x1={v} y1="0" x2={v} y2="100" stroke="#AED6F1" strokeWidth="0.3" />
            <line x1="0" y1={v} x2="100" y2={v} stroke="#AED6F1" strokeWidth="0.3" />
          </g>
        ))}
        {/* Pakistan rough outline */}
        <path
          d="M45,5 L60,8 L70,15 L72,22 L65,28 L68,38 L62,45 L58,55 L52,62 L48,72 L42,80 L35,85 L28,82 L22,78 L18,70 L12,60 L10,50 L12,40 L8,30 L12,20 L20,14 L30,10 Z"
          fill="#D6EAF8"
          stroke="#AED6F1"
          strokeWidth="0.5"
        />
      </svg>

      {/* City label dots */}
      {cityLabels.map((c) => (
        <div
          key={c.name}
          className="absolute flex flex-col items-center pointer-events-none"
          style={{ left: `${c.x}%`, top: `${c.y}%`, transform: "translate(-50%,-50%)" }}
        >
          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#AED6F1" }} />
          <span className="text-xs mt-0.5 whitespace-nowrap" style={{ color: "#5A6178", fontSize: "0.6rem" }}>
            {c.name}
          </span>
        </div>
      ))}

      {/* Vet pins */}
      {vets.map((vet) => (
        <button
          key={vet.id}
          className="absolute z-10 transition-all duration-200"
          style={{
            left: `${vet.mapX}%`,
            top: `${vet.mapY}%`,
            transform: "translate(-50%, -100%)",
          }}
          onClick={() => setActivePin(activePin === vet.id ? null : vet.id)}
        >
          <div
            className="relative flex flex-col items-center"
            style={{ filter: activePin === vet.id ? "drop-shadow(0 4px 8px rgba(0,0,0,0.3))" : "none" }}
          >
            {/* Pin */}
            <div
              className="w-9 h-9 rounded-full border-3 border-white shadow-lg flex items-center justify-center overflow-hidden transition-transform duration-200 hover:scale-110"
              style={{
                backgroundColor: vet.available ? "#27AE60" : "#E67E22",
                borderWidth: "3px",
                borderStyle: "solid",
                borderColor: "#fff",
                transform: activePin === vet.id ? "scale(1.2)" : "scale(1)",
              }}
            >
              <ImageWithFallback
                src={vet.img}
                alt={vet.name}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Pin tail */}
            <div
              className="w-0 h-0"
              style={{
                borderLeft: "6px solid transparent",
                borderRight: "6px solid transparent",
                borderTop: `8px solid ${vet.available ? "#27AE60" : "#E67E22"}`,
              }}
            />
          </div>
        </button>
      ))}

      {/* Popup card */}
      {activeVet && (
        <div
          className="absolute z-20 rounded-2xl shadow-2xl overflow-hidden"
          style={{
            left: `${Math.min(activeVet.mapX + 5, 55)}%`,
            top: `${Math.max(activeVet.mapY - 38, 5)}%`,
            width: "240px",
            backgroundColor: "#fff",
            border: "1px solid #E8ECF1",
          }}
        >
          <div className="flex gap-3 p-3">
            <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
              <ImageWithFallback src={activeVet.img} alt={activeVet.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm truncate" style={{ color: "#1A1A2E", fontWeight: 700 }}>{activeVet.name}</p>
              <p className="text-xs" style={{ color: "#2E86C1" }}>{activeVet.specialty}</p>
              <p className="text-xs" style={{ color: "#8E94A7" }}>{activeVet.city}</p>
            </div>
            <button onClick={() => setActivePin(null)}>
              <X size={14} style={{ color: "#8E94A7" }} />
            </button>
          </div>
          <div className="px-3 pb-2 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <StarRating rating={activeVet.rating} size={11} />
              <span className="text-xs" style={{ color: "#1A1A2E", fontWeight: 600 }}>{activeVet.rating}</span>
            </div>
            <span
              className="text-xs px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: activeVet.available ? "#EAFAF1" : "#FEF9E7",
                color: activeVet.available ? "#27AE60" : "#E67E22",
              }}
            >
              {activeVet.available ? "Available" : "Busy"}
            </span>
          </div>
          <div className="px-3 pb-3 grid grid-cols-2 gap-1.5">
            <Link
              to={`/vetconnect/vet/${activeVet.id}`}
              className="py-2 rounded-lg text-xs text-center border font-medium"
              style={{ color: "#1B4F72", borderColor: "#1B4F72" }}
            >
              Profile
            </Link>
            <Link
              to={`/vetconnect/vet/${activeVet.id}`}
              className="py-2 rounded-lg text-xs text-center font-medium text-white"
              style={{ backgroundColor: "#E67E22" }}
            >
              Book Now
            </Link>
          </div>
        </div>
      )}

      {/* Legend */}
      <div
        className="absolute bottom-4 right-4 rounded-xl p-3 shadow-md text-xs space-y-1.5"
        style={{ backgroundColor: "#fff", border: "1px solid #E8ECF1" }}
      >
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#27AE60" }} />
          <span style={{ color: "#5A6178" }}>Available today</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#E67E22" }} />
          <span style={{ color: "#5A6178" }}>Next available</span>
        </div>
      </div>

      {/* Click instruction */}
      {!activePin && (
        <div
          className="absolute bottom-4 left-4 rounded-xl px-3 py-2 text-xs"
          style={{ backgroundColor: "rgba(27,79,114,0.85)", color: "#fff" }}
        >
          Click a pin to view vet details
        </div>
      )}
    </div>
  );
}

// ─── SIDEBAR ─────────────────────────────────────────────────────────────────
interface SidebarProps {
  selectedSpecialties: string[];
  onSpecialtyToggle: (s: string) => void;
  selectedCity: string;
  onCityChange: (c: string) => void;
  minRating: number;
  onRatingChange: (r: number) => void;
  availableOnly: boolean;
  onAvailableOnly: (v: boolean) => void;
  onlineOnly: boolean;
  onOnlineOnly: (v: boolean) => void;
  genderPref: string;
  onGenderPref: (g: string) => void;
  minExp: number;
  onMinExp: (e: number) => void;
  onClearAll: () => void;
}

function Sidebar({
  selectedSpecialties, onSpecialtyToggle,
  selectedCity, onCityChange,
  minRating, onRatingChange,
  availableOnly, onAvailableOnly,
  onlineOnly, onOnlineOnly,
  genderPref, onGenderPref,
  minExp, onMinExp,
  onClearAll,
}: SidebarProps) {
  return (
    <div
      className="rounded-2xl border p-5 space-y-6 sticky"
      style={{ backgroundColor: "#fff", borderColor: "#E8ECF1", top: "6.5rem" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm" style={{ color: "#1A1A2E", fontWeight: 700 }}>
          Filters
        </h3>
        <button
          onClick={onClearAll}
          className="text-xs transition-colors"
          style={{ color: "#E67E22" }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#D35400")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#E67E22")}
        >
          Clear All
        </button>
      </div>

      {/* Specialty */}
      <div>
        <p className="text-xs mb-3" style={{ color: "#1A1A2E", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
          Specialty
        </p>
        <div className="space-y-2">
          {SPECIALTIES_LIST.map((s) => (
            <label key={s} className="flex items-center gap-2.5 cursor-pointer group">
              <div
                className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0 border transition-all"
                style={{
                  backgroundColor: selectedSpecialties.includes(s) ? "#1B4F72" : "#fff",
                  borderColor: selectedSpecialties.includes(s) ? "#1B4F72" : "#D0D5DD",
                }}
                onClick={() => onSpecialtyToggle(s)}
              >
                {selectedSpecialties.includes(s) && (
                  <CheckCircle size={10} className="text-white" />
                )}
              </div>
              <span
                className="text-sm transition-colors"
                style={{ color: selectedSpecialties.includes(s) ? "#1B4F72" : "#5A6178" }}
                onClick={() => onSpecialtyToggle(s)}
              >
                {s}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Location */}
      <div>
        <p className="text-xs mb-3" style={{ color: "#1A1A2E", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
          Location
        </p>
        <select
          value={selectedCity}
          onChange={(e) => onCityChange(e.target.value)}
          className="w-full rounded-xl border px-3 py-2.5 text-sm outline-none mb-2"
          style={{ borderColor: "#E8ECF1", color: "#5A6178", backgroundColor: "#FAFBFD" }}
        >
          {CITIES.map((c) => <option key={c}>{c}</option>)}
        </select>
        <button
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm border transition-all"
          style={{ color: "#1B4F72", borderColor: "#1B4F72" }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "#EBF5FB")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent")}
        >
          <Navigation size={14} />
          Near Me
        </button>
      </div>

      {/* Rating */}
      <div>
        <p className="text-xs mb-3" style={{ color: "#1A1A2E", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
          Minimum Rating
        </p>
        <div className="space-y-2">
          {[
            { val: 0, label: "Any rating" },
            { val: 5, label: "5 Stars only" },
            { val: 4, label: "4+ Stars" },
            { val: 3, label: "3+ Stars" },
          ].map(({ val, label }) => (
            <label key={val} className="flex items-center gap-2.5 cursor-pointer" onClick={() => onRatingChange(val)}>
              <div
                className="w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 transition-all"
                style={{
                  borderColor: minRating === val ? "#1B4F72" : "#D0D5DD",
                  backgroundColor: minRating === val ? "#1B4F72" : "#fff",
                }}
              >
                {minRating === val && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
              </div>
              <span className="text-sm" style={{ color: "#5A6178" }}>{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Availability toggles */}
      <div>
        <p className="text-xs mb-3" style={{ color: "#1A1A2E", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
          Availability
        </p>
        <div className="space-y-2.5">
          {[
            { label: "Available Today", val: availableOnly, onChange: onAvailableOnly, icon: Calendar },
            { label: "Online Consultation", val: onlineOnly, onChange: onOnlineOnly, icon: Video },
          ].map(({ label, val, onChange, icon: Icon }) => (
            <div key={label} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon size={14} style={{ color: "#8E94A7" }} />
                <span className="text-sm" style={{ color: "#5A6178" }}>{label}</span>
              </div>
              <button
                onClick={() => onChange(!val)}
                className="relative w-10 h-5 rounded-full transition-all duration-200"
                style={{ backgroundColor: val ? "#27AE60" : "#D0D5DD" }}
              >
                <div
                  className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all duration-200"
                  style={{ left: val ? "calc(100% - 18px)" : "2px" }}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Gender */}
      <div>
        <p className="text-xs mb-3" style={{ color: "#1A1A2E", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
          Gender Preference
        </p>
        <div className="grid grid-cols-3 gap-1.5">
          {["Any", "Male", "Female"].map((g) => (
            <button
              key={g}
              onClick={() => onGenderPref(g)}
              className="py-2 rounded-xl text-xs font-medium transition-all"
              style={{
                backgroundColor: genderPref === g ? "#1B4F72" : "#FAFBFD",
                color: genderPref === g ? "#fff" : "#5A6178",
                border: `1px solid ${genderPref === g ? "#1B4F72" : "#E8ECF1"}`,
              }}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div>
        <p className="text-xs mb-3" style={{ color: "#1A1A2E", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
          Experience
        </p>
        <div className="grid grid-cols-2 gap-1.5">
          {[
            { val: 0, label: "Any" },
            { val: 5, label: "5+ years" },
            { val: 10, label: "10+ years" },
            { val: 15, label: "15+ years" },
          ].map(({ val, label }) => (
            <button
              key={val}
              onClick={() => onMinExp(val)}
              className="py-2 rounded-xl text-xs font-medium transition-all"
              style={{
                backgroundColor: minExp === val ? "#EBF5FB" : "#FAFBFD",
                color: minExp === val ? "#2E86C1" : "#5A6178",
                border: `1px solid ${minExp === val ? "#2E86C1" : "#E8ECF1"}`,
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── PAGINATION ───────────────────────────────────────────────────────────────
function Pagination({ current, total, onChange }: { current: number; total: number; onChange: (p: number) => void }) {
  const pages = Array.from({ length: Math.min(total, 5) }, (_, i) => i + 1);
  return (
    <div className="flex items-center justify-center gap-1 mt-8">
      <button
        onClick={() => onChange(Math.max(1, current - 1))}
        disabled={current === 1}
        className="w-9 h-9 rounded-xl flex items-center justify-center border transition-all disabled:opacity-40"
        style={{ borderColor: "#E8ECF1", color: "#5A6178" }}
      >
        <ChevronLeft size={16} />
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className="w-9 h-9 rounded-xl text-sm font-medium transition-all"
          style={{
            backgroundColor: current === p ? "#1B4F72" : "#fff",
            color: current === p ? "#fff" : "#5A6178",
            border: `1px solid ${current === p ? "#1B4F72" : "#E8ECF1"}`,
          }}
        >
          {p}
        </button>
      ))}

      {total > 5 && (
        <>
          <span className="px-1 text-sm" style={{ color: "#8E94A7" }}>...</span>
          <button
            onClick={() => onChange(total)}
            className="w-9 h-9 rounded-xl text-sm"
            style={{ color: "#5A6178", border: "1px solid #E8ECF1" }}
          >
            {total}
          </button>
        </>
      )}

      <button
        onClick={() => onChange(Math.min(total, current + 1))}
        disabled={current === total}
        className="w-9 h-9 rounded-xl flex items-center justify-center border transition-all disabled:opacity-40"
        style={{ borderColor: "#E8ECF1", color: "#5A6178" }}
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export function FindVetPage() {
  const [search, setSearch] = useState("");
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [selectedSpecialtyBar, setSelectedSpecialtyBar] = useState("All");
  const [selectedRatingBar, setSelectedRatingBar] = useState("Any");
  const [sortBy, setSortBy] = useState("relevance");
  const [viewMode, setViewMode] = useState<"list" | "grid" | "map">("list");
  const [page, setPage] = useState(1);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Sidebar state
  const [sideSpecialties, setSideSpecialties] = useState<string[]>([]);
  const [sideCity, setSideCity] = useState("All Cities");
  const [sideMinRating, setSideMinRating] = useState(0);
  const [availableOnly, setAvailableOnly] = useState(false);
  const [onlineOnly, setOnlineOnly] = useState(false);
  const [genderPref, setGenderPref] = useState("Any");
  const [minExp, setMinExp] = useState(0);

  const toggleSpecialty = (s: string) => {
    setSideSpecialties((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  };

  const clearAll = () => {
    setSearch("");
    setSelectedCity("All Cities");
    setSelectedSpecialtyBar("All");
    setSelectedRatingBar("Any");
    setSortBy("relevance");
    setSideSpecialties([]);
    setSideCity("All Cities");
    setSideMinRating(0);
    setAvailableOnly(false);
    setOnlineOnly(false);
    setGenderPref("Any");
    setMinExp(0);
    setPage(1);
  };

  const effectiveCity = selectedCity !== "All Cities" ? selectedCity : sideCity !== "All Cities" ? sideCity : null;

  const filtered = useMemo(() => {
    return ALL_VETS.filter((v) => {
      if (search) {
        const q = search.toLowerCase();
        if (!v.name.toLowerCase().includes(q) &&
          !v.clinic.toLowerCase().includes(q) &&
          !v.specialty.toLowerCase().includes(q) &&
          !v.city.toLowerCase().includes(q)) return false;
      }
      if (effectiveCity && v.city !== effectiveCity) return false;
      if (selectedSpecialtyBar !== "All" && v.specialty !== selectedSpecialtyBar) return false;
      if (sideSpecialties.length > 0 && !sideSpecialties.includes(v.specialty)) return false;
      if (availableOnly && !v.available) return false;
      if (onlineOnly && !v.onlineConsult) return false;
      if (genderPref !== "Any" && v.gender !== genderPref) return false;
      if (minExp > 0 && v.experience < minExp) return false;
      const ratingFilter = sideMinRating > 0 ? sideMinRating : selectedRatingBar === "5 Stars" ? 5 : selectedRatingBar === "4+ Stars" ? 4 : selectedRatingBar === "3+ Stars" ? 3 : 0;
      if (ratingFilter > 0 && v.rating < ratingFilter) return false;
      return true;
    });
  }, [search, effectiveCity, selectedSpecialtyBar, sideSpecialties, availableOnly, onlineOnly, genderPref, minExp, sideMinRating, selectedRatingBar]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "reviews") return b.reviews - a.reviews;
      if (sortBy === "fee_asc") return a.fee - b.fee;
      return 0;
    });
  }, [filtered, sortBy]);

  const PER_PAGE = viewMode === "grid" ? 9 : 8;
  const totalPages = Math.ceil(sorted.length / PER_PAGE);
  const paginated = sorted.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const activeFilterCount = [
    selectedCity !== "All Cities",
    selectedSpecialtyBar !== "All",
    selectedRatingBar !== "Any",
    sideSpecialties.length > 0,
    availableOnly,
    onlineOnly,
    genderPref !== "Any",
    minExp > 0,
    sideMinRating > 0,
  ].filter(Boolean).length;

  return (
    <div style={{ backgroundColor: "#FAFBFD", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      {/* ── HERO BANNER ─────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-12 lg:py-16"
        style={{ background: "linear-gradient(135deg, #0D2F4F 0%, #1B4F72 60%, #2874A6 100%)" }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-10 -right-10 w-64 h-64 rounded-full opacity-10" style={{ backgroundColor: "#E67E22" }} />
          <div className="absolute bottom-0 left-1/4 w-48 h-48 rounded-full opacity-5" style={{ backgroundColor: "#F39C12" }} />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div
            className="inline-flex items-center gap-2 text-xs px-4 py-1.5 rounded-full mb-4"
            style={{ backgroundColor: "rgba(255,255,255,0.12)", color: "#AED6F1", border: "1px solid rgba(255,255,255,0.2)" }}
          >
            <CheckCircle size={12} style={{ color: "#6FEEA6" }} />
            All vets verified by PVMA
          </div>
          <h1
            className="text-white mb-3"
            style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(1.8rem, 5vw, 2.8rem)", fontWeight: 400 }}
          >
            Find a Veterinarian
          </h1>
          <p style={{ color: "#AED6F1", fontSize: "1rem", lineHeight: 1.6 }}>
            Browse 500+ verified veterinary professionals across Pakistan
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-8">
            <path d="M0,40 C360,0 1080,0 1440,40 L1440,40 L0,40 Z" fill="#FAFBFD" />
          </svg>
        </div>
      </section>

      {/* ── STICKY SEARCH BAR ────────────────────────────────────── */}
      <div
        className="sticky z-40 border-b shadow-sm"
        style={{ top: "88px", backgroundColor: "#fff", borderColor: "#E8ECF1" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col lg:flex-row gap-3 items-start lg:items-center">
            {/* Search input — full width on mobile */}
            <div
              className="flex items-center gap-2 w-full lg:flex-1 rounded-xl px-4 py-3 border"
              style={{ borderColor: "#E8ECF1", backgroundColor: "#FAFBFD", minWidth: 0 }}
            >
              <Search size={16} style={{ color: "#8E94A7", flexShrink: 0 }} />
              <input
                type="text"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                placeholder="Search by vet name or clinic..."
                className="flex-1 bg-transparent text-sm outline-none"
                style={{ color: "#1A1A2E" }}
              />
              {search && (
                <button onClick={() => setSearch("")}>
                  <X size={14} style={{ color: "#8E94A7" }} />
                </button>
              )}
            </div>

            {/* Filter row — desktop only */}
            <div className="hidden lg:flex flex-wrap gap-2 items-center">
              {/* City */}
              <select
                value={selectedCity}
                onChange={(e) => { setSelectedCity(e.target.value); setPage(1); }}
                className="rounded-xl px-3 py-2.5 text-sm border outline-none cursor-pointer"
                style={{ borderColor: "#E8ECF1", color: "#5A6178", backgroundColor: "#FAFBFD" }}
              >
                <option value="All Cities">All Cities</option>
                {CITIES.slice(1).map((c) => <option key={c}>{c}</option>)}
              </select>

              {/* Specialty */}
              <select
                value={selectedSpecialtyBar}
                onChange={(e) => { setSelectedSpecialtyBar(e.target.value); setPage(1); }}
                className="rounded-xl px-3 py-2.5 text-sm border outline-none cursor-pointer"
                style={{ borderColor: "#E8ECF1", color: "#5A6178", backgroundColor: "#FAFBFD" }}
              >
                <option value="All">All Specialties</option>
                {SPECIALTIES_LIST.map((s) => <option key={s}>{s}</option>)}
              </select>

              {/* Rating */}
              <select
                value={selectedRatingBar}
                onChange={(e) => { setSelectedRatingBar(e.target.value); setPage(1); }}
                className="rounded-xl px-3 py-2.5 text-sm border outline-none cursor-pointer"
                style={{ borderColor: "#E8ECF1", color: "#5A6178", backgroundColor: "#FAFBFD" }}
              >
                {RATING_OPTIONS.map((r) => <option key={r}>{r}</option>)}
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-xl px-3 py-2.5 text-sm border outline-none cursor-pointer"
                style={{ borderColor: "#E8ECF1", color: "#5A6178", backgroundColor: "#FAFBFD" }}
              >
                {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>

              {/* Search button */}
              <button
                className="px-5 py-2.5 rounded-xl text-sm text-white font-medium transition-all flex-shrink-0"
                style={{ backgroundColor: "#1B4F72" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "#0D2F4F")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "#1B4F72")}
              >
                Search
              </button>
            </div>

            {/* Mobile: Filters button + sort */}
            <div className="flex lg:hidden w-full gap-2">
              <button
                onClick={() => setShowMobileFilters(true)}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl text-sm border relative"
                style={{ borderColor: "#1B4F72", color: "#1B4F72", backgroundColor: "#EBF5FB", minHeight: "48px" }}
              >
                <Filter size={15} />
                <span style={{ fontWeight: 600 }}>Filters</span>
                {activeFilterCount > 0 && (
                  <span
                    className="w-5 h-5 rounded-full text-white flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "#E67E22", fontSize: "0.65rem", fontWeight: 700 }}
                  >
                    {activeFilterCount}
                  </span>
                )}
              </button>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="flex-1 rounded-xl px-3 text-sm border outline-none cursor-pointer"
                style={{ borderColor: "#E8ECF1", color: "#5A6178", backgroundColor: "#FAFBFD", minHeight: "48px" }}
              >
                {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          </div>

          {/* Results count + view mode */}
          <div className="flex items-center justify-between mt-3">
            <p className="text-sm" style={{ color: "#8E94A7" }}>
              Showing{" "}
              <span style={{ color: "#1A1A2E", fontWeight: 700 }}>{sorted.length}</span>
              {" "}veterinarians
              {activeFilterCount > 0 && (
                <button onClick={clearAll} className="ml-2 text-xs" style={{ color: "#E67E22" }}>
                  · Clear filters
                </button>
              )}
            </p>

            {/* View mode toggle — hidden on mobile (forced list) */}
            <div
              className="hidden sm:flex items-center rounded-xl border p-1 gap-0.5"
              style={{ borderColor: "#E8ECF1", backgroundColor: "#FAFBFD" }}
            >
              {[
                { mode: "list" as const, Icon: List, label: "List" },
                { mode: "grid" as const, Icon: LayoutGrid, label: "Grid" },
                { mode: "map" as const, Icon: Map, label: "Map" },
              ].map(({ mode, Icon, label }) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                  style={{
                    backgroundColor: viewMode === mode ? "#1B4F72" : "transparent",
                    color: viewMode === mode ? "#fff" : "#8E94A7",
                  }}
                  title={label}
                >
                  <Icon size={14} />
                  <span className="hidden sm:inline">{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── MOBILE FILTER BOTTOM SHEET ─────────────────────────── */}
      <div
        className={`lg:hidden fixed inset-0 z-50 transition-opacity duration-300 ${showMobileFilters ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        style={{ backgroundColor: "rgba(0,0,0,0.55)", backdropFilter: "blur(3px)" }}
        onClick={() => setShowMobileFilters(false)}
      />
      <div
        className={`lg:hidden fixed left-0 right-0 bottom-0 z-50 rounded-t-3xl flex flex-col transition-transform duration-300 ease-out ${showMobileFilters ? "translate-y-0" : "translate-y-full"}`}
        style={{ backgroundColor: "#fff", maxHeight: "88vh", boxShadow: "0 -8px 40px rgba(0,0,0,0.2)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
          <div className="w-10 h-1 rounded-full" style={{ backgroundColor: "#D0D5DD" }} />
        </div>
        <div className="flex items-center justify-between px-5 py-3 flex-shrink-0" style={{ borderBottom: "1px solid #F0F4F8" }}>
          <h3 style={{ color: "#1A1A2E", fontWeight: 700, fontSize: "1rem" }}>Filter Veterinarians</h3>
          <div className="flex items-center gap-3">
            {activeFilterCount > 0 && (
              <button onClick={() => { clearAll(); }} className="text-xs font-semibold" style={{ color: "#E67E22" }}>
                Clear All
              </button>
            )}
            <button
              onClick={() => setShowMobileFilters(false)}
              className="w-7 h-7 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#F0F4F8", color: "#5A6178" }}
            >
              <X size={14} />
            </button>
          </div>
        </div>
        <div className="overflow-y-auto flex-1 px-5 py-4">
          <Sidebar
            selectedSpecialties={sideSpecialties}
            onSpecialtyToggle={(s) => { toggleSpecialty(s); setPage(1); }}
            selectedCity={sideCity}
            onCityChange={(c) => { setSideCity(c); setPage(1); }}
            minRating={sideMinRating}
            onRatingChange={(r) => { setSideMinRating(r); setPage(1); }}
            availableOnly={availableOnly}
            onAvailableOnly={(v) => { setAvailableOnly(v); setPage(1); }}
            onlineOnly={onlineOnly}
            onOnlineOnly={(v) => { setOnlineOnly(v); setPage(1); }}
            genderPref={genderPref}
            onGenderPref={(g) => { setGenderPref(g); setPage(1); }}
            minExp={minExp}
            onMinExp={(e) => { setMinExp(e); setPage(1); }}
            onClearAll={clearAll}
          />
        </div>
        <div className="px-5 py-4 flex-shrink-0" style={{ borderTop: "1px solid #F0F4F8" }}>
          <button
            onClick={() => setShowMobileFilters(false)}
            className="w-full py-4 rounded-2xl text-white font-semibold"
            style={{ backgroundColor: "#1B4F72", minHeight: "52px" }}
          >
            Show {sorted.length} Veterinarians
          </button>
        </div>
      </div>

      {/* ── MAIN CONTENT ─────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7">
        <div className="flex gap-6">

          {/* Sidebar (desktop) */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <Sidebar
              selectedSpecialties={sideSpecialties}
              onSpecialtyToggle={(s) => { toggleSpecialty(s); setPage(1); }}
              selectedCity={sideCity}
              onCityChange={(c) => { setSideCity(c); setPage(1); }}
              minRating={sideMinRating}
              onRatingChange={(r) => { setSideMinRating(r); setPage(1); }}
              availableOnly={availableOnly}
              onAvailableOnly={(v) => { setAvailableOnly(v); setPage(1); }}
              onlineOnly={onlineOnly}
              onOnlineOnly={(v) => { setOnlineOnly(v); setPage(1); }}
              genderPref={genderPref}
              onGenderPref={(g) => { setGenderPref(g); setPage(1); }}
              minExp={minExp}
              onMinExp={(e) => { setMinExp(e); setPage(1); }}
              onClearAll={clearAll}
            />
          </aside>

          {/* Main listing */}
          <div className="flex-1 min-w-0">

            {/* Map view */}
            {viewMode === "map" ? (
              <MapView vets={sorted} />
            ) : sorted.length === 0 ? (
              <div
                className="rounded-2xl border text-center py-20"
                style={{ backgroundColor: "#fff", borderColor: "#E8ECF1" }}
              >
                <div className="text-4xl mb-3">🔍</div>
                <h3 className="mb-2" style={{ color: "#1A1A2E", fontWeight: 700 }}>
                  No veterinarians found
                </h3>
                <p className="text-sm mb-5" style={{ color: "#8E94A7" }}>
                  Try adjusting your filters or search term
                </p>
                <button
                  onClick={clearAll}
                  className="px-6 py-2.5 rounded-xl text-sm text-white font-medium"
                  style={{ backgroundColor: "#1B4F72" }}
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <>
                {/* List view */}
                {viewMode === "list" && (
                  <div className="space-y-4">
                    {paginated.map((vet) => (
                      <VetCardList key={vet.id} vet={vet} />
                    ))}
                  </div>
                )}

                {/* Grid view */}
                {viewMode === "grid" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                    {paginated.map((vet) => (
                      <VetCardGrid key={vet.id} vet={vet} />
                    ))}
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <Pagination current={page} total={totalPages} onChange={setPage} />
                )}

                {/* Total count indicator */}
                <p className="text-center text-xs mt-4" style={{ color: "#8E94A7" }}>
                  Showing {Math.min(paginated.length, sorted.length)} of {sorted.length} results
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}