import { useState, useRef } from "react";
import { Link, useParams } from "react-router";
import {
  Check, ChevronLeft, ChevronRight, Calendar, Clock, MapPin,
  Camera, Share2, PlusCircle, CheckCircle, Upload, Star,
  AlertCircle, Stethoscope, Phone, MessageCircle, Download,
} from "lucide-react";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const TODAY = { day: 27, month: 3, year: 2026 }; // April 27, 2026 (month 0-indexed)

const DR_AHMED = {
  name: "Dr. Ahmed Khan, DVM",
  specialty: "Small Animal Surgery",
  clinic: "PetCare Veterinary Hospital",
  area: "Model Town, Lahore",
  rating: 4.9,
  reviews: 128,
  fee: 1500,
  avatar:
    "https://images.unsplash.com/photo-1756699279298-c89cdef354ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwdmV0ZXJpbmFyaWFuJTIwZG9jdG9yJTIwcHJvZmVzc2lvbmFsJTIwcG9ydHJhaXQlMjBzbWlsaW5nJTIwd2hpdGUlMjBjb2F0fGVufDF8fHx8MTc3NzI3MDUxMXww&ixlib=rb-4.1.0&q=80&w=200",
};

const PETS = [
  { id: "1", name: "Max", species: "Golden Retriever", emoji: "🐕", age: "3 yrs", color: "#FEF3E8" },
  { id: "2", name: "Whiskers", species: "Persian Cat", emoji: "🐈", age: "5 yrs", color: "#EBF5FB" },
  { id: "3", name: "Tweety", species: "Parrot", emoji: "🦜", age: "2 yrs", color: "#EAFAF1" },
];

const VISIT_TYPES = [
  { id: "checkup", label: "General Checkup", icon: "🩺", fee: 1500 },
  { id: "vaccination", label: "Vaccination", icon: "💉", fee: 800 },
  { id: "followup", label: "Follow-up", icon: "📋", fee: 700 },
  { id: "surgery", label: "Surgery Consultation", icon: "🔬", fee: 3000 },
  { id: "emergency", label: "Emergency", icon: "🚨", fee: 2500 },
  { id: "other", label: "Other", icon: "📝", fee: 1500 },
];

const MORNING_SLOTS = ["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM"];
const AFTERNOON_SLOTS = ["12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM"];
const EVENING_SLOTS = ["5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM"];
const ALL_SLOTS = [...MORNING_SLOTS, ...AFTERNOON_SLOTS, ...EVENING_SLOTS];

// Deterministic booked slots based on day — gives realistic pattern
function getBookedSlots(day: number): Set<string> {
  return new Set(ALL_SLOTS.filter((_, i) => ((i * 7 + day * 11) % 17) < 5));
}

// Fully booked dates (no slots available)
const FULLY_BOOKED_MAY = new Set([3, 10, 17, 24, 31]);
const FULLY_BOOKED_JUNE = new Set([7, 14, 21]);

function isFullyBooked(day: number, month: number): boolean {
  if (month === 4) return FULLY_BOOKED_MAY.has(day); // May
  if (month === 5) return FULLY_BOOKED_JUNE.has(day); // June
  return false;
}

function isPastDate(day: number, month: number, year: number): boolean {
  if (year < TODAY.year) return true;
  if (year === TODAY.year && month < TODAY.month) return true;
  if (year === TODAY.year && month === TODAY.month && day <= TODAY.day) return true;
  return false;
}

function isToday(day: number, month: number, year: number): boolean {
  return day === TODAY.day && month === TODAY.month && year === TODAY.year;
}

