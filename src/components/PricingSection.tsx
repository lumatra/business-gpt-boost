import React from "react";
import { Button } from "./ui/button";
import { Check } from "lucide-react";

const PricingSection = () => {
  const scrollToSignup = () => {
    const element = document.getElementById("signup");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="pricing" className="py-24 bg-muted">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-primary tracking-wide uppercase">
            Pricing
          </h2>
          <p className="mt-2 text-4xl font-extrabold text-foreground sm:text-5xl">
            Simple, Transparent Pricing
          </p>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            No hidden fees. No contracts. Cancel anytime.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Starter Plan */}
          <div className="bg-card rounded-lg shadow-card p-6 flex flex-col justify-between border-2 border-border min-h-[500px]">
            <div className="flex flex-col flex-grow">
              <h3 className="text-xl font-bold text-card-foreground text-center">Starter</h3>
              <div className="flex items-baseline justify-center mt-4">
                <span className="text-4xl font-extrabold text-card-foreground">£9.99</span>
                <span className="ml-1 text-base font-medium text-muted-foreground">/month</span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground text-center">75 Included Messages</p>
              
              <ul className="mt-6 space-y-3 text-muted-foreground flex-grow">
                <li className="flex items-start">
                  <Check className="flex-shrink-0 h-5 w-5 text-primary mt-0.5" />
                  <span className="ml-2 text-sm">For solo traders just getting started.</span>
                </li>
              </ul>
            </div>
            <Button
              onClick={scrollToSignup}
              className="mt-6 w-full bg-primary hover:bg-primary/90"
            >
              Get Started
            </Button>
          </div>

          {/* Pro Plan (Highlighted) */}
          <div className="bg-card rounded-lg shadow-elegant p-6 flex flex-col justify-between border-2 border-primary relative min-h-[500px]">
            <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-xs font-semibold px-2.5 py-0.5 rounded-full uppercase">
              Most Popular
            </span>
            <div className="flex flex-col flex-grow pt-2">
              <h3 className="text-xl font-bold text-card-foreground text-center">Pro</h3>
              <div className="flex items-baseline justify-center mt-4">
                <span className="text-4xl font-extrabold text-card-foreground">£19.99</span>
                <span className="ml-1 text-base font-medium text-muted-foreground">/month</span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground text-center">150 Included Messages</p>
              
              <ul className="mt-6 space-y-3 text-muted-foreground flex-grow">
                <li className="flex items-start">
                  <Check className="flex-shrink-0 h-5 w-5 text-primary mt-0.5" />
                  <span className="ml-2 text-sm">For busy plumbers, joiners, & gardeners.</span>
                </li>
              </ul>
            </div>
            <Button
              onClick={scrollToSignup}
              className="mt-6 w-full bg-primary hover:bg-primary/90"
            >
              Get Started
            </Button>
          </div>

          {/* Plus Plan */}
          <div className="bg-card rounded-lg shadow-card p-6 flex flex-col justify-between border-2 border-border min-h-[500px]">
            <div className="flex flex-col flex-grow">
              <h3 className="text-xl font-bold text-card-foreground text-center">Plus</h3>
              <div className="flex items-baseline justify-center mt-4">
                <span className="text-4xl font-extrabold text-card-foreground">£34.99</span>
                <span className="ml-1 text-base font-medium text-muted-foreground">/month</span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground text-center">300 Included Messages</p>
              
              <ul className="mt-6 space-y-3 text-muted-foreground flex-grow">
                <li className="flex items-start">
                  <Check className="flex-shrink-0 h-5 w-5 text-primary mt-0.5" />
                  <span className="ml-2 text-sm">For small teams & multi-trades.</span>
                </li>
              </ul>
            </div>
            <Button
              onClick={scrollToSignup}
              className="mt-6 w-full bg-primary hover:bg-primary/90"
            >
              Get Started
            </Button>
          </div>

          {/* Top-up Plan */}
          <div className="bg-card rounded-lg shadow-card p-6 flex flex-col justify-between border-2 border-border min-h-[500px]">
            <div className="flex flex-col flex-grow">
              <h3 className="text-xl font-bold text-card-foreground text-center">Top-up</h3>
              <div className="flex items-baseline justify-center mt-4">
                <span className="text-4xl font-extrabold text-card-foreground">£5</span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground text-center">+50 Messages</p>
              
              <ul className="mt-6 space-y-3 text-muted-foreground flex-grow">
                <li className="flex items-start">
                  <Check className="flex-shrink-0 h-5 w-5 text-primary mt-0.5" />
                  <span className="ml-2 text-sm">Stay online when work floods in.</span>
                </li>
              </ul>
            </div>
            <Button
              onClick={scrollToSignup}
              variant="secondary"
              className="mt-6 w-full"
            >
              Add to Plan
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
