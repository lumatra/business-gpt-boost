import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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

const categories = [
  {
    icon: MessageSquare,
    title: "Social Media AI Assistant",
    description: "Never run out of content ideas again. Your AI learns your brand voice, creates engaging posts, schedules them perfectly, and even responds to comments - all while you focus on running your business.",
    features: ["Daily Post Creation", "Brand Voice Learning", "Auto Scheduling", "Comment Management", "Hashtag Research", "Performance Insights"],
    color: "text-primary",
    bgColor: "bg-primary/10",
    price: "£19.99/month",
    details: "Perfect for restaurants, retail stores, service providers, and any business wanting consistent social media presence without the daily hassle."
  },
  {
    icon: Calculator,
    title: "Financial AI Advisor",
    description: "Make smarter money decisions with AI that understands your business. Get instant answers about cash flow, pricing strategies, tax planning, and growth investments tailored to your industry.",
    features: ["Cash Flow Forecasting", "Pricing Optimization", "Tax Planning", "Expense Tracking", "Profit Analysis", "Growth Recommendations"],
    color: "text-accent",
    bgColor: "bg-accent/10",
    price: "£19.99/month",
    details: "Ideal for consultants, contractors, small manufacturers, and service businesses who need financial clarity without expensive accountants."
  },
  {
    icon: FileText,
    title: "Tender & Sales AI Expert",
    description: "Win more deals with AI that writes compelling proposals, analyzes RFPs, creates persuasive quotes, and helps you close sales. It knows your strengths and highlights them perfectly.",
    features: ["Proposal Writing", "RFP Analysis", "Quote Generation", "Win/Loss Tracking", "Competitor Research", "Follow-up Sequences"],
    color: "text-primary",
    bgColor: "bg-primary/10",
    price: "£19.99/month",
    details: "Essential for B2B services, contractors, agencies, and any business that needs to write proposals or respond to tenders regularly."
  },
  {
    icon: TrendingUp,
    title: "Marketing AI Specialist",
    description: "Grow your customer base with AI that creates targeted campaigns, writes compelling emails, designs ads, and tracks what actually works for your specific business and audience.",
    features: ["Campaign Creation", "Email Sequences", "Ad Copywriting", "Landing Pages", "A/B Testing", "ROI Tracking"],
    color: "text-accent",
    bgColor: "bg-accent/10",
    price: "£19.99/month",
    details: "Perfect for e-commerce, local services, B2B companies, and any business wanting to attract more customers systematically."
  },
  {
    icon: Headphones,
    title: "Customer Service AI Assistant",
    description: "Deliver exceptional customer support 24/7 with AI that handles inquiries, resolves issues, and maintains your customer relationships while you sleep. Never miss a customer question again.",
    features: ["24/7 Chat Support", "FAQ Automation", "Ticket Management", "Customer Insights", "Multi-Channel Support", "Sentiment Analysis"],
    color: "text-accent",
    bgColor: "bg-accent/10",
    price: "£19.99/month",
    details: "Essential for online stores, service providers, and any business that values customer satisfaction and wants to provide instant support."
  },
  {
    icon: Lightbulb,
    title: "Custom AI Solutions",
    description: "Get AI that solves your unique business challenges. Whether it's automating your CRM, creating business cases, streamlining processes, or something entirely specific to your industry.",
    features: ["CRM Automation", "Process Optimization", "Business Case Writing", "Industry-Specific Solutions", "Workflow Design", "Custom Integrations"],
    color: "text-primary",
    bgColor: "bg-primary/10",
    price: "£99 setup + £19/month",
    details: "Tailored for businesses with specific needs - from medical practices to manufacturing, construction to consulting - we build AI that fits your exact requirements."
  }
];

