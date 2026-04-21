'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import Sidebar from './Sidebar';
import Logo from '../../assests/logo.png';

interface Props {
  devices: string[];
  children: React.ReactNode;
}

export default function AppShell({ devices, children }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen">
      {/* Desktop sidebar */}
      <Sidebar devices={devices} />

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 w-64 bg-surface-variant border-r border-border z-50">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <span className="font-semibold text-sm text-text-primary">Dashboard</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="text-text-secondary hover:text-text-primary"
              >
                ✕
              </button>
            </div>
            <nav className="px-3 pt-4 space-y-0.5">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className={clsx(
                  'flex items-center gap-2 px-3 py-2 rounded-lg text-sm w-full',
                  pathname === '/' ? 'text-accent-blue font-medium' : 'text-text-secondary',
                )}
              >
                Overview
              </Link>
              <p className="px-3 pt-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">
                Inverters
              </p>
              {devices.map((id) => (
                <Link
                  key={id}
                  href={`/device/${id}`}
                  onClick={() => setMobileOpen(false)}
                  className={clsx(
                    'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-mono w-full',
                    pathname === `/device/${id}` ? 'text-accent-blue font-medium' : 'text-text-secondary',
                  )}
                >
                  {id}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile top bar */}
        <header className="md:hidden flex items-center gap-3 px-4 py-3 bg-surface-variant border-b border-border sticky top-0 z-30">
          <button
            onClick={() => setMobileOpen(true)}
            className="text-text-secondary hover:text-text-primary p-1"
          >
            <svg viewBox="0 0 16 16" className="w-5 h-5 fill-current">
              <path d="M1 2.5h14a.5.5 0 0 1 0 1H1a.5.5 0 0 1 0-1Zm0 5h14a.5.5 0 0 1 0 1H1a.5.5 0 0 1 0-1Zm0 5h14a.5.5 0 0 1 0 1H1a.5.5 0 0 1 0-1Z" />
            </svg>
          </button>
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg overflow-hidden">
              <Image src={Logo} alt="Adlixa logo" width={28} height={28} className="object-contain" />
            </div>
          </Link>
        </header>

        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
