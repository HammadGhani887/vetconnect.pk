import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Save, Syringe } from "lucide-react";
import { useApp } from "../context/AppContext";
import { PageHeader } from "../components/PageHeader";

const COMMON_VACCINES = {
  Dog: ["Rabies", "DHPP", "Bordetella", "Leptospirosis", "Lyme Disease", "Canine Influenza"],
  Cat: ["FVRCP", "Rabies", "FeLV", "FIV", "Bordetella"],
  Other: ["Rabies", "Other"],
};

const VETS = ["Dr. Salem", "Dr. Aisha", "Dr. Karim", "Dr. Fatima"];

export function AddVaccination() {
  const { id: petId } = useParams();
  const navigate = useNavigate();
  const { addVaccination, getPetById } = useApp();

  const pet = getPetById(petId || "");
  const today = new Date().toISOString().split("T")[0];

  const vaccines = pet
    ? COMMON_VACCINES[pet.species as keyof typeof COMMON_VACCINES] || COMMON_VACCINES.Other
    : COMMON_VACCINES.Other;

  const [form, setForm] = useState({
    vaccineName: "",
    customName: "",
    dateGiven: today,
    nextDueDate: "",
    batchNumber: "",
    administeredBy: VETS[0],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const finalVaccineName = form.vaccineName === "Custom" ? form.customName : form.vaccineName;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!finalVaccineName.trim()) errs.vaccineName = "Vaccine name is required";
    if (!form.dateGiven) errs.dateGiven = "Date given is required";
    if (!form.nextDueDate) errs.nextDueDate = "Next due date is required";
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    if (!petId) return;
    addVaccination({
      petId,
      vaccineName: finalVaccineName,
      dateGiven: form.dateGiven,
      nextDueDate: form.nextDueDate,
      batchNumber: form.batchNumber,
      administeredBy: form.administeredBy,
    });
    navigate(-1);
  };

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: "" }));
  };

  if (!pet) return <div className="p-6 text-center text-gray-500">Pet not found</div>;

  return (
    <div>
      <PageHeader title="Add Vaccination" showBack />
      <div className="p-4 md:p-6 max-w-2xl mx-auto">
        {/* Pet Banner */}
        <div className="bg-[#1B4F72]/5 border border-[#1B4F72]/10 rounded-xl p-3 mb-4 flex items-center gap-3 text-sm">
          <Syringe size={18} className="text-[#1B4F72]" />
          <span className="text-gray-500">Adding vaccination for </span>
          <span className="text-[#1B4F72] font-medium">{pet.name}</span>
          <span className="text-gray-400">({pet.species})</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <FormCard title="Vaccine Information">
            <Field label="Vaccine Name *" error={errors.vaccineName}>
              <div className="flex flex-wrap gap-2 mb-2">
                {vaccines.map(v => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setForm(prev => ({ ...prev, vaccineName: v, customName: "" }))}
                    className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${
                      form.vaccineName === v
                        ? "bg-[#1B4F72] text-white border-[#1B4F72]"
                        : "border-gray-200 text-gray-600 hover:border-[#2E86C1]"
                    }`}
                  >
                    {v}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setForm(prev => ({ ...prev, vaccineName: "Custom" }))}
                  className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${
                    form.vaccineName === "Custom"
                      ? "bg-[#1B4F72] text-white border-[#1B4F72]"
                      : "border-gray-200 text-gray-600 hover:border-[#2E86C1]"
                  }`}
                >
                  Custom
                </button>
              </div>
              {form.vaccineName === "Custom" && (
                <input
                  value={form.customName}
                  onChange={e => setForm(prev => ({ ...prev, customName: e.target.value }))}
                  placeholder="Enter vaccine name"
                  className={inputClass(!!errors.vaccineName)}
                />
              )}
            </Field>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Date Given *" error={errors.dateGiven}>
                <input value={form.dateGiven} onChange={set("dateGiven")} type="date" className={inputClass(!!errors.dateGiven)} />
              </Field>
              <Field label="Next Due Date *" error={errors.nextDueDate}>
                <input value={form.nextDueDate} onChange={set("nextDueDate")} type="date" className={inputClass(!!errors.nextDueDate)} />
              </Field>
            </div>
          </FormCard>

          <FormCard title="Administration Details">
            <Field label="Batch Number">
              <input value={form.batchNumber} onChange={set("batchNumber")} placeholder="e.g. RAB-2024-001" className={inputClass(false)} />
            </Field>
            <Field label="Administered By">
              <select value={form.administeredBy} onChange={set("administeredBy")} className={selectClass}>
                {VETS.map(v => <option key={v}>{v}</option>)}
              </select>
            </Field>
          </FormCard>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => navigate(-1)} className="flex-1 py-4 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button type="submit" className="flex-1 py-4 bg-[#1B4F72] text-white rounded-xl hover:bg-[#2E86C1] transition-colors flex items-center justify-center gap-2 shadow-md">
              <Save size={18} /> Add Vaccination
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
    hasError ? "border-red-400" : "border-gray-200 focus:border-[#2E86C1]"
  }`;
}

const selectClass = "w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-[#2E86C1] focus:bg-white transition-colors appearance-none";
