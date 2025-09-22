import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Calculator, 
  FileText, 
  Users, 
  BarChart3, 
  Shield,
  Zap,
  Target
} from "lucide-react";

const categories = [
  {
    icon: TrendingUp,
    title: "Marketing Specialist",
    description: "Get professional marketing campaigns, social media content, and advertising strategies that actually convert customers.",
    features: ["Social Media Posts", "Email Campaigns", "Ad Copy That Sells", "Brand Messaging"],
    color: "text-primary",
    bgColor: "bg-primary/10"
  },
  {
    icon: Calculator,
    title: "Finance Expert",
    description: "Get instant financial analysis, budgeting help, and cash flow forecasts to make smarter money decisions.",
    features: ["Cash Flow Analysis", "Budget Planning", "Financial Reports", "Investment Advice"],
    color: "text-accent",
    bgColor: "bg-accent/10"
  },
  {
    icon: FileText,
    title: "Tender & Proposal Specialist",
    description: "Win more government contracts and tenders with professionally written proposals and compliance guidance.",
    features: ["Tender Writing", "Compliance Checks", "Proposal Templates", "Bid Strategy"],
    color: "text-primary",
    bgColor: "bg-primary/10"
  },
  {
    icon: Users,
    title: "HR Assistant",
    description: "Handle recruitment, employee policies, and HR compliance with expert guidance and templates.",
    features: ["Job Descriptions", "Interview Questions", "Policy Templates", "Performance Reviews"],
    color: "text-accent",
    bgColor: "bg-accent/10"
  },
  {
    icon: BarChart3,
    title: "Business Analyst",
    description: "Turn your business data into actionable insights with reports and recommendations you can actually use.",
    features: ["Sales Reports", "Performance Tracking", "Market Analysis", "Growth Strategies"],
    color: "text-primary",
    bgColor: "bg-primary/10"
  },
  {
    icon: Shield,
    title: "Operations Manager",
    description: "Streamline your daily operations with process improvements and efficiency recommendations.",
    features: ["Process Optimization", "Quality Control", "Inventory Planning", "Cost Reduction"],
    color: "text-accent",
    bgColor: "bg-accent/10"
  }
];

const Categories = () => {
  return (
    <section className="py-24 px-6 bg-gradient-secondary">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Zap className="w-4 h-4 mr-2 text-primary" />
            <span className="text-sm font-medium text-primary">Expert Help Available 24/7</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Your Business <span className="bg-gradient-primary bg-clip-text text-transparent">Experts</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get instant access to specialists who understand your business challenges and deliver results.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card 
                key={index} 
                className="group hover:shadow-card transition-all duration-300 hover:scale-105 border-border/50 bg-card/50 backdrop-blur-sm"
              >
                <CardHeader className="pb-4">
                  <div className={`w-12 h-12 rounded-lg ${category.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-6 h-6 ${category.color}`} />
                  </div>
                  <CardTitle className="text-xl mb-2">{category.title}</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {category.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {category.features.map((feature, featureIndex) => (
                      <Badge 
                        key={featureIndex}
                        variant="secondary"
                        className="text-xs bg-secondary/50 hover:bg-secondary/70 transition-colors"
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-primary text-primary-foreground font-medium hover:shadow-glow transition-all duration-300 cursor-pointer">
            <Target className="w-5 h-5 mr-2" />
            Talk to Your Expert Now
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;