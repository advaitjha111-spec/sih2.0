import { getLatestPredictions } from "@/lib/api/predictions";
import Link from "next/link";

export default async function PredictionsPage() {
  const { predictions, isFallback } = await getLatestPredictions();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-8">
      <header className="mb-8 flex items-center gap-4">
        <Link href="/dashboard" className="text-cyan-500 hover:underline">← Back to Dashboard</Link>
        <h1 className="text-2xl font-bold">Prediction Explorer</h1>
        {isFallback && <span className="text-xs font-bold text-orange-400 bg-orange-500/10 px-2 py-1 rounded border border-orange-500/30">Using Demo data</span>}
      </header>
      <div className="grid gap-4 max-w-3xl">
        {predictions.map((p, i) => (
          <div key={i} className="bg-slate-900 p-6 rounded-lg border border-slate-800 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-lg">{p.zone}</h3>
              <p className="text-sm text-slate-400">AI Model Assessment</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-orange-400">{(p.risk_probability * 100).toFixed(1)}%</div>
              <div className="text-xs text-slate-500">Probability of failure</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
