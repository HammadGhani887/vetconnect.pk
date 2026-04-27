import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Edit2, Plus, ChevronRight, Syringe, Calendar, ClipboardList, Activity, Scale, Thermometer } from "lucide-react";
import { useApp } from "../context/AppContext";
import { PageHeader } from "../components/PageHeader";

type Tab = "visits" | "vaccinations" | "followups";

export function PetDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPetById, getOwnerById, getVisitsByPet, getVaccinationsByPet, getFollowUpsByPet } = useApp();
  const [activeTab, setActiveTab] = useState<Tab>("visits");

  const pet = getPetById(id || "");
  if (!pet) return <div className="p-6 text-center text-gray-500">Pet not found</div>;

  const owner = getOwnerById(pet.ownerId);
  const petVisits = getVisitsByPet(pet.id).sort((a, b) => b.date.localeCompare(a.date));
  const petVaccinations = getVaccinationsByPet(pet.id).sort((a, b) => b.dateGiven.localeCompare(a.dateGiven));
  const petFollowUps = getFollowUpsByPet(pet.id).sort((a, b) => b.date.localeCompare(a.date));

  const speciesEmoji: Record<string, string> = { Dog: "🐕", Cat: "🐈", Bird: "🐦", Rabbit: "🐇" };
  const emoji = speciesEmoji[pet.species] || "🐾";

  const calcAge = (dob: string) => {
    if (!dob) return "Unknown";
    const years = Math.floor((Date.now() - new Date(dob).getTime()) / (365.25 * 24 * 3600 * 1000));
    return years < 1 ? "< 1 year" : `${years} yr${years > 1 ? "s" : ""}`;
  };

  const today = new Date().toISOString().split("T")[0];
  const vacsDue = petVaccinations.filter(v => v.nextDueDate <= today);

  return (
    <div>
      <PageHeader
        title="Pet Profile"
        showBack
        action={{ label: "Edit", icon: <Edit2 size={16} />, onClick: () => navigate(`/pets/${id}/edit`) }}
      />

      <div className="max-w-2xl mx-auto">
        {/* Pet Profile Card */}
        <div className="bg-gradient-to-r from-[#1B4F72] to-[#2E86C1] p-5 text-white">
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0">
              {emoji}
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-white text-2xl">{pet.name}</h1>
              <p className="text-[#AED6F1] mt-0.5">{pet.species} · {pet.breed}</p>
              <button
                onClick={() => navigate(`/owners/${owner?.id}`)}
                className="text-[#7FB3D3] text-sm mt-1 hover:text-white transition-colors"
              >
                Owner: {owner?.name}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-4">
            {[
              { label: "Age", value: calcAge(pet.dob) },
              { label: "Weight", value: `${pet.weight} kg` },
              { label: "Gender", value: pet.gender },
            ].map(stat => (
              <div key={stat.label} className="bg-white/15 rounded-xl p-2.5 text-center">
                <p className="text-white font-semibold text-sm">{stat.value}</p>
                <p className="text-[#AED6F1] text-xs">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Microchip Info */}
        <div className="bg-white border-b border-gray-100 px-4 py-3 flex gap-6 text-sm">
          {pet.microchipId && <span className="text-gray-500">Chip: <span className="text-[#333333] font-medium">{pet.microchipId}</span></span>}
          {pet.tagId && <span className="text-gray-500">Tag: <span className="text-[#333333] font-medium">{pet.tagId}</span></span>}
          {pet.color && <span className="text-gray-500">Color: <span className="text-[#333333] font-medium">{pet.color}</span></span>}
        </div>

        {/* Vaccination Alert */}
        {vacsDue.length > 0 && (
          <div className="mx-4 mt-4 bg-red-50 border border-red-200 rounded-xl p-3 flex items-center gap-2">
            <Syringe size={18} className="text-red-500 flex-shrink-0" />
            <p className="text-red-700 text-sm">{vacsDue.length} vaccination(s) overdue!</p>
            <button onClick={() => setActiveTab("vaccinations")} className="ml-auto text-red-600 text-sm underline">View</button>
          </div>
        )}

        {/* New Visit Button */}
        <div className="px-4 mt-4">
          <button
            onClick={() => navigate(`/pets/${id}/visit/new`)}
            className="w-full bg-[#1B4F72] text-white py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#2E86C1] transition-colors shadow-md"
          >
            <Plus size={20} /> Start New Visit
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-0 px-4 mt-4 bg-white rounded-xl border border-gray-200 overflow-hidden mx-4">
          {[
            { key: "visits" as Tab, label: "Visits", count: petVisits.length },
            { key: "vaccinations" as Tab, label: "Vaccines", count: petVaccinations.length },
            { key: "followups" as Tab, label: "Follow-ups", count: petFollowUps.length },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 py-3 text-sm flex items-center justify-center gap-1.5 transition-colors border-b-2 ${
                activeTab === tab.key
                  ? "border-[#1B4F72] text-[#1B4F72]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
              <span className={`px-1.5 py-0.5 rounded-full text-xs ${
                activeTab === tab.key ? "bg-[#1B4F72] text-white" : "bg-gray-100 text-gray-500"
              }`}>{tab.count}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="px-4 py-4 pb-8">
          {activeTab === "visits" && (
            <div className="space-y-3">
              {petVisits.length === 0 ? (
                <EmptyState icon={<ClipboardList size={32} />} message="No visits yet" />
              ) : petVisits.map(visit => (
                <div
                  key={visit.id}
                  onClick={() => navigate(`/pets/${id}/visit/${visit.id}`)}
                  className="bg-white rounded-xl border border-gray-100 p-4 cursor-pointer hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-[#333333] font-medium truncate">{visit.reason}</p>
                      <p className="text-gray-500 text-sm mt-0.5 truncate">{visit.diagnosis}</p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                        <span className="flex items-center gap-1"><Scale size={12} /> {visit.weight}kg</span>
                        <span className="flex items-center gap-1"><Thermometer size={12} /> {visit.temperature}°C</span>
                        <span>{visit.vet}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                      <span className={`px-2 py-0.5 rounded-full text-xs ${
                        visit.status === "completed" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                      }`}>
                        {visit.status === "completed" ? "Done" : "In Progress"}
                      </span>
                      <span className="text-gray-400 text-xs">{visit.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "vaccinations" && (
            <div className="space-y-3">
              <button
                onClick={() => navigate(`/pets/${id}/vaccinations/add`)}
                className="w-full border-2 border-dashed border-[#2E86C1]/30 text-[#2E86C1] py-3 rounded-xl text-sm hover:bg-[#2E86C1]/5 transition-colors flex items-center justify-center gap-2"
              >
                <Plus size={18} /> Add Vaccination
              </button>
              {petVaccinations.length === 0 ? (
                <EmptyState icon={<Syringe size={32} />} message="No vaccinations recorded" />
              ) : petVaccinations.map(vac => {
                const isOverdue = vac.nextDueDate <= new Date().toISOString().split("T")[0];
                const isDueSoon = !isOverdue && vac.nextDueDate <= new Date(Date.now() + 7 * 24 * 3600 * 1000).toISOString().split("T")[0];
                return (
                  <div key={vac.id} className="bg-white rounded-xl border border-gray-100 p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-[#333333] font-medium">{vac.vaccineName}</p>
                        <p className="text-gray-500 text-sm mt-0.5">Given: {vac.dateGiven} · By: {vac.administeredBy}</p>
                        <p className="text-gray-400 text-xs mt-0.5">Batch: {vac.batchNumber}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1 flex-shrink-0">
                        <span className={`px-2 py-0.5 rounded-full text-xs ${
                          isOverdue ? "bg-red-100 text-red-700" :
                          isDueSoon ? "bg-amber-100 text-amber-700" :
                          "bg-green-100 text-green-700"
                        }`}>
                          {isOverdue ? "Overdue" : isDueSoon ? "Due Soon" : "Up to Date"}
                        </span>
                        <span className="text-gray-400 text-xs">Due: {vac.nextDueDate}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === "followups" && (
            <div className="space-y-3">
              {petFollowUps.length === 0 ? (
                <EmptyState icon={<Calendar size={32} />} message="No follow-ups scheduled" />
              ) : petFollowUps.map(f => (
                <div key={f.id} className="bg-white rounded-xl border border-gray-100 p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-[#333333] font-medium">{f.reason}</p>
                      {f.notes && <p className="text-gray-500 text-sm mt-0.5">{f.notes}</p>}
                    </div>
                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                      <span className={`px-2 py-0.5 rounded-full text-xs ${
                        f.status === "completed" ? "bg-green-100 text-green-700" :
                        f.status === "missed" ? "bg-red-100 text-red-700" :
                        "bg-amber-100 text-amber-700"
                      }`}>
                        {f.status.charAt(0).toUpperCase() + f.status.slice(1)}
                      </span>
                      <span className="text-gray-400 text-xs">{f.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function EmptyState({ icon, message }: { icon: React.ReactNode; message: string }) {
  return (
    <div className="py-12 text-center">
      <div className="text-gray-300 flex justify-center mb-3">{icon}</div>
      <p className="text-gray-500 text-sm">{message}</p>
    </div>
  );
}
