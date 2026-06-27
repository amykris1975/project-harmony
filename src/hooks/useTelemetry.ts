import { useState, useEffect, useCallback } from 'react';
import type { TelemetryNode, Alert } from '@/types';

const MOCK_NODES: TelemetryNode[] = [
  { id: 'ND-184-BR-01', status: 'online', type: 'Soil Monitor', signal: 98, lat: 35.6275, lng: -86.3256 },
  { id: 'ND-184-BR-02', status: 'alert', type: 'Weather Station', signal: 67, lat: 35.6285, lng: -86.3246 },
  { id: 'ND-184-BR-03', status: 'offline', type: 'Irrigation Valve', signal: 0, lat: 35.6265, lng: -86.3266 },
  { id: 'ND-184-BR-04', status: 'online', type: 'Soil Monitor', signal: 94, lat: 35.6295, lng: -86.3236 },
  { id: 'ND-184-BR-05', status: 'online', type: 'Camera Trap', signal: 91, lat: 35.6255, lng: -86.3276 },
  { id: 'ND-184-BR-06', status: 'online', type: 'Soil Monitor', signal: 96, lat: 35.6305, lng: -86.3226 },
  { id: 'ND-184-BR-07', status: 'alert', type: 'Weather Station', signal: 72, lat: 35.6245, lng: -86.3286 },
  { id: 'ND-184-BR-08', status: 'online', type: 'Camera Trap', signal: 89, lat: 35.6315, lng: -86.3216 },
];

const MOCK_ALERTS: Alert[] = [
  {
    id: 'ALERT-001',
    nodeId: 'ND-184-BR-03',
    severity: 'critical',
    message: 'Node Offline — ND-184-BR-03 (Irrigation Valve) unresponsive for 14 minutes. Last known: Sector 7, Buncombe Road North.',
    timestamp: '2026-06-27T23:19:00Z',
    acknowledged: false,
  },
  {
    id: 'ALERT-002',
    nodeId: 'ND-184-BR-02',
    severity: 'warning',
    message: 'Signal degraded — Weather Station at 67% strength. Recommend antenna inspection.',
    timestamp: '2026-06-27T22:45:00Z',
    acknowledged: false,
  },
  {
    id: 'ALERT-003',
    nodeId: 'ND-184-BR-07',
    severity: 'warning',
    message: 'Loam saturation approaching threshold — Sector 3 drainage may be required.',
    timestamp: '2026-06-27T21:30:00Z',
    acknowledged: true,
  },
];

export function useTelemetry() {
  const [nodes, setNodes] = useState<TelemetryNode[]>(MOCK_NODES);
  const [alerts, setAlerts] = useState<Alert[]>(MOCK_ALERTS);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<string>('all');

  useEffect(() => {
    const interval = setInterval(() => {
      setNodes(prev =>
        prev.map(node =>
          node.status === 'online'
            ? { ...node, signal: Math.min(100, Math.max(85, node.signal + (Math.random() - 0.5) * 4)) }
            : node
        )
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const selectedNode = nodes.find(n => n.id === selectedNodeId) || null;

  const filteredNodes = filterType === 'all'
    ? nodes
    : nodes.filter(n => n.type.toLowerCase().includes(filterType.toLowerCase()));

  const acknowledgeAlert = useCallback((alertId: string) => {
    setAlerts(prev =>
      prev.map(a => (a.id === alertId ? { ...a, acknowledged: true } : a))
    );
  }, []);

  const stats = {
    total: nodes.length,
    online: nodes.filter(n => n.status === 'online').length,
    alert: nodes.filter(n => n.status === 'alert').length,
    offline: nodes.filter(n => n.status === 'offline').length,
    activeAlerts: alerts.filter(a => !a.acknowledged).length,
  };

  return {
    nodes,
    filteredNodes,
    alerts,
    selectedNode,
    selectedNodeId,
    setSelectedNodeId,
    filterType,
    setFilterType,
    acknowledgeAlert,
    stats,
  };
}
