import React, { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Outlet, useLocation } from 'react-router';
import Header from './Header';
import Sidebar from './Sidebar';
import StatusBar from './StatusBar';
import { ViewTransition } from './animations';
import { useTelemetry } from '@/hooks/useTelemetry';

const AppShell: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const telemetry = useTelemetry();

  const toggleSidebar = useCallback(() => setSidebarOpen((prev) => !prev), []);

  return (
    <div className="h-screen w-screen flex flex-col bg-deep-loam overflow-hidden">
      <Header onMenuToggle={toggleSidebar} sidebarOpen={sidebarOpen} isAdmin={true} />

      <div className="flex flex-1 overflow-hidden relative">
        <AnimatePresence mode="wait">
          {sidebarOpen && <Sidebar telemetry={telemetry} />}
        </AnimatePresence>

        <main className="flex-1 relative overflow-hidden">
          <ViewTransition nodeKey={location.pathname}>
            <Outlet context={telemetry} />
          </ViewTransition>
        </main>
      </div>

      <StatusBar nodeCount={telemetry.stats.total} />
    </div>
  );
};

export default AppShell;
