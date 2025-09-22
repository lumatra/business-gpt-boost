import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Zap, 
  TrendingUp, 
  Calculator, 
  FileText, 
  Users, 
  MessageSquare,
  BarChart3,
  Lightbulb,
  Shield,
  Presentation,
  Play,
  Loader2
} from "lucide-react";

const aiServices = [
  {
    id: "marketing",
    icon: TrendingUp,
    title: "Your Marketing Assistant",
    description: "Creates marketing content specifically for your business, industry, and target customers.",
    examples: ["Industry-Specific Content", "Your Brand Voice", "Target Audience Focus", "Competitor Insights"],
    demo: {
      placeholder: "Tell me about your business, industry, and target customers...",
      template: "personalized marketing"
    }
  },
  {
    id: "finance",
    icon: Calculator,
    title: "Your Financial Advisor",
    description: "Provides financial advice tailored to your specific business model, revenue, and growth stage.",
    examples: ["Your Business Model", "Revenue Analysis", "Custom Budget Plans", "Growth Forecasts"],
    demo: {
      placeholder: "Describe your business type, revenue, main costs, and financial goals...",
      template: "personalized finance"
    }
  },
  {
    id: "proposals",
    icon: FileText,
    title: "Proposal & Tender Writer",
    description: "Win more contracts with professionally written proposals and compliance documents.",
    examples: ["Government Tenders", "Project Proposals", "Compliance Documents", "RFP Responses"],
    demo: {
      placeholder: "Describe the tender or project you're bidding for...",
      template: "proposal outline"
    }
  },
  {
    id: "hr",
    icon: Users,
    title: "HR Assistant",
    description: "Handle recruitment, policies, performance reviews, and employee management.",
    examples: ["Job Descriptions", "Interview Questions", "HR Policies", "Performance Reviews"],
    demo: {
      placeholder: "What HR task do you need help with?",
      template: "HR document"
    }
  },
  {
    id: "customer-service",
    icon: MessageSquare,
    title: "Customer Service Bot",
    description: "Automate customer inquiries, create FAQ responses, and handle support tickets.",
    examples: ["FAQ Responses", "Email Templates", "Chat Scripts", "Complaint Handling"],
    demo: {
      placeholder: "What customer service scenario do you need help with?",
      template: "customer response"
    }
  },
  {
    id: "business-strategy",
    icon: Lightbulb,
    title: "Business Strategy Advisor",
    description: "Develop business plans, market analysis, competitive strategies, and growth plans.",
    examples: ["Business Plans", "Market Research", "SWOT Analysis", "Growth Strategies"],
    demo: {
      placeholder: "Tell me about your business goals...",
      template: "strategy plan"
    }
  },
  {
    id: "data-analysis",
    icon: BarChart3,
    title: "Data Analyst",
    description: "Turn your business data into insights, reports, and actionable recommendations.",
    examples: ["Sales Reports", "Performance Metrics", "Trend Analysis", "KPI Dashboards"],
    demo: {
      placeholder: "Describe your data or what insights you need...",
      template: "data analysis"
    }
  },
  {
    id: "legal",
    icon: Shield,
    title: "Legal Document Assistant",
    description: "Draft contracts, terms of service, privacy policies, and legal correspondence.",
    examples: ["Contract Templates", "Privacy Policies", "Terms of Service", "Legal Letters"],
    demo: {
      placeholder: "What type of legal document do you need?",
      template: "legal document"
    }
  },
  {
    id: "sales",
    icon: Presentation,
    title: "Sales Copy Specialist",
    description: "Create compelling sales pages, presentations, pitch decks, and closing scripts.",
    examples: ["Sales Pages", "Pitch Decks", "Cold Emails", "Closing Scripts"],
    demo: {
      placeholder: "What are you trying to sell?",
      template: "sales copy"
    }
  }
];

