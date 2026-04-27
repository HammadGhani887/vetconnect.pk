import React, { useState } from "react";
import { Phone, Mail, MapPin, MessageCircle, ChevronDown, ChevronUp, Send, CheckCircle } from "lucide-react";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";

const FONT_HEADING = "'DM Serif Display', serif";
const FONT_BODY = "'Plus Jakarta Sans', sans-serif";

/* ─── FAQ Data ─────────────────────────────────────────── */
const faqs = [
  {
    id: 1,
    question: "How do I register as a veterinarian?",
    answer:
      "Registering as a vet on VetConnect is simple. Click the 'For Clinics' option in the navigation, fill in your clinic details, upload your PVMC licence, and our team will verify and activate your profile within 48 hours.",
  },
  {
    id: 2,
    question: "Is VetConnect free for pet owners?",
    answer:
      "Yes! Browsing vet profiles, reading articles, and using the Pet Owner Portal are completely free. You only pay for any professional consultation fees set by the veterinarian you book.",
  },
  {
    id: 3,
    question: "How does appointment booking work?",
    answer:
      "Find a verified vet near you using our search, select a convenient time slot from their live availability calendar, and confirm your booking. You'll receive an SMS and email confirmation instantly.",
  },
  {
    id: 4,
    question: "Is my pet's data secure?",
    answer:
      "Absolutely. All health records, vaccination logs, and personal information are encrypted and stored on secure servers. You control who sees your pet's data, and we never sell your information to third parties.",
  },
  {
    id: 5,
    question: "Which cities are covered?",
    answer:
      "VetConnect is currently live in Faisalabad, Lahore, Karachi, Islamabad, Rawalpindi, and Multan. We are rapidly expanding to more cities across Pakistan — stay tuned!",
  },
];

