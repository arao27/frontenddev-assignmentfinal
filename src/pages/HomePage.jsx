import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  return (
    <div className="home-page">
      <h1>Welcome to Strength Tracker</h1>
      <p>
        Track your lifts, see your strength rank, and visualize your progress with the Muscle Map.
      </p>

      <div className="home-links">
        <Link className="home-button" to="/stats">Enter Your Stats</Link>
        <Link className="home-button" to="/bodymap">Muscle Map</Link>
        <Link className="home-button" to="/saved">Saved Stats</Link>
      </div>
    </div>
  );
}

export default HomePage;