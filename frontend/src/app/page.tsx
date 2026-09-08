import Link from "next/link";
import { Globe } from "@/components/Globe";
import { ArrowRight, Activity, Map, CloudRain, AlertTriangle, Radio } from "lucide-react";

export const revalidate = 60; // revalidate every 60 seconds

async function getLatestEvents() {
  try {
    const res = await fetch("http://127.0.0.1:8000/api/events/latest", {
      next: { revalidate: 60 }
    });
    if (!res.ok) throw new Error("Failed to fetch events");
    const data = await res.json();
    return { events: data.events, isFallback: false };
  } catch (error) {
    console.error("Failed to fetch events from backend, using fallback data.");
    return {
      isFallback: true,
      events: [
        {
          id: "demo-1",
          title: "Mangan Landslide",
          state: "Sikkim",
          district: "Mangan",
          event_date: "2026-09-05T12:00:00Z",
          severity: "High",
          short_summary: "Landslide above Chyakoong River obstructed river flow.",
          source_name: "Government of Sikkim / District Administration, Mangan"
        },
        {
          id: "demo-2",
          title: "Guwahati Rainfall Landslide",
          state: "Assam",
          district: "Kamrup Metropolitan",
          event_date: "2026-09-02T08:00:00Z",
          severity: "Critical",
          short_summary: "Heavy rainfall triggered a landslide with casualties.",
          source_name: "Official News Source"
        }
      ]
    };
  }
}

