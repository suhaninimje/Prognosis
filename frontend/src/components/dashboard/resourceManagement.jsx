import React from "react";
import "./dashboard.css";

const ResourceManagement = () => {
  return (
    <div className="resource-management">
      <h3>Resource Management</h3>
      <div className="resource-data">
        <div className="resource-item">
          <h4>Predicted Patient Inflow</h4>
          <p>150 patients/day</p>
        </div>
        <div className="resource-item">
          <h4>Resource Allocation</h4>
          <p>70% capacity usage</p>
        </div>
      </div>
    </div>
  );
};

export default ResourceManagement;
