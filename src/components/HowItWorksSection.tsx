import React from "react";
import { Button } from "./ui/button";

const HowItWorksSection = () => {
  const scrollToSignup = () => {
    const element = document.getElementById("signup");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="how-it-works" className="min-h-screen flex flex-col justify-center snap-start bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-card-foreground mb-4">
            Set Up in 10 Minutes. Never Miss Another Enquiry.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
            <h3 className="text-xl font-bold text-card-foreground mb-3">Quick Setup</h3>
            <p className="text-muted-foreground mb-2">Tell us about your business (10 minutes)</p>
            <p className="text-muted-foreground mb-2">Choose what you need</p>
            <p className="text-sm font-semibold text-primary">→ We'll configure everything for you</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
            <h3 className="text-xl font-bold text-card-foreground mb-3">Start Working</h3>
            <p className="text-muted-foreground mb-2">Customers text your business or use your website</p>
            <p className="text-muted-foreground mb-2">Helpzz replies instantly using your pricing and services</p>
            <p className="text-sm font-semibold text-primary">→ Optional business phone number included</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
            <h3 className="text-xl font-bold text-card-foreground mb-3">You Get the Leads</h3>
            <p className="text-muted-foreground mb-2">Captures their details automatically</p>
            <p className="text-muted-foreground mb-2">Sent to you instantly by SMS or email</p>
            <p className="text-sm font-semibold text-primary">→ You call back when you're ready</p>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-lg font-semibold text-muted-foreground mb-6">No app to download. No tech skills needed. Just works.</p>
          <Button
            size="lg"
            onClick={scrollToSignup}
            className="px-8 py-6 text-lg bg-primary hover:bg-primary/90 shadow-elegant"
          >
            Start 30-Day Free Pilot
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
