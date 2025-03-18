import React from "react";
import "./dashboard.css";

const AlertsSettings = () => {
  return (
    <div className="alerts-settings">
      <h3>Alerts & Settings</h3>
      <div className="alert-options">
        <label>
          Enable Real-time Alerts
          <input type="checkbox" />
        </label>
      </div>
    </div>
  );
};

export default AlertsSettings;
