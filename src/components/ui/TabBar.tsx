import clsx from 'clsx';

interface Tab {
  id: string;
  label: string;
}

interface TabBarProps {
  tabs: Tab[];
  active: string;
  onChange: (id: string) => void;
}

export default function TabBar({ tabs, active, onChange }: TabBarProps) {
  return (
    <div className="flex overflow-x-auto gap-1 bg-surface-variant rounded-xl p-1 scrollbar-none">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={clsx(
            'px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors',
            tab.id === active
              ? 'bg-accent-blue text-surface font-semibold'
              : 'text-text-secondary hover:text-text-primary hover:bg-card',
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
