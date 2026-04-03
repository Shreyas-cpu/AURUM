import React, { useState } from 'react';
import { Search, Filter, Download, MoreHorizontal } from 'lucide-react';

const mockUnits = [
  { id: 'UNIT-001', type: 'Ambulance', driver: 'J. Smith', status: 'Available', zone: 'Sector 4', shift: 'Morning' },
  { id: 'UNIT-002', type: 'Ambulance', driver: 'A. Patel', status: 'En Route', zone: 'Sector 2', shift: 'Morning' },
  { id: 'UNIT-003', type: 'Fire Engine', driver: 'M. Chen', status: 'Dispatched', zone: 'Sector 1', shift: 'Morning' },
  { id: 'UNIT-004', type: 'Supervisor', driver: 'S. Ramos', status: 'Available', zone: 'All', shift: 'Morning' },
  { id: 'UNIT-005', type: 'Ambulance', driver: 'T. Johnson', status: 'In Maintenance', zone: 'Depot A', shift: '-' },
  { id: 'UNIT-006', type: 'Ambulance', driver: 'B. Lee', status: 'Available', zone: 'Sector 4', shift: 'Night' },
];

export default function Data() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="p-8 max-w-7xl mx-auto font-sans">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Resource Ledger</h1>
          <p className="text-sm text-slate-500 mt-1">Directory of all municipal grid assets.</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center px-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition font-medium text-sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </button>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-sm font-medium text-sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-slate-100 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="relative w-72">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search units, personnel..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
          <div className="text-sm text-slate-500">
            Showing {mockUnits.length} results
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="text-xs uppercase bg-slate-50 text-slate-500 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-semibold">Unit ID</th>
                <th className="px-6 py-4 font-semibold">Classification</th>
                <th className="px-6 py-4 font-semibold">Personnel</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Zone</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockUnits.map((unit) => (
                <tr key={unit.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">{unit.id}</td>
                  <td className="px-6 py-4">{unit.type}</td>
                  <td className="px-6 py-4">{unit.driver}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
                      ${unit.status === 'Available' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : ''}
                      ${unit.status === 'En Route' ? 'bg-blue-50 text-blue-700 border-blue-100' : ''}
                      ${unit.status === 'Dispatched' ? 'bg-amber-50 text-amber-700 border-amber-100' : ''}
                      ${unit.status === 'In Maintenance' ? 'bg-rose-50 text-rose-700 border-rose-100' : ''}
                    `}>
                      {unit.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">{unit.zone}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-slate-600 transition p-1">
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
