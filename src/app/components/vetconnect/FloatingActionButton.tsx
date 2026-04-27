import { Link, useLocation } from "react-router";
import { Calendar } from "lucide-react";

// Pages where the FAB should appear
const FAB_PAGES = [
  "/vetconnect",
  "/vetconnect/find-vet",
  "/vetconnect/portal",
  "/vetconnect/blog",
];

// Regex for vet profile pages
const VET_PROFILE_RE = /^\/vetconnect\/vet\/\d+/;

export function FloatingActionButton() {
  const { pathname } = useLocation();

  const show =
    FAB_PAGES.includes(pathname) ||
    VET_PROFILE_RE.test(pathname);

  if (!show) return null;

  return (
    <Link
      to="/vetconnect/find-vet"
      className="lg:hidden fixed z-40 flex items-center gap-2 px-5 py-3.5 rounded-full shadow-2xl active:scale-95 transition-transform"
      style={{
        bottom: "calc(env(safe-area-inset-bottom, 0px) + 76px)",
        right: "16px",
        background: "linear-gradient(135deg, #E67E22, #d06c14)",
        boxShadow: "0 6px 24px rgba(230,126,34,0.45)",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        color: "#fff",
        fontWeight: 700,
        fontSize: "0.82rem",
        letterSpacing: "0.01em",
      }}
    >
      <Calendar size={16} strokeWidth={2.2} />
      Book Appointment
    </Link>
  );
}
