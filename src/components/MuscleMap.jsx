import React from 'react';

function MuscleMap({ stats }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '16px', marginTop: '16px' }}>
      <h3>Muscle Map</h3>
      {/* Future enhancement: Render actual muscle map graphics */}
      <pre>{JSON.stringify(stats, null, 2)}</pre>
    </div>
  );
}

export default MuscleMap;