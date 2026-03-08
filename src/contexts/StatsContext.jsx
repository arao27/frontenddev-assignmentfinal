import React, { createContext, useContext, useState, useEffect } from 'react';

// Initial default stats
const DEFAULT_STATS = {
  gender: 'male',
  bodyweight: null,
  bench: null,
  squat: null,
  deadlift: null,
  dips: null,
  pullup: null,
  ohp: null,
  bicepCurl: null,
};

const StatsContext = createContext();

export function StatsProvider({ children }) {
  const [stats, setStats] = useState(() => {
    try {
      const saved = localStorage.getItem('stats');
      return saved ? JSON.parse(saved) : DEFAULT_STATS;
    } catch (e) {
      console.error('Failed to parse stats from localStorage', e);
      return DEFAULT_STATS;
    }
  });

  useEffect(() => {
    localStorage.setItem('stats', JSON.stringify(stats));
  }, [stats]);

  const updateStat = (key, value) => {
    setStats(prev => ({ ...prev, [key]: value }));
  };

  return (
    <StatsContext.Provider value={{ stats, updateStat }}>
      {children}
    </StatsContext.Provider>
  );
}

export const useStats = () => {
  const context = useContext(StatsContext);
  if (!context) throw new Error('useStats must be used within StatsProvider');
  return context;
};