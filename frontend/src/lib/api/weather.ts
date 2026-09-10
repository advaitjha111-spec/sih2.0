import { apiFetch } from './client';

export async function getCurrentWeather(): Promise<{ data: any, isFallback: boolean }> {
  try {
    const data = await apiFetch<any>('/weather/current', { next: { revalidate: 300 } });
    return { data, isFallback: false };
  } catch (error) {
    return {
      isFallback: true,
      data: { status: "ok", temp: 24, condition: "Heavy Rain", rainfall_24h: 142.7 }
    };
  }
}
