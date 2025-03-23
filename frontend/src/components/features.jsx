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
    description: "Our advanced AI model analyzes over 21 spatial-temporal factors—including climate conditions, population density, and land use—to predict dengue outbreaks up to five weeks in advance. By leveraging machine learning, we provide highly accurate forecasts that enable proactive disease management.",
    icon: "🤖",
  },
  {
    title: "Satellite Imagery Integration",
    description: "We integrate real-time satellite imagery with environmental data such as temperature, humidity, and rainfall to monitor conditions that contribute to dengue spread. This allows us to detect high-risk areas and improve prediction accuracy using geospatial analysis.",
    icon: "🛰️",
  },
  {
    title: "B2B Healthcare Solutions",
    description: "Our platform is designed for hospitals, clinics, and healthcare organizations, helping them optimize resource allocation, predict patient influx, and enhance disease management strategies. By anticipating outbreaks, healthcare providers can better prepare for medical supply needs, staffing, and patient care.",
    icon: "🏥",
  },
  {
    title: "Actionable Insights & Reports",
    description: "We offer interactive dashboards and customizable reports tailored to specific regions, allowing healthcare professionals and policymakers to make data-driven decisions. These reports highlight risk levels, trends, and recommendations for targeted disease control efforts.",
    icon: "📊",
  },
  {
    title: "User-Friendly Web Interface",
    description: "Our intuitive web platform is designed for ease of use, enabling healthcare professionals to access insights without requiring technical expertise. The clean, simple interface ensures seamless navigation, making it easy to generate reports and visualize data.",
    icon: "💻",
  },
  {
    title: "Scalable & Global Expansion",
    description: "Starting with dengue predictions in India, our technology is adaptable for expansion to other vector-borne diseases like malaria and Zika. As we scale globally, we aim to provide predictive disease surveillance for different regions, improving public health worldwide.",
    icon: "🌍",
  },
];

export default Features;
