# AURUM (Adaptive Unified Routing for Urgent Medicine)

AURUM is a next-generation emergency triage intelligence platform designed to bypass reactive ambulance routing. Based on the **Ignisia Hackathon HC03 (Golden Hour Emergency Triage)** problem statement, AURUM leverages predictive hospital states and real-time constraint-based triage to effectively route trauma patients not just to the nearest hospital, but to the *safest, most capable* clinical facility during the 'Golden Hour'.

## 🏆 Project MVP Overview
This repository contains the monorepo V1 functional prototype demonstrating the fundamental interaction between standard vitals input, triage scoring, constraint optimization, and live dispatch visualization.

### Key Conceptual Implementations:
1. **APEX Engine (Mocked)**: Predicts acuity and survivability scores based on vital structures.
2. **NEXUS Engine (Mocked)**: Routes the patient utilizing live constraint calculations ensuring receiving hospitals actually have available beds, ventilators, and respective specialties.
3. **Dispatch Command Center Dashboard**: Real-time websocket-powered Leaflet Map UI to track incoming patients and simulate hospital load management. 

---

## 💻 Tech Stack
- **Frontend**: React 18, Vite, Tailwind CSS, React-Leaflet.
- **Backend**: FastAPI (Python), Uvicorn, WebSockets.
- **Simulation Assets**: Hardcoded simulated network of 5 standard hospitals in the Pune region framework for local testing.

---

## 🚀 Getting Started

### 1. Start the Backend API (FastAPI)
Open a terminal and navigate to the backend directory:
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```
*The backend API and Websocket server will launch on `http://localhost:8000`.*

### 2. Start the Frontend Dispatch Dashboard (React)
Open a new, separate terminal and navigate to the frontend directory:
```bash
cd frontend
npm install
npm run dev
```
*The frontend Vite server will launch. Open the provided `http://localhost:5173` link in your browser to view the Command Center.*

---

## 🛠️ Usage
1. Open the **Dispatch Command Center** in your browser. Wait for the 5 simulated hospitals to populate on the Map.
2. Under the **"New Dispatch"** panel on the left, enter arbitrary mock patient vitals. Adjusting variables like Heart Rate, GCS score, and Symptoms will trigger different acuity paths.
3. Click **"Dispatch Ambulance"**.
4. The system will process the constraint-based routing, assign a Survivability Routing Score (SRS), and dispatch the ambulance to the mathematically best destination. The path and connection will appear live on your map!

---

*Designed and Built for the HC03 Ignisia AI Hackathon parameters.*
