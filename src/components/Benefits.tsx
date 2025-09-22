import React from "react";
import { Card, CardContent } from "@/components/ui/card";
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
    title: "Get Work Done Faster",
    description: "Stop spending hours on tasks your specialist can do in minutes - get your time back",
    metric: "10x",
    color: "text-primary"
  },
  {
    icon: DollarSign,
    title: "Save Money",
    description: "Why hire expensive consultants when you can get expert help for a fraction of the cost?",
    metric: "90%",
    color: "text-accent"
  },
  {
    icon: TrendingUp,
    title: "Grow Your Business",
    description: "Professional marketing, better finances, and winning proposals lead to real growth",
    metric: "3x",
    color: "text-primary"
  },
  {
    icon: Users,
    title: "Always Available",
    description: "Your business experts work 24/7, ready to help whenever you need them",
    metric: "24/7",
    color: "text-accent"
  }
];

const Benefits = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
            <Lightbulb className="w-4 h-4 mr-2 text-accent" />
            <span className="text-sm font-medium text-accent">Real Results</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Why Business Owners 
            <span className="bg-gradient-primary bg-clip-text text-transparent"> Love Our Experts</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join thousands of smart business owners who get professional help without the professional price tag.
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
        <div className="text-center">
          <div className="inline-flex items-center justify-center p-8 rounded-2xl bg-gradient-primary text-primary-foreground max-w-2xl mx-auto">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to Get Expert Help?</h3>
              <p className="text-primary-foreground/90 mb-6">
                Start getting professional results for your business today
              </p>
              <div className="inline-flex items-center px-6 py-3 bg-white/20 rounded-lg font-medium cursor-pointer hover:bg-white/30 transition-colors">
                Talk to Your Expert
                <ArrowRight className="w-5 h-5 ml-2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;