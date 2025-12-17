import { useState } from 'react';
import {
  LayoutDashboard,
  Database,
  AlertTriangle,
  BarChart3,
  Settings,
  Menu,
  X,
  User,
  RefreshCw,
} from 'lucide-react';
import { projectMetadata } from '../data/mockData';

const DashboardLayout = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: true },
    { icon: Database, label: 'Systems', active: false },
    { icon: AlertTriangle, label: 'Risks', active: false },
    { icon: BarChart3, label: 'Analytics', active: false },
    { icon: Settings, label: 'Settings', active: false },
  ];

  const lastUpdated = new Date(projectMetadata.lastUpdated).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="flex h-screen bg-slate-900">
      {/* Sidebar */}
      <aside
        className={`bg-slate-800 border-r border-slate-700 transition-all duration-300 flex-shrink-0 ${
          sidebarCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-700">
          {!sidebarCollapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Database className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-slate-100">S/4HANA</span>
            </div>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
          >
            {sidebarCollapsed ? (
              <Menu className="w-5 h-5 text-slate-400" />
            ) : (
              <X className="w-5 h-5 text-slate-400" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navItems.map((item, index) => (
            <button
              key={index}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                item.active
                  ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                  : 'text-slate-400 hover:bg-slate-700 hover:text-slate-300'
              }`}
              title={sidebarCollapsed ? item.label : ''}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!sidebarCollapsed && (
                <span className="font-medium text-sm">{item.label}</span>
              )}
            </button>
          ))}
        </nav>

        {/* Sidebar Footer */}
        {!sidebarCollapsed && (
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700 bg-slate-800">
            <div className="text-xs text-slate-500 text-center">
              Migration War Room v1.0
            </div>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-slate-800 border-b border-slate-700 px-8 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-100">
              S/4HANA Migration Command Center
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Real-time monitoring and executive oversight
            </p>
          </div>

          <div className="flex items-center gap-6">
            {/* Last Updated */}
            <div className="flex items-center gap-2 text-sm">
              <RefreshCw className="w-4 h-4 text-slate-400" />
              <div>
                <div className="text-slate-400 text-xs">Last Updated</div>
                <div className="text-slate-200 font-medium">{lastUpdated}</div>
              </div>
            </div>

            {/* User Avatar */}
            <button className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors">
              <div className="text-right">
                <div className="text-sm font-medium text-slate-100">Executive View</div>
                <div className="text-xs text-slate-400">Admin</div>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto">
          <div className="p-8 max-w-[1920px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
