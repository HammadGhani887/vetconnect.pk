import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Save, PawPrint } from "lucide-react";
import { useApp } from "../context/AppContext";
import { PageHeader } from "../components/PageHeader";

const VETS = ["Dr. Salem", "Dr. Aisha", "Dr. Karim", "Dr. Fatima"];

export function NewVisit() {
  const { id: petId } = useParams();
  const navigate = useNavigate();
  const { getPetById, getOwnerById, addVisit } = useApp();

  const pet = getPetById(petId || "");
  const owner = pet ? getOwnerById(pet.ownerId) : undefined;

  const today = new Date().toISOString().split("T")[0];

  const [form, setForm] = useState({
    date: today,
    reason: "",
    diagnosis: "",
    weight: pet?.weight?.toString() || "",
    temperature: "",
    vet: VETS[0],
    status: "in_progress" as "in_progress" | "completed",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.reason.trim()) errs.reason = "Reason/complaint is required";
    if (!form.date) errs.date = "Date is required";
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    if (!petId) return;
    const newVisit = addVisit({
      petId,
      date: form.date,
      reason: form.reason,
      diagnosis: form.diagnosis,
      weight: parseFloat(form.weight) || 0,
      temperature: parseFloat(form.temperature) || 0,
      vet: form.vet,
      status: form.status,
    });
    navigate(`/pets/${petId}/visit/${newVisit.id}`);
  };

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: "" }));
  };

  if (!pet) return <div className="p-6 text-center text-gray-500">Pet not found</div>;

  return (
    <div>
      <PageHeader title="New Visit" showBack />
      <div className="p-4 md:p-6 max-w-2xl mx-auto">
        {/* Pet Info Banner */}
        <div className="bg-[#1B4F72]/5 border border-[#1B4F72]/10 rounded-2xl p-4 mb-4 flex items-center gap-3">
          <div className="w-12 h-12 bg-[#1B4F72] rounded-xl flex items-center justify-center">
            <PawPrint size={22} className="text-white" />
          </div>
          <div>
            <p className="text-[#1B4F72] font-semibold">{pet.name}</p>
            <p className="text-gray-500 text-sm">{pet.species} · {pet.breed} · Owner: {owner?.name}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <FormCard title="Visit Information">
            <Field label="Date *" error={errors.date}>
              <input value={form.date} onChange={set("date")} type="date" className={inputClass(!!errors.date)} />
            </Field>
            <Field label="Reason / Chief Complaint *" error={errors.reason}>
              <textarea
                value={form.reason}
                onChange={set("reason")}
                placeholder="What brings the pet in today?"
                rows={2}
                className={`w-full px-4 py-3 border rounded-xl bg-gray-50 focus:outline-none focus:bg-white transition-colors resize-none ${
                  errors.reason ? "border-red-400" : "border-gray-200 focus:border-[#2E86C1]"
                }`}
              />
            </Field>
            <Field label="Diagnosis / Assessment">
              <textarea
                value={form.diagnosis}
                onChange={set("diagnosis")}
                placeholder="Preliminary diagnosis..."
                rows={2}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-[#2E86C1] focus:bg-white transition-colors resize-none"
              />
            </Field>
          </FormCard>

          <FormCard title="Vitals">
            <div className="grid grid-cols-2 gap-3">
              <Field label="Weight (kg)">
                <input value={form.weight} onChange={set("weight")} placeholder="0.0" type="number" step="0.1" className={inputClass(false)} />
              </Field>
              <Field label="Temperature (°C)">
                <input value={form.temperature} onChange={set("temperature")} placeholder="38.0" type="number" step="0.1" className={inputClass(false)} />
              </Field>
            </div>
          </FormCard>

          <FormCard title="Veterinarian & Status">
            <Field label="Assigned Vet">
              <select value={form.vet} onChange={set("vet")} className={selectClass}>
                {VETS.map(v => <option key={v}>{v}</option>)}
              </select>
            </Field>
            <Field label="Visit Status">
              <div className="flex gap-3">
                {[
                  { value: "in_progress", label: "In Progress", color: "amber" },
                  { value: "completed", label: "Completed", color: "green" },
                ].map(opt => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setForm(prev => ({ ...prev, status: opt.value as "in_progress" | "completed" }))}
                    className={`flex-1 py-3 rounded-xl border-2 text-sm transition-colors ${
                      form.status === opt.value
                        ? opt.value === "completed"
                          ? "border-green-500 bg-green-50 text-green-700"
                          : "border-amber-500 bg-amber-50 text-amber-700"
                        : "border-gray-200 text-gray-500 hover:border-gray-300"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </Field>
          </FormCard>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => navigate(-1)} className="flex-1 py-4 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button type="submit" className="flex-1 py-4 bg-[#1B4F72] text-white rounded-xl hover:bg-[#2E86C1] transition-colors flex items-center justify-center gap-2 shadow-md">
              <Save size={18} /> Start Visit
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

const selectClass = "w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-[#2E86C1] focus:bg-white transition-colors appearance-none";
