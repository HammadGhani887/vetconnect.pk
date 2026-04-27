import { useState } from "react";
import { RefreshCw, CheckCircle, Clock, AlertCircle, Wifi, WifiOff } from "lucide-react";
import { useApp } from "../context/AppContext";
import { PageHeader } from "../components/PageHeader";

export function SyncScreen() {
  const { syncLogs, visits, treatments, vaccinations, invoices } = useApp();
  const [syncing, setSyncing] = useState(false);
  const [lastSync, setLastSync] = useState("2024-04-26 15:45:00");

  const pendingCount = syncLogs.filter(l => l.status === "pending").length;
  const failedCount = syncLogs.filter(l => l.status === "failed").length;
  const syncedCount = syncLogs.filter(l => l.status === "synced").length;

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      setLastSync(new Date().toLocaleString());
    }, 3000);
  };

  const statusConfig = {
    synced: { label: "Synced", bg: "bg-green-100", text: "text-green-700", icon: <CheckCircle size={14} /> },
    pending: { label: "Pending", bg: "bg-amber-100", text: "text-amber-700", icon: <Clock size={14} /> },
    failed: { label: "Failed", bg: "bg-red-100", text: "text-red-700", icon: <AlertCircle size={14} /> },
  };

  const totalRecords = visits.length + treatments.length + vaccinations.length + invoices.length;

  return (
    <div>
      <PageHeader title="Data Sync" subtitle="Sync your clinic data" />

      <div className="p-4 md:p-6 max-w-2xl mx-auto space-y-4">
        {/* Sync Status Card */}
        <div className={`rounded-2xl p-5 text-white ${
          pendingCount > 0 || failedCount > 0
            ? "bg-gradient-to-r from-amber-500 to-orange-500"
            : "bg-gradient-to-r from-[#1B4F72] to-[#2E86C1]"
        }`}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                {pendingCount > 0 || failedCount > 0
                  ? <WifiOff size={20} className="text-white/80" />
                  : <Wifi size={20} className="text-white/80" />
                }
                <span className="text-white/80 text-sm">
                  {pendingCount > 0 || failedCount > 0 ? "Sync Required" : "All Synced"}
                </span>
              </div>
              {pendingCount > 0 || failedCount > 0 ? (
                <h2 className="text-white">{pendingCount + failedCount} records need sync</h2>
              ) : (
                <h2 className="text-white">Everything up to date</h2>
              )}
              <p className="text-white/70 text-sm mt-1">Last sync: {lastSync}</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{pendingCount + failedCount}</p>
              <p className="text-white/70 text-xs">Unsynced</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 text-center">
            <p className="text-2xl text-amber-700">{pendingCount}</p>
            <p className="text-amber-600 text-xs mt-0.5">Pending</p>
          </div>
          <div className="bg-red-50 border border-red-100 rounded-xl p-3 text-center">
            <p className="text-2xl text-red-700">{failedCount}</p>
            <p className="text-red-600 text-xs mt-0.5">Failed</p>
          </div>
          <div className="bg-green-50 border border-green-100 rounded-xl p-3 text-center">
            <p className="text-2xl text-green-700">{syncedCount}</p>
            <p className="text-green-600 text-xs mt-0.5">Synced</p>
          </div>
        </div>

        {/* Total Records */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
          <h3 className="text-[#1B4F72] text-sm mb-3">Database Summary</h3>
          <div className="space-y-2">
            {[
              { label: "Total Visits", count: visits.length },
              { label: "Total Treatments", count: treatments.length },
              { label: "Total Vaccinations", count: vaccinations.length },
              { label: "Total Invoices", count: invoices.length },
            ].map(item => (
              <div key={item.label} className="flex items-center justify-between text-sm">
                <span className="text-gray-600">{item.label}</span>
                <span className="text-[#1B4F72] font-medium">{item.count} records</span>
              </div>
            ))}
            <div className="flex items-center justify-between text-sm border-t border-gray-100 pt-2 mt-2">
              <span className="text-[#333333] font-medium">Total Records</span>
              <span className="text-[#1B4F72] font-bold">{totalRecords}</span>
            </div>
          </div>
        </div>

        {/* Sync Button */}
        <button
          onClick={handleSync}
          disabled={syncing}
          className={`w-full py-4 rounded-2xl text-white flex items-center justify-center gap-3 text-lg transition-colors shadow-lg ${
            syncing
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#1B4F72] hover:bg-[#2E86C1]"
          }`}
        >
          <RefreshCw size={22} className={syncing ? "animate-spin" : ""} />
          {syncing ? "Syncing..." : "Sync Now"}
        </button>

        {/* Sync Log */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-4 py-3 bg-[#F5F7FA] border-b border-gray-100">
            <h3 className="text-[#1B4F72] text-sm">Sync Log</h3>
          </div>
          {syncLogs.map((log, i) => {
            const cfg = statusConfig[log.status];
            return (
              <div
                key={log.id}
                className={`flex items-start gap-3 px-4 py-3.5 ${i < syncLogs.length - 1 ? "border-b border-gray-50" : ""}`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${cfg.bg}`}>
                  <span className={cfg.text}>{cfg.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-[#333333] text-sm font-medium">{log.recordType}</p>
                    <span className="text-gray-400 text-xs">#{log.recordId}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.text}`}>{cfg.label}</span>
                  </div>
                  <p className="text-gray-400 text-xs mt-0.5">{log.timestamp}</p>
                  {log.error && <p className="text-red-500 text-xs mt-0.5">{log.error}</p>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
