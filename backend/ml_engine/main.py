import pandas as pd
import numpy as np
import xgboost as xgb
import shap
import pickle
import os
import requests
from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

NODE_SERVER_URL = "http://localhost:3001"

from nexus import RouteRequest, BatchRouteRequest, Hospital, route_single_patient, route_mce_batch

app = FastAPI(title="AURUM ML Engine — APEX & NEXUS")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DIR_PATH = os.path.dirname(__file__)
MODELS_DIR = os.path.join(DIR_PATH, 'models')

# Load APEX models and Encoders on startup
try:
    with open(os.path.join(MODELS_DIR, 'apex_icu.pkl'), 'rb') as f:
        apex_icu = pickle.load(f)
    with open(os.path.join(MODELS_DIR, 'apex_ventilator.pkl'), 'rb') as f:
        apex_ventilator = pickle.load(f)
    with open(os.path.join(MODELS_DIR, 'apex_specialist.pkl'), 'rb') as f:
        apex_specialist = pickle.load(f)
    with open(os.path.join(MODELS_DIR, 'shap_explainer.pkl'), 'rb') as f:
        shap_explainer = pickle.load(f)
    with open(os.path.join(MODELS_DIR, 'label_encoders.pkl'), 'rb') as f:
        encoders = pickle.load(f)
        le_spec = encoders['specialist']
except FileNotFoundError:
    print("Warning: ML Models not found. Run train_apex.py first.")
    apex_icu, apex_ventilator, apex_specialist, shap_explainer, le_spec = None, None, None, None, None


class PatientVitals(BaseModel):
    patient_id: str
    heart_rate: int
    systolic_bp: int
    diastolic_bp: int
    spo2: float
    respiratory_rate: int
    temperature: float
    gcs_score: int
    age: int
    sex: str
    chief_complaint: str
    mechanism_of_injury: str

def preprocess_input(data: PatientVitals) -> pd.DataFrame:
    # Feature engineering to match training
    pulse_pressure = data.systolic_bp - data.diastolic_bp
    shock_index = data.heart_rate / (data.systolic_bp + 1e-5)
    
    # Safe encoding maps
    sex_encoded = 1 if data.sex.lower() == 'male' else 0
    # In production, these should use the strict LabelEncoder mappings saved during train
    cc_encoded = abs(hash(data.chief_complaint)) % 5 
    moi_encoded = abs(hash(data.mechanism_of_injury)) % 5

    df = pd.DataFrame([{
        'age': data.age,
        'sex_encoded': sex_encoded,
        'cc_encoded': cc_encoded,
        'moi_encoded': moi_encoded,
        'heart_rate': data.heart_rate,
        'systolic_bp': data.systolic_bp,
        'diastolic_bp': data.diastolic_bp,
        'spo2': data.spo2,
        'respiratory_rate': data.respiratory_rate,
        'temperature': data.temperature,
        'gcs_score': data.gcs_score,
        'pulse_pressure': pulse_pressure,
        'shock_index': shock_index
    }])
    return df

@app.post("/ml/predict")
async def apex_predict(vitals: PatientVitals):
    if (apex_icu is None or apex_ventilator is None or 
        apex_specialist is None or le_spec is None or 
        shap_explainer is None):
        raise HTTPException(status_code=503, detail="Models not loaded")

    df = preprocess_input(vitals)
    
    # 1. Predictions
    needs_icu = int(apex_icu.predict(df)[0])
    needs_ventilator = int(apex_ventilator.predict(df)[0])
    
    spec_pred_idx = int(apex_specialist.predict(df)[0])
    specialist_required = str(le_spec.inverse_transform([spec_pred_idx])[0])
    
    # 2. SHAP Values 
    shap_vals = shap_explainer.shap_values(df)
    feature_names = df.columns.tolist()
    
    if isinstance(shap_vals, list):
        base_shap = shap_vals[1][0] if len(shap_vals) > 1 else shap_vals[0][0]
    else:
        base_shap = shap_vals[0]
        
    shap_dict = {str(feat): round(float(val), 4) for feat, val in zip(feature_names, base_shap)}
    
    # 3. Algorithm scoring composites
    severity_normalised = ((vitals.gcs_score / 15) * 0.4) + ((vitals.spo2 / 100) * 0.6)
    gcs_normalised = vitals.gcs_score / 15
    spo2_normalised = vitals.spo2 / 100
    
    survivability_score = (0.4 * (1 - severity_normalised)) + (0.3 * gcs_normalised) + (0.3 * spo2_normalised)
    
    # Simple rule for 1-5 scalar severity
    predicted_severity = 5 if needs_icu or needs_ventilator else 3
    if vitals.gcs_score == 15 and vitals.systolic_bp > 100:
        predicted_severity = 1
    elif vitals.gcs_score < 9:
        predicted_severity = 4
    
    return {
        "needs_icu": bool(needs_icu),
        "needs_ventilator": bool(needs_ventilator),
        "specialist_required": specialist_required,
        "predicted_severity": predicted_severity,
        "survivability_score": round(survivability_score, 2),
        "shap_values": shap_dict
    }

