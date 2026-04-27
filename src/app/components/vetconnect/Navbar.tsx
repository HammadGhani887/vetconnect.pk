import { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router";
import { Menu, X, Home, Search, Heart, Calendar, User, ChevronRight } from "lucide-react";

const navLinks = [
  { label: "Features", to: "/vetconnect", end: true },
  { label: "Find a Vet", to: "/vetconnect/find-vet", end: false },
  { label: "Blog", to: "/vetconnect/blog", end: false },
  { label: "Contact", to: "/vetconnect/contact", end: false },
];

const mobileQuickLinks = [
  { label: "Home", to: "/vetconnect", Icon: Home, end: true },
  { label: "Find a Vet", to: "/vetconnect/find-vet", Icon: Search, end: false },
  { label: "My Pets", to: "/vetconnect/portal", Icon: Heart, end: false },
  { label: "Bookings", to: "/vetconnect/portal", Icon: Calendar, end: false },
  { label: "Profile", to: "/vetconnect/login", Icon: User, end: false },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // Close overlay on route change
  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  // Lock body scroll when overlay is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className="sticky top-0 z-50 w-full"
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        {/* Announcement bar — hidden on mobile to save space */}
        <div
          className="hidden sm:block text-white text-center py-2 text-xs"
          style={{ backgroundColor: "#E67E22" }}
        >
          🐾 Now serving pet owners across Pakistan — Karachi, Lahore, Islamabad, Faisalabad &amp; 46 more cities!
        </div>

        {/* Main navbar */}
        <nav
          className="w-full border-b"
          style={{ backgroundColor: "#0D2F4F", borderColor: "rgba(255,255,255,0.07)" }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-14 sm:h-16">

              {/* Logo */}
              <Link to="/vetconnect" className="flex items-center flex-shrink-0">
                <img src="/vetconnect-logo.svg" alt="VetConnect" className="h-9 sm:h-10 w-auto" />
              </Link>

              {/* Desktop Nav Links */}
              <div className="hidden md:flex items-center gap-0.5">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.label}
                    to={link.to}
                    end={link.end}
                    className={({ isActive }) =>
                      `px-4 py-2 rounded-lg text-sm transition-all ${isActive
                        ? "text-white bg-white/10"
                        : "text-[#8E94A7] hover:text-white hover:bg-white/5"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>

              {/* Desktop CTA */}
              <div className="hidden md:flex items-center gap-3">
                <Link
                  to="/vetconnect/login"
                  className="text-sm px-5 py-2 rounded-full border transition-all"
                  style={{ color: "#AED6F1", borderColor: "rgba(255,255,255,0.2)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.5)";
                    (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "rgba(255,255,255,0.05)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = "#AED6F1";
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.2)";
                    (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent";
                  }}
                >
                  Log In
                </Link>
                <Link
                  to="/vetconnect/signup"
                  className="text-sm px-5 py-2 rounded-full text-white font-medium transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                  style={{ backgroundColor: "#E67E22" }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#D35400")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#E67E22")
                  }
                >
                  Sign Up Free
                </Link>
              </div>

              {/* Mobile hamburger */}
              <button
                className="md:hidden text-white p-2 rounded-xl transition-colors"
                style={{ background: mobileOpen ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.06)" }}
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* ── FULL-SCREEN MOBILE OVERLAY ── */}
      {/* Backdrop */}
      <div
        className={`md:hidden fixed inset-0 z-[60] transition-opacity duration-300 ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        style={{ backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
        onClick={() => setMobileOpen(false)}
      />

      {/* Slide-in panel */}
      <div
        className={`md:hidden fixed top-0 right-0 bottom-0 z-[70] w-[85vw] max-w-xs flex flex-col transition-transform duration-300 ease-out ${mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        style={{ backgroundColor: "#0D2F4F", boxShadow: "-8px 0 40px rgba(0,0,0,0.35)" }}
      >
        {/* Panel header */}
        <div
          className="flex items-center justify-between px-5 py-4 flex-shrink-0"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div className="flex items-center">
            <img src="/vetconnect-logo.svg" alt="VetConnect" className="h-8 w-auto" />
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Quick navigation */}
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-1">
          <p className="text-white/30 uppercase tracking-widest px-3 mb-3"
            style={{ fontSize: "0.6rem" }}>
            Navigation
          </p>

          {mobileQuickLinks.map(({ label, to, Icon, end }) => (
            <NavLink
              key={label}
              to={to}
              end={end}
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between px-3 py-3.5 rounded-xl transition-all group"
              style={({ isActive }) => ({
                backgroundColor: isActive ? "rgba(230,126,34,0.15)" : "transparent",
                color: isActive ? "#E67E22" : "rgba(255,255,255,0.75)",
              })}
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{
                        backgroundColor: isActive ? "rgba(230,126,34,0.2)" : "rgba(255,255,255,0.06)",
                      }}
                    >
                      <Icon size={16} style={{ color: isActive ? "#E67E22" : "rgba(255,255,255,0.5)" }} />
                    </div>
                    <span
                      className="text-sm"
                      style={{ fontWeight: isActive ? 700 : 500 }}
                    >
                      {label}
                    </span>
                  </div>
                  <ChevronRight size={14} style={{ color: isActive ? "#E67E22" : "rgba(255,255,255,0.25)" }} />
                </>
              )}
            </NavLink>
          ))}

          {/* Divider */}
          <div className="h-px my-4" style={{ backgroundColor: "rgba(255,255,255,0.08)" }} />

          <p className="text-white/30 uppercase tracking-widest px-3 mb-3"
            style={{ fontSize: "0.6rem" }}>
            More
          </p>

          {[
            { label: "Blog & Articles", to: "/vetconnect/blog" },
            { label: "Contact Us", to: "/vetconnect/contact" },
            { label: "For Clinics", to: "/vetconnect/for-clinics" },
            { label: "About Us", to: "/vetconnect/about" },
          ].map(({ label, to }) => (
            <NavLink
              key={label}
              to={to}
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between px-3 py-3 rounded-xl transition-all"
              style={({ isActive }) => ({
                backgroundColor: isActive ? "rgba(255,255,255,0.08)" : "transparent",
                color: isActive ? "#fff" : "rgba(255,255,255,0.55)",
              })}
            >
              <span className="text-sm">{label}</span>
              <ChevronRight size={13} style={{ color: "rgba(255,255,255,0.2)" }} />
            </NavLink>
          ))}
        </div>

        {/* Panel footer — auth buttons */}
        <div
          className="px-4 py-5 space-y-2.5 flex-shrink-0"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <Link
            to="/vetconnect/signup"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center w-full py-3.5 rounded-xl text-white text-sm font-semibold transition-all active:scale-95"
            style={{ background: "linear-gradient(135deg,#E67E22,#d06c14)", boxShadow: "0 4px 16px rgba(230,126,34,0.35)" }}
          >
            Sign Up Free
          </Link>
          <Link
            to="/vetconnect/login"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center w-full py-3 rounded-xl text-sm font-medium transition-all"
            style={{ color: "#AED6F1", border: "1px solid rgba(255,255,255,0.15)" }}
          >
            Log In
          </Link>
        </div>
      </div>
    </>
  );
}
