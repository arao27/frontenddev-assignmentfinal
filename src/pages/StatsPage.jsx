import React from 'react';
import { useStats } from '../contexts/StatsContext';
import StatInput from '../components/StatInput';
import MuscleMap from '../components/MuscleMap';

function StatsPage() {
  const { stats, updateStat } = useStats();

  return (
    <div style={{ padding: '16px' }}>
      <h2>Your Stats</h2>

      <div style={{ marginBottom: '16px' }}>
        <label>Gender: </label>
        <select
          value={stats.gender}
          onChange={e => updateStat('gender', e.target.value)}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <StatInput label="Bodyweight (kg)" name="bodyweight" value={stats.bodyweight} onChange={updateStat} />
      <StatInput label="Bench" name="bench" value={stats.bench} onChange={updateStat} />
      <StatInput label="Squat" name="squat" value={stats.squat} onChange={updateStat} />
      <StatInput label="Deadlift" name="deadlift" value={stats.deadlift} onChange={updateStat} />
      <StatInput label="Dips" name="dips" value={stats.dips} onChange={updateStat} />
      <StatInput label="Pull Ups" name="pullup" value={stats.pullup} onChange={updateStat} />
      <StatInput label="OHP" name="ohp" value={stats.ohp} onChange={updateStat} />
      <StatInput label="Bicep Curl" name="bicepCurl" value={stats.bicepCurl} onChange={updateStat} />

      <MuscleMap stats={stats} />
    </div>
  );
}

export default StatsPage;