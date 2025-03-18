import React from "react";
import "./dashboard.css";

const Overview = () => {
  return (
    <div className="overview">
      <h3>Overview</h3>
      <div className="overview-data">
        <div className="overview-item">
          <h4>Predicted Cases</h4>
          <p>1200 cases</p>
        </div>
        <div className="overview-item">
          <h4>Hospital Readiness</h4>
          <p>80% readiness</p>
        </div>
      </div>
    </div>
  );
};

export default Overview;
