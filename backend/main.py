"""
AURUM Backend — FastAPI
Stage 2 API endpoints + APEX/NEXUS mock engine.
Serves hospitals, patients, vitals, and routing.
"""
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import math
import random
import asyncio
from typing import List, Dict, Any, Optional
from datetime import datetime

app = FastAPI(title="AURUM — Adaptive Unified Routing for Urgent Medicine")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ─── HOSPITAL DATA (Mumbai Region — 10 seeded) ──────────────────────────────
HOSPITALS = [
    # Level 1: Full Trauma + All Specialties
    {
        "id": "hosp-001", "name": "KEM Hospital",
        "address": "Acharya Donde Marg, Parel, Mumbai 400012",
        "lat": 19.0034, "lng": 72.8413, "phone": "+91-22-2410-7000",
        "total_icu_beds": 80, "avail_icu_beds": 12,
        "total_gen_beds": 1800, "avail_gen_beds": 245,
        "has_ventilator": True, "avail_ventilators": 18,
        "has_trauma_centre": True, "has_cath_lab": True,
        "has_neurosurgery": True, "has_cardiac_surgery": True,
        "has_burn_unit": True, "has_paediatrics": True,
        "current_load_pct": 85, "is_active": True,
        "specialists_on_duty": [
            {"id": "s001", "type": "trauma_surgeon", "name": "Dr. Suresh Menon", "on_duty": True},
            {"id": "s002", "type": "neurosurgeon", "name": "Dr. Anita Bhatia", "on_duty": True},
            {"id": "s003", "type": "cardiologist", "name": "Dr. Rajiv Khanna", "on_duty": False},
        ],
    },
    {
        "id": "hosp-002", "name": "Lilavati Hospital",
        "address": "A-791, Bandra Reclamation, Bandra West, Mumbai 400050",
        "lat": 19.0505, "lng": 72.8259, "phone": "+91-22-2675-1000",
        "total_icu_beds": 40, "avail_icu_beds": 8,
        "total_gen_beds": 250, "avail_gen_beds": 62,
        "has_ventilator": True, "avail_ventilators": 12,
        "has_trauma_centre": True, "has_cath_lab": True,
        "has_neurosurgery": True, "has_cardiac_surgery": True,
        "has_burn_unit": False, "has_paediatrics": True,
        "current_load_pct": 72, "is_active": True,
        "specialists_on_duty": [
            {"id": "s005", "type": "trauma_surgeon", "name": "Dr. Vikram Desai", "on_duty": True},
            {"id": "s006", "type": "neurosurgeon", "name": "Dr. Sunita Rao", "on_duty": True},
            {"id": "s007", "type": "cardiologist", "name": "Dr. Arun Patel", "on_duty": True},
        ],
    },
    # Level 2
    {
        "id": "hosp-003", "name": "Lokmanya Tilak Municipal (Sion)",
        "address": "Dr. Babasaheb Ambedkar Road, Sion, Mumbai 400022",
        "lat": 19.0348, "lng": 72.8624,
        "total_icu_beds": 60, "avail_icu_beds": 7,
        "total_gen_beds": 1400, "avail_gen_beds": 180,
        "has_ventilator": True, "avail_ventilators": 9,
        "has_trauma_centre": True, "has_cath_lab": False,
        "has_neurosurgery": True, "has_cardiac_surgery": False,
        "current_load_pct": 78, "is_active": True,
        "specialists_on_duty": [
            {"id": "s009", "type": "trauma_surgeon", "name": "Dr. Ashok Gaikwad", "on_duty": True},
        ],
    },
    {
        "id": "hosp-004", "name": "P.D. Hinduja Hospital",
        "address": "Veer Savarkar Marg, Mahim, Mumbai 400016",
        "lat": 19.0322, "lng": 72.8385,
        "total_icu_beds": 35, "avail_icu_beds": 5,
        "total_gen_beds": 350, "avail_gen_beds": 74,
        "has_ventilator": True, "avail_ventilators": 7,
        "has_trauma_centre": True, "has_cath_lab": True,
        "has_neurosurgery": False, "has_cardiac_surgery": False,
        "current_load_pct": 68, "is_active": True,
        "specialists_on_duty": [
            {"id": "s011", "type": "trauma_surgeon", "name": "Dr. Nilesh Shetty", "on_duty": True},
            {"id": "s012", "type": "cardiologist", "name": "Dr. Smita Kulkarni", "on_duty": True},
        ],
    },
    {
        "id": "hosp-005", "name": "Fortis Hospital Mulund",
        "address": "Mulund Goregaon Link Rd, Mulund West, Mumbai 400080",
        "lat": 19.1726, "lng": 72.9567,
        "total_icu_beds": 30, "avail_icu_beds": 6,
        "total_gen_beds": 280, "avail_gen_beds": 89,
        "has_ventilator": True, "avail_ventilators": 8,
        "has_trauma_centre": True,
        "current_load_pct": 61, "is_active": True,
        "specialists_on_duty": [
            {"id": "s013", "type": "trauma_surgeon", "name": "Dr. Ramesh Iyer", "on_duty": True},
        ],
    },
    # Level 3: General
    {
        "id": "hosp-006", "name": "Nanavati Max Super Speciality",
        "address": "SV Road, Vile Parle West, Mumbai 400056",
        "lat": 19.1003, "lng": 72.8497,
        "total_icu_beds": 25, "avail_icu_beds": 10,
        "total_gen_beds": 350, "avail_gen_beds": 142,
        "has_ventilator": True, "avail_ventilators": 11,
        "has_trauma_centre": False,
        "current_load_pct": 52, "is_active": True,
        "specialists_on_duty": [],
    },
    {
        "id": "hosp-007", "name": "Wockhardt Hospital Mumbai Central",
        "address": "1877, Dr. Anandrao Nair Rd, Mumbai Central, Mumbai 400011",
        "lat": 18.9706, "lng": 72.8193,
        "total_icu_beds": 20, "avail_icu_beds": 9,
        "total_gen_beds": 200, "avail_gen_beds": 88,
        "has_ventilator": True, "avail_ventilators": 6,
        "has_trauma_centre": False,
        "current_load_pct": 48, "is_active": True,
        "specialists_on_duty": [],
    },
    {
        "id": "hosp-008", "name": "Kokilaben Dhirubhai Ambani Hospital",
        "address": "Rao Saheb Achutrao Patwardhan Marg, Andheri West, Mumbai 400053",
        "lat": 19.1318, "lng": 72.8257,
        "total_icu_beds": 45, "avail_icu_beds": 14,
        "total_gen_beds": 750, "avail_gen_beds": 210,
        "has_ventilator": True, "avail_ventilators": 16,
        "has_trauma_centre": False, "has_cath_lab": True,
        "has_cardiac_surgery": True,
        "current_load_pct": 58, "is_active": True,
        "specialists_on_duty": [
            {"id": "s018", "type": "cardiac_surgeon", "name": "Dr. Harish Bendre", "on_duty": True},
        ],
    },
    # Near-Capacity (test load-balancing)
    {
        "id": "hosp-009", "name": "Breach Candy Hospital",
        "address": "60-A, Bhulabhai Desai Road, Breach Candy, Mumbai 400026",
        "lat": 18.9664, "lng": 72.8055,
        "total_icu_beds": 20, "avail_icu_beds": 1,
        "total_gen_beds": 150, "avail_gen_beds": 8,
        "has_ventilator": True, "avail_ventilators": 2,
        "has_trauma_centre": False,
        "current_load_pct": 94, "is_active": True,
        "specialists_on_duty": [],
    },
    {
        "id": "hosp-010", "name": "Tata Memorial Centre",
        "address": "Dr. E.Borges Road, Parel, Mumbai 400012",
        "lat": 19.0035, "lng": 72.8465,
        "total_icu_beds": 50, "avail_icu_beds": 2,
        "total_gen_beds": 600, "avail_gen_beds": 14,
        "has_ventilator": True, "avail_ventilators": 3,
        "has_trauma_centre": False,
        "current_load_pct": 97, "is_active": True,
        "specialists_on_duty": [],
    },
]

