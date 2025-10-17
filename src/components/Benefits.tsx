import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { 
  Clock, 
  DollarSign, 
  TrendingUp, 
  Users, 
  Lightbulb,
  ArrowRight
} from "lucide-react";

const benefits = [
  {
    icon: Clock,
    title: "Save Hours Every Day",
    description: "Your AI handles repetitive tasks instantly - from drafting emails to analyzing reports. What took hours now takes minutes. Focus on growing your business while Helpzz handles the rest.",
    metric: "10x Faster",
    color: "text-primary"
  },
  {
    icon: DollarSign,
    title: "Expert Help at Fraction of the Cost",
    description: "Get professional-level marketing, finance, and sales support without hiring full-time experts. No retainers, no minimum hours - just expert help when you need it.",
    metric: "Save 90%",
    color: "text-primary"
  },
  {
    icon: TrendingUp,
    title: "Make Smarter Decisions",
    description: "Get instant answers backed by your company data and industry best practices. From pricing strategy to market analysis, make confident decisions with AI-powered insights.",
    metric: "Data-Driven",
    color: "text-primary"
  },
  {
    icon: Users,
    title: "Your 24/7 Business Partner",
    description: "Whether it's 2 PM or 2 AM, your AI assistant is ready. Need to prepare a proposal? Draft a campaign? Analyze finances? Get expert help anytime, anywhere.",
    metric: "Always On",
    color: "text-primary"
  }
];

const Benefits = () => {
  return (
    <section id="benefits" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
            <Lightbulb className="w-4 h-4 mr-2 text-primary" />
            <span className="text-sm font-medium text-primary">How Helpzz Helps</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Get Expert Help For 
            <span className="text-primary"> Every Part of Your Business</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From marketing and sales to finance and operations - Helpzz gives you specialized AI assistants that understand your business and deliver real results.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card 
                key={index}
                className="group relative overflow-hidden bg-gradient-secondary border-border/50 hover:shadow-elegant transition-all duration-300"
              >
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`w-6 h-6 ${benefit.color}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-semibold">{benefit.title}</h3>
                        <div className={`text-2xl font-bold ${benefit.color}`}>
                          {benefit.metric}
                        </div>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="inline-flex flex-col items-center justify-center p-10 rounded-2xl bg-primary text-primary-foreground max-w-2xl mx-auto shadow-elegant">
            <h3 className="text-3xl font-bold mb-4">Ready to Work Smarter?</h3>
            <p className="text-lg text-primary-foreground/95 mb-8 max-w-lg">
              Join businesses using Helpzz to get more done in less time. Set up your AI assistant in under 5 minutes.
            </p>
            <Link to="/contact">
              <div className="inline-flex items-center px-8 py-4 bg-white text-primary rounded-lg font-semibold cursor-pointer hover:bg-white/90 transition-all shadow-lg hover:scale-105">
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;