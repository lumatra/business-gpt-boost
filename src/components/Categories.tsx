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
  Target,
  Headphones
} from "lucide-react";

const categories = [
  {
    icon: MessageSquare,
    title: "Social Media AI Assistant",
    description: "Never run out of content ideas again. Your AI learns your brand voice, creates engaging posts, schedules them perfectly, and even responds to comments - all while you focus on running your business.",
    features: ["Daily Post Creation", "Brand Voice Learning", "Auto Scheduling", "Comment Management", "Hashtag Research", "Performance Insights"],
    color: "text-primary",
    bgColor: "bg-primary/10",
    price: "$39/month",
    details: "Perfect for restaurants, retail stores, service providers, and any business wanting consistent social media presence without the daily hassle."
  },
  {
    icon: Calculator,
    title: "Financial AI Advisor",
    description: "Make smarter money decisions with AI that understands your business. Get instant answers about cash flow, pricing strategies, tax planning, and growth investments tailored to your industry.",
    features: ["Cash Flow Forecasting", "Pricing Optimization", "Tax Planning", "Expense Tracking", "Profit Analysis", "Growth Recommendations"],
    color: "text-accent",
    bgColor: "bg-accent/10",
    price: "$49/month",
    details: "Ideal for consultants, contractors, small manufacturers, and service businesses who need financial clarity without expensive accountants."
  },
  {
    icon: FileText,
    title: "Tender & Sales AI Expert",
    description: "Win more deals with AI that writes compelling proposals, analyzes RFPs, creates persuasive quotes, and helps you close sales. It knows your strengths and highlights them perfectly.",
    features: ["Proposal Writing", "RFP Analysis", "Quote Generation", "Win/Loss Tracking", "Competitor Research", "Follow-up Sequences"],
    color: "text-primary",
    bgColor: "bg-primary/10",
    price: "$59/month",
    details: "Essential for B2B services, contractors, agencies, and any business that needs to write proposals or respond to tenders regularly."
  },
  {
    icon: TrendingUp,
    title: "Marketing AI Specialist",
    description: "Grow your customer base with AI that creates targeted campaigns, writes compelling emails, designs ads, and tracks what actually works for your specific business and audience.",
    features: ["Campaign Creation", "Email Sequences", "Ad Copywriting", "Landing Pages", "A/B Testing", "ROI Tracking"],
    color: "text-accent",
    bgColor: "bg-accent/10",
    price: "$49/month",
    details: "Perfect for e-commerce, local services, B2B companies, and any business wanting to attract more customers systematically."
  },
  {
    icon: Headphones,
    title: "Customer Service AI Assistant",
    description: "Deliver exceptional customer support 24/7 with AI that handles inquiries, resolves issues, and maintains your customer relationships while you sleep. Never miss a customer question again.",
    features: ["24/7 Chat Support", "FAQ Automation", "Ticket Management", "Customer Insights", "Multi-Channel Support", "Sentiment Analysis"],
    color: "text-accent",
    bgColor: "bg-accent/10",
    price: "$45/month",
    details: "Essential for online stores, service providers, and any business that values customer satisfaction and wants to provide instant support."
  },
  {
    icon: Lightbulb,
    title: "Custom AI Solutions",
    description: "Get AI that solves your unique business challenges. Whether it's automating your CRM, creating business cases, streamlining processes, or something entirely specific to your industry.",
    features: ["CRM Automation", "Process Optimization", "Business Case Writing", "Industry-Specific Solutions", "Workflow Design", "Custom Integrations"],
    color: "text-primary",
    bgColor: "bg-primary/10",
    price: "From $79/month",
    details: "Tailored for businesses with specific needs - from medical practices to manufacturing, construction to consulting - we build AI that fits your exact requirements."
  }
];

const Categories = () => {
  return (
    <section id="categories" className="py-24 px-6 bg-gradient-secondary">
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