import clsx from 'clsx';

interface MetricCardProps {
  label: string;
  value: string;
  unit?: string;
  accent?: 'blue' | 'green' | 'orange' | 'red' | 'purple' | 'cyan' | 'pink';
  subValue?: string;
  className?: string;
}

const ACCENT_VALUE: Record<string, string> = {
  blue:   'text-accent-blue',
  green:  'text-accent-green',
  orange: 'text-accent-orange',
  red:    'text-accent-red',
  purple: 'text-accent-purple',
  cyan:   'text-accent-cyan',
  pink:   'text-accent-pink',
};

const ACCENT_BORDER: Record<string, string> = {
  blue:   'border-accent-blue/20',
  green:  'border-accent-green/20',
  orange: 'border-accent-orange/20',
  red:    'border-accent-red/20',
  purple: 'border-accent-purple/20',
  cyan:   'border-accent-cyan/20',
  pink:   'border-accent-pink/20',
};

export default function MetricCard({ label, value, unit, accent = 'blue', subValue, className }: MetricCardProps) {
  return (
    <div
      className={clsx(
        'bg-card rounded-xl border p-4 flex flex-col gap-1',
        ACCENT_BORDER[accent],
        className,
      )}
    >
      <span className="text-xs font-medium text-text-secondary uppercase tracking-wider">{label}</span>
      <div className="flex items-baseline gap-1 mt-1">
        <span className={clsx('font-mono text-2xl font-semibold', ACCENT_VALUE[accent])}>{value}</span>
        {unit && <span className="text-sm text-text-secondary">{unit}</span>}
      </div>
      {subValue && <span className="text-xs text-text-secondary mt-0.5">{subValue}</span>}
    </div>
  );
}
