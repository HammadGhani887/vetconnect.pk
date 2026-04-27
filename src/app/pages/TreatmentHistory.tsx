import { useNavigate, useParams } from "react-router";
import { Pill, Scissors, Stethoscope, MoreHorizontal, Calendar, DollarSign } from "lucide-react";
import { useApp } from "../context/AppContext";
import { PageHeader } from "../components/PageHeader";

export function TreatmentHistory() {
  const { id: petId } = useParams();
  const navigate = useNavigate();
  const { getPetById, getTreatmentsByPet, getVisitById } = useApp();

  const pet = getPetById(petId || "");
  const treatments = getTreatmentsByPet(petId || "").sort((a, b) => b.date.localeCompare(a.date));

  if (!pet) return <div className="p-6 text-center text-gray-500">Pet not found</div>;

  const typeIcon = (type: string) => {
    switch (type) {
      case "medication": return <Pill size={18} className="text-blue-500" />;
      case "surgery": return <Scissors size={18} className="text-red-500" />;
      case "grooming": return <Stethoscope size={18} className="text-purple-500" />;
      default: return <MoreHorizontal size={18} className="text-gray-500" />;
    }
  };

  const typeBg = (type: string) => {
    switch (type) {
      case "medication": return "bg-blue-50";
      case "surgery": return "bg-red-50";
      case "grooming": return "bg-purple-50";
      default: return "bg-gray-50";
    }
  };

  const totalSpent = treatments.reduce((sum, t) => sum + t.cost, 0);

  // Group by date
  const byDate = treatments.reduce<Record<string, typeof treatments>>((acc, t) => {
    const date = t.date;
    if (!acc[date]) acc[date] = [];
    acc[date].push(t);
    return acc;
  }, {});

  return (
    <div>
      <PageHeader title="Treatment History" subtitle={pet.name} showBack />
      <div className="p-4 md:p-6 max-w-2xl mx-auto">
        {/* Summary */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-4 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Total Treatments</p>
            <p className="text-2xl text-[#1B4F72]">{treatments.length}</p>
          </div>
          <div className="h-12 w-px bg-gray-100" />
          <div>
            <p className="text-gray-500 text-sm">Total Cost</p>
            <p className="text-2xl text-[#2E86C1]">${totalSpent.toFixed(2)}</p>
          </div>
          <div className="h-12 w-px bg-gray-100" />
          <div>
            <p className="text-gray-500 text-sm">Last Treatment</p>
            <p className="text-[#333333] font-medium text-sm">{treatments[0]?.date || "—"}</p>
          </div>
        </div>

        {treatments.length === 0 ? (
          <div className="py-16 text-center">
            <Stethoscope size={40} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500">No treatment history yet</p>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(byDate).map(([date, dayTreatments]) => {
              const visit = dayTreatments[0]?.visitId ? getVisitById(dayTreatments[0].visitId) : undefined;
              return (
                <div key={date}>
                  {/* Date Divider */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center gap-1.5 text-gray-500 text-sm">
                      <Calendar size={14} />
                      <span>{date}</span>
                    </div>
                    {visit && (
                      <button
                        onClick={() => navigate(`/pets/${petId}/visit/${visit.id}`)}
                        className="text-[#2E86C1] text-xs hover:underline"
                      >
                        View Visit →
                      </button>
                    )}
                    <div className="flex-1 h-px bg-gray-200" />
                    <span className="text-gray-400 text-xs">${dayTreatments.reduce((s, t) => s + t.cost, 0).toFixed(2)}</span>
                  </div>

                  <div className="space-y-2">
                    {dayTreatments.map(t => (
                      <div key={t.id} className="bg-white rounded-xl border border-gray-100 p-4 flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${typeBg(t.type)}`}>
                          {typeIcon(t.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[#333333] font-medium text-sm">{t.description}</p>
                          {t.medicationName && (
                            <p className="text-gray-500 text-xs mt-0.5">
                              {t.medicationName}
                              {t.dosage && ` · ${t.dosage}`}
                              {t.duration && ` · ${t.duration}`}
                            </p>
                          )}
                          <span className="inline-block mt-1 text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full capitalize">{t.type}</span>
                        </div>
                        <div className="flex items-center gap-1 text-[#1B4F72] font-semibold flex-shrink-0">
                          <DollarSign size={14} />
                          <span className="text-sm">{t.cost.toFixed(2)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
