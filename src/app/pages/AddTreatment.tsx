import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Save, Pill, Scissors, Stethoscope, MoreHorizontal } from "lucide-react";
import { useApp } from "../context/AppContext";
import { PageHeader } from "../components/PageHeader";

type TreatmentType = "medication" | "surgery" | "grooming" | "other";

const TYPE_OPTIONS: { value: TreatmentType; label: string; icon: React.ReactNode; color: string }[] = [
  { value: "medication", label: "Medication", icon: <Pill size={22} />, color: "blue" },
  { value: "surgery", label: "Surgery", icon: <Scissors size={22} />, color: "red" },
  { value: "grooming", label: "Grooming", icon: <Stethoscope size={22} />, color: "purple" },
  { value: "other", label: "Other", icon: <MoreHorizontal size={22} />, color: "gray" },
];

export function AddTreatment() {
  const { id: petId, visitId } = useParams();
  const navigate = useNavigate();
  const { addTreatment, getPetById, getVisitById } = useApp();

  const pet = getPetById(petId || "");
  const visit = getVisitById(visitId || "");

  const [form, setForm] = useState({
    type: "medication" as TreatmentType,
    description: "",
    medicationName: "",
    dosage: "",
    duration: "",
    cost: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.description.trim()) errs.description = "Description is required";
    if (!form.cost || isNaN(parseFloat(form.cost))) errs.cost = "Valid cost is required";
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    if (!petId || !visitId) return;
    addTreatment({
      visitId,
      petId,
      type: form.type,
      description: form.description,
      medicationName: form.medicationName,
      dosage: form.dosage,
      duration: form.duration,
      cost: parseFloat(form.cost),
      date: visit?.date || new Date().toISOString().split("T")[0],
    });
    navigate(-1);
  };

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const typeColors: Record<string, string> = {
    blue: "border-blue-400 bg-blue-50 text-blue-700",
    red: "border-red-400 bg-red-50 text-red-700",
    purple: "border-purple-400 bg-purple-50 text-purple-700",
    gray: "border-gray-400 bg-gray-50 text-gray-700",
  };

  return (
    <div>
      <PageHeader title="Add Treatment" showBack />
      <div className="p-4 md:p-6 max-w-2xl mx-auto">
        {/* Context */}
        {pet && (
          <div className="bg-[#1B4F72]/5 border border-[#1B4F72]/10 rounded-xl p-3 mb-4 text-sm">
            <span className="text-gray-500">Adding treatment for </span>
            <span className="text-[#1B4F72] font-medium">{pet.name}</span>
            {visit && <span className="text-gray-500"> · Visit on {visit.date}</span>}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Treatment Type */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-4 py-3 bg-[#F5F7FA] border-b border-gray-100">
              <h3 className="text-[#1B4F72] text-sm">Treatment Type</h3>
            </div>
            <div className="p-4 grid grid-cols-2 gap-3">
              {TYPE_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setForm(prev => ({ ...prev, type: opt.value }))}
                  className={`flex items-center gap-3 p-3.5 rounded-xl border-2 transition-colors ${
                    form.type === opt.value
                      ? typeColors[opt.color]
                      : "border-gray-200 text-gray-500 hover:border-gray-300"
                  }`}
                >
                  {opt.icon}
                  <span className="text-sm font-medium">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-4 py-3 bg-[#F5F7FA] border-b border-gray-100">
              <h3 className="text-[#1B4F72] text-sm">Treatment Details</h3>
            </div>
            <div className="p-4 space-y-4">
              <Field label="Description *" error={errors.description}>
                <textarea
                  value={form.description}
                  onChange={set("description")}
                  placeholder="Describe the treatment..."
                  rows={2}
                  className={`w-full px-4 py-3 border rounded-xl bg-gray-50 focus:outline-none focus:bg-white transition-colors resize-none ${
                    errors.description ? "border-red-400" : "border-gray-200 focus:border-[#2E86C1]"
                  }`}
                />
              </Field>

              {form.type === "medication" && (
                <>
                  <Field label="Medication Name">
                    <input value={form.medicationName} onChange={set("medicationName")} placeholder="e.g. Amoxicillin" className={inputClass(false)} />
                  </Field>
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Dosage">
                      <input value={form.dosage} onChange={set("dosage")} placeholder="e.g. 10mg/kg" className={inputClass(false)} />
                    </Field>
                    <Field label="Duration">
                      <input value={form.duration} onChange={set("duration")} placeholder="e.g. 7 days" className={inputClass(false)} />
                    </Field>
                  </div>
                </>
              )}

              <Field label="Cost ($) *" error={errors.cost}>
                <input
                  value={form.cost}
                  onChange={set("cost")}
                  placeholder="0.00"
                  type="number"
                  step="0.01"
                  min="0"
                  className={inputClass(!!errors.cost)}
                />
              </Field>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => navigate(-1)} className="flex-1 py-4 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button type="submit" className="flex-1 py-4 bg-[#1B4F72] text-white rounded-xl hover:bg-[#2E86C1] transition-colors flex items-center justify-center gap-2 shadow-md">
              <Save size={18} /> Add Treatment
            </button>
          </div>
        </form>
      </div>
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
