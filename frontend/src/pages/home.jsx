import React from "react";
import { Link } from "react-router-dom";
import Hero from "../components/hero";
import Features from "../components/features";
import Stats from "../components/stats";
import About from "../components/about";
import Contact from "../components/contact";
import ClientReviews from "../components/clientReviews";

const Home = () => {
  return (
    <>
      <Hero />
      <Stats />
      <Features />
      <About />
      <ClientReviews />
      <Contact />
    </>
  );
};

export default Home;
