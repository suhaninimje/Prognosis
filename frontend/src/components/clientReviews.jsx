import React from "react";
import "./clientReviews.css";

const ClientReviews = () => {
  return (
    <section className="client-reviews">
      <h2>Client Reviews</h2>

      <div className="reviews-container">
        <div className="review">
          <p>
            "Prognosis has been indispensable in our efforts to prevent dengue outbreaks. Their accurate predictions and timely warnings have significantly improved our disease control strategies."
          </p>
          <h4>Michael Smith</h4>
          <p className="position">Health Officer</p>
        </div>

        <div className="review">
          <p>
            "Partnering with Prognosis has transformed our approach to dengue prevention. Their localized data reports have empowered us to implement targeted interventions, minimizing the impact of dengue outbreaks."
          </p>
          <h4>Laura Johnson</h4>
          <p className="position">NGO Director</p>
        </div>

        <div className="review">
          <p>
            "Prognosis plays a vital role in our fight against dengue. Their early warning system enables proactive planning and response, ultimately saving lives and valuable resources."
          </p>
          <h4>David Brown</h4>
          <p className="position">Government Official</p>
        </div>
      </div>
    </section>
  );
};

export default ClientReviews;
