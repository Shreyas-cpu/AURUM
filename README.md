# AURUM - Advanced Emergency Response Orchestration System

AURUM is a highly decoupled, real-time emergency medical response orchestration platform. It is designed to synchronize the entire emergency response pipeline from the scene of the incident, through the ambulance transit, to the hospital's Emergency Response Center (ERC).

## 🚀 What the System Can Currently Do

Currently, AURUM features a fully operational, end-to-end chain-reaction simulation (**Sim_01: Severe Heart Attack / Myocardial Infarction**). The system handles:
*   **Decoupled Real-Time Sync:** Operates three independent frontend interfaces synchronized entirely via a central WebSocket Node.js hub.
*   **Dynamic Routing & Geo-Tracking:** Simulates city-block geographical ambulance movement using a custom pathing algorithm and renders it via MapLibre GL.
*   **Automated Rerouting (The Twist):** Simulates real-world dynamic constraints. For example, if a target hospital's Cath Lab becomes occupied during transit, the centralized ML/Routing engine intercepts the ambulance and instantly reroutes it to the next optimal hospital, notifying all parties dynamically.
*   **Performance-Optimized GIS:** Efficient MapLibre rendering limits map nodes to 15 non-active hospitals, instantly isolating and focusing on the target destination when an ambulance is dispatched to reduce UI load.
*   **Live Vitals Streaming:** Streams deteriorating patient vitals from a dedicated monitor interface directly into the backend via REST, which broadcasts them to connected tracking applications.

## 🛠️ Project Architecture & Functions

AURUM is broken into three main technical pillars:
1.  **Frontend (Vite + React + Zustand + Tailwind CSS):**
    *   Renders 3 separate application tabs from a single codebase using React Router.
    *   Global state is handled via `zustand` which listens natively to WebSocket pushes, eliminating local-storage synchronization bugs.
2.  **Backend Engine (Node.js + Express + Socket.io):**
    *   The central brain (`simEngine.js`) orchestrating the state of active incidents.
    *   Pushes 1-way WebSocket events to connected clients.
3.  **ML Engine (Python + FastAPI):**
    *   Evaluates APEX (survivability prediction) and NEXUS (dynamic routing parameters).

## ⚙️ How to Run the Project

AURUM includes a convenient startup batch script that spins up the Database, Backend API, Python Engine, and Frontend sequentially.

### Prerequisites:
*   **Docker Desktop** (For PostgreSQL Database)
*   **Node.js** (v18+)
*   **Python** (v3.10+)

### Start Command:
1.  Open up a terminal in the root workspace directory (`D:/Projects/AURUM`).
2.  Run the master startup script:
    ```bash
    .\run_aurum.bat
    ```
3.  This creates four separate terminal windows:
    *   **PostgreSQL** (Docker Compose)
    *   **Node.js API Hub** (`http://localhost:3001`)
    *   **Python ML Engine** (`http://localhost:8000`)
    *   **React Vite Frontend** (`http://localhost:5173`)

## 🌐 How to Access

Once the servers have successfully booted up, open your web browser. You will need to open **multiple tabs or windows** to view the entire ecosystem functioning together in real-time.

*   **Master Landing / Control Panel:** [http://localhost:5173/](http://localhost:5173/)
*   **Hospital ERC Dashboard:** [http://localhost:5173/app/hospital](http://localhost:5173/app/hospital)
*   **Ambulance Driver Console:** [http://localhost:5173/app/ambulance](http://localhost:5173/app/ambulance)
*   **Patient Monitor (Vitals Source):** [http://localhost:5173/app/monitor](http://localhost:5173/app/monitor)

## 🗺️ How to Use & Test the Simulation (Sim_01)

To experience the system's cross-communication capabilities:

1.  **Setup the Views:** Open the **Hospital ERC** tab, the **Ambulance Driver** tab, and the **Patient Monitor** tab side-by-side or scattered on multiple monitors.
2.  **Launch the Incident:** From the Master Landing Page (`http://localhost:5173/`), click the **Play Simulation / Start Sim_01** button.
3.  **Observe the Flow:**
    *   **T+0s:** The Backend assigns an ambulance. The Driver Console receives a `routing:decision` with an initial map trace.
    *   **T+5s:** Ambulance begins animated transit toward the patient scene, tracking over the custom MapLibre city-grid.
    *   **T+15s:** Patient is loaded. **The Patient Monitor** automatically begins streaming deteriorating vitals (SpO2 drops, HR spikes). You will see these vitals sync instantly to the Hospital ERC dashboard.
    *   **T+25s (The Twist):** The backend triggers a `routing:reroute` payload. A glowing notification overtakes the Ambulance screen rerouting them to Ruby Hall due to severe vitals requiring an immediate Cath Lab. The Map dynamically updates the path.
    *   **T+36s:** The Ambulance arrives. The Hospital UI triggers an UBER-CRITICAL ARRIVAL modal, and the scenario ends smoothly.

## 🗂️ Core WebSocket Events
*   `ambulance:location_broadcast` -> Syncs live map positions.
*   `vitals:update` -> Pushes new cardiac/respiratory metrics.
*   `routing:decision` -> Assigns initial transit destinations.
*   `routing:reroute` -> Updates active paths and notifies users of diversions.
*   `hospital:status_update` -> Distributes critical bed/specialist availability.