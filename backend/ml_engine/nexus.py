"""
NEXUS Constraint Optimizer (PuLP / Routing Logic)
Handles routing for single patients and mass casualty events (MCE).
"""

from pydantic import BaseModel
from typing import List, Dict, Any, Optional
import math
import pulp

# --- DATA MODELS ---

class Hospital(BaseModel):
    id: str
    name: str
    lat: float
    lng: float
    avail_icu_beds: int
    avail_gen_beds: int
    avail_ventilators: int
    current_load_pct: int
    has_trauma_centre: bool
    has_neurosurgery: bool
    has_cardiac_surgery: bool
    has_cath_lab: bool
    has_burn_unit: bool
    has_paediatrics: bool

class ApexOutput(BaseModel):
    needs_icu: bool
    needs_ventilator: bool
    specialist_required: str
    predicted_severity: int
    survivability_score: float
    shap_values: Optional[Dict[str, float]] = None

class RouteRequest(BaseModel):
    patient_id: str
    patient_lat: float
    patient_lng: float
    age: Optional[int] = None
    apex_output: ApexOutput
    hospitals_list: List[Hospital]

class BatchRouteRequest(BaseModel):
    event_id: str
    patients: List[RouteRequest]

# --- UTILS ---
global_roadblocks = []

def add_roadblock(lat: float, lng: float, radius_km: float = 2.0):
    global_roadblocks.append({'lat': lat, 'lng': lng, 'radius_km': radius_km})

def clear_roadblocks():
    global_roadblocks.clear()

def calculate_transit_time_min(lat1: float, lon1: float, lat2: float, lon2: float) -> int:
    """Mock routing API / Euclidean distance converted to minutes with dynamic roadblocks"""
    # 1 degree lat/lng ~= 111km. Assume ambulance speed 60km/h (1km/min)
    dist_deg = math.sqrt((lat1 - lat2)**2 + (lon1 - lon2)**2)
    dist_km = dist_deg * 111.0
    base_time = max(1, int(dist_km * 1.5)) # 1.5 mins per km in city traffic
    
    # Twist 2: Roadblock penalty
    for rb in global_roadblocks:
        # Distance from the roadblock to the start or end point. Check if roadblock intersects line segment
        # Using a very simple midpoint check for now to simulate route intersection
        mid_lat = (lat1 + lat2) / 2
        mid_lng = (lon1 + lon2) / 2
        mid_dist_km = math.sqrt((mid_lat - rb['lat'])**2 + (mid_lng - rb['lng'])**2) * 111.0

        if mid_dist_km < rb['radius_km']:
            base_time += 15 # +15 mins detour penalty
            
    return base_time

# --- CORE ALGORITHMS ---

def route_single_patient(req: RouteRequest) -> Dict[str, Any]:
    eligible_hospitals = []
    
    # 1. Hard Constraints Filtering
    for h in req.hospitals_list:
        if req.apex_output.needs_icu and h.avail_icu_beds <= 0:
            continue
        if not req.apex_output.needs_icu and h.avail_gen_beds <= 0:
            continue
        if req.apex_output.needs_ventilator and h.avail_ventilators <= 0:
            continue
            
        # Specialist filtering (mock translation of string to bool flags)
        if req.apex_output.specialist_required == "neurosurgeon" and not h.has_neurosurgery:
            continue
        if req.apex_output.specialist_required == "cardiologist" and (not h.has_cardiac_surgery and not h.has_cath_lab):
            continue
        if req.apex_output.specialist_required == "trauma_surgeon" and not h.has_trauma_centre:
            continue
        if req.apex_output.specialist_required == "burn_specialist" and not h.has_burn_unit:
            continue
        if req.age and req.age < 12 and not h.has_paediatrics:
             pass # Age not strictly passed in router yet, but placeholder
             
        eligible_hospitals.append(h)
    
    if not eligible_hospitals:
        return {"status": "failed", "reason": "No hospital meets hard constraints"}

    # 2. Compute Scores
    scored_hospitals = []
    max_transit = max([calculate_transit_time_min(req.patient_lat, req.patient_lng, h.lat, h.lng) for h in eligible_hospitals])
    if max_transit == 0: max_transit = 1
    
    for h in eligible_hospitals:
        transit_time = calculate_transit_time_min(req.patient_lat, req.patient_lng, h.lat, h.lng)
        
        # Weighted formula matching Prompt section 4.2
        transit_score = (1.0 - (transit_time / max_transit)) * 40.0
        survivability_boost = req.apex_output.survivability_score * 30.0
        load_score = (1.0 - (h.current_load_pct / 100.0)) * 20.0
        resource_richness = 1.0 * 10 # Simplified proxy: assume all hard constraints met equals 1.0
        
        total_score = transit_score + survivability_boost + load_score + resource_richness
        
        scored_hospitals.append({
            "hospital_id": h.id,
            "hospital_name": h.name,
            "transit_time_min": transit_time,
            "score": round(total_score, 2),
            "breakdown": {
                "transit": round(transit_score, 2),
                "survivability": round(survivability_boost, 2),
                "load": round(load_score, 2),
                "resource": round(resource_richness, 2)
            }
        })
        
    # Sort descending by score
    scored_hospitals.sort(key=lambda x: x["score"], reverse=True)
    
    return {
        "status": "success",
        "recommended_hospital": scored_hospitals[0],
        "all_scored": scored_hospitals
    }


