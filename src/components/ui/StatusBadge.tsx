import clsx from 'clsx';
import { decodeWorkState, COLOR_MAP } from '@/lib/workState';

interface StatusBadgeProps {
  workState: number | undefined;
  size?: 'sm' | 'md';
}

export default function StatusBadge({ workState, size = 'md' }: StatusBadgeProps) {
  const { label, color } = decodeWorkState(workState);
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 rounded-full border font-medium',
        COLOR_MAP[color],
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm',
      )}
    >
      <span
        className={clsx('rounded-full shrink-0', size === 'sm' ? 'w-1.5 h-1.5' : 'w-2 h-2', {
          'bg-accent-green': color === 'green',
          'bg-accent-orange': color === 'orange',
          'bg-accent-red': color === 'red',
          'bg-text-secondary': color === 'gray',
        })}
      />
      {label}
    </span>
  );
}