# ─── AMBULANCES ──────────────────────────────────────────────────────────────
AMBULANCES = [
    {"id": "amb-001", "call_sign": "AMB-001", "driver_name": "Rakesh Patil", "lat": 19.0120, "lng": 72.8360, "status": "en_route_to_hospital"},
    {"id": "amb-002", "call_sign": "AMB-002", "driver_name": "Sunil Sharma", "lat": 19.0450, "lng": 72.8200, "status": "on_scene"},
    {"id": "amb-003", "call_sign": "AMB-003", "driver_name": "Deepak Verma", "lat": 19.0700, "lng": 72.8600, "status": "idle"},
]

# ─── PATIENTS ────────────────────────────────────────────────────────────────
PATIENTS = [
    {
        "id": "pat-001", "session_code": "P-20241031-001", "ambulance_id": "amb-001",
        "age": 42, "sex": "male",
        "chief_complaint": "Polytrauma — high-speed road traffic accident",
        "mechanism_of_injury": "Blunt-force trauma, ejection from vehicle",
        "heart_rate": 118, "systolic_bp": 85, "diastolic_bp": 60,
        "spo2": 93.2, "respiratory_rate": 24, "temperature": 38.1, "gcs_score": 10,
        "predicted_severity": 4,
        "predicted_care_needs": {"icu": True, "ventilator": True, "specialist": "trauma_surgeon"},
        "survivability_score": 0.71,
        "assigned_hospital_id": "hosp-001", "status": "active",
    }
]


