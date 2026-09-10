import { apiFetch } from './client';

export interface Report {
  id: number;
  type: string;
  location: string;
  status: string;
  timestamp: string;
}

export async function getReports(): Promise<{ reports: Report[], isFallback: boolean }> {
  try {
    const data = await apiFetch<{ reports: Report[] }>('/reports', { cache: 'no-store' });
    return { reports: data.reports || [], isFallback: false };
  } catch (error) {
    return {
      isFallback: true,
      reports: [
        { id: 1, type: "Road Blockage", location: "NH-10 near Teesta", status: "Unverified", timestamp: new Date().toISOString() }
      ]
    };
  }
}
