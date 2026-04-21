import SectionCard from '@/components/ui/SectionCard';
import type { TelemetryFrame } from '@/types/telemetry';
import { fmt, fmtMinutes } from '@/lib/utils';

interface Props {
  frame: TelemetryFrame | null;
}

function DataRow({ label, value, unit }: { label: string; value: string; unit?: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-border last:border-0">
      <span className="text-sm text-text-secondary">{label}</span>
      <span className="font-mono text-sm font-medium text-text-primary">
        {value}
        {unit && <span className="text-text-secondary font-normal ml-1">{unit}</span>}
      </span>
    </div>
  );
}

function PhaseRow({
  phase,
  voltage,
  current,
}: {
  phase: string;
  voltage: number | undefined;
  current: number | undefined;
}) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-border last:border-0 gap-4">
      <span className="text-sm font-medium text-text-secondary w-6">{phase}</span>
      <span className="font-mono text-sm text-accent-blue flex-1 text-center">
        {fmt(voltage, 1)} <span className="text-text-secondary text-xs">V</span>
      </span>
      <span className="font-mono text-sm text-accent-cyan flex-1 text-right">
        {fmt(current, 2)} <span className="text-text-secondary text-xs">A</span>
      </span>
    </div>
  );
}

interface MpptTileProps {
  index: number;
  voltage: number | undefined;
  current: number | undefined;
  power: number | undefined;
}

function MpptTile({ index, voltage, current, power }: MpptTileProps) {
  const isActive = (power ?? 0) > 0;
  return (
    <div
      className={`rounded-lg border p-3 ${
        isActive ? 'border-accent-cyan/30 bg-accent-cyan/5' : 'border-border bg-surface-variant'
      }`}
    >
      <div className="text-xs font-semibold text-text-secondary mb-2">MPPT {index}</div>
      <div className="space-y-1">
        <div className="flex justify-between text-xs">
          <span className="text-text-secondary">Voltage</span>
          <span className="font-mono text-accent-blue">{fmt(voltage, 1)} V</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-text-secondary">Current</span>
          <span className="font-mono text-accent-cyan">{fmt(current, 2)} A</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-text-secondary">Power</span>
          <span className="font-mono text-accent-green">{power !== undefined ? (power / 1000).toFixed(2) : '—'} kW</span>
        </div>
      </div>
    </div>
  );
}

export default function GridMpptTab({ frame }: Props) {
  const m = frame?.metrics ?? {};

  return (
    <div className="space-y-4">
      {/* AC Phases */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SectionCard title="AC Phases">
          <div className="flex justify-between text-xs text-text-secondary mb-2 px-0">
            <span className="w-6" />
            <span className="flex-1 text-center">Voltage</span>
            <span className="flex-1 text-right">Current</span>
          </div>
          <PhaseRow phase="A" voltage={m.phase_a_voltage} current={m.phase_a_current} />
          <PhaseRow phase="B" voltage={m.phase_b_voltage} current={m.phase_b_current} />
          <PhaseRow phase="C" voltage={m.phase_c_voltage} current={m.phase_c_current} />
        </SectionCard>

        {/* Grid metrics */}
        <SectionCard title="Grid">
          <DataRow label="Frequency"       value={fmt(m.grid_frequency, 2)}        unit="Hz" />
          <DataRow label="Power Factor"    value={fmt(m.power_factor, 3)}           />
          <DataRow label="Apparent Power"  value={m.total_apparent_power !== undefined ? (m.total_apparent_power / 1000).toFixed(2) : '—'} unit="kVA" />
        </SectionCard>
      </div>

      {/* MPPT */}
      <SectionCard title="MPPT Trackers">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
          {Array.from({ length: 12 }, (_, i) => i + 1).map((i) => {
            const vKey = `mppt${i}_voltage`;
            const aKey = `mppt${i}_current`;
            const pKey = `mppt${i}_power`;
            // Always show first 2; for 3-12 only show if voltage exists in data
            if (i > 2 && m[vKey] === undefined) return null;
            return (
              <MpptTile
                key={i}
                index={i}
                voltage={m[vKey]}
                current={m[aKey]}
                power={m[pKey]}
              />
            );
          })}
        </div>
      </SectionCard>

      {/* System */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SectionCard title="System Health">
          <DataRow label="Insulation Resistance" value={fmt(m.array_insulation_resistance)} unit="kΩ" />
          <DataRow label="Temperature"            value={fmt(m.internal_temp, 1)}           unit="°C" />
        </SectionCard>
        <SectionCard title="Runtime">
          <DataRow label="Daily Runtime" value={fmtMinutes(m.daily_running_time)} />
          <DataRow label="Total Runtime" value={fmtMinutes(m.total_running_time)} />
        </SectionCard>
      </div>
    </div>
  );
}
