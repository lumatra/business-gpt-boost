import React from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import bakeryDisplay from "@/assets/bakery-display.jpg";
import weddingCake from "@/assets/wedding-cake.jpg";
import freshPastries from "@/assets/fresh-pastries.jpg";
import aiAssistantIcon from "@/assets/ai-assistant-icon.png";
import maryAvatar from "@/assets/mary-avatar.png";
import { 
  MessageSquare, 
  Calculator, 
  FileText, 
  TrendingUp, 
  Headphones, 
  Lightbulb,
  ArrowLeft,
  Clock,
  Calendar
} from "lucide-react";

const examples = [
  {
    icon: MessageSquare,
    title: "Social Media AI Assistant",
    color: "text-primary",
    bgColor: "bg-primary/10",
    demo: {
      userInput: "Create a post about our weekend special",
      aiResponse: {
        platform: "Instagram",
        content: "🥐 Weekend Special at Mary Bakes! 🌟\n\nTreat yourself to our famous weekend-only pain au chocolat - flaky, buttery pastry wrapped around rich Belgian chocolate. Available Saturday & Sunday until we sell out!\n\n✨ Only $3.50 each or 3 for $9\n📍 123 Main Street, Downtown\n⏰ 7 AM - 6 PM\n\n#WeekendSpecial #MaryBakes #PainAuChocolat #FreshBaked #WeekendTreat #BelgianChocolate #LocalBakery",
        hashtags: ["#WeekendSpecial", "#MaryBakes", "#PainAuChocolat"],
        scheduledFor: "Saturday 7:30 AM",
        engagement: "Optimized for weekend morning coffee crowd"
      }
    }
  },
  {
    icon: Calculator,
    title: "Financial AI Advisor",
    color: "text-accent",
    bgColor: "bg-accent/10",
    demo: {
      userInput: "Should I increase prices on my specialty cakes?",
      aiResponse: {
        analysis: "Based on your current costs and local market data:",
        recommendations: [
          "Current profit margin on specialty cakes: 45%",
          "Local competitors charge 15-20% more for similar products", 
          "Your quality justifies a $5-8 increase per cake",
          "Recommended new pricing: $35-38 (currently $30)"
        ],
        impact: "Price increase to $35 would boost monthly profit by $1,200-1,500",
        timing: "Implement gradually: announce 2 weeks prior, emphasize premium ingredients and handcrafted quality"
      }
    }
  },
  {
    icon: FileText,
    title: "Tender & Sales AI Expert",
    color: "text-primary",
    bgColor: "bg-primary/10",
    demo: {
      userInput: "Write a proposal for catering the Johnson wedding (150 guests)",
      aiResponse: {
        proposal: "Dear Mr. & Mrs. Johnson,\n\nThank you for considering Mary Bakes for your special day! We're honored to be part of your wedding celebration.\n\n🎂 WEDDING PACKAGE (150 guests)\n• 3-tier custom wedding cake (vanilla sponge, raspberry filling, cream cheese frosting)\n• 150 assorted mini desserts (macarons, petit fours, chocolate truffles)\n• Dessert display setup & styling\n• Delivery & cake cutting service\n\nTotal Investment: $1,850\n\n✨ Why Choose Mary Bakes:\n• 12+ years specializing in wedding cakes\n• Fresh, locally-sourced ingredients\n• Custom designs tailored to your vision\n• Stress-free delivery & setup\n\nWe'd love to schedule a tasting! Available dates: [dates]\n\nWarm regards,\nMary's Team",
        followUp: "Automatic follow-up scheduled in 3 days if no response"
      }
    }
  },
  {
    icon: TrendingUp,
    title: "Marketing AI Specialist",
    color: "text-accent",
    bgColor: "bg-accent/10",
    demo: {
      userInput: "Create a campaign to increase weekday sales",
      aiResponse: {
        campaign: "WEEKDAY WARRIORS CAMPAIGN",
        strategy: "Target office workers within 2-mile radius with mid-morning treats",
        channels: [
          "Facebook/Instagram ads (9-11 AM targeting)",
          "Google Ads for 'office catering near me'",
          "Email newsletter with weekly specials"
        ],
        offers: [
          "Tuesday Treat: Buy 6 pastries, get 2 free (office orders)",
          "Wednesday Coffee Club: Pastry + coffee for $5.50",
          "Thursday Delivery: Free delivery for orders over $25"
        ],
        budget: "$300/month",
        expectedROI: "15-25% increase in weekday revenue"
      }
    }
  },
  {
    icon: Headphones,
    title: "Customer Service AI Assistant",
    color: "text-accent",
    bgColor: "bg-accent/10",
    demo: {
      userInput: "Handle customer inquiry about gluten-free options",
      aiResponse: {
        customerQuery: "Hi, do you have any gluten-free options? My daughter has celiac disease.",
        response: "Hi there! Absolutely! We understand how important safe gluten-free options are. 🌾\n\nOur current gluten-free selections:\n• Almond flour brownies (made in dedicated GF area)\n• Coconut macaroons\n• Flourless chocolate torte\n• GF vanilla cupcakes (available with 24hr notice)\n\nAll our gluten-free items are prepared in a separate area with dedicated tools to prevent cross-contamination. We take celiac safety seriously!\n\nWould you like me to check what's available today or help you place a special order?\n\nBest regards,\nMary Bakes Team",
        sentiment: "Positive, helpful response detected",
        followUp: "Customer satisfaction survey sent automatically in 24 hours"
      }
    }
  },
  {
    icon: Lightbulb,
    title: "Custom AI Solutions",
    color: "text-primary",
    bgColor: "bg-primary/10",
    demo: {
      userInput: "Automate my daily operations checklist",
      aiResponse: {
        automation: "DAILY OPERATIONS SYSTEM",
        morning: [
          "✅ Check overnight online orders (auto-notify if urgent)",
          "✅ Review today's weather (adjust display case if rain expected)", 
          "✅ Verify staff schedule (auto-text replacements if needed)",
          "✅ Check ingredient inventory (auto-order low stock items)"
        ],
        throughout: [
          "📊 Track hourly sales vs. targets",
          "🔄 Auto-post social media updates when items sell out",
          "📧 Send personalized follow-ups to catering inquiries",
          "💬 Monitor and respond to Google/Yelp reviews"
        ],
        closing: [
          "📋 Generate tomorrow's prep list based on orders",
          "💰 Reconcile daily sales and update P&L",
          "📱 Schedule next day's social media posts",
          "🧹 Create cleaning checklist for staff"
        ],
        integration: "Connects with POS system, inventory, scheduling, and social media"
      }
    }
  }
];

