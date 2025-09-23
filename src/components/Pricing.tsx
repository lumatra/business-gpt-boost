import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Zap } from "lucide-react";

const pricingPlans = [
  {
    name: "Starter",
    price: "£29",
    period: "/month",
    description: "Perfect for solo entrepreneurs getting started with AI",
    features: [
      "Choose 2 AI Assistants",
      "1 User Account", 
      "24/7 AI Support",
      "Basic Training & Setup",
      "Email Support",
      "Monthly Usage Reports"
    ],
    popular: false,
    cta: "Start Free Trial"
  },
  {
    name: "Pro",
    price: "£49",
    period: "/month", 
    description: "Ideal for growing businesses with small teams",
    features: [
      "Choose 4 AI Assistants",
      "Up to 3 Users",
      "Priority AI Support", 
      "Advanced Training & Customization",
      "Phone & Email Support",
      "Weekly Performance Analytics",
      "Team Collaboration Tools",
      "Custom Workflows"
    ],
    popular: true,
    cta: "Start Free Trial"
  },
  {
    name: "Enterprise",
    price: "£119",
    period: "/month",
    description: "Complete AI solution for established businesses",
    features: [
      "All 6 AI Assistants Included",
      "2 Custom AI Solutions",
      "Up to 10 Users",
      "Dedicated Account Manager",
      "White-label Options", 
      "Custom Integrations",
      "Real-time Analytics Dashboard",
      "Priority Phone Support",
      "Onboarding & Training Sessions"
    ],
    popular: false,
    cta: "Contact Sales"
  }
];

const Pricing = () => {
  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
            <Star className="w-4 h-4 mr-2 text-accent" />
            <span className="text-sm font-medium text-accent">Affordable AI for Small Business</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Choose Your <span className="bg-gradient-primary bg-clip-text text-transparent">AI Package</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Professional AI assistance that fits your small business budget. Start with what you need, upgrade as you grow.
          </p>
        </div>

        {/* Pricing Cards */}
        <div id="pricing-packages" className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <Card 
              key={index}
              className={`relative ${plan.popular ? 'border-primary shadow-glow scale-105' : 'border-border/50'} bg-card/50 backdrop-blur-sm transition-all duration-300 hover:shadow-card`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-primary text-primary-foreground px-4 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                <div className="mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <CardDescription className="text-base">
                  {plan.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full ${plan.popular ? 'bg-gradient-primary hover:shadow-glow' : 'variant-outline'} transition-all duration-300`}
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.popular && <Zap className="w-4 h-4 mr-2" />}
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Individual Services */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <div className="bg-accent/10 border border-accent/20 rounded-xl p-6 mb-8 max-w-2xl mx-auto">
              <p className="text-accent font-medium mb-2">💰 Want Better Value?</p>
              <p className="text-muted-foreground text-sm">
                Save up to 60% with our bundled packages above! Get multiple AI assistants for less than individual pricing.
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-3"
                onClick={() => document.getElementById('pricing-packages')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Package Deals
              </Button>
            </div>
            <h3 className="text-3xl font-bold mb-4">
              Or Choose <span className="bg-gradient-primary bg-clip-text text-transparent">Individual Services</span>
            </h3>
            <p className="text-muted-foreground">
              Need just one AI assistant? All individual services just £19.99/month.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-card/30 backdrop-blur-sm border-border/50 hover:shadow-card transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Social Media AI
                  <Badge variant="secondary">£19.99/mo</Badge>
                </CardTitle>
                <CardDescription>Complete social media automation</CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-card/30 backdrop-blur-sm border-border/50 hover:shadow-card transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Financial AI
                  <Badge variant="secondary">£19.99/mo</Badge>
                </CardTitle>
                <CardDescription>Smart financial planning & analysis</CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-card/30 backdrop-blur-sm border-border/50 hover:shadow-card transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Marketing AI
                  <Badge variant="secondary">£19.99/mo</Badge>
                </CardTitle>
                <CardDescription>Complete marketing automation</CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-card/30 backdrop-blur-sm border-border/50 hover:shadow-card transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Tender & Sales AI
                  <Badge variant="secondary">£19.99/mo</Badge>
                </CardTitle>
                <CardDescription>Win more contracts & deals</CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-card/30 backdrop-blur-sm border-border/50 hover:shadow-card transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Customer Service AI
                  <Badge variant="secondary">£19.99/mo</Badge>
                </CardTitle>
                <CardDescription>24/7 customer support automation</CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-card/30 backdrop-blur-sm border-border/50 hover:shadow-card transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Custom AI Solutions
                  <div className="text-right">
                    <Badge variant="secondary" className="text-xs">£99 setup</Badge>
                    <div className="text-xs text-muted-foreground mt-1">+ £19/month</div>
                  </div>
                </CardTitle>
                <CardDescription>Tailored for your unique business needs</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-secondary rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Transform Your Business with AI?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Get personalized AI solutions designed specifically for your business needs, with expert training and ongoing support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
                <Zap className="w-5 h-5 mr-2" />
                Start Free 14-Day Trial
              </Button>
              <Button variant="outline" size="lg">
                Schedule a Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;