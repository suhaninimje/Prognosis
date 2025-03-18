import React from "react";
import "./solutions.css";
import earlyDetectionImg from "../prognosis1.png"; // Mock Image
import healthcarePlanningImg from "../prognosis1.png"; // Mock Image
import globalExpansionImg from "../prognosis1.png"; // Mock Image

const Solutions = () => {
  return (
    <div className="solutions-container">
      <h2>Our AI-Powered Disease Prediction</h2>
      <p className="solutions-intro">
        Harnessing the power of AI-driven analytics, spatial-temporal data, and satellite imagery, Prognosis enables highly accurate outbreak forecasting. 
        Our technology empowers health professionals and decision-makers to take proactive measures against disease spread.
      </p>

      <div className="solutions-grid">
        <div className="solution-card">
          <img src={earlyDetectionImg} alt="Early Detection" className="solution-image" />
          <div className="solution-content">
            <h3>Early Detection</h3>
            <p>
              Predict outbreaks up to 5 weeks in advance using AI-powered analytics. Our models analyze environmental and epidemiological data to detect early warning signs, 
              helping health organizations respond before a crisis unfolds.
            </p>
          </div>
        </div>

        <div className="solution-card">
          <img src={healthcarePlanningImg} alt="Healthcare Planning" className="solution-image" />
          <div className="solution-content">
            <h3>Healthcare Planning</h3>
            <p>
              Optimize hospital resource allocation by forecasting potential patient influx. With accurate predictions, hospitals can efficiently manage bed capacity, 
              allocate medical supplies, and ensure timely treatment without overwhelming healthcare systems.
            </p>
          </div>
        </div>

        <div className="solution-card">
          <img src={globalExpansionImg} alt="Global Expansion" className="solution-image" />
          <div className="solution-content">
            <h3>Global Expansion</h3>
            <p>
              While currently focusing on dengue prediction in India, our AI model is designed to scale globally. Future developments aim to extend forecasting to 
              other vector-borne diseases like malaria and Zika, ensuring worldwide health security.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Solutions;
