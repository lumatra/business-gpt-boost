import React, { useEffect } from "react";
import Navigation from "@/components/Navigation";
import SpecialistsGrid from "@/components/SpecialistsGrid";

const CategoriesPage = () => {
  useEffect(() => {
    document.title = "AI Specialists & Packages | Business AI Solutions";
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <SpecialistsGrid />
    </main>
  );
};

export default CategoriesPage;
