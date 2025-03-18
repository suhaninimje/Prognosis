import React from "react";
import "./stats.css";

const Stats = () => {
  return (
    <section className="stats-section">
      <h2>Discover the Power of Prognosis</h2>
      <p>We use cutting-edge AI and data analytics to predict and prevent health risks, helping communities stay safer.</p>

      <div className="stats-container">
        <div className="stat-item">
          <h3 className="glow-on-hover">5M+</h3>
          <p>Health Reports Generated</p>
        </div>
        <div className="stat-item">
          <h3 className="glow-on-hover">10K+</h3>
          <p>Regions Covered</p>
        </div>
        <div className="stat-item">
          <h3 className="glow-on-hover">98%</h3>
          <p>Prediction Accuracy</p>
        </div>
        <div className="stat-item">
          <h3 className="glow-on-hover">500K</h3>
          <p>Potential Disease Cases Prevented</p>
        </div>
      </div>
    </section>
  );
};

export default Stats;
