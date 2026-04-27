import { Link } from "react-router";
import {
  LayoutDashboard, Users, PawPrint, Calendar, FileText, BarChart3,
  CheckCircle, ArrowRight, Shield, Zap, HeartPulse, Smartphone,
  Globe, Star, TrendingUp, Clock, Bell, Building2
} from "lucide-react";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";

const features = [
  {
    icon: LayoutDashboard,
    title: "Smart Dashboard",
    desc: "Get a real-time overview of your clinic's activity — visits today, pending follow-ups, revenue, and more.",
    color: "#2E86C1",
  },
  {
    icon: Users,
    title: "Owner & Patient Management",
    desc: "Maintain detailed profiles for pet owners and their animals. Quick search and complete history at your fingertips.",
    color: "#27AE60",
  },
  {
    icon: PawPrint,
    title: "Pet Health Records",
    desc: "Full medical history including visits, diagnoses, treatments, and vaccinations for every pet in your care.",
    color: "#E67E22",
  },
  {
    icon: Calendar,
    title: "Appointment Scheduling",
    desc: "Manage appointments with ease. View your schedule, prevent double-bookings, and send reminders automatically.",
    color: "#8E44AD",
  },
  {
    icon: FileText,
    title: "Invoice & Billing",
    desc: "Generate professional invoices in seconds. Track payments, pending dues, and revenue history.",
    color: "#E74C3C",
  },
  {
    icon: BarChart3,
    title: "Analytics & Reports",
    desc: "Understand your clinic's performance with revenue trends, visit frequency, and pet population insights.",
    color: "#F39C12",
  },
  {
    icon: Bell,
    title: "Follow-up Reminders",
    desc: "Automated reminders for vaccination due dates, follow-up visits, and scheduled procedures.",
    color: "#2E86C1",
  },
  {
    icon: Globe,
    title: "VetConnect Directory",
    desc: "List your clinic on the VetConnect platform and reach thousands of pet owners across Pakistan.",
    color: "#27AE60",
  },
];

const plans = [
  {
    name: "Starter",
    price: "Free",
    period: "",
    desc: "Perfect for small clinics just getting started",
    features: [
      "Up to 100 patient records",
      "Basic appointment management",
      "Invoice generation",
      "VetConnect listing",
      "Email support",
    ],
    cta: "Get Started Free",
    highlighted: false,
    color: "#1B4F72",
  },
  {
    name: "Professional",
    price: "PKR 4,999",
    period: "/ month",
    desc: "For growing clinics that need more power",
    features: [
      "Unlimited patient records",
      "Advanced appointment management",
      "Automated reminders & follow-ups",
      "Detailed analytics & reports",
      "Priority VetConnect listing",
      "Vaccination tracking",
      "Multi-vet support",
      "Priority support",
    ],
    cta: "Start 14-Day Free Trial",
    highlighted: true,
    color: "#E67E22",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "For multi-branch clinics and hospital networks",
    features: [
      "Everything in Professional",
      "Multi-branch management",
      "Custom integrations",
      "Dedicated account manager",
      "On-site training",
      "Custom branding",
      "SLA guarantee",
    ],
    cta: "Contact Sales",
    highlighted: false,
    color: "#1B4F72",
  },
];

const testimonials = [
  {
    name: "Dr. Farrukh Anwar",
    clinic: "Karachi Pet Hospital",
    text: "PawCare transformed how we manage our clinic. We've reduced missed appointments by 60% and billing errors to zero.",
    rating: 5,
  },
  {
    name: "Dr. Zainab Haq",
    clinic: "Lahore Animal Care",
    text: "The VetConnect listing brings us 15-20 new clients every month. Best investment we've made for our clinic.",
    rating: 5,
  },
  {
    name: "Dr. Kamran Shah",
    clinic: "Islamabad Vets",
    text: "Vaccination tracking and automatic reminders have made our clients much more consistent with their pet's health schedule.",
    rating: 5,
  },
];