const Categories = () => {
  const [showIndividual, setShowIndividual] = React.useState(false);

  return (
    <section id="categories" className="py-24 px-6 bg-gradient-secondary">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Zap className="w-4 h-4 mr-2 text-primary" />
            <span className="text-sm font-medium text-primary">Your Specialist Team Awaits</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-primary bg-clip-text text-transparent">Expert Specialists</span> at the Touch of a Button
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-4">
            Why hire multiple expensive consultants when you can have an entire team of AI specialists ready to help your business 24/7? Each AI is trained specifically for your industry and challenges.
          </p>
          <div className="bg-accent/10 border border-accent/20 rounded-xl p-4 max-w-2xl mx-auto mb-8">
            <p className="text-accent font-medium text-sm">
              💡 Save significantly with our bundled packages below, or expand to see individual specialists at £19.99/month each.
            </p>
          </div>
          <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <span>No Hiring Hassles</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent"></div>
              <span>Instant Expertise</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <span>Always Available</span>
            </div>
          </div>
        </div>

        {/* Remove individual services section - now integrated into packages */}

        {/* Package Plans with Individual Services Option */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <div className="bg-accent/10 border border-accent/20 rounded-xl p-6 max-w-3xl mx-auto mb-8">
              <h3 className="text-2xl font-bold mb-3">
                💰 Save More with <span className="bg-gradient-primary bg-clip-text text-transparent">Bundled Packages</span>
              </h3>
              <p className="text-muted-foreground mb-3">
                Choose individual AI specialists or save significantly with our bundled packages for comprehensive AI support.
              </p>
              <div className="flex items-center justify-center gap-4 text-sm">
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium">
                  🎯 Over 10,000 businesses trust our AI
                </div>
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                  ⚡ Setup in under 5 minutes
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Individual Services Package */}
            <div 
              className="relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 transition-all duration-300 hover:shadow-card cursor-pointer"
              onClick={() => setShowIndividual(!showIndividual)}
            >
              <div className="text-center mb-6">
                <h4 className="text-2xl font-bold mb-2">Individual</h4>
                <div className="mb-4">
                  <span className="text-4xl font-bold">£19.99</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <p className="text-muted-foreground">Pick 1 from 6 specialists</p>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm">1 AI Specialist of Your Choice</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm">6 Different Specialists Available</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm">Basic Training & Setup</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm">Email Support</span>
                </li>
              </ul>
              
              <Button className="w-full" variant="outline">
                <span className="mr-2">View All Specialists</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showIndividual ? "rotate-180" : ""}`} />
              </Button>
            </div>
            {/* Starter Package */}
            <div className="relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 transition-all duration-300 hover:shadow-card">
              <div className="text-center mb-6">
                <h4 className="text-2xl font-bold mb-2">Starter</h4>
                <div className="mb-2">
                  <span className="text-4xl font-bold">£29</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <div className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full mb-3">
                  Save £10.98/month vs individual
                </div>
                <p className="text-muted-foreground">Perfect for solo entrepreneurs getting started with AI</p>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm">Choose 2 AI Assistants</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm">1 User Account</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm">24/7 AI Support</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm">Basic Training & Setup</span>
                </li>
              </ul>
              
              <Button className="w-full" variant="outline">
                Start Free Trial
              </Button>
            </div>

            {/* Pro Package */}
            <div className="relative bg-card/50 backdrop-blur-sm border-2 border-primary shadow-lg shadow-primary/20 scale-105 rounded-2xl p-6 transition-all duration-300 hover:shadow-card">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-gradient-primary text-primary-foreground px-4 py-1 text-sm font-semibold">
                  🔥 Most Popular
                </Badge>
              </div>
              
              <div className="text-center mb-6">
                <h4 className="text-2xl font-bold mb-2">Pro</h4>
                <div className="mb-2">
                  <span className="text-4xl font-bold">£49</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                  Save £30.96/month vs individual
                </div>
                <p className="text-muted-foreground">Ideal for growing businesses with small teams</p>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm">Choose 4 AI Assistants</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm">Up to 3 Users</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm">Priority AI Support</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm">Advanced Training & Customization</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm">Team Collaboration Tools</span>
                </li>
              </ul>
              
              <Button className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300 text-lg font-semibold py-3">
                <Zap className="w-5 h-5 mr-2" />
                Start Free Trial Now
              </Button>
            </div>

            {/* Enterprise Package */}
            <div className="relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 transition-all duration-300 hover:shadow-card">
              <div className="text-center mb-6">
                <h4 className="text-2xl font-bold mb-2">Enterprise</h4>
                <div className="mb-2">
                  <span className="text-4xl font-bold">£119</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <div className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded-full mb-3">
                  Save £20.94/month vs individual
                </div>
                <p className="text-muted-foreground">Complete AI solution for established businesses</p>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm">All 6 AI Assistants Included</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm">2 Custom AI Solutions</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm">Up to 10 Users</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm">Dedicated Account Manager</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm">Custom Integrations</span>
                </li>
              </ul>
              
              <Button className="w-full" variant="outline">
                Contact Sales
              </Button>
          </div>

          {/* Individual Services Expanded View */}
          {showIndividual && (
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
          )}
        </div>
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