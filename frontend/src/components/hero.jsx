import React from "react";
import { useNavigate } from "react-router-dom";
import "./hero.css";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="hero">
      <div className="hero-left">
        <div className="hero-overlay"></div>
        <div className="hero-content">
        <h1>Prognosis</h1>
        <h2>Predict. Prevent. Protect.</h2>
          <h2>Empowering Healthcare with Predictive AI</h2>
          <p>Forecast Dengue Outbreaks with Unmatched Precision—Up to 5 Weeks in Advance. Proactive Solutions for a Healthier Future.</p>
          <button className="tool-button" onClick={() => navigate("/product")}>Try Demo</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
