import React, { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Categories from "@/components/Categories";

const CategoriesPage = () => {
  useEffect(() => {
    document.title = "AI Specialists & Packages | Business AI Solutions";
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <Categories />
    </main>
  );
};

export default CategoriesPage;
