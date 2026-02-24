import React from 'react';

function MuscleMap({ stats }) {
  // Placeholder: show stats as JSON for MVP
  return (
    <div style={{ border: '1px solid #ccc', padding: '16px', marginTop: '16px' }}>
      <h3>Muscle Map</h3>
      <pre>{JSON.stringify(stats, null, 2)}</pre>
    </div>
  );
}

export default MuscleMap;