import { apiFetch } from './client';

export async function getLatestPredictions(): Promise<{ predictions: any[], isFallback: boolean }> {
  try {
    const data = await apiFetch<{ predictions: any[] }>('/predictions/latest', { cache: 'no-store' });
    return { predictions: data.predictions || [], isFallback: false };
  } catch (error) {
    return {
      isFallback: true,
      predictions: [
        { id: 1, zone: "Sector B", risk_probability: 0.82 }
      ]
    };
  }
}
