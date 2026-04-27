import { Link } from "react-router";
import {
  Heart, Globe, Award, Users, Shield, Zap, ArrowRight,
  MapPin, Mail, Phone, Star, Target, Eye, PawPrint
} from "lucide-react";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";

const values = [
  {
    icon: Heart,
    title: "Compassion First",
    desc: "Every decision we make is guided by our love for animals and our commitment to their wellbeing.",
    color: "#E74C3C",
  },
  {
    icon: Shield,
    title: "Trust & Safety",
    desc: "We rigorously verify every vet on our platform to ensure only licensed, qualified professionals are listed.",
    color: "#27AE60",
  },
  {
    icon: Globe,
    title: "Accessibility",
    desc: "We believe quality pet care should be available to every pet owner, in every city across Pakistan.",
    color: "#2E86C1",
  },
  {
    icon: Zap,
    title: "Innovation",
    desc: "We use the latest technology to make veterinary care simpler, faster, and more effective for everyone.",
    color: "#E67E22",
  },
];

const team = [
  {
    name: "Dr. Imran Chaudhry",
    role: "Co-Founder & CEO",
    bio: "Veterinarian with 20 years of experience. Former president of PVMA. Passionate about improving pet healthcare in Pakistan.",
    img: "https://images.unsplash.com/photo-1755189118414-14c8dacdb082?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZXRlcmluYXJpYW4lMjB0ZWFtJTIwcHJvZmVzc2lvbmFscyUyMHNtaWxpbmd8ZW58MXx8fHwxNzc3MjY4NDk1fDA&ixlib=rb-4.1.0&q=80&w=400",
  },
  {
    name: "Sana Mirza",
    role: "Co-Founder & CTO",
    bio: "Tech entrepreneur who built Pakistan's first telemedicine platform. Bringing her expertise to revolutionize vet care.",
    img: "https://images.unsplash.com/photo-1774279922369-755504a8b495?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjB2ZXRlcmluYXJpYW4lMjBob2xkaW5nJTIwY2F0JTIwc21pbGluZ3xlbnwxfHx8fDE3NzcyNjg0OTh8MA&ixlib=rb-4.1.0&q=80&w=400",
  },
  {
    name: "Ahmed Riaz",
    role: "Head of Vet Partnerships",
    bio: "Built a network of 500+ clinics across Pakistan. Passionate about connecting vets with the tools they need to succeed.",
    img: "https://images.unsplash.com/photo-1770836037793-95bdbf190f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZXRlcmluYXJpYW4lMjBkb2N0b3IlMjBleGFtaW5pbmclMjBkb2clMjBjbGluaWN8ZW58MXx8fHwxNzc3MjY4NDkxfDA&ixlib=rb-4.1.0&q=80&w=400",
  },
];

const milestones = [
  { year: "2022", event: "VetConnect founded in Karachi with 10 partner clinics" },
  { year: "2023", event: "Expanded to Lahore and Islamabad. 100+ clinics onboarded" },
  { year: "2024", event: "Launched PawCare clinic management platform. 5,000+ pet owners served" },
  { year: "2025", event: "500+ verified clinics across 8 cities. 50,000+ consultations" },
  { year: "2026", event: "Mobile app launch. Expanding to 20 cities across Pakistan" },
];

