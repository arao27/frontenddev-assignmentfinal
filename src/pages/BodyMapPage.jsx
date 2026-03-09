// src/pages/BodyMapPage.jsx
import React from "react";
import { useStats } from "../contexts/StatsContext";
import { calculateMusclePoints, calculateRank, RANKS } from "../utils/RankUtils";
import "./BodyMapPage.css";

function BodyMapPage() {
  const { stats, exercises } = useStats();
  const unit = "kg";

  const rankColors = {
    Beginner: "cyan",
    Novice: "orange",
    Intermediate: "green",
    Advanced: "purple",
    Elite: "red",
    Olympian: "gold",
  };

  // Muscle Map: rank from muscle points
  const getRankFromPoints = (points) => {
    if (points >= 5) return "Olympian";
    if (points >= 4) return "Elite";
    if (points >= 3) return "Advanced";
    if (points >= 2) return "Intermediate";
    if (points >= 1) return "Novice";
    return "Beginner";
  };

  const musclePoints = calculateMusclePoints(stats, unit);

  // Exercise Map: use dynamic exercises from StatsContext
  const exerciseRanks = {};
  exercises.forEach((ex) => {
    const rankIndex = calculateRank(
      ex.name,
      stats[ex.name],
      stats.bodyweight,
      stats.gender,
      unit
    );
    exerciseRanks[ex.display] = RANKS[rankIndex] || "Beginner";
  });

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
          {Object.keys(exerciseRanks).map((exercise) => {
            const rank = exerciseRanks[exercise];
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