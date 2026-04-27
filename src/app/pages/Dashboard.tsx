import { useNavigate } from "react-router";
import {
  Users, PawPrint, CalendarCheck, Syringe, TrendingUp,
  DollarSign, AlertCircle, ChevronRight, Clock, CheckCircle2
} from "lucide-react";
import { useApp } from "../context/AppContext";

export function Dashboard() {
  const { owners, pets, visits, followUps, vaccinations, invoices } = useApp();
  const navigate = useNavigate();

  const today = new Date().toISOString().split("T")[0];
  const todayVisits = visits.filter(v => v.date === today);
  const todayIncome = invoices
    .filter(inv => inv.date === today && inv.paymentStatus === "paid")
    .reduce((sum, inv) => sum + inv.total, 0);

  const pendingFollowUps = followUps.filter(f => f.status === "pending");
  const now = new Date();
  const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  const vaccinationsDue = vaccinations.filter(v => {
    const due = new Date(v.nextDueDate);
    return due >= now && due <= nextWeek;
  });

  const recentVisits = [...visits].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5);
  const { getPetById, getOwnerById } = useApp();

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#1B4F72] to-[#2E86C1] rounded-2xl p-5 mb-6 text-white shadow-lg">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[#AED6F1] text-sm">Good morning 👋</p>
            <h1 className="text-white mt-0.5">Today's Overview</h1>
            <p className="text-[#AED6F1] text-sm mt-1">{new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}</p>
          </div>
          <PawPrint size={36} className="text-white/20" />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <StatCard
          icon={<Clock size={22} />}
          label="Today's Visits"
          value={todayVisits.length}
          color="blue"
          onClick={() => navigate("/pets")}
        />
        <StatCard
          icon={<DollarSign size={22} />}
          label="Today's Income"
          value={`$${todayIncome.toFixed(0)}`}
          color="green"
          onClick={() => navigate("/reports")}
        />
        <StatCard
          icon={<CalendarCheck size={22} />}
          label="Follow-ups Due"
          value={pendingFollowUps.length}
          color="amber"
          onClick={() => navigate("/follow-ups")}
          alert={pendingFollowUps.length > 0}
        />
        <StatCard
          icon={<Syringe size={22} />}
          label="Vaccines Due"
          value={vaccinationsDue.length}
          color="purple"
          onClick={() => navigate("/vaccinations-list")}
          alert={vaccinationsDue.length > 0}
        />
      </div>

      {/* Summary Cards Row */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div
          onClick={() => navigate("/owners")}
          className="bg-white rounded-2xl p-4 flex items-center gap-3 shadow-sm cursor-pointer hover:shadow-md transition-shadow border border-gray-50"
        >
          <div className="w-12 h-12 bg-[#1B4F72]/10 rounded-xl flex items-center justify-center">
            <Users size={24} className="text-[#1B4F72]" />
          </div>
          <div>
            <p className="text-2xl text-[#1B4F72]">{owners.length}</p>
            <p className="text-gray-500 text-sm">Owners</p>
          </div>
        </div>
        <div
          onClick={() => navigate("/pets")}
          className="bg-white rounded-2xl p-4 flex items-center gap-3 shadow-sm cursor-pointer hover:shadow-md transition-shadow border border-gray-50"
        >
          <div className="w-12 h-12 bg-[#2E86C1]/10 rounded-xl flex items-center justify-center">
            <PawPrint size={24} className="text-[#2E86C1]" />
          </div>
          <div>
            <p className="text-2xl text-[#2E86C1]">{pets.length}</p>
            <p className="text-gray-500 text-sm">Pets</p>
          </div>
        </div>
      </div>

      {/* Recent Visits */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-50 mb-6">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <h3 className="text-[#1B4F72]">Recent Visits</h3>
          <button onClick={() => navigate("/pets")} className="text-[#2E86C1] text-sm flex items-center gap-1">
            View all <ChevronRight size={16} />
          </button>
        </div>
        <div>
          {recentVisits.map((visit, i) => {
            const pet = getPetById(visit.petId);
            const owner = pet ? getOwnerById(pet.ownerId) : undefined;
            return (
              <div
                key={visit.id}
                onClick={() => navigate(`/pets/${visit.petId}/visit/${visit.id}`)}
                className={`flex items-center gap-3 px-4 py-3.5 cursor-pointer hover:bg-gray-50 transition-colors ${
                  i < recentVisits.length - 1 ? "border-b border-gray-50" : ""
                }`}
              >
                <div className="w-10 h-10 bg-[#1B4F72]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <PawPrint size={18} className="text-[#1B4F72]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[#333333] truncate">{pet?.name || "Unknown"}</p>
                  <p className="text-gray-500 text-sm truncate">{visit.reason}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs ${
                    visit.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-amber-100 text-amber-700"
                  }`}>
                    {visit.status === "completed" ? "Done" : "In Progress"}
                  </span>
                  <p className="text-gray-400 text-xs mt-0.5">{visit.date}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pending Follow-ups */}
      {pendingFollowUps.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle size={20} className="text-amber-600" />
            <h3 className="text-amber-800">Pending Follow-ups</h3>
          </div>
          {pendingFollowUps.slice(0, 3).map(f => {
            const pet = getPetById(f.petId);
            return (
              <div
                key={f.id}
                onClick={() => navigate("/follow-ups")}
                className="flex items-center gap-3 py-2 cursor-pointer"
              >
                <div className="w-2 h-2 bg-amber-500 rounded-full flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <span className="text-amber-900 text-sm">{pet?.name}</span>
                  <span className="text-amber-700 text-sm mx-1">—</span>
                  <span className="text-amber-700 text-sm">{f.reason}</span>
                </div>
                <span className="text-amber-600 text-xs flex-shrink-0">{f.date}</span>
              </div>
            );
          })}
          {pendingFollowUps.length > 3 && (
            <button onClick={() => navigate("/follow-ups")} className="text-amber-600 text-sm mt-2 flex items-center gap-1">
              +{pendingFollowUps.length - 3} more <ChevronRight size={14} />
            </button>
          )}
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <QuickAction label="New Visit" icon={<PawPrint size={20} />} onClick={() => navigate("/pets")} />
        <QuickAction label="Add Owner" icon={<Users size={20} />} onClick={() => navigate("/owners/add")} />
        <QuickAction label="Invoices" icon={<TrendingUp size={20} />} onClick={() => navigate("/invoices")} />
        <QuickAction label="Reports" icon={<CheckCircle2 size={20} />} onClick={() => navigate("/reports")} />
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color, onClick, alert }: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color: "blue" | "green" | "amber" | "purple";
  onClick?: () => void;
  alert?: boolean;
}) {
  const colors = {
    blue: "bg-blue-50 text-[#1B4F72]",
    green: "bg-green-50 text-green-700",
    amber: "bg-amber-50 text-amber-700",
    purple: "bg-purple-50 text-purple-700",
  };
  const iconColors = {
    blue: "bg-[#1B4F72]/10 text-[#1B4F72]",
    green: "bg-green-100 text-green-700",
    amber: "bg-amber-100 text-amber-700",
    purple: "bg-purple-100 text-purple-700",
  };

  return (
    <div
      onClick={onClick}
      className={`rounded-2xl p-4 cursor-pointer hover:shadow-md transition-all relative overflow-hidden ${colors[color]} border border-current/10`}
    >
      {alert && (
        <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white" />
      )}
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${iconColors[color]}`}>
        {icon}
      </div>
      <p className="text-2xl font-semibold">{value}</p>
      <p className="text-sm opacity-70 mt-0.5">{label}</p>
    </div>
  );
}

function QuickAction({ label, icon, onClick }: { label: string; icon: React.ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center gap-3 hover:bg-[#1B4F72] hover:text-white hover:border-[#1B4F72] transition-all group shadow-sm"
    >
      <div className="text-[#1B4F72] group-hover:text-white transition-colors">{icon}</div>
      <span className="text-[#333333] group-hover:text-white text-sm transition-colors">{label}</span>
      <ChevronRight size={16} className="ml-auto text-gray-300 group-hover:text-white/60 transition-colors" />
    </button>
  );
}