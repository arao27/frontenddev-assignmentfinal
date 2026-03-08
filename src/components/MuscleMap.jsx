import React from 'react';
import { calculateMusclePoints } from '../utils/calculateRanks';

function MuscleMap({ stats }) {
  const points = calculateMusclePoints(stats);

  return (
    <div style={{ border: '1px solid #ccc', padding: '16px', marginTop: '16px' }}>
      <h3>Muscle Map</h3>
      <ul>
        {Object.entries(points).map(([muscle, value]) => (
          <li key={muscle}>
            {muscle}: {value} / 5
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MuscleMap;