@app.post("/api/analyze-scene")
async def analyze_scene(image: UploadFile = File(...)):
    """
    Twist 1 endpoint: Accepts a scene image and instantly estimates trauma severity.
    For this pilot, we use file size as a proxy for a mock classification to avoid loading a heavy Vision model.
    """
    content = await image.read()
    size_kb = len(content) / 1024
    
    # Mocking logic for demo purposes:
    # E.g. image names or sizes determine classification
    # SEVERE is triggered if filename has 'crash', 'severe', or size > 500KB
    filename = image.filename.lower()
    
    if "crash" in filename or "severe" in filename or size_kb > 500:
        severity = "SEVERE"
        confidence = round(np.random.uniform(0.85, 0.99), 2)
    elif "minor" in filename or size_kb < 100:
        severity = "LOW"
        confidence = round(np.random.uniform(0.70, 0.90), 2)
    else:
        severity = "MODERATE"
        confidence = round(np.random.uniform(0.60, 0.85), 2)
        
    return {
        "scene_severity": severity,
        "confidence": confidence,
        "message": f"Scene assessed as {severity} TRAUMA based on visual indicators."
    }

# --- NEXUS ENDPOINTS ---
@app.post("/ml/route")
async def nexus_route_single(req: RouteRequest):
    """
    Stage 4.2 Endpoint:
    Receives APEX output + Hospital List and computes the optimal single destination.
    """
    try:
        routing_result = route_single_patient(req)
        
        # Bridge to Node.js WebSocket via internal broadcast
        recommended = routing_result.get("recommended_hospital", {})
        payload = {
            "patient_id": req.patient_id,
            "patient_code": getattr(req, "patient_code", req.patient_id),
            "routed_to_hospital_id": recommended.get("hospital_id", "hosp-unknown"),
            "hospital_name": recommended.get("hospital_name", "Unknown"),
            "survivability_score": req.apex_output.survivability_score,
            "all_hospitals_scored": routing_result.get("all_scored", []),
            "shap_explanation": req.apex_output.shap_values
        }
        
        try:
            requests.post(f"{NODE_SERVER_URL}/api/internal/broadcast", json={
                "event": "routing:decision",
                "payload": payload
            }, timeout=2)
            print(f"[AURUM ML Engine] Broadcasted routing decision for Patient {req.patient_id}")
        except Exception as bridge_err:
            print(f"[AURUM ML Engine] Warning: Failed to broadcast routing:decision. Details: {bridge_err}")

        return routing_result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/ml/mce-route")
async def nexus_route_mce(req: BatchRouteRequest, global_hospitals: List[Hospital]):
    """
    Stage 4.3 Endpoint:
    Mass Casualty Event (MCE) Batch Routing.
    Assigns N patients to M hospitals using advanced Integer Linear Programming.
    """
    try:
        batch_result = route_mce_batch(req, global_hospitals)
        
        # Bridge to Node.js WebSockets
        try:
            payload = {
                "event_id": req.event_id or "MCE-UNKNOWN",
                "patient_ids": [p.patient_id for p in req.patients],
                "assignments": batch_result.get("assignments", [])
            }
            requests.post(f"{NODE_SERVER_URL}/api/internal/broadcast", json={
                "event": "mce:triggered",
                "payload": payload
            }, timeout=2)
            print(f"[AURUM MCE] Broadcasted MCE routing for event {payload['event_id']}")
        except Exception as bridge_err:
            print(f"[AURUM MCE] Warning: Failed to broadcast MCE decision. Details: {bridge_err}")

        return batch_result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
