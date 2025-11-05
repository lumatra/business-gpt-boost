import React from "react";
import { Zap, Clock, MessageCircle } from "lucide-react";

const SolutionSection = () => {
  return (
    <section id="solution" className="py-24 bg-gray-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-emerald-400 tracking-wide uppercase">
            Our Solution
          </h2>
          <p className="mt-2 text-4xl font-extrabold text-white sm:text-5xl">
            Your Personal AI Assistant
          </p>
          <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
            We build a custom AI agent trained on your business. It handles FAQs, books appointments, and answers customer queries — all automatically.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-900 p-8 rounded-lg shadow-xl">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-emerald-500 text-white">
              <Clock className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-xl font-bold text-white">24/7 Availability</h3>
            <p className="mt-2 text-base text-gray-300">
              Your AI assistant never sleeps. It's there for customers at 2 AM, on weekends, and during holidays.
            </p>
          </div>
          
          <div className="bg-gray-900 p-8 rounded-lg shadow-xl">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-emerald-500 text-white">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-xl font-bold text-white">Instant Responses</h3>
            <p className="mt-2 text-base text-gray-300">
              Customers get answers in seconds, not hours. No more "I'll get back to you tomorrow."
            </p>
          </div>
          
          <div className="bg-gray-900 p-8 rounded-lg shadow-xl">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-emerald-500 text-white">
              <MessageCircle className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-xl font-bold text-white">Trained on Your Business</h3>
            <p className="mt-2 text-base text-gray-300">
              We customize the AI to know your services, pricing, availability — everything your customers ask about.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
