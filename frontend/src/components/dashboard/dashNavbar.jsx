import React from "react";
import "./dashNavbar.css";

const DashNavbar = () => {
  return (
    <nav className="dash-navbar">
      <div className="navbar-logo">
        <h3>Prognosis Dashboard</h3>
      </div>
      <div className="navbar-links">
        <ul>
          <li>Home</li>
          <li>Profile</li>
          <li>Logout</li>
        </ul>
      </div>
    </nav>
  );
};

export default DashNavbar;
