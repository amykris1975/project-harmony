import React, { useState, useEffect } from 'react';
import { Wifi, Server, Radio, RefreshCw, AlertTriangle, Disc } from 'lucide-react';

interface StatusBarProps {
  nodeCount?: number;
}

const StatusBar: React.FC<StatusBarProps> = ({ nodeCount = 142 }) => {
  const [time, setTime] = useState<string>(new Date().toISOString());
  const [syncing, setSyncing] = useState<boolean>(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toISOString());
    }, 1000);

    const syncInterval = setInterval(() => {
      setSyncing(true);
      setTimeout(() => setSyncing(false), 800);
    }, 10000);

    return () => {
      clearInterval(timer);
      clearInterval(syncInterval);
    };
  }, []);

  return (
    <footer className="h-10 bg-deep-loam border-t border-dormant-husk/20 flex items-center justify-between px-6 shrink-0 z-30 select-none">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Wifi size={14} className="text-neon-sprout" />
          <span className="text-xs font-mono text-neon-sprout uppercase tracking-wider hidden sm:inline">A2A Base Connected</span>
        </div>
        <div className="flex items-center gap-2">
          <Disc size={13} className={syncing ? 'animate-spin text-barley-gold' : 'text-dormant-husk'} />
          <span className="text-xs font-mono text-bleached-flax/70 hidden md:inline">HITL Comms Uplink:</span>
          <span className="text-xs font-mono text-dormant-husk">12.4 kb/s</span>
        </div>
        <div className="flex items-center gap-2">
          <Server size={14} className="text-dormant-husk" />
          <span className="text-xs font-mono text-dormant-husk">v2.4.1-stable</span>
        </div>
      </div>

      <div className="hidden lg:flex items-center gap-2 text-barley-gold bg-barley-gold/5 px-3 py-0.5 rounded border border-barley-gold/10 animate-pulse">
        <AlertTriangle size={12} />
        <span className="text-xs font-mono uppercase tracking-wider">NODE-04 LOAM SATURATION LIMIT EDGE CASE DETECTED</span>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Radio size={14} className="text-neon-sprout" />
          <span className="text-xs font-mono text-bleached-flax">{nodeCount} NODES ACTIVE</span>
        </div>
        <div className="flex items-center gap-2">
          <RefreshCw size={14} className={syncing ? 'animate-spin text-barley-gold' : 'text-barley-gold'} />
          <span className="text-xs font-mono text-barley-gold">SYNC 100%</span>
        </div>
        <div className="flex items-center gap-2">
          <RefreshCw size={11} className={`${syncing ? 'animate-spin' : ''} text-dormant-husk hidden sm:block`} />
          <span className="text-xs font-mono text-bleached-flax tracking-wider">
            {time.replace('T', ' ').substring(0, 19)} UTC
          </span>
        </div>
        <div className="text-xs font-mono text-dormant-husk hidden xl:block">
          35.6275°N, 86.3256°W • Middle Tennessee
        </div>
      </div>
    </footer>
  );
};

export default StatusBar;
