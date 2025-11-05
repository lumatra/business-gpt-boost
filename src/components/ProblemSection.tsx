import React from "react";
import { Clock, MessageSquare, AlertCircle } from "lucide-react";

const ProblemSection = () => {
  return (
    <section id="problem" className="py-24 bg-gray-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-emerald-400 tracking-wide uppercase">
            The Problem
          </h2>
          <p className="mt-2 text-4xl font-extrabold text-white sm:text-5xl">
            You're Trapped in Your Inbox
          </p>
          <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
            As a small business owner, you do everything. But "everything" includes answering the same 10 questions every single day.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-800 p-8 rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-emerald-500 text-white">
              <Clock className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-xl font-bold text-white">Time Wasted</h3>
            <p className="mt-2 text-base text-gray-300">
              Hours each week answering "What are your opening hours?" and "Do you offer X service?"
            </p>
          </div>
          
          <div className="bg-gray-800 p-8 rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-emerald-500 text-white">
              <MessageSquare className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-xl font-bold text-white">Customer Frustration</h3>
            <p className="mt-2 text-base text-gray-300">
              Customers want instant answers. If you're on a job, they'll move on to your competitor.
            </p>
          </div>
          
          <div className="bg-gray-800 p-8 rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-emerald-500 text-white">
              <AlertCircle className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-xl font-bold text-white">No Scalability</h3>
            <p className="mt-2 text-base text-gray-300">
              You can't grow if you're always stuck answering the phone or replying to emails.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
