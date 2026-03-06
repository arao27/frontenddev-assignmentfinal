import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useStats } from '../contexts/StatsContext';
import StatInput from '../components/StatInput';
import MuscleMap from '../components/MuscleMap';
import RankBadge from '../components/RankBadge';
import { calculateRanks } from '../utils/calculateRanks';

function StatsPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { stats, updateStat } = useStats();
  const [muscles, setMuscles] = React.useState({});
  const [ranks, setRanks] = React.useState({});

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  useEffect(() => {
    const { ranks, muscles } = calculateRanks(stats);
    setRanks(ranks);
    setMuscles(muscles);
  }, [stats]);

  return (
    <div style={{ padding: '16px' }}>
      <h2>Your Stats</h2>
      {/* Inputs and muscle map here (same as before) */}
    </div>
  );
}

export default StatsPage;