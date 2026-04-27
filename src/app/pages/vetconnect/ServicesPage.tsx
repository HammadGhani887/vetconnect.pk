import { Link } from "react-router";
import {
  Stethoscope, Syringe, Scissors, AlertCircle, Microscope,
  HeartPulse, ArrowRight, CheckCircle, Clock, Star, Shield,
  ChevronRight
} from "lucide-react";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";

const services = [
  {
    icon: Stethoscope,
    title: "General Checkups & Wellness",
    shortDesc: "Routine health examinations for all pets",
    fullDesc:
      "Regular wellness exams are the cornerstone of preventive pet care. Our network of vets conducts thorough physical examinations including weight checks, vital signs, dental inspection, and organ assessment. Early detection saves lives.",
    features: ["Full physical examination", "Weight & growth tracking", "Nutritional counseling", "Behavioral assessment", "Health certificates"],
    color: "#2E86C1",
    bg: "#EBF5FB",
    duration: "30–45 min",
    price: "PKR 800–2,000",
  },
  {
    icon: Syringe,
    title: "Vaccination Programs",
    shortDesc: "Core & non-core vaccines on schedule",
    fullDesc:
      "Protect your beloved pet from life-threatening diseases with our comprehensive vaccination programs. We track your pet's vaccination history and send you timely reminders so you never miss a critical dose.",
    features: ["Rabies vaccination", "Distemper & Parvo protection", "Feline vaccines (FVRCP)", "Bordetella protection", "Vaccination records & certificates"],
    color: "#27AE60",
    bg: "#EAFAF1",
    duration: "15–20 min",
    price: "PKR 500–1,500",
  },
  {
    icon: HeartPulse,
    title: "Dental Care",
    shortDesc: "Professional oral health for happier pets",
    fullDesc:
      "Dental disease affects over 80% of pets by age 3. Our partner clinics offer professional dental cleanings, extractions, and oral health assessments to keep your pet's teeth and gums healthy.",
    features: ["Professional teeth scaling", "Polishing & oral rinse", "Tooth extractions", "Oral health assessment", "Home care education"],
    color: "#E67E22",
    bg: "#FEF9F0",
    duration: "45–90 min",
    price: "PKR 2,000–8,000",
  },
  {
    icon: Microscope,
    title: "Laboratory & Diagnostics",
    shortDesc: "Advanced tests for accurate diagnosis",
    fullDesc:
      "When your pet needs answers, our clinics provide comprehensive diagnostic services including blood panels, urinalysis, X-rays, ultrasounds, and specialized tests to diagnose conditions quickly and accurately.",
    features: ["Complete blood count (CBC)", "Biochemistry panels", "Digital X-ray imaging", "Ultrasound services", "Parasite screening"],
    color: "#8E44AD",
    bg: "#F5EEF8",
    duration: "Varies",
    price: "PKR 1,500–15,000",
  },
  {
    icon: AlertCircle,
    title: "Emergency & Critical Care",
    shortDesc: "24/7 urgent care when it matters most",
    fullDesc:
      "Pet emergencies can happen at any time. Our network includes clinics with 24/7 emergency services. From poisoning and trauma to sudden illness, find immediate veterinary care in your city anytime.",
    features: ["24/7 emergency availability", "Trauma care & stabilization", "Poisoning treatment", "ICU monitoring", "Critical care management"],
    color: "#E74C3C",
    bg: "#FDEDEC",
    duration: "Immediate",
    price: "PKR 3,000–50,000+",
  },
  {
    icon: Scissors,
    title: "Grooming & Hygiene",
    shortDesc: "Professional grooming for clean, happy pets",
    fullDesc:
      "A clean pet is a healthy pet. Our grooming services cover everything from basic baths and brushing to full haircuts, nail trimming, ear cleaning, and de-shedding treatments for dogs and cats.",
    features: ["Full bath & blow dry", "Breed-specific haircuts", "Nail trimming & filing", "Ear cleaning", "De-shedding treatment"],
    color: "#F39C12",
    bg: "#FEF9E7",
    duration: "1–3 hrs",
    price: "PKR 600–3,500",
  },
];

function PageHero() {
  return (
    <section
      className="py-16 lg:py-20 text-center relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0D2F4F 0%, #1B4F72 100%)" }}
    >
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-10 right-20 w-56 h-56 rounded-full opacity-10" style={{ backgroundColor: "#E67E22" }} />
        <div className="absolute bottom-0 left-10 w-40 h-40 rounded-full opacity-10" style={{ backgroundColor: "#2E86C1" }} />
      </div>
      <div className="max-w-3xl mx-auto px-4 relative z-10">
        <div
          className="inline-flex items-center gap-2 text-sm px-4 py-1.5 rounded-full mb-5"
          style={{ backgroundColor: "rgba(46,134,193,0.25)", color: "#AED6F1", border: "1px solid rgba(46,134,193,0.3)" }}
        >
          <HeartPulse size={14} />
          <span>Comprehensive Veterinary Care</span>
        </div>
        <h1
          className="text-white mb-4"
          style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(2rem, 5vw, 3rem)", lineHeight: 1.2 }}
        >
          All the Services Your Pet Needs
        </h1>
        <p style={{ color: "#AED6F1", lineHeight: 1.7 }}>
          Browse our wide range of veterinary services available at 500+ clinics across Pakistan.
          From routine checkups to emergency care, we've got your pet covered.
        </p>
      </div>
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 50" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-10">
          <path d="M0,50 C360,0 1080,0 1440,50 L1440,50 L0,50 Z" fill="#FAFBFD" />
        </svg>
      </div>
    </section>
  );
}

