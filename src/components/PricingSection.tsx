import React from "react";
import { Button } from "./ui/button";
import { Check } from "lucide-react";

const SIGNUP_URL = "https://portal.helpzz.co.uk/signup?plan=starter";

const PricingSection = () => {
  return (
    <section id="pricing" className="min-h-screen flex flex-col justify-center snap-start bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            One Simple Plan. No Complications.
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need for Helpzz to capture enquiries and handle customer messages.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto items-start">
          {/* Pricing Card */}
          <div className="bg-card rounded-2xl p-6 border-2 border-primary shadow-elegant">
            <h3 className="text-2xl font-bold text-card-foreground mb-2">Helpzz Plan</h3>
            <div className="mb-4">
              <span className="text-4xl font-bold text-card-foreground">£14.99</span>
              <span className="text-muted-foreground"> per month</span>
              <p className="text-sm text-muted-foreground mt-1">After 30-day free pilot</p>
            </div>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start">
                <Check className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">25 automated replies included each month</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">UK business number included</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">SMS responses included</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">Personal setup call to tailor Helpzz to your business</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">Cancel anytime</span>
              </li>
            </ul>
            <Button
              onClick={() => window.open(SIGNUP_URL, '_blank')}
              className="w-full py-3 bg-primary hover:bg-primary/90 text-lg"
              size="lg"
            >
              Start 30-Day Free Pilot
            </Button>
            <p className="text-sm text-muted-foreground text-center mt-2">
              No payment required to start
            </p>
          </div>

          {/* What happens next */}
          <div className="flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-foreground mb-6">What happens next</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <span className="text-2xl">1️⃣</span>
                <div>
                  <h4 className="text-lg font-semibold text-foreground">Book your setup call</h4>
                  <p className="text-muted-foreground">We learn about your business</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-2xl">2️⃣</span>
                <div>
                  <h4 className="text-lg font-semibold text-foreground">We configure your assistants</h4>
                  <p className="text-muted-foreground">Pricing, services, and service area</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-2xl">3️⃣</span>
                <div>
                  <h4 className="text-lg font-semibold text-foreground">You're live the same day</h4>
                  <p className="text-muted-foreground">Helpzz starts capturing enquiries</p>
                </div>
              </div>
            </div>
            <p className="text-lg font-semibold text-foreground mt-6">
              If Helpzz saves you just one missed job per month, it pays for itself.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
