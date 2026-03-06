// src/components/MuscleMap.jsx
import React from 'react';

function MuscleMap({ muscles }) {
  const muscleColors = {
    chest: '#f94144',
    back: '#577590',
    shoulders: '#f3722c',
    biceps: '#43aa8b',
    triceps: '#f9c74f',
    legs: '#90be6d',
    hams: '#4d908e',
    forearms: '#f8961e',
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '16px', marginTop: '16px' }}>
      <h3>Muscle Map</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '12px' }}>
        {Object.keys(muscles).map(muscle => (
          <div
            key={muscle}
            style={{
              width: '100px',
              height: '50px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: muscleColors[muscle],
              opacity: muscles[muscle] / 5 || 0.2,
              color: '#fff',
              borderRadius: '4px',
            }}
          >
            {muscle} ({muscles[muscle]})
          </div>
        ))}
      </div>
    </div>
  );
}

export default MuscleMap;