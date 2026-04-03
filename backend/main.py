from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import math
import asyncio
from typing import List, Dict, Any

app = FastAPI(title="AURUM MVP Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- MOCK DATA ---
HOSPITALS = [
    {"id": "H1", "name": "Ruby Hall Clinic (Trauma Center)", "lat": 18.5362, "lng": 73.8741, "beds": 5, "ventilators": 2, "specialties": ["neurosurgery", "cardiac"]},
    {"id": "H2", "name": "KEM Hospital", "lat": 18.5201, "lng": 73.8727, "beds": 2, "ventilators": 0, "specialties": ["general"]},
    {"id": "H3", "name": "Sanjeevan Hospital", "lat": 18.5098, "lng": 73.8340, "beds": 12, "ventilators": 5, "specialties": ["cardiac", "orthopedic"]},
    {"id": "H4", "name": "Sassoon General", "lat": 18.5255, "lng": 73.8745, "beds": 0, "ventilators": 0, "specialties": ["neurosurgery"]},
    {"id": "H5", "name": "Jehangir Hospital", "lat": 18.5312, "lng": 73.8767, "beds": 8, "ventilators": 3, "specialties": ["cardiac", "orthopedic", "neurosurgery"]},
]

# --- WEBSOCKET MANAGER ---
class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)

    async def broadcast_json(self, message: dict):
        for connection in self.active_connections:
            await connection.send_json(message)

manager = ConnectionManager()


# --- MODELS ---
class Vitals(BaseModel):
    heart_rate: int
    systolic_bp: int
    respiratory_rate: int
    gcs: int
    symptoms: str

class DispatchRequest(BaseModel):
    vitals: Vitals
    lat: float
    lng: float

# --- MOCK APEX MODEL ---
def predict_acuity(vitals: Vitals) -> Dict[str, Any]:
    # Placeholder Logic
    needs_ventilator = vitals.respiratory_rate > 30 or vitals.gcs < 9
    needs_neurosurgery = "head" in vitals.symptoms.lower() or vitals.gcs < 13
    
    severity = "High" if (needs_ventilator or needs_neurosurgery) else "Moderate"
    if vitals.systolic_bp > 100 and vitals.gcs == 15 and vitals.respiratory_rate < 25:
        severity = "Low"

    return {
        "severity": severity,
        "needs_ventilator": needs_ventilator,
        "needs_neurosurgery": needs_neurosurgery,
        "srs_score": 85 if severity == "High" else 98 # Survivability Routing Score
    }

# --- MOCK NEXUS ROUTING ---
def calculate_distance(lat1, lon1, lat2, lon2):
    # Simple Euclidean for MVP
    return math.sqrt((lat1 - lat2)**2 + (lon1 - lon2)**2)

def route_patient(patient_lat, patient_lng, prediction):
    eligible = []
    for h in HOSPITALS:
        # Constraint: beds available
        if h["beds"] <= 0:
            continue
        # Constraint: ventilator
        if prediction["needs_ventilator"] and h["ventilators"] <= 0:
            continue
        # Constraint: specialty
        if prediction["needs_neurosurgery"] and "neurosurgery" not in h["specialties"]:
            continue
        eligible.append(h)
    
    if not eligible:
        return None # In real world, complex MCE handles overflow

    # Nearest sorted by distance
    eligible.sort(key=lambda x: calculate_distance(patient_lat, patient_lng, x["lat"], x["lng"]))
    return eligible[0]


@app.get("/api/hospitals")
def get_hospitals():
    return HOSPITALS

@app.post("/api/dispatch")
async def dispatch_ambulance(req: DispatchRequest):
    # 1. Predict Acuity (APEX)
    prediction = predict_acuity(req.vitals)
    
    # 2. Route Patient (NEXUS)
    target_hospital = route_patient(req.lat, req.lng, prediction)
    
    if not target_hospital:
        return {"status": "error", "message": "No eligible hospitals available."}
    
    result = {
        "status": "success",
        "prediction": prediction,
        "routed_to": target_hospital["name"],
        "hospital_id": target_hospital["id"],
        "ambulance": {"lat": req.lat, "lng": req.lng}
    }
    
    # 3. Broadcast to all active dispatched (WebSocket)
    await manager.broadcast_json({"type": "NEW_DISPATCH", "data": result})
    
    return result

@app.websocket("/ws/dispatch")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            pass # Keep connection alive
    except WebSocketDisconnect:
        manager.disconnect(websocket)
