import { apiFetch } from './client';

export interface RiskZone {
  id: number;
  name?: string;
  risk_level: string;
  score?: number;
  latitude: number;
  longitude: number;
  soil_moisture?: number;
  rainfall_24h?: number;
}

export async function getRiskZones(): Promise<{ zones: RiskZone[], isFallback: boolean }> {
  try {
    const data = await apiFetch<RiskZone[]>('/risk/zones', { cache: 'no-store' });
    return { zones: data || [], isFallback: false };
  } catch (error) {
    return {
      isFallback: true,
      zones: [
        {
          id: 1,
          name: "Guwahati Hills Sector A",
          risk_level: "ORANGE",
          score: 72,
          latitude: 26.18,
          longitude: 91.75,
          soil_moisture: 68,
          rainfall_24h: 120
        },
        {
          id: 2,
          name: "Mangan District",
          risk_level: "RED",
          score: 89,
          latitude: 27.5,
          longitude: 88.5,
          soil_moisture: 82,
          rainfall_24h: 180
        }
      ]
    };
  }
}