function PageHero() {
  return (
    <section
      className="py-16 lg:py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0D2F4F 0%, #1B4F72 70%, #2E86C1 100%)" }}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 right-0 w-96 h-96 rounded-full opacity-10" style={{ backgroundColor: "#E67E22" }} />
        <div className="absolute bottom-0 -left-20 w-80 h-80 rounded-full opacity-10" style={{ backgroundColor: "#2E86C1" }} />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div
              className="inline-flex items-center gap-2 text-sm px-4 py-1.5 rounded-full mb-5"
              style={{ backgroundColor: "rgba(230,126,34,0.2)", color: "#F39C12", border: "1px solid rgba(230,126,34,0.3)" }}
            >
              <Building2 size={14} />
              <span>For Veterinary Clinics</span>
            </div>
            <h1
              className="text-white mb-4"
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: "clamp(2rem, 5vw, 3.2rem)",
                lineHeight: 1.15,
              }}
            >
              Manage Your Clinic
              <br />
              <span style={{ color: "#F39C12" }}>The Smarter Way</span>
            </h1>
            <p className="mb-7 text-lg" style={{ color: "#AED6F1", lineHeight: 1.7 }}>
              PawCare is Pakistan's most comprehensive clinic management platform. 
              Join 500+ clinics streamlining their operations, growing their practice, 
              and delivering better pet care.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              {[
                { icon: Zap, text: "Setup in minutes" },
                { icon: Shield, text: "Secure & reliable" },
                { icon: TrendingUp, text: "Grow your practice" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2">
                  <Icon size={16} style={{ color: "#F39C12" }} />
                  <span className="text-sm" style={{ color: "#AED6F1" }}>{text}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-white text-sm font-medium"
                style={{ backgroundColor: "#E67E22" }}
              >
                Try PawCare Free
                <ArrowRight size={16} />
              </Link>
              <a
                href="#features"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm"
                style={{ color: "#AED6F1", border: "1px solid rgba(174,214,241,0.3)" }}
              >
                See Features
              </a>
            </div>
          </div>

          {/* Clinic mockup */}
          <div className="hidden lg:block">
            <div
              className="rounded-3xl overflow-hidden"
              style={{ border: "2px solid rgba(255,255,255,0.15)" }}
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1770836037793-95bdbf190f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZXRlcmluYXJpYW4lMjBkb2N0b3IlMjBleGFtaW5pbmclMjBkb2clMjBjbGluaWN8ZW58MXx8fHwxNzc3MjY4NDkxfDA&ixlib=rb-4.1.0&q=80&w=800"
                alt="Vet clinic"
                className="w-full h-72 object-cover"
              />
            </div>
            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              {[
                { val: "500+", label: "Active Clinics" },
                { val: "98%", label: "Satisfaction" },
                { val: "60%", label: "Fewer No-shows" },
              ].map(({ val, label }) => (
                <div key={label} className="rounded-2xl p-4 text-center" style={{ backgroundColor: "rgba(255,255,255,0.08)" }}>
                  <p className="text-white" style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.4rem" }}>{val}</p>
                  <p className="text-xs" style={{ color: "#8E94A7" }}>{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-8">
          <path d="M0,40 C360,0 1080,0 1440,40 L1440,40 L0,40 Z" fill="#FAFBFD" />
        </svg>
      </div>
    </section>
  );
}

export function ForClinicsPage() {
  return (
    <div style={{ backgroundColor: "#FAFBFD" }}>
      <PageHero />

      {/* Features */}
      <section id="features" className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div
              className="inline-flex items-center gap-2 text-sm px-4 py-1.5 rounded-full mb-4"
              style={{ backgroundColor: "#EBF5FB", color: "#2E86C1" }}
            >
              <HeartPulse size={14} />
              <span>Everything You Need</span>
            </div>
            <h2
              className="mb-3"
              style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(1.8rem, 4vw, 2.5rem)", color: "#1A1A2E" }}
            >
              Powerful Features for Modern Clinics
            </h2>
            <p className="max-w-xl mx-auto" style={{ color: "#5A6178" }}>
              From day-to-day operations to growth insights — PawCare covers every aspect of running a successful veterinary clinic.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map(({ icon: Icon, title, desc, color }) => (
              <div
                key={title}
                className="rounded-2xl p-5 border transition-all hover:shadow-md hover:-translate-y-1"
                style={{ backgroundColor: "#fff", borderColor: "#E8ECF1" }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${color}15` }}
                >
                  <Icon size={20} style={{ color }} />
                </div>
                <h3 className="mb-2" style={{ color: "#1A1A2E", fontWeight: 600 }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#5A6178" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 lg:py-20" style={{ backgroundColor: "#fff" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div
              className="inline-flex items-center gap-2 text-sm px-4 py-1.5 rounded-full mb-4"
              style={{ backgroundColor: "#FEF9F0", color: "#E67E22" }}
            >
              <Star size={14} />
              <span>Simple Pricing</span>
            </div>
            <h2
              className="mb-3"
              style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(1.8rem, 4vw, 2.5rem)", color: "#1A1A2E" }}
            >
              Plans for Every Clinic
            </h2>
            <p style={{ color: "#5A6178" }}>Start free, upgrade as you grow. No hidden fees, no long-term contracts.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-3xl p-7 border relative ${plan.highlighted ? "shadow-xl" : ""}`}
                style={{
                  backgroundColor: plan.highlighted ? "#1B4F72" : "#fff",
                  borderColor: plan.highlighted ? "#2E86C1" : "#E8ECF1",
                  transform: plan.highlighted ? "scale(1.03)" : undefined,
                }}
              >
                {plan.highlighted && (
                  <div
                    className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-5 py-1 rounded-full text-white text-xs font-medium"
                    style={{ backgroundColor: "#E67E22" }}
                  >
                    Most Popular
                  </div>
                )}
                <h3
                  className="mb-1"
                  style={{ color: plan.highlighted ? "#fff" : "#1A1A2E", fontWeight: 700 }}
                >
                  {plan.name}
                </h3>
                <p className="text-xs mb-4" style={{ color: plan.highlighted ? "#AED6F1" : "#8E94A7" }}>
                  {plan.desc}
                </p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span
                    style={{
                      fontFamily: "'DM Serif Display', serif",
                      fontSize: "2rem",
                      color: plan.highlighted ? "#F39C12" : "#1A1A2E",
                    }}
                  >
                    {plan.price}
                  </span>
                  <span className="text-xs" style={{ color: plan.highlighted ? "#AED6F1" : "#8E94A7" }}>
                    {plan.period}
                  </span>
                </div>

                <ul className="space-y-2.5 mb-7">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <CheckCircle
                        size={15}
                        className="flex-shrink-0 mt-0.5"
                        style={{ color: plan.highlighted ? "#27AE60" : "#27AE60" }}
                      />
                      <span className="text-sm" style={{ color: plan.highlighted ? "#AED6F1" : "#5A6178" }}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/login"
                  className="block text-center py-3 rounded-xl text-sm font-medium transition-all"
                  style={{
                    backgroundColor: plan.highlighted ? "#E67E22" : plan.color,
                    color: "#fff",
                  }}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clinic testimonials */}
      <section className="py-16 lg:py-20" style={{ backgroundColor: "#FFF9F2" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2
              className="mb-3"
              style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(1.6rem, 4vw, 2rem)", color: "#1A1A2E" }}
            >
              Trusted by Clinics Across Pakistan
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="rounded-2xl p-6 border"
                style={{ backgroundColor: "#fff", borderColor: "#E8ECF1" }}
              >
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={14} fill="#F39C12" style={{ color: "#F39C12" }} />
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-5" style={{ color: "#5A6178" }}>"{t.text}"</p>
                <div>
                  <p className="text-sm" style={{ color: "#1A1A2E", fontWeight: 600 }}>{t.name}</p>
                  <p className="text-xs" style={{ color: "#8E94A7" }}>{t.clinic}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-16 lg:py-20 text-center"
        style={{ background: "linear-gradient(135deg, #0D2F4F 0%, #1B4F72 100%)" }}
      >
        <div className="max-w-2xl mx-auto px-4">
          <h2
            className="text-white mb-4"
            style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(1.8rem, 4vw, 2.5rem)" }}
          >
            Ready to Modernize Your Clinic?
          </h2>
          <p className="mb-7" style={{ color: "#AED6F1" }}>
            Join 500+ clinics already using PawCare. Free to start, no credit card required.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white text-sm font-medium"
            style={{ backgroundColor: "#E67E22" }}
          >
            Start Using PawCare Free
            <ArrowRight size={16} />
          </Link>
          <p className="mt-4 text-xs" style={{ color: "#5A6178" }}>
            14-day free trial · No credit card required · Cancel anytime
          </p>
        </div>
      </section>
    </div>
  );
}
