import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import logo from "../logo2.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="contact">
        <div className="contact-left">
          <h2>Contact Us</h2>
          <p>Reach out to us today.</p>
          <div className="contact-info">
            <div className="contact-detail">
              <h3>Email:</h3>
              <p>prognosistoday@gmail.com</p>
            </div>
            <div className="contact-detail">
              <h3>Phone:</h3>
              <p>+1 (123) 456-7890</p>
            </div>
            <div className="contact-detail">
              <h3>Follow Us</h3>
              <div className="social-links">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter size={30} /></a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook size={30} /></a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin size={30} /></a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram size={30} /></a>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-right">
          <form>
            <div className="form-row">
              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="Your Email" required />
            </div>
            <textarea placeholder="Your Message" required></textarea>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
      
      <div className="footer-container">
        <div className="footer-left">
          <div className="footer-logo">
            <img src={logo} alt="Prognosis Logo" className="footer-logo-img" /> 
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 Prognosis. All rights reserved.</p>
          </div>
        </div>

        <div className="footer-right">
          <ul className="footer-links">
            <li><Link to="/product">Product</Link></li>
            <li><Link to="/solutions">Solutions</Link></li>
            <li><Link to="/resources">Resources</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>

          <div className="footer-socials">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
