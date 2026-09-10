import MapWrapper from "@/components/MapWrapper";
import Link from "next/link";
import { ShieldAlert, Map as MapIcon, Layers, Settings, ChevronDown, Activity, Radio, AlertTriangle } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-full flex flex-col overflow-hidden bg-[#070a0f] text-slate-200 font-sans selection:bg-cyan-500/30">
      {/* Top Navbar - VajraWatch Style */}
      <header className="h-16 border-b border-white/5 bg-[#0b0f17]/90 backdrop-blur-md flex items-center justify-between px-6 z-20 shrink-0">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <ShieldAlert className="w-5 h-5 text-red-500" />
            <span className="font-serif italic text-lg tracking-wide text-white">BhumiRaksha</span>
          </Link>
          
          <div className="h-4 w-px bg-white/10 mx-2" />
          
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
            AI Early Warning Command Center
          </span>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            <span className="flex items-center gap-1.5"><Activity className="w-3.5 h-3.5" /> 3 SAT</span>
            <span className="flex items-center gap-1.5"><Activity className="w-3.5 h-3.5" /> 2 min ago</span>
          </div>
          
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-red-900/30 bg-red-950/20">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-red-100">21 Slopes Monitored</span>
          </div>
          
          <div className="h-4 w-px bg-white/10" />
          
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-800 bg-slate-900">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">DEMO</span>
          </div>

          <button className="text-slate-400 hover:text-white transition-colors">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 relative flex">
        
        {/* The Full-Bleed Map */}
        <div className="absolute inset-0 z-0">
          <MapWrapper />
        </div>

        {/* Map toggle controls have been moved to MapComponent for state access */}

        {/* Children (The side panels based on route) */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {children}
        </div>
        
      </main>
    </div>
  );
}
