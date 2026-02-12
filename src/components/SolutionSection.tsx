import React from "react";
import { Button } from "./ui/button";
import { 
  HelpCircle, 
  Calculator, 
  MessageSquare, 
  AlertTriangle, 
  Check,
  Phone,
  Calendar
} from "lucide-react";

const SolutionSection = () => {
  const scrollToSignup = () => {
    const element = document.getElementById("signup");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const assistants = [
    {
      icon: HelpCircle,
      title: "FAQ Assistant",
      description: "Answers customer questions instantly",
      example: '"What\'s your pricing?" "What areas do you cover?" "When can you start?"',
      benefit: "Responds in seconds with your exact information",
      gradient: "from-blue-500/10 to-indigo-500/10",
      iconBg: "bg-blue-600",
      accentColor: "text-blue-600"
    },
    {
      icon: Calculator,
      title: "Estimator & Lead Capture",
      description: "Qualifies leads and takes job details",
      example: "Asks the right questions, captures contact info, books you in",
      benefit: "You show up knowing exactly what they need",
      gradient: "from-green-500/10 to-emerald-500/10",
      iconBg: "bg-green-600",
      accentColor: "text-green-600"
    },
    {
      icon: MessageSquare,
      title: "Social Media Manager",
      description: "Creates post ideas and captions",
      example: "Helps you stay active on Instagram/Facebook without the hassle",
      benefit: "Posts that sound like you, not a robot",
      gradient: "from-purple-500/10 to-pink-500/10",
      iconBg: "bg-purple-600",
      accentColor: "text-purple-600"
    },
    {
      icon: AlertTriangle,
      title: "Complaints Response Advisor",
      description: "Helps you handle complaints professionally",
      example: "Suggests 3 response options when customers aren't happy",
      benefit: "Takes the emotion out of tricky situations",
      gradient: "from-orange-500/10 to-red-500/10",
      iconBg: "bg-orange-600",
      accentColor: "text-orange-600"
    }
  ];

  const addons = [
    {
      icon: Phone,
      title: "Your Own UK Phone Number",
      description: "Customers text your number, get instant replies",
      benefit: "No app needed - works with any phone",
      gradient: "from-teal-500/10 to-cyan-500/10",
      iconBg: "bg-teal-600"
    },
    {
      icon: Calendar,
      title: "Diary & Booking Service",
      description: "Customers can book slots directly",
      benefit: "No more back-and-forth to find a time",
      gradient: "from-indigo-500/10 to-violet-500/10",
      iconBg: "bg-indigo-600"
    }
  ];

  return (
    <section id="solution" className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-card-foreground mb-4">
            Meet Your New Team.
          </h2>
          <p className="text-xl text-muted-foreground">
            (They Never Sleep, Never Take Breaks, and Cost Less Than a Meal Out.)
          </p>
        </div>

        {/* Core Assistants */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
          {assistants.map((assistant, index) => (
            <div 
              key={index}
              className={`bg-gradient-to-br ${assistant.gradient} p-8 rounded-2xl border border-border hover:shadow-elegant transition-all duration-300 hover:-translate-y-2`}
            >
              <div className={`w-14 h-14 ${assistant.iconBg} rounded-xl flex items-center justify-center mb-4`}>
                <assistant.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-card-foreground mb-2">{assistant.title}</h3>
              <p className="text-muted-foreground mb-4">{assistant.description}</p>
              <p className="text-sm text-muted-foreground mb-4 italic">"{assistant.example}"</p>
              <p className={`text-sm font-semibold ${assistant.accentColor}`}>→ {assistant.benefit}</p>
            </div>
          ))}
        </div>


        {/* How It Works Steps */}
        <div id="how-it-works" className="mt-20">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-card-foreground mb-4">
              Set Up in 10 Minutes. Start Capturing Leads Today.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-bold text-card-foreground mb-3">Quick Setup</h3>
              <p className="text-muted-foreground mb-2">Tell us about your business (10 minutes)</p>
              <p className="text-muted-foreground mb-2">Choose what you need</p>
              <p className="text-sm font-semibold text-primary">→ We'll configure everything for you</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-bold text-card-foreground mb-3">Start Working</h3>
              <p className="text-muted-foreground mb-2">Get your own UK phone number</p>
              <p className="text-muted-foreground mb-2">Customers text or use your website</p>
              <p className="text-sm font-semibold text-primary">→ Responds instantly with your information</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-bold text-card-foreground mb-3">You Get the Leads</h3>
              <p className="text-muted-foreground mb-2">Captures their details automatically</p>
              <p className="text-muted-foreground mb-2">Sends you a summary via SMS/email</p>
              <p className="text-sm font-semibold text-primary">→ You follow up when you're ready</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-lg font-semibold text-muted-foreground mb-6">No app to download. No tech skills needed. Just works.</p>
            <Button
              size="lg"
              onClick={scrollToSignup}
              className="px-8 py-6 text-lg bg-primary hover:bg-primary/90 shadow-elegant"
            >
              Start Free Trial - See It All in Action
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
