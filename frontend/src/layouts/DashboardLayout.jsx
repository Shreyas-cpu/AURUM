import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { ActivitySquare, Map as MapIcon, Database, Sliders, BarChart3, Settings, Bell, User, LogOut } from 'lucide-react';

export default function DashboardLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  const navItems = [
    { name: 'Monitor', icon: MapIcon, path: '/app/monitor' },
    { name: 'Data Ledger', icon: Database, path: '/app/data' },
    { name: 'Control', icon: Sliders, path: '/app/control' },
    { name: 'Reports', icon: BarChart3, path: '/app/reports' },
    { name: 'Settings', icon: Settings, path: '/app/settings' },
  ];

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-800 outline-none">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-100 flex flex-col z-20">
        <div className="h-16 flex items-center px-6 border-b border-slate-100">
          <ActivitySquare className="h-6 w-6 text-blue-600 mr-2" />
          <span className="text-xl font-black tracking-tight text-slate-900">AURUM</span>
        </div>
        
        <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                  isActive 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`
              }
            >
              <item.icon className="h-5 w-5 mr-3 shrink-0" />
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button 
            onClick={handleLogout}
            className="flex items-center w-full px-3 py-2.5 text-sm font-semibold text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
          >
            <LogOut className="h-5 w-5 mr-3 shrink-0" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-8 z-10">
          <div className="flex items-center">
            <h2 className="text-lg font-bold text-slate-800">System Dashboard</h2>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Grid Stable
            </div>

            <button className="text-slate-400 hover:text-slate-600 relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
            </button>
            
            <button className="flex items-center space-x-2 text-slate-600 hover:text-slate-800">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                OP
              </div>
            </button>
          </div>
        </header>

        {/* Page Content Outlet */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
