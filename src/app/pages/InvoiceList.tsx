import { useState } from "react";
import { useNavigate } from "react-router";
import { FileText, ChevronRight, CheckCircle, AlertCircle, Clock, Filter } from "lucide-react";
import { useApp } from "../context/AppContext";
import { PageHeader } from "../components/PageHeader";

type StatusFilter = "all" | "paid" | "unpaid" | "partial";

export function InvoiceList() {
  const navigate = useNavigate();
  const { invoices, getPetById } = useApp();
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [dateFilter, setDateFilter] = useState("");

  const filtered = invoices
    .filter(inv => statusFilter === "all" || inv.paymentStatus === statusFilter)
    .filter(inv => !dateFilter || inv.date.startsWith(dateFilter))
    .sort((a, b) => b.date.localeCompare(a.date));

  const totalUnpaid = invoices
    .filter(inv => inv.paymentStatus === "unpaid" || inv.paymentStatus === "partial")
    .reduce((sum, inv) => sum + inv.total, 0);

  const totalPaid = invoices
    .filter(inv => inv.paymentStatus === "paid")
    .reduce((sum, inv) => sum + inv.total, 0);

  const statusConfig = {
    paid: { label: "Paid", bg: "bg-green-100", text: "text-green-700", icon: <CheckCircle size={14} /> },
    unpaid: { label: "Unpaid", bg: "bg-red-100", text: "text-red-700", icon: <AlertCircle size={14} /> },
    partial: { label: "Partial", bg: "bg-amber-100", text: "text-amber-700", icon: <Clock size={14} /> },
  };

  return (
    <div>
      <PageHeader title="Invoices" subtitle={`${invoices.length} total`} />

      <div className="p-4 md:p-6 max-w-2xl mx-auto">
        {/* Summary */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-green-50 border border-green-100 rounded-2xl p-4">
            <p className="text-green-600 text-xs mb-1">Total Collected</p>
            <p className="text-2xl text-green-700">${totalPaid.toFixed(0)}</p>
          </div>
          <div className="bg-red-50 border border-red-100 rounded-2xl p-4">
            <p className="text-red-600 text-xs mb-1">Outstanding</p>
            <p className="text-2xl text-red-700">${totalUnpaid.toFixed(0)}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-3 overflow-x-auto pb-1">
          {(["all", "paid", "unpaid", "partial"] as StatusFilter[]).map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm transition-colors capitalize ${
                statusFilter === s
                  ? "bg-[#1B4F72] text-white shadow-sm"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-[#2E86C1]"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Date Filter */}
        <div className="flex items-center gap-2 mb-4">
          <Filter size={16} className="text-gray-400" />
          <input
            type="month"
            value={dateFilter}
            onChange={e => setDateFilter(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:border-[#2E86C1]"
          />
          {dateFilter && (
            <button onClick={() => setDateFilter("")} className="text-gray-400 hover:text-gray-600 text-sm">Clear</button>
          )}
        </div>

        {/* Invoice List */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {filtered.length === 0 ? (
            <div className="py-16 text-center">
              <FileText size={40} className="mx-auto text-gray-300 mb-3" />
              <p className="text-gray-500">No invoices found</p>
            </div>
          ) : (
            filtered.map((inv, i) => {
              const pet = getPetById(inv.petId);
              const cfg = statusConfig[inv.paymentStatus];
              return (
                <div
                  key={inv.id}
                  onClick={() => navigate(`/invoices/${inv.id}`)}
                  className={`flex items-center gap-3 px-4 py-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                    i < filtered.length - 1 ? "border-b border-gray-100" : ""
                  }`}
                >
                  <div className="w-10 h-10 bg-[#1B4F72]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FileText size={18} className="text-[#1B4F72]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-[#333333] font-medium text-sm">{inv.invoiceNumber}</p>
                      <span className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.text}`}>
                        {cfg.icon} {cfg.label}
                      </span>
                    </div>
                    <p className="text-[#2E86C1] text-sm mt-0.5">{pet?.name}</p>
                    <p className="text-gray-400 text-xs mt-0.5">{inv.date}{inv.paymentMethod ? ` · ${inv.paymentMethod}` : ""}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-[#1B4F72] font-bold">${inv.total.toFixed(2)}</p>
                    <ChevronRight size={16} className="text-gray-300 ml-auto mt-1" />
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
