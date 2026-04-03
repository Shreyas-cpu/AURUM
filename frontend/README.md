# AURUM (CitySmart) - Frontend Application

This is the frontend component of the **AURUM** project, designed for high-stress municipal management and emergency dispatch. It features a "Soft Professional" aesthetic utilizing a strict color palette of Slate Gray (`#F8F9FB`), Sky Blue (`#185FA5`), and Mint Green (`#2D6A4F`) tailored to ensure maximum clarity and speed for dispatch operators.

## Tech Stack
* **Framework:** React 18 / Vite
* **Styling:** Tailwind CSS / Custom CSS mapping to the UI specs
* **Mapping:** Leaflet & React-Leaflet
* **Icons:** Lucide-React
* **Charts:** Recharts

## UI Architecture
* **Landing & Auth:** Clean and fast authentication flow with intelligent error states.
* **Pulse (Monitoring):** Live Leaflet-based map with real-time KPI overview metrics.
* **Ledger (Data):** Dense data-table layout optimized with alternating stripe UI and status pills.
* **Action (Control):** Critical system toggles and smooth variable sliders with explicit confirmation modals.

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the Development Server:**
   ```bash
   npm run dev
   ```

The application will run by default on `http://localhost:5173`.