export default async function LandingPage() {
  const { events, isFallback } = await getLatestEvents();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col font-sans selection:bg-cyan-500/30">
      
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="text-cyan-500 w-6 h-6" />
            <span className="text-lg font-bold tracking-wide">Bhūmi Raksha</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
            <Link href="#events" className="hover:text-white transition-colors">Latest Events</Link>
            <Link href="#how-it-works" className="hover:text-white transition-colors">How It Works</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link 
              href="/dashboard" 
              className="bg-cyan-600 hover:bg-cyan-500 text-white px-5 py-2 rounded-md text-sm font-semibold transition-all shadow-[0_0_15px_rgba(8,145,178,0.4)]"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden pt-20 pb-32">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-900/20 rounded-full blur-3xl" />

          <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 text-xs font-medium text-slate-300">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                Live NER Monitoring Active
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                See the risk before <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                  the slope moves.
                </span>
              </h1>
              
              <p className="text-lg text-slate-400 max-w-xl leading-relaxed">
                Bhūmi Raksha combines rainfall, soil conditions, terrain, field reports, and AI-driven risk prediction to help NER authorities identify vulnerable zones earlier and respond faster.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link 
                  href="/dashboard" 
                  className="inline-flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-[0_0_20px_rgba(8,145,178,0.4)] group"
                >
                  Get Started 
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  href="#events" 
                  className="inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Explore Latest Events
                </Link>
              </div>
            </div>

            <div className="relative">
              <Globe />
            </div>
          </div>
        </section>

        {/* CAPABILITIES STRIP */}
        <section className="border-y border-slate-800 bg-slate-900/50 backdrop-blur-sm relative z-20">
          <div className="max-w-7xl mx-auto px-6 py-10">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
              {[
                { icon: Activity, label: "AI Risk Prediction" },
                { icon: Map, label: "Live Risk Mapping" },
                { icon: CloudRain, label: "Weather-linked Analysis" },
                { icon: Radio, label: "Sensor Telemetry" },
                { icon: AlertTriangle, label: "Infrastructure Impact" },
                { icon: AlertTriangle, label: "Early Alerts" },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center gap-3 opacity-80 hover:opacity-100 transition-opacity">
                  <item.icon className="w-6 h-6 text-cyan-500" />
                  <span className="text-sm font-medium text-slate-300">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LATEST EVENTS */}
        <section id="events" className="py-24 bg-slate-950">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold mb-4">Latest Landslide Activity</h2>
                <p className="text-slate-400">Recent incidents and conditions relevant to the region.</p>
                {isFallback && (
                  <div className="mt-2 inline-block px-2 py-1 text-xs font-semibold text-orange-400 border border-orange-400/30 bg-orange-400/10 rounded">
                    Using Demo data
                  </div>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event: any) => (
                <Link key={event.id} href={`/dashboard?event=${event.id}`} className="group block">
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 h-full hover:border-cyan-500/50 transition-colors">
                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider ${
                        event.severity === 'Critical' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                        event.severity === 'High' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
                        'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                      }`}>
                        {event.severity}
                      </span>
                      <span className="text-sm text-slate-500">
                        {new Date(event.event_date).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold mb-2 group-hover:text-cyan-400 transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                      {event.short_summary}
                    </p>
                    <div className="mt-auto pt-4 border-t border-slate-800 flex items-center justify-between">
                      <span className="text-xs text-slate-500 truncate pr-4" title={event.source_name}>
                        {event.source_name}
                      </span>
                      <span className="text-sm font-medium text-cyan-500 whitespace-nowrap">View Event</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="py-24 bg-slate-900">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-16">How Bhūmi Raksha Works</h2>
            
            <div className="grid md:grid-cols-5 gap-8">
              {[
                { step: "1. Collect", desc: "Weather + terrain + sensors + reports" },
                { step: "2. Analyze", desc: "Risk model + ML inference" },
                { step: "3. Map", desc: "Hotspots + infrastructure + roads" },
                { step: "4. Alert", desc: "Zone-specific warnings" },
                { step: "5. Respond", desc: "Prioritized field action" },
              ].map((item, i) => (
                <div key={i} className="relative">
                  {i < 4 && <div className="hidden md:block absolute top-6 left-[60%] w-[80%] h-[2px] bg-slate-800" />}
                  <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mb-4 relative z-10 border border-slate-700 text-cyan-400 font-bold">
                    {i + 1}
                  </div>
                  <h3 className="text-lg font-bold mb-2">{item.step.split('.')[1]}</h3>
                  <p className="text-sm text-slate-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* COMPARISON SECTION */}
        <section className="py-24 bg-slate-950">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 lg:p-12">
                <h3 className="text-2xl font-bold mb-6 text-slate-400">Before</h3>
                <ul className="space-y-4 text-slate-400">
                  <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-slate-600" /> Scattered data</li>
                  <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-slate-600" /> Manual checking</li>
                  <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-slate-600" /> Delayed field reports</li>
                  <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-slate-600" /> No unified risk picture</li>
                  <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-slate-600" /> Hard-to-prioritize incidents</li>
                </ul>
              </div>
              <div className="bg-cyan-950/20 border border-cyan-900/50 rounded-2xl p-8 lg:p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-600/10 blur-3xl rounded-full" />
                <h3 className="text-2xl font-bold mb-6 text-cyan-400">With Bhūmi Raksha</h3>
                <ul className="space-y-4 text-slate-300 relative z-10">
                  <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-cyan-500" /> Unified geospatial view</li>
                  <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-cyan-500" /> Continuous telemetry ingestion</li>
                  <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-cyan-500" /> AI-assisted risk scoring</li>
                  <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-cyan-500" /> Citizen / field evidence</li>
                  <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-cyan-500" /> Road & infrastructure impact</li>
                  <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-cyan-500" /> Centralized alerts and response priority</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-20 text-center">
              <Link 
                href="/dashboard" 
                className="inline-flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-[0_0_30px_rgba(8,145,178,0.3)] hover:shadow-[0_0_40px_rgba(8,145,178,0.5)]"
              >
                Open Risk Dashboard
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 bg-slate-950 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Activity className="text-slate-500 w-5 h-5" />
                <span className="font-bold text-slate-300">Bhūmi Raksha</span>
              </div>
              <p className="text-sm text-slate-500">Internal Hackathon Project • Disaster-risk awareness and decision support.</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-500">© 2026 Bhūmi Raksha. Built for disaster-risk awareness and decision support.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
