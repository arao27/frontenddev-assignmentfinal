import React, { createContext, useContext, useState } from 'react';

const StatsContext = createContext();

export const StatsProvider = ({ children }) => {
  const [stats, setStats] = useState({
    gender: 'male',
    bodyweight: 70,
    bench: 0,
    squat: 0,
    deadlift: 0,
    dips: 0,
    pullup: 0,
    ohp: 0,
    bicepCurl: 0,
  });

  const updateStat = (name, value) => {
    setStats(prev => ({ ...prev, [name]: value }));
  };

  return (
    <StatsContext.Provider value={{ stats, updateStat }}>
      {children}
    </StatsContext.Provider>
  );
};

export const useStats = () => {
  const context = useContext(StatsContext);
  if (!context) throw new Error('useStats must be used within StatsProvider');
  return context;
};