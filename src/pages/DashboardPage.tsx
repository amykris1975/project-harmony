import React, { useState } from 'react';
import { useOutletContext } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, Minimize2, Crosshair, Layers } from 'lucide-react';
import LeafletMap from '@/components/Map/LeafletMap';
import { useTelemetry } from '@/hooks/useTelemetry';

const DashboardPage: React.FC = () => {
  const telemetry = useOutletContext<ReturnType<typeof useTelemetry>>();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showLayerPanel, setShowLayerPanel] = useState(false);

  const { filteredNodes, selectedNodeId, setSelectedNodeId } = telemetry;

  return (
    <div className="relative w-full h-full flex">
      <div className="flex-1 relative">
        <LeafletMap
          nodes={filteredNodes}
          selectedNodeId={selectedNodeId}
          onSelectNode={setSelectedNodeId}
        />

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-silage-gray/90 backdrop-blur-md border border-dormant-husk/20 rounded-lg px-3 py-2 z-[1000]"
        >
          <button
            onClick={() => setSelectedNodeId(null)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono text-dormant-husk hover:text-bleached-flax hover:bg-dormant-husk/10 transition-colors"
          >
            <Crosshair size={14} />
            Reset View
          </button>
          <div className="w-px h-4 bg-dormant-husk/20" />
          <button
            onClick={() => setShowLayerPanel(!showLayerPanel)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono transition-colors ${
              showLayerPanel ? 'text-neon-sprout bg-neon-sprout/10' : 'text-dormant-husk hover:text-bleached-flax hover:bg-dormant-husk/10'
            }`}
          >
            <Layers size={14} />
            Layers
          </button>
          <div className="w-px h-4 bg-dormant-husk/20" />
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono text-dormant-husk hover:text-bleached-flax hover:bg-dormant-husk/10 transition-colors"
          >
            {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            {isFullscreen ? 'Exit' : 'Expand'}
          </button>
        </motion.div>

        <div className="absolute bottom-6 left-6 bg-silage-gray/90 backdrop-blur-md border border-dormant-husk/20 rounded-lg px-4 py-3 z-[1000]">
          <div className="text-xs font-mono uppercase tracking-wider text-dormant-husk mb-2">Node Status</div>
          <div className="space-y-1.5">
            {[
              { color: '#4AF626', label: 'Online' },
              { color: '#E6A15C', label: 'Alert' },
              { color: '#EF4444', label: 'Offline' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: item.color, boxShadow: `0 0 6px ${item.color}40` }} />
                <span className="text-xs text-bleached-flax">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showLayerPanel && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 240, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="bg-silage-gray border-l border-dormant-husk/20 overflow-hidden z-[1000]"
          >
            <div className="w-60 p-4 space-y-6">
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-dormant-husk mb-3">Map Layers</h3>
                <div className="space-y-2">
                  {[
                    { label: 'Satellite', active: false },
                    { label: 'Topography', active: false },
                    { label: 'Soil Zones', active: true },
                    { label: 'Irrigation Grid', active: true },
                    { label: 'Weather Overlay', active: false },
                  ].map((layer) => (
                    <button
                      key={layer.label}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all ${
                        layer.active
                          ? 'bg-neon-sprout/10 text-neon-sprout border border-neon-sprout/20'
                          : 'text-dormant-husk hover:text-bleached-flax hover:bg-dormant-husk/10'
                      }`}
                    >
                      {layer.label}
                      {layer.active && <div className="w-2 h-2 rounded-full bg-neon-sprout" />}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-dormant-husk mb-3">Sector View</h3>
                <div className="space-y-1.5">
                  {['North Field', 'South Pasture', 'East Ridge', 'West Bottom'].map((sector) => (
                    <button
                      key={sector}
                      className="w-full text-left px-3 py-2 rounded-lg text-sm text-dormant-husk hover:text-bleached-flax hover:bg-dormant-husk/10 transition-colors"
                    >
                      {sector}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashboardPage;
