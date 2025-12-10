import React from "react";
import { X, Phone, Calendar, Clock } from "lucide-react";

const ProblemSection = () => {
  return (
    <section id="problem" className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            You're Brilliant at Your Work.
          </h2>
          <p className="text-xl text-muted-foreground">
            But You Can't Be in Two Places at Once.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-card p-6 rounded-xl shadow-card border border-border">
            <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center mb-4">
              <X className="w-6 h-6 text-destructive" />
            </div>
            <h3 className="font-semibold text-card-foreground mb-2">Customer texts while you're on a job</h3>
            <p className="text-muted-foreground">You miss the lead</p>
          </div>
          
          <div className="bg-card p-6 rounded-xl shadow-card border border-border">
            <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center mb-4">
              <Phone className="w-6 h-6 text-destructive" />
            </div>
            <h3 className="font-semibold text-card-foreground mb-2">Someone calls at 8pm</h3>
            <p className="text-muted-foreground">Straight to voicemail</p>
          </div>
          
          <div className="bg-card p-6 rounded-xl shadow-card border border-border">
            <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center mb-4">
              <Calendar className="w-6 h-6 text-destructive" />
            </div>
            <h3 className="font-semibold text-card-foreground mb-2">Weekend inquiry</h3>
            <p className="text-muted-foreground">Lost to competitor who replied first</p>
          </div>
          
          <div className="bg-card p-6 rounded-xl shadow-card border border-border">
            <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-destructive" />
            </div>
            <h3 className="font-semibold text-card-foreground mb-2">Same questions over and over</h3>
            <p className="text-muted-foreground">Wasting your time</p>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <p className="text-xl font-semibold text-foreground">Every missed inquiry is money left on the table.</p>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
