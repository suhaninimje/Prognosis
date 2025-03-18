import React from "react";
import "./contact.css"

const Contact = () => {
  return (
    <section className="contact">
      <h2>Contact Us</h2>
      <p>Interested in our AI solutions? Reach out to us today.</p>
      <form>
        <input type="text" placeholder="Your Name" required />
        <input type="email" placeholder="Your Email" required />
        <textarea placeholder="Your Message"></textarea>
        <button type="submit">Send</button>
      </form>
    </section>
  );
};

export default Contact;
