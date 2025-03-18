import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import logo from "../logo2.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left: Prognosis Logo and Newsletter */}
        <div className="footer-left">
          <div className="footer-logo">
            <img src={logo} alt="Prognosis Logo" className="footer-logo-img" /> 
          </div>
          <div className="footer-newsletter">
            <h3>Subscribe to Our Newsletter</h3>
            <p>Get updates on the latest trends and developments in AI-driven health predictions.</p>
            <form className="newsletter-form">
              <input type="email" placeholder="Enter your email" required />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>

        {/* Right: Quick Links and Socials */}
        <div className="footer-right">
          <div className="footer-links-section">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/solutions">Solutions</Link></li>
              <li><Link to="/resources">Resources</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/pricing">Pricing</Link></li>
            </ul>
          </div>

          <div className="footer-socials">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="footer-bottom">
        <p>&copy; 2025 Prognosis. All rights reserved.</p>
        <p><Link to="/privacy-policy">Privacy Policy</Link> | <Link to="/terms-of-service">Terms of Service</Link></p>
      </div>
    </footer>
  );
};

export default Footer;
