'use client';

import Link from 'next/link';
import StatusBadge from '@/components/ui/StatusBadge';
import type { TelemetryFrame } from '@/types/telemetry';
import { fmtKw, fmt } from '@/lib/utils';

interface Props {
  deviceId: string;
  frame: TelemetryFrame | null;
}

export default function DeviceStatusCard({ deviceId, frame }: Props) {
  const m = frame?.metrics ?? {};
  const ts = frame?.timestamp ?? frame?.time;

  return (
    <Link href={`/device/${deviceId}`}>
      <div className="bg-card rounded-xl border border-border hover:border-accent-blue/40 transition-colors p-5 cursor-pointer h-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono text-sm font-semibold text-text-primary">{deviceId}</span>
          <StatusBadge workState={m.work_state} size="sm" />
        </div>

        {/* Metrics grid */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-xs text-text-secondary">Active Power</div>
            <div className="font-mono text-lg font-semibold text-accent-blue mt-0.5">
              {fmtKw(m.total_active_power)}{' '}
              <span className="text-xs font-normal text-text-secondary">kW</span>
            </div>
          </div>
          <div>
            <div className="text-xs text-text-secondary">Daily Energy</div>
            <div className="font-mono text-lg font-semibold text-accent-green mt-0.5">
              {fmt(m.daily_energy, 2)}{' '}
              <span className="text-xs font-normal text-text-secondary">kWh</span>
            </div>
          </div>
          <div>
            <div className="text-xs text-text-secondary">DC Power</div>
            <div className="font-mono text-base font-medium text-accent-cyan mt-0.5">
              {fmtKw(m.total_dc_power)}{' '}
              <span className="text-xs font-normal text-text-secondary">kW</span>
            </div>
          </div>
          <div>
            <div className="text-xs text-text-secondary">Temperature</div>
            <div className="font-mono text-base font-medium text-accent-orange mt-0.5">
              {fmt(m.internal_temp, 1)}{' '}
              <span className="text-xs font-normal text-text-secondary">°C</span>
            </div>
          </div>
        </div>

        {/* Timestamp */}
        {ts && (
          <div className="mt-3 pt-3 border-t border-border text-xs text-text-secondary">
            Last update:{' '}
            {new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </div>
        )}
        {!frame && (
          <div className="mt-3 pt-3 border-t border-border text-xs text-text-secondary">
            Waiting for data…
          </div>
        )}
      </div>
    </Link>
  );
}
