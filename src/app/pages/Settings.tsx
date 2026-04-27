import { useState } from "react";
import { Download, Users, Database, Shield, Bell, ChevronRight, LogOut, Trash2, UserPlus } from "lucide-react";
import { useApp } from "../context/AppContext";
import { PageHeader } from "../components/PageHeader";
import { useNavigate } from "react-router";

const STAFF_USERS = [
  { id: "s1", name: "Dr. Salem", role: "Veterinarian", status: "active" },
  { id: "s2", name: "Dr. Aisha", role: "Veterinarian", status: "active" },
  { id: "s3", name: "Dr. Karim", role: "Veterinarian", status: "active" },
  { id: "s4", name: "Sara (Receptionist)", role: "Staff", status: "active" },
  { id: "s5", name: "Omar (Technician)", role: "Staff", status: "inactive" },
];

export function Settings() {
  const { owners, pets, visits, invoices, logout } = useApp();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(true);
  const [autoBackup, setAutoBackup] = useState(true);
  const [showStaff, setShowStaff] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleExport = (type: string) => {
    alert(`Exporting ${type} data... (In production, this would download a CSV/JSON file)`);
  };

  const totalRecords = owners.length + pets.length + visits.length + invoices.length;

  return (
    <div>
      <PageHeader title="Settings" subtitle="App configuration & backup" />

      <div className="p-4 md:p-6 max-w-2xl mx-auto space-y-4">
        {/* App Config */}
        <SettingsCard title="App Configuration" icon={<Shield size={18} />}>
          <ToggleRow
            label="Push Notifications"
            description="Receive alerts for follow-ups and vaccinations due"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
          />
          <ToggleRow
            label="Auto Backup"
            description="Automatically backup data daily"
            checked={autoBackup}
            onChange={() => setAutoBackup(!autoBackup)}
          />
        </SettingsCard>

        {/* Staff Management */}
        <SettingsCard title="Staff Management" icon={<Users size={18} />}>
          <button
            onClick={() => setShowStaff(!showStaff)}
            className="flex items-center justify-between w-full py-2 text-sm"
          >
            <span className="text-[#333333]">Manage Staff Users ({STAFF_USERS.length})</span>
            <ChevronRight size={16} className={`text-gray-400 transition-transform ${showStaff ? "rotate-90" : ""}`} />
          </button>

          {showStaff && (
            <div className="mt-3 space-y-2 border-t border-gray-100 pt-3">
              {STAFF_USERS.map(user => (
                <div key={user.id} className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-[#333333] text-sm font-medium">{user.name}</p>
                    <p className="text-gray-500 text-xs">{user.role}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      user.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                    }`}>
                      {user.status}
                    </span>
                    <button className="text-red-400 hover:text-red-600 p-1">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
              <button className="flex items-center gap-2 w-full py-2.5 border-2 border-dashed border-[#2E86C1]/30 text-[#2E86C1] rounded-xl text-sm hover:bg-[#2E86C1]/5 transition-colors mt-2">
                <UserPlus size={16} /> Add Staff Member
              </button>
            </div>
          )}
        </SettingsCard>

        {/* Data Export */}
        <SettingsCard title="Data Export & Backup" icon={<Database size={18} />}>
          <div className="space-y-2">
            {[
              { label: "Export Owners List", count: owners.length, type: "owners" },
              { label: "Export Pets List", count: pets.length, type: "pets" },
              { label: "Export Visit Records", count: visits.length, type: "visits" },
              { label: "Export Invoices", count: invoices.length, type: "invoices" },
              { label: "Export All Data", count: totalRecords, type: "all" },
            ].map(item => (
              <button
                key={item.type}
                onClick={() => handleExport(item.type)}
                className="flex items-center justify-between w-full px-3 py-3 bg-gray-50 hover:bg-[#1B4F72]/5 rounded-xl transition-colors text-sm"
              >
                <div className="flex items-center gap-2">
                  <Download size={16} className="text-[#2E86C1]" />
                  <span className="text-[#333333]">{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 text-xs">{item.count} records</span>
                  <ChevronRight size={14} className="text-gray-400" />
                </div>
              </button>
            ))}
          </div>
        </SettingsCard>

        {/* Database Info */}
        <div className="bg-[#1B4F72]/5 border border-[#1B4F72]/10 rounded-2xl p-4">
          <h3 className="text-[#1B4F72] text-sm mb-3">Database Summary</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {[
              { label: "Owners", value: owners.length },
              { label: "Pets", value: pets.length },
              { label: "Visits", value: visits.length },
              { label: "Invoices", value: invoices.length },
            ].map(item => (
              <div key={item.label} className="flex justify-between">
                <span className="text-gray-600">{item.label}</span>
                <span className="text-[#1B4F72] font-medium">{item.value}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-[#1B4F72]/10 pt-2 mt-2 flex justify-between text-sm">
            <span className="text-[#333333] font-medium">Total Records</span>
            <span className="text-[#1B4F72] font-bold">{totalRecords}</span>
          </div>
        </div>

        {/* App Version */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center">
          <p className="text-gray-500 text-sm">PawCare VMS</p>
          <p className="text-gray-400 text-xs mt-0.5">Version 1.0.0 · Build 2024.04</p>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full py-4 bg-red-50 border border-red-200 text-red-600 rounded-2xl flex items-center justify-center gap-2 hover:bg-red-100 transition-colors"
        >
          <LogOut size={18} /> Sign Out
        </button>
      </div>
    </div>
  );
}

function SettingsCard({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 bg-[#F5F7FA] border-b border-gray-100">
        <span className="text-[#2E86C1]">{icon}</span>
        <h3 className="text-[#1B4F72] text-sm">{title}</h3>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

function ToggleRow({ label, description, checked, onChange }: {
  label: string; description: string; checked: boolean; onChange: () => void;
}) {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex-1 pr-4">
        <p className="text-[#333333] text-sm">{label}</p>
        <p className="text-gray-500 text-xs mt-0.5">{description}</p>
      </div>
      <button
        onClick={onChange}
        className={`relative w-12 h-6 rounded-full transition-colors flex-shrink-0 ${
          checked ? "bg-[#1B4F72]" : "bg-gray-300"
        }`}
      >
        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
          checked ? "right-1" : "left-1"
        }`} />
      </button>
    </div>
  );
}
