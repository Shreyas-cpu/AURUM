import { useState, useEffect, useRef } from "react";

// ─── Survivability Ring ───────────────────────────────────────────────────────
function SurvivabilityRing({ score = 87 }) {
  const r = 54;
  const circ = 2 * Math.PI * r;
  const [animated, setAnimated] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(score), 120);
    return () => clearTimeout(t);
  }, [score]);

  const offset = circ - (animated / 100) * circ;
  const color = score >= 75 ? "#22d3ee" : score >= 50 ? "#facc15" : "#f87171";

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative w-36 h-36">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 128 128">
          <circle cx="64" cy="64" r={r} fill="none" stroke="#1e293b" strokeWidth="12" />
          <circle
            cx="64" cy="64" r={r} fill="none"
            stroke={color} strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(.4,0,.2,1), stroke 0.4s" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-black text-white tracking-tight">{score}%</span>
          <span className="text-[10px] font-semibold tracking-widest uppercase" style={{ color }}>Survival</span>
        </div>
      </div>
      <p className="text-xs text-slate-400 font-medium tracking-wide">AI Predicted Score</p>
    </div>
  );
}

// ─── Pulse Mic Button ─────────────────────────────────────────────────────────
function MicButton({ active, onToggle }) {
  return (
    <button
      onClick={onToggle}
      aria-label="Voice input"
      className="relative flex items-center justify-center w-16 h-16 rounded-full focus:outline-none focus:ring-4 focus:ring-cyan-500/40 transition-all duration-200"
      style={{
        background: active
          ? "linear-gradient(135deg,#ef4444,#dc2626)"
          : "linear-gradient(135deg,#0ea5e9,#0284c7)",
        boxShadow: active
          ? "0 0 0 0 rgba(239,68,68,0.6)"
          : "0 0 0 0 rgba(14,165,233,0.6)",
      }}
    >
      {/* Pulse rings */}
      {!active && (
        <>
          <span className="absolute inset-0 rounded-full animate-ping opacity-30 bg-sky-400" />
          <span className="absolute inset-0 rounded-full animate-ping opacity-20 bg-sky-400" style={{ animationDelay: "0.4s" }} />
        </>
      )}
      {active && (
        <span className="absolute inset-0 rounded-full animate-ping opacity-40 bg-red-400" />
      )}
      {/* Mic icon */}
      <svg className="w-7 h-7 text-white relative z-10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <rect x="9" y="2" width="6" height="12" rx="3" fill="currentColor" stroke="none" />
        <path d="M5 10a7 7 0 0 0 14 0" strokeLinecap="round" />
        <line x1="12" y1="17" x2="12" y2="21" strokeLinecap="round" />
        <line x1="8" y1="21" x2="16" y2="21" strokeLinecap="round" />
      </svg>
    </button>
  );
}

// ─── Vital Input ──────────────────────────────────────────────────────────────
function VitalInput({ label, unit, placeholder, value, onChange, icon }) {
  return (
    <div className="flex-1 min-w-0 bg-slate-800/70 border border-slate-700 rounded-2xl p-4 flex flex-col gap-2 focus-within:border-cyan-500 transition-colors duration-200">
      <div className="flex items-center gap-2">
        <span className="text-lg">{icon}</span>
        <span className="text-xs font-bold tracking-widest uppercase text-slate-400">{label}</span>
      </div>
      <input
        type="text"
        inputMode="numeric"
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="bg-transparent text-white text-2xl font-black w-full placeholder-slate-600 focus:outline-none"
      />
      <span className="text-xs text-slate-500 font-semibold">{unit}</span>
    </div>
  );
}

// ─── Symptom Chip ─────────────────────────────────────────────────────────────
const SYMPTOMS = [
  { label: "Blunt Trauma", color: "amber", icon: "💥" },
  { label: "Cardiac", color: "red", icon: "❤️" },
  { label: "Burns", color: "orange", icon: "🔥" },
  { label: "Neuro", color: "purple", icon: "🧠" },
  { label: "Hemorrhage", color: "rose", icon: "🩸" },
  { label: "Airway", color: "sky", icon: "💨" },
  { label: "Fracture", color: "teal", icon: "🦴" },
  { label: "Toxicology", color: "green", icon: "⚗️" },
];

