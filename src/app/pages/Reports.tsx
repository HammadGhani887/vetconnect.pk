import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { Calendar, TrendingUp, Users, PawPrint, FileText, Syringe, CalendarCheck } from "lucide-react";
import { useApp } from "../context/AppContext";
import { PageHeader } from "../components/PageHeader";

export function Reports() {
  const { visits, invoices, pets, owners, followUps, vaccinations } = useApp();
  const [dateRange, setDateRange] = useState("month");
  const [startDate, setStartDate] = useState("2024-04-01");
  const [endDate, setEndDate] = useState("2024-04-30");

  const today = new Date().toISOString().split("T")[0];

  // Filter data by date range
  const getDateRange = () => {
    if (dateRange === "today") {
      return { start: today, end: today };
    } else if (dateRange === "week") {
      const start = new Date(Date.now() - 7 * 24 * 3600 * 1000).toISOString().split("T")[0];
      return { start, end: today };
    } else if (dateRange === "month") {
      const now = new Date();
      const start = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-01`;
      return { start, end: today };
    } else {
      return { start: startDate, end: endDate };
    }
  };

  const { start, end } = getDateRange();
  const filteredVisits = visits.filter(v => v.date >= start && v.date <= end);
  const filteredInvoices = invoices.filter(i => i.date >= start && i.date <= end);

  const totalRevenue = filteredInvoices.reduce((sum, inv) => sum + (inv.paymentStatus === "paid" ? inv.total : 0), 0);
  const totalOutstanding = filteredInvoices.reduce((sum, inv) =>
    sum + (inv.paymentStatus !== "paid" ? inv.total : 0), 0);

  const pendingFollowUps = followUps.filter(f => f.status === "pending").length;
  const missedFollowUps = followUps.filter(f => f.status === "missed").length;

  const vacsDue = vaccinations.filter(v => v.nextDueDate <= today).length;

  // Species distribution
  const speciesCounts = pets.reduce<Record<string, number>>((acc, p) => {
    acc[p.species] = (acc[p.species] || 0) + 1;
    return acc;
  }, {});
  const speciesData = Object.entries(speciesCounts).map(([name, value]) => ({ name, value }));

  // Daily visits chart (last 7 days)
  const dailyData = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(Date.now() - (6 - i) * 24 * 3600 * 1000);
    const dateStr = d.toISOString().split("T")[0];
    const dayVisits = visits.filter(v => v.date === dateStr).length;
    const dayRevenue = invoices
      .filter(inv => inv.date === dateStr && inv.paymentStatus === "paid")
      .reduce((sum, inv) => sum + inv.total, 0);
    return {
      date: d.toLocaleDateString("en", { weekday: "short" }),
      visits: dayVisits,
      revenue: Math.round(dayRevenue),
    };
  });

  const PIE_COLORS = ["#1B4F72", "#2E86C1", "#5DADE2", "#AED6F1", "#D6EAF8"];

  return (
    <div>
      <PageHeader title="Reports" subtitle="Analytics & Summary" />

      <div className="p-4 md:p-6 max-w-3xl mx-auto">
        {/* Date Range Selector */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-4">
          <div className="flex gap-2 flex-wrap mb-3">
            {[
              { value: "today", label: "Today" },
              { value: "week", label: "This Week" },
              { value: "month", label: "This Month" },
              { value: "custom", label: "Custom" },
            ].map(opt => (
              <button
                key={opt.value}
                onClick={() => setDateRange(opt.value)}
                className={`px-4 py-2 rounded-xl text-sm transition-colors ${
                  dateRange === opt.value
                    ? "bg-[#1B4F72] text-white"
                    : "border border-gray-200 text-gray-600 hover:border-[#2E86C1]"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          {dateRange === "custom" && (
            <div className="flex gap-3 items-center">
              <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#2E86C1]" />
              <span className="text-gray-400">to</span>
              <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#2E86C1]" />
            </div>
          )}
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          <MetricCard icon={<Calendar size={20} />} label="Visits" value={filteredVisits.length} color="blue" />
          <MetricCard icon={<TrendingUp size={20} />} label="Revenue" value={`$${totalRevenue.toFixed(0)}`} color="green" />
          <MetricCard icon={<FileText size={20} />} label="Outstanding" value={`$${totalOutstanding.toFixed(0)}`} color="red" />
          <MetricCard icon={<CalendarCheck size={20} />} label="Follow-ups Due" value={pendingFollowUps} color="amber" />
        </div>

        {/* Totals Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          <StatBox icon={<Users size={18} />} label="Total Owners" value={owners.length} />
          <StatBox icon={<PawPrint size={18} />} label="Total Pets" value={pets.length} />
          <StatBox icon={<Syringe size={18} />} label="Vaccines Due" value={vacsDue} alert={vacsDue > 0} />
          <StatBox icon={<CalendarCheck size={18} />} label="Missed Follow-ups" value={missedFollowUps} alert={missedFollowUps > 0} />
        </div>

        {/* Daily Visits Chart */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-4">
          <h3 className="text-[#1B4F72] text-sm mb-4">Daily Visits (Last 7 Days)</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="visits" fill="#1B4F72" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Chart */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-4">
          <h3 className="text-[#1B4F72] text-sm mb-4">Daily Revenue (Last 7 Days)</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip formatter={(v) => [`$${v}`, "Revenue"]} />
              <Bar dataKey="revenue" fill="#2E86C1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Species Distribution */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
          <h3 className="text-[#1B4F72] text-sm mb-4">Pets by Species</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={speciesData} cx="50%" cy="50%" outerRadius={75} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                {speciesData.map((_, i) => (
                  <Cell key={`cell-${i}`} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ icon, label, value, color }: {
  icon: React.ReactNode; label: string; value: string | number; color: string;
}) {
  const colors: Record<string, string> = {
    blue: "bg-blue-50 text-[#1B4F72] border-blue-100",
    green: "bg-green-50 text-green-700 border-green-100",
    red: "bg-red-50 text-red-700 border-red-100",
    amber: "bg-amber-50 text-amber-700 border-amber-100",
  };
  return (
    <div className={`rounded-2xl p-4 border ${colors[color]}`}>
      <div className="mb-2 opacity-70">{icon}</div>
      <p className="text-xl font-bold">{value}</p>
      <p className="text-xs opacity-70 mt-0.5">{label}</p>
    </div>
  );
}

function StatBox({ icon, label, value, alert }: {
  icon: React.ReactNode; label: string; value: number; alert?: boolean;
}) {
  return (
    <div className={`bg-white rounded-xl border ${alert ? "border-amber-200" : "border-gray-100"} p-3 flex items-center gap-2 shadow-sm`}>
      <div className={`${alert ? "text-amber-500" : "text-[#2E86C1]"}`}>{icon}</div>
      <div>
        <p className={`font-bold ${alert ? "text-amber-700" : "text-[#333333]"}`}>{value}</p>
        <p className="text-gray-500 text-xs">{label}</p>
      </div>
    </div>
  );
}
