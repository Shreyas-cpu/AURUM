import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Calendar, Download, TrendingUp, Users } from 'lucide-react';

const incidentData = [
  { time: '00:00', counts: 12 }, { time: '04:00', counts: 8 }, { time: '08:00', counts: 35 },
  { time: '12:00', counts: 45 }, { time: '16:00', counts: 68 }, { time: '20:00', counts: 40 },
  { time: '23:59', counts: 25 },
];

const severityData = [
  { name: 'Low', value: 120 },
  { name: 'Med', value: 85 },
  { name: 'High', value: 45 },
  { name: 'Critical', value: 12 },
];

export default function Reports() {
  return (
    <div className="p-8 max-w-7xl mx-auto font-sans">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Analytics & Reports</h1>
          <p className="text-sm text-slate-500 mt-1">Daily incident summaries and response metrics.</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition font-medium text-sm">
            <Calendar className="h-4 w-4 mr-2" />
            Last 24 Hours
          </button>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-sm font-medium text-sm">
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex items-center">
          <div className="p-4 bg-blue-50 text-blue-600 rounded-full mr-4">
            <TrendingUp className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Total Incidents</p>
            <h4 className="text-3xl font-black text-slate-800">262</h4>
            <p className="text-xs text-emerald-600 font-semibold mt-1">↓ 12% vs yesterday</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex items-center">
          <div className="p-4 bg-emerald-50 text-emerald-600 rounded-full mr-4">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Avg Response Time</p>
            <h4 className="text-3xl font-black text-slate-800">6.4m</h4>
            <p className="text-xs text-emerald-600 font-semibold mt-1">↓ 0.2m vs yesterday</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex items-center bg-gradient-to-tr from-white to-rose-50">
          <div className="p-4 bg-rose-100 text-rose-600 rounded-full mr-4">
            <TrendingUp className="h-6 w-6 transform rotate-45" />
          </div>
          <div>
            <p className="text-sm text-rose-600 font-medium">Critical Dispatches</p>
            <h4 className="text-3xl font-black text-slate-800">12</h4>
            <p className="text-xs text-emerald-600 font-semibold mt-1">↓ 2 cases</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Incident Volume Matrix</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={incidentData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCounts" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Area type="monotone" dataKey="counts" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorCounts)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Severity Distribution</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={severityData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip cursor={{fill: '#f1f5f9'}} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]} fill="#0ea5e9" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
