import React from 'react';
import { SEVERITY_MAP } from '../../data/mockData';

export default function SeverityBadge({ severity, pulse = false, size = 'sm' }) {
  const meta = SEVERITY_MAP[severity] || SEVERITY_MAP[2];
  const sizes = { xs: 'text-[10px] px-1.5 py-0.5', sm: 'text-xs px-2.5 py-0.5', md: 'text-sm px-3 py-1', lg: 'text-base px-4 py-1.5' };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-md font-bold uppercase tracking-wide border ${sizes[size]}`}
      style={{ background: `${meta.color}1A`, color: meta.color, borderColor: `${meta.color}4D` }}>
      {pulse && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: meta.color }} />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ background: meta.color }} />
        </span>
      )}
      {meta.label}
    </span>
  );
}
