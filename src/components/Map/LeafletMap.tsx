import React, { useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { motion, AnimatePresence } from 'framer-motion';
import { Thermometer, Droplets, Activity, Signal, Navigation, X } from 'lucide-react';
import type { TelemetryNode } from '@/types';

import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

interface LeafletMapProps {
  nodes: TelemetryNode[];
  selectedNodeId: string | null;
  onSelectNode: (id: string | null) => void;
}

const createCustomIcon = (status: TelemetryNode['status'], isSelected: boolean) => {
  const colors = {
    online: '#4AF626',
    alert: '#E6A15C',
    offline: '#EF4444',
  };
  const color = colors[status];
  const size = isSelected ? 32 : 24;
  const pulseSize = isSelected ? 48 : 36;

  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="position: relative; width: ${pulseSize}px; height: ${pulseSize}px; display: flex; align-items: center; justify-content: center;">
        <div style="
          position: absolute;
          width: ${pulseSize}px;
          height: ${pulseSize}px;
          border-radius: 50%;
          background: ${color}20;
          border: 2px solid ${color}40;
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        "></div>
        <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="${color}" fill-opacity="0.2" stroke="${color}" stroke-width="2"/>
          <circle cx="12" cy="12" r="4" fill="${color}"/>
        </svg>
      </div>
    `,
    iconSize: [pulseSize, pulseSize],
    iconAnchor: [pulseSize / 2, pulseSize / 2],
    popupAnchor: [0, -pulseSize / 2],
  });
};

const MapController: React.FC<{ selectedNode: TelemetryNode | null }> = ({ selectedNode }) => {
  const map = useMap();

  useEffect(() => {
    if (selectedNode) {
      map.flyTo([selectedNode.lat, selectedNode.lng], 16, {
        duration: 0.8,
        easeLinearity: 0.25,
      });
    }
  }, [selectedNode, map]);

  return null;
};

const NodePopup: React.FC<{
  node: TelemetryNode;
  onSelect: (id: string | null) => void;
}> = ({ node, onSelect }) => {
  const readings = useMemo(() => ({
    soilMoisture: 45 + Math.random() * 30,
    temperature: 18 + Math.random() * 12,
    humidity: 55 + Math.random() * 25,
    ph: 6.0 + Math.random() * 1.5,
  }), [node.id]);

  return (
    <div className="min-w-[220px] p-1">
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="font-mono text-sm font-bold text-bleached-flax">{node.id}</div>
          <div className="text-xs text-dormant-husk">{node.type}</div>
        </div>
        <span className={`status-pill status-pill--${node.status}`}>
          {node.status.toUpperCase()}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="flex items-center gap-1.5 text-xs">
          <Droplets size={12} className="text-barley-gold" />
          <span className="text-dormant-husk">Moisture:</span>
          <span className="font-mono text-bleached-flax">{readings.soilMoisture.toFixed(1)}%</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs">
          <Thermometer size={12} className="text-blight-red" />
          <span className="text-dormant-husk">Temp:</span>
          <span className="font-mono text-bleached-flax">{readings.temperature.toFixed(1)}°C</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs">
          <Activity size={12} className="text-neon-sprout" />
          <span className="text-dormant-husk">Humidity:</span>
          <span className="font-mono text-bleached-flax">{readings.humidity.toFixed(0)}%</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs">
          <Signal size={12} className="text-neon-sprout" />
          <span className="text-dormant-husk">Signal:</span>
          <span className="font-mono text-bleached-flax">{Math.round(node.signal)}%</span>
        </div>
      </div>

      <button
        onClick={() => onSelect(node.id)}
        className="w-full flex items-center justify-center gap-1.5 px-3 py-1.5 bg-neon-sprout/10 border border-neon-sprout/20 rounded text-xs font-mono text-neon-sprout hover:bg-neon-sprout/20 transition-colors"
      >
        <Navigation size={12} />
        FOCUS NODE
      </button>
    </div>
  );
};

const LeafletMap: React.FC<LeafletMapProps> = ({ nodes, selectedNodeId, onSelectNode }) => {
  const selectedNode = nodes.find((n) => n.id === selectedNodeId) || null;

  return (
    <div className="relative w-full h-full">
      <MapContainer
        center={[35.6275, -86.3256]}
        zoom={15}
        className="w-full h-full"
        style={{ background: '#0C0F0A' }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        <div className="leaflet-control-container">
          <div className="leaflet-bottom leaflet-right" style={{ bottom: '80px', right: '16px' }}>
            <div className="leaflet-control-zoom leaflet-bar leaflet-control">
              <a className="leaflet-control-zoom-in" href="#" title="Zoom in" role="button" aria-label="Zoom in">+</a>
              <a className="leaflet-control-zoom-out" href="#" title="Zoom out" role="button" aria-label="Zoom out">−</a>
            </div>
          </div>
        </div>

        <MapController selectedNode={selectedNode} />

        {nodes.map((node) => (
          <Marker
            key={node.id}
            position={[node.lat, node.lng]}
            icon={createCustomIcon(node.status, node.id === selectedNodeId)}
            eventHandlers={{
              click: () => onSelectNode(node.id === selectedNodeId ? null : node.id),
            }}
          >
            <Popup className="custom-popup" closeButton={false}>
              <NodePopup node={node} onSelect={onSelectNode} />
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <AnimatePresence>
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-4 right-4 w-72 bg-silage-gray/95 backdrop-blur-md border border-dormant-husk/20 rounded-lg shadow-xl z-[1000] p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="font-mono text-sm font-bold text-bleached-flax">{selectedNode.id}</div>
                <div className="text-xs text-dormant-husk">{selectedNode.type}</div>
              </div>
              <button
                onClick={() => onSelectNode(null)}
                className="p-1 hover:bg-dormant-husk/10 rounded transition-colors"
              >
                <X size={16} className="text-dormant-husk" />
              </button>
            </div>

            <div className={`p-2 rounded mb-3 ${
              selectedNode.status === 'online' ? 'bg-neon-sprout/5' :
              selectedNode.status === 'alert' ? 'bg-barley-gold/5' : 'bg-blight-red/5'
            }`}>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  selectedNode.status === 'online' ? 'bg-neon-sprout animate-pulse' :
                  selectedNode.status === 'alert' ? 'bg-barley-gold' : 'bg-blight-red'
                }`} />
                <span className="text-xs font-mono uppercase">{selectedNode.status}</span>
                <span className="text-xs text-dormant-husk ml-auto">{Math.round(selectedNode.signal)}% signal</span>
              </div>
            </div>

            <div className="space-y-2">
              {[
                { label: 'Soil Moisture', value: '64.2%', icon: Droplets, color: 'text-barley-gold' },
                { label: 'Temperature', value: '23.4°C', icon: Thermometer, color: 'text-blight-red' },
                { label: 'Humidity', value: '71%', icon: Activity, color: 'text-neon-sprout' },
                { label: 'pH Level', value: '6.8', icon: Signal, color: 'text-bleached-flax' },
              ].map((reading) => (
                <div key={reading.label} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-dormant-husk">
                    <reading.icon size={12} className={reading.color} />
                    {reading.label}
                  </div>
                  <span className="font-mono text-bleached-flax">{reading.value}</span>
                </div>
              ))}
            </div>

            <div className="mt-3 pt-3 border-t border-dormant-husk/10">
              <div className="text-xs font-mono text-dormant-husk">
                {selectedNode.lat.toFixed(4)}°N, {selectedNode.lng.toFixed(4)}°W
              </div>
              <div className="text-xs text-dormant-husk mt-1">Last update: 2s ago</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LeafletMap;
