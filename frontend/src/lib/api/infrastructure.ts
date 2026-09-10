import { apiFetch } from './client';

export interface InfrastructureStatus {
  id: number;
  name: string;
  status: string;
}

export async function getInfrastructure(): Promise<{ infrastructure: InfrastructureStatus[], isFallback: boolean }> {
  try {
    const data = await apiFetch<{ infrastructure: InfrastructureStatus[] }>('/infrastructure', { cache: 'no-store' });
    return { infrastructure: data.infrastructure || [], isFallback: false };
  } catch (error) {
    return {
      isFallback: true,
      infrastructure: [
        { id: 1, name: "Highway 37 Segment", status: "AT_RISK" },
        { id: 2, name: "NH-10 near Teesta", status: "BLOCKED" }
      ]
    };
  }
}
