import { apiFetch } from './client';

export interface Alert {
  id: number;
  title: string;
  level: string;
  message: string;
  timestamp: string;
}

export async function getActiveAlerts(): Promise<{ alerts: Alert[], isFallback: boolean }> {
  try {
    const data = await apiFetch<{ alerts: Alert[] }>('/alerts/active', { cache: 'no-store' });
    return { alerts: data.alerts || [], isFallback: false };
  } catch (error) {
    return {
      isFallback: true,
      alerts: [
        {
          id: 1,
          title: "Critical Alert - Mangan District",
          level: "RED",
          message: "Soil moisture threshold exceeded with heavy rainfall predicted.",
          timestamp: new Date().toISOString()
        }
      ]
    };
  }
}
