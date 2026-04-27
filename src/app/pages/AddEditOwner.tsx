import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Save, Trash2 } from "lucide-react";
import { useApp } from "../context/AppContext";
import { PageHeader } from "../components/PageHeader";

export function AddEditOwner() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addOwner, updateOwner, getOwnerById } = useApp();
  const existing = id ? getOwnerById(id) : undefined;
  const isEdit = !!existing;

  const [form, setForm] = useState({
    name: existing?.name || "",
    phone: existing?.phone || "",
    email: existing?.email || "",
    address: existing?.address || "",
    idNumber: existing?.idNumber || "",
    notes: existing?.notes || "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.phone.trim()) errs.phone = "Phone is required";
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    if (isEdit && id) {
      updateOwner(id, form);
      navigate(`/owners/${id}`);
    } else {
      const newOwner = addOwner(form);
      navigate(`/owners/${newOwner.id}`);
    }
  };

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: "" }));
  };

  return (
    <div>
      <PageHeader
        title={isEdit ? "Edit Owner" : "Add New Owner"}
        showBack
      />

      <div className="p-4 md:p-6 max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormCard title="Personal Information">
            <Field label="Full Name *" error={errors.name}>
              <input
                value={form.name}
                onChange={set("name")}
                placeholder="Enter full name"
                className={inputClass(!!errors.name)}
              />
            </Field>
            <Field label="Phone Number *" error={errors.phone}>
              <input
                value={form.phone}
                onChange={set("phone")}
                placeholder="+966 50 000 0000"
                type="tel"
                className={inputClass(!!errors.phone)}
              />
            </Field>
            <Field label="Email Address">
              <input
                value={form.email}
                onChange={set("email")}
                placeholder="email@example.com"
                type="email"
                className={inputClass(false)}
              />
            </Field>
            <Field label="ID / National ID">
              <input
                value={form.idNumber}
                onChange={set("idNumber")}
                placeholder="ID number"
                className={inputClass(false)}
              />
            </Field>
          </FormCard>

          <FormCard title="Contact Details">
            <Field label="Address">
              <input
                value={form.address}
                onChange={set("address")}
                placeholder="Street, City, State"
                className={inputClass(false)}
              />
            </Field>
          </FormCard>

          <FormCard title="Additional Notes">
            <Field label="Notes">
              <textarea
                value={form.notes}
                onChange={set("notes")}
                placeholder="Any additional notes about this owner..."
                rows={3}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-[#2E86C1] focus:bg-white transition-colors resize-none"
              />
            </Field>
          </FormCard>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 py-4 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-4 bg-[#1B4F72] text-white rounded-xl hover:bg-[#2E86C1] transition-colors flex items-center justify-center gap-2 shadow-md"
            >
              <Save size={18} />
              {isEdit ? "Save Changes" : "Add Owner"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function FormCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-4 py-3 bg-[#F5F7FA] border-b border-gray-100">
        <h3 className="text-[#1B4F72] text-sm">{title}</h3>
      </div>
      <div className="p-4 space-y-4">{children}</div>
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[#333333] text-sm mb-1.5">{label}</label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

function inputClass(hasError: boolean) {
  return `w-full px-4 py-3 border rounded-xl bg-gray-50 focus:outline-none focus:bg-white transition-colors ${
    hasError ? "border-red-400 focus:border-red-400" : "border-gray-200 focus:border-[#2E86C1]"
  }`;
}
