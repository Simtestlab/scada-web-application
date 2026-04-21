/** Format a number with fixed decimal places, returning '—' for undefined/NaN */
export function fmt(v: number | undefined, decimals = 1): string {
  if (v === undefined || v === null || Number.isNaN(v)) return '—';
  return v.toFixed(decimals);
}

/** Convert W → kW string */
export function fmtKw(v: number | undefined, decimals = 2): string {
  if (v === undefined || v === null || Number.isNaN(v)) return '—';
  return (v / 1000).toFixed(decimals);
}

/** Convert Wh → MWh string */
export function fmtMwh(v: number | undefined): string {
  if (v === undefined || v === null || Number.isNaN(v)) return '—';
  return (v / 1_000_000).toFixed(3);
}

/** Inverter efficiency as percentage */
export function calcEfficiency(
  activePower: number | undefined,
  dcPower: number | undefined,
): string {
  if (!activePower || !dcPower || dcPower === 0) return '—';
  return ((activePower / dcPower) * 100).toFixed(1);
}

/** Format minutes → Xh Ym */
export function fmtMinutes(minutes: number | undefined): string {
  if (minutes === undefined) return '—';
  const h = Math.floor(minutes / 60);
  const m = Math.round(minutes % 60);
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

/** Format ISO timestamp to HH:mm:ss */
export function fmtTime(iso: string): string {
  try {
    return new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  } catch {
    return iso;
  }
}

/** Format ISO timestamp to readable date-time */
export function fmtDateTime(iso: string): string {
  try {
    return new Date(iso).toLocaleString([], {
      month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
    });
  } catch {
    return iso;
  }
}

/** Clamp a value between min and max */
export function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}
