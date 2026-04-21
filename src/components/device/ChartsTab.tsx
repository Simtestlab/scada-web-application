'use client';

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from 'recharts';
import type { LiveDataPoint } from '@/types/telemetry';
import { fmtTime } from '@/lib/utils';

interface Props {
  history: LiveDataPoint[];
}

function LiveChart({
  data,
  dataKey,
  color,
  label,
  unit,
}: {
  data: LiveDataPoint[];
  dataKey: keyof LiveDataPoint;
  color: string;
  label: string;
  unit: string;
}) {
  const formatted = data.map((p) => ({
    ...p,
    time: fmtTime(p.ts),
  }));

  return (
    <div className="bg-card rounded-xl border border-border p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-text-primary">{label}</h3>
        <span className="text-xs text-text-secondary">{data.length} pts · live</span>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={formatted} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#30363D" />
          <XAxis
            dataKey="time"
            tick={{ fill: '#8B949E', fontSize: 11 }}
            tickLine={false}
            interval="preserveStartEnd"
          />
          <YAxis
            tick={{ fill: '#8B949E', fontSize: 11, fontFamily: 'JetBrains Mono' }}
            tickLine={false}
            axisLine={false}
            width={48}
            tickFormatter={(v: number) => v.toFixed(1)}
          />
          <Tooltip
            contentStyle={{ background: '#1C2333', border: '1px solid #30363D', borderRadius: 8 }}
            labelStyle={{ color: '#8B949E', fontSize: 11 }}
            itemStyle={{ color: color, fontFamily: 'JetBrains Mono', fontSize: 13 }}
            formatter={(v: number) => [`${v.toFixed(2)} ${unit}`, label]}
          />
          <ReferenceLine y={0} stroke="#30363D" />
          <Line
            type="monotone"
            dataKey={dataKey as string}
            stroke={color}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: color }}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default function ChartsTab({ history }: Props) {
  if (history.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-text-secondary text-sm">
        Waiting for live data…
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <LiveChart data={history} dataKey="activePower" color="#58A6FF" label="AC Active Power" unit="kW" />
      <LiveChart data={history} dataKey="dcPower"     color="#39D2C0" label="DC Power"        unit="kW" />
    </div>
  );
}