const Examples = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header */}
      <section className="pt-24 pb-16 px-6 bg-gradient-secondary relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={bakeryDisplay} 
            alt="Beautiful bakery display with fresh pastries and cakes"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/95" />
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex items-center gap-4 mb-8">
            <Link to="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
          
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              See Your AI Team in Action
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Here's how Mary's Bakery uses our AI specialists to run their business more efficiently. 
              Imagine these same powerful tools customized for your business.
            </p>
          </div>
        </div>
      </section>

      {/* Examples */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-12">
            {examples.map((example, index) => {
              const Icon = example.icon;
              return (
                <Card key={index} className="overflow-hidden">
                  <CardHeader className="bg-gradient-subtle">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-lg ${example.bgColor} flex items-center justify-center`}>
                        <Icon className={`w-6 h-6 ${example.color}`} />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{example.title}</CardTitle>
                        <CardDescription>Mary's Bakery Example</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-6">
                    {/* User Input */}
                    <div className="mb-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20">
                          <img 
                            src={maryAvatar} 
                            alt="Mary, bakery owner" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <span className="font-medium text-sm">Mary asks:</span>
                          <div className="text-xs text-muted-foreground">Owner, Mary's Bakery</div>
                        </div>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-4 border-l-4 border-l-primary/30 ml-13">
                        <p className="text-foreground italic">"{example.demo.userInput}"</p>
                      </div>
                    </div>

                    {/* AI Response */}
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-primary p-1">
                          <img 
                            src={aiAssistantIcon} 
                            alt="AI Specialist" 
                            className="w-full h-full object-cover rounded-full"
                          />
                        </div>
                        <div>
                          <span className="font-medium text-sm">AI Specialist responds:</span>
                          <div className="text-xs text-muted-foreground">{example.title}</div>
                        </div>
                      </div>
                      
                      <div className="bg-card border border-border rounded-lg p-4 space-y-4 ml-13">
                        {/* Social Media Example */}
                        {example.title.includes("Social Media") && (
                          <div className="space-y-3">
                            <Badge variant="secondary" className="text-xs">
                              <Calendar className="w-3 h-3 mr-1" />
                              {example.demo.aiResponse.scheduledFor}
                            </Badge>
                            <div className="flex gap-4">
                              <div className="flex-1">
                                <div className="bg-muted/30 rounded p-3">
                                  <div className="text-xs text-muted-foreground mb-2">📱 Instagram Post</div>
                                  <div className="text-sm whitespace-pre-line">
                                    {example.demo.aiResponse.content}
                                  </div>
                                </div>
                              </div>
                              <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                                <img 
                                  src={freshPastries} 
                                  alt="Fresh pastries and croissants" 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              <Clock className="w-3 h-3 inline mr-1" />
                              {example.demo.aiResponse.engagement}
                            </div>
                          </div>
                        )}

                        {/* Financial Example */}
                        {example.title.includes("Financial") && (
                          <div className="space-y-3">
                            <div className="text-sm font-medium">{example.demo.aiResponse.analysis}</div>
                            <div className="grid gap-2">
                              {(example.demo.aiResponse.recommendations || []).map((rec, i) => (
                                <div key={i} className="flex items-start gap-2 text-sm">
                                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                                  <span>{rec}</span>
                                </div>
                              ))}
                            </div>
                            <div className="bg-primary/10 rounded p-3">
                              <div className="font-medium text-sm text-primary">💡 Projected Impact</div>
                              <div className="text-sm">{example.demo.aiResponse.impact}</div>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              <strong>Implementation:</strong> {example.demo.aiResponse.timing}
                            </div>
                          </div>
                        )}

                        {/* Proposal Example */}
                        {example.title.includes("Sales") && (
                          <div className="space-y-3">
                            <div className="flex gap-4">
                              <div className="flex-1">
                                <div className="bg-muted/30 rounded p-4 text-sm whitespace-pre-line">
                                  {example.demo.aiResponse.proposal}
                                </div>
                              </div>
                              <div className="w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
                                <img 
                                  src={weddingCake} 
                                  alt="Elegant wedding cake" 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              ⏰ {example.demo.aiResponse.followUp}
                            </div>
                          </div>
                        )}

                        {/* Marketing Example */}
                        {example.title.includes("Marketing") && (
                          <div className="space-y-4">
                            <div>
                              <div className="font-medium text-sm mb-2">🎯 {example.demo.aiResponse.campaign}</div>
                              <div className="text-sm text-muted-foreground mb-3">{example.demo.aiResponse.strategy}</div>
                            </div>
                            <div>
                              <div className="font-medium text-xs mb-2">Channels:</div>
                              <div className="grid gap-1">
                                {(example.demo.aiResponse.channels || []).map((channel, i) => (
                                  <div key={i} className="text-sm flex items-center gap-2">
                                    <div className="w-1 h-1 rounded-full bg-accent"></div>
                                    {channel}
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div>
                              <div className="font-medium text-xs mb-2">Special Offers:</div>
                              <div className="grid gap-1">
                                {(example.demo.aiResponse.offers || []).map((offer, i) => (
                                  <div key={i} className="text-sm bg-accent/10 rounded p-2">
                                    {offer}
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div className="flex gap-4 text-xs">
                              <span><strong>Budget:</strong> {example.demo.aiResponse.budget}</span>
                              <span><strong>Expected ROI:</strong> {example.demo.aiResponse.expectedROI}</span>
                            </div>
                          </div>
                        )}

                        {/* Customer Service Example */}
                        {example.title.includes("Customer") && (
                          <div className="space-y-3">
                            <div>
                              <div className="text-xs text-muted-foreground mb-2">Customer Question:</div>
                              <div className="bg-muted/50 rounded p-3 text-sm italic">
                                "{example.demo.aiResponse.customerQuery}"
                              </div>
                            </div>
                            <div>
                              <div className="text-xs text-muted-foreground mb-2">AI Response:</div>
                              <div className="bg-primary/5 rounded p-3 text-sm whitespace-pre-line">
                                {example.demo.aiResponse.response}
                              </div>
                            </div>
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>✨ {example.demo.aiResponse.sentiment}</span>
                              <span>📧 {example.demo.aiResponse.followUp}</span>
                            </div>
                          </div>
                        )}

                        {/* Custom Solutions Example */}
                        {example.title.includes("Custom") && (
                          <div className="space-y-4">
                            <div className="font-medium text-sm">🔧 {example.demo.aiResponse.automation}</div>
                            
                            <div>
                              <div className="font-medium text-xs mb-2">Morning Routine:</div>
                              <div className="space-y-1">
                                {(example.demo.aiResponse.morning || []).map((item, i) => (
                                  <div key={i} className="text-sm">{item}</div>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <div className="font-medium text-xs mb-2">Throughout Day:</div>
                              <div className="space-y-1">
                                {(example.demo.aiResponse.throughout || []).map((item, i) => (
                                  <div key={i} className="text-sm">{item}</div>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <div className="font-medium text-xs mb-2">End of Day:</div>
                              <div className="space-y-1">
                                {(example.demo.aiResponse.closing || []).map((item, i) => (
                                  <div key={i} className="text-sm">{item}</div>
                                ))}
                              </div>
                            </div>
                            
                            <div className="bg-accent/10 rounded p-3 text-xs">
                              <strong>Integration:</strong> {example.demo.aiResponse.integration}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* CTA */}
          <div className="text-center mt-16 p-8 bg-gradient-primary rounded-2xl text-primary-foreground">
            <h3 className="text-2xl font-bold mb-4">Ready to Get Your AI Team?</h3>
            <p className="mb-6 opacity-90">
              See how these same AI specialists can transform your business operations
            </p>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="bg-background text-foreground hover:bg-background/90">
                Start Your Free Trial
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Examples;