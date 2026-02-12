import React from "react";
import { Button } from "./ui/button";
import { Check } from "lucide-react";

const SIGNUP_URL = "https://portal.helpzz.co.uk/signup?plan=starter";

const PricingSection = () => {
  return (
    <section id="pricing" className="py-24 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            One Simple Plan. No Complications.
          </h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to let Helpzz handle customer messages and stay organised.
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <div className="bg-card rounded-2xl p-8 border-2 border-primary shadow-elegant">
            <h3 className="text-2xl font-bold text-card-foreground mb-2">Helpzz Plan</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-card-foreground">£14.99</span>
              <span className="text-muted-foreground"> per month</span>
              <p className="text-sm text-muted-foreground mt-1">After 30-day free pilot</p>
            </div>
            <p className="text-muted-foreground mb-6">
              Designed to help you respond faster and never miss a customer enquiry.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <Check className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">25 replies to your customers each month</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">UK business number included</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">SMS responses included</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">Personal setup call to tailor Helpzz to your business</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">Cancel anytime</span>
              </li>
            </ul>
            <Button
              onClick={() => window.open(SIGNUP_URL, '_blank')}
              className="w-full py-3 bg-primary hover:bg-primary/90 text-lg"
              size="lg"
            >
              Start 30-Day Free Pilot
            </Button>
            <p className="text-sm text-muted-foreground text-center mt-3">
              No payment required to start
            </p>
          </div>
        </div>

        <div className="text-center mt-12 space-y-3">
          <p className="text-muted-foreground">
            Each time Helpzz replies to one of your customers, it uses one reply from your monthly allowance.
          </p>
          <p className="text-lg font-semibold text-foreground">
            If Helpzz saves you just one missed job per month, it pays for itself.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
