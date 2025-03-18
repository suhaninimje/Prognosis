import React from "react";
import "./dashboard.css";

const RiskMap = () => {
  return (
    <div className="risk-map">
      <h3>Risk Map</h3>
      <p>View the predicted high-risk zones for dengue outbreaks in Delhi.</p>
      {/* Placeholder for interactive map */}
      <div className="map-container">
        <img src="DelhiRiskMap.jpg" alt="Risk Map" className="map-img" />
      </div>
    </div>
  );
};

export default RiskMap;
