import { useState } from "react";
import { Building2, Phone, Mail, MapPin, FileText, Percent, Save, Camera, Edit2 } from "lucide-react";
import { useApp } from "../context/AppContext";
import { PageHeader } from "../components/PageHeader";

export function ClinicProfile() {
  const { clinicProfile, updateClinicProfile } = useApp();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ ...clinicProfile });

  const handleSave = () => {
    updateClinicProfile(form);
    setEditing(false);
  };

  const handleCancel = () => {
    setForm({ ...clinicProfile });
    setEditing(false);
  };

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [field]: field === "taxRate" ? parseFloat(e.target.value) || 0 : e.target.value }));
  };

  return (
    <div>
      <PageHeader
        title="Clinic Profile"
        action={editing ? undefined : { label: "Edit", icon: <Edit2 size={16} />, onClick: () => setEditing(true) }}
      />

      <div className="p-4 md:p-6 max-w-2xl mx-auto space-y-4">
        {/* Clinic Header */}
        <div className="bg-gradient-to-r from-[#1B4F72] to-[#2E86C1] rounded-2xl p-6 text-white">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center">
              <Building2 size={36} className="text-white" />
            </div>
            <div>
              <h2 className="text-white">{clinicProfile.name}</h2>
              <p className="text-[#AED6F1] text-sm mt-0.5">License: {clinicProfile.licenseNumber}</p>
              <button className="mt-2 flex items-center gap-1.5 text-[#AED6F1] text-sm hover:text-white transition-colors">
                <Camera size={14} /> Upload Logo
              </button>
            </div>
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-4 py-3 bg-[#F5F7FA] border-b border-gray-100">
            <h3 className="text-[#1B4F72] text-sm">Clinic Information</h3>
          </div>
          <div className="p-4 space-y-4">
            {editing ? (
              <>
                <Field label="Clinic Name">
                  <input value={form.name} onChange={set("name")} className={input} />
                </Field>
                <Field label="Address">
                  <input value={form.address} onChange={set("address")} className={input} />
                </Field>
                <Field label="Phone">
                  <input value={form.phone} onChange={set("phone")} type="tel" className={input} />
                </Field>
                <Field label="Email">
                  <input value={form.email} onChange={set("email")} type="email" className={input} />
                </Field>
                <Field label="License Number">
                  <input value={form.licenseNumber} onChange={set("licenseNumber")} className={input} />
                </Field>
                <Field label="Tax Rate (%)">
                  <input value={form.taxRate} onChange={set("taxRate")} type="number" step="0.1" min="0" max="100" className={input} />
                </Field>
              </>
            ) : (
              <div className="divide-y divide-gray-50">
                <InfoRow icon={<Building2 size={18} />} label="Name" value={clinicProfile.name} />
                <InfoRow icon={<MapPin size={18} />} label="Address" value={clinicProfile.address} />
                <InfoRow icon={<Phone size={18} />} label="Phone" value={clinicProfile.phone} />
                <InfoRow icon={<Mail size={18} />} label="Email" value={clinicProfile.email} />
                <InfoRow icon={<FileText size={18} />} label="License" value={clinicProfile.licenseNumber} />
                <InfoRow icon={<Percent size={18} />} label="Tax Rate" value={`${clinicProfile.taxRate}%`} />
              </div>
            )}
          </div>
        </div>

        {editing && (
          <div className="flex gap-3">
            <button onClick={handleCancel} className="flex-1 py-4 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button onClick={handleSave} className="flex-1 py-4 bg-[#1B4F72] text-white rounded-xl hover:bg-[#2E86C1] transition-colors flex items-center justify-center gap-2 shadow-md">
              <Save size={18} /> Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 py-3">
      <div className="text-[#2E86C1] mt-0.5 flex-shrink-0">{icon}</div>
      <div>
        <p className="text-gray-500 text-xs">{label}</p>
        <p className="text-[#333333] mt-0.5">{value}</p>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[#333333] text-sm mb-1.5">{label}</label>
      {children}
    </div>
  );
}

const input = "w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-[#2E86C1] focus:bg-white transition-colors";
