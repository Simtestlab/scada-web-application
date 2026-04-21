'use client';

import { useEffect } from 'react';
import { fetchDevices } from '@/lib/api';
import { useScadaStore } from '@/store/deviceStore';

export function useDevices() {
  const { devices, setDevices } = useScadaStore();

  useEffect(() => {
    fetchDevices()
      .then(setDevices)
      .catch(console.error);
  }, [setDevices]);

  return devices;
}
