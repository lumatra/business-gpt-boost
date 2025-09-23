import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Calculator, 
  FileText, 
  MessageSquare, 
  Lightbulb,
  Zap,
  Target
} from "lucide-react";

const categories = [
  {
    icon: MessageSquare,
    title: "Social Media AI Assistant",
    description: "AI that creates posts, manages content calendars, and engages with your audience across all platforms.",
    features: ["Content Creation", "Posting Schedule", "Audience Engagement", "Performance Analytics"],
    color: "text-primary",
    bgColor: "bg-primary/10",
    price: "$39/month"
  },
  {
    icon: Calculator,
    title: "Financial AI Advisor",
    description: "Personalized financial planning, budgeting, cash flow management, and investment guidance for your business.",
    features: ["Budget Planning", "Cash Flow Analysis", "Financial Reports", "Investment Advice"],
    color: "text-accent",
    bgColor: "bg-accent/10",
    price: "$49/month"
  },
  {
    icon: FileText,
    title: "Tender & Sales AI Expert",
    description: "Win more contracts with AI-powered proposal writing, bid strategy, and sales copy optimization.",
    features: ["Proposal Writing", "Bid Strategy", "Sales Copy", "Contract Analysis"],
    color: "text-primary",
    bgColor: "bg-primary/10",
    price: "$59/month"
  },
  {
    icon: TrendingUp,
    title: "Marketing AI Specialist",
    description: "Complete marketing automation including campaigns, email marketing, advertising, and brand strategy.",
    features: ["Campaign Strategy", "Email Marketing", "Ad Creation", "Brand Development"],
    color: "text-accent",
    bgColor: "bg-accent/10",
    price: "$49/month"
  },
  {
    icon: Lightbulb,
    title: "Custom AI Solutions",
    description: "Tailored AI for your unique needs - CRM automation, business case development, process optimization.",
    features: ["CRM Integration", "Business Cases", "Process Automation", "Custom Workflows"],
    color: "text-primary",
    bgColor: "bg-primary/10",
    price: "From $79/month"
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
                className="group hover:shadow-card transition-all duration-300 hover:scale-105 border-border/50 bg-card/50 backdrop-blur-sm relative"
              >
                <div className="absolute top-4 right-4">
                  <div className="bg-gradient-primary text-primary-foreground text-sm font-bold px-3 py-1 rounded-full">
                    {category.price}
                  </div>
                </div>
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