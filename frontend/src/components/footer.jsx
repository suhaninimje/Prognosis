import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <ul className="footer-links">
          <li><Link to="/solutions">Solutions</Link></li>
          <li><Link to="/resources">Resources</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/pricing">Pricing</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/checkout">Check Prices</Link></li>
        </ul>
        <p>&copy; 2025 Prognosis. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
