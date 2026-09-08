import MapComponent from "@/components/MapComponent";
import Link from "next/link";
import { Activity, Bell, Settings, Layers, Search, MapPin, AlertTriangle, Info } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="h-screen w-full flex flex-col overflow-hidden bg-slate-950 text-slate-200 font-sans">
      {/* Top Navbar */}
      <header className="h-14 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md flex items-center justify-between px-4 z-20 shrink-0">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Activity className="w-5 h-5 text-cyan-500" />
            <span className="font-bold text-sm tracking-wide">Bhūmi Raksha</span>
          </Link>
          <div className="h-4 w-px bg-slate-800 mx-2" />
          <span className="text-xs font-medium text-slate-400 bg-slate-900 px-2 py-1 rounded border border-slate-800">
            NER Monitoring Live
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search zones, sensors..." 
              className="bg-slate-900 border border-slate-800 rounded-md pl-9 pr-4 py-1.5 text-sm focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 w-64 transition-all"
            />
          </div>
          <button className="relative p-2 hover:bg-slate-800 rounded-md transition-colors text-slate-400 hover:text-slate-200">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-slate-950"></span>
          </button>
          <button className="p-2 hover:bg-slate-800 rounded-md transition-colors text-slate-400 hover:text-slate-200">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 relative flex">
        
        {/* The Full-Bleed Map */}
        <div className="absolute inset-0 z-0">
          <MapComponent />
        </div>

        {/* Left Floating Panel - Layers & Tools */}
        <div className="absolute left-4 top-4 bottom-4 w-16 md:w-64 flex flex-col gap-4 z-10 pointer-events-none">
          <div className="bg-slate-950/80 backdrop-blur-md border border-slate-800 rounded-xl p-4 shadow-xl pointer-events-auto shrink-0 flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-4 w-full">
              <Layers className="w-5 h-5 text-slate-400" />
              <span className="font-semibold text-sm hidden md:inline">Map Layers</span>
            </div>
            <div className="space-y-3 w-full">
              {[
                { label: "Risk Zones", active: true },
                { label: "Sensor Telemetry", active: true },
                { label: "Rainfall Heatmap", active: false },
                { label: "Infrastructure", active: false },
                { label: "Field Reports", active: true }
              ].map((layer, idx) => (
                <label key={idx} className="flex items-center gap-3 cursor-pointer group hidden md:flex">
                  <div className={`w-4 h-4 rounded-sm border flex items-center justify-center transition-colors ${
                    layer.active ? "bg-cyan-500 border-cyan-500" : "border-slate-600 group-hover:border-slate-500"
                  }`}>
                    {layer.active && <div className="w-2 h-2 bg-slate-950 rounded-[1px]" />}
                  </div>
                  <span className={`text-sm ${layer.active ? "text-slate-200" : "text-slate-400"}`}>{layer.label}</span>
                </label>
              ))}
              {/* Mobile visual only */}
              <div className="md:hidden flex flex-col gap-3 items-center">
                <div className="w-2 h-2 rounded-full bg-cyan-500" />
                <div className="w-2 h-2 rounded-full bg-cyan-500" />
                <div className="w-2 h-2 rounded-full bg-slate-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Floating Panel - Active Alerts & Status */}
        <div className="absolute right-4 top-4 bottom-4 w-72 lg:w-96 flex flex-col gap-4 z-10 pointer-events-none hidden sm:flex">
          
          {/* Critical Alerts */}
          <div className="bg-slate-950/90 backdrop-blur-md border border-red-500/30 rounded-xl p-4 shadow-xl pointer-events-auto shrink-0 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-red-500" />
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500 animate-pulse" />
                <span className="font-bold text-sm text-red-100">Critical Alert</span>
              </div>
              <span className="text-xs text-red-400 font-medium">Just now</span>
            </div>
            <h4 className="font-semibold text-white mb-1">Mangan District High Risk</h4>
            <p className="text-xs text-slate-400 mb-3">
              Soil moisture threshold exceeded (82%) with heavy rainfall predicted in the next 2 hours.
            </p>
            <div className="flex gap-2">
              <button className="flex-1 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-300 text-xs font-semibold py-1.5 rounded transition-colors">
                View Details
              </button>
              <button className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold py-1.5 rounded transition-colors">
                Acknowledge
              </button>
            </div>
          </div>

          {/* Location Focus */}
          <div className="bg-slate-950/80 backdrop-blur-md border border-slate-800 rounded-xl p-4 shadow-xl pointer-events-auto flex-1 flex flex-col min-h-0">
            <div className="flex items-center justify-between mb-4 shrink-0">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-cyan-500" />
                <span className="font-semibold text-sm">Zone Analysis</span>
              </div>
              <button className="p-1 hover:bg-slate-800 rounded">
                <Info className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                <div className="text-xs text-slate-500 mb-1">Selected Area</div>
                <div className="font-bold">Guwahati Hills Sector A</div>
                <div className="flex items-center gap-2 mt-2">
                  <div className="text-xs font-semibold px-2 py-0.5 rounded bg-orange-500/20 text-orange-400 border border-orange-500/30">
                    High Risk
                  </div>
                  <div className="text-xs text-slate-400">Score: 72/100</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Live Metrics</div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 bg-slate-900 border border-slate-800 rounded">
                    <div className="text-[10px] text-slate-500">Soil Moisture</div>
                    <div className="font-bold text-slate-200">68% <span className="text-orange-400 text-xs">↑</span></div>
                  </div>
                  <div className="p-2 bg-slate-900 border border-slate-800 rounded">
                    <div className="text-[10px] text-slate-500">Rainfall (24h)</div>
                    <div className="font-bold text-slate-200">120 mm</div>
                  </div>
                  <div className="p-2 bg-slate-900 border border-slate-800 rounded">
                    <div className="text-[10px] text-slate-500">Inclinometer</div>
                    <div className="font-bold text-slate-200">0.05°</div>
                  </div>
                  <div className="p-2 bg-slate-900 border border-slate-800 rounded">
                    <div className="text-[10px] text-slate-500">Last Update</div>
                    <div className="font-bold text-slate-200">2 min ago</div>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800">
                 <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">AI Assessment</div>
                 <p className="text-xs text-slate-300 leading-relaxed">
                   Pattern matches pre-failure conditions observed in 2024. Recommended action: Elevate monitoring frequency and notify local DOT regarding Highway 37 segment.
                 </p>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
