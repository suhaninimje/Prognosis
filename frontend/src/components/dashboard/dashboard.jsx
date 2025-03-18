import React from "react";
import "./dashboard.css";
import Overview from "./overview.jsx";
import ResourceManagement from "./resourceManagement.jsx";
import AlertsSettings from "./alertSettings.jsx";
import Reports from "./reports.jsx";
import RiskMap from "./riskMap.jsx";
import GeospatialVisualizations from "./geospatialVisualizations.jsx";
import PerformanceMetrics from "./performanceMetrics.jsx";
import PredictedCasesGraph from "./predictedCasesGraph.jsx";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-main-content">
        <Overview />
        <ResourceManagement />
        <AlertsSettings />
        <Reports />
        <PredictedCasesGraph />
        <RiskMap />
        <GeospatialVisualizations />
        <PerformanceMetrics />
      </div>
    </div>
  );
};

export default Dashboard;
