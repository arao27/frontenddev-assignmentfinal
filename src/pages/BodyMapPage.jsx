import React from "react";
import { useStats } from "../contexts/StatsContext";
import { calculateMusclePoints, calculateRank } from "../utils/RankUtils";
import "./BodyMapPage.css";

function BodyMapPage() {
  const { stats } = useStats();
  const unit = "kg";

  const rankColors = {
    Beginner: "cyan",
    Novice: "orange",
    Intermediate: "green",
    Advanced: "purple",
    Elite: "red",
    Olympian: "gold",
  };

  const rankNames = ["Beginner","Novice","Intermediate","Advanced","Elite","Olympian"];

  const getRankFromPoints = (points) => {
    if (points >= 5) return "Olympian";
    if (points >= 4) return "Elite";
    if (points >= 3) return "Advanced";
    if (points >= 2) return "Intermediate";
    if (points >= 1) return "Novice";
    return "Beginner";
  };

  // Muscle Map
  const musclePoints = calculateMusclePoints(stats, unit);

  // Exercises mapping to stat keys
  const exerciseMap = {
    Bench: "bench",
    Squat: "squat",
    Deadlift: "deadlift",
    Pullups: "pullup",
    Dips: "dips",
    OHP: "ohp",
    "Bicep Curl": "bicepCurl",
  };

  return (
    <div className="bodymap-page">
      <h2>Body & Exercise Map</h2>
      <div className="map-wrapper">

        {/* LEFT: Muscle Map */}
        <div className="muscle-map">
          {Object.keys(musclePoints).map((muscle) => {
            const rank = getRankFromPoints(musclePoints[muscle]);
            return (
              <div key={muscle} className="muscle-row">
                <div
                  className="muscle-box"
                  style={{ backgroundColor: rankColors[rank] }}
                >
                  {muscle}
                </div>
                <div className="muscle-rank" style={{ color: rankColors[rank] }}>
                  {rank}
                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT: Exercise Map */}
        <div className="exercise-map">
          {Object.keys(exerciseMap).map((exercise) => {
            const statKey = exerciseMap[exercise];
            const rankIndex = calculateRank(statKey, stats[statKey], stats.bodyweight, unit);
            const rank = rankNames[rankIndex] || "Beginner";

            return (
              <div key={exercise} className="muscle-row">
                <div
                  className="muscle-box"
                  style={{ backgroundColor: rankColors[rank] }}
                >
                  {exercise}
                </div>
                <div className="muscle-rank" style={{ color: rankColors[rank] }}>
                  {rank}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}

export default BodyMapPage;