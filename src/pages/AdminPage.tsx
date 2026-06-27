import React, { useState } from 'react';
import { Users, Settings, Database, Shield, ChevronRight } from 'lucide-react';
import { FadeIn } from '@/components/Layout/animations';

const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'users' | 'nodes' | 'system'>('users');

  const tabs = [
    { id: 'users' as const, label: 'User Management', icon: Users },
    { id: 'nodes' as const, label: 'Node Registry', icon: Database },
    { id: 'system' as const, label: 'System Config', icon: Settings },
  ];

  const mockUsers = [
    { id: 'USR-001', name: 'Alex Chen', role: 'admin', email: 'alex@aggrogeo.studio', lastActive: '2026-06-27 14:32' },
    { id: 'USR-002', name: 'Morgan Blake', role: 'operator', email: 'morgan@aggrogeo.studio', lastActive: '2026-06-27 12:15' },
    { id: 'USR-003', name: 'Jordan Lee', role: 'viewer', email: 'jordan@aggrogeo.studio', lastActive: '2026-06-26 09:45' },
  ];

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <div className="flex items-center gap-3 mb-6">
            <Shield className="text-neon-sprout" size={28} />
            <div>
              <h1 className="text-2xl font-bold text-bleached-flax">Admin Console</h1>
              <p className="text-sm text-dormant-husk">System administration and configuration</p>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="flex gap-2 mb-6 border-b border-dormant-husk/10 pb-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-neon-sprout/10 text-neon-sprout border border-neon-sprout/20'
                    : 'text-dormant-husk hover:text-bleached-flax hover:bg-dormant-husk/10'
                }`}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          {activeTab === 'users' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-bleached-flax">Registered Users</h2>
                <button className="px-4 py-2 bg-neon-sprout text-deep-loam rounded-lg text-sm font-medium hover:bg-neon-sprout/90 transition-colors">
                  + Add User
                </button>
              </div>
              <div className="bg-silage-gray rounded-lg border border-dormant-husk/10 overflow-hidden">
                <table className="w-full telemetry-table">
                  <thead>
                    <tr className="bg-deep-loam/50">
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Last Active</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-dormant-husk/5 transition-colors">
                        <td className="font-mono text-data-mono">{user.id}</td>
                        <td className="text-bleached-flax">{user.name}</td>
                        <td className="text-dormant-husk">{user.email}</td>
                        <td>
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-mono font-medium ${
                              user.role === 'admin'
                                ? 'bg-neon-sprout/10 text-neon-sprout border border-neon-sprout/20'
                                : user.role === 'operator'
                                ? 'bg-barley-gold/10 text-barley-gold border border-barley-gold/20'
                                : 'bg-dormant-husk/10 text-dormant-husk border border-dormant-husk/20'
                            }`}
                          >
                            {user.role.toUpperCase()}
                          </span>
                        </td>
                        <td className="text-dormant-husk font-mono text-xs">{user.lastActive}</td>
                        <td>
                          <button className="p-1 hover:bg-dormant-husk/10 rounded transition-colors">
                            <ChevronRight size={16} className="text-dormant-husk" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'nodes' && (
            <div className="text-center py-12 text-dormant-husk">
              <Database size={48} className="mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">Node Registry</p>
              <p className="text-sm mt-2">Full node CRUD operations coming in v2.5</p>
            </div>
          )}

          {activeTab === 'system' && (
            <div className="text-center py-12 text-dormant-husk">
              <Settings size={48} className="mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">System Configuration</p>
              <p className="text-sm mt-2">Telemetry intervals, alert thresholds, and API settings coming in v2.5</p>
            </div>
          )}
        </FadeIn>
      </div>
    </div>
  );
};

export default AdminPage;