const generateSampleContent = (input: string, type: string) => {
  const templates = {
    "personalized marketing": `🎯 PERSONALIZED MARKETING STRATEGY

Based on your business: "${input.slice(0, 100)}..."

TAILORED CONTENT STRATEGY:
• Industry-specific messaging that resonates with your exact audience
• Content pillars designed around your unique value proposition
• Competitor analysis showing gaps you can fill
• Brand voice that reflects your company culture

CUSTOM CAMPAIGN IDEAS:
📱 Social Media: 3 platform-specific strategies for your target demographic
📧 Email Series: 5-part sequence addressing your customers' specific pain points  
🎯 Ad Copy: Headlines and descriptions optimized for your industry keywords
📝 Blog Topics: 10 ideas that establish you as the expert in your niche

PERSONALIZED METRICS:
• Track engagement rates specific to your industry benchmarks
• Monitor conversion rates for your typical customer journey
• Measure brand awareness within your local/niche market

💡 This isn't generic advice - it's built specifically for YOUR business model and goals.`,

    "personalized finance": `💰 PERSONALIZED FINANCIAL STRATEGY

Your Business Profile: "${input.slice(0, 100)}..."

CUSTOM FINANCIAL ANALYSIS:
• Revenue Model: Analyzed your specific income streams and seasonality patterns
• Cost Structure: Identified optimization opportunities unique to your business type
• Cash Flow: Tailored strategies based on your payment cycles and customer behavior
• Growth Funding: Options that match your business stage and risk tolerance

PERSONALIZED RECOMMENDATIONS:
💡 For YOUR Business Type:
- Pricing strategy adjustments based on your market position
- Cost reduction areas specific to your industry
- Revenue diversification opportunities in your sector
- Tax optimization strategies for your business structure

💡 Custom Budget Allocation:
- Marketing: % based on your customer acquisition patterns
- Operations: Optimized for your specific workflow needs  
- Growth: Investment priorities aligned with your 12-month goals
- Emergency Fund: Size recommendations based on your cash flow patterns

🎯 PROJECTED IMPACT (Next 12 Months):
• Revenue increase: 25-35% through personalized pricing and upsell strategies
• Cost savings: 15-20% via industry-specific optimization
• Cash flow improvement: 30-40% better predictability

This analysis is built specifically around YOUR business model, not generic advice.`,

    "proposal outline": `📋 PROPOSAL OUTLINE

PROJECT: ${input.slice(0, 60)}...

EXECUTIVE SUMMARY
• Understanding of requirements and scope
• Our unique value proposition
• Why we're the best choice for this project

TECHNICAL APPROACH
• Methodology and implementation strategy
• Timeline and key milestones
• Quality assurance processes

TEAM & EXPERIENCE
• Key personnel and their expertise
• Relevant project experience
• Success stories and testimonials

INVESTMENT & VALUE
• Competitive pricing structure
• ROI and long-term benefits
• Risk mitigation strategies

📈 Win Rate: Our proposals have a 78% success rate`,

    "HR document": `👥 HR SOLUTION

For your request: "${input.slice(0, 80)}..."

RECOMMENDATION:
• Structured approach to address your HR needs
• Compliance with current employment laws
• Best practices from industry leaders

KEY COMPONENTS:
✓ Clear policies and procedures
✓ Employee-friendly language
✓ Legal compliance checkpoints
✓ Implementation timeline

BENEFITS:
• Reduced HR administrative time by 40%
• Improved employee satisfaction
• Legal risk mitigation
• Streamlined processes

📋 Ready to implement immediately`,

    "customer response": `💬 CUSTOMER SERVICE RESPONSE

Situation: ${input.slice(0, 70)}...

PROFESSIONAL RESPONSE:
"Thank you for reaching out to us. We truly appreciate you taking the time to contact us about this matter.

I understand your concern and I want to ensure we resolve this for you as quickly as possible. Here's what I can do for you right away:

1. [Immediate action step]
2. [Follow-up measure]
3. [Prevention strategy]

Your satisfaction is our top priority, and I'll personally monitor this until it's completely resolved.

Is there anything else I can help you with today?"

✅ Response Time: Under 2 hours
⭐ Customer Satisfaction: 4.8/5 rating`,

    "strategy plan": `🎯 STRATEGIC BUSINESS PLAN

Your Business Vision: "${input.slice(0, 80)}..."

STRATEGIC PRIORITIES:
1. Market Positioning
   • Identify unique competitive advantages
   • Target high-value customer segments
   • Develop compelling value proposition

2. Operational Excellence
   • Streamline core processes
   • Implement automation where possible
   • Focus on quality and efficiency

3. Growth Acceleration
   • Expand into adjacent markets
   • Develop strategic partnerships
   • Scale successful initiatives

EXPECTED OUTCOMES:
📈 Revenue Growth: 25-40% increase
⚡ Efficiency Gains: 30% operational improvement
🎯 Market Share: Expand by 15-20%

TIMELINE: 6-12 months for full implementation`,

    "data analysis": `📊 DATA INSIGHTS REPORT

Analysis Request: "${input.slice(0, 70)}..."

KEY FINDINGS:
• Performance Trends: Identified 3 critical growth patterns
• Opportunity Areas: 5 high-impact improvement zones
• Risk Factors: 2 areas requiring immediate attention

ACTIONABLE INSIGHTS:
1. Top Performing Metrics
   - Revenue drivers showing 23% growth
   - Customer retention at 89%
   - Operational efficiency up 15%

2. Improvement Opportunities
   - Marketing ROI can increase by 40%
   - Customer acquisition cost reducible by 25%
   - Conversion rates improvable by 18%

RECOMMENDATIONS:
✅ Focus resources on top-performing channels
✅ Automate repetitive processes
✅ Implement data-driven decision making

💡 Projected Impact: $50K+ annual savings`,

    "legal document": `⚖️ LEGAL DOCUMENT FRAMEWORK

Document Type: ${input.slice(0, 60)}...

STRUCTURE OVERVIEW:
• Legal compliance with current regulations
• Clear, enforceable language
• Protection of your business interests
• Industry-standard clauses and terms

KEY SECTIONS:
1. Definitions and Scope
2. Rights and Obligations
3. Terms and Conditions
4. Dispute Resolution
5. Governing Law

BENEFITS:
✅ Legal risk mitigation
✅ Clear expectations for all parties
✅ Professional presentation
✅ Enforceable terms

📋 Ready for legal review and implementation
⚖️ Compliant with current business law`,

    "sales copy": `💰 COMPELLING SALES COPY

Product/Service: "${input.slice(0, 60)}..."

HEADLINE: Transform Your Business Results in Just 30 Days

PROBLEM: Many businesses struggle with [specific pain point related to your input]

SOLUTION: Our proven system helps you:
• Increase efficiency by 200%
• Save 15+ hours per week
• Boost revenue by 30-50%

PROOF: Over 1,000 businesses have already achieved:
✅ Faster results
✅ Higher profits  
✅ More free time

URGENCY: Limited spots available this month

GUARANTEE: 30-day money-back guarantee - zero risk

CALL TO ACTION: 
"Ready to transform your business? Click below to get started today!"

🎯 Conversion Rate: 15-25% average increase`
  };

  return templates[type as keyof typeof templates] || "Sample content generated based on your input...";
};

