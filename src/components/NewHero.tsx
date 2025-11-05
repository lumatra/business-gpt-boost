import React from "react";
import { Button } from "./ui/button";

const NewHero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="bg-gradient-hero pt-20 pb-24 text-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl md:text-6xl font-extrabold text-foreground leading-tight">
          Stop Answering the Same Questions.
        </h1>
        <h2 className="mt-4 text-5xl md:text-6xl font-extrabold text-primary leading-tight">
          Let AI Handle It.
        </h2>
        <p className="mt-8 text-xl text-muted-foreground max-w-2xl mx-auto">
          Helpzz gives your small business a 24/7 AI-powered support agent. It's instant, intelligent, and gives you time back to run your company.
        </p>
        <Button
          size="lg"
          onClick={() => scrollToSection("signup")}
          className="mt-10 px-8 py-4 text-lg bg-primary hover:bg-primary/90 shadow-elegant"
        >
          Get Started Today
        </Button>
      </div>
    </section>
  );
};

export default NewHero;
