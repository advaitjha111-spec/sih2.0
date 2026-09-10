"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Activity, Droplets, Zap, Wind, CloudRain, AlertCircle, CheckCircle2, ChevronDown, Loader2, AlertTriangle, ShieldAlert, Check, X, Mail, Phone, MessageSquare, Smartphone, Link as LinkIcon } from "lucide-react";

const ASSAM_LOCATIONS = [
  { id: "haflong", name: "Dima Hasao Zone A (Haflong)", baseScore: 92, lat: 25.176, lng: 93.018, route: "Route 27A North" },
  { id: "umrangso", name: "Dima Hasao Zone B (Umrangso)", baseScore: 82, lat: 25.534, lng: 92.730, route: "Route 62 East" },
  { id: "mahurn", name: "Dima Hasao Zone C (Mahur)", baseScore: 68, lat: 25.201, lng: 93.125, route: "Route 14 South" },
  { id: "maibang", name: "Dima Hasao Zone D (Maibang)", baseScore: 45, lat: 25.295, lng: 93.166, route: "N/A - Safe Zone" },
];

export default function OperatorConsole() {
  const [selectedLocation, setSelectedLocation] = useState(ASSAM_LOCATIONS[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStage, setAnalysisStage] = useState(0);
  const [riskScore, setRiskScore] = useState<number | null>(null);

  const [showEvacConfirm, setShowEvacConfirm] = useState(false);
  const [isEvacuating, setIsEvacuating] = useState(false);
  const [showEvacSuccess, setShowEvacSuccess] = useState(false);
  const [guardrailActive, setGuardrailActive] = useState(false);
  const [agentIntervened, setAgentIntervened] = useState(false);

  const runAnalysis = () => {
    if (isAnalyzing) return;
    setIsAnalyzing(true);
    setAnalysisStage(0);
    setRiskScore(null);
    setGuardrailActive(false);
    
    let stage = 0;
    const interval = setInterval(() => {
      stage++;
      setAnalysisStage(stage);
      if (stage >= 5) {
        clearInterval(interval);
        setIsAnalyzing(false);
        const variance = Math.floor(Math.random() * 5) - 2;
        const finalScore = Math.min(100, Math.max(0, selectedLocation.baseScore + variance));
        setRiskScore(finalScore);

        if (finalScore >= 90) {
          setTimeout(() => {
            setGuardrailActive(true);
            setAgentIntervened(true);
            executeEvacuation(true);
          }, 3000);
        }
      }
    }, 1500);
  };

  const executeEvacuation = async (isAgent: boolean = false) => {
    setIsEvacuating(true);
    try {
      await fetch('/api/evacuation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          location: selectedLocation.name,
          riskScore: selectedLocation.baseScore,
          trigger: isAgent ? 'autonomous' : 'manual'
        })
      });
    } catch (e) {
      console.error(e);
    }
    setTimeout(() => {
      setIsEvacuating(false);
      setShowEvacConfirm(false);
      if (isAgent) {
        setGuardrailActive(false);
      }
      setShowEvacSuccess(true);
    }, 2500);
  };

  const handleManualEvacuate = () => {
    setAgentIntervened(false);
    executeEvacuation(false);
  };

  return (
    <div className="min-h-screen bg-[#070a0f] text-slate-200 font-sans p-6 selection:bg-cyan-500/30">
      
      {/* TOP HEADER */}
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="glass-panel flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/10 hover:scale-105 transition-all text-sm font-medium border border-white/10 cursor-pointer">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-950/40 border border-red-900/50 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <h1 className="text-xl font-sans font-black text-white tracking-wide uppercase">BhūmiRaksha — Operator Portal</h1>
              <p className="text-[10px] uppercase tracking-widest text-slate-500 font-mono">Landslide & Slope Instability Management Console</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* DYNAMIC DROPDOWN */}
          <div className="relative">
            <div 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="glass-panel px-4 py-2 rounded-lg flex items-center gap-12 cursor-pointer hover:bg-white/10 hover:scale-105 transition-all text-sm font-medium border border-white/10"
            >
              <span>{selectedLocation.name}</span>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </div>
            {isDropdownOpen && (
              <div className="absolute top-full mt-2 left-0 w-full bg-[#0a0f1a] border border-slate-800 rounded-lg shadow-xl overflow-hidden z-50">
                {ASSAM_LOCATIONS.map(loc => (
                  <div 
                    key={loc.id}
                    onClick={() => {
                      setSelectedLocation(loc);
                      setIsDropdownOpen(false);
                      setRiskScore(null); // reset score on change
                    }}
                    className="px-4 py-3 hover:bg-slate-800 cursor-pointer text-sm text-slate-300 transition-colors"
                  >
                    {loc.name}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-800 bg-slate-900/50">
            <span className={`w-2 h-2 rounded-full ${isAnalyzing ? 'bg-cyan-500 animate-pulse' : 'bg-slate-500'}`}></span>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">{isAnalyzing ? 'Analyzing' : 'Standby'}</span>
          </div>
          <button 
            onClick={runAnalysis}
            className={`${isAnalyzing ? "bg-slate-700 text-slate-300 scale-95" : "bg-white text-black hover:bg-slate-200 hover:scale-105"} px-6 py-2 rounded-full font-bold transition-all flex items-center gap-2 cursor-pointer active:scale-95`}
          >
            {isAnalyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4 fill-black" />}
            {isAnalyzing ? "ANALYZING..." : "RUN ANALYSIS"}
          </button>
        </div>
      </header>

      {/* METRICS ROW */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        {[
          { label: "RISK SCORE", value: riskScore !== null ? riskScore : '--', unit: "/100", icon: Activity, color: "text-red-500", highlight: (riskScore ?? 0) >= 90 },
          { label: "SOIL SATURATION", value: selectedLocation.baseScore > 80 ? "88.5" : "42.1", unit: "%", icon: Droplets, color: "text-cyan-400" },
          { label: "PORE PRESSURE", value: selectedLocation.baseScore > 80 ? "142" : "65", unit: "kPa", icon: Activity, color: "text-orange-400" },
          { label: "RAINFALL 24H", value: selectedLocation.baseScore > 80 ? "245" : "12", unit: "mm", icon: CloudRain, color: "text-blue-400" },
          { label: "DISPLACEMENT", value: selectedLocation.baseScore > 80 ? "12.4" : "0.1", unit: "mm/d", icon: Wind, color: "text-emerald-400" },
        ].map((metric, idx) => (
          <div key={idx} className="glass-panel rounded-xl p-6 relative overflow-hidden group hover:scale-[1.02] hover:bg-white/5 transition-all cursor-pointer border border-white/10">
            {metric.highlight && <div className="absolute inset-0 bg-red-500/5 pointer-events-none group-hover:bg-red-500/10 transition-colors" />}
            <div className="flex items-center gap-2 mb-4">
              <metric.icon className={`w-4 h-4 ${metric.color}`} />
              <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">{metric.label}</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className={`text-4xl font-black tracking-tighter ${metric.highlight ? "text-red-500 group-hover:text-red-400" : "text-cyan-500 group-hover:text-cyan-400"} transition-colors`}>{metric.value}</span>
              <span className="text-sm font-bold text-slate-500">{metric.unit}</span>
            </div>
          </div>
        ))}
      </div>

      {/* TWO COLUMN MAIN LAYOUT (TELEMETRY REMOVED) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[500px]">
        
        {/* LEFT COLUMN: Radial AI Engine */}
        <div className="flex flex-col gap-6">
          <div className="glass-panel rounded-xl p-6 flex-1 flex flex-col relative overflow-hidden border border-white/10 hover:scale-[1.01] transition-transform">
            <div className="flex items-center justify-between mb-8 relative z-10">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-slate-400" />
                <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">AI Risk Engine — XGBOOST + SHAP</span>
              </div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center relative z-10 pb-4">
              {/* Radial Dial Mockup */}
              <div className="relative w-[360px] h-[216px] flex flex-col items-center">
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 60">
                  <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="4" strokeLinecap="round" />
                  
                  {riskScore !== null && (
                    <path 
                      d="M 10 50 A 40 40 0 0 1 90 50" 
                      fill="none" 
                      stroke={riskScore >= 90 ? "#ef4444" : riskScore >= 70 ? "#f97316" : "#06b6d4"} 
                      strokeWidth="5" 
                      strokeLinecap="round" 
                      strokeDasharray="125.6" 
                      strokeDashoffset={125.6 - (125.6 * (riskScore / 100))} 
                      className="transition-all duration-1000 ease-out" 
                    />
                  )}
                  {isAnalyzing && (
                    <path 
                      d="M 10 50 A 40 40 0 0 1 90 50" 
                      fill="none" 
                      stroke="#06b6d4" 
                      strokeWidth="5" 
                      strokeLinecap="round" 
                      strokeDasharray="125.6" 
                      strokeDashoffset={125.6} 
                      className="animate-dial" 
                    />
                  )}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center pt-8">
                  <span 
                    className="text-8xl font-black tracking-tighter leading-none"
                    style={{
                      textShadow: riskScore !== null ? `0 0 40px ${riskScore >= 90 ? "rgba(239,68,68,0.3)" : "rgba(6,182,212,0.3)"}` : 'none',
                      color: riskScore !== null ? (riskScore >= 90 ? "#ef4444" : riskScore >= 70 ? "#f97316" : "#06b6d4") : "#fff"
                    }}
                  >
                    {riskScore !== null ? riskScore : '--'}
                  </span>
                  <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mt-4">Risk Score</span>
                </div>
              </div>
              
              {riskScore !== null && (
                <div className="flex items-center gap-2 mt-2">
                  <span className={`w-2 h-2 rounded-full ${riskScore >= 90 ? 'bg-red-500 animate-pulse' : riskScore >= 70 ? 'bg-orange-500' : 'bg-cyan-500'}`}></span>
                  <span className={`text-xs font-bold tracking-widest uppercase ${riskScore >= 90 ? 'text-red-500' : riskScore >= 70 ? 'text-orange-500' : 'text-cyan-500'}`}>
                    {riskScore >= 90 ? 'Critical' : riskScore >= 70 ? 'Warning' : 'Safe'}
                  </span>
                </div>
              )}
            </div>
            
            {/* Ambient Background Glow */}
            {riskScore !== null && riskScore >= 90 && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-red-500/10 rounded-full blur-[80px] pointer-events-none" />
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Pipeline */}
        <div className="flex flex-col gap-6">
          <div className="glass-panel rounded-xl p-8 flex-1 border border-white/10 flex flex-col">
            <div className="flex items-center gap-2 mb-8">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <span className="text-xs font-bold tracking-widest text-slate-400 uppercase">Analysis Pipeline</span>
            </div>

            <div className="space-y-8 flex-1">
              {[
                { step: "Satellite SAR Processing", status: analysisStage > 0 ? "COMPLETE" : "PENDING", detail: "Backscatter anomaly detection" },
                { step: "Geological Validation", status: analysisStage > 1 ? "COMPLETE" : "PENDING", detail: "Cross-checked with DEM data" },
                { step: "Hydrological Modeling", status: analysisStage > 2 ? "COMPLETE" : "PENDING", detail: "Catchment area saturation" },
                { step: "Impact Assessment", status: analysisStage > 3 ? "COMPLETE" : "PENDING", detail: "Population exposure calculation" },
                { step: "Guardrail Agent Evaluation", status: analysisStage > 4 ? "COMPLETE" : "PENDING", detail: "Autonomous skeptic review" },
              ].map((item, idx) => (
                <div key={idx} className="relative pl-8">
                  <div className={`absolute left-0 top-1 w-3 h-3 rounded-full ${item.status === 'COMPLETE' ? 'bg-emerald-500' : 'bg-slate-700'} ${analysisStage === idx && isAnalyzing ? 'animate-ping bg-cyan-500' : ''}`} />
                  <div className="absolute left-[5px] top-4 bottom-[-2rem] w-px bg-white/10 last:hidden" />
                  
                  <div className="flex justify-between items-start mb-1">
                    <span className={`text-base font-bold ${item.status === 'COMPLETE' ? 'text-white' : 'text-slate-500'}`}>{item.step}</span>
                    <span className={`text-[10px] tracking-widest font-bold ${item.status === 'COMPLETE' ? 'text-emerald-500' : 'text-slate-600'}`}>{item.status}</span>
                  </div>
                  <p className="text-sm text-slate-500 font-mono">{item.detail}</p>
                </div>
              ))}
            </div>

            <button 
              onClick={() => setShowEvacConfirm(true)}
              disabled={riskScore === null || isAnalyzing || riskScore < 70}
              className="w-full mt-8 py-4 bg-red-600 hover:bg-red-500 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-bold rounded-lg tracking-widest text-sm transition-colors shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:scale-[1.02] active:scale-95 cursor-pointer flex items-center justify-center gap-2"
            >
              <AlertCircle className="w-5 h-5" /> ISSUE EVACUATION ORDER
            </button>
          </div>
        </div>

      </div>

      {/* CONFIRMATION MODAL */}
      {showEvacConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#030712]/90 backdrop-blur-sm p-4">
          <div className="bg-[#0a0f1a] border border-red-900/50 rounded-lg w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-red-900/30 flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-red-950/50 flex items-center justify-center text-red-500">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-white tracking-widest uppercase">Confirm Evacuation</h3>
            </div>
            <div className="p-6">
              <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                You are about to issue a mandatory evacuation order for <strong className="text-white">{selectedLocation.name}</strong>. This will instantly dispatch alerts to <strong className="text-white">4,200</strong> registered residents.
              </p>
              <div className="bg-[#05080f] p-3 rounded border border-slate-800 text-[10px] font-mono text-slate-400 mb-6">
                INCIDENT ID: INC-{selectedLocation.id.toUpperCase()}-842<br/>
                AUTHORIZATION: REQUIRED
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowEvacConfirm(false)} className="flex-1 py-2 rounded border border-slate-700 text-xs font-bold text-slate-300 hover:bg-slate-800 transition-colors uppercase tracking-widest">
                  Cancel
                </button>
                <button 
                  onClick={handleManualEvacuate} 
                  disabled={isEvacuating}
                  className="flex-1 py-2 rounded bg-red-600 hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed text-xs font-bold text-white uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
                >
                  {isEvacuating ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      DISPATCHING...
                    </>
                  ) : (
                    <>
                      CONFIRM EVACUATION
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* GUARDRAIL AGENT OVERRIDE MODAL */}
      {guardrailActive && !showEvacSuccess && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-red-950/90 backdrop-blur-md p-4 animate-in fade-in duration-300">
          <div className="bg-[#0a0f1a] border-2 border-red-600 rounded-lg w-full max-w-xl shadow-[0_0_100px_rgba(220,38,38,0.4)] overflow-hidden">
            <div className="bg-red-600 p-4 flex items-center justify-center gap-3 animate-pulse">
              <ShieldAlert className="w-6 h-6 text-white" />
              <h3 className="text-lg font-black text-white tracking-widest uppercase">Skeptic Agent Override</h3>
            </div>
            <div className="p-8 text-center">
              <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-6 animate-bounce" />
              <h2 className="text-2xl font-bold text-white mb-4">CRITICAL RISK THRESHOLD EXCEEDED</h2>
              <p className="text-slate-300 mb-8 leading-relaxed text-lg">
                Human operator delay detected for target <strong>{selectedLocation.name}</strong>. The AI Guardrail Agent has taken control to prevent loss of life.
              </p>
              <div className="bg-red-950/30 p-4 rounded border border-red-900/50 flex flex-col items-center">
                <Loader2 className="w-8 h-8 text-red-500 animate-spin mb-3" />
                <span className="font-mono text-red-400 font-bold tracking-widest">AUTONOMOUSLY DISPATCHING EVACUATION ALERTS...</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUCCESS/DISPATCH MODAL */}
      {showEvacSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#030712]/90 backdrop-blur-sm p-4">
          <div className={`bg-[#0a0f1a] border ${agentIntervened ? "border-amber-500/50 shadow-[0_0_50px_rgba(245,158,11,0.2)]" : "border-emerald-900/50"} rounded-lg w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300`}>
            <div className={`p-4 border-b flex items-center justify-between ${agentIntervened ? "border-amber-900/50 bg-amber-950/20" : "border-emerald-900/30 bg-emerald-950/20"}`}>
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded flex items-center justify-center ${agentIntervened ? "bg-amber-900/50 text-amber-400" : "bg-emerald-900/50 text-emerald-400"}`}>
                  {agentIntervened ? <ShieldAlert className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                </div>
                <h3 className={`text-sm font-bold tracking-widest uppercase ${agentIntervened ? "text-amber-400" : "text-emerald-400"}`}>
                  {agentIntervened ? "Autonomously Dispatched by Agent" : "Evacuation Dispatched"}
                </h3>
              </div>
              <button onClick={() => setShowEvacSuccess(false)} className="text-slate-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 md:p-8">
              {agentIntervened ? (
                <div className="bg-amber-950/20 border border-amber-900/30 p-4 rounded mb-8 text-sm text-amber-200/80 leading-relaxed flex gap-3">
                  <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <p>
                    <strong>Skeptic Agent Action:</strong> The system intercepted a critical delay and bypassed manual approval for <strong>{selectedLocation.name}</strong>. Emergency alerts have been successfully broadcasted in <span className="font-bold text-white">English, Hindi, Assamese, Manipuri, Khasi, and Mizo</span>.
                  </p>
                </div>
              ) : (
                <p className="text-sm text-slate-300 mb-8 leading-relaxed">
                  Emergency alerts for <strong>{selectedLocation.name}</strong> have been successfully broadcasted in <span className="font-bold text-white">English, Hindi, Assamese, Manipuri, Khasi, and Mizo</span>.
                </p>
              )}
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="bg-[#05080f] border border-emerald-500/50 rounded p-4 flex items-center gap-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-emerald-500/10 pointer-events-none" />
                  <Mail className="w-5 h-5 text-emerald-400" />
                  <div>
                    <div className="text-[9px] font-mono text-emerald-500 font-bold mb-0.5">RESEND EMAIL API</div>
                    <div className="text-lg font-bold text-white leading-none">100% <span className="text-xs font-normal text-emerald-400">Delivered</span></div>
                  </div>
                </div>
                {[
                  { icon: Phone, label: "TWILIO CALLS (TRIAL)", stat: "Pending", sub: "DLT Limits" },
                  { icon: MessageSquare, label: "TWILIO SMS (TRIAL)", stat: "Pending", sub: "DLT Limits" },
                  { icon: Smartphone, label: "WHATSAPP (SANDBOX)", stat: "Pending", sub: "Unverified" },
                ].map((item, i) => (
                  <div key={i} className="bg-[#05080f] border border-slate-800 rounded p-4 flex items-center gap-4 opacity-70">
                    <item.icon className="w-5 h-5 text-slate-500" />
                    <div>
                      <div className="text-[9px] font-mono text-slate-500 mb-0.5">{item.label}</div>
                      <div className="text-lg font-bold text-slate-300 leading-none">{item.stat} <span className="text-[10px] font-mono text-amber-500/70">{item.sub}</span></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-[#05080f] rounded border border-slate-800 p-4">
                <h4 className="text-[10px] font-mono text-slate-500 mb-3">PUBLIC TRACKING LINKS</h4>
                <div className="space-y-2">
                  <a href="#!" className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-cyan-400 hover:text-cyan-300 font-mono py-1 gap-2 sm:gap-0">
                    <span className="flex items-center gap-2"><LinkIcon className="w-3 h-3 shrink-0" /> asdma.gov.in/alerts/{selectedLocation.id}</span>
                    <span className="text-[9px] bg-emerald-950 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-900 w-max">ACTIVE</span>
                  </a>
                  <a href="#!" className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-cyan-400 hover:text-cyan-300 font-mono py-1 gap-2 sm:gap-0">
                    <span className="flex items-center gap-2"><LinkIcon className="w-3 h-3 shrink-0" /> ndrf.gov.in/emergency/{selectedLocation.id}</span>
                    <span className="text-[9px] bg-emerald-950 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-900 w-max">ACTIVE</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
