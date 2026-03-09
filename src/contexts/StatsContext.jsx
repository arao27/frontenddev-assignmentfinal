// src/contexts/StatsContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

// Default stats
const DEFAULT_STATS = {
  gender: "male",
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

export const StatsProvider = ({ children }) => {
  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem("stats");
    return saved ? JSON.parse(saved) : DEFAULT_STATS;
  });

  const [exercises, setExercises] = useState([]);

  // Save stats whenever updated
  useEffect(() => {
    localStorage.setItem("stats", JSON.stringify(stats));
  }, [stats]);

  // Fetch external exercise data (simulate API)
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        // Option 1: local JSON file
        const res = await fetch("/data/exercises.json");
        const data = await res.json();
        setExercises(data);
      } catch (e) {
        console.error("Failed to load exercises", e);
        setExercises([
          { name: "bench", display: "Bench Press" },
          { name: "squat", display: "Squat" },
          { name: "deadlift", display: "Deadlift" },
          { name: "dips", display: "Dips" },
          { name: "pullup", display: "Pullups" },
          { name: "ohp", display: "Overhead Press" },
          { name: "bicepCurl", display: "Bicep Curl" },
        ]);
      }
    };
    fetchExercises();
  }, []);

  const updateStat = (key, value) => {
    setStats((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <StatsContext.Provider value={{ stats, updateStat, exercises }}>
      {children}
    </StatsContext.Provider>
  );
};

export const useStats = () => {
  const context = useContext(StatsContext);
  if (!context) throw new Error("useStats must be used within StatsProvider");
  return context;
};