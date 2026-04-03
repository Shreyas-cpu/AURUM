# AURUM Master Build Checklist

This document tracks the current development progress of the AURUM project against the **Master Build Prompt Document**.

## 📋 Core Stages Progress

- [x] **STAGE 0: Project Overview, Architecture & Setup**
  - Architecture defined.
  - Project monorepo scaffolding created.
  - Tech stack initialized (React, FastAPI, Tailwind).

- [x] **STAGE 1: Database Schema & Seed Data**
  - *Status:* **Completed**
  - *Notes:* PostgreSQL schema (`schema.sql`), PostGIS extension, and seed data (`seed.sql`) containing 10 hospitals matching regional requirements with ambulances and patients were created. A `docker-compose.yml` was generated to spin up the database smoothly.

- [x] **STAGE 2: Backend API — Core Endpoints**
  - *Status:* **Completed**
  - *Notes:* Node.js + Express backend created on port 3001 serving as the primary REST API and Socket.io Hub matching the prompt's architecture. Connects directly to the PostgreSQL database for endpoints `/api/hospitals`, `/api/patients`, `/api/ambulances`.

- [x] **STAGE 3: ML Engine — APEX Severity Predictor**
  - *Status:* **Completed**
  - *Notes:* Created synthetic data generator `generate_training_data.py`. Created `train_apex.py` which trains XGBoost Classifiers to detect ICU, Ventilator, and Specialist needs based on vitals, plus `shap.TreeExplainer`. Created the `/ml/predict` endpoint in FastAPI `main.py` which serves this loaded model and returns full AI routing variables and explainability (SHAP).

- [x] **STAGE 4: Constraint Optimizer — NEXUS Router**
  - *Status:* **Completed**
  - *Notes:* NEXUS optimizer built (`backend/ml_engine/nexus.py`). Single-patient routing considers capacity, capability, survivability score, routing time, and load scores. Added endpoints `/ml/route` and `/ml/mce-route` directly in FastAPI, implementing PuLP strict integer linear programming to accurately balance MCE events.

- [x] **STAGE 5: Interface A — Hospital ERC Dashboard**
  - *Status:* **Completed**
  - *Notes:* Wired React components (`HospitalOverview.jsx`, `HospitalResources.jsx`) to Zustand `useStore`. Integrated `socket.io-client` pointing to Node `localhost:3001` to capture `hospital:status_update`, `vitals:update`, and push `PUT` REST syncs. Mock arrays swapped with DB interactions.

- [x] **STAGE 6: Interface B — Ambulance Driver App**
  - *Status:* **Completed**
  - *Notes:* Fully transitioned `AmbulanceLayout.jsx`, `AmbulanceDispatch.jsx`, and `AmbulanceMain.jsx` to live Zustand `useStore` data instead of mocks. Added `activeAmbulanceId` tracking for simulated HTTP/Socket pushes representing GPS drifts in `useSocket.js`/`useAmbulanceLocationBroadcast`, replacing polling behavior. Driver dispatch accurately requests and maps `runApexPrediction` to live hospital databases.

- [x] **STAGE 7: Interface C — Patient Monitor Device UI**
  - *Status:* **Completed**
  - *Notes:* Fully implemented automated vitals-stream simulation logic via `useVitalsStream` hook. It continuously drifts patient vitals metrics and hits the Node API endpoint (`/vitals`), enabling true streaming to the Postgres DB `vitals_stream` table and initiating websocket `io.emit('vitals:update')` packets to all listener dashboards.

- [x] **STAGE 8: Real-Time Layer — WebSockets & Live Updates**
  - *Status:* **Completed**
  - *Notes:* Fully implemented. Crossed the Python/Node divide using an internal `/api/internal/broadcast` webhook that correctly emits `routing:decision` and `mce:triggered` via Socket.io to React Zustand listeners.

- [x] **STAGE 9: Google Maps Integration**
  - *Status:* **Completed**
  - *Notes:* Fully transitioned map layers. `@react-google-maps/api` implemented in `MapEmbed.jsx`, eradicating `leaflet` from `package.json`. Includes styled base-maps, conditional Directions rendering, SVG markers with Pulse effects, and dynamic fallback notice if API key isn't provided in the environment yet.

- [x] **STAGE 10: Mass Casualty Event (MCE) Batch Mode**
  - *Status:* **Completed**
  - *Notes:* Backend ILP matrix (`nexus.py`) for routing N patients to M hospitals is active on `/ml/mce-route`. Frontend React `AmbulanceMCE.jsx` triggers it globally via webhooks.

- [x] **STAGE 11: Explainability Panel — SHAP Routing Rationale**
  - *Status:* **Completed**
  - *Notes:* `main.py` generates `shap_values` from the `shap.TreeExplainer` upon `/ml/predict` returning them to the React client which binds them into `ShapPanel.jsx`.

- [ ] **Frontend Updation**
  - *Status:* **Pending Definition**
  - *Notes:* User will define specific updates and remaining UI fixes later.

## ✨ Bonus / Advanced Features

- [ ] **BONUS A:** ORACLE — Predictive Hospital State (30-min forecast)
- [ ] **BONUS B:** Voice Input — Whisper ASR for EMT 
- [ ] **BONUS C:** HELIX — Post-Incident Analytics Dashboard (UI `HospitalAnalytics.jsx` scaffolded)
- [ ] **BONUS D:** Pre-Arrival Activation Protocol
- [ ] **BONUS E:** Federated Learning Architecture Stub

---
*Generated based on analysis of the `AURUM_Master_Build_Prompt (1)` requirements and the current `Backend` branch codebase.*