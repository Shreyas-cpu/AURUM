import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Activity, Database, Zap, ArrowRight, ActivitySquare } from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Header */}
      <header className="px-8 py-6 flex justify-between items-center bg-white shadow-sm">
        <div className="flex items-center space-x-2">
          <ActivitySquare className="h-8 w-8 text-blue-600" />
          <span className="text-2xl font-black tracking-tight text-slate-800">AURUM</span>
        </div>
        <button
          onClick={() => navigate('/login')}
          className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition shadow-sm"
        >
          Access Portal
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-16">
        <div className="max-w-4xl space-y-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-sm font-semibold mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>System Online & Operational</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Municipal Infrastructure <br />
            <span className="text-blue-600">Command & Control</span>
          </h1>
          
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            AURUM provides real-time oversight and dispatch capabilities for high-stress municipal environments. Ensure swift, coordinated responses across all city sectors.
          </p>

          <div className="pt-8">
            <button
              onClick={() => navigate('/login')}
              className="px-8 py-4 bg-blue-600 text-white text-lg font-bold rounded-xl hover:bg-blue-700 transition shadow-lg hover:shadow-xl flex items-center space-x-2 mx-auto"
            >
              <span>Initialize Systems</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-24">
          <div className="bg-white p-8 rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-slate-100 flex flex-col items-center text-center">
            <div className="p-4 bg-blue-50 text-blue-600 rounded-xl mb-4">
              <Activity className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Live Monitoring</h3>
            <p className="text-slate-600">Real-time mapping and resource tracking across all city sectors.</p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-slate-100 flex flex-col items-center text-center">
            <div className="p-4 bg-emerald-50 text-emerald-600 rounded-xl mb-4">
              <Database className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Data Ledger</h3>
            <p className="text-slate-600">Comprehensive, dense data tables optimized for rapid scanning.</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-slate-100 flex flex-col items-center text-center">
            <div className="p-4 bg-amber-50 text-amber-600 rounded-xl mb-4">
              <Zap className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Rapid Dispatch</h3>
            <p className="text-slate-600">Immediate action controls for high-stress dispatch environments.</p>
          </div>
        </div>
      </main>
      
      <footer className="text-center py-6 text-slate-500 text-sm border-t border-slate-200 bg-white">
        &copy; {new Date().getFullYear()} AURUM Municipal Systems. Highly Classified.
      </footer>
    </div>
  );
}
