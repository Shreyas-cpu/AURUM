import React from 'react';
export default function Map({ hospitals = [], activeDispatches = [] }) {
  return (
    <div className="flex w-full h-full items-center justify-center bg-slate-800 text-slate-400">
      <div className="text-center">
        <h2 className="text-xl font-[700] mb-2">Legacy Map Component Deprecated</h2>
        <p className="text-sm">Please utilize MapEmbed.jsx powered by Google Maps Platform for Real-Time features.</p>
      </div>
    </div>
  );
}