/* ─── Contact Card ──────────────────────────────────────── */
function ContactCard({
  icon,
  title,
  primary,
  secondary,
}: {
  icon: React.ReactNode;
  title: string;
  primary: string;
  secondary: string;
}) {
  return (
    <div className="flex flex-col items-center text-center bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="w-14 h-14 rounded-full bg-[#1B4F72]/10 flex items-center justify-center mb-4 text-[#E67E22]">
        {icon}
      </div>
      <h3 className="text-[#1B4F72] mb-2" style={{ fontFamily: FONT_HEADING, fontSize: "1.25rem" }}>
        {title}
      </h3>
      <p className="text-gray-800 font-semibold mb-1" style={{ fontFamily: FONT_BODY }}>
        {primary}
      </p>
      <p className="text-gray-500 text-sm" style={{ fontFamily: FONT_BODY }}>
        {secondary}
      </p>
    </div>
  );
}

/* ─── FAQ Item ──────────────────────────────────────────── */
function FAQItem({ faq }: { faq: (typeof faqs)[0] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 bg-white hover:bg-gray-50 transition-colors text-left"
        style={{ fontFamily: FONT_BODY }}
      >
        <span className="text-[#1B4F72] font-semibold">{faq.question}</span>
        <span className="flex-shrink-0 text-[#E67E22]">
          {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </span>
      </button>
      {open && (
        <div
          className="px-6 pb-5 bg-white text-gray-600 leading-relaxed border-t border-gray-100"
          style={{ fontFamily: FONT_BODY }}
        >
          <p className="pt-4">{faq.answer}</p>
        </div>
      )}
    </div>
  );
}

/* ─── Map Placeholder ───────────────────────────────────── */
function MapPlaceholder() {
  return (
    <div className="relative rounded-2xl overflow-hidden h-full min-h-[340px] shadow-md">
      <ImageWithFallback
        src="https://images.unsplash.com/photo-1602939590728-4ba9d4ba5d65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxGYWlzYWxhYmFkJTIwUGFraXN0YW4lMjBjaXR5JTIwbWFwJTIwYWVyaWFsfGVufDF8fHx8MTc3NzI3Mzg1MXww&ixlib=rb-4.1.0&q=80&w=1080"
        alt="Faisalabad location map"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Overlay tint */}
      <div className="absolute inset-0 bg-[#1B4F72]/30" />

      {/* Pin marker */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
        <div className="bg-white rounded-2xl px-5 py-3 shadow-lg flex items-center gap-2">
          <MapPin size={18} className="text-[#E67E22]" />
          <span className="text-[#1B4F72] font-semibold text-sm" style={{ fontFamily: FONT_BODY }}>
            VetConnect HQ — Faisalabad
          </span>
        </div>
        <div
          className="w-5 h-5 rounded-full bg-[#E67E22] border-4 border-white shadow-md animate-pulse"
          style={{ marginTop: -4 }}
        />
      </div>

      {/* Corner badge */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 text-xs text-[#1B4F72] font-medium shadow" style={{ fontFamily: FONT_BODY }}>
        Punjab, Pakistan
      </div>
    </div>
  );
}

/* ─── Main Page ─────────────────────────────────────────── */
export function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1400);
  }

  return (
    <div className="min-h-screen bg-[#FFF9F2]" style={{ fontFamily: FONT_BODY }}>

      {/* ── HERO ─────────────────────────────────────────── */}
      <section
        className="relative pt-28 pb-20 px-4 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0d2f44 0%, #1B4F72 55%, #2471a3 100%)",
        }}
      >
        {/* decorative circles */}
        <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute bottom-0 left-8 w-48 h-48 rounded-full bg-[#E67E22]/10 pointer-events-none" />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <span
            className="inline-block bg-[#E67E22]/20 text-[#E67E22] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6"
            style={{ fontFamily: FONT_BODY }}
          >
            Contact Us
          </span>
          <h1
            className="text-white mb-5"
            style={{ fontFamily: FONT_HEADING, fontSize: "clamp(2.4rem, 5vw, 3.6rem)", lineHeight: 1.15 }}
          >
            Get in Touch
          </h1>
          <p className="text-blue-200 max-w-xl mx-auto" style={{ fontSize: "1.1rem", lineHeight: 1.7 }}>
            Have questions? We'd love to hear from you. Reach out to our team and we'll get back to you as soon as possible.
          </p>
        </div>
      </section>

      {/* ── CONTACT CARDS ────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 -mt-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <ContactCard
            icon={<Phone size={26} />}
            title="Call Us"
            primary="+92 333 1234567"
            secondary="Mon–Sat, 9AM–6PM"
          />
          <ContactCard
            icon={<Mail size={26} />}
            title="Email Us"
            primary="info@vetconnect.pk"
            secondary="We reply within 24 hours"
          />
          <ContactCard
            icon={<MapPin size={26} />}
            title="Visit Us"
            primary="Faisalabad"
            secondary="Punjab, Pakistan"
          />
        </div>
      </section>

      {/* ── FORM + MAP ───────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-stretch">

          {/* Form — 60% */}
          <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10">
            <h2
              className="text-[#1B4F72] mb-2"
              style={{ fontFamily: FONT_HEADING, fontSize: "2rem" }}
            >
              Send Us a Message
            </h2>
            <p className="text-gray-500 mb-8 text-sm">
              Fill in the form below and we'll get back to you shortly.
            </p>

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
                <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
                  <CheckCircle size={36} className="text-green-500" />
                </div>
                <h3 className="text-[#1B4F72] text-xl font-semibold" style={{ fontFamily: FONT_HEADING }}>
                  Message Sent!
                </h3>
                <p className="text-gray-500 max-w-sm">
                  Thanks for reaching out. Our team will respond to your query within 24 hours.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", subject: "", message: "" }); }}
                  className="mt-2 text-[#E67E22] font-semibold hover:underline text-sm"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Full Name <span className="text-[#E67E22]">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="e.g. Ahmed Raza"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-[#1B4F72] focus:ring-2 focus:ring-[#1B4F72]/10 transition"
                    />
                  </div>
                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Email Address <span className="text-[#E67E22]">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="you@example.com"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-[#1B4F72] focus:ring-2 focus:ring-[#1B4F72]/10 transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+92 3XX XXXXXXX"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-[#1B4F72] focus:ring-2 focus:ring-[#1B4F72]/10 transition"
                    />
                  </div>
                  {/* Subject */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Subject <span className="text-[#E67E22]">*</span>
                    </label>
                    <select
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-[#1B4F72] focus:ring-2 focus:ring-[#1B4F72]/10 transition appearance-none bg-white"
                    >
                      <option value="">Select a topic…</option>
                      <option value="general">General Inquiry</option>
                      <option value="partnership">Partnership</option>
                      <option value="bug">Bug Report</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Message <span className="text-[#E67E22]">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Write your message here…"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-[#1B4F72] focus:ring-2 focus:ring-[#1B4F72]/10 transition resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-[#E67E22] hover:bg-[#d06c14] text-white font-semibold py-3.5 rounded-xl transition-colors disabled:opacity-70"
                >
                  {loading ? (
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                  ) : (
                    <Send size={17} />
                  )}
                  {loading ? "Sending…" : "Send Message"}
                </button>

                {/* WhatsApp CTA */}
                <div className="flex items-center gap-3 pt-2">
                  <div className="flex-1 h-px bg-gray-200" />
                  <span className="text-xs text-gray-400 font-medium">or</span>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>
                <a
                  href="https://wa.me/923331234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2.5 border-2 border-green-500 text-green-600 hover:bg-green-50 font-semibold py-3.5 rounded-xl transition-colors"
                >
                  {/* WhatsApp SVG icon */}
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Reach us on WhatsApp · +92 333 1234567
                </a>
              </form>
            )}
          </div>

          {/* Map — 40% */}
          <div className="lg:col-span-2">
            <MapPlaceholder />

            {/* Hours card below map */}
            <div className="mt-5 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h4 className="text-[#1B4F72] font-semibold mb-3" style={{ fontFamily: FONT_HEADING, fontSize: "1.1rem" }}>
                Office Hours
              </h4>
              <ul className="space-y-2 text-sm text-gray-600" style={{ fontFamily: FONT_BODY }}>
                {[
                  ["Monday – Friday", "9:00 AM – 6:00 PM"],
                  ["Saturday", "10:00 AM – 3:00 PM"],
                  ["Sunday", "Closed"],
                ].map(([day, hours]) => (
                  <li key={day} className="flex justify-between">
                    <span className="text-gray-500">{day}</span>
                    <span className={hours === "Closed" ? "text-red-400 font-medium" : "text-gray-800 font-medium"}>
                      {hours}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ SECTION ──────────────────────────────────── */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span
              className="inline-block bg-[#E67E22]/10 text-[#E67E22] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4"
              style={{ fontFamily: FONT_BODY }}
            >
              FAQ
            </span>
            <h2
              className="text-[#1B4F72]"
              style={{ fontFamily: FONT_HEADING, fontSize: "clamp(1.8rem, 4vw, 2.6rem)" }}
            >
              Frequently Asked Questions
            </h2>
            <p className="text-gray-500 mt-3 max-w-lg mx-auto">
              Can't find what you're looking for? Feel free to contact our support team directly.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq) => (
              <FAQItem key={faq.id} faq={faq} />
            ))}
          </div>

          {/* Still have questions CTA */}
          <div className="mt-12 rounded-2xl bg-[#1B4F72] p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-white mb-1" style={{ fontFamily: FONT_HEADING, fontSize: "1.4rem" }}>
                Still have questions?
              </h3>
              <p className="text-blue-200 text-sm">
                Our support team is ready to help you, any time.
              </p>
            </div>
            <a
              href="mailto:info@vetconnect.pk"
              className="flex-shrink-0 inline-flex items-center gap-2 bg-[#E67E22] hover:bg-[#d06c14] text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              <Mail size={16} />
              Email Support
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}