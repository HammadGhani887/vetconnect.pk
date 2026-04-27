import { useState } from "react";
import { useNavigate } from "react-router";
import { Calendar, CheckCircle2, AlertCircle, Clock, Plus, ChevronRight } from "lucide-react";
import { useApp } from "../context/AppContext";
import { PageHeader } from "../components/PageHeader";

type FilterStatus = "all" | "pending" | "completed" | "missed";

export function FollowUpSchedule() {
  const navigate = useNavigate();
  const { followUps, getPetById, updateFollowUp } = useApp();
  const [filter, setFilter] = useState<FilterStatus>("all");

  const filtered = followUps
    .filter(f => filter === "all" || f.status === filter)
    .sort((a, b) => a.date.localeCompare(b.date));

  const counts = {
    all: followUps.length,
    pending: followUps.filter(f => f.status === "pending").length,
    completed: followUps.filter(f => f.status === "completed").length,
    missed: followUps.filter(f => f.status === "missed").length,
  };

  const handleMarkComplete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    updateFollowUp(id, { status: "completed" });
  };

  const statusConfig = {
    pending: { label: "Pending", bg: "bg-amber-100", text: "text-amber-700", icon: <Clock size={14} /> },
    completed: { label: "Completed", bg: "bg-green-100", text: "text-green-700", icon: <CheckCircle2 size={14} /> },
    missed: { label: "Missed", bg: "bg-red-100", text: "text-red-700", icon: <AlertCircle size={14} /> },
  };

  return (
    <div>
      <PageHeader title="Follow-up Schedule" subtitle={`${counts.pending} pending`} />

      <div className="p-4 md:p-6 max-w-2xl mx-auto">
        {/* Filter Tabs */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
          {(["all", "pending", "completed", "missed"] as FilterStatus[]).map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm transition-colors ${
                filter === s
                  ? "bg-[#1B4F72] text-white shadow-sm"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-[#2E86C1]"
              }`}
            >
              {s === "pending" && <Clock size={14} />}
              {s === "completed" && <CheckCircle2 size={14} />}
              {s === "missed" && <AlertCircle size={14} />}
              {s === "all" && <Calendar size={14} />}
              <span className="capitalize">{s}</span>
              <span className={`px-1.5 py-0.5 rounded-full text-xs ${
                filter === s ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
              }`}>{counts[s]}</span>
            </button>
          ))}
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 text-center">
            <p className="text-2xl text-amber-700">{counts.pending}</p>
            <p className="text-amber-600 text-xs">Pending</p>
          </div>
          <div className="bg-green-50 border border-green-100 rounded-xl p-3 text-center">
            <p className="text-2xl text-green-700">{counts.completed}</p>
            <p className="text-green-600 text-xs">Completed</p>
          </div>
          <div className="bg-red-50 border border-red-100 rounded-xl p-3 text-center">
            <p className="text-2xl text-red-700">{counts.missed}</p>
            <p className="text-red-600 text-xs">Missed</p>
          </div>
        </div>

        {/* Follow-up List */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {filtered.length === 0 ? (
            <div className="py-16 text-center">
              <Calendar size={40} className="mx-auto text-gray-300 mb-3" />
              <p className="text-gray-500">No follow-ups found</p>
            </div>
          ) : (
            filtered.map((f, i) => {
              const pet = getPetById(f.petId);
              const cfg = statusConfig[f.status];
              const isToday = f.date === new Date().toISOString().split("T")[0];
              const isPast = f.date < new Date().toISOString().split("T")[0];

              return (
                <div
                  key={f.id}
                  onClick={() => pet && navigate(`/pets/${pet.id}`)}
                  className={`flex items-start gap-3 px-4 py-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                    i < filtered.length - 1 ? "border-b border-gray-100" : ""
                  }`}
                >
                  {/* Date Box */}
                  <div className={`flex-shrink-0 w-14 rounded-xl p-2 text-center ${
                    isToday ? "bg-[#1B4F72] text-white" :
                    isPast && f.status === "pending" ? "bg-red-50 text-red-700" :
                    "bg-gray-50 text-gray-600"
                  }`}>
                    <p className="text-xs">{new Date(f.date).toLocaleDateString("en", { month: "short" })}</p>
                    <p className="text-lg font-bold leading-tight">{new Date(f.date).getDate()}</p>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-[#333333] font-medium text-sm">{f.reason}</p>
                      <span className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.text}`}>
                        {cfg.icon} {cfg.label}
                      </span>
                    </div>
                    <p className="text-[#2E86C1] text-sm mt-0.5">{pet?.name} · {pet?.species}</p>
                    {f.notes && <p className="text-gray-400 text-xs mt-0.5">{f.notes}</p>}
                    {isToday && <p className="text-[#1B4F72] text-xs mt-0.5 font-medium">Today!</p>}
                  </div>

                  {/* Actions */}
                  <div className="flex-shrink-0 flex items-center gap-2">
                    {f.status === "pending" && (
                      <button
                        onClick={(e) => handleMarkComplete(f.id, e)}
                        className="p-2 rounded-lg bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
                        title="Mark as completed"
                      >
                        <CheckCircle2 size={18} />
                      </button>
                    )}
                    <ChevronRight size={16} className="text-gray-300" />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}