import React from "react";
import { useStats } from "../contexts/StatsContext";
import { calculateMusclePoints } from "../utils/RankUtils"; // adjust path if needed
import "./SavedStatsPage.css";

// Original rank thresholds for display only
const RANKS = ["Beginner", "Novice", "Intermediate", "Advanced", "Elite", "Olympian"];

// Rank colors
const RANK_COLORS = {
  Beginner: "cyan",
  Novice: "orange",
  Intermediate: "green",
  Advanced: "purple",
  Elite: "red",
  Olympian: "gold",
};

// For this version, we use a simple static mapping of points → rank (you can tweak thresholds)
const RANK_THRESHOLDS = [
  { rank: "Olympian", min: 30 },
  { rank: "Elite", min: 25 },
  { rank: "Advanced", min: 20 },
  { rank: "Intermediate", min: 15 },
  { rank: "Novice", min: 10 },
  { rank: "Beginner", min: 0 },
];

// Static percentile ranges (original version)
const RANK_PERCENTS = {
  Beginner: 94,
  Novice: 6,
  Intermediate: 2,
  Advanced: 0.35,
  Elite: 0.02,
  Olympian: 0.000014,
};

function SavedStatsPage() {
  const { stats } = useStats();
  const unit = "kg";

  // Calculate muscle points
  const musclePoints = calculateMusclePoints(stats, unit);
  const totalPoints = Object.values(musclePoints).reduce((a, b) => a + b, 0);

  // Find user rank based on total points
  const tier = RANK_THRESHOLDS.find(t => totalPoints >= t.min) || RANK_THRESHOLDS[0];
  const userRank = tier.rank;

  const rankColor = RANK_COLORS[userRank] || "black";
  const userPercent = RANK_PERCENTS[userRank];

  return (
    <div className="saved-page">

      {/* LEFT SIDE: Rank Tiers */}
      <div className="rank-tiers">
        <h2>Strength Ranking Tiers</h2>
        <div className="tier">Beginner — bottom 94%</div>
        <div className="tier">Novice — top 6%</div>
        <div className="tier">Intermediate — top 2%</div>
        <div className="tier">Advanced — top 0.35%</div>
        <div className="tier">Elite — top 0.02%</div>
        <div className="tier">Olympian — top 0.000014%</div>
      </div>

      {/* RIGHT SIDE: User Rank */}
      <div className="user-rank">
        <h2>Your Overall Rank</h2>
        <div className="rank-display" style={{ color: rankColor }}>
          {userRank}
        </div>

        <h3>Your Overall Percentage Rank</h3>
        <div className="percent-wrapper">
          <span className="percent-number">{userPercent}%</span>
          <span className="percent-text"> OF MEN WORLDWIDE</span>
        </div>
      </div>

    </div>
  );
}

export default SavedStatsPage;