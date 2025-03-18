import React from "react";
import "./solutions.css";

const Solutions = () => {
  return (
    <div className="solutions-container">
      <h2>Our AI-Powered Disease Prediction</h2>
      <p>Using spatial-temporal data and satellite imagery to forecast outbreaks efficiently.</p>
      <div className="solutions-grid">
        <div className="solution-card">
          <h3>Early Detection</h3>
          <p>Predict outbreaks up to 5 weeks in advance.</p>
        </div>
        <div className="solution-card">
          <h3>Healthcare Planning</h3>
          <p>Optimize hospital resource allocation with accurate forecasts.</p>
        </div>
        <div className="solution-card">
          <h3>Global Expansion</h3>
          <p>Scaling our solution to other diseases worldwide.</p>
        </div>
      </div>
    </div>
  );
};

export default Solutions;