function formatDate(d: { day: number; month: number; year: number }): string {
  const date = new Date(d.year, d.month, d.day);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatDateShort(d: { day: number; month: number; year: number }): string {
  const date = new Date(d.year, d.month, d.day);
  return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

const MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAY_LABELS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

// ─── PROGRESS STEPPER ─────────────────────────────────────────────────────────
const STEPS = [
  { num: 1, label: "Select Vet" },
  { num: 2, label: "Date & Time" },
  { num: 3, label: "Pet Details" },
  { num: 4, label: "Confirm" },
];

function ProgressStepper({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex items-start w-full max-w-lg mx-auto px-1 sm:px-2">
      {STEPS.map((step, idx) => (
        <div key={step.num} className="flex items-center flex-1 last:flex-none">
          <div className="flex flex-col items-center">
            <div
              className="w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0"
              style={{
                backgroundColor:
                  step.num < currentStep
                    ? "#27AE60"
                    : step.num === currentStep
                    ? "#1B4F72"
                    : "#E8ECF1",
                boxShadow:
                  step.num === currentStep
                    ? "0 0 0 4px rgba(27,79,114,0.15)"
                    : "none",
              }}
            >
              {step.num < currentStep ? (
                <Check size={16} color="#fff" strokeWidth={2.5} />
              ) : (
                <span
                  style={{
                    color: step.num <= currentStep ? "#fff" : "#8E94A7",
                    fontWeight: 700,
                    fontSize: "0.8rem",
                  }}
                >
                  {step.num}
                </span>
              )}
            </div>
            <span
              className="mt-1.5 text-center whitespace-nowrap hidden sm:block"
              style={{
                fontSize: "0.68rem",
                fontWeight: step.num === currentStep ? 700 : 500,
                color:
                  step.num < currentStep
                    ? "#27AE60"
                    : step.num === currentStep
                    ? "#1B4F72"
                    : "#8E94A7",
              }}
            >
              {step.label}
            </span>
            <span
              className="mt-1 text-center sm:hidden"
              style={{
                fontSize: "0.55rem",
                fontWeight: 700,
                color: step.num === currentStep ? "#1B4F72" : "transparent",
                whiteSpace: "nowrap",
              }}
            >
              {step.label}
            </span>
          </div>
          {idx < STEPS.length - 1 && (
            <div
              className="flex-1 h-0.5 mx-1 sm:mx-2 mb-5 transition-all duration-500"
              style={{
                backgroundColor: step.num < currentStep ? "#27AE60" : "#E8ECF1",
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// ─── CALENDAR VIEW ────────────────────────────────────────────────────────────
function CalendarView({
  selectedDate,
  onSelect,
  calMonth,
  calYear,
  onPrevMonth,
  onNextMonth,
}: {
  selectedDate: { day: number; month: number; year: number } | null;
  onSelect: (d: { day: number; month: number; year: number }) => void;
  calMonth: number;
  calYear: number;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}) {
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const firstDay = new Date(calYear, calMonth, 1).getDay();

  const canGoPrev =
    calYear > TODAY.year ||
    (calYear === TODAY.year && calMonth > TODAY.month);

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div
      className="rounded-2xl p-5"
      style={{ backgroundColor: "#fff", border: "1px solid #E8ECF1" }}
    >
      {/* Month navigation */}
      <div className="flex items-center justify-between mb-5">
        <button
          onClick={onPrevMonth}
          disabled={!canGoPrev}
          className="w-9 h-9 rounded-xl flex items-center justify-center transition-all"
          style={{
            backgroundColor: canGoPrev ? "#F0F4F8" : "transparent",
            color: canGoPrev ? "#1B4F72" : "#C8CDD9",
            cursor: canGoPrev ? "pointer" : "not-allowed",
          }}
        >
          <ChevronLeft size={18} />
        </button>
        <div className="text-center">
          <p style={{ fontFamily: "'DM Serif Display', serif", color: "#0D2F4F", fontSize: "1.15rem" }}>
            {MONTH_NAMES[calMonth]}
          </p>
          <p style={{ color: "#8E94A7", fontSize: "0.75rem" }}>{calYear}</p>
        </div>
        <button
          onClick={onNextMonth}
          className="w-9 h-9 rounded-xl flex items-center justify-center transition-all"
          style={{ backgroundColor: "#F0F4F8", color: "#1B4F72" }}
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 mb-2">
        {DAY_LABELS.map((d) => (
          <div
            key={d}
            className="text-center"
            style={{ color: "#8E94A7", fontSize: "0.7rem", fontWeight: 600 }}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Date grid */}
      <div className="grid grid-cols-7 gap-y-1.5">
        {cells.map((day, idx) => {
          if (!day) return <div key={`e-${idx}`} />;
          const past = isPastDate(day, calMonth, calYear);
          const fullyBooked = !past && isFullyBooked(day, calMonth);
          const today = isToday(day, calMonth, calYear);
          const isSel =
            selectedDate?.day === day &&
            selectedDate?.month === calMonth &&
            selectedDate?.year === calYear;
          const isWeekend = new Date(calYear, calMonth, day).getDay() === 0;
          const limited = isWeekend && !past && !fullyBooked; // Sundays = limited

          return (
            <button
              key={day}
              disabled={past || fullyBooked}
              onClick={() => onSelect({ day, month: calMonth, year: calYear })}
              className="relative flex items-center justify-center mx-auto rounded-full transition-all duration-150"
              style={{
                width: "38px",
                height: "38px",
                backgroundColor: isSel
                  ? "#1B4F72"
                  : limited && !isSel
                  ? "transparent"
                  : "transparent",
                color: isSel
                  ? "#fff"
                  : past || fullyBooked
                  ? "#C8CDD9"
                  : "#1A1A2E",
                cursor: past || fullyBooked ? "not-allowed" : "pointer",
                fontWeight: isSel ? 700 : today ? 700 : 400,
                fontSize: "0.85rem",
                border: !isSel && !past && !fullyBooked
                  ? limited
                    ? "1.5px dashed #AED6F1"
                    : "1.5px solid transparent"
                  : "1.5px solid transparent",
                boxShadow: isSel
                  ? "0 4px 12px rgba(27,79,114,0.3)"
                  : "none",
              }}
              onMouseEnter={(e) => {
                if (!isSel && !past && !fullyBooked) {
                  e.currentTarget.style.backgroundColor = "#EBF5FB";
                  e.currentTarget.style.color = "#1B4F72";
                }
              }}
              onMouseLeave={(e) => {
                if (!isSel) {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = past || fullyBooked ? "#C8CDD9" : "#1A1A2E";
                }
              }}
            >
              {day}
              {/* Today dot */}
              {today && !isSel && (
                <span
                  className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: "#E67E22" }}
                />
              )}
              {/* Fully booked marker */}
              {fullyBooked && (
                <span
                  className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: "#E74C3C" }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 mt-4 pt-4" style={{ borderTop: "1px solid #F0F4F8" }}>
        {[
          { color: "#1B4F72", label: "Selected" },
          { color: "#E8ECF1", label: "Available", text: "#5A6178" },
          { color: "#E74C3C", label: "Fully booked", dot: true },
          { color: "#AED6F1", label: "Limited (Sun)", dashed: true },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-1.5">
            {item.dashed ? (
              <div
                className="w-4 h-4 rounded-full"
                style={{ border: "1.5px dashed #AED6F1" }}
              />
            ) : item.dot ? (
              <div className="relative w-4 h-4 rounded-full flex items-center justify-center" style={{ backgroundColor: "#F0F4F8" }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#E74C3C" }} />
              </div>
            ) : (
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }} />
            )}
            <span style={{ color: "#8E94A7", fontSize: "0.7rem" }}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── TIME SLOTS ───────────────────────────────────────────────────────────────
function TimeSlotPicker({
  selectedDate,
  selectedTime,
  onSelect,
}: {
  selectedDate: { day: number; month: number; year: number } | null;
  selectedTime: string | null;
  onSelect: (t: string) => void;
}) {
  const booked = selectedDate ? getBookedSlots(selectedDate.day) : new Set<string>();

  const SlotGroup = ({
    title,
    icon,
    slots,
  }: {
    title: string;
    icon: string;
    slots: string[];
  }) => (
    <div className="mb-5">
      <div className="flex items-center gap-2 mb-3">
        <span style={{ fontSize: "1rem" }}>{icon}</span>
        <span style={{ color: "#5A6178", fontSize: "0.8rem", fontWeight: 600 }}>{title}</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {slots.map((slot) => {
          const isBooked = booked.has(slot);
          const isSel = selectedTime === slot;
          return (
            <button
              key={slot}
              disabled={isBooked || !selectedDate}
              onClick={() => onSelect(slot)}
              className="py-2 rounded-xl text-xs font-medium transition-all duration-150"
              style={{
                backgroundColor: isSel ? "#1B4F72" : isBooked ? "#F8FAFC" : "#EBF5FB",
                color: isSel ? "#fff" : isBooked ? "#C8CDD9" : "#1B4F72",
                border: isSel
                  ? "1.5px solid #1B4F72"
                  : isBooked
                  ? "1.5px solid #F0F4F8"
                  : "1.5px solid #AED6F1",
                cursor: isBooked || !selectedDate ? "not-allowed" : "pointer",
                textDecoration: isBooked ? "line-through" : "none",
                boxShadow: isSel ? "0 2px 8px rgba(27,79,114,0.25)" : "none",
              }}
            >
              {slot}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div
      className="rounded-2xl p-5"
      style={{ backgroundColor: "#fff", border: "1px solid #E8ECF1" }}
    >
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#EBF5FB" }}>
          <Clock size={16} style={{ color: "#1B4F72" }} />
        </div>
        <div>
          <p style={{ color: "#1A1A2E", fontWeight: 700, fontSize: "0.9rem" }}>Available Times</p>
          {selectedDate ? (
            <p style={{ color: "#8E94A7", fontSize: "0.75rem" }}>
              {formatDateShort(selectedDate)}
            </p>
          ) : (
            <p style={{ color: "#E67E22", fontSize: "0.75rem" }}>Please select a date first</p>
          )}
        </div>
      </div>

      {!selectedDate ? (
        <div className="flex flex-col items-center justify-center py-10" style={{ color: "#C8CDD9" }}>
          <Calendar size={36} className="mb-3" />
          <p style={{ fontSize: "0.875rem" }}>Select a date to see available times</p>
        </div>
      ) : (
        <>
          <SlotGroup title="Morning  (9 AM – 12 PM)" icon="🌅" slots={MORNING_SLOTS} />
          <SlotGroup title="Afternoon  (12 PM – 5 PM)" icon="☀️" slots={AFTERNOON_SLOTS} />
          <SlotGroup title="Evening  (5 PM – 8 PM)" icon="🌆" slots={EVENING_SLOTS} />
        </>
      )}
    </div>
  );
}

// ─── STEP 2: DATE & TIME ──────────────────────────────────────────────────────
function Step2({
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
}: {
  selectedDate: { day: number; month: number; year: number } | null;
  setSelectedDate: (d: { day: number; month: number; year: number }) => void;
  selectedTime: string | null;
  setSelectedTime: (t: string) => void;
}) {
  const [calMonth, setCalMonth] = useState(4); // May
  const [calYear, setCalYear] = useState(2026);

  function prevMonth() {
    if (calMonth === 0) { setCalMonth(11); setCalYear(y => y - 1); }
    else setCalMonth(m => m - 1);
  }
  function nextMonth() {
    if (calMonth === 11) { setCalMonth(0); setCalYear(y => y + 1); }
    else setCalMonth(m => m + 1);
  }

  return (
    <div>
      <div className="mb-6">
        <h2 style={{ fontFamily: "'DM Serif Display', serif", color: "#0D2F4F", fontSize: "1.5rem" }}>
          Choose Date & Time
        </h2>
        <p style={{ color: "#8E94A7", fontSize: "0.875rem" }} className="mt-1">
          Select your preferred appointment slot with Dr. Ahmed Khan
        </p>
      </div>

      {/* Calendar + Slots */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3">
          <CalendarView
            selectedDate={selectedDate}
            onSelect={(d) => {
              setSelectedDate(d);
              setSelectedTime(null);
            }}
            calMonth={calMonth}
            calYear={calYear}
            onPrevMonth={prevMonth}
            onNextMonth={nextMonth}
          />
        </div>
        <div className="lg:col-span-2">
          <TimeSlotPicker
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            onSelect={setSelectedTime}
          />
        </div>
      </div>

      {/* Summary card */}
      {(selectedDate || selectedTime) && (
        <div
          className="mt-5 rounded-2xl p-4 flex items-center gap-4"
          style={{
            background: "linear-gradient(135deg, #EBF5FB, #E8F8F5)",
            border: "1px solid #AED6F1",
          }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: "#1B4F72" }}
          >
            <Calendar size={18} color="#fff" />
          </div>
          <div className="flex-1">
            <p style={{ color: "#1A1A2E", fontWeight: 700, fontSize: "0.9rem" }}>
              Dr. Ahmed Khan
            </p>
            <p style={{ color: "#1B4F72", fontSize: "0.8rem" }}>
              {selectedDate ? formatDate(selectedDate) : "Date not selected"}
              {selectedTime ? ` · ${selectedTime}` : " · Time not selected"}
            </p>
          </div>
          {selectedDate && selectedTime && (
            <span
              className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs"
              style={{ backgroundColor: "#EAFAF1", color: "#27AE60", fontWeight: 600 }}
            >
              <Check size={12} />
              Ready
            </span>
          )}
        </div>
      )}
    </div>
  );
}

// ─── STEP 3: PET & VISIT DETAILS ──────────────────────────────────────────────
function Step3({
  selectedPet,
  setSelectedPet,
  visitType,
  setVisitType,
  description,
  setDescription,
  uploadedFiles,
  setUploadedFiles,
}: {
  selectedPet: string | null;
  setSelectedPet: (p: string) => void;
  visitType: string;
  setVisitType: (v: string) => void;
  description: string;
  setDescription: (d: string) => void;
  uploadedFiles: File[];
  setUploadedFiles: (f: File[]) => void;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files).filter((f) =>
      f.type.startsWith("image/")
    );
    setUploadedFiles([...uploadedFiles, ...files].slice(0, 4));
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    setUploadedFiles([...uploadedFiles, ...files].slice(0, 4));
  }

  const visitFee = VISIT_TYPES.find((v) => v.id === visitType)?.fee ?? 1500;

  return (
    <div className="space-y-7">
      <div>
        <h2 style={{ fontFamily: "'DM Serif Display', serif", color: "#0D2F4F", fontSize: "1.5rem" }}>
          Pet & Visit Details
        </h2>
        <p style={{ color: "#8E94A7", fontSize: "0.875rem" }} className="mt-1">
          Tell us about your pet and reason for visit
        </p>
      </div>

      {/* Pet selection */}
      <section>
        <p style={{ color: "#1A1A2E", fontWeight: 700, fontSize: "0.9rem" }} className="mb-3">
          Select Pet
        </p>
        <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
          {PETS.map((pet) => {
            const isSel = selectedPet === pet.id;
            return (
              <button
                key={pet.id}
                onClick={() => setSelectedPet(pet.id)}
                className="flex-shrink-0 rounded-2xl p-4 text-center transition-all duration-200"
                style={{
                  backgroundColor: isSel ? "#EBF5FB" : "#fff",
                  border: isSel ? "2px solid #1B4F72" : "2px solid #E8ECF1",
                  width: "130px",
                  boxShadow: isSel ? "0 4px 16px rgba(27,79,114,0.15)" : "none",
                  transform: isSel ? "translateY(-2px)" : "none",
                }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-2"
                  style={{ backgroundColor: pet.color, fontSize: "1.8rem" }}
                >
                  {pet.emoji}
                </div>
                <p style={{ color: "#1A1A2E", fontWeight: 700, fontSize: "0.85rem" }}>{pet.name}</p>
                <p style={{ color: "#8E94A7", fontSize: "0.72rem" }}>{pet.species}</p>
                <p style={{ color: "#8E94A7", fontSize: "0.68rem" }}>{pet.age}</p>
                {isSel && (
                  <div className="mt-2 flex items-center justify-center">
                    <Check size={12} color="#1B4F72" />
                    <span style={{ color: "#1B4F72", fontSize: "0.68rem", fontWeight: 700, marginLeft: "3px" }}>Selected</span>
                  </div>
                )}
              </button>
            );
          })}

          {/* Add new pet */}
          <button
            className="flex-shrink-0 rounded-2xl p-4 text-center transition-all duration-200"
            style={{
              backgroundColor: "#F8FAFC",
              border: "2px dashed #C8CDD9",
              width: "130px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#1B4F72";
              e.currentTarget.style.backgroundColor = "#EBF5FB";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#C8CDD9";
              e.currentTarget.style.backgroundColor = "#F8FAFC";
            }}
          >
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-2" style={{ backgroundColor: "#F0F4F8" }}>
              <PlusCircle size={24} style={{ color: "#8E94A7" }} />
            </div>
            <p style={{ color: "#5A6178", fontSize: "0.8rem", fontWeight: 600 }}>Add New</p>
            <p style={{ color: "#8E94A7", fontSize: "0.72rem" }}>Pet profile</p>
          </button>
        </div>
      </section>

      {/* Visit type */}
      <section>
        <p style={{ color: "#1A1A2E", fontWeight: 700, fontSize: "0.9rem" }} className="mb-3">
          Visit Type
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {VISIT_TYPES.map((vt) => {
            const isSel = visitType === vt.id;
            return (
              <button
                key={vt.id}
                onClick={() => setVisitType(vt.id)}
                className="flex items-center gap-3 p-3.5 rounded-xl transition-all duration-150 text-left"
                style={{
                  backgroundColor: isSel ? "#EBF5FB" : "#fff",
                  border: isSel ? "2px solid #1B4F72" : "2px solid #E8ECF1",
                }}
              >
                <span style={{ fontSize: "1.2rem" }}>{vt.icon}</span>
                <div className="flex-1 min-w-0">
                  <p style={{ color: "#1A1A2E", fontWeight: 600, fontSize: "0.8rem", lineHeight: 1.3 }}>
                    {vt.label}
                  </p>
                  <p style={{ color: "#8E94A7", fontSize: "0.68rem" }}>PKR {vt.fee.toLocaleString()}</p>
                </div>
                <div
                  className="w-4 h-4 rounded-full border-2 flex-shrink-0"
                  style={{
                    borderColor: isSel ? "#1B4F72" : "#C8CDD9",
                    backgroundColor: isSel ? "#1B4F72" : "transparent",
                  }}
                >
                  {isSel && <div className="w-1.5 h-1.5 rounded-full bg-white mx-auto mt-0.5" />}
                </div>
              </button>
            );
          })}
        </div>
        {visitType && (
          <p className="mt-2 text-xs flex items-center gap-1" style={{ color: "#27AE60" }}>
            <Check size={12} /> Consultation fee: PKR {visitFee.toLocaleString()}
          </p>
        )}
      </section>

      {/* Problem description */}
      <section>
        <label
          style={{ color: "#1A1A2E", fontWeight: 700, fontSize: "0.9rem", display: "block" }}
          className="mb-2"
        >
          Describe the Problem
          <span style={{ color: "#8E94A7", fontWeight: 400, fontSize: "0.78rem" }}> (optional)</span>
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What symptoms is your pet showing? Any concerns? How long have you noticed this? Include any relevant history..."
          rows={4}
          className="w-full rounded-xl p-4 text-sm resize-none outline-none transition-all"
          style={{
            border: "1.5px solid #E8ECF1",
            color: "#1A1A2E",
            backgroundColor: "#F8FAFC",
            lineHeight: 1.7,
          }}
          onFocus={(e) => { e.currentTarget.style.borderColor = "#1B4F72"; e.currentTarget.style.backgroundColor = "#fff"; }}
          onBlur={(e) => { e.currentTarget.style.borderColor = "#E8ECF1"; e.currentTarget.style.backgroundColor = "#F8FAFC"; }}
        />
        <p className="mt-1 text-right" style={{ color: "#C8CDD9", fontSize: "0.72rem" }}>
          {description.length}/500
        </p>
      </section>

      {/* Photo upload */}
      <section>
        <label style={{ color: "#1A1A2E", fontWeight: 700, fontSize: "0.9rem", display: "block" }} className="mb-2">
          Upload Photos
          <span style={{ color: "#8E94A7", fontWeight: 400, fontSize: "0.78rem" }}> (optional, max 4)</span>
        </label>
        <div
          className="rounded-2xl border-2 border-dashed p-8 text-center transition-all cursor-pointer"
          style={{
            borderColor: isDragging ? "#1B4F72" : "#C8CDD9",
            backgroundColor: isDragging ? "#EBF5FB" : "#F8FAFC",
          }}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: "#EBF5FB" }}>
            <Upload size={22} style={{ color: "#1B4F72" }} />
          </div>
          <p style={{ color: "#1A1A2E", fontWeight: 600, fontSize: "0.875rem" }}>
            {isDragging ? "Drop photos here" : "Drag & drop or click to upload"}
          </p>
          <p style={{ color: "#8E94A7", fontSize: "0.78rem" }} className="mt-1">
            JPG, PNG up to 5MB each
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
        {uploadedFiles.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {uploadedFiles.map((f, i) => (
              <div
                key={i}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs"
                style={{ backgroundColor: "#EAFAF1", color: "#27AE60" }}
              >
                <Camera size={12} />
                {f.name}
                <button
                  onClick={() => setUploadedFiles(uploadedFiles.filter((_, j) => j !== i))}
                  className="ml-1"
                  style={{ color: "#E74C3C" }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

// ─── STEP 4: CONFIRMATION ─────────────────────────────────────────────────────
function Step4({
  selectedDate,
  selectedTime,
  selectedPet,
  visitType,
  specialInstructions,
  setSpecialInstructions,
  onConfirm,
}: {
  selectedDate: { day: number; month: number; year: number } | null;
  selectedTime: string | null;
  selectedPet: string | null;
  visitType: string;
  specialInstructions: string;
  setSpecialInstructions: (v: string) => void;
  onConfirm: () => void;
}) {
  const pet = PETS.find((p) => p.id === selectedPet);
  const vt = VISIT_TYPES.find((v) => v.id === visitType);

  const summaryRows = [
    { label: "Date", value: selectedDate ? formatDate(selectedDate) : "—", icon: "📅" },
    { label: "Time", value: selectedTime ?? "—", icon: "🕐" },
    { label: "Pet", value: pet ? `${pet.name} (${pet.species})` : "—", icon: pet?.emoji ?? "🐾" },
    { label: "Visit Type", value: vt?.label ?? "—", icon: vt?.icon ?? "🩺" },
    { label: "Clinic", value: DR_AHMED.clinic, icon: "🏥" },
    { label: "Location", value: DR_AHMED.area, icon: "📍" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 style={{ fontFamily: "'DM Serif Display', serif", color: "#0D2F4F", fontSize: "1.5rem" }}>
          Confirm Appointment
        </h2>
        <p style={{ color: "#8E94A7", fontSize: "0.875rem" }} className="mt-1">
          Review your booking details before confirming
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* Booking summary card */}
        <div className="lg:col-span-3">
          <div
            className="rounded-2xl overflow-hidden"
            style={{ border: "1px solid #E8ECF1", backgroundColor: "#fff" }}
          >
            {/* Vet header */}
            <div className="p-5" style={{ background: "linear-gradient(135deg, #0D2F4F, #1B4F72)" }}>
              <div className="flex items-center gap-4">
                <div className="rounded-full overflow-hidden flex-shrink-0" style={{ width: "56px", height: "56px", border: "3px solid rgba(255,255,255,0.3)" }}>
                  <ImageWithFallback src={DR_AHMED.avatar} alt={DR_AHMED.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p style={{ color: "#fff", fontWeight: 700, fontSize: "1rem", fontFamily: "'DM Serif Display', serif" }}>
                    {DR_AHMED.name}
                  </p>
                  <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.8rem" }}>
                    {DR_AHMED.specialty}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star size={11} fill="#F39C12" style={{ color: "#F39C12" }} />
                    <span style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.72rem" }}>
                      {DR_AHMED.rating} · {DR_AHMED.reviews} reviews
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary rows */}
            <div className="divide-y" style={{ borderColor: "#F0F4F8" }}>
              {summaryRows.map((row) => (
                <div key={row.label} className="flex items-center gap-3 px-5 py-3.5">
                  <span style={{ fontSize: "1rem", width: "20px" }}>{row.icon}</span>
                  <span style={{ color: "#8E94A7", fontSize: "0.8rem", width: "90px", flexShrink: 0 }}>
                    {row.label}
                  </span>
                  <span style={{ color: "#1A1A2E", fontWeight: 600, fontSize: "0.875rem" }}>
                    {row.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Fee */}
            <div
              className="px-5 py-4 flex items-center justify-between"
              style={{ backgroundColor: "#F8FAFC", borderTop: "1px solid #F0F4F8" }}
            >
              <span style={{ color: "#5A6178", fontWeight: 600, fontSize: "0.875rem" }}>Consultation Fee</span>
              <span style={{ fontFamily: "'DM Serif Display', serif", color: "#1B4F72", fontSize: "1.25rem" }}>
                PKR {(vt?.fee ?? 1500).toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Right col: instructions + payment + button */}
        <div className="lg:col-span-2 space-y-4">
          {/* Special instructions */}
          <div
            className="rounded-2xl p-5"
            style={{ backgroundColor: "#fff", border: "1px solid #E8ECF1" }}
          >
            <label style={{ color: "#1A1A2E", fontWeight: 700, fontSize: "0.875rem", display: "block" }} className="mb-2">
              Special Instructions
              <span style={{ color: "#8E94A7", fontWeight: 400, fontSize: "0.78rem" }}> (optional)</span>
            </label>
            <textarea
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="Any specific requests or information for the doctor..."
              rows={3}
              className="w-full rounded-xl p-3 text-sm resize-none outline-none"
              style={{
                border: "1.5px solid #E8ECF1",
                color: "#1A1A2E",
                backgroundColor: "#F8FAFC",
                lineHeight: 1.6,
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = "#1B4F72"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "#E8ECF1"; }}
            />
          </div>

          {/* Payment info */}
          <div
            className="rounded-2xl p-4 flex items-start gap-3"
            style={{ backgroundColor: "#FEF9E7", border: "1px solid #F9E79F" }}
          >
            <AlertCircle size={18} style={{ color: "#E67E22", flexShrink: 0, marginTop: "1px" }} />
            <div>
              <p style={{ color: "#1A1A2E", fontWeight: 700, fontSize: "0.8rem" }}>Payment at Clinic</p>
              <p style={{ color: "#5A6178", fontSize: "0.75rem", lineHeight: 1.6 }}>
                No online payment required. Pay directly at PetCare Veterinary Hospital during your visit. Cash and card accepted.
              </p>
            </div>
          </div>

          {/* Contact info */}
          <div className="rounded-2xl p-4" style={{ backgroundColor: "#fff", border: "1px solid #E8ECF1" }}>
            <p style={{ color: "#8E94A7", fontSize: "0.75rem", fontWeight: 600 }} className="mb-3">CLINIC CONTACT</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Phone size={13} style={{ color: "#1B4F72" }} />
                <span style={{ color: "#1A1A2E", fontSize: "0.8rem" }}>+92-42-3572-8800</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle size={13} style={{ color: "#27AE60" }} />
                <span style={{ color: "#1A1A2E", fontSize: "0.8rem" }}>+92-300-1234567</span>
              </div>
            </div>
          </div>

          {/* Confirm button */}
          <button
            onClick={onConfirm}
            className="w-full py-4 rounded-2xl text-white font-medium transition-all flex items-center justify-center gap-2"
            style={{ backgroundColor: "#E67E22", fontSize: "1rem", boxShadow: "0 4px 20px rgba(230,126,34,0.35)" }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#D35400"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#E67E22"; }}
          >
            <CheckCircle size={19} />
            Confirm Booking
          </button>
          <div className="text-center">
            <Link
              to="/vetconnect/find-vet"
              className="text-sm transition-opacity hover:opacity-70"
              style={{ color: "#8E94A7" }}
            >
              Cancel and return to Find a Vet
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── SUCCESS SCREEN ───────────────────────────────────────────────────────────
function SuccessScreen({
  selectedDate,
  selectedTime,
  selectedPet,
  visitType,
}: {
  selectedDate: { day: number; month: number; year: number } | null;
  selectedTime: string | null;
  selectedPet: string | null;
  visitType: string;
}) {
  const pet = PETS.find((p) => p.id === selectedPet);
  const vt = VISIT_TYPES.find((v) => v.id === visitType);
  const bookingRef = "#VC-2026-4821";

  return (
    <>
      <style>{`
        @keyframes popIn {
          0% { transform: scale(0); opacity: 0; }
          60% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes checkDraw {
          from { stroke-dashoffset: 80; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .success-circle { animation: popIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        .check-path { stroke-dasharray: 80; stroke-dashoffset: 80; animation: checkDraw 0.5s ease-out 0.45s forwards; }
        .fade-up-1 { opacity: 0; animation: fadeSlideUp 0.5s ease-out 0.7s forwards; }
        .fade-up-2 { opacity: 0; animation: fadeSlideUp 0.5s ease-out 0.85s forwards; }
        .fade-up-3 { opacity: 0; animation: fadeSlideUp 0.5s ease-out 1s forwards; }
        .fade-up-4 { opacity: 0; animation: fadeSlideUp 0.5s ease-out 1.15s forwards; }
      `}</style>

      <div className="max-w-lg mx-auto text-center py-4">
        {/* Animated checkmark */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <svg
              width="100"
              height="100"
              viewBox="0 0 100 100"
              className="success-circle"
            >
              <circle cx="50" cy="50" r="46" fill="#EAFAF1" stroke="#27AE60" strokeWidth="4" />
              <path
                className="check-path"
                d="M 28 50 L 44 66 L 72 36"
                fill="none"
                stroke="#27AE60"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {/* Confetti dots */}
            {[0, 60, 120, 180, 240, 300].map((deg) => (
              <div
                key={deg}
                className="absolute w-2.5 h-2.5 rounded-full"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: `rotate(${deg}deg) translateY(-56px) translateX(-50%)`,
                  backgroundColor: ["#27AE60","#1B4F72","#E67E22","#F39C12","#2E86C1","#27AE60"][deg / 60],
                  animation: `popIn 0.4s ease-out ${0.6 + (deg / 60) * 0.06}s both`,
                }}
              />
            ))}
          </div>
        </div>

        <div className="fade-up-1">
          <h2 style={{ fontFamily: "'DM Serif Display', serif", color: "#0D2F4F", fontSize: "2rem" }}>
            Appointment Confirmed!
          </h2>
          <p style={{ color: "#5A6178", fontSize: "0.9rem" }} className="mt-2">
            Your booking has been successfully placed.
          </p>
        </div>

        {/* Reference badge */}
        <div className="fade-up-2 flex justify-center mt-4">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
            style={{ backgroundColor: "#EBF5FB", border: "1px solid #AED6F1" }}
          >
            <Stethoscope size={14} style={{ color: "#1B4F72" }} />
            <span style={{ color: "#1B4F72", fontWeight: 700, fontSize: "0.875rem" }}>
              Booking Ref: {bookingRef}
            </span>
          </div>
        </div>

        {/* Summary card */}
        <div
          className="fade-up-3 mt-6 rounded-2xl overflow-hidden text-left"
          style={{ border: "1px solid #E8ECF1", backgroundColor: "#fff" }}
        >
          {/* Vet header */}
          <div className="flex items-center gap-3 p-5" style={{ background: "linear-gradient(135deg, #0D2F4F, #1B4F72)" }}>
            <div
              className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0"
              style={{ border: "2px solid rgba(255,255,255,0.4)" }}
            >
              <ImageWithFallback src={DR_AHMED.avatar} alt={DR_AHMED.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <p style={{ color: "#fff", fontWeight: 700, fontSize: "0.95rem" }}>{DR_AHMED.name}</p>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.78rem" }}>{DR_AHMED.clinic}</p>
            </div>
            <div className="ml-auto flex flex-col items-end">
              <span
                className="px-2.5 py-1 rounded-full text-xs"
                style={{ backgroundColor: "rgba(39,174,96,0.25)", color: "#5DADE2", fontWeight: 600 }}
              >
                Confirmed
              </span>
            </div>
          </div>

          {/* Details */}
          {[
            { label: "📅 Date", value: selectedDate ? formatDate(selectedDate) : "—" },
            { label: "🕐 Time", value: selectedTime ?? "—" },
            { label: "🐾 Pet", value: pet ? `${pet.emoji} ${pet.name} (${pet.species})` : "—" },
            { label: "🩺 Visit Type", value: vt?.label ?? "—" },
            { label: "📍 Clinic", value: `${DR_AHMED.clinic}, ${DR_AHMED.area}` },
            { label: "💰 Fee", value: `PKR ${(vt?.fee ?? 1500).toLocaleString()} (pay at clinic)` },
          ].map((row) => (
            <div
              key={row.label}
              className="flex items-center gap-3 px-5 py-3 border-b"
              style={{ borderColor: "#F0F4F8" }}
            >
              <span style={{ color: "#8E94A7", fontSize: "0.8rem", width: "110px", flexShrink: 0 }}>
                {row.label}
              </span>
              <span style={{ color: "#1A1A2E", fontWeight: 600, fontSize: "0.85rem" }}>
                {row.value}
              </span>
            </div>
          ))}

          {/* Important note */}
          <div className="px-5 py-4" style={{ backgroundColor: "#FEF9E7" }}>
            <p style={{ color: "#E67E22", fontSize: "0.78rem", fontWeight: 600 }}>
              📬 A confirmation SMS has been sent to your registered number.
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="fade-up-4 space-y-3 mt-6">
          <div className="grid grid-cols-2 gap-3">
            <button
              className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all"
              style={{ backgroundColor: "#1B4F72", color: "#fff" }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#154060"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#1B4F72"; }}
            >
              <Download size={15} />
              Add to Calendar
            </button>
            <Link
              to="/vetconnect/find-vet"
              className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all"
              style={{ border: "1.5px solid #1B4F72", color: "#1B4F72" }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#EBF5FB"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
            >
              <Calendar size={15} />
              My Appointments
            </Link>
          </div>

          {/* WhatsApp share */}
          <button
            className="w-full flex items-center justify-center gap-2.5 py-3 rounded-xl text-sm font-medium transition-all"
            style={{ backgroundColor: "#EAFAF1", color: "#27AE60", border: "1.5px solid #A9DFBF" }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#D5F5E3"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#EAFAF1"; }}
          >
            <Share2 size={15} />
            Share via WhatsApp
          </button>

          <div className="pt-2">
            <Link
              to="/vetconnect"
              style={{ color: "#8E94A7", fontSize: "0.875rem" }}
              className="hover:opacity-70 transition-opacity"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export function BookingPage() {
  useParams(); // vetId available if needed

  const [step, setStep] = useState<2 | 3 | 4>(2);
  const [isSuccess, setIsSuccess] = useState(false);

  // Step 2 state
  const [selectedDate, setSelectedDate] = useState<{ day: number; month: number; year: number } | null>(
    { day: 15, month: 4, year: 2026 } // May 15, 2026 pre-selected
  );
  const [selectedTime, setSelectedTime] = useState<string | null>("10:30 AM");

  // Step 3 state
  const [selectedPet, setSelectedPet] = useState<string | null>("1"); // Max pre-selected
  const [visitType, setVisitType] = useState("checkup");
  const [description, setDescription] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  // Step 4 state
  const [specialInstructions, setSpecialInstructions] = useState("");

  // Validation
  const [errors, setErrors] = useState<string[]>([]);

  function validateStep2() {
    const errs: string[] = [];
    if (!selectedDate) errs.push("Please select a date");
    if (!selectedTime) errs.push("Please select a time slot");
    setErrors(errs);
    return errs.length === 0;
  }

  function validateStep3() {
    const errs: string[] = [];
    if (!selectedPet) errs.push("Please select a pet");
    if (!visitType) errs.push("Please select a visit type");
    setErrors(errs);
    return errs.length === 0;
  }

  function handleNext() {
    if (step === 2 && !validateStep2()) return;
    if (step === 3 && !validateStep3()) return;
    setErrors([]);
    setStep((s) => (s < 4 ? ((s + 1) as 3 | 4) : s));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleBack() {
    setErrors([]);
    if (step === 2) return; // Go to vet profile
    setStep((s) => ((s - 1) as 2 | 3));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleConfirm() {
    setIsSuccess(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const stepLabels: Record<number, string> = {
    2: "Choose Date & Time",
    3: "Pet & Visit Details",
    4: "Confirm Booking",
  };

  return (
    <div style={{ backgroundColor: "#FAFBFD", minHeight: "100vh" }}>
      {/* Top bar */}
      <div
        className="sticky top-0 z-30"
        style={{ backgroundColor: "#fff", borderBottom: "1px solid #E8ECF1", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
      >
        <div className="max-w-4xl mx-auto px-4 py-4">
          {/* Back + title row */}
          <div className="flex items-center gap-3 mb-4">
            {!isSuccess && (
              <Link
                to="/vetconnect/vet/8"
                className="flex items-center gap-1 text-sm transition-opacity hover:opacity-70"
                style={{ color: "#8E94A7" }}
              >
                <ChevronLeft size={16} />
                <span className="hidden sm:inline">Dr. Ahmed Khan</span>
              </Link>
            )}
            <div className="flex-1 text-center">
              <p style={{ color: "#0D2F4F", fontWeight: 700, fontSize: "0.9rem" }}>
                {isSuccess ? "Booking Confirmed" : "Book Appointment"}
              </p>
            </div>
            {/* Vet avatar chip */}
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full overflow-hidden">
                <ImageWithFallback src={DR_AHMED.avatar} alt={DR_AHMED.name} className="w-full h-full object-cover" />
              </div>
              <span className="hidden sm:inline" style={{ color: "#5A6178", fontSize: "0.78rem" }}>
                Dr. Ahmed Khan
              </span>
            </div>
          </div>

          {/* Progress stepper */}
          {!isSuccess && <ProgressStepper currentStep={step} />}
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {isSuccess ? (
          <SuccessScreen
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            selectedPet={selectedPet}
            visitType={visitType}
          />
        ) : (
          <>
            {/* Error banner */}
            {errors.length > 0 && (
              <div
                className="mb-5 rounded-xl px-4 py-3 flex items-start gap-3"
                style={{ backgroundColor: "#FDEDEC", border: "1px solid #FADBD8" }}
              >
                <AlertCircle size={16} style={{ color: "#E74C3C", flexShrink: 0, marginTop: "1px" }} />
                <div>
                  {errors.map((err) => (
                    <p key={err} style={{ color: "#E74C3C", fontSize: "0.8rem" }}>
                      {err}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Step content */}
            <div
              className="rounded-2xl p-5 sm:p-8"
              style={{ backgroundColor: "#fff", border: "1px solid #E8ECF1", boxShadow: "0 2px 20px rgba(27,79,114,0.05)" }}
            >
              {step === 2 && (
                <Step2
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                  selectedTime={selectedTime}
                  setSelectedTime={setSelectedTime}
                />
              )}
              {step === 3 && (
                <Step3
                  selectedPet={selectedPet}
                  setSelectedPet={setSelectedPet}
                  visitType={visitType}
                  setVisitType={setVisitType}
                  description={description}
                  setDescription={setDescription}
                  uploadedFiles={uploadedFiles}
                  setUploadedFiles={setUploadedFiles}
                />
              )}
              {step === 4 && (
                <Step4
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                  selectedPet={selectedPet}
                  visitType={visitType}
                  specialInstructions={specialInstructions}
                  setSpecialInstructions={setSpecialInstructions}
                  onConfirm={handleConfirm}
                />
              )}
            </div>

            {/* Navigation footer (steps 2 & 3 only) */}
            {step < 4 && (
              <div
                className="mt-5 flex items-center justify-between gap-4 rounded-2xl px-5 py-4"
                style={{ backgroundColor: "#fff", border: "1px solid #E8ECF1" }}
              >
                <button
                  onClick={handleBack}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium border transition-all"
                  style={{ color: "#5A6178", borderColor: "#E8ECF1" }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#F0F4F8"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                >
                  <ChevronLeft size={15} />
                  {step === 2 ? "Change Vet" : "Back"}
                </button>

                {/* Step indicator */}
                <div className="flex items-center gap-2">
                  {[2, 3, 4].map((s) => (
                    <div
                      key={s}
                      className="rounded-full transition-all duration-300"
                      style={{
                        width: s === step ? "24px" : "8px",
                        height: "8px",
                        backgroundColor: s === step ? "#1B4F72" : s < step ? "#27AE60" : "#E8ECF1",
                      }}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium text-white transition-all"
                  style={{ backgroundColor: "#E67E22" }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#D35400"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#E67E22"; }}
                >
                  {step === 3 ? "Review Booking" : "Continue"}
                  <ChevronRight size={15} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
