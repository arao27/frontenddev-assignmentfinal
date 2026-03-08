import React, { useState, useEffect } from 'react';
import { useStats } from '../contexts/StatsContext';
import StatInput from '../components/StatInput';
import './StatsPage.css'; // Make sure path matches

// Internal keys for lifts
const LIFT_STATS = ['bench','squat','deadlift','dips','pullup','ohp','bicepCurl'];

// Friendly labels for display
const STAT_LABELS = {
  bodyweight: "Bodyweight",
  bench: "Barbell Bench Press",
  squat: "Barbell Back Squat",
  deadlift: "Traditional Deadlift",
  dips: "Weighted Dips (don't include your bodyweight)",
  pullup: "Weighted Pull-ups (don't include your bodyweight)",
  ohp: "Barbell Overhead Press",
  bicepCurl: "Bicep Curl",
};

function StatsPage() {
  const { stats, updateStat } = useStats();
  const [unit, setUnit] = useState('kg'); // kg or lbs
  const [localInputs, setLocalInputs] = useState({});

  // Initialize localInputs from context stats
  useEffect(() => {
    const init = {};
    init.bodyweight = stats.bodyweight != null
      ? (unit === 'kg' ? stats.bodyweight.toString() : (stats.bodyweight * 2.20462).toFixed(0))
      : '';
    LIFT_STATS.forEach(stat => {
      init[stat] = stats[stat] != null
        ? (unit === 'kg' ? stats[stat].toString() : (stats[stat] * 2.20462).toFixed(0))
        : '';
    });
    setLocalInputs(init);
  }, [stats, unit]);

  // Handle typing
  const handleChange = (stat, val) => {
    setLocalInputs(prev => ({ ...prev, [stat]: val }));
  };

  // Save to context on blur
  const handleBlur = (stat) => {
    const val = localInputs[stat];
    if (val === '') {
      updateStat(stat, null);
    } else {
      const parsed = parseFloat(val);
      if (!isNaN(parsed)) {
        const valInKg = unit === 'kg' ? parsed : parsed / 2.20462;
        updateStat(stat, valInKg);
      }
    }
  };

  // Handle unit change
  const handleUnitChange = (newUnit) => {
    setUnit(newUnit);
    // Convert localInputs to new unit for display
    setLocalInputs(prev => {
      const converted = {};
      converted.bodyweight = stats.bodyweight != null
        ? (newUnit === 'kg' ? stats.bodyweight.toString() : (stats.bodyweight * 2.20462).toFixed(0))
        : '';
      LIFT_STATS.forEach(stat => {
        const val = stats[stat];
        converted[stat] = val != null
          ? (newUnit === 'kg' ? val.toString() : (val * 2.20462).toFixed(0))
          : '';
      });
      return converted;
    });
  };

  return (
    <div className="stats-page">

      {/* LEFT COLUMN */}
      <div className="stats-left">
        <div className="input-group">
          <label>Gender:</label>
          <select
            value={stats.gender || 'male'}
            onChange={(e) => updateStat('gender', e.target.value)}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div className="input-group">
          <label>Units:</label>
          <select value={unit} onChange={(e) => handleUnitChange(e.target.value)}>
            <option value="kg">kg</option>
            <option value="lbs">lbs</option>
          </select>
        </div>

        <StatInput
          label={STAT_LABELS.bodyweight}
          name="bodyweight"
          value={localInputs.bodyweight || ''}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>

      {/* RIGHT COLUMN */}
      <div className="stats-right">
        {LIFT_STATS.map(stat => (
          <StatInput
            key={stat}
            label={STAT_LABELS[stat] || stat}
            name={stat}
            value={localInputs[stat] || ''}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        ))}
      </div>

    </div>
  );
}

export default StatsPage;