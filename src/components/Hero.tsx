import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-20">
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center py-20">
        <div className="space-y-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">Boost Your Business Results</span>
          </div>

          {/* Main Headline - matching reference exactly */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight tracking-tight">
            <span className="block bg-gradient-primary bg-clip-text text-transparent mb-2">
              Your Personal Business AI
            </span>
            <span className="block text-foreground">
              That Knows Your Company
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-base md:text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed px-4">
            Get instant, personalized answers and expert help tailored to your specific business. Our AI learns your company, industry, and challenges to provide custom solutions 24/7.
          </p>

          {/* CTA Buttons - matching reference */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <Link to="/contact">
              <Button 
                size="lg" 
                className="text-base px-10 py-7 bg-gradient-primary hover:shadow-glow transition-all duration-300 font-semibold rounded-xl text-lg"
              >
                Get My Personal AI Assistant
              </Button>
            </Link>
            <Link to="/examples">
              <Button 
                variant="outline" 
                size="lg"
                className="text-base px-10 py-7 border-2 border-border hover:bg-secondary transition-smooth rounded-xl text-lg"
              >
                See Personalized Examples
              </Button>
            </Link>
          </div>

          {/* Key stats - larger and more prominent */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mt-24 pt-16">
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-3">24/7</div>
              <div className="text-muted-foreground">AI Availability</div>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-3">Expert</div>
              <div className="text-muted-foreground">Industry Knowledge</div>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-3">&lt;5min</div>
              <div className="text-muted-foreground">Setup Time</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;