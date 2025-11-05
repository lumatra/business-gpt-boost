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
    <section id="pricing" className="py-24 bg-gray-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-emerald-400 tracking-wide uppercase">
            Pricing
          </h2>
          <p className="mt-2 text-4xl font-extrabold text-white sm:text-5xl">
            Simple, Transparent Pricing
          </p>
          <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
            No hidden fees. No contracts. Cancel anytime.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Starter Plan */}
          <div className="bg-gray-800 rounded-lg shadow-xl p-8 flex flex-col justify-between border-2 border-gray-700">
            <div>
              <h3 className="text-2xl font-bold text-white text-center">Starter</h3>
              <div className="flex items-baseline justify-center mt-6">
                <span className="text-5xl font-extrabold text-white">£9.99</span>
                <span className="ml-2 text-xl font-medium text-gray-300">/month</span>
              </div>
              <p className="mt-4 text-lg text-gray-300 text-center">75 Included Messages</p>
              
              <ul className="mt-8 space-y-4 text-gray-300">
                <li className="flex items-center">
                  <Check className="flex-shrink-0 h-6 w-6 text-emerald-400" />
                  <span className="ml-3 text-base">For solo traders just getting started.</span>
                </li>
              </ul>
            </div>
            <Button
              onClick={scrollToSignup}
              className="mt-10 w-full bg-emerald-600 hover:bg-emerald-700"
            >
              Get Started
            </Button>
          </div>

          {/* Pro Plan (Highlighted) */}
          <div className="bg-gray-800 rounded-lg shadow-xl p-8 flex flex-col justify-between border-2 border-emerald-500 relative">
            <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-emerald-500 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase">
              Most Popular
            </span>
            <div>
              <h3 className="text-2xl font-bold text-white text-center">Pro</h3>
              <div className="flex items-baseline justify-center mt-6">
                <span className="text-5xl font-extrabold text-white">£19.99</span>
                <span className="ml-2 text-xl font-medium text-gray-300">/month</span>
              </div>
              <p className="mt-4 text-lg text-gray-300 text-center">150 Included Messages</p>
              
              <ul className="mt-8 space-y-4 text-gray-300">
                <li className="flex items-center">
                  <Check className="flex-shrink-0 h-6 w-6 text-emerald-400" />
                  <span className="ml-3 text-base">For busy plumbers, joiners, & gardeners.</span>
                </li>
              </ul>
            </div>
            <Button
              onClick={scrollToSignup}
              className="mt-10 w-full bg-emerald-600 hover:bg-emerald-700"
            >
              Get Started
            </Button>
          </div>

          {/* Plus Plan */}
          <div className="bg-gray-800 rounded-lg shadow-xl p-8 flex flex-col justify-between border-2 border-gray-700">
            <div>
              <h3 className="text-2xl font-bold text-white text-center">Plus</h3>
              <div className="flex items-baseline justify-center mt-6">
                <span className="text-5xl font-extrabold text-white">£34.99</span>
                <span className="ml-2 text-xl font-medium text-gray-300">/month</span>
              </div>
              <p className="mt-4 text-lg text-gray-300 text-center">300 Included Messages</p>
              
              <ul className="mt-8 space-y-4 text-gray-300">
                <li className="flex items-center">
                  <Check className="flex-shrink-0 h-6 w-6 text-emerald-400" />
                  <span className="ml-3 text-base">For small teams & multi-trades.</span>
                </li>
              </ul>
            </div>
            <Button
              onClick={scrollToSignup}
              className="mt-10 w-full bg-emerald-600 hover:bg-emerald-700"
            >
              Get Started
            </Button>
          </div>

          {/* Top-up Plan */}
          <div className="bg-gray-800 rounded-lg shadow-xl p-8 flex flex-col justify-between border-2 border-gray-700">
            <div>
              <h3 className="text-2xl font-bold text-white text-center">Top-up</h3>
              <div className="flex items-baseline justify-center mt-6">
                <span className="text-5xl font-extrabold text-white">£5</span>
              </div>
              <p className="mt-4 text-lg text-gray-300 text-center">+50 Messages</p>
              
              <ul className="mt-8 space-y-4 text-gray-300">
                <li className="flex items-center">
                  <Check className="flex-shrink-0 h-6 w-6 text-emerald-400" />
                  <span className="ml-3 text-base">Stay online when work floods in.</span>
                </li>
              </ul>
            </div>
            <Button
              onClick={scrollToSignup}
              variant="secondary"
              className="mt-10 w-full bg-gray-600 hover:bg-gray-700 text-gray-300"
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
