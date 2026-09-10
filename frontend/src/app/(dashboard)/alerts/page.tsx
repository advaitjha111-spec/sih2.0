import { getActiveAlerts } from "@/lib/api/alerts";
import Link from "next/link";
import { Bell, X, ShieldAlert } from "lucide-react";

export default async function AlertsPage() {
  const { alerts, isFallback } = await getActiveAlerts();

  return (
    <div className="absolute right-6 top-6 bottom-6 w-[400px] flex flex-col gap-4 pointer-events-auto">
      {/* HEADER */}
      <div className="glass-panel rounded-xl p-6 border border-white/10 shrink-0 border-b-2 border-b-red-500">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-red-500 animate-pulse" />
            <span className="text-[10px] font-bold tracking-widest text-red-500 uppercase">Emergency Protocol</span>
          </div>
          <Link href="/dashboard" className="p-1 hover:bg-white/10 rounded-lg transition-colors group">
            <X className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
          </Link>
        </div>
        <h2 className="text-2xl font-serif text-white">Active Alerts</h2>
        {isFallback && (
          <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-1 bg-orange-500/10 border border-orange-500/20 rounded">
            <ShieldAlert className="w-3 h-3 text-orange-400" />
            <span className="text-[10px] font-mono text-orange-400 uppercase tracking-widest">Demo Data</span>
          </div>
        )}
      </div>

      {/* ALERTS LIST */}
      <div className="glass-panel rounded-xl p-4 flex-1 overflow-y-auto border border-white/10 space-y-3 custom-scrollbar">
        {alerts.map((a) => (
          <div key={a.id} className="p-4 rounded-lg bg-red-950/20 border border-red-900/50 hover:bg-red-900/30 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded bg-red-500/20 text-red-400">
                {a.level}
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                {new Date(a.timestamp).toLocaleTimeString()}
              </span>
            </div>
            <h3 className="font-bold text-white mb-1">
              {a.title}
            </h3>
            <p className="text-xs text-slate-300">{a.message}</p>
          </div>
        ))}
        {alerts.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
            <Bell className="w-8 h-8 text-slate-500 mb-3" />
            <p className="text-sm font-medium text-slate-300">No active alerts</p>
          </div>
        )}
      </div>
    </div>
  );
}
