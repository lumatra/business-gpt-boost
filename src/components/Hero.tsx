import React from "react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/business-hero.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Business professionals working with AI technology"
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-background/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <div className="space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
            <span className="text-sm font-medium text-primary">🚀 Boost Your Business Results</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Your Personal Business AI
            </span>
            <br />
            <span className="text-foreground">
              That Knows Your Company
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Get instant, personalized answers and expert help tailored to your specific business. 
            Our AI learns your company, industry, and challenges to provide custom solutions 24/7.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="text-lg px-8 py-4 bg-gradient-primary hover:shadow-glow transition-all duration-300 transform hover:scale-105"
            >
              Get My Personal AI Assistant
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="text-lg px-8 py-4 border-primary/30 hover:bg-primary/5 transition-smooth"
              onClick={() => {
                document.getElementById('categories')?.scrollIntoView({ 
                  behavior: 'smooth' 
                });
              }}
            >
              See Personalized Examples
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-16 border-t border-border/50">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground">Personalized Support</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">10,000+</div>
              <div className="text-muted-foreground">Companies Helped</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">&lt;5min</div>
              <div className="text-muted-foreground">Setup Time</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;