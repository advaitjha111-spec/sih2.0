import { getLatestEvents } from "@/lib/api/events";
import Link from "next/link";

export default async function EventDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const { events } = await getLatestEvents();
  const event = events.find(e => e.id.toString() === resolvedParams.id) || events[0];

  if (!event) return <div className="p-8 text-white">Event not found</div>;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-8">
      <Link href="/events" className="text-cyan-500 hover:underline mb-8 inline-block">← Back to Events</Link>
      <div className="bg-slate-900 p-8 rounded-lg border border-slate-800 max-w-3xl">
        <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
        <p className="text-slate-400 mb-6">{event.district}, {event.state} • {new Date(event.event_date).toLocaleDateString()}</p>
        <div className="mb-6">
          <span className={`px-3 py-1 rounded font-bold text-sm ${event.severity === 'Critical' ? 'bg-red-500/20 text-red-400' : 'bg-orange-500/20 text-orange-400'}`}>
            Severity: {event.severity}
          </span>
        </div>
        <p className="text-lg leading-relaxed mb-6">{event.short_summary}</p>
        <div className="border-t border-slate-800 pt-4 mt-6">
          <p className="text-sm text-slate-500">Source: {event.source_name}</p>
          <p className="text-sm text-slate-500">Status: {event.status}</p>
        </div>
      </div>
    </div>
  );
}
