import { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";
import { Save, Camera } from "lucide-react";
import { useApp } from "../context/AppContext";
import { PageHeader } from "../components/PageHeader";

const SPECIES = ["Dog", "Cat", "Bird", "Rabbit", "Hamster", "Fish", "Other"];
const BREEDS_BY_SPECIES: Record<string, string[]> = {
  Dog: ["Golden Retriever", "Labrador", "German Shepherd", "Poodle", "Bulldog", "Beagle", "Mixed", "Other"],
  Cat: ["Persian", "Siamese", "British Shorthair", "Ragdoll", "Maine Coon", "Mixed", "Other"],
  Bird: ["Parrot", "Cockatiel", "Canary", "Parakeet", "Other"],
  Rabbit: ["Dutch", "Holland Lop", "Lionhead", "Other"],
  Hamster: ["Syrian", "Dwarf", "Roborovski", "Other"],
  Fish: ["Goldfish", "Betta", "Clownfish", "Other"],
  Other: ["Other"],
};

export function AddEditPet() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addPet, updatePet, getPetById, owners } = useApp();
  const existing = id ? getPetById(id) : undefined;
  const isEdit = !!existing;

  const presetOwnerId = searchParams.get("ownerId") || "";

  const [form, setForm] = useState({
    ownerId: existing?.ownerId || presetOwnerId,
    name: existing?.name || "",
    species: existing?.species || "Dog",
    breed: existing?.breed || "",
    gender: existing?.gender || "Male",
    dob: existing?.dob || "",
    weight: existing?.weight?.toString() || "",
    color: existing?.color || "",
    microchipId: existing?.microchipId || "",
    tagId: existing?.tagId || "",
    photo: existing?.photo || "",
    notes: existing?.notes || "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const breeds = BREEDS_BY_SPECIES[form.species] || ["Other"];

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Pet name is required";
    if (!form.ownerId) errs.ownerId = "Owner is required";
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    const petData = { ...form, weight: parseFloat(form.weight) || 0 };
    if (isEdit && id) {
      updatePet(id, petData);
      navigate(`/pets/${id}`);
    } else {
      const newPet = addPet(petData);
      navigate(`/pets/${newPet.id}`);
    }
  };

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: "" }));
  };

  return (
    <div>
      <PageHeader title={isEdit ? "Edit Pet" : "Add New Pet"} showBack />
      <div className="p-4 md:p-6 max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Photo */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col items-center gap-3">
            <div className="w-24 h-24 bg-[#2E86C1]/10 rounded-2xl flex items-center justify-center text-5xl">
              🐾
            </div>
            <button type="button" className="flex items-center gap-2 text-[#2E86C1] text-sm border border-[#2E86C1] rounded-xl px-4 py-2 hover:bg-[#2E86C1]/5 transition-colors">
              <Camera size={16} /> Upload Photo
            </button>
          </div>

          <FormCard title="Owner & Basic Info">
            <Field label="Owner *" error={errors.ownerId}>
              <select value={form.ownerId} onChange={set("ownerId")} className={selectClass(!!errors.ownerId)}>
                <option value="">Select owner...</option>
                {owners.map(o => (
                  <option key={o.id} value={o.id}>{o.name}</option>
                ))}
              </select>
            </Field>
            <Field label="Pet Name *" error={errors.name}>
              <input value={form.name} onChange={set("name")} placeholder="Enter pet name" className={inputClass(!!errors.name)} />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Species">
                <select value={form.species} onChange={set("species")} className={selectClass(false)}>
                  {SPECIES.map(s => <option key={s}>{s}</option>)}
                </select>
              </Field>
              <Field label="Gender">
                <select value={form.gender} onChange={set("gender")} className={selectClass(false)}>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </Field>
            </div>
            <Field label="Breed">
              <select value={form.breed} onChange={set("breed")} className={selectClass(false)}>
                <option value="">Select breed...</option>
                {breeds.map(b => <option key={b}>{b}</option>)}
              </select>
            </Field>
          </FormCard>

          <FormCard title="Physical Details">
            <div className="grid grid-cols-2 gap-3">
              <Field label="Date of Birth">
                <input value={form.dob} onChange={set("dob")} type="date" className={inputClass(false)} />
              </Field>
              <Field label="Weight (kg)">
                <input value={form.weight} onChange={set("weight")} placeholder="0.0" type="number" step="0.1" className={inputClass(false)} />
              </Field>
            </div>
            <Field label="Color / Markings">
              <input value={form.color} onChange={set("color")} placeholder="e.g. Golden, Black & White" className={inputClass(false)} />
            </Field>
          </FormCard>

          <FormCard title="Identification">
            <Field label="Microchip ID">
              <input value={form.microchipId} onChange={set("microchipId")} placeholder="Microchip number" className={inputClass(false)} />
            </Field>
            <Field label="Tag ID">
              <input value={form.tagId} onChange={set("tagId")} placeholder="Tag number" className={inputClass(false)} />
            </Field>
          </FormCard>

          <FormCard title="Notes">
            <Field label="Notes">
              <textarea
                value={form.notes}
                onChange={set("notes")}
                placeholder="Allergies, special needs, behavior notes..."
                rows={3}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-[#2E86C1] focus:bg-white transition-colors resize-none"
              />
            </Field>
          </FormCard>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => navigate(-1)} className="flex-1 py-4 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button type="submit" className="flex-1 py-4 bg-[#1B4F72] text-white rounded-xl hover:bg-[#2E86C1] transition-colors flex items-center justify-center gap-2 shadow-md">
              <Save size={18} />
              {isEdit ? "Save Changes" : "Add Pet"}
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

function selectClass(hasError: boolean) {
  return `w-full px-4 py-3 border rounded-xl bg-gray-50 focus:outline-none focus:bg-white transition-colors appearance-none ${
    hasError ? "border-red-400 focus:border-red-400" : "border-gray-200 focus:border-[#2E86C1]"
  }`;
}
