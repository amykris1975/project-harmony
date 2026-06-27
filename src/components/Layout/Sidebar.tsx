import React from 'react';
import { SidebarMotion, StaggerContainer, StaggerItem } from './animations';
import {
  Filter,
  Activity,
  AlertTriangle,
  Radio,
  Thermometer,
  Droplets,
  Camera,
  CheckCircle,
} from 'lucide-react';
import { useTelemetry } from '@/hooks/useTelemetry';

interface SidebarProps {
  telemetry: ReturnType<typeof useTelemetry>;
}

const Sidebar: React.FC<SidebarProps> = ({ telemetry }) => {
  const { filteredNodes, alerts, selectedNodeId, setSelectedNodeId, filterType, setFilterType, acknowledgeAlert, stats } = telemetry;

  const filters = [
    { label: 'All Nodes', icon: Radio, value: 'all' },
    { label: 'Soil Sensors', icon: Droplets, value: 'soil' },
    { label: 'Weather Stations', icon: Thermometer, value: 'weather' },
    { label: 'Camera Traps', icon: Camera, value: 'camera' },
  ];

  const activeAlerts = alerts.filter((a) => !a.acknowledged);

  return (
    <SidebarMotion>
      <StaggerContainer className="flex flex-col h-full p-4 gap-5 overflow-y-auto">
        <StaggerItem>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-deep-loam/50 rounded-lg p-3 border border-dormant-husk/10">
              <div className="text-2xl font-mono font-bold text-neon-sprout">{stats.online}</div>
              <div className="text-xs text-dormant-husk uppercase tracking-wider">Online</div>
            </div>
            <div className="bg-deep-loam/50 rounded-lg p-3 border border-dormant-husk/10">
              <div className="text-2xl font-mono font-bold text-barley-gold">{stats.alert}</div>
              <div className="text-xs text-dormant-husk uppercase tracking-wider">Alert</div>
            </div>
            <div className="bg-deep-loam/50 rounded-lg p-3 border border-dormant-husk/10">
              <div className="text-2xl font-mono font-bold text-blight-red">{stats.offline}</div>
              <div className="text-xs text-dormant-husk uppercase tracking-wider">Offline</div>
            </div>
            <div className="bg-deep-loam/50 rounded-lg p-3 border border-dormant-husk/10">
              <div className="text-2xl font-mono font-bold text-bleached-flax">{stats.total}</div>
              <div className="text-xs text-dormant-husk uppercase tracking-wider">Total</div>
            </div>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-dormant-husk flex items-center gap-2">
              <Filter size={14} />
              Telemetry Filters
            </h3>
            <div className="space-y-1">
              {filters.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setFilterType(filter.value)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
                    filterType === filter.value
                      ? 'bg-neon-sprout/10 text-neon-sprout border border-neon-sprout/20'
                      : 'text-dormant-husk hover:text-bleached-flax hover:bg-dormant-husk/10'
                  }`}
                >
                  <filter.icon size={16} />
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-dormant-husk flex items-center gap-2">
              <Activity size={14} />
              Node Health ({stats.total} Nodes)
            </h3>
            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {filteredNodes.map((node) => (
                <button
                  key={node.id}
                  onClick={() => setSelectedNodeId(node.id === selectedNodeId ? null : node.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all text-left ${
                    selectedNodeId === node.id
                      ? 'bg-neon-sprout/5 border-neon-sprout/30'
                      : 'bg-deep-loam/50 border-dormant-husk/10 hover:border-dormant-husk/30'
                  }`}
                >
                  <div className="space-y-1 min-w-0">
                    <div className="font-mono text-data-mono text-bleached-flax truncate">{node.id}</div>
                    <div className="text-xs text-dormant-husk">{node.type}</div>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0 ml-2">
                    <span className={`status-pill status-pill--${node.status}`}>
                      {node.status.toUpperCase()}
                    </span>
                    {node.signal > 0 && (
                      <span className="text-xs font-mono text-dormant-husk">{Math.round(node.signal)}% SIG</span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </StaggerItem>

        {activeAlerts.length > 0 && (
          <StaggerItem>
            <div className="space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-dormant-husk flex items-center gap-2">
                <AlertTriangle size={14} />
                Active Alerts ({activeAlerts.length})
              </h3>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {activeAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="p-3 rounded-lg bg-blight-red/5 border border-blight-red/20"
                  >
                    <div className="flex items-start gap-2">
                      <AlertTriangle size={16} className="text-blight-red shrink-0 mt-0.5" />
                      <div className="min-w-0 flex-1">
                        <div className="text-sm text-bleached-flax font-medium">{alert.severity.toUpperCase()}</div>
                        <div className="text-xs text-dormant-husk mt-1 leading-relaxed">{alert.message}</div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs font-mono text-blight-red">
                            {new Date(alert.timestamp).toLocaleTimeString()} UTC
                          </span>
                          <button
                            onClick={() => acknowledgeAlert(alert.id)}
                            className="flex items-center gap-1 text-xs text-neon-sprout hover:text-neon-sprout/80 transition-colors"
                          >
                            <CheckCircle size={12} />
                            ACK
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </StaggerItem>
        )}
      </StaggerContainer>
    </SidebarMotion>
  );
};

export default Sidebar;
