// contact.jsx
import React from "react";
import "./contact.css";
import { useNavigate } from "react-router-dom";
import logo from "../logo2.png";

const Contact = () => {
    const navigate = useNavigate();

    return (
      <div className="contact-container">
        <img src={logo} alt="Prognosis Logo" className="prognosis-logo" />
        <div className="left-side"></div>
        <div className="right-side">
          <h2>Contact Us</h2>
          <p>Have questions? Reach out to us.</p>
          <div className="contact-info">
            <p><strong>Email:</strong> support@prognosis.com</p>
            <p><strong>Phone:</strong> +1 (123) 456-7890</p>
            <p><strong>Address:</strong> 123 Prognosis Street, City, Country</p>
          </div>
        </div>
        <button className="back-button" onClick={() => navigate("/")}>Back to Home</button>
      </div>
    );
  };
  
  export default Contact;