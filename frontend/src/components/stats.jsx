import React from "react";
import "./stats.css";

const Stats = () => {
  return (
    <section className="stats-section">
      {/* <h2>Discover the Power of Prognosis</h2>
      <p>We use cutting-edge AI and data analytics to predict and prevent health risks, helping communities stay safer.</p> */}

      <div className="stats-container">
        <div className="stat-item">
          <h3 className="glow-on-hover">50+</h3>
          <p>Pilot Tests Conducted</p>
        </div>
        <div className="stat-item">
          <h3 className="glow-on-hover">100+</h3>
          <p>Regions Covered</p>
        </div>
        <div className="stat-item">
          <h3 className="glow-on-hover">95%</h3>
          <p>Initial Prediction Accuracy</p>
        </div>
        <div className="stat-item">
          <h3 className="glow-on-hover">1,000+</h3>
          <p>Healthcare Providers Engaged in Discussions</p>
        </div>
      </div>
    </section>
  );
};

export default Stats;
