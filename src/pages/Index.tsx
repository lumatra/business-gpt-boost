import React from "react";
import Navigation from "@/components/Navigation";
import NewHero from "@/components/NewHero";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import PricingSection from "@/components/PricingSection";
import SignupSection from "@/components/SignupSection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  return (
    <main className="min-h-screen bg-gray-900">
      <Navigation />
      <NewHero />
      <ProblemSection />
      <SolutionSection />
      <PricingSection />
      <SignupSection />
      <ContactSection />
    </main>
  );
};

export default Index;