# ─── WEBSOCKET MANAGER ──────────────────────────────────────────────────────
class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)

    async def broadcast_json(self, message: dict):
        for conn in self.active_connections:
            try:
                await conn.send_json(message)
            except:
                pass

manager = ConnectionManager()


# ─── REQUEST MODELS ──────────────────────────────────────────────────────────
class Vitals(BaseModel):
    heart_rate: int
    systolic_bp: int
    respiratory_rate: int
    gcs: int
    symptoms: str = "Emergency"

class DispatchRequest(BaseModel):
    vitals: Vitals
    lat: float = 19.0120
    lng: float = 72.8360

class VitalsReading(BaseModel):
    heart_rate: int = 110
    systolic_bp: int = 90
    diastolic_bp: int = 65
    spo2: float = 94.0
    respiratory_rate: int = 22
    temperature: float = 37.5
    gcs_score: int = 11
    source: str = "monitor"

class ResourceUpdate(BaseModel):
    avail_icu_beds: Optional[int] = None
    avail_gen_beds: Optional[int] = None
    avail_ventilators: Optional[int] = None
    current_load_pct: Optional[int] = None


# ─── APEX: Severity Predictor ────────────────────────────────────────────────
def predict_acuity(vitals: Vitals) -> Dict[str, Any]:
    needs_ventilator = vitals.respiratory_rate > 30 or vitals.gcs < 9
    needs_neurosurgery = "head" in vitals.symptoms.lower() or vitals.gcs < 13
    needs_icu = vitals.gcs < 12 or vitals.systolic_bp < 90

    if vitals.gcs < 9:
        severity = 5
        severity_label = "Immediate"
    elif vitals.gcs < 12 or (needs_ventilator and needs_neurosurgery):
        severity = 4
        severity_label = "Critical"
    elif vitals.systolic_bp < 90 or needs_ventilator or needs_neurosurgery:
        severity = 3
        severity_label = "High"
    elif vitals.systolic_bp > 100 and vitals.gcs == 15:
        severity = 1
        severity_label = "Minor"
    else:
        severity = 2
        severity_label = "Moderate"

    srs = max(10, min(99, 95
        - (20 if vitals.gcs < 12 else 0)
        - (15 if vitals.systolic_bp < 90 else 0)
        - (10 if vitals.respiratory_rate > 25 else 0)
    ))

    return {
        "severity": severity,
        "severity_label": severity_label,
        "needs_icu": needs_icu,
        "needs_ventilator": needs_ventilator,
        "needs_neurosurgery": needs_neurosurgery,
        "srs_score": srs,
        "shap_values": {
            "gcs_score": 0.32,
            "systolic_bp": 0.22,
            "respiratory_rate": 0.18,
            "heart_rate": 0.12,
            "age": 0.08,
            "mechanism_of_injury": 0.05,
            "spo2": 0.03,
        }
    }


# ─── NEXUS: Constraint-Based Router ─────────────────────────────────────────
def haversine(lat1, lng1, lat2, lng2):
    R = 6371  # km
    dlat = math.radians(lat2 - lat1)
    dlng = math.radians(lng2 - lng1)
    a = math.sin(dlat/2)**2 + math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(dlng/2)**2
    return R * 2 * math.asin(math.sqrt(a))

def route_patient(patient_lat, patient_lng, prediction):
    scored = []
    for h in HOSPITALS:
        if not h.get("is_active", True):
            continue

        rejection = None
        # Hard constraints
        if prediction.get("needs_icu") and h.get("avail_icu_beds", 0) <= 0:
            rejection = f"No ICU beds available"
        elif prediction.get("needs_ventilator") and h.get("avail_ventilators", 0) <= 0:
            rejection = f"No ventilators available"
        elif prediction.get("needs_neurosurgery") and not h.get("has_neurosurgery"):
            rejection = "No neurosurgery"
        elif h.get("current_load_pct", 0) >= 95:
            rejection = f"At capacity ({h['current_load_pct']}%)"

        dist = haversine(patient_lat, patient_lng, h["lat"], h["lng"])
        transit_min = max(3, int(dist / 0.67))  # ~40 km/h avg

        if rejection:
            scored.append({
                "hospital_id": h["id"], "hospital_name": h["name"],
                "score": 0.0, "transit_min": transit_min, "rejection_reason": rejection,
                "survivability_score": 0.0,
            })
            continue

        max_transit = 30
        transit_score = (1 - transit_min / max_transit) * 40
        surv_score = (prediction.get("srs_score", 80) / 100) * 30
        load_score = (1 - h.get("current_load_pct", 50) / 100) * 20
        resource_score = 10  # simplified

        total = max(0, transit_score + surv_score + load_score + resource_score) / 100

        scored.append({
            "hospital_id": h["id"], "hospital_name": h["name"],
            "score": round(total, 2), "transit_min": transit_min,
            "rejection_reason": None,
            "survivability_score": round(prediction.get("srs_score", 80) / 100, 2),
        })

    # Sort: eligible first (by score desc), then rejected
    scored.sort(key=lambda x: (0 if x["rejection_reason"] else 1, x["score"]), reverse=True)

    # Assign ranks
    for i, h in enumerate(scored):
        h["rank"] = i + 1

    return scored


