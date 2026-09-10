import { apiFetch } from './client';

export interface LandslideEvent {
  id: string | number;
  title: string;
  state: string;
  district: string;
  event_date: string;
  severity: string;
  short_summary: string;
  source_name: string;
  status: string;
  latitude?: number;
  longitude?: number;
}

export async function getLatestEvents(): Promise<{ events: LandslideEvent[], isFallback: boolean }> {
  try {
    const data = await apiFetch<{ events: LandslideEvent[] }>('/events/latest', { next: { revalidate: 60 } });
    return { events: data.events || [], isFallback: false };
  } catch (error) {
    return {
      isFallback: true,
      events: [
        {
          id: "demo-1",
          title: "Mangan Landslide",
          state: "Sikkim",
          district: "Mangan",
          event_date: new Date().toISOString(),
          severity: "High",
          short_summary: "Landslide above Chyakoong River obstructed river flow.",
          source_name: "Government of Sikkim / District Administration, Mangan",
          status: "Monitoring"
        }
      ]
    };
  }
}
