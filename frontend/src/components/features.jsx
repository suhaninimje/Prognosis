import React from "react";
import "./features.css"

const Features = () => {
  return (
    <section className="features">
      <h2>Why Choose Prognosis?</h2>
      <div className="features-grid">
        <div className="feature">
          <h3>AI-Based Predictions</h3>
          <p>Using spatial-temporal data to predict dengue cases up to 5 weeks in advance.</p>
        </div>
        <div className="feature">
          <h3>Satellite Imagery</h3>
          <p>Incorporating real-time environmental data to enhance accuracy.</p>
        </div>
        <div className="feature">
          <h3>B2B Healthcare Solutions</h3>
          <p>Helping hospitals optimize resources and preparedness.</p>
        </div>
      </div>
    </section>
  );
};

export default Features;
