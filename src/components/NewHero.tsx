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
    <section className="bg-gradient-hero pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center bg-primary/10 rounded-full px-4 py-2 mb-6">
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse mr-2"></span>
              <span className="text-sm font-medium text-foreground">Trusted by UK businesses</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Never Miss Another Customer.
            </h1>
            <p className="mt-4 text-xl md:text-2xl text-muted-foreground">
              Your assistants handle inquiries 24/7 — while you're on the job.
            </p>
            <p className="mt-4 text-lg text-muted-foreground">
              One simple plan from <span className="font-bold text-primary">£14.99/month</span>.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center lg:justify-start">
              <Button
                size="lg"
                onClick={() => scrollToSection("signup")}
                className="px-8 py-6 text-lg bg-primary hover:bg-primary/90 shadow-elegant"
              >
                Start 30-Day Free Pilot
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection("how-it-works")}
                className="px-8 py-6 text-lg border-2"
              >
                See How It Works
              </Button>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              ✓ Cancel anytime  ✓ Setup in 10 minutes
            </p>
          </div>
          
          {/* Chat Preview */}
          <div className="hidden lg:block mt-12 lg:mt-0">
            <div className="bg-card/50 backdrop-blur-lg rounded-2xl p-6 shadow-elegant border border-border">
              <div className="space-y-4">
                <div className="bg-muted rounded-lg p-4">
                  <p className="text-sm font-medium text-muted-foreground mb-1">Customer (10:37pm)</p>
                  <p className="text-foreground">"Do you work weekends?"</p>
                </div>
                <div className="bg-primary rounded-lg p-4 ml-8">
                  <p className="text-sm font-medium text-primary-foreground/80 mb-1">Your Assistant (10:37pm)</p>
                  <p className="text-primary-foreground">"Yes, I work Saturdays 9am-5pm. Sundays by exception for urgent jobs. What do you need help with?"</p>
                </div>
                <div className="bg-muted rounded-lg p-4">
                  <p className="text-sm font-medium text-muted-foreground mb-1">Customer (10:39pm)</p>
                  <p className="text-foreground">"Hang a door in Livingston next week"</p>
                </div>
                <div className="bg-primary rounded-lg p-4 ml-8">
                  <p className="text-sm font-medium text-primary-foreground/80 mb-1">Your Assistant (10:39pm)</p>
                  <p className="text-primary-foreground">"Perfect! I charge £60 to hang a door and I cover Livingston. What's your postcode and phone number?"</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewHero;
