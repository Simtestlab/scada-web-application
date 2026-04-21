import { create } from 'zustand';
import type { TelemetryFrame, LiveDataPoint } from '@/types/telemetry';

const MAX_LIVE_POINTS = 60;

interface ScadaStore {
  devices: string[];
  latestTelemetry: Record<string, TelemetryFrame>;
  liveHistory: Record<string, LiveDataPoint[]>;
  setDevices: (devices: string[]) => void;
  updateTelemetry: (frame: TelemetryFrame) => void;
}

export const useScadaStore = create<ScadaStore>((set) => ({
  devices: [],
  latestTelemetry: {},
  liveHistory: {},

  setDevices: (devices) => set({ devices }),

  updateTelemetry: (frame) =>
    set((state) => {
      const id = frame.device_id;
      const ts = frame.timestamp ?? frame.time ?? new Date().toISOString();
      const m = frame.metrics;

      const point: LiveDataPoint = {
        ts,
        activePower: (m.total_active_power ?? 0) / 1000,
        dcPower: (m.total_dc_power ?? 0) / 1000,
      };

      const prev = state.liveHistory[id] ?? [];
      const next = [...prev, point].slice(-MAX_LIVE_POINTS);

      return {
        latestTelemetry: { ...state.latestTelemetry, [id]: frame },
        liveHistory: { ...state.liveHistory, [id]: next },
      };
    }),
}));
