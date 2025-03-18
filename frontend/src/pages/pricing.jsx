import React from "react";
import "./pricing.css";

const Pricing = () => {
  return (
    <section className="pricing">
      <h2>Flexible Pricing for Every Business Need</h2>

      <div className="hero-text">
        <p>Flexible pricing options to support your unique needs and grow your business.</p>
      </div>

      {/* Pricing Plans Section */}
      <div className="pricing-plans">
        <div className="plan">
          <h3>Basic</h3>
          <p>$99/month</p>
          <ul>
            <li>Financial Reports & Insights</li>
            <li>Expense Tracking</li>
            <li>Email Support</li>
          </ul>
          <button>Get Started</button>
        </div>

        <div className="plan">
          <h3>Business</h3>
          <p>$249/month</p>
          <ul>
            <li>Advanced Financial Analytics</li>
            <li>Bi-Weekly Consultations</li>
            <li>Tax Planning Assistance</li>
            <li>Priority Email & Chat Support</li>
          </ul>
          <button>Get Started</button>
        </div>

        <div className="plan">
          <h3>Premium</h3>
          <p>$499/month</p>
          <ul>
            <li>Full-Service Financial Consulting</li>
            <li>Weekly Strategy Sessions</li>
            <li>Dedicated Account Manager</li>
            <li>Tax & Compliance Support</li>
            <li>Priority Support</li>
          </ul>
          <button>Get Started</button>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="why-choose-us">
        <h3>Why Choose Us?</h3>
        <div className="reasons">
          <div className="reason">
            <h4>Proven Results</h4>
            <p>Hundreds of businesses trust us to drive financial stability and success.</p>
          </div>
          <div className="reason">
            <h4>Open Pricing</h4>
            <p>No hidden fees, no surprises—just clear and fair pricing for every plan.</p>
          </div>
          <div className="reason">
            <h4>Smart Solutions</h4>
            <p>Plans designed to grow with your business and adapt to your needs.</p>
          </div>
          <div className="reason">
            <h4>Expert Guidance</h4>
            <p>Our team of professionals is always ready to provide insights and support.</p>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions Section */}
      <div className="faq">
        <h3>Frequently Asked Questions</h3>
        <ul>
          <li>What happens after my plan expires?</li>
          <li>Can I upgrade/downgrade my plan?</li>
          <li>Is there a money-back guarantee?</li>
        </ul>
      </div>
    </section>
  );
};

export default Pricing;
