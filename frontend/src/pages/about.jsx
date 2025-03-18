import React from "react";
import "./about.css";

const About = () => {
  return (
    <section className="about">
      <h2>About Prognosis</h2>
      <p className="intro">
        Prognosis leverages the power of AI and satellite imagery to predict the spread of dengue, providing healthcare providers with essential data to make informed decisions. 
        By analyzing environmental and epidemiological factors, we help healthcare systems prepare and respond proactively to outbreaks before they reach critical levels.
      </p>

      <div className="mission">
        <h3>Our Mission</h3>
        <p>
          At Prognosis, we believe that timely, accurate information can save lives. Our mission is to empower health professionals and decision-makers with tools that allow them to
          anticipate outbreaks and allocate resources effectively. Our AI-powered platform ensures that no region is left unprepared, creating a proactive approach to disease control and 
          healthcare planning.
        </p>
      </div>

      <div className="why">
        <h3>Why We Do It</h3>
        <p>
          The inspiration behind Prognosis stems from the rising impact of infectious diseases like dengue, which affect millions of people worldwide. 
          With climate change and urbanization, these diseases are spreading faster than ever, posing a significant threat to public health. 
          Our goal is to harness cutting-edge technology to bridge the gap in healthcare forecasting, helping to prevent widespread outbreaks before they spiral out of control.
        </p>
      </div>

      <div className="values">
        <h3>Our Core Values</h3>
        <ul>
          <li><strong>Innovation:</strong> We continuously push the boundaries of AI and technology to create smarter, more accurate solutions for health forecasting.</li>
          <li><strong>Compassion:</strong> We are committed to making a real difference in people's lives, especially those in underserved regions.</li>
          <li><strong>Collaboration:</strong> We work closely with healthcare providers, governments, and researchers to ensure our platform addresses the most critical needs.</li>
          <li><strong>Integrity:</strong> Transparency, fairness, and ethical decision-making are at the heart of everything we do.</li>
        </ul>
      </div>

      <div className="team">
        <h3>Meet the Team</h3>
        <p>
          Our team consists of passionate individuals from diverse backgrounds, including AI, healthcare, and data science, all driven by the same goal: to create a healthier world through innovative technology.
        </p>
      </div>
    </section>
  );
};

export default About;
