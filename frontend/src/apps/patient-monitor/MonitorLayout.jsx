import React from 'react';
import { Outlet } from 'react-router-dom';

// The Patient Monitor device fills 100% screen — no chrome/nav needed.
export default function MonitorLayout() {
  return (
    <div style={{ width: '100%', height: '100vh', overflow: 'hidden', background: '#000' }}>
      <Outlet />
    </div>
  );
}
