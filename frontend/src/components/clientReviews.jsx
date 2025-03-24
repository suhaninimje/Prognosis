import React from "react";
import "./clientReviews.css";

const ClientReviews = () => {
  return (
    <section className="client-reviews">
      <h2>What Our Clients Say</h2>

      <div className="reviews-container">
        {reviews.map((review, index) => (
          <div className="review" key={index}>
            <p>"{review.text}"</p>
            <h4>{review.author}</h4>
            <p className="position">{review.position}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const reviews = [
  {
    text: "Prognosis has been indispensable in preventing dengue outbreaks. Their accurate predictions and timely warnings have improved disease control strategies.",
    author: "Ravi Kumar",
    position: "Health Officer",
  },
  {
    text: "Prognosis has transformed our approach to dengue prevention. Their localized data reports empower us to implement targeted interventions.",
    author: "Priya Sharma",
    position: "NGO Director",
  },
  {
    text: "Prognosis plays a vital role in our fight against dengue. Their early warning system enables proactive planning and response, saving lives.",
    author: "Anil Desai",
    position: "Government Official",
  },
];

export default ClientReviews;
