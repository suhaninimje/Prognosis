import React from "react";
import { FaTwitter, FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";
import "./contact.css";

const Contact = () => {
  return (
    <section className="contact">
      <div className="contact-left">
        <h2>Contact Us</h2>
        <p>Reach out to us today.</p>
        <div className="contact-info">
          <div className="contact-detail">
            <h3>Email:</h3>
            <p>Consulting@gmail.com</p>
          </div>
          <div className="contact-detail">
            <h3>Phone:</h3>
            <p>+1 (123) 456-7890</p>
          </div>
          <div className="contact-detail">
            <h3>Office:</h3>
            <p>456 Business Ave, New York, NY 10001</p>
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
    </section>
  );
};

export default Contact;
