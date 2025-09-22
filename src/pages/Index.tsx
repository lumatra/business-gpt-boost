import React from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import AIShowcase from "@/components/AIShowcase";
import Benefits from "@/components/Benefits";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <Categories />
      <AIShowcase />
      <Benefits />
    </main>
  );
};

export default Index;
