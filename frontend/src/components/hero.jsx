import React from "react";
import "./hero.css"; // Add styling here

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1>Prognosis</h1>
        <p>Predicting Dengue Cases with AI-Powered Analytics</p>
        <button className="cta-button">Learn More</button>
      </div>
    </section>
  );
};

export default Hero;