const colorMap = {
  amber: "border-amber-500 bg-amber-500/20 text-amber-300",
  red: "border-red-500 bg-red-500/20 text-red-300",
  orange: "border-orange-500 bg-orange-500/20 text-orange-300",
  purple: "border-purple-500 bg-purple-500/20 text-purple-300",
  rose: "border-rose-500 bg-rose-500/20 text-rose-300",
  sky: "border-sky-500 bg-sky-500/20 text-sky-300",
  teal: "border-teal-500 bg-teal-500/20 text-teal-300",
  green: "border-green-500 bg-green-500/20 text-green-300",
};

const inactiveChip = "border-slate-700 bg-slate-800/50 text-slate-400";

// ─── View 1: Intake ───────────────────────────────────────────────────────────
function IntakeView({ onSubmit }) {
  const [hr, setHr] = useState("");
  const [bp, setBp] = useState("");
  const [spo2, setSpo2] = useState("");
  const [chips, setChips] = useState([]);
  const [notes, setNotes] = useState("");
  const [mic, setMic] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleChip = (label) =>
    setChips(prev => prev.includes(label) ? prev.filter(c => c !== label) : [...prev, label]);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSubmit();
    }, 1800);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-slate-950/95 backdrop-blur border-b border-slate-800/80 px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-red-500/20 border border-red-500/40 flex items-center justify-center">
            <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 5h2v6h-2V7zm0 8h2v2h-2v-2z" />
            </svg>
          </div>
          <div>
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-500">Emergency Triage</p>
            <p className="text-sm font-black tracking-tight text-white leading-none">Unit A-42</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
          </span>
          <span className="text-[10px] text-green-400 font-bold tracking-widest uppercase">Live</span>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-4 pt-5 pb-32 space-y-6">
        {/* Vitals */}
        <section>
          <SectionLabel>Patient Vitals</SectionLabel>
          <div className="flex gap-3 mt-3">
            <VitalInput label="Heart Rate" unit="bpm" placeholder="72" icon="💓" value={hr} onChange={setHr} />
            <VitalInput label="SpO₂" unit="%" placeholder="98" icon="🫁" value={spo2} onChange={setSpo2} />
          </div>
          <div className="mt-3">
            <VitalInput label="Blood Pressure" unit="sys/dia mmHg" placeholder="120/80" icon="🩺" value={bp} onChange={setBp} />
          </div>
        </section>

        {/* Voice Input */}
        <section>
          <SectionLabel>Voice Symptom Input</SectionLabel>
          <div className="mt-3 bg-slate-800/50 border border-slate-700 rounded-2xl p-4 flex items-center gap-4">
            <MicButton active={mic} onToggle={() => setMic(m => !m)} />
            <div className="flex-1 min-w-0">
              {mic ? (
                <div>
                  <p className="text-red-400 font-bold text-sm animate-pulse">Recording…</p>
                  <p className="text-slate-500 text-xs mt-0.5">Speak patient symptoms clearly</p>
                </div>
              ) : (
                <div>
                  <p className="text-white font-bold text-sm">Tap to Record</p>
                  <p className="text-slate-500 text-xs mt-0.5">Hands-free symptom entry</p>
                </div>
              )}
              {/* Waveform decoration */}
              {mic && (
                <div className="flex items-end gap-0.5 mt-2 h-6">
                  {[3, 5, 8, 4, 7, 5, 9, 3, 6, 4, 8, 5, 3, 7, 4].map((h, i) => (
                    <span
                      key={i}
                      className="w-1 rounded-full bg-red-400 animate-pulse"
                      style={{ height: `${h * 3}px`, animationDelay: `${i * 60}ms` }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Symptom Chips */}
        <section>
          <SectionLabel>Quick Symptom Tags</SectionLabel>
          <div className="mt-3 flex flex-wrap gap-2.5">
            {SYMPTOMS.map(s => (
              <button
                key={s.label}
                onClick={() => toggleChip(s.label)}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl border text-sm font-bold transition-all duration-150 active:scale-95 ${chips.includes(s.label) ? colorMap[s.color] : inactiveChip}`}
              >
                <span>{s.icon}</span>{s.label}
              </button>
            ))}
          </div>
        </section>

        {/* Notes */}
        <section>
          <SectionLabel>Additional Notes</SectionLabel>
          <textarea
            rows={3}
            placeholder="Scene details, mechanism of injury, medications…"
            value={notes}
            onChange={e => setNotes(e.target.value)}
            className="mt-3 w-full bg-slate-800/70 border border-slate-700 focus:border-cyan-500 rounded-2xl p-4 text-white text-sm placeholder-slate-600 focus:outline-none resize-none transition-colors duration-200 leading-relaxed"
          />
        </section>
      </div>

      {/* CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-slate-950 via-slate-950/95 to-transparent pt-8 z-20">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full h-16 rounded-2xl font-black text-lg tracking-wide transition-all duration-200 active:scale-[.98] focus:outline-none focus:ring-4 focus:ring-cyan-500/30 disabled:opacity-80"
          style={{
            background: loading
              ? "linear-gradient(90deg,#0369a1,#0891b2)"
              : "linear-gradient(90deg,#0ea5e9,#06b6d4,#0ea5e9)",
            backgroundSize: "200% 100%",
            animation: !loading ? "shimmer 2.4s linear infinite" : "none",
            boxShadow: "0 0 40px rgba(14,165,233,0.3)",
          }}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-3">
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Analyzing Patient Data…
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
              </svg>
              Calculate Optimal Route
            </span>
          )}
        </button>
      </div>

      <style>{`
        @keyframes shimmer {
          0%   { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
      `}</style>
    </div>
  );
}

// ─── View 2: Routing Result ───────────────────────────────────────────────────
function RoutingView({ onReset }) {
  const [confirmed, setConfirmed] = useState(false);

  const rationale = [
    { ok: true,  text: "Level I Trauma Center verified" },
    { ok: true,  text: "ICU bed available (2 of 4)" },
    { ok: true,  text: "Neurosurgeon on duty" },
    { ok: true,  text: "Cath lab ready — 4 min prep" },
    { ok: false, text: "St. Mary's (1.1 mi) — ER saturated" },
    { ok: false, text: "Riverside (0.8 mi) — No neuro capacity" },
  ];

  const altHospitals = [
    { name: "St. Mary's Medical", eta: "7 min", dist: "1.1 mi", status: "Saturated", statusColor: "text-red-400" },
    { name: "Riverside General", eta: "9 min", dist: "1.8 mi", status: "No Neuro", statusColor: "text-orange-400" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-slate-950/95 backdrop-blur border-b border-slate-800/80 px-5 py-4 flex items-center justify-between">
        <button onClick={onReset} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors p-1 -ml-1">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-sm font-semibold">Retriage</span>
        </button>
        <div className="text-center">
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-500">Routing Result</p>
          <p className="text-sm font-black text-white leading-none">Unit A-42</p>
        </div>
        <div className="w-16" />
      </header>

      <div className="flex-1 overflow-y-auto px-4 pt-5 pb-36 space-y-5">
        {/* Primary Destination */}
        <div
          className="rounded-3xl p-5 border border-cyan-500/30 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(8,145,178,0.15) 0%, rgba(15,23,42,0.9) 60%)",
            boxShadow: "0 0 60px rgba(8,145,178,0.12) inset",
          }}
        >
          {/* Glow accent */}
          <div className="absolute -top-8 -right-8 w-40 h-40 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-start justify-between gap-3 relative z-10">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-black tracking-[0.2em] uppercase text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 px-2.5 py-1 rounded-full">
                  ✦ Optimal Match
                </span>
              </div>
              <h2 className="text-xl font-black text-white mt-2 leading-tight">City General<br />Trauma Center</h2>
              <p className="text-slate-400 text-sm mt-1">1400 Emergency Dr, Downtown</p>
              <div className="flex gap-4 mt-4">
                <div>
                  <p className="text-3xl font-black text-white">12<span className="text-lg font-bold text-cyan-400"> min</span></p>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">ETA</p>
                </div>
                <div className="w-px bg-slate-700" />
                <div>
                  <p className="text-3xl font-black text-white">4.2<span className="text-lg font-bold text-cyan-400"> mi</span></p>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">Distance</p>
                </div>
              </div>
            </div>
            <SurvivabilityRing score={87} />
          </div>
          {/* Route bar */}
          <div className="relative z-10 mt-5 bg-slate-900/60 rounded-xl p-3 flex items-center gap-3">
            <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-teal-400"
                style={{ width: "30%", transition: "width 1.5s ease-out", animation: "routeProg 1.5s ease-out forwards" }}
              />
            </div>
            <span className="text-xs text-cyan-400 font-bold whitespace-nowrap">En route</span>
          </div>
        </div>

        {/* AI Rationale */}
        <section>
          <SectionLabel>AI Decision Rationale</SectionLabel>
          <div className="mt-3 bg-slate-900/60 border border-slate-800 rounded-2xl divide-y divide-slate-800/80 overflow-hidden">
            {rationale.map((r, i) => (
              <div key={i} className="flex items-center gap-3 px-4 py-3.5">
                <span className={`text-base w-5 text-center flex-shrink-0 ${r.ok ? "text-emerald-400" : "text-red-400"}`}>
                  {r.ok ? "✅" : "❌"}
                </span>
                <span className={`text-sm font-semibold ${r.ok ? "text-slate-200" : "text-slate-400"}`}>{r.text}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Alternative hospitals */}
        <section>
          <SectionLabel>Alternatives Considered</SectionLabel>
          <div className="mt-3 space-y-2.5">
            {altHospitals.map((h, i) => (
              <div key={i} className="bg-slate-900/50 border border-slate-800 rounded-2xl px-4 py-3.5 flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-bold text-slate-300">{h.name}</p>
                  <p className={`text-xs font-semibold mt-0.5 ${h.statusColor}`}>{h.status}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-bold text-slate-400">{h.eta}</p>
                  <p className="text-xs text-slate-600">{h.dist}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Capacity Bars */}
        <section>
          <SectionLabel>Destination Capacity</SectionLabel>
          <div className="mt-3 bg-slate-900/60 border border-slate-800 rounded-2xl p-4 space-y-4">
            {[
              { label: "ICU Beds", value: 50, color: "bg-emerald-500", text: "2 / 4 available" },
              { label: "Trauma Bays", value: 75, color: "bg-cyan-500", text: "3 of 4 ready" },
              { label: "OR Capacity", value: 60, color: "bg-sky-400", text: "Moderate load" },
              { label: "ER Load", value: 45, color: "bg-teal-400", text: "Low — 12 pts" },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{item.label}</span>
                  <span className="text-xs font-semibold text-slate-400">{item.text}</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${item.color}`}
                    style={{ width: `${item.value}%`, transition: "width 1.2s ease-out" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-slate-950 via-slate-950/95 to-transparent pt-8 z-20">
        {confirmed ? (
          <div className="w-full h-16 rounded-2xl bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center gap-3">
            <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-emerald-300 font-black text-lg tracking-wide">Transport Confirmed</span>
          </div>
        ) : (
          <button
            onClick={() => setConfirmed(true)}
            className="w-full h-16 rounded-2xl font-black text-lg tracking-wide text-white transition-all duration-200 active:scale-[.98] focus:outline-none focus:ring-4 focus:ring-emerald-500/30"
            style={{
              background: "linear-gradient(90deg,#16a34a,#15803d,#16a34a)",
              backgroundSize: "200%",
              animation: "shimmer 3s linear infinite",
              boxShadow: "0 0 40px rgba(22,163,74,0.3)",
            }}
          >
            <span className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Begin Transport to City General
            </span>
          </button>
        )}
      </div>

      <style>{`
        @keyframes shimmer {
          0%   { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes routeProg {
          from { width: 0% }
          to   { width: 30% }
        }
      `}</style>
    </div>
  );
}

// ─── Shared label ─────────────────────────────────────────────────────────────
function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-px flex-1 bg-slate-800" />
      <span className="text-[10px] font-black tracking-[0.18em] uppercase text-slate-500 px-1">{children}</span>
      <div className="h-px flex-1 bg-slate-800" />
    </div>
  );
}

// ─── App Root ─────────────────────────────────────────────────────────────────
export default function App() {
  const [view, setView] = useState("intake");

  return (
    <div className="max-w-md mx-auto min-h-screen">
      {view === "intake"
        ? <IntakeView onSubmit={() => setView("routing")} />
        : <RoutingView onReset={() => setView("intake")} />
      }
    </div>
  );
}
