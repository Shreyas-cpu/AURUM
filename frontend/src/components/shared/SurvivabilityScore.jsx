import React from 'react';

/**
 * Circular gauge showing APEX Survivability-by-Routing Score.
 * survivabilityScore: 0.0–1.0 (from DB) — displayed as percentage.
 */
export default function SurvivabilityScore({ score, size = 80, showLabel = true }) {
  const pct    = Math.round((score || 0) * 100);
  const radius = (size / 2) - 6;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;

  const color = pct >= 75 ? '#10b981' : pct >= 50 ? '#f59e0b' : '#e84545';
  const glow  = pct >= 75 ? 'rgba(16,185,129,0.4)' : pct >= 50 ? 'rgba(245,158,11,0.4)' : 'rgba(232,69,69,0.4)';

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          {/* Track */}
          <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="#1e2d3d" strokeWidth={5} />
          {/* Fill */}
          <circle
            cx={size/2} cy={size/2} r={radius}
            fill="none" stroke={color} strokeWidth={5}
            strokeDasharray={circumference} strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ filter: `drop-shadow(0 0 6px ${glow})`, transition: 'stroke-dashoffset 0.8s ease' }}
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="font-mono font-bold leading-none" style={{ fontSize: size * 0.22, color }}>
            {pct}%
          </span>
        </div>
      </div>
      {showLabel && (
        <span className="text-[10px] font-semibold uppercase tracking-widest text-aurum-text-ter">
          Survivability
        </span>
      )}
    </div>
  );
}
