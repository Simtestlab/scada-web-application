'use client';

import { useEffect } from 'react';
import AppShell from '@/components/layout/AppShell';
import DeviceStatusCard from '@/components/common/DeviceStatusCard';
import FleetSummaryBar from '@/components/common/FleetSummaryBar';
import { useDevices } from '@/hooks/useDevices';
import { useWebSocket } from '@/hooks/useWebSocket';
import { useScadaStore } from '@/store/deviceStore';

/** Subscribe to a single device's WebSocket */
function DeviceWatcher({ deviceId }: { deviceId: string }) {
  useWebSocket(deviceId);
  return null;
}

export default function CommonDashboard() {
  const devices = useDevices();
  const latestTelemetry = useScadaStore((s) => s.latestTelemetry);

  return (
    <AppShell devices={devices}>
      {/* Subscribe to all devices */}
      {devices.map((id) => (
        <DeviceWatcher key={id} deviceId={id} />
      ))}

      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Page header */}
        <div>
          <h1 className="text-xl font-semibold text-text-primary">Overview</h1>
          <p className="text-sm text-text-secondary mt-1">Consolidated view of all inverters — live data</p>
        </div>

        {/* Fleet summary stats */}
        {devices.length > 0 && (
          <FleetSummaryBar devices={devices} telemetry={latestTelemetry} />
        )}

        {/* Device cards grid */}
        {devices.length === 0 ? (
          <div className="flex items-center justify-center h-40 text-text-secondary text-sm">
            Loading devices…
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {devices.map((id) => (
              <DeviceStatusCard key={id} deviceId={id} frame={latestTelemetry[id] ?? null} />
            ))}
          </div>
        )}

        {/* (Hourly historical charts removed) */}
      </div>
    </AppShell>
  );
}
