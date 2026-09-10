import { getCurrentWeather } from "@/lib/api/weather";
import Link from "next/link";
import { CloudRain, X, AlertTriangle, Wind, Droplets } from "lucide-react";

export default async function WeatherPage() {
  const { data, isFallback } = await getCurrentWeather();

  return (
    <div className="absolute right-6 top-6 bottom-6 w-[400px] flex flex-col gap-4 pointer-events-auto">
      {/* HEADER */}
      <div className="glass-panel rounded-xl p-6 border border-white/10 shrink-0">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <CloudRain className="w-4 h-4 text-slate-500" />
            <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">Meteorology</span>
          </div>
          <Link href="/dashboard" className="p-1 hover:bg-white/10 rounded-lg transition-colors group">
            <X className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
          </Link>
        </div>
        <h2 className="text-2xl font-serif text-white">Weather & Forecast</h2>
        {isFallback && (
          <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-1 bg-orange-500/10 border border-orange-500/20 rounded">
            <AlertTriangle className="w-3 h-3 text-orange-400" />
            <span className="text-[10px] font-mono text-orange-400 uppercase tracking-widest">Demo Data</span>
          </div>
        )}
      </div>

      {/* WEATHER DATA */}
      <div className="glass-panel rounded-xl p-6 flex-1 border border-white/10 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-500/10 rounded-full blur-[60px] pointer-events-none" />
        
        <div className="relative z-10 text-center mb-8">
          <div className="text-[10px] font-bold tracking-widest text-slate-500 uppercase mb-2">Current Condition</div>
          <div className="text-7xl font-serif italic text-white mb-2">{data.temp}°<span className="text-4xl text-slate-500">C</span></div>
          <div className="text-xl font-bold text-cyan-400">{data.condition}</div>
        </div>
        
        <div className="relative z-10 w-full space-y-4">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <div className="flex items-center gap-3">
              <Droplets className="w-4 h-4 text-slate-400" />
              <span className="text-sm font-bold text-white">Rainfall (24h)</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-cyan-400">{data.rainfall_24h || 0}</span>
              <span className="text-[10px] font-mono text-slate-500">mm</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between pb-1">
            <div className="flex items-center gap-3">
              <Wind className="w-4 h-4 text-slate-400" />
              <span className="text-sm font-bold text-white">Wind Speed</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-emerald-400">14</span>
              <span className="text-[10px] font-mono text-slate-500">km/h</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
