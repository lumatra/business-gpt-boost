import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  MessageSquare, 
  Settings, 
  Users, 
  BarChart3, 
  Shield,
  Zap,
  Target
} from "lucide-react";

const categories = [
  {
    icon: TrendingUp,
    title: "Sales & Revenue",
    description: "AI assistants that supercharge your sales pipeline and revenue growth",
    features: ["Lead Qualification", "Sales Forecasting", "Pipeline Management"],
    color: "text-primary",
    bgColor: "bg-primary/10"
  },
  {
    icon: MessageSquare,
    title: "Customer Support",
    description: "24/7 intelligent support that delights customers and reduces costs",
    features: ["Ticket Resolution", "Live Chat", "Knowledge Base"],
    color: "text-accent",
    bgColor: "bg-accent/10"
  },
  {
    icon: BarChart3,
    title: "Marketing & Analytics",
    description: "Data-driven marketing automation and performance insights",
    features: ["Campaign Optimization", "Content Creation", "ROI Analysis"],
    color: "text-primary",
    bgColor: "bg-primary/10"
  },
  {
    icon: Settings,
    title: "Operations",
    description: "Streamline workflows and automate repetitive business processes",
    features: ["Process Automation", "Resource Planning", "Quality Control"],
    color: "text-accent",
    bgColor: "bg-accent/10"
  },
  {
    icon: Users,
    title: "Human Resources",
    description: "Smart HR solutions for recruitment, onboarding, and employee management",
    features: ["Talent Acquisition", "Performance Reviews", "Training Programs"],
    color: "text-primary",
    bgColor: "bg-primary/10"
  },
  {
    icon: Shield,
    title: "Compliance & Risk",
    description: "Ensure regulatory compliance and mitigate business risks with AI",
    features: ["Risk Assessment", "Compliance Monitoring", "Audit Preparation"],
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
            <span className="text-sm font-medium text-primary">Business Solutions</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            AI for Every <span className="bg-gradient-primary bg-clip-text text-transparent">Department</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose from specialized GPTs designed for specific business functions. 
            Each assistant is trained on industry best practices and real-world scenarios.
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
            Browse All Categories
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;