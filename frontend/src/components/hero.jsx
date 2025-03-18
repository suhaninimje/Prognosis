import React from "react";
import "./hero.css";

const Hero = () => {
  return (
    <section className="hero">
      {/* Left Side - Quarter Circle with Text */}
      <div className="hero-left">
        <div className="hero-overlay"></div>
        <div className="hero-content">
        <h1>Prognosis</h1>
        <h2>Predict. Prevent. Protect.</h2>
          <h2>Empowering Healthcare with Predictive AI</h2>
          <p>Forecast Dengue Outbreaks with Unmatched Precision—Up to 5 Weeks in Advance. Proactive Solutions for a Healthier Future.</p>
          <button className="cta-button">Learn More</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