const AIShowcase = () => {
  const [activeDemo, setActiveDemo] = useState("");
  const [demoInput, setDemoInput] = useState("");
  const [demoOutput, setDemoOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDemo = async (serviceId: string) => {
    if (!demoInput.trim()) return;
    
    setIsGenerating(true);
    const service = aiServices.find(s => s.id === serviceId);
    
    // Simulate API call delay
    setTimeout(() => {
      if (service) {
        const output = generateSampleContent(demoInput, service.demo.template);
        setDemoOutput(output);
      }
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <section className="py-24 px-6 bg-gradient-secondary">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
            <Zap className="w-4 h-4 mr-2 text-accent" />
            <span className="text-sm font-medium text-accent">Personalized AI Assistant</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            See How <span className="bg-gradient-primary bg-clip-text text-transparent">Personal AI</span> Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Tell our AI about your business and watch it provide tailored, company-specific advice and solutions instantly.
          </p>
        </div>

        {/* Interactive Demo Section */}
        <div className="mb-16">
          <Tabs value={activeDemo} onValueChange={setActiveDemo} className="w-full">
            <TabsList className="grid grid-cols-3 lg:grid-cols-5 xl:grid-cols-9 gap-2 h-auto p-2 bg-card/50 backdrop-blur-sm">
              {aiServices.map((service) => {
                const Icon = service.icon;
                return (
                  <TabsTrigger
                    key={service.id}
                    value={service.id}
                    className="flex flex-col items-center gap-1 p-3 h-auto data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-xs text-center leading-tight">{service.title.split(' ')[0]}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {aiServices.map((service) => (
              <TabsContent key={service.id} value={service.id} className="mt-8">
                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <service.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-2xl mb-2">{service.title}</CardTitle>
                        <CardDescription className="text-base mb-4">
                          {service.description}
                        </CardDescription>
                        <div className="flex flex-wrap gap-2">
                          {service.examples.map((example, index) => (
                            <Badge key={index} variant="secondary" className="bg-secondary/50">
                              {example}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid lg:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Play className="w-4 h-4 text-primary" />
                          Try It Now - Enter Your Business Challenge:
                        </h4>
                        <Textarea
                          placeholder={service.demo.placeholder}
                          value={demoInput}
                          onChange={(e) => setDemoInput(e.target.value)}
                          className="mb-4 min-h-[120px]"
                        />
                        <Button
                          onClick={() => handleDemo(service.id)}
                          disabled={!demoInput.trim() || isGenerating}
                          className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
                        >
                          {isGenerating ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Generating...
                            </>
                          ) : (
                            <>
                              <Zap className="w-4 h-4 mr-2" />
                              Generate {service.title.split(' ')[0]} Solution
                            </>
                          )}
                        </Button>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3">AI-Generated Result:</h4>
                        <div className="bg-muted/50 rounded-lg p-4 min-h-[200px] border">
                          {demoOutput ? (
                            <pre className="whitespace-pre-wrap text-sm text-foreground font-mono">
                              {demoOutput}
                            </pre>
                          ) : (
                            <div className="flex items-center justify-center h-full text-muted-foreground">
                              <div className="text-center">
                                <service.icon className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                <p>Your AI-generated {service.demo.template} will appear here</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {aiServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card 
                key={service.id} 
                className="group hover:shadow-card transition-all duration-300 hover:scale-105 border-border/50 bg-card/30 backdrop-blur-sm cursor-pointer"
                onClick={() => setActiveDemo(service.id)}
              >
                <CardHeader className="pb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {service.examples.slice(0, 2).map((example, exampleIndex) => (
                      <div key={exampleIndex} className="text-xs text-muted-foreground flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-primary/60" />
                        {example}
                      </div>
                    ))}
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full mt-4 text-primary hover:bg-primary/10"
                  >
                    Try This AI →
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-primary text-primary-foreground font-medium hover:shadow-glow transition-all duration-300 cursor-pointer">
            <Zap className="w-5 h-5 mr-2" />
            Get Your Personal Business AI Assistant
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            AI that learns YOUR business • Personalized advice 24/7 • Setup in under 5 minutes
          </p>
        </div>
      </div>
    </section>
  );
};

export default AIShowcase;