export type WorkStateColor = 'green' | 'orange' | 'red' | 'gray';

export interface WorkStateInfo {
  label: string;
  color: WorkStateColor;
}

const STATE_MAP: Record<number, WorkStateInfo> = {
  0x0000: { label: 'Running',          color: 'green'  },
  0x8000: { label: 'Stop',             color: 'gray'   },
  0x1400: { label: 'Standby',          color: 'orange' },
  0x1200: { label: 'Initial Standby',  color: 'orange' },
  0x1600: { label: 'Startup',          color: 'orange' },
  0x5500: { label: 'Fault',            color: 'red'    },
  0x9100: { label: 'Alarm',            color: 'orange' },
  0x8100: { label: 'Derating',         color: 'orange' },
  0x8200: { label: 'Dispatch',         color: 'orange' },
};

export function decodeWorkState(value: number | undefined): WorkStateInfo {
  if (value === undefined || value === null) return { label: 'Unknown', color: 'gray' };
  const hex = Math.round(value);
  return (
    STATE_MAP[hex] ?? { label: `0x${hex.toString(16).toUpperCase().padStart(4, '0')}`, color: 'gray' }
  );
}

export const COLOR_MAP: Record<WorkStateColor, string> = {
  green:  'bg-accent-green/20 text-accent-green border-accent-green/30',
  orange: 'bg-accent-orange/20 text-accent-orange border-accent-orange/30',
  red:    'bg-accent-red/20 text-accent-red border-accent-red/30',
  gray:   'bg-white/10 text-text-secondary border-border',
};
