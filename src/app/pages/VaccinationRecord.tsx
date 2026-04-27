import { useNavigate } from "react-router";
import { Syringe, Plus, Calendar, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { useApp } from "../context/AppContext";
import { PageHeader } from "../components/PageHeader";

export function VaccinationRecord() {
  const navigate = useNavigate();
  const { vaccinations, getPetById } = useApp();

  const today = new Date().toISOString().split("T")[0];
  const nextWeek = new Date(Date.now() + 7 * 24 * 3600 * 1000).toISOString().split("T")[0];

  const getStatus = (nextDue: string) => {
    if (nextDue < today) return "overdue";
    if (nextDue <= nextWeek) return "due_soon";
    return "ok";
  };

  const sorted = [...vaccinations].sort((a, b) => {
    const sa = getStatus(a.nextDueDate);
    const sb = getStatus(b.nextDueDate);
    const order = { overdue: 0, due_soon: 1, ok: 2 };
    return order[sa] - order[sb] || a.nextDueDate.localeCompare(b.nextDueDate);
  });

  const overdue = vaccinations.filter(v => getStatus(v.nextDueDate) === "overdue");
  const dueSoon = vaccinations.filter(v => getStatus(v.nextDueDate) === "due_soon");

  const statusConfig = {
    overdue: { label: "Overdue", bg: "bg-red-100", text: "text-red-700", icon: <AlertTriangle size={14} /> },
    due_soon: { label: "Due Soon", bg: "bg-amber-100", text: "text-amber-700", icon: <Clock size={14} /> },
    ok: { label: "Up to Date", bg: "bg-green-100", text: "text-green-700", icon: <CheckCircle size={14} /> },
  };

  return (
    <div>
      <PageHeader
        title="Vaccinations"
        subtitle={`${vaccinations.length} records`}
      />

      <div className="p-4 md:p-6 max-w-2xl mx-auto">
        {/* Alerts */}
        {overdue.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle size={18} className="text-red-600" />
              <h3 className="text-red-800">{overdue.length} Overdue Vaccination{overdue.length > 1 ? "s" : ""}</h3>
            </div>
            {overdue.map(v => {
              const pet = getPetById(v.petId);
              return (
                <div key={v.id} className="flex items-center gap-2 text-red-700 text-sm py-1">
                  <span className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0" />
                  <span className="font-medium">{pet?.name}</span>
                  <span>— {v.vaccineName} (due {v.nextDueDate})</span>
                </div>
              );
            })}
          </div>
        )}

        {dueSoon.length > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock size={18} className="text-amber-600" />
              <h3 className="text-amber-800">{dueSoon.length} Due This Week</h3>
            </div>
            {dueSoon.map(v => {
              const pet = getPetById(v.petId);
              return (
                <div key={v.id} className="flex items-center gap-2 text-amber-700 text-sm py-1">
                  <span className="w-2 h-2 bg-amber-500 rounded-full flex-shrink-0" />
                  <span className="font-medium">{pet?.name}</span>
                  <span>— {v.vaccineName} (due {v.nextDueDate})</span>
                </div>
              );
            })}
          </div>
        )}

        {/* All Records */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100">
            <h3 className="text-[#1B4F72] text-sm">All Vaccination Records</h3>
          </div>
          {sorted.map((vac, i) => {
            const pet = getPetById(vac.petId);
            const status = getStatus(vac.nextDueDate);
            const cfg = statusConfig[status];
            return (
              <div
                key={vac.id}
                onClick={() => pet && navigate(`/pets/${pet.id}`)}
                className={`flex items-start gap-3 px-4 py-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                  i < sorted.length - 1 ? "border-b border-gray-50" : ""
                }`}
              >
                <div className="w-10 h-10 bg-[#1B4F72]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Syringe size={18} className="text-[#1B4F72]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-[#333333] font-medium text-sm">{vac.vaccineName}</p>
                    <span className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.text}`}>
                      {cfg.icon} {cfg.label}
                    </span>
                  </div>
                  <p className="text-[#2E86C1] text-sm mt-0.5">{pet?.name} · {pet?.species}</p>
                  <div className="flex gap-4 mt-1 text-xs text-gray-400">
                    <span>Given: {vac.dateGiven}</span>
                    <span>Next: {vac.nextDueDate}</span>
                    <span>By: {vac.administeredBy}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* FAB */}
      <button
        onClick={() => navigate("/pets")}
        className="md:hidden fixed right-5 bottom-24 w-14 h-14 bg-[#1B4F72] text-white rounded-full shadow-xl flex items-center justify-center hover:bg-[#2E86C1] transition-colors z-20"
      >
        <Plus size={26} />
      </button>
    </div>
  );
}