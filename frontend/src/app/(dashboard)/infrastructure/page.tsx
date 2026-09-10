import { getInfrastructure } from "@/lib/api/infrastructure";
import Link from "next/link";
import { AlertTriangle, X, ShieldAlert } from "lucide-react";

export default async function InfrastructurePage() {
  const { infrastructure, isFallback } = await getInfrastructure();

  return (
    <div className="absolute right-6 top-6 bottom-6 w-[400px] flex flex-col gap-4 pointer-events-auto">
      {/* HEADER */}
      <div className="glass-panel rounded-xl p-6 border border-white/10 shrink-0">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-slate-500" />
            <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">Impact Assessment</span>
          </div>
          <Link href="/dashboard" className="p-1 hover:bg-white/10 rounded-lg transition-colors group">
            <X className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
          </Link>
        </div>
        <h2 className="text-2xl font-serif text-white">Road & Infrastructure</h2>
        {isFallback && (
          <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-1 bg-orange-500/10 border border-orange-500/20 rounded">
            <ShieldAlert className="w-3 h-3 text-orange-400" />
            <span className="text-[10px] font-mono text-orange-400 uppercase tracking-widest">Demo Data</span>
          </div>
        )}
      </div>

      {/* INFRASTRUCTURE LIST */}
      <div className="glass-panel rounded-xl p-4 flex-1 overflow-y-auto border border-white/10 space-y-3 custom-scrollbar">
        {infrastructure.map((i) => (
          <div key={i.id} className="p-4 rounded-lg bg-white/5 border border-white/5 flex items-center justify-between">
            <span className="font-bold text-sm text-white">{i.name}</span>
            <span className={`text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded ${
              i.status === 'OPEN' ? 'bg-emerald-500/20 text-emerald-400' :
              i.status === 'AT_RISK' ? 'bg-orange-500/20 text-orange-400' :
              'bg-red-500/20 text-red-400'
            }`}>
              {i.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
