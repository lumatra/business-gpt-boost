import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Zap } from "lucide-react";

const pricingPlans = [
  {
    name: "Starter Pack",
    price: "$597",
    period: "/month",
    description: "Perfect for small businesses getting started with AI",
    features: [
      "Social Media AI Assistant",
      "Financial AI Advisor", 
      "24/7 AI Support",
      "Basic Analytics",
      "Email Support"
    ],
    popular: false,
    cta: "Start Free Trial"
  },
  {
    name: "Business Pro",
    price: "$997",
    period: "/month", 
    description: "Complete AI solution for growing businesses",
    features: [
      "All Starter Pack features",
      "Marketing AI Specialist",
      "Tender & Sales AI Expert",
      "Advanced Analytics",
      "Priority Support",
      "Custom Integrations"
    ],
    popular: true,
    cta: "Get Business Pro"
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "pricing",
    description: "Fully customized AI solutions for large organizations",
    features: [
      "All Business Pro features", 
      "Custom AI Solutions",
      "Dedicated Account Manager",
      "White-label Options",
      "Advanced Security",
      "SLA Guarantee"
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
            <span className="text-sm font-medium text-accent">Simple, Transparent Pricing</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Choose Your <span className="bg-gradient-primary bg-clip-text text-transparent">AI Package</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get the AI specialists your business needs. Start with what you need today, upgrade as you grow.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
            <h3 className="text-3xl font-bold mb-4">
              Or Choose <span className="bg-gradient-primary bg-clip-text text-transparent">Individual Services</span>
            </h3>
            <p className="text-muted-foreground">
              Need just one AI assistant? Pick exactly what your business needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-card/30 backdrop-blur-sm border-border/50 hover:shadow-card transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Social Media AI
                  <Badge variant="secondary">$297/mo</Badge>
                </CardTitle>
                <CardDescription>Complete social media automation</CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-card/30 backdrop-blur-sm border-border/50 hover:shadow-card transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Financial AI
                  <Badge variant="secondary">$397/mo</Badge>
                </CardTitle>
                <CardDescription>Smart financial planning & analysis</CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-card/30 backdrop-blur-sm border-border/50 hover:shadow-card transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Marketing AI
                  <Badge variant="secondary">$447/mo</Badge>
                </CardTitle>
                <CardDescription>Complete marketing automation</CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-card/30 backdrop-blur-sm border-border/50 hover:shadow-card transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Tender & Sales AI
                  <Badge variant="secondary">$497/mo</Badge>
                </CardTitle>
                <CardDescription>Win more contracts & deals</CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-card/30 backdrop-blur-sm border-border/50 hover:shadow-card transition-all duration-300 md:col-span-2 lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Custom AI Solutions
                  <Badge variant="secondary">From $697/mo</Badge>
                </CardTitle>
                <CardDescription>Tailored for your unique needs</CardDescription>
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
              Join over 10,000 businesses already using personalized AI to save time, increase revenue, and stay competitive.
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