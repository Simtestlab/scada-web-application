import type { TelemetryFrame } from '@/types/telemetry';
import { fmtKw, fmt } from '@/lib/utils';

interface Props {
  devices: string[];
  telemetry: Record<string, TelemetryFrame>;
}

export default function FleetSummaryBar({ devices, telemetry }: Props) {
  let totalActivePower = 0;
  let totalDailyEnergy = 0;
  let onlineCount = 0;

  for (const id of devices) {
    const m = telemetry[id]?.metrics;
    if (!m) continue;
    totalActivePower += m.total_active_power ?? 0;
    totalDailyEnergy += m.daily_energy ?? 0;
    if ((m.work_state ?? -1) === 0) onlineCount++;
  }

  const stats = [
    { label: 'Fleet Active Power', value: fmtKw(totalActivePower), unit: 'kW',  accent: 'text-accent-blue' },
    { label: 'Fleet Daily Energy', value: fmt(totalDailyEnergy, 2), unit: 'kWh', accent: 'text-accent-green' },
    { label: 'Online Inverters',   value: String(onlineCount),      unit: `/ ${devices.length}`, accent: 'text-accent-cyan' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {stats.map((s) => (
        <div key={s.label} className="bg-card rounded-xl border border-border p-4">
          <div className="text-xs text-text-secondary uppercase tracking-wider mb-1">{s.label}</div>
          <div className={`font-mono text-2xl font-semibold ${s.accent}`}>
            {s.value} <span className="text-sm font-normal text-text-secondary">{s.unit}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
