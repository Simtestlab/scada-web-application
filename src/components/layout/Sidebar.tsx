'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

interface Props {
  devices: string[];
}

export default function Sidebar({ devices }: Props) {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-56 shrink-0 bg-surface-variant border-r border-border min-h-screen">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 px-5 py-4 border-b border-border hover:bg-card transition-colors">
        <div className="w-7 h-7 rounded-lg bg-accent-blue/20 flex items-center justify-center shrink-0">
          <svg viewBox="0 0 16 16" className="w-4 h-4 fill-accent-blue">
            <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1Zm0 2a5 5 0 1 1 0 10A5 5 0 0 1 8 3Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
          </svg>
        </div>
      </Link>

      {/* Dashboard link */}
      <div className="px-3 pt-4 pb-2">
        <Link
          href="/"
          className={clsx(
            'flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors w-full',
            pathname === '/'
              ? 'bg-accent-blue/10 text-accent-blue font-medium'
              : 'text-text-secondary hover:text-text-primary hover:bg-card',
          )}
        >
          <svg viewBox="0 0 16 16" className="w-4 h-4 fill-current shrink-0">
            <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3Zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3Zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3Zm8 0A1.5 1.5 0 0 1 10.5 9h3A1.5 1.5 0 0 1 15 10.5v3A1.5 1.5 0 0 1 13.5 15h-3A1.5 1.5 0 0 1 9 13.5v-3Z" />
          </svg>
          Overview
        </Link>
      </div>

      {/* Device list */}
      {devices.length > 0 && (
        <div className="px-3 pb-4">
          <p className="px-3 text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">
            Inverters
          </p>
          <nav className="space-y-0.5">
            {devices.map((id) => {
              const active = pathname === `/device/${id}`;
              return (
                <Link
                  key={id}
                  href={`/device/${id}`}
                  className={clsx(
                    'flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors w-full',
                    active
                      ? 'bg-accent-blue/10 text-accent-blue font-medium'
                      : 'text-text-secondary hover:text-text-primary hover:bg-card',
                  )}
                >
                  <span
                    className={clsx(
                      'w-1.5 h-1.5 rounded-full shrink-0',
                      active ? 'bg-accent-blue' : 'bg-text-secondary',
                    )}
                  />
                  <span className="font-mono text-xs">{id}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </aside>
  );
}
