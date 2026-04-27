import { Link } from "react-router";
import { PawPrint, Phone, Mail, MapPin, Facebook, Instagram, Youtube } from "lucide-react";

// WhatsApp icon as SVG since lucide doesn't have it
function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const quickLinks = [
  { label: "Home", to: "/vetconnect" },
  { label: "Features", to: "/vetconnect" },
  { label: "Find a Vet", to: "/vetconnect/find-vet" },
  { label: "Blog", to: "/vetconnect/about" },
  { label: "About Us", to: "/vetconnect/about" },
];

const forVets = [
  { label: "Register Your Clinic", to: "/vetconnect/for-clinics" },
  { label: "Clinic Dashboard", to: "/login" },
  { label: "Pricing Plans", to: "/vetconnect/for-clinics" },
  { label: "Vet Resources", to: "/vetconnect/for-clinics" },
  { label: "Become a Partner", to: "/vetconnect/for-clinics" },
];

export function Footer() {
  return (
    <footer
      className="text-white"
      style={{ backgroundColor: "#0D2F4F", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Column 1: Brand */}
          <div>
            <Link to="/vetconnect" className="flex items-center gap-2.5 mb-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md"
                style={{ background: "linear-gradient(135deg, #1B4F72, #2874A6)" }}
              >
                <PawPrint size={21} className="text-white" />
              </div>
              <span
                className="text-2xl text-white"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                VetConnect
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "#8E94A7" }}>
              Pakistan's leading veterinary platform connecting pet owners with verified, trusted vets.
              Because your pet deserves the best care, right in your city.
            </p>

            {/* Social icons */}
            <div className="flex gap-3">
              {[
                { Icon: Facebook, label: "Facebook" },
                { Icon: Instagram, label: "Instagram" },
                { Icon: WhatsAppIcon, label: "WhatsApp" },
                { Icon: Youtube, label: "Youtube" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all"
                  style={{ backgroundColor: "#1B4F72" }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#2E86C1")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#1B4F72")
                  }
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white text-sm mb-5" style={{ fontWeight: 700, letterSpacing: "0.05em" }}>
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm transition-colors hover:text-white"
                    style={{ color: "#8E94A7" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#fff")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#8E94A7")}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: For Vets */}
          <div>
            <h4 className="text-white text-sm mb-5" style={{ fontWeight: 700, letterSpacing: "0.05em" }}>
              For Veterinarians
            </h4>
            <ul className="space-y-3">
              {forVets.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm transition-colors"
                    style={{ color: "#8E94A7" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#fff")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#8E94A7")}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="text-white text-sm mb-5" style={{ fontWeight: 700, letterSpacing: "0.05em" }}>
              Contact Us
            </h4>
            <div className="space-y-3.5">
              {[
                { Icon: Mail, text: "hello@vetconnect.pk" },
                { Icon: Phone, text: "+92 300 VETCARE (838 2273)" },
                {
                  Icon: MapPin,
                  text: "Susan Road, Madina Town, Faisalabad, Punjab, Pakistan",
                },
              ].map(({ Icon, text }) => (
                <div key={text} className="flex items-start gap-3">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: "rgba(46,134,193,0.2)" }}
                  >
                    <Icon size={13} style={{ color: "#2E86C1" }} />
                  </div>
                  <span className="text-sm leading-relaxed" style={{ color: "#8E94A7" }}>
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t" style={{ borderColor: "#1B4F72" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-center sm:text-left" style={{ color: "#5A6178" }}>
            © 2026 VetConnect Pakistan. All rights reserved. Made with ❤️ for Pakistani pet lovers.
          </p>
          <div className="flex gap-5">
            {["Privacy Policy", "Terms of Service", "Cookies"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-xs transition-colors"
                style={{ color: "#5A6178" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#fff")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#5A6178")}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
