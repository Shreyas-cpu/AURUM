import React, { useState } from 'react';
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Dispatching...");
    try {
      const res = await axios.post("http://localhost:8000/api/dispatch", {
        vitals, lat: parseFloat(lat), lng: parseFloat(lng)
      });
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
