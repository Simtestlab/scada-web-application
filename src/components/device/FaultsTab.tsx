import StatusBadge from '@/components/ui/StatusBadge';
import { decodeWorkState, COLOR_MAP } from '@/lib/workState';
import type { TelemetryFrame } from '@/types/telemetry';
import { fmt } from '@/lib/utils';

interface Props {
  frame: TelemetryFrame | null;
}

function CodeRow({ label, value }: { label: string; value: number | undefined }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
      <span className="text-sm text-text-secondary">{label}</span>
      <span className="font-mono text-sm text-text-primary">
        {value !== undefined
          ? `0x${Math.round(value).toString(16).toUpperCase().padStart(4, '0')}`
          : <span className="text-text-secondary">—</span>}
      </span>
    </div>
  );
}

function InfoRow({ label, value, unit }: { label: string; value: string; unit?: string }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
      <span className="text-sm text-text-secondary">{label}</span>
      <span className="font-mono text-sm text-text-primary">
        {value}{unit && <span className="text-text-secondary font-normal ml-1">{unit}</span>}
      </span>
    </div>
  );
}

export default function FaultsTab({ frame }: Props) {
  const m = frame?.metrics ?? {};
  const { label, color } = decodeWorkState(m.work_state);

  return (
    <div className="space-y-4">
      {/* Work state hero */}
      <div className={`rounded-xl border p-6 ${COLOR_MAP[color]}`}>
        <p className="text-xs font-semibold uppercase tracking-widest mb-3 opacity-70">Current Work State</p>
        <div className="flex items-center gap-4">
          <StatusBadge workState={m.work_state} size="md" />
          <span className="font-mono text-lg font-semibold">
            {m.work_state !== undefined
              ? `0x${Math.round(m.work_state).toString(16).toUpperCase().padStart(4, '0')}`
              : '—'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Fault codes */}
        <div className="bg-card rounded-xl border border-border p-5">
          <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">Fault Codes</h3>
          <CodeRow label="Fault Code"     value={m.fault_code} />
          <CodeRow label="PID Alarm Code" value={m.pid_alarm_code} />
        </div>

        {/* Protection & system */}
        <div className="bg-card rounded-xl border border-border p-5">
          <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">Protection</h3>
          <InfoRow
            label="Insulation Resistance"
            value={m.array_insulation_resistance !== undefined
              ? m.array_insulation_resistance.toFixed(0)
              : '—'}
            unit="kΩ"
          />
          <InfoRow label="Temperature" value={fmt(m.internal_temp, 1)} unit="°C" />
        </div>
      </div>
    </div>
  );
}
