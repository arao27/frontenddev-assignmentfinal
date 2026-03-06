// src/utils/calculateRanks.js
export function calculateRanks(stats) {
  const { bodyweight, bench, squat, deadlift, dips, pullup, ohp, bicepCurl } = stats;

  const muscles = {
    chest: 0,
    back: 0,
    shoulders: 0,
    biceps: 0,
    triceps: 0,
    legs: 0,
    hams: 0,
    forearms: 0,
  };

  const ranks = {};

  // Bench
  if (bench < 1 * bodyweight) ranks.bench = 0;
  else if (bench >= 1 && bench < 1.25) { ranks.bench = 1; muscles.chest=1; }
  else if (bench >= 1.25 && bench < 1.5) { ranks.bench = 2; muscles.chest=2; muscles.triceps=1; }
  else if (bench >= 1.5 && bench < 1.75) { ranks.bench = 3; muscles.chest=3; muscles.triceps=2; }
  else if (bench >= 1.75 && bench < 2) { ranks.bench = 4; muscles.chest=4; muscles.triceps=3; }
  else { ranks.bench = 5; muscles.chest=5; muscles.triceps=4; }

  // Squat
  if (squat < 1.3 * bodyweight) ranks.squat=0;
  else if (squat >= 1.3 && squat < 1.6) { ranks.squat=1; muscles.legs=1; }
  else if (squat >=1.6 && squat < 1.9) { ranks.squat=2; muscles.legs=2; muscles.hams=1; }
  else if (squat >=1.9 && squat < 2.2) { ranks.squat=3; muscles.legs=3; muscles.hams=2; }
  else if (squat >=2.2 && squat < 2.5) { ranks.squat=4; muscles.legs=4; muscles.hams=2; }
  else { ranks.squat=5; muscles.legs=5; muscles.hams=3; }

  // Deadlift
  if (deadlift < 1.6 * bodyweight) ranks.deadlift=0;
  else if (deadlift >=1.6 && deadlift <2) { ranks.deadlift=1; muscles.legs=1; muscles.hams=1; muscles.forearms=1; }
  else if (deadlift >=2 && deadlift<2.4) { ranks.deadlift=2; muscles.legs=2; muscles.hams=2; muscles.back=1; muscles.forearms=2; }
  else if (deadlift >=2.4 && deadlift<2.8) { ranks.deadlift=3; muscles.legs=3; muscles.hams=3; muscles.back=2; muscles.forearms=3; }
  else if (deadlift >=2.8 && deadlift<3.2) { ranks.deadlift=4; muscles.legs=3; muscles.hams=4; muscles.back=2; muscles.forearms=4; }
  else { ranks.deadlift=5; muscles.legs=4; muscles.hams=5; muscles.back=3; muscles.forearms=5; }

  // Dips
  if (dips < 0.35 * bodyweight) ranks.dips=0;
  else if (dips >=0.35 && dips<0.45) { ranks.dips=1; muscles.triceps=1; }
  else if (dips >=0.45 && dips<0.55) { ranks.dips=2; muscles.triceps=2; muscles.shoulders=1; muscles.chest=1; }
  else if (dips >=0.55 && dips<0.7) { ranks.dips=3; muscles.triceps=3; muscles.shoulders=2; muscles.chest=2; }
  else if (dips >=0.7 && dips<1.05) { ranks.dips=4; muscles.triceps=4; muscles.shoulders=2; muscles.chest=2; }
  else { ranks.dips=5; muscles.triceps=5; muscles.shoulders=3; muscles.chest=3; }

  // Pullup
  if (pullup < 0.15*bodyweight) ranks.pullup=0;
  else if (pullup >=0.15 && pullup<0.25) { ranks.pullup=1; muscles.back=1; muscles.forearms=1; }
  else if (pullup >=0.25 && pullup<0.4) { ranks.pullup=2; muscles.back=2; muscles.forearms=2; }
  else if (pullup >=0.4 && pullup<0.6) { ranks.pullup=3; muscles.back=3; muscles.forearms=3; }
  else if (pullup >=0.6 && pullup<0.9) { ranks.pullup=4; muscles.back=4; muscles.forearms=4; }
  else { ranks.pullup=5; muscles.back=5; muscles.forearms=5; }

  // OHP
  if (ohp < 0.6*bodyweight) ranks.ohp=0;
  else if (ohp >=0.6 && ohp<0.75) { ranks.ohp=1; muscles.shoulders=1; }
  else if (ohp >=0.75 && ohp<0.9) { ranks.ohp=2; muscles.shoulders=2; muscles.chest=1; }
  else if (ohp >=0.9 && ohp<1.05) { ranks.ohp=3; muscles.shoulders=3; muscles.chest=2; }
  else if (ohp >=1.05 && ohp<1.2) { ranks.ohp=4; muscles.shoulders=4; muscles.chest=2; }
  else { ranks.ohp=5; muscles.shoulders=5; muscles.chest=3; }

  // Bicep Curl
  if (bicepCurl < 0.4*bodyweight) ranks.bicepCurl=0;
  else if (bicepCurl >=0.4 && bicepCurl<0.5) { ranks.bicepCurl=1; muscles.biceps=1; }
  else if (bicepCurl >=0.5 && bicepCurl<0.65) { ranks.bicepCurl=2; muscles.biceps=2; }
  else if (bicepCurl >=0.65 && bicepCurl<0.8) { ranks.bicepCurl=3; muscles.biceps=3; }
  else if (bicepCurl >=0.8 && bicepCurl<0.95) { ranks.bicepCurl=4; muscles.biceps=4; }
  else { ranks.bicepCurl=5; muscles.biceps=5; }

  return { ranks, muscles };
}