# ─── API ENDPOINTS (Stage 2) ────────────────────────────────────────────────

@app.get("/")
def root():
    return {"system": "AURUM", "version": "1.0", "status": "operational"}


# Hospital Endpoints
@app.get("/api/hospitals")
def get_hospitals():
    return HOSPITALS

@app.get("/api/hospitals/{hospital_id}")
def get_hospital(hospital_id: str):
    h = next((x for x in HOSPITALS if x["id"] == hospital_id), None)
    if not h:
        return {"error": "Hospital not found"}
    return h

@app.put("/api/hospitals/{hospital_id}/resources")
def update_hospital_resources(hospital_id: str, update: ResourceUpdate):
    h = next((x for x in HOSPITALS if x["id"] == hospital_id), None)
    if not h:
        return {"error": "Hospital not found"}
    if update.avail_icu_beds is not None:
        h["avail_icu_beds"] = update.avail_icu_beds
    if update.avail_gen_beds is not None:
        h["avail_gen_beds"] = update.avail_gen_beds
    if update.avail_ventilators is not None:
        h["avail_ventilators"] = update.avail_ventilators
    if update.current_load_pct is not None:
        h["current_load_pct"] = update.current_load_pct
    return {"status": "updated", "hospital": h}


# Patient Endpoints
@app.get("/api/patients/{patient_id}")
def get_patient(patient_id: str):
    p = next((x for x in PATIENTS if x["id"] == patient_id), None)
    if not p:
        return {"error": "Patient not found"}
    return p

@app.post("/api/patients/{patient_id}/vitals")
def push_vitals(patient_id: str, reading: VitalsReading):
    return {"status": "received", "patient_id": patient_id}


# Ambulance Endpoints
@app.get("/api/ambulances")
def get_ambulances():
    return AMBULANCES


# Routing Endpoints
@app.post("/api/dispatch")
async def dispatch_ambulance(req: DispatchRequest):
    prediction = predict_acuity(req.vitals)
    scored = route_patient(req.lat, req.lng, prediction)
    
    best = next((h for h in scored if not h["rejection_reason"]), None)

    if not best:
        return {"status": "error", "message": "No eligible hospitals"}

    result = {
        "status": "success",
        "prediction": prediction,
        "routed_to": best["hospital_name"],
        "hospital_id": best["hospital_id"],
        "transit_time_min": best["transit_min"],
        "survivability_score": best["survivability_score"],
        "all_hospitals_scored": scored,
        "ambulance": {"lat": req.lat, "lng": req.lng},
    }

    await manager.broadcast_json({"type": "NEW_DISPATCH", "data": result})
    return result

@app.post("/api/route/single")
async def route_single(patient_id: str = "pat-001"):
    p = next((x for x in PATIENTS if x["id"] == patient_id), PATIENTS[0])
    vitals = Vitals(
        heart_rate=p.get("heart_rate", 110),
        systolic_bp=p.get("systolic_bp", 90),
        respiratory_rate=p.get("respiratory_rate", 22),
        gcs=p.get("gcs_score", 11),
        symptoms=p.get("chief_complaint", "Emergency"),
    )
    prediction = predict_acuity(vitals)
    scored = route_patient(19.012, 72.836, prediction)
    best = next((h for h in scored if not h["rejection_reason"]), None)
    return {
        "status": "success",
        "patient_id": patient_id,
        "prediction": prediction,
        "routed_to": best["hospital_name"] if best else None,
        "hospital_id": best["hospital_id"] if best else None,
        "all_hospitals_scored": scored,
    }


# WebSocket
@app.websocket("/ws/dispatch")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
    except WebSocketDisconnect:
        manager.disconnect(websocket)
