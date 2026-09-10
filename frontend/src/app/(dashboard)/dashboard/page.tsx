"use client";

import { ChevronDown, Activity, Zap, CloudRain, Droplets, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";

const data = [
  { time: "00:00", risk: 20 },
  { time: "04:00", risk: 25 },
  { time: "08:00", risk: 40 },
  { time: "12:00", risk: 35 },
  { time: "16:00", risk: 60 },
  { time: "20:00", risk: 84 },
  { time: "24:00", risk: 88 },
];

export default function LiveMapDashboard() {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, staggerChildren: 0.1 }}
      className="absolute right-6 top-6 max-h-[calc(100vh-48px)] overflow-y-auto w-[420px] flex flex-col gap-4 pointer-events-auto pb-4 [&::-webkit-scrollbar]:hidden"
    >
      
      {/* TARGET SELECTOR */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel rounded-2xl p-6 border border-white/10 backdrop-blur-md bg-black/40 hover:bg-black/60 transition-colors"
      >
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">Selected Target</span>
        </div>
        <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2 cursor-pointer group">
          <span className="text-3xl font-sans font-bold text-white group-hover:text-cyan-400 transition-colors">Dima Hasao Zone A</span>
          <ChevronDown className="w-5 h-5 text-slate-500 group-hover:text-cyan-400 transition-colors" />
        </div>
        <span className="text-[10px] font-mono text-slate-500 tracking-wider">LND_DIMA_01</span>
      </motion.div>{/* TOP RISK DRIVERS */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel rounded-2xl p-6 border border-white/10 backdrop-blur-md bg-black/40"
      >
        <div className="flex items-center gap-2 mb-6">
          <AlertTriangle className="w-4 h-4 text-slate-500" />
          <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">Top Risk Drivers</span>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-white/5 pb-3 hover:bg-white/5 p-2 rounded transition-colors">
            <div className="flex items-center gap-3">
              <CloudRain className="w-5 h-5 text-red-400" />
              <div className="flex flex-col">
                <span className="text-sm font-bold text-white">Rainfall Anomaly</span>
                <span className="text-[10px] text-slate-500">24h Accumulated</span>
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-bold text-white">210.0mm</span>
              <span className="text-[10px] font-mono text-red-400 bg-red-400/10 px-1.5 py-0.5 rounded border border-red-400/20">1.4x</span>
            </div>
          </div>
          <div className="flex items-center justify-between hover:bg-white/5 p-2 rounded transition-colors">
            <div className="flex items-center gap-3">
              <Droplets className="w-5 h-5 text-orange-400" />
              <div className="flex flex-col">
                <span className="text-sm font-bold text-white">Soil Saturation</span>
                <span className="text-[10px] text-slate-500">Subsurface Level</span>
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-bold text-white">88.5%</span>
              <span className="text-[10px] font-mono text-orange-400 bg-orange-400/10 px-1.5 py-0.5 rounded border border-orange-400/20">Crit</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* RUN ANALYSIS CTA */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Link href="/console" className="w-full bg-gradient-to-r from-white to-slate-300 text-black py-4 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:opacity-90 transition-opacity pointer-events-auto shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            <Zap className="w-4 h-4 fill-black" />
            Launch Command Center
        </Link>
      </motion.div>
      
      <div className="text-center text-[10px] font-mono text-slate-600 mt-2 pointer-events-none">
        Ready ? Secure Connection ? Live Telemetry
      </div>
    </motion.div>
  );
}



