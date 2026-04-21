const BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://scada-backend-api.onrender.com';

export async function fetchDevices(): Promise<string[]> {
  const res = await fetch(`${BASE}/devices`, { cache: 'no-store' });
  if (!res.ok) throw new Error(`/devices failed: ${res.status}`);
  const data = (await res.json()) as { device_ids: string[] };
  return data.device_ids;
}

export async function fetchHistorical(
  deviceId: string,
  start: Date,
  end: Date,
  limit = 2000,
): Promise<Record<string, unknown>[]> {
  const params = new URLSearchParams({
    start: start.toISOString(),
    end: end.toISOString(),
    limit: String(limit),
  });
  const res = await fetch(`${BASE}/historical/${encodeURIComponent(deviceId)}?${params}`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`/historical failed: ${res.status}`);
  return res.json() as Promise<Record<string, unknown>[]>;
}

export function getWsUrl(deviceId: string): string {
  const wsBase = BASE.replace(/^https/, 'wss').replace(/^http/, 'ws');
  return `${wsBase}/ws/dashboard/${encodeURIComponent(deviceId)}`;
}
