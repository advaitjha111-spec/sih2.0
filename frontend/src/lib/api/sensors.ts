import { apiFetch } from './client';

export async function ingestSensorData(data: any): Promise<any> {
  return apiFetch<any>('/sensors/ingest', {
    method: 'POST',
    body: JSON.stringify(data)
  });
}
