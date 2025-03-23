import React from "react";
import Hero from "../components/hero";
import Features from "../components/features";
import Stats from "../components/stats";
import ClientReviews from "../components/clientReviews";
import Contact from "../components/contact";

const Home = () => {
  return (
    <>
      <Hero />
      <Stats />
      <Features />
      <ClientReviews />
      <Contact />
    </>
  );
};

export default Home;
