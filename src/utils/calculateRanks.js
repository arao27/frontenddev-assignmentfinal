/// Ranks
export const RANKS = ["Beginner", "Novice", "Intermediate", "Advanced", "Elite", "Olympian"];

// Convert lbs to kg
const toKg = (value, unit) => unit === 'lbs' ? value / 2.20462 : value;

// Calculate rank per exercise
export const calculateRank = (exercise, value, bodyweight, unit = 'kg') => {
  if (value == null || value === '' || bodyweight == null || bodyweight === '') return 0; // Beginner

  const valKg = toKg(value, unit);
  const bwKg = toKg(bodyweight, unit);
  const ratio = valKg / bwKg;

  switch (exercise) {
    case 'bench':
      if (ratio < 1.0) return 0;
      if (ratio < 1.25) return 1;
      if (ratio < 1.5) return 2;
      if (ratio < 1.75) return 3;
      if (ratio < 2.0) return 4;
      return 5;

    case 'squat':
      if (ratio < 1.3) return 0;
      if (ratio < 1.6) return 1;
      if (ratio < 1.9) return 2;
      if (ratio < 2.2) return 3;
      if (ratio < 2.5) return 4;
      return 5;

    case 'deadlift':
      if (ratio < 1.6) return 0;
      if (ratio < 2.0) return 1;
      if (ratio < 2.4) return 2;
      if (ratio < 2.8) return 3;
      if (ratio < 3.2) return 4;
      return 5;

    case 'dips':
      if (ratio < 0.35) return 0;
      if (ratio < 0.45) return 1;
      if (ratio < 0.55) return 2;
      if (ratio < 0.7) return 3;
      if (ratio < 1.05) return 4;
      return 5;

    case 'pullup':
      if (ratio < 0.15) return 0;
      if (ratio < 0.25) return 1;
      if (ratio < 0.4) return 2;
      if (ratio < 0.6) return 3;
      if (ratio < 0.9) return 4;
      return 5;

    case 'ohp':
      if (ratio < 0.6) return 0;
      if (ratio < 0.75) return 1;
      if (ratio < 0.9) return 2;
      if (ratio < 1.05) return 3;
      if (ratio < 1.2) return 4;
      return 5;

    case 'bicepCurl':
      if (ratio < 0.4) return 0;
      if (ratio < 0.5) return 1;
      if (ratio < 0.65) return 2;
      if (ratio < 0.8) return 3;
      if (ratio < 0.95) return 4;
      return 5;

    default:
      return 0;
  }
};

// Calculate muscle points
export const calculateMusclePoints = (stats, unit = 'kg') => {
  const points = {
    Chest: 0,
    Back: 0,
    Shoulders: 0,
    Biceps: 0,
    Triceps: 0,
    Legs: 0,
    Hams: 0,
    Forearms: 0,
  };

  const bw = stats.bodyweight;

  // Bench
  const benchRank = calculateRank('bench', stats.bench, bw, unit);
  points.Chest += Math.max(0, benchRank - 1);
  points.Triceps += Math.max(0, benchRank - 2);

  // Squat
  const squatRank = calculateRank('squat', stats.squat, bw, unit);
  points.Legs += Math.max(0, squatRank);
  points.Hams += Math.max(0, squatRank - 1);

  // Deadlift
  const deadRank = calculateRank('deadlift', stats.deadlift, bw, unit);
  points.Legs += Math.max(0, deadRank - 1);
  points.Back += Math.max(0, deadRank - 2);
  points.Forearms += Math.max(0, deadRank - 1);
  points.Hams += Math.max(0, deadRank - 1);

  // Dips
  const dipsRank = calculateRank('dips', stats.dips, bw, unit);
  points.Triceps += Math.max(0, dipsRank - 1);
  points.Shoulders += Math.max(0, dipsRank - 2);
  points.Chest += Math.max(0, dipsRank - 2);

  // Pullups
  const pullRank = calculateRank('pullup', stats.pullup, bw, unit);
  points.Back += Math.max(0, pullRank - 1);
  points.Forearms += Math.max(0, pullRank - 1);

  // OHP
  const ohpRank = calculateRank('ohp', stats.ohp, bw, unit);
  points.Shoulders += Math.max(0, ohpRank - 1);
  points.Chest += Math.max(0, ohpRank - 2);

  // Bicep Curl
  const curlRank = calculateRank('bicepCurl', stats.bicepCurl, bw, unit);
  points.Biceps += curlRank;

  return points;
};