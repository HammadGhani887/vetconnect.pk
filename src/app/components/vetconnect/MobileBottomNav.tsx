import { NavLink, useLocation } from "react-router";
import { Home, Search, PawPrint, Calendar, User } from "lucide-react";

const TABS = [
  { label: "Home",       to: "/vetconnect",          Icon: Home,     end: true },
  { label: "Find Vet",   to: "/vetconnect/find-vet", Icon: Search,   end: false },
  { label: "My Pets",   to: "/vetconnect/portal",   Icon: PawPrint, end: false },
  { label: "Bookings",  to: "/vetconnect/portal",   Icon: Calendar, end: false, state: "appointments" },
  { label: "Profile",   to: "/vetconnect/login",    Icon: User,     end: false },
];

export function MobileBottomNav() {
  const location = useLocation();

  // Hide on standalone pages (login, signup, portal sub-routes)
  const hidden = ["/vetconnect/login", "/vetconnect/signup"].includes(location.pathname);
  if (hidden) return null;

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50 flex items-stretch border-t"
      style={{
        backgroundColor: "#fff",
        borderColor: "rgba(0,0,0,0.08)",
        boxShadow: "0 -4px 24px rgba(0,0,0,0.08)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      {TABS.map(({ label, to, Icon, end }) => (
        <NavLink
          key={label + to}
          to={to}
          end={end}
          className="flex-1 flex flex-col items-center justify-center gap-1 py-2.5 relative transition-colors"
          style={({ isActive }) => ({
            color: isActive ? "#1B4F72" : "#9CA3AF",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          })}
        >
          {({ isActive }) => (
            <>
              {isActive && (
                <span
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full"
                  style={{ backgroundColor: "#E67E22" }}
                />
              )}
              <Icon
                size={22}
                strokeWidth={isActive ? 2.2 : 1.7}
                style={{ color: isActive ? "#1B4F72" : "#9CA3AF" }}
              />
              <span
                className="text-center"
                style={{
                  fontSize: "0.6rem",
                  fontWeight: isActive ? 700 : 500,
                  letterSpacing: "0.01em",
                  lineHeight: 1,
                }}
              >
                {label}
              </span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
