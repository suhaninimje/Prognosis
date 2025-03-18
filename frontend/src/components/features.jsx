import React from "react";
import "./features.css";

const Features = () => {
  return (
    <section className="features">
      <h2>Why Choose Prognosis?</h2>
      <p className="features-intro">
        Empowering healthcare with AI-driven insights for proactive disease prevention and resource optimization.
      </p>
      <div className="features-grid">
        {featureData.map((feature, index) => (
          <div className="feature" key={index}>
            <div className="feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const featureData = [
  {
    title: "AI-Based Predictions",
    description: "Analyze 21+ spatial-temporal factors to forecast dengue outbreaks up to 5 weeks in advance, helping healthcare providers stay proactive.",
    icon: "🤖",
  },
  {
    title: "Satellite Imagery Integration",
    description: "Leverages real-time satellite imagery, temperature, humidity, and rainfall data to assess dengue-prone regions with precision.",
    icon: "🛰️",
  },
  {
    title: "B2B Healthcare Solutions",
    description: "Designed for hospitals, clinics, and public health organizations to optimize resource allocation and enhance patient management.",
    icon: "🏥",
  },
  {
    title: "Actionable Insights & Reports",
    description: "Provides interactive dashboards and customized reports for better decision-making and targeted disease control measures.",
    icon: "📊",
  },
  {
    title: "User-Friendly Web Interface",
    description: "A seamless, intuitive interface that allows healthcare professionals to access insights effortlessly without technical expertise.",
    icon: "💻",
  },
  {
    title: "Scalable & Global Expansion",
    description: "Built for scalability—starting with dengue predictions in India, expanding to other diseases and regions for a broader health impact.",
    icon: "🌍",
  },
];

export default Features;
