import React, { useEffect, useState } from 'react';
import { useStats } from '../contexts/StatsContext';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

function SavedStatsPage() {
  const { stats, updateStat } = useStats();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSavedStats = async () => {
      if (!user) return;
      try {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem('token');
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/stats/${user.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const serverStats = response.data;
        Object.keys(serverStats).forEach(key => updateStat(key, serverStats[key]));
      } catch (err) {
        setError('Failed to load saved stats');
      } finally {
        setLoading(false);
      }
    };
    fetchSavedStats();
  }, [user, updateStat]);

  return (
    <div style={{ padding: '16px' }}>
      <h2>Saved Stats</h2>
      {loading && <p>Loading stats...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <pre>{JSON.stringify(stats, null, 2)}</pre>
    </div>
  );
}

export default SavedStatsPage;