'use client';

import { useEffect, useRef } from 'react';
import { getWsUrl } from '@/lib/api';
import { useScadaStore } from '@/store/deviceStore';
import type { TelemetryFrame } from '@/types/telemetry';

const RECONNECT_MS = 3_000;

export function useWebSocket(deviceId: string | null) {
  const updateTelemetry = useScadaStore((s) => s.updateTelemetry);
  const wsRef = useRef<WebSocket | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeRef = useRef(true);

  useEffect(() => {
    if (!deviceId) return;
    activeRef.current = true;

    function connect() {
      if (!activeRef.current || !deviceId) return;
      const url = getWsUrl(deviceId);
      const ws = new WebSocket(url);
      wsRef.current = ws;

      ws.onmessage = (ev) => {
        try {
          const frame = JSON.parse(ev.data as string) as TelemetryFrame;
          updateTelemetry(frame);
        } catch {
          // ignore malformed frames
        }
      };

      ws.onclose = () => {
        if (activeRef.current) {
          timerRef.current = setTimeout(connect, RECONNECT_MS);
        }
      };

      ws.onerror = () => ws.close();
    }

    connect();

    return () => {
      activeRef.current = false;
      if (timerRef.current) clearTimeout(timerRef.current);
      wsRef.current?.close();
    };
  }, [deviceId, updateTelemetry]);
}
