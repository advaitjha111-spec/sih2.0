const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

export async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`API Error: ${response.status} - ${errorBody}`);
    }

    return response.json() as Promise<T>;
  } catch (error) {
    console.error(`Fetch error on ${endpoint}:`, error);
    throw error;
  }
}
