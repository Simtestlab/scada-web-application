export interface Metrics {
  total_active_power?: number;
  total_dc_power?: number;
  total_apparent_power?: number;
  daily_energy?: number;
  total_energy?: number;
  monthly_energy?: number;
  total_export?: number;
  internal_temp?: number;
  grid_frequency?: number;
  power_factor?: number;
  phase_a_voltage?: number;
  phase_b_voltage?: number;
  phase_c_voltage?: number;
  phase_a_current?: number;
  phase_b_current?: number;
  phase_c_current?: number;
  mppt1_voltage?: number;
  mppt1_current?: number;
  mppt2_voltage?: number;
  mppt2_current?: number;
  mppt1_power?: number;
  mppt2_power?: number;
  string_1_current?: number;
  string_2_current?: number;
  array_insulation_resistance?: number;
  daily_running_time?: number;
  total_running_time?: number;
  meter_power?: number;
  work_state?: number;
  fault_code?: number;
  pid_alarm_code?: number;
  nominal_active_power?: number;
  [key: string]: number | undefined;
}

export interface TelemetryFrame {
  device_id: string;
  /** WebSocket uses 'timestamp'; REST uses 'time' */
  timestamp?: string;
  time?: string;
  metrics: Metrics;
}

export interface LiveDataPoint {
  ts: string;
  activePower: number;
  dcPower: number;
}

export type TimePreset = '1H' | '6H' | '24H' | '7D';
