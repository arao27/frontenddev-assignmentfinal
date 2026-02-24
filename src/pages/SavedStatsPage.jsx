import React from 'react';
import { useStats } from '../contexts/StatsContext';

function SavedStatsPage() {
  const { stats } = useStats();

  return (
    <div style={{ padding: '16px' }}>
      <h2>Saved Stats</h2>
      <p>For MVP, we’re just showing your current session stats:</p>
      <pre>{JSON.stringify(stats, null, 2)}</pre>
    </div>
  );
}

export default SavedStatsPage;