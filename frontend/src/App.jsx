import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import DashboardLayout from './layouts/DashboardLayout';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Monitor from './pages/Monitor';
import Data from './pages/Data';
import Control from './pages/Control';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />

        {/* Secure Application Routes */}
        <Route path="/app" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/app/monitor" replace />} />
          <Route path="monitor" element={<Monitor />} />
          <Route path="data" element={<Data />} />
          <Route path="control" element={<Control />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
