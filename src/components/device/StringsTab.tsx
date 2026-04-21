import type { TelemetryFrame } from '@/types/telemetry';
import { fmt } from '@/lib/utils';

interface Props {
  frame: TelemetryFrame | null;
}

const STRING_KEYS: Array<keyof import('@/types/telemetry').Metrics> = [
  'string_1_current',
  'string_2_current',
];

// Dynamically generate up to 24 string keys (inverter may have string_N_current)
function getStringCurrents(metrics: TelemetryFrame['metrics']): Array<{ label: string; value: number | undefined }> {
  const results: Array<{ label: string; value: number | undefined }> = [];
  for (let i = 1; i <= 24; i++) {
    const key = `string_${i}_current`;
    if (key in metrics || i <= 2) {
      results.push({ label: `S${i}`, value: metrics[key] });
    }
  }
  return results;
}

export default function StringsTab({ frame }: Props) {
  const m = frame?.metrics ?? {};
  const strings = getStringCurrents(m);

  return (
    <div>
      <p className="text-xs text-text-secondary mb-4">String currents — greyed if zero or absent</p>
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-2">
        {strings.map(({ label, value }) => {
          const active = (value ?? 0) > 0;
          return (
            <div
              key={label}
              className={`rounded-lg border p-2 text-center transition-colors ${
                active
                  ? 'border-accent-blue/40 bg-accent-blue/10'
                  : 'border-border bg-surface-variant opacity-40'
              }`}
            >
              <div className="text-xs text-text-secondary mb-1">{label}</div>
              <div
                className={`font-mono text-sm font-semibold ${
                  active ? 'text-accent-blue' : 'text-text-secondary'
                }`}
              >
                {fmt(value, 2)}
              </div>
              <div className="text-xs text-text-secondary">A</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
