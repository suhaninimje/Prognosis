import React from "react";
import Hero from "../components/hero";
import Features from "../components/features";
import Stats from "../components/stats";
import ClientReviews from "../components/clientReviews";

const Home = () => {
  return (
    <>
      <Hero />
      <Stats />
      <Features />
      <ClientReviews />
    </>
  );
};

export default Home;
