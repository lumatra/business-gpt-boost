import React from "react";
import { Button } from "./ui/button";
import { Check } from "lucide-react";

const SIGNUP_URLS = {
  starter: "https://portal.helpzz.co.uk/signup?plan=starter",
  pro: "https://portal.helpzz.co.uk/signup?plan=pro",
  plus: "https://portal.helpzz.co.uk/signup?plan=plus",
};

const PricingSection = () => {

  return (
    <section id="pricing" className="py-24 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Transparent Pricing. No Surprises.
          </h2>
          <p className="text-xl text-muted-foreground">All plans include all 4 assistants</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Starter */}
          <div className="bg-card rounded-2xl p-8 border-2 border-border shadow-card hover:shadow-elegant transition-all duration-300">
            <h3 className="text-2xl font-bold text-card-foreground mb-2">Starter</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-card-foreground">£9.99</span>
              <span className="text-muted-foreground">/month</span>
            </div>
            <p className="text-muted-foreground mb-6">Perfect for solo traders testing the waters</p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <Check className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">All 4 assistants</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">100 customer interactions/month</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">Email support</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">Cancel anytime</span>
              </li>
            </ul>
            <Button
              onClick={() => window.open(SIGNUP_URLS.starter, '_blank')}
              variant="secondary"
              className="w-full py-3"
            >
              Start Free Trial
            </Button>
          </div>

          {/* Pro (Most Popular) */}
          <div className="bg-primary text-primary-foreground rounded-2xl p-8 relative transform md:scale-105 shadow-elegant">
            <div className="absolute top-0 right-0 bg-yellow-400 text-gray-900 px-4 py-1 rounded-bl-lg rounded-tr-2xl text-sm font-bold">
              MOST POPULAR
            </div>
            <h3 className="text-2xl font-bold mb-2">Pro</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold">£19.99</span>
              <span className="text-primary-foreground/80">/month</span>
            </div>
            <p className="text-primary-foreground/80 mb-6">For busy businesses with steady inquiries</p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <Check className="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                <span>All 4 assistants</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                <span className="font-semibold">250 customer interactions/month</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                <span>UK phone number included</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                <span className="font-semibold">Priority support</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                <span className="font-semibold">Monthly optimization call</span>
              </li>
            </ul>
            <Button
              onClick={() => window.open(SIGNUP_URLS.pro, '_blank')}
              className="w-full py-3 bg-white text-primary hover:bg-gray-100"
            >
              Subscribe
            </Button>
          </div>

          {/* Plus */}
          <div className="bg-card rounded-2xl p-8 border-2 border-border shadow-card hover:shadow-elegant transition-all duration-300">
            <h3 className="text-2xl font-bold text-card-foreground mb-2">Plus</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-card-foreground">£34.99</span>
              <span className="text-muted-foreground">/month</span>
            </div>
            <p className="text-muted-foreground mb-6">For high-volume businesses and small teams</p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <Check className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">All 4 assistants</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground font-semibold">600 customer interactions/month</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">UK phone number included</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground font-semibold">Priority support</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground font-semibold">Weekly check-ins</span>
              </li>
            </ul>
            <Button
              onClick={() => window.open(SIGNUP_URLS.plus, '_blank')}
              variant="secondary"
              className="w-full py-3"
            >
              Subscribe
            </Button>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-2">
            <span className="font-semibold">Add-ons:</span> Business Phone Number (£4.99/mo) • Extra Messages (from £5.99)
          </p>
          <p className="text-sm text-muted-foreground">All prices exclude VAT • Unused messages roll over</p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
