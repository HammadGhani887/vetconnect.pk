import { useNavigate } from "react-router";
import {
  FileText, BarChart3, RefreshCw, Settings, Building2, Syringe,
  ChevronRight, Bell, LogOut
} from "lucide-react";
import { useApp } from "../context/AppContext";

const menuItems = [
  { path: "/follow-ups", label: "Follow-up Schedule", icon: Bell, description: "View and manage follow-ups", color: "amber" },
  { path: "/invoices", label: "Invoices", icon: FileText, description: "Billing and payments", color: "green" },
  { path: "/vaccinations-list", label: "Vaccinations", icon: Syringe, description: "Vaccination records and schedules", color: "purple" },
  { path: "/reports", label: "Reports", icon: BarChart3, description: "Analytics and summaries", color: "blue" },
  { path: "/sync", label: "Sync", icon: RefreshCw, description: "Sync clinic data", color: "blue" },
  { path: "/clinic-profile", label: "Clinic Profile", icon: Building2, description: "Manage clinic information", color: "gray" },
  { path: "/settings", label: "Settings", icon: Settings, description: "App configuration", color: "gray" },
];

const colorMap: Record<string, string> = {
  amber: "bg-amber-100 text-amber-600",
  green: "bg-green-100 text-green-600",
  purple: "bg-purple-100 text-purple-600",
  blue: "bg-blue-100 text-blue-600",
  gray: "bg-gray-100 text-gray-600",
};

export function MoreMenu() {
  const navigate = useNavigate();
  const { logout } = useApp();

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="mb-4">
        <h1 className="text-[#1B4F72]">More</h1>
        <p className="text-gray-500 text-sm">All features & settings</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {menuItems.map((item, i) => {
          const Icon = item.icon;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-3 w-full px-4 py-4 hover:bg-gray-50 active:bg-gray-100 transition-colors text-left ${
                i < menuItems.length - 1 ? "border-b border-gray-100" : ""
              }`}
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${colorMap[item.color]}`}>
                <Icon size={22} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[#333333] font-medium">{item.label}</p>
                <p className="text-gray-500 text-sm">{item.description}</p>
              </div>
              <ChevronRight size={18} className="text-gray-300 flex-shrink-0" />
            </button>
          );
        })}
      </div>

      <button
        onClick={() => { logout(); navigate("/login"); }}
        className="w-full mt-4 py-4 bg-red-50 border border-red-200 text-red-600 rounded-2xl flex items-center justify-center gap-2 hover:bg-red-100 transition-colors"
      >
        <LogOut size={18} /> Sign Out
      </button>

      <p className="text-center text-gray-400 text-xs mt-6">PawCare VMS v1.0.0</p>
    </div>
  );
}
