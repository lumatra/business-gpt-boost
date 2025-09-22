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
    title: "Marketing for YOUR Industry",
    description: "Get marketing strategies specifically tailored to your business type, target customers, and competitive landscape.",
    features: ["Your Industry Focus", "Custom Campaigns", "Competitor Analysis", "Brand Voice"],
    color: "text-primary",
    bgColor: "bg-primary/10"
  },
  {
    icon: Calculator,
    title: "Financial Planning for YOUR Business",
    description: "Personalized financial advice based on your actual revenue, costs, and business model.",
    features: ["Your Business Model", "Custom Budgets", "Cash Flow Analysis", "Growth Planning"],
    color: "text-accent",
    bgColor: "bg-accent/10"
  },
  {
    icon: FileText,
    title: "Proposals Tailored to YOU",
    description: "AI that knows your company's strengths, experience, and capabilities to write winning proposals.",
    features: ["Your Experience", "Company Strengths", "Past Projects", "Custom Templates"],
    color: "text-primary",
    bgColor: "bg-primary/10"
  },
  {
    icon: Users,
    title: "HR for YOUR Company Culture",
    description: "HR guidance that reflects your company values, size, and specific workplace challenges.",
    features: ["Your Culture", "Team Size", "Company Policies", "Custom Solutions"],
    color: "text-accent",
    bgColor: "bg-accent/10"
  },
  {
    icon: BarChart3,
    title: "Analysis of YOUR Data",
    description: "Turn your specific business metrics and performance data into actionable insights and recommendations.",
    features: ["Your Metrics", "Custom Reports", "Trend Analysis", "Personal Goals"],
    color: "text-primary",
    bgColor: "bg-primary/10"
  },
  {
    icon: Shield,
    title: "Operations for YOUR Workflow",
    description: "Process improvements designed around your specific operations, team structure, and business needs.",
    features: ["Your Processes", "Team Structure", "Custom Workflows", "Efficiency Plans"],
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
            <span className="text-sm font-medium text-primary">Personalized to Your Company</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            AI That <span className="bg-gradient-primary bg-clip-text text-transparent">Knows Your Business</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your AI assistant learns your company's unique needs, industry challenges, and goals to provide tailored advice and solutions.
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
            Start Training Your Personal AI
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;