import { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router";
import {
  LayoutDashboard, Users, PawPrint, Calendar, FileText, BarChart3,
  Settings, RefreshCw, Menu, X, ChevronRight, Building2, Syringe,
  ClipboardList, LogOut, Bell
} from "lucide-react";
import { useApp } from "../context/AppContext";

const navItems = [
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/owners", label: "Owners", icon: Users },
  { path: "/pets", label: "Pets", icon: PawPrint },
  { path: "/follow-ups", label: "Follow-ups", icon: Calendar },
  { path: "/invoices", label: "Invoices", icon: FileText },
  { path: "/vaccinations-list", label: "Vaccinations", icon: Syringe },
  { path: "/reports", label: "Reports", icon: BarChart3 },
  { path: "/sync", label: "Sync", icon: RefreshCw },
  { path: "/clinic-profile", label: "Clinic Profile", icon: Building2 },
  { path: "/settings", label: "Settings", icon: Settings },
];

const bottomNavItems = [
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/owners", label: "Owners", icon: Users },
  { path: "/pets", label: "Pets", icon: PawPrint },
  { path: "/follow-ups", label: "Follow-ups", icon: Calendar },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const isMoreActive = !["/dashboard", "/owners", "/pets", "/follow-ups"].some(p =>
    location.pathname.startsWith(p)
  );

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-[#F5F7FA] overflow-hidden">
      {/* Desktop/Tablet Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-[#1B4F72] text-white flex-shrink-0">
        {/* Logo / Clinic Name */}
        <div className="px-5 py-5 border-b border-[#2E86C1]/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#2E86C1] rounded-xl flex items-center justify-center flex-shrink-0">
              <PawPrint size={22} className="text-white" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm leading-tight">PawCare</p>
              <p className="text-[#7FB3D3] text-xs">Veterinary Clinic</p>
            </div>
          </div>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 overflow-y-auto py-3 px-3">
          {navItems.map(({ path, label, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-3 rounded-xl mb-1 transition-all ${
                  isActive
                    ? "bg-[#2E86C1] text-white"
                    : "text-[#AED6F1] hover:bg-[#2E86C1]/30 hover:text-white"
                }`
              }
            >
              <Icon size={20} />
              <span className="text-sm">{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-[#2E86C1]/30">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-3 rounded-xl text-[#AED6F1] hover:bg-red-500/20 hover:text-red-300 transition-all"
          >
            <LogOut size={20} />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar Drawer */}
      <aside
        className={`md:hidden fixed left-0 top-0 h-full w-72 bg-[#1B4F72] text-white z-50 transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-5 border-b border-[#2E86C1]/30">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#2E86C1] rounded-xl flex items-center justify-center">
              <PawPrint size={20} className="text-white" />
            </div>
            <span className="font-semibold">PawCare</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="text-white p-1">
            <X size={24} />
          </button>
        </div>
        <nav className="overflow-y-auto py-3 px-3 h-full pb-20">
          {navItems.map(({ path, label, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-3.5 rounded-xl mb-1 transition-all ${
                  isActive
                    ? "bg-[#2E86C1] text-white"
                    : "text-[#AED6F1] hover:bg-[#2E86C1]/30 hover:text-white"
                }`
              }
            >
              <Icon size={20} />
              <span>{label}</span>
              <ChevronRight size={16} className="ml-auto opacity-50" />
            </NavLink>
          ))}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-3.5 rounded-xl text-[#AED6F1] hover:bg-red-500/20 hover:text-red-300 transition-all mt-4"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header (Mobile) */}
        <header className="md:hidden bg-[#1B4F72] text-white px-4 py-3 flex items-center justify-between flex-shrink-0 shadow-md">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 -ml-1 rounded-lg hover:bg-[#2E86C1]/30 transition-colors"
          >
            <Menu size={24} />
          </button>
          <div className="flex items-center gap-2">
            <PawPrint size={20} className="text-[#7FB3D3]" />
            <span className="font-semibold">PawCare</span>
          </div>
          <button className="p-2 rounded-lg hover:bg-[#2E86C1]/30 transition-colors relative">
            <Bell size={22} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-400 rounded-full"></span>
          </button>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
          {children}
        </main>

        {/* Bottom Navigation (Mobile) */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30 flex shadow-lg">
          {bottomNavItems.map(({ path, label, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `flex-1 flex flex-col items-center justify-center py-2.5 gap-1 transition-colors ${
                  isActive ? "text-[#1B4F72]" : "text-gray-400"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className={`p-1 rounded-lg ${isActive ? "bg-[#1B4F72]/10" : ""}`}>
                    <Icon size={22} strokeWidth={isActive ? 2.5 : 1.8} />
                  </div>
                  <span className="text-xs">{label}</span>
                </>
              )}
            </NavLink>
          ))}
          <NavLink
            to="/more"
            className={`flex-1 flex flex-col items-center justify-center py-2.5 gap-1 transition-colors ${
              isMoreActive ? "text-[#1B4F72]" : "text-gray-400"
            }`}
          >
            <div className={`p-1 rounded-lg ${isMoreActive ? "bg-[#1B4F72]/10" : ""}`}>
              <Menu size={22} strokeWidth={isMoreActive ? 2.5 : 1.8} />
            </div>
            <span className="text-xs">More</span>
          </NavLink>
        </nav>
      </div>
    </div>
  );
}
