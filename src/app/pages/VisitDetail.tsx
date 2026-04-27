import { useNavigate, useParams } from "react-router";
import { Plus, FileText, Pill, Scissors, Stethoscope, ChevronRight, Scale, Thermometer, User, Calendar } from "lucide-react";
import { useApp } from "../context/AppContext";
import { PageHeader } from "../components/PageHeader";

export function VisitDetail() {
  const { id: petId, visitId } = useParams();
  const navigate = useNavigate();
  const { getVisitById, getPetById, getOwnerById, getTreatmentsByVisit, getInvoiceByVisit, updateVisit } = useApp();

  const visit = getVisitById(visitId || "");
  const pet = getPetById(petId || "");
  const owner = pet ? getOwnerById(pet.ownerId) : undefined;
  const treatments = getTreatmentsByVisit(visitId || "");
  const invoice = getInvoiceByVisit(visitId || "");

  if (!visit || !pet) return <div className="p-6 text-center text-gray-500">Visit not found</div>;

  const totalCost = treatments.reduce((sum, t) => sum + t.cost, 0);

  const treatmentTypeIcon = (type: string) => {
    switch (type) {
      case "medication": return <Pill size={16} className="text-blue-500" />;
      case "surgery": return <Scissors size={16} className="text-red-500" />;
      case "grooming": return <Stethoscope size={16} className="text-purple-500" />;
      default: return <Stethoscope size={16} className="text-gray-500" />;
    }
  };

  const treatmentTypeBg = (type: string) => {
    switch (type) {
      case "medication": return "bg-blue-50";
      case "surgery": return "bg-red-50";
      case "grooming": return "bg-purple-50";
      default: return "bg-gray-50";
    }
  };

  const handleStatusToggle = () => {
    updateVisit(visit.id, {
      status: visit.status === "completed" ? "in_progress" : "completed"
    });
  };

  const handleGenerateInvoice = () => {
    if (invoice) {
      navigate(`/invoices/${invoice.id}`);
    } else {
      navigate(`/invoices/generate/${visitId}`);
    }
  };

  return (
    <div>
      <PageHeader title="Visit Details" showBack />
      <div className="max-w-2xl mx-auto p-4 md:p-6 space-y-4">

        {/* Visit Status Banner */}
        <div className={`rounded-2xl p-4 flex items-center justify-between ${
          visit.status === "completed" ? "bg-green-50 border border-green-200" : "bg-amber-50 border border-amber-200"
        }`}>
          <div>
            <span className={`text-sm font-medium ${visit.status === "completed" ? "text-green-700" : "text-amber-700"}`}>
              {visit.status === "completed" ? "✓ Visit Completed" : "⏳ In Progress"}
            </span>
            <p className="text-gray-600 text-xs mt-0.5">{visit.date} · {visit.vet}</p>
          </div>
          <button
            onClick={handleStatusToggle}
            className={`px-3 py-1.5 rounded-lg text-xs border transition-colors ${
              visit.status === "completed"
                ? "border-amber-300 text-amber-700 hover:bg-amber-100"
                : "border-green-300 text-green-700 hover:bg-green-100"
            }`}
          >
            Mark {visit.status === "completed" ? "In Progress" : "Completed"}
          </button>
        </div>

        {/* Pet Info */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-4 py-3 bg-[#F5F7FA] border-b border-gray-100">
            <h3 className="text-[#1B4F72] text-sm">Patient Information</h3>
          </div>
          <div className="divide-y divide-gray-50">
            <InfoRow icon={<User size={16} />} label="Pet" value={`${pet.name} (${pet.species})`} />
            <InfoRow icon={<User size={16} />} label="Owner" value={owner?.name || "Unknown"} />
            <InfoRow icon={<Calendar size={16} />} label="Visit Date" value={visit.date} />
            <InfoRow icon={<Scale size={16} />} label="Weight" value={`${visit.weight} kg`} />
            <InfoRow icon={<Thermometer size={16} />} label="Temperature" value={`${visit.temperature}°C`} />
          </div>
        </div>

        {/* Reason & Diagnosis */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-4 py-3 bg-[#F5F7FA] border-b border-gray-100">
            <h3 className="text-[#1B4F72] text-sm">Clinical Notes</h3>
          </div>
          <div className="p-4 space-y-3">
            <div>
              <p className="text-xs text-gray-500 mb-1">Chief Complaint / Reason</p>
              <p className="text-[#333333]">{visit.reason}</p>
            </div>
            {visit.diagnosis && (
              <div>
                <p className="text-xs text-gray-500 mb-1">Diagnosis / Assessment</p>
                <p className="text-[#333333]">{visit.diagnosis}</p>
              </div>
            )}
          </div>
        </div>

        {/* Treatments */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <h3 className="text-[#1B4F72] text-sm">Treatments ({treatments.length})</h3>
            <button
              onClick={() => navigate(`/pets/${petId}/visit/${visitId}/treatment/add`)}
              className="flex items-center gap-1.5 text-[#2E86C1] text-sm hover:text-[#1B4F72] transition-colors"
            >
              <Plus size={16} /> Add
            </button>
          </div>

          {treatments.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-gray-400 text-sm">No treatments added yet</p>
              <button
                onClick={() => navigate(`/pets/${petId}/visit/${visitId}/treatment/add`)}
                className="mt-2 text-[#2E86C1] text-sm"
              >
                Add first treatment →
              </button>
            </div>
          ) : (
            <>
              {treatments.map((t, i) => (
                <div key={t.id} className={`flex items-start gap-3 px-4 py-3.5 ${i < treatments.length - 1 ? "border-b border-gray-50" : ""}`}>
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${treatmentTypeBg(t.type)}`}>
                    {treatmentTypeIcon(t.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[#333333] font-medium text-sm">{t.description}</p>
                    {t.medicationName && (
                      <p className="text-gray-500 text-xs mt-0.5">{t.medicationName} · {t.dosage} · {t.duration}</p>
                    )}
                    <span className="inline-block mt-1 text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full capitalize">{t.type}</span>
                  </div>
                  <p className="text-[#1B4F72] font-semibold text-sm flex-shrink-0">${t.cost.toFixed(2)}</p>
                </div>
              ))}
              <div className="flex items-center justify-between px-4 py-3 bg-[#F5F7FA] border-t border-gray-100">
                <span className="text-[#333333] font-medium text-sm">Total Treatment Cost</span>
                <span className="text-[#1B4F72] font-bold">${totalCost.toFixed(2)}</span>
              </div>
            </>
          )}
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => navigate(`/pets/${petId}/visit/${visitId}/treatment/add`)}
            className="py-4 bg-[#2E86C1] text-white rounded-xl flex items-center justify-center gap-2 hover:bg-[#1B4F72] transition-colors shadow-md"
          >
            <Plus size={18} /> Add Treatment
          </button>
          <button
            onClick={handleGenerateInvoice}
            className="py-4 bg-[#1B4F72] text-white rounded-xl flex items-center justify-center gap-2 hover:bg-[#2E86C1] transition-colors shadow-md"
          >
            <FileText size={18} /> {invoice ? "View Invoice" : "Generate Invoice"}
          </button>
        </div>

        {/* Follow-up */}
        <button
          onClick={() => navigate("/follow-ups")}
          className="w-full py-3.5 border border-gray-200 text-gray-600 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
        >
          <Calendar size={18} className="text-[#2E86C1]" /> Schedule Follow-up
        </button>
      </div>
    </div>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <div className="text-[#2E86C1] flex-shrink-0">{icon}</div>
      <p className="text-gray-500 text-sm w-24 flex-shrink-0">{label}</p>
      <p className="text-[#333333] text-sm flex-1">{value}</p>
    </div>
  );
}
