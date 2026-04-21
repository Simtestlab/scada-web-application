'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import AppShell from '@/components/layout/AppShell';
import TabBar from '@/components/ui/TabBar';
import StatusBadge from '@/components/ui/StatusBadge';
import OverviewTab from '@/components/device/OverviewTab';
import ChartsTab from '@/components/device/ChartsTab';
import EnergyTab from '@/components/device/EnergyTab';
import GridMpptTab from '@/components/device/GridMpptTab';
import FaultsTab from '@/components/device/FaultsTab';
import StringsTab from '@/components/device/StringsTab';
import { useWebSocket } from '@/hooks/useWebSocket';
import { useScadaStore } from '@/store/deviceStore';
import { useDevices } from '@/hooks/useDevices';

const TABS = [
  { id: 'overview', label: 'Overview'    },
  { id: 'charts',   label: 'Live Charts' },
  { id: 'energy',   label: 'Energy'      },
  { id: 'grid',     label: 'Grid & MPPT' },
  { id: 'faults',   label: 'Faults'      },
  { id: 'strings',  label: 'Strings'     },
];

export default function DevicePage() {
  const params = useParams();
  const deviceId = typeof params.deviceId === 'string' ? params.deviceId : '';
  const [activeTab, setActiveTab] = useState('overview');

  const devices = useDevices();
  useWebSocket(deviceId || null);

  const latestTelemetry = useScadaStore((s) => s.latestTelemetry);
  const liveHistory = useScadaStore((s) => s.liveHistory);

  const frame = latestTelemetry[deviceId] ?? null;
  const history = liveHistory[deviceId] ?? [];

  return (
    <AppShell devices={devices}>
      <div className="space-y-5 max-w-7xl mx-auto">
        {/* Page header */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-xl font-semibold font-mono text-text-primary">{deviceId}</h1>
            <p className="text-sm text-text-secondary mt-0.5">Real-time inverter monitoring</p>
          </div>
          <StatusBadge workState={frame?.metrics?.work_state} />
        </div>

        {/* Tab navigation */}
        <TabBar tabs={TABS} active={activeTab} onChange={setActiveTab} />

        {/* Tab content */}
        <div>
          {activeTab === 'overview' && <OverviewTab frame={frame} />}

          {activeTab === 'charts'  && <ChartsTab history={history} />}
          {activeTab === 'energy'  && <EnergyTab frame={frame} />}
          {activeTab === 'grid'    && <GridMpptTab frame={frame} />}
          {activeTab === 'faults'  && <FaultsTab frame={frame} />}
          {activeTab === 'strings' && <StringsTab frame={frame} />}
        </div>
      </div>
    </AppShell>
  );
}
