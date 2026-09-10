import { getLatestEvents } from "@/lib/api/events";
import Link from "next/link";
import { Activity, X, ChevronRight, AlertTriangle } from "lucide-react";

export default async function EventsPage() {
  const { events, isFallback } = await getLatestEvents();

  return (
    <div className="absolute right-6 top-6 bottom-6 w-[400px] flex flex-col gap-4 pointer-events-auto">
      
      {/* HEADER */}
      <div className="glass-panel rounded-xl p-6 border border-white/10 shrink-0">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-slate-500" />
            <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">Event Log</span>
          </div>
          <Link href="/dashboard" className="p-1 hover:bg-white/10 rounded-lg transition-colors group">
            <X className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
          </Link>
        </div>
        <h2 className="text-2xl font-serif text-white">Latest Landslide Events</h2>
        {isFallback && (
          <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-1 bg-orange-500/10 border border-orange-500/20 rounded">
            <AlertTriangle className="w-3 h-3 text-orange-400" />
            <span className="text-[10px] font-mono text-orange-400 uppercase tracking-widest">Demo Data</span>
          </div>
        )}
      </div>

      {/* EVENTS LIST */}
      <div className="glass-panel rounded-xl p-4 flex-1 overflow-y-auto border border-white/10 space-y-3 custom-scrollbar">
        {events.map((ev) => (
          <Link href={`/events/${ev.id}`} key={ev.id} className="block group">
            <div className="p-4 rounded-lg bg-white/5 border border-white/5 group-hover:bg-white/10 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded ${ev.severity === 'Critical' ? 'bg-red-500/20 text-red-400' : 'bg-orange-500/20 text-orange-400'}`}>
                  {ev.severity}
                </span>
                <span className="text-[10px] font-mono text-slate-500">
                  {new Date(ev.event_date).toLocaleDateString()}
                </span>
              </div>
              <h3 className="font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors flex items-center justify-between">
                {ev.title}
                <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400" />
              </h3>
              <p className="text-xs text-slate-400 mb-2">{ev.district}, {ev.state}</p>
              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{ev.short_summary}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
