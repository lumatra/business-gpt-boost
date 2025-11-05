import React from "react";
import { Clock, MessageSquare, AlertCircle } from "lucide-react";

const ProblemSection = () => {
  return (
    <section id="problem" className="py-24 bg-muted">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-primary tracking-wide uppercase">
            The Problem
          </h2>
          <p className="mt-2 text-4xl font-extrabold text-foreground sm:text-5xl">
            You're Trapped in Your Inbox
          </p>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            As a small business owner, you do everything. But "everything" includes answering the same 10 questions every single day.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-card p-8 rounded-lg shadow-card transform hover:scale-105 transition-transform duration-300 border border-border">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-primary-foreground">
              <Clock className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-xl font-bold text-card-foreground">Time Wasted</h3>
            <p className="mt-2 text-base text-muted-foreground">
              Hours each week answering "What are your opening hours?" and "Do you offer X service?"
            </p>
          </div>
          
          <div className="bg-card p-8 rounded-lg shadow-card transform hover:scale-105 transition-transform duration-300 border border-border">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-primary-foreground">
              <MessageSquare className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-xl font-bold text-card-foreground">Customer Frustration</h3>
            <p className="mt-2 text-base text-muted-foreground">
              Customers want instant answers. If you're on a job, they'll move on to your competitor.
            </p>
          </div>
          
          <div className="bg-card p-8 rounded-lg shadow-card transform hover:scale-105 transition-transform duration-300 border border-border">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-primary-foreground">
              <AlertCircle className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-xl font-bold text-card-foreground">No Scalability</h3>
            <p className="mt-2 text-base text-muted-foreground">
              You can't grow if you're always stuck answering the phone or replying to emails.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
