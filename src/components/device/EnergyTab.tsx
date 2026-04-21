import type { TelemetryFrame } from '@/types/telemetry';
import { fmt, fmtMwh } from '@/lib/utils';

interface Props {
  frame: TelemetryFrame | null;
}

interface EnergyHeroProps {
  label: string;
  value: string;
  unit: string;
  accent: string;
  border: string;
  sub?: string;
}

function EnergyHero({ label, value, unit, accent, border, sub }: EnergyHeroProps) {
  return (
    <div className={`bg-card rounded-xl border ${border} p-6 flex flex-col gap-2`}>
      <span className="text-xs font-semibold text-text-secondary uppercase tracking-widest">{label}</span>
      <div className="flex items-baseline gap-2 mt-2">
        <span className={`font-mono text-4xl font-bold ${accent}`}>{value}</span>
        <span className="text-base text-text-secondary font-medium">{unit}</span>
      </div>
      {sub && <span className="text-xs text-text-secondary mt-1">{sub}</span>}
    </div>
  );
}

function EnergyRow({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
      <span className="text-sm text-text-secondary">{label}</span>
      <span className="font-mono text-sm font-semibold text-text-primary">
        {value} <span className="text-text-secondary font-normal text-xs">{unit}</span>
      </span>
    </div>
  );
}

export default function EnergyTab({ frame }: Props) {
  const m = frame?.metrics ?? {};

  return (
    <div className="space-y-4">
      {/* Hero cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <EnergyHero
          label="Today's Yield"
          value={fmt(m.daily_energy, 2)}
          unit="kWh"
          accent="text-accent-green"
          border="border-accent-green/25"
        />
        <EnergyHero
          label="This Month"
          value={fmt(m.monthly_energy, 2)}
          unit="kWh"
          accent="text-accent-blue"
          border="border-accent-blue/25"
        />
        <EnergyHero
          label="All-Time Yield"
          value={fmtMwh(m.total_energy)}
          unit="MWh"
          accent="text-accent-purple"
          border="border-accent-purple/25"
        />
      </div>

      {/* Detail rows */}
      <div className="bg-card rounded-xl border border-border p-5">
        <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">Cumulative Totals</h3>
        <EnergyRow label="Total Export"   value={fmtMwh(m.total_export)} unit="MWh" />
      </div>
    </div>
  );
}
