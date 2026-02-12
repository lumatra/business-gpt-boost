import React from "react";
import { Button } from "./ui/button";

const SignupSection = () => {
  const scrollToPricing = () => {
    const element = document.getElementById("pricing");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="signup" className="py-20 bg-gradient-hero">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
          Ready to Stop Missing Customers?
        </h2>
        <p className="text-xl md:text-2xl mb-8 text-muted-foreground">
          Start your 30-day free pilot today. Just <span className="font-bold text-foreground">£14.99/month</span> after that.
        </p>
        
        <a href="https://portal.helpzz.co.uk/signup?plan=pro" target="_blank" rel="noopener noreferrer">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-lg px-8 py-6"
          >
            Start 30-Day Free Pilot
          </Button>
        </a>

        <p className="text-sm text-muted-foreground mt-8">
          Or email us: <a href="mailto:info@helpzz.co.uk" className="underline font-semibold hover:text-primary">info@helpzz.co.uk</a>
        </p>
      </div>
    </section>
  );
};

export default SignupSection;