export function AboutPage() {
  return (
    <div style={{ backgroundColor: "#FAFBFD" }}>
      {/* Hero */}
      <section
        className="py-16 lg:py-24 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0D2F4F 0%, #1B4F72 100%)" }}
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-10 right-0 w-80 h-80 rounded-full opacity-10" style={{ backgroundColor: "#E67E22" }} />
          <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full opacity-10" style={{ backgroundColor: "#2E86C1" }} />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div
            className="inline-flex items-center gap-2 text-sm px-4 py-1.5 rounded-full mb-5"
            style={{ backgroundColor: "rgba(46,134,193,0.25)", color: "#AED6F1", border: "1px solid rgba(46,134,193,0.3)" }}
          >
            <PawPrint size={14} />
            <span>Our Story</span>
          </div>
          <h1
            className="text-white mb-4"
            style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(2rem, 5vw, 3rem)", lineHeight: 1.2 }}
          >
            Built for Pakistan's Pet Lovers
          </h1>
          <p className="text-lg" style={{ color: "#AED6F1", lineHeight: 1.7 }}>
            VetConnect was born from a simple belief: every pet in Pakistan deserves access to quality, 
            trustworthy veterinary care. We're on a mission to make that a reality.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-8">
            <path d="M0,40 C360,0 1080,0 1440,40 L1440,40 L0,40 Z" fill="#FAFBFD" />
          </svg>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div
              className="rounded-3xl p-8 border"
              style={{ backgroundColor: "#fff", borderColor: "#E8ECF1" }}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                style={{ backgroundColor: "#EBF5FB" }}
              >
                <Target size={22} style={{ color: "#2E86C1" }} />
              </div>
              <h2
                className="mb-4"
                style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.8rem", color: "#1A1A2E" }}
              >
                Our Mission
              </h2>
              <p style={{ color: "#5A6178", lineHeight: 1.8 }}>
                To democratize access to quality veterinary care across Pakistan by connecting pet owners 
                with verified, trusted veterinarians — making it simple, fast, and affordable to keep 
                every pet healthy and happy.
              </p>
            </div>
            <div
              className="rounded-3xl p-8 border"
              style={{ backgroundColor: "#FFF9F2", borderColor: "#F39C12" + "40" }}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                style={{ backgroundColor: "#FEF9E7" }}
              >
                <Eye size={22} style={{ color: "#F39C12" }} />
              </div>
              <h2
                className="mb-4"
                style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.8rem", color: "#1A1A2E" }}
              >
                Our Vision
              </h2>
              <p style={{ color: "#5A6178", lineHeight: 1.8 }}>
                A Pakistan where no pet suffers due to a lack of accessible veterinary care. 
                We envision a future where every city, every town, and every neighborhood has 
                trustworthy pet healthcare just a tap away.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story section */}
      <section className="py-10 lg:py-16" style={{ backgroundColor: "#fff" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div
                className="inline-flex items-center gap-2 text-sm px-4 py-1.5 rounded-full mb-4"
                style={{ backgroundColor: "#EAFAF1", color: "#27AE60" }}
              >
                <Heart size={14} />
                <span>Our Story</span>
              </div>
              <h2
                className="mb-5"
                style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(1.8rem, 4vw, 2.3rem)", color: "#1A1A2E" }}
              >
                Why We Built VetConnect
              </h2>
              <div className="space-y-4" style={{ color: "#5A6178", lineHeight: 1.8 }}>
                <p>
                  It started with a simple frustration. Our co-founder Dr. Imran Chaudhry watched countless 
                  pet owners struggle to find quality veterinary care in their city — spending hours calling 
                  clinics, not knowing who to trust, and often arriving too late.
                </p>
                <p>
                  In Pakistan, pet ownership is growing rapidly, but the infrastructure to support it hasn't 
                  kept pace. Quality veterinary care exists, but it's hard to discover. Trusted vets are out 
                  there, but finding them takes too long.
                </p>
                <p>
                  VetConnect changes that. By creating Pakistan's first comprehensive veterinary platform, 
                  we connect the right vet with the right pet owner — instantly. And with PawCare, we give 
                  clinics the tools to deliver even better care, more efficiently.
                </p>
              </div>
            </div>
            <div className="rounded-3xl overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1594387992816-65f5d74c1de0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHBldHMlMjBkb2clMjBjYXQlMjB0b2dldGhlcnxlbnwxfHx8fDE3NzcyNjg0OTF8MA&ixlib=rb-4.1.0&q=80&w=800"
                alt="Happy pets"
                className="w-full h-72 lg:h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-20" style={{ backgroundColor: "#FAFBFD" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className="mb-3"
              style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(1.8rem, 4vw, 2.5rem)", color: "#1A1A2E" }}
            >
              Our Values
            </h2>
            <p style={{ color: "#5A6178" }}>The principles that guide everything we do</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map(({ icon: Icon, title, desc, color }) => (
              <div
                key={title}
                className="rounded-2xl p-6 text-center border transition-all hover:shadow-md"
                style={{ backgroundColor: "#fff", borderColor: "#E8ECF1" }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: `${color}15` }}
                >
                  <Icon size={26} style={{ color }} />
                </div>
                <h3 className="mb-2" style={{ color: "#1A1A2E", fontWeight: 700 }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#5A6178" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 lg:py-20" style={{ backgroundColor: "#fff" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className="mb-3"
              style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(1.8rem, 4vw, 2.5rem)", color: "#1A1A2E" }}
            >
              Our Journey
            </h2>
          </div>
          <div className="relative">
            {/* Line */}
            <div
              className="absolute left-5 top-2 bottom-2 w-0.5 md:left-1/2"
              style={{ backgroundColor: "#E8ECF1" }}
            />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <div
                  key={m.year}
                  className={`relative flex gap-6 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  {/* Dot */}
                  <div
                    className="absolute left-2 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center md:left-1/2 md:-translate-x-1/2"
                    style={{ backgroundColor: "#1B4F72", top: "50%", transform: "translateY(-50%)" }}
                  >
                    <span className="w-2 h-2 rounded-full bg-white" />
                  </div>

                  {/* Content */}
                  <div className={`ml-14 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                    <div
                      className="rounded-2xl p-5 border"
                      style={{ backgroundColor: "#FAFBFD", borderColor: "#E8ECF1" }}
                    >
                      <span
                        className="text-sm px-3 py-1 rounded-full inline-block mb-2"
                        style={{ backgroundColor: "#1B4F72", color: "#fff" }}
                      >
                        {m.year}
                      </span>
                      <p className="text-sm" style={{ color: "#5A6178" }}>{m.event}</p>
                    </div>
                  </div>
                  <div className="hidden md:block md:w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 lg:py-20" style={{ backgroundColor: "#FAFBFD" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className="mb-3"
              style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(1.8rem, 4vw, 2.5rem)", color: "#1A1A2E" }}
            >
              Meet the Team
            </h2>
            <p style={{ color: "#5A6178" }}>The people behind Pakistan's veterinary revolution</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7 max-w-4xl mx-auto">
            {team.map((member) => (
              <div
                key={member.name}
                className="rounded-3xl overflow-hidden border text-center"
                style={{ backgroundColor: "#fff", borderColor: "#E8ECF1" }}
              >
                <ImageWithFallback
                  src={member.img}
                  alt={member.name}
                  className="w-full h-52 object-cover"
                />
                <div className="p-5">
                  <h3 style={{ color: "#1A1A2E", fontWeight: 700 }}>{member.name}</h3>
                  <p className="text-sm mb-3" style={{ color: "#2E86C1" }}>{member.role}</p>
                  <p className="text-xs leading-relaxed" style={{ color: "#5A6178" }}>{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section
        className="py-16 lg:py-20"
        style={{ background: "linear-gradient(135deg, #0D2F4F 0%, #1B4F72 100%)" }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-white mb-4"
            style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(1.8rem, 4vw, 2.5rem)" }}
          >
            Get in Touch
          </h2>
          <p className="mb-9" style={{ color: "#AED6F1" }}>
            Have questions? We'd love to hear from you.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-2xl mx-auto">
            {[
              { icon: Phone, label: "Call Us", value: "+92 300 VET CARE" },
              { icon: Mail, label: "Email Us", value: "hello@vetconnect.pk" },
              { icon: MapPin, label: "Visit Us", value: "Karachi, Pakistan" },
            ].map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="rounded-2xl p-5"
                style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
              >
                <Icon size={22} className="mx-auto mb-3" style={{ color: "#F39C12" }} />
                <p className="text-xs mb-1" style={{ color: "#8E94A7" }}>{label}</p>
                <p className="text-sm text-white">{value}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 justify-center mt-8">
            <Link
              to="/vetconnect/find-vet"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-white text-sm font-medium"
              style={{ backgroundColor: "#E67E22" }}
            >
              Find a Vet
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/vetconnect/for-clinics"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm"
              style={{ color: "#AED6F1", border: "1px solid rgba(174,214,241,0.3)" }}
            >
              For Clinics
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
