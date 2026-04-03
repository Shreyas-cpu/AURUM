import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useStore } from './hooks/useStore';

// Landing
import Landing from './pages/Landing';

// Interface A — Hospital ERC
import HospitalLayout from './apps/hospital-erc/HospitalLayout';
import HospitalOverview from './apps/hospital-erc/HospitalOverview';
import HospitalResources from './apps/hospital-erc/HospitalResources';
import HospitalIncidentLog from './apps/hospital-erc/HospitalIncidentLog';
import HospitalAnalytics from './apps/hospital-erc/HospitalAnalytics';
import HospitalMCE from './apps/hospital-erc/HospitalMCE';

// Interface B — Ambulance Driver
import AmbulanceLayout from './apps/ambulance-driver/AmbulanceLayout';
import AmbulanceMain from './apps/ambulance-driver/AmbulanceMain';
import AmbulanceDispatch from './apps/ambulance-driver/AmbulanceDispatch';
import AmbulanceMCE from './apps/ambulance-driver/AmbulanceMCE';

// Interface C — Patient Monitor
import MonitorLayout from './apps/patient-monitor/MonitorLayout';
import PatientMonitor from './apps/patient-monitor/PatientMonitor';

function App() {
  const initStore = useStore(s => s.initStore);

  useEffect(() => {
    initStore();
  }, [initStore]);

  return (
    <BrowserRouter>
      <Routes>
        {/* ── Landing / Role Selector ───────────────────────── */}
        <Route path="/" element={<Landing />} />

        {/* ── Interface A: Hospital ERC ─────────────────────── */}
        <Route path="/app/hospital" element={<HospitalLayout />}>
          <Route index element={<HospitalOverview />} />
          <Route path="resources" element={<HospitalResources />} />
          <Route path="incidents" element={<HospitalIncidentLog />} />
          <Route path="analytics" element={<HospitalAnalytics />} />
          <Route path="mce" element={<HospitalMCE />} />
        </Route>

        {/* ── Interface B: Ambulance Driver ─────────────────── */}
        <Route path="/app/ambulance" element={<AmbulanceLayout />}>
          <Route index element={<AmbulanceMain />} />
          <Route path="dispatch" element={<AmbulanceDispatch />} />
          <Route path="mce" element={<AmbulanceMCE />} />
        </Route>

        {/* ── Interface C: Patient Monitor ──────────────────── */}
        <Route path="/app/monitor" element={<MonitorLayout />}>
          <Route index element={<PatientMonitor />} />
        </Route>

        {/* ── Fallback ───────────────────────────────────────── */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