export function ServicesPage() {
  return (
    <div style={{ backgroundColor: "#FAFBFD" }}>
      <PageHero />

      {/* Trust indicators */}
      <section className="py-10 border-b" style={{ backgroundColor: "#fff", borderColor: "#E8ECF1" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-8">
            {[
              { icon: Shield, text: "PVMA Licensed Vets", color: "#27AE60" },
              { icon: Star, text: "4.8★ Average Rating", color: "#F39C12" },
              { icon: Clock, text: "24/7 Emergency Care", color: "#E74C3C" },
              { icon: CheckCircle, text: "Verified & Trusted", color: "#2E86C1" },
            ].map(({ icon: Icon, text, color }) => (
              <div key={text} className="flex items-center gap-2">
                <Icon size={18} style={{ color }} />
                <span className="text-sm" style={{ color: "#5A6178", fontWeight: 500 }}>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services list */}
      <section className="py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {services.map((service, idx) => {
              const Icon = service.icon;
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={service.title}
                  className="rounded-3xl overflow-hidden border"
                  style={{ backgroundColor: "#fff", borderColor: "#E8ECF1" }}
                >
                  <div className={`grid grid-cols-1 lg:grid-cols-2 ${isEven ? "" : "lg:flex-row-reverse"}`}>
                    {/* Content */}
                    <div className={`p-8 lg:p-10 ${!isEven ? "lg:order-2" : ""}`}>
                      <div className="flex items-center gap-4 mb-5">
                        <div
                          className="w-14 h-14 rounded-2xl flex items-center justify-center"
                          style={{ backgroundColor: service.bg }}
                        >
                          <Icon size={26} style={{ color: service.color }} />
                        </div>
                        <div>
                          <h2
                            className="mb-0.5"
                            style={{
                              fontFamily: "'DM Serif Display', serif",
                              fontSize: "1.5rem",
                              color: "#1A1A2E",
                            }}
                          >
                            {service.title}
                          </h2>
                          <p className="text-sm" style={{ color: service.color }}>{service.shortDesc}</p>
                        </div>
                      </div>
                      <p className="text-sm leading-relaxed mb-6" style={{ color: "#5A6178" }}>
                        {service.fullDesc}
                      </p>

                      {/* Features list */}
                      <div className="space-y-2 mb-6">
                        {service.features.map((f) => (
                          <div key={f} className="flex items-center gap-2.5">
                            <CheckCircle size={15} style={{ color: service.color }} className="flex-shrink-0" />
                            <span className="text-sm" style={{ color: "#5A6178" }}>{f}</span>
                          </div>
                        ))}
                      </div>

                      {/* Duration & price */}
                      <div className="flex gap-4 mb-7">
                        <div className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-full" style={{ backgroundColor: service.bg, color: service.color }}>
                          <Clock size={12} />
                          {service.duration}
                        </div>
                        <div className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-full" style={{ backgroundColor: "#F8F9FA", color: "#5A6178" }}>
                          {service.price}
                        </div>
                      </div>

                      <Link
                        to="/vetconnect/find-vet"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white text-sm font-medium"
                        style={{ backgroundColor: service.color }}
                      >
                        Find a Vet for {service.title}
                        <ArrowRight size={15} />
                      </Link>
                    </div>

                    {/* Visual side */}
                    <div
                      className={`hidden lg:flex items-center justify-center p-10 ${!isEven ? "lg:order-1" : ""}`}
                      style={{ backgroundColor: service.bg }}
                    >
                      <div
                        className="w-48 h-48 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${service.color}20` }}
                      >
                        <Icon size={80} style={{ color: service.color, opacity: 0.6 }} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-14 text-center"
        style={{ background: "linear-gradient(135deg, #0D2F4F 0%, #1B4F72 100%)" }}
      >
        <div className="max-w-2xl mx-auto px-4">
          <h2
            className="text-white mb-4"
            style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(1.8rem, 4vw, 2.5rem)" }}
          >
            Ready to Book?
          </h2>
          <p className="mb-7" style={{ color: "#AED6F1" }}>
            Find a verified vet near you and book your appointment in under 2 minutes.
          </p>
          <Link
            to="/vetconnect/find-vet"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white text-sm font-medium"
            style={{ backgroundColor: "#E67E22" }}
          >
            Find a Vet Now
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
