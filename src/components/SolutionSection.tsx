import React from "react";
import { Zap, Clock, MessageCircle } from "lucide-react";

const SolutionSection = () => {
  return (
    <section id="solution" className="py-24 bg-card">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-primary tracking-wide uppercase">
            Our Solution
          </h2>
          <p className="mt-2 text-4xl font-extrabold text-card-foreground sm:text-5xl">
            Your Personal AI Assistant
          </p>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            We build a custom AI agent trained on your business. It handles FAQs, books appointments, and answers customer queries — all automatically.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-background p-8 rounded-lg shadow-card border border-border">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-primary-foreground">
              <Clock className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-xl font-bold text-foreground">24/7 Availability</h3>
            <p className="mt-2 text-base text-muted-foreground">
              Your AI assistant never sleeps. It's there for customers at 2 AM, on weekends, and during holidays.
            </p>
          </div>
          
          <div className="bg-background p-8 rounded-lg shadow-card border border-border">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-primary-foreground">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-xl font-bold text-foreground">Instant Responses</h3>
            <p className="mt-2 text-base text-muted-foreground">
              Customers get answers in seconds, not hours. No more "I'll get back to you tomorrow."
            </p>
          </div>
          
          <div className="bg-background p-8 rounded-lg shadow-card border border-border">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-primary-foreground">
              <MessageCircle className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-xl font-bold text-foreground">Trained on Your Business</h3>
            <p className="mt-2 text-base text-muted-foreground">
              We customize the AI to know your services, pricing, availability — everything your customers ask about.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
