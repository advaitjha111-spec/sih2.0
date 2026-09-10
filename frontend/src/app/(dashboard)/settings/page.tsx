import Link from "next/link";
import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-8">
      <header className="mb-8 flex items-center gap-4">
        <Link href="/dashboard" className="text-cyan-500 hover:underline">← Back to Dashboard</Link>
        <h1 className="text-2xl font-bold flex items-center gap-2"><Settings className="w-6 h-6"/> Settings</h1>
      </header>
      <div className="bg-slate-900 p-8 rounded-lg border border-slate-800 max-w-2xl">
        <h2 className="text-lg font-bold mb-4">Demo Controls</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-slate-950 rounded border border-slate-800">
            <div>
              <div className="font-semibold">Simulate Sensor Event</div>
              <div className="text-sm text-slate-400">Trigger a saturation event for demo purposes</div>
            </div>
            <button className="bg-cyan-600 hover:bg-cyan-500 px-4 py-2 rounded text-sm font-bold transition-colors">Trigger</button>
          </div>
          <div className="flex items-center justify-between p-4 bg-slate-950 rounded border border-slate-800">
            <div>
              <div className="font-semibold">Language</div>
              <div className="text-sm text-slate-400">Select system language</div>
            </div>
            <select className="bg-slate-800 border border-slate-700 rounded p-2 text-sm">
              <option>English</option>
              <option>Hindi</option>
              <option>Assamese</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