def route_mce_batch(req: BatchRouteRequest, global_hospitals: List[Hospital]) -> Dict[str, Any]:
    """MCE Batch Routing using PuLP (Integer Linear Programming)"""
    # Create the problem
    prob = pulp.LpProblem("Mass_Casualty_Routing", pulp.LpMaximize)
    
    # Extract sets
    patients = req.patients
    P = [p.patient_id for p in patients]
    H = [h.id for h in global_hospitals]
    
    # Decision Variables: X[p][h] = 1 if patient p goes to hospital h
    X = pulp.LpVariable.dicts("Route", (P, H), cat="Binary")
    
    # Objective Function: Maximize overall survivability / inverse transit time
    objective_terms = []
    for p in patients:
        for h in global_hospitals:
            # Transit penalty
            t_time = calculate_transit_time_min(p.patient_lat, p.patient_lng, h.lat, h.lng)
            base_score = p.apex_output.survivability_score * 100 - (t_time * 0.5)
            
            # Apply hard constraint penalities (soften them heavily by setting score to deep negative so optimizer avoids)
            if p.apex_output.needs_icu and h.avail_icu_beds <= 0: base_score -= 10000
            if p.apex_output.needs_ventilator and h.avail_ventilators <= 0: base_score -= 10000
            if p.apex_output.specialist_required == "neurosurgeon" and not h.has_neurosurgery: base_score -= 10000
            
            objective_terms.append(base_score * X[p.patient_id][h.id])
            
    prob += pulp.lpSum(objective_terms)
    
    # Constraint 1: Each patient goes to exactly ONE hospital
    for pid in P:
        prob += pulp.lpSum([X[pid][hid] for hid in H]) == 1
        
    # Constraint 2: Hospital ICU capacity limits
    for h in global_hospitals:
        icu_requests = []
        gen_requests = []
        for p in patients:
            if p.apex_output.needs_icu:
                icu_requests.append(X[p.patient_id][h.id])
            else:
                gen_requests.append(X[p.patient_id][h.id])
                
        # Cant send more ICU patients than beds
        if icu_requests:
            prob += pulp.lpSum(icu_requests) <= h.avail_icu_beds
            
        # Cant send more Gen patients than beds
        if gen_requests:
            prob += pulp.lpSum(gen_requests) <= h.avail_gen_beds
            
        # Soft-Constraint: No hospital gets more than 40% of the total batch (load balancing)
        max_patients = max(1, int(len(patients) * 0.40))
        prob += pulp.lpSum([X[p.patient_id][h.id] for p in patients]) <= max_patients

    # Solve
    prob.solve(pulp.PULP_CBC_CMD(msg=False, timeLimit=2)) # 2 sec limit required by prompt
    
    if pulp.LpStatus[prob.status] != 'Optimal':
        return {"status": "failed", "reason": "Optimizer could not find valid constrained routes"}
        
    assignments = []
    for pid in P:
        for hid in H:
            if pulp.value(X[pid][hid]) == 1.0:
                h_target = next(h for h in global_hospitals if h.id == hid)
                p_target = next(p for p in patients if p.patient_id == pid)
                assignments.append({
                    "patient_id": pid,
                    "hospital_id": hid,
                    "hospital_name": h_target.name,
                    "transit_min": calculate_transit_time_min(p_target.patient_lat, p_target.patient_lng, h_target.lat, h_target.lng)
                })
                
    return {
        "status": "success",
        "assignments": assignments
    }
