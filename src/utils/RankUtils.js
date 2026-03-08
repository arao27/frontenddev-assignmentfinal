export const RANKS = ["Beginner", "Novice", "Intermediate", "Advanced", "Elite", "Olympian"];

// Convert lbs to kg
export const toKg = (value, unit) => unit === 'lbs' ? value / 2.20462 : value;

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

// Calculate muscle points for each muscle group
export const calculateMusclePoints = (stats, unit = 'kg') => {
  // Initialize each muscle to 0
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

  // Helper: update muscle only if this exercise gives a higher rank
  const updateMuscle = (muscle, rank) => {
    points[muscle] = Math.max(points[muscle], rank);
  };

  // Calculate ranks for each exercise
  const benchRank = calculateRank('bench', stats.bench, bw, unit);
  updateMuscle('Chest', benchRank);
  updateMuscle('Triceps', benchRank - 1 > 0 ? benchRank - 1 : 0);

  const squatRank = calculateRank('squat', stats.squat, bw, unit);
  updateMuscle('Legs', squatRank);
  updateMuscle('Hams', squatRank - 1 > 0 ? squatRank - 1 : 0);

  const deadRank = calculateRank('deadlift', stats.deadlift, bw, unit);
  updateMuscle('Legs', deadRank);
  updateMuscle('Back', deadRank - 1 > 0 ? deadRank - 1 : 0);
  updateMuscle('Forearms', deadRank - 1 > 0 ? deadRank - 1 : 0);
  updateMuscle('Hams', deadRank - 1 > 0 ? deadRank - 1 : 0);

  const dipsRank = calculateRank('dips', stats.dips, bw, unit);
  updateMuscle('Triceps', dipsRank);
  updateMuscle('Shoulders', dipsRank - 1 > 0 ? dipsRank - 1 : 0);
  updateMuscle('Chest', dipsRank - 1 > 0 ? dipsRank - 1 : 0);

  const pullRank = calculateRank('pullup', stats.pullup, bw, unit);
  updateMuscle('Back', pullRank);
  updateMuscle('Forearms', pullRank);

  const ohpRank = calculateRank('ohp', stats.ohp, bw, unit);
  updateMuscle('Shoulders', ohpRank);
  updateMuscle('Chest', ohpRank - 1 > 0 ? ohpRank - 1 : 0);

  const curlRank = calculateRank('bicepCurl', stats.bicepCurl, bw, unit);
  updateMuscle('Biceps', curlRank);

  return points;
};