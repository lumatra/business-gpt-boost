import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  TrendingUp, 
  Calculator, 
  FileText, 
  MessageSquare, 
  Lightbulb,
  Zap,
  Target,
  Headphones,
  Check,
  ChevronDown
} from "lucide-react";

import { categories } from "@/data/categories";

const Categories = () => {
  return (
    <section id="categories" className="py-24 px-6 bg-gradient-secondary">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Expert Specialists at the Touch of a Button
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
            Why hire multiple expensive consultants when you can have an entire team of AI specialists ready to help your business 24/7? Each AI is trained specifically for your industry and challenges.
          </p>
          
          <div className="bg-card border border-border rounded-2xl p-8 max-w-4xl mx-auto mb-12">
            <h3 className="text-2xl font-bold mb-4 text-foreground">
              Save More with Bundled Packages
            </h3>
            <p className="text-muted-foreground mb-6">
              Choose individual AI specialists or save significantly with our bundled packages for comprehensive AI support.
            </p>
            <div className="flex items-center justify-center gap-6 text-sm">
              <div className="bg-primary/10 text-primary px-4 py-2 rounded-full font-medium">
                Expert AI specialists ready to help
              </div>
              <div className="bg-accent/10 text-accent px-4 py-2 rounded-full font-medium">
                Setup in under 5 minutes
              </div>
            </div>
          </div>
        </div>

        {/* Remove individual services section - now integrated into packages */}

        {/* Package Plans */}
        <div className="mb-16">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Individual Services Package */}
            <div className="relative bg-card border border-border rounded-2xl p-6 transition-all duration-300 hover:shadow-card">
              <div className="text-center mb-6">
                <h4 className="text-2xl font-bold mb-2 text-foreground">Individual</h4>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-foreground">£19.99</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <p className="text-muted-foreground">1 AI Specialist of Your Choice</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">Choose from 6 different specialists</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">Basic training & setup included</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">Email support</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">24/7 availability</span>
                </li>
              </ul>
              
              <Link to="/categories">
                <Button className="w-full" variant="outline">
                  <span className="mr-2">View All Specialists</span>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </Link>
            </div>
            {/* Starter Package */}
            <div className="relative bg-card border border-border rounded-2xl p-6 transition-all duration-300 hover:shadow-card">
              <div className="text-center mb-6">
                <h4 className="text-2xl font-bold mb-2 text-foreground">Starter</h4>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-foreground">£29</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <div className="bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full mb-3">
                  Save £10.98/month
                </div>
                <p className="text-muted-foreground">Perfect for solo entrepreneurs</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">Choose 2 AI assistants</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">1 user account</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">24/7 AI support</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">Basic training & setup</span>
                </li>
              </ul>
              
              <Button className="w-full">
                Start Free Trial
              </Button>
            </div>

            {/* Pro Package */}
            <div className="relative bg-card border-2 border-primary shadow-lg shadow-primary/20 scale-105 rounded-2xl p-6 transition-all duration-300 hover:shadow-glow">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-gradient-primary text-primary-foreground px-4 py-1 text-sm font-semibold">
                  Most Popular
                </Badge>
              </div>
              
              <div className="text-center mb-6">
                <h4 className="text-2xl font-bold mb-2 text-foreground">Pro</h4>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-foreground">£49</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <div className="bg-accent/10 text-accent text-xs font-bold px-3 py-1 rounded-full mb-3">
                  Save £30.96/month
                </div>
                <p className="text-muted-foreground">Ideal for growing businesses</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">Choose 4 AI assistants</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">Up to 3 users</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">Priority AI support</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">Advanced training & customization</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">Team collaboration tools</span>
                </li>
              </ul>
              
              <Button className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300 text-lg font-semibold py-3">
                Start Free Trial Now
              </Button>
            </div>

            {/* Enterprise Package */}
            <div className="relative bg-card border border-border rounded-2xl p-6 transition-all duration-300 hover:shadow-card">
              <div className="text-center mb-6">
                <h4 className="text-2xl font-bold mb-2 text-foreground">Enterprise</h4>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-foreground">£119</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <div className="bg-accent/10 text-accent text-xs font-medium px-3 py-1 rounded-full mb-3">
                  Save £20.94/month
                </div>
                <p className="text-muted-foreground">Complete AI solution</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">All 6 AI assistants included</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">2 custom AI solutions</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">Up to 10 users</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">Dedicated account manager</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">Custom integrations</span>
                </li>
              </ul>
              
              <Button className="w-full" variant="outline">
                Contact Sales
              </Button>
            </div>

            </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;