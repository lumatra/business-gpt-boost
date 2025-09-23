import React from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import Pricing from "@/components/Pricing";
import Benefits from "@/components/Benefits";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <Categories />
      <Pricing />
      <Benefits />
    </main>
  );
};

export default Index;
