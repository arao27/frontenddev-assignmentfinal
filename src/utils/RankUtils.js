// src/utils/RankUtils.jsx

// Rank names
export const RANKS = ["Beginner", "Novice", "Intermediate", "Advanced", "Elite", "Olympian"];

// Convert lbs to kg safely
const toKg = (value, unit) => {
  if (value == null || value === "") return 0;
  return unit === "lbs" ? value / 2.20462 : value;
};

// Gender-specific thresholds
const EXERCISE_THRESHOLDS = {
  male: {
    bench: [1.0, 1.25, 1.5, 1.75, 2.0],
    squat: [1.3, 1.6, 1.9, 2.2, 2.5],
    deadlift: [1.6, 2.0, 2.4, 2.8, 3.2],
    dips: [0.35, 0.45, 0.55, 0.7, 1.05],
    pullup: [0.15, 0.25, 0.4, 0.6, 0.9],
    ohp: [0.6, 0.75, 0.9, 1.05, 1.2],
    bicepCurl: [0.4, 0.5, 0.65, 0.8, 0.95],
  },
  female: {
    bench: [0.65, 0.85, 1, 1.2, 1.5],
    squat: [0.95, 1.2, 1.5, 1.7, 1.95],
    deadlift: [1.05, 1.3, 1.75, 2.1, 2.4],
    dips: [0.2, 0.3, 0.4, 0.5, 0.7],
    pullup: [0.05, 0.1, 0.25, 0.4, 0.55],
    ohp: [0.3, 0.45, 0.6, 0.75, 0.9],
    bicepCurl: [0.2, 0.3, 0.4, 0.5, 0.6],
  }
};

// Safely calculate rank for a single exercise
export const calculateRank = (exercise, value, bodyweight, gender = "male", unit = "kg") => {
  if (!value || !bodyweight) return 0; // Beginner if missing data

  const bwKg = toKg(bodyweight, unit);
  const valKg = toKg(value, unit);
  if (bwKg === 0) return 0;

  const thresholds = EXERCISE_THRESHOLDS?.[gender]?.[exercise];
  if (!thresholds) return 0;

  const ratio = valKg / bwKg;
  for (let i = 0; i < thresholds.length; i++) {
    if (ratio < thresholds[i]) return i; // Return rank index
  }
  return thresholds.length; // Top rank (Olympian)
};

// Calculate muscle ranks: pick the highest contributing exercise for each muscle
export const calculateMusclePoints = (stats, unit = "kg") => {
  if (!stats || !stats.bodyweight) return {
    Chest: 0,
    Back: 0,
    Shoulders: 0,
    Biceps: 0,
    Triceps: 0,
    Legs: 0,
    Hams: 0,
    Forearms: 0,
  };

  const gender = stats.gender || "male";
  const bw = stats.bodyweight;

  const muscles = {
    Chest: 0,
    Back: 0,
    Shoulders: 0,
    Biceps: 0,
    Triceps: 0,
    Legs: 0,
    Hams: 0,
    Forearms: 0,
  };

  const updateMuscle = (muscle, rank) => {
    if (rank > muscles[muscle]) muscles[muscle] = rank;
  };

  try {
    const benchRank = calculateRank("bench", stats.bench, bw, gender, unit);
    updateMuscle("Chest", benchRank);
    updateMuscle("Triceps", benchRank);

    const squatRank = calculateRank("squat", stats.squat, bw, gender, unit);
    updateMuscle("Legs", squatRank);
    updateMuscle("Hams", squatRank);

    const deadRank = calculateRank("deadlift", stats.deadlift, bw, gender, unit);
    updateMuscle("Legs", deadRank);
    updateMuscle("Back", deadRank);
    updateMuscle("Forearms", deadRank);
    updateMuscle("Hams", deadRank);

    const dipsRank = calculateRank("dips", stats.dips, bw, gender, unit);
    updateMuscle("Triceps", dipsRank);
    updateMuscle("Shoulders", dipsRank);
    updateMuscle("Chest", dipsRank);

    const pullRank = calculateRank("pullup", stats.pullup, bw, gender, unit);
    updateMuscle("Back", pullRank);
    updateMuscle("Forearms", pullRank);

    const ohpRank = calculateRank("ohp", stats.ohp, bw, gender, unit);
    updateMuscle("Shoulders", ohpRank);
    updateMuscle("Chest", ohpRank);

    const curlRank = calculateRank("bicepCurl", stats.bicepCurl, bw, gender, unit);
    updateMuscle("Biceps", curlRank);

  } catch (e) {
    console.error("Error calculating muscle points:", e);
  }

  return muscles;
};