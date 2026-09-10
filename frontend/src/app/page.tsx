"use client";
import SplashCursor from "@/components/SplashCursor";
import CardSwap, { Card } from "@/components/CardSwap";

import Link from "next/link";
import { Globe } from "@/components/Globe";
import { Activity, Map, Radio, AlertTriangle, ShieldAlert, ArrowLeft, Zap, Skull, TrendingDown, EyeOff } from "lucide-react";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { SolarSystem } from "@/components/SolarSystem";

import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 flex flex-col font-sans relative selection:bg-cyan-500/30 overflow-x-hidden">
      
      {/* HEADER */}
      <header className="absolute top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center">
            <Zap className="w-5 h-5 text-white fill-white" />
          </div>
          <span className="font-bold text-xl tracking-tight text-white">BhūmiRaksha</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
          <a href="#threat" className="hover:text-white transition-colors">The Threat</a>
          <a href="#science" className="hover:text-white transition-colors">The Science</a>
          <a href="#architecture" className="hover:text-white transition-colors">Architecture</a>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="px-6 py-2 bg-white text-black font-bold rounded-full text-sm hover:bg-slate-200 transition-colors">
            Live Map &rarr;
          </Link>
          <Link href="/console" className="px-6 py-2 border border-slate-700 bg-neutral-900/50 rounded-full text-sm font-bold text-white hover:border-red-500/50 hover:bg-neutral-900 transition-all flex items-center gap-2">
            Operator Portal <Zap className="w-4 h-4 text-red-500" />
          </Link>
        </div>
      </header>

      {/* LIVE TICKER */}
      <div className="w-full bg-[#3b0728]/40 border-b border-[#831843]/30 overflow-hidden py-2 z-40 mt-[72px] relative backdrop-blur-sm">
        <div className="animate-marquee whitespace-nowrap text-[11px] md:text-xs font-mono font-bold tracking-widest text-red-400/90 flex gap-12">
          <span>● LANDSLIDE ALERT — Dima Hasao Zone · Risk Score 92/100</span>
          <span>● SENTINEL-1 SAR PASS — 09 Sep 2026 14:00 UTC</span>
          <span>● SOIL MOISTURE +18.5% — Saturation threshold exceeded</span>
          <span>● XGBoost Engine — 89% precision · 12ms inference</span>
          <span>● Downstream impact — 4,200 residents at risk</span>
          <span>● Irshalwadi 2023 — $50M damage · Entire village buried</span>
          <span>● ETA failure — ~4 hours from trigger</span>
          <span>● Local siren broadcast — Active</span>
        </div>
      </div>

      <main className="flex-1 flex flex-col relative w-full items-center justify-start z-10 pt-20">
        
        {/* HERO SECTION */}
        <section className="relative w-full min-h-screen flex flex-col items-center justify-center pt-24 pb-32 overflow-hidden">
          
          <AnimatedBackground />
      <SplashCursor />

          {/* Background Atmosphere */}
          <div className="absolute inset-0 z-0">
            <img src="/rain_mountain.gif" alt="Background" className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/60 to-[#050505]" />
          </div>

          {/* Cinematic Hero Text */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative z-10 text-center px-4 w-full max-w-7xl pointer-events-none"
          >
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif italic font-light tracking-tight text-white/90 leading-none mix-blend-screen mb-2 lg:mb-4 z-20">
                Nature's fury strikes
              </h1>
              <h2 className="text-6xl md:text-8xl lg:text-[100px] font-sans font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 leading-none z-10 uppercase">
                WITHOUT WARNING
              </h2>
            </div>
          </motion.div>

          {/* Bottom Description & CTA */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5 }} className="relative z-20 flex flex-col items-center text-center max-w-2xl mx-auto mt-8 pointer-events-auto"><p className="text-lg md:text-xl text-slate-300 mb-8 font-serif italic leading-relaxed">Our AI-powered command center monitors high-risk slopes in real-time, predicting Landslides and Debris Flows before they strike.</p>
            <Link 
              href="/console"
              className="inline-block bg-white text-black font-sans font-bold uppercase tracking-widest text-xs px-10 py-5 rounded-full hover:bg-slate-200 transition-colors shadow-[0_0_40px_rgba(255,255,255,0.2)]"
            >
              Enter Command Center
            </Link>
          </motion.div>

          {/* Bottom Left Intro */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute bottom-24 left-12 z-20 max-w-sm hidden md:block"
          >
            <p className="text-sm text-slate-400 leading-relaxed font-sans font-light">
              Every unstable slope holds a chapter of our planet's changing climate, silently swelling behind fragile terrain in the high mountains.
            </p>
          </motion.div>
        </section>

        {/* SECTION 2: COST OF NO WARNING (With FlipCards) */}
        <motion.section 
          id="threat" 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="w-full max-w-7xl mx-auto px-8 py-32 grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-20"
        >
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-orange-500 mb-4">The Cost of No Warning</h3>
            <h2 className="text-5xl md:text-6xl font-serif italic text-white font-light leading-tight mb-8">
              Three events. Billions lost.<br/>Zero advance notice.
            </h2>
            <p className="text-slate-500 max-w-md font-light text-lg mb-8">
              Aligned with the National Disaster Management Authority (NDMA) guidelines for early warning systems. <br/><br/>
              <span className="text-white/50 text-sm">Hover over the cards to reveal the devastating impact statistics.</span>
            </p>
          </div>
                                  <div className="flex flex-col items-center justify-center relative min-h-[450px]">
              <CardSwap cardDistance={40} verticalDistance={50} delay={4000} pauseOnHover={true}>
                {/* Event 1: Tupul, Manipur */}
                <Card className="w-[350px] h-[400px]">
                  <div className="w-full h-full bg-neutral-900/80 p-8 flex flex-col justify-center items-center group rounded-[24px]">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full opacity-50" />
                    <Skull className="w-12 h-12 text-red-500 mb-4 opacity-80" />
                    <h3 className="text-3xl font-bold text-white tracking-wider uppercase text-center">Tupul,<br/>Manipur</h3>
                    <p className="text-slate-500 font-mono text-sm mt-2">June 2022</p>
                    <div className="mt-6 text-center border-t border-white/10 pt-6 w-full">
                      <div className="text-4xl font-black text-white mb-2">61 <span className="text-lg font-normal text-slate-400 font-serif italic block mt-1">lives lost</span></div>
                      <p className="text-red-200/70 text-sm mt-3 font-medium leading-relaxed">Massive slope failure wiped out an entire railway construction camp in the middle of the night.</p>
                    </div>
                  </div>
                </Card>
                {/* Event 2: Sikkim GLOF */}
                <Card className="w-[350px] h-[400px]">
                  <div className="w-full h-full bg-neutral-900/80 p-8 flex flex-col justify-center items-center group rounded-[24px]">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full opacity-50" />
                    <EyeOff className="w-12 h-12 text-orange-500 mb-4 opacity-80" />
                    <h3 className="text-3xl font-bold text-white tracking-wider uppercase text-center">Teesta Valley,<br/>Sikkim</h3>
                    <p className="text-slate-500 font-mono text-sm mt-2">October 2023</p>
                    <div className="mt-6 text-center border-t border-white/10 pt-6 w-full">
                      <div className="text-4xl font-black text-white mb-2">100+ <span className="text-lg font-normal text-slate-400 font-serif italic block mt-1">casualties</span></div>
                      <p className="text-orange-200/70 text-sm mt-3 font-medium leading-relaxed">GLOF-triggered cascading landslides washed away the Chungthang Dam and obliterated NH-10.</p>
                    </div>
                  </div>
                </Card>
                {/* Event 3: Dima Hasao, Assam */}
                <Card className="w-[350px] h-[400px]">
                  <div className="w-full h-full bg-neutral-900/80 p-8 flex flex-col justify-center items-center group rounded-[24px]">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full opacity-50" />
                    <TrendingDown className="w-12 h-12 text-cyan-500 mb-4 opacity-80" />
                    <h3 className="text-3xl font-bold text-white tracking-wider uppercase text-center">Dima Hasao,<br/>Assam</h3>
                    <p className="text-slate-500 font-mono text-sm mt-2">May 2022</p>
                    <div className="mt-6 text-center border-t border-white/10 pt-6 w-full">
                      <div className="text-4xl font-black text-white mb-2">$30M+ <span className="text-lg font-normal text-slate-400 font-serif italic block mt-1">economic loss</span></div>
                      <p className="text-cyan-200/70 text-sm mt-3 font-medium leading-relaxed">Multiple landslides destroyed Haflong railway station, severing all communication and supply lines.</p>
                    </div>
                  </div>
                </Card>
              </CardSwap>
            </div>

          </motion.section>

        {/* SECTION 3: TECHNICAL ARCHITECTURE */}
        <motion.section 
          id="architecture" 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="w-full max-w-7xl mx-auto px-8 py-32 relative z-20 border-t border-white/5"
        >
          <div className="mb-16">
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-500 mb-4">Technical Architecture</h3>
            <h2 className="text-5xl md:text-6xl font-serif italic text-white font-light leading-tight mb-6">
              Satellite to alert.<br/>Under 10 minutes.
            </h2>
            <p className="text-slate-400 max-w-xl text-lg font-light">
              BhūmiRaksha is a hybrid deterministic + agentic system. The math engine is the backbone. The agents make it legible to humans.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Risk Matrix */}
            <div className="space-y-8">
              {[
                { label: "Soil Saturation (Volumetric)", val: "88%", color: "bg-red-500", w: "88%" },
                { label: "Precip 7-Day Anomaly", val: "210mm", color: "bg-orange-500", w: "70%" },
                { label: "SAR Backscatter Change", val: "-3.2 dB", color: "bg-yellow-500", w: "65%" },
                { label: "Inclinometer Tilt", val: "2.4°", color: "bg-teal-500", w: "40%" },
                { label: "Pore Water Pressure", val: "+14 kPa", color: "bg-blue-500", w: "60%" }
              ].map((metric, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm font-mono mb-2">
                    <span className="text-slate-400">{metric.label}</span>
                    <span className="text-white font-bold">{metric.val}</span>
                  </div>
                  <div className="w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: metric.w }}
                      transition={{ duration: 1.5, delay: i * 0.1, ease: "easeOut" }}
                      viewport={{ once: true }}
                      className={`h-full ${metric.color} rounded-full relative`} 
                    >
                      <div className="absolute right-0 top-0 bottom-0 w-4 bg-white/50 blur-[2px]" />
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>

            {/* Solar System Engines */}
              <div className="flex items-center justify-center col-span-1 md:col-span-1 lg:scale-[0.8] xl:scale-100 origin-center">
                <SolarSystem />
              </div>
          </div>
        </motion.section>

        {/* SECTION 4: PIPELINE CARDS */}
        <motion.section 
          id="science" 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="w-full max-w-7xl mx-auto px-8 py-24 relative z-20"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { num: "01", title: "Sentinel Analysis", desc: "Optical + SAR satellite data detects soil movement and vegetation anomalies via NDWI delta." },
              { num: "02", title: "Env. Cross-Check", desc: "7-day precipitation, soil moisture, and inclinometer tilt validate the satellite signal." },
              { num: "03", title: "XGBoost Engine", desc: "8-feature deterministic model outputs a 0–100 risk index in under 12ms with 89% precision." },
              { num: "04", title: "Local Broadcast", desc: "Automated siren triggers and local-language audio alerts for downstream communities within the 24-hour window." }
            ].map((step, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -5 }}
                className="bg-neutral-900/80 border border-neutral-800 p-8 rounded-3xl hover:bg-neutral-800/80 transition-colors"
              >
                <div className="text-sm font-mono text-slate-500 mb-6">{step.num}</div>
                <h4 className="text-xl font-bold text-white mb-4">{step.title}</h4>
                <p className="text-sm text-slate-400 leading-relaxed font-serif italic">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </main>

      {/* Floating macOS style Dock */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 backdrop-blur-md bg-neutral-900/70 border border-neutral-800 rounded-full px-4 py-3 flex items-center gap-4 shadow-2xl"
      >
        <Link href="/dashboard" className="p-2 hover:bg-white/10 rounded-xl transition-colors text-cyan-500 group relative">
          <Globe className="w-5 h-5" />
          <span className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] font-bold px-3 py-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg border border-white/10">Threat Overview</span>
        </Link>
        <div className="w-px h-6 bg-white/10" />
        <Link href="#science" className="p-2 hover:bg-white/10 rounded-xl transition-colors text-purple-400 group relative">
          <Activity className="w-5 h-5" />
          <span className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] font-bold px-3 py-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg border border-white/10">Science Matrix</span>
        </Link>
        <div className="w-px h-6 bg-white/10" />
        <Link href="#architecture" className="p-2 hover:bg-white/10 rounded-xl transition-colors text-orange-400 group relative">
          <AlertTriangle className="w-5 h-5" />
          <span className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] font-bold px-3 py-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg border border-white/10">Architecture</span>
        </Link>
        <div className="w-px h-6 bg-white/10" />
        <Link href="/dashboard" className="p-2 hover:bg-white/10 rounded-xl transition-colors text-emerald-500 group relative">
          <Map className="w-5 h-5" />
          <span className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] font-bold px-3 py-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg border border-white/10">Live Map</span>
        </Link>
        <div className="w-px h-6 bg-white/10" />
        <Link href="/console" className="p-2 hover:bg-white/10 rounded-xl transition-colors text-red-500 group relative">
          <Radio className="w-5 h-5" />
          <span className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] font-bold px-3 py-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg border border-white/10">Operator Alerts</span>
        </Link>
      </motion.div>

      {/* FOOTER */}
      <footer className="border-t border-white/5 bg-[#050505] py-6 px-8 flex flex-col md:flex-row justify-between items-center text-[10px] font-mono text-slate-500 uppercase tracking-widest z-20 pb-24 md:pb-6 gap-4">
        <div>BhūmiRaksha Operator Console v1.0 • Internal Hackathon 2026</div>
        <div className="flex gap-6">
          <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> XGBoost Engine ACTIVE</span>
          <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Sensor Feed CONNECTED</span>
        </div>
      </footer>
    </div>
  );
}







