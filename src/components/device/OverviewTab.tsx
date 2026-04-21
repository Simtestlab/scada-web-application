import StatusBadge from '@/components/ui/StatusBadge';
import type { TelemetryFrame } from '@/types/telemetry';
import { fmtKw, fmt, calcEfficiency, fmtMwh, fmtMinutes } from '@/lib/utils';

interface Props {
  frame: TelemetryFrame | null;
}

interface HeroCardProps {
  label: string;
  value: string;
  unit: string;
  accent: string;
  border: string;
}

function HeroCard({ label, value, unit, accent, border }: HeroCardProps) {
  return (
    <div className={`bg-card rounded-xl border ${border} p-6 flex flex-col gap-2`}>
      <span className="text-xs font-semibold text-text-secondary uppercase tracking-widest">{label}</span>
      <div className="flex items-baseline gap-2 mt-1">
        <span className={`font-mono text-4xl font-bold ${accent}`}>{value}</span>
        <span className="text-base text-text-secondary font-medium">{unit}</span>
      </div>
    </div>
  );
}

interface StatRowProps {
  label: string;
  value: string;
  unit?: string;
  accent?: string;
}

function StatRow({ label, value, unit, accent = 'text-text-primary' }: StatRowProps) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
      <span className="text-sm text-text-secondary">{label}</span>
      <span className={`font-mono text-sm font-semibold ${accent}`}>
        {value}
        {unit && <span className="text-text-secondary font-normal ml-1">{unit}</span>}
      </span>
    </div>
  );
}

export default function OverviewTab({ frame }: Props) {
  const m = frame?.metrics ?? {};
  const ts = frame?.timestamp ?? frame?.time;

  return (
    <div className="space-y-4">
      {/* Hero row — primary KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <HeroCard
          label="AC Active Power"
          value={fmtKw(m.total_active_power)}
          unit="kW"
          accent="text-accent-blue"
          border="border-accent-blue/25"
        />
        <HeroCard
          label="Daily Energy Yield"
          value={fmt(m.daily_energy, 2)}
          unit="kWh"
          accent="text-accent-green"
          border="border-accent-green/25"
        />
        {/* Status card */}
        <div className="bg-card rounded-xl border border-border p-6 flex flex-col gap-3">
          <span className="text-xs font-semibold text-text-secondary uppercase tracking-widest">Inverter Status</span>
          <StatusBadge workState={m.work_state} size="md" />
          {ts && (
            <span className="text-xs text-text-secondary mt-auto">
              Last update:{' '}
              {new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </span>
          )}
        </div>
      </div>

      {/* Secondary metrics — two columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Power metrics */}
        <div className="bg-card rounded-xl border border-border p-5">
          <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">Power</h3>
          <StatRow label="DC Power"       value={fmtKw(m.total_dc_power)}      unit="kW"  accent="text-accent-cyan" />
          <StatRow label="Apparent Power" value={m.total_apparent_power !== undefined ? (m.total_apparent_power / 1000).toFixed(2) : '—'} unit="kVA" />
          <StatRow label="Efficiency"     value={calcEfficiency(m.total_active_power, m.total_dc_power)} unit="%" accent="text-accent-purple" />
          <StatRow label="Power Factor"   value={fmt(m.power_factor, 3)} />
          <StatRow label="Grid Frequency" value={fmt(m.grid_frequency, 2)} unit="Hz" />
        </div>

        {/* Energy & system */}
        <div className="bg-card rounded-xl border border-border p-5">
          <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">Energy & System</h3>
          <StatRow label="Monthly Energy" value={fmt(m.monthly_energy, 2)}  unit="kWh" accent="text-accent-green" />
          <StatRow label="Total Yield"    value={fmtMwh(m.total_energy)}    unit="MWh" />
          <StatRow label="Total Export"   value={fmtMwh(m.total_export)}    unit="MWh" />
          <StatRow label="Temperature"    value={fmt(m.internal_temp, 1)}   unit="°C"  accent="text-accent-orange" />
          <StatRow label="Daily Runtime"  value={fmtMinutes(m.daily_running_time)} />
        </div>
      </div>
    </div>
  );
}
