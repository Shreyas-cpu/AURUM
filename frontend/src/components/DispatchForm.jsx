import React, { useState, useRef } from 'react';
import axios from 'axios';

export default function DispatchForm() {
  const [vitals, setVitals] = useState({
    heart_rate: 90,
    systolic_bp: 120,
    respiratory_rate: 18,
    gcs: 15,
    symptoms: "Minor trauma"
  });
  const [lat, setLat] = useState(18.5204);
  const [lng, setLng] = useState(73.8567);
  const [status, setStatus] = useState(null);
  
  // Phase 1: Twist 1 - Vision Assessment State
  const [sceneSeverity, setSceneSeverity] = useState(null);
  const [analyzingScene, setAnalyzingScene] = useState(false);
  const fileInputRef = useRef(null);

  const handleSceneUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setAnalyzingScene(true);
    setStatus("Analyzing scene...");
    
    const formData = new FormData();
    formData.append("image", file);

    try {
      // Connects to the FastAPI endpoint from Phase 1
      const API_URL = import.meta.env.VITE_ML_API_BASE_URL || "http://localhost:8000";
      const res = await axios.post(`${API_URL}/api/analyze-scene`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      
      const { scene_severity, message } = res.data;
      setSceneSeverity(scene_severity);
      setStatus(`Scene Analysis Complete: ${message}`);
    } catch (err) {
      console.error(err);
      setStatus("Failed to analyze scene image.");
    } finally {
      setAnalyzingScene(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Dispatching...");
    try {
      const payload = {
        vitals, 
        lat: parseFloat(lat), 
        lng: parseFloat(lng),
        scene_severity: sceneSeverity // Pass severity to backend for strictly routing to Trauma level 1
      };
      
      const res = await axios.post("http://localhost:8000/api/dispatch", payload);
      if (res.data.status === "success") {
        setStatus(`Successfully dispatched to ${res.data.routed_to}`);
      } else {
        setStatus("Error: " + res.data.message);
      }
    } catch (err) {
      console.error(err);
      setStatus("Failed to connect to backend");
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
      <h2 className="text-xl font-bold mb-4 text-gray-800">New Dispatch</h2>

      {/* Twist 1: Pre-Triage Photo Assessment */}
      <div className="mb-6 p-4 border border-dashed border-gray-300 rounded bg-gray-50 text-center">
        <h3 className="text-sm font-semibold text-gray-600 mb-2">1. Quick Scene Scan</h3>
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleSceneUpload} 
          ref={fileInputRef}
          className="hidden" 
        />
        <button 
          onClick={() => fileInputRef.current.click()}
          disabled={analyzingScene}
          className="w-full bg-slate-200 text-slate-700 p-2 rounded text-sm hover:bg-slate-300 transition"
        >
          {analyzingScene ? "Scanning..." : "Upload Scene Photo"}
        </button>

        {sceneSeverity && (
          <div className={`mt-3 p-2 text-xs font-bold rounded ${sceneSeverity === 'SEVERE' ? 'bg-red-100 text-red-700 border-l-4 border-red-500' : 'bg-green-100 text-green-700'}`}>
            {sceneSeverity === 'SEVERE' ? 'CRITICAL SCENE DETECTED. AUTO-LOCKING TO LEVEL 1 TRAUMA CENTERS.' : `SCENE: ${sceneSeverity} TRAUMA`}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600">Heart Rate</label>
          <input type="number" value={vitals.heart_rate} onChange={e => setVitals({...vitals, heart_rate: parseInt(e.target.value)})} className="mt-1 block w-full border rounded p-2 text-gray-800 focus:ring-red-500 focus:border-red-500 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">Systolic BP</label>
          <input type="number" value={vitals.systolic_bp} onChange={e => setVitals({...vitals, systolic_bp: parseInt(e.target.value)})} className="mt-1 block w-full border rounded p-2 text-gray-800 focus:ring-red-500 focus:border-red-500 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">GCS (3-15)</label>
          <input type="number" value={vitals.gcs} onChange={e => setVitals({...vitals, gcs: parseInt(e.target.value)})} className="mt-1 block w-full border rounded p-2 text-gray-800 focus:ring-red-500 focus:border-red-500 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">Respiratory Rate</label>
          <input type="number" value={vitals.respiratory_rate} onChange={e => setVitals({...vitals, respiratory_rate: parseInt(e.target.value)})} className="mt-1 block w-full border rounded p-2 text-gray-800 focus:ring-red-500 focus:border-red-500 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">Symptoms</label>
          <input type="text" value={vitals.symptoms} onChange={e => setVitals({...vitals, symptoms: e.target.value})} className="mt-1 block w-full border rounded p-2 text-gray-800 focus:ring-red-500 focus:border-red-500 outline-none" />
        </div>
        <div className="flex space-x-2">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-600">Patient Lat</label>
            <input type="number" step="any" value={lat} onChange={e => setLat(e.target.value)} className="mt-1 block w-full border rounded p-2 text-gray-800" />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-600">Patient Lng</label>
            <input type="number" step="any" value={lng} onChange={e => setLng(e.target.value)} className="mt-1 block w-full border rounded p-2 text-gray-800" />
          </div>
        </div>
        <button type="submit" className="w-full bg-red-600 text-white p-2 rounded font-bold hover:bg-red-700 transition">Dispatch Ambulance</button>
      </form>
      {status && <div className="mt-4 text-sm text-gray-800 bg-gray-100 p-3 rounded font-medium border-l-4 border-red-500">{status}</div>}
    </div>
  );
}
