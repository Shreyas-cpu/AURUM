import React from 'react';

/**
 * SHAP Explainability Panel — horizontal bar chart of feature importances.
 * shapExplanation: { feature_name: importance_value (0–1) }
 */
export default function ShapPanel({ shapExplanation, title = 'APEX — Why this routing?' }) {
  if (!shapExplanation) return null;

  const entries = Object.entries(shapExplanation)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 7);

  const maxVal = entries[0]?.[1] || 1;

  const featureLabels = {
    gcs_score:           'GCS Score',
    systolic_bp:         'Systolic BP',
    spo2:                'SpO₂ Level',
    heart_rate:          'Heart Rate',
    age:                 'Patient Age',
    mechanism_of_injury: 'Mechanism of Injury',
    respiratory_rate:    'Respiratory Rate',
    diastolic_bp:        'Diastolic BP',
    temperature:         'Temperature',
  };

  const getColor = (rank) => {
    if (rank === 0) return '#e84545';
    if (rank === 1) return '#f59e0b';
    if (rank === 2) return '#3b82f6';
    return '#7a8a9a';
  };

  return (
    <div className="aurum-card">
      <div className="flex items-center gap-2 mb-4">
        <span className="badge-apex">SHAP</span>
        <span className="text-xs font-semibold text-aurum-text-sec">{title}</span>
      </div>
      <div className="space-y-3">
        {entries.map(([feature, value], i) => (
          <div key={feature} className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-aurum-text-sec">
                {featureLabels[feature] || feature}
              </span>
              <span className="text-xs font-mono font-bold" style={{ color: getColor(i) }}>
                {(value * 100).toFixed(0)}%
              </span>
            </div>
            <div className="load-bar-track">
              <div
                className="shap-bar"
                style={{
                  width: `${(value / maxVal) * 100}%`,
                  background: getColor(i),
                  boxShadow: i < 3 ? `0 0 8px ${getColor(i)}60` : 'none',
                  transition: 'width 0.6s ease',
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <p className="text-[10px] text-aurum-text-ter mt-4 leading-relaxed">
        Feature importance values computed by XGBoost + SHAP for this routing decision.
      </p>
    </div>
  );
}
