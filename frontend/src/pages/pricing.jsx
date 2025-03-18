// pricing.jsx
import React from "react";
import "./pricing.css";

const Pricing = () => {
  return (
    <section className="pricing">
      <h2>Pricing</h2>
      <div className="pricing-plans">
        <div className="plan">
          <h3>Basic</h3>
          <p>$29/month</p>
          <button>Get Started</button>
        </div>
        <div className="plan">
          <h3>Pro</h3>
          <p>$49/month</p>
          <button>Get Started</button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
