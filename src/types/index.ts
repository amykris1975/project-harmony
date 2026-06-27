export interface TelemetryNode {
  id: string;
  status: 'online' | 'alert' | 'offline';
  type: string;
  signal: number;
  lat: number;
  lng: number;
  lastReading?: SensorReading;
}

export interface SensorReading {
  timestamp: string;
  soilMoisture: number;
  temperature: number;
  humidity: number;
  ph: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
}

export interface Alert {
  id: string;
  nodeId: string;
  severity: 'critical' | 'warning' | 'info';
  message: string;
  timestamp: string;
  acknowledged: boolean;
}

export interface MapViewport {
  center: [number, number];
  zoom: number;
}

export type UserRole = 'admin' | 'operator' | 'viewer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}
