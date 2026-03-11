import React from "react";
import { 
  HelpCircle, 
  Calculator, 
  MessageSquare, 
  AlertTriangle
} from "lucide-react";

const SolutionSection = () => {
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
      description: "Captures job details and qualified leads",
      example: "Asks the right questions, captures contact info, books you in",
      benefit: "You show up knowing exactly what they need",
      gradient: "from-green-500/10 to-emerald-500/10",
      iconBg: "bg-green-600",
      accentColor: "text-green-600"
    },
    {
      icon: MessageSquare,
      title: "Social Media Post Assistant",
      description: "Creates post ideas and captions",
      example: "Helps you stay active on Instagram/Facebook without the hassle",
      benefit: "Posts that sound like you, not a robot",
      gradient: "from-purple-500/10 to-pink-500/10",
      iconBg: "bg-purple-600",
      accentColor: "text-purple-600"
    },
    {
      icon: AlertTriangle,
      title: "Complaint Response Assistant",
      description: "Helps you handle complaints professionally",
      example: "Suggests 3 response options when customers aren't happy",
      benefit: "Takes the emotion out of tricky situations",
      gradient: "from-orange-500/10 to-red-500/10",
      iconBg: "bg-orange-600",
      accentColor: "text-orange-600"
    }
  ];

  return (
    <section id="solution" className="min-h-screen flex flex-col justify-center snap-start bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-card-foreground mb-3">
            Meet Your New Team.
          </h2>
          <p className="text-xl text-muted-foreground">
            (They Never Sleep, Never Take Breaks, and Cost Less Than a Meal Out.)
          </p>
        </div>

        <p className="text-center text-lg font-semibold text-card-foreground mb-6">
          Helpzz includes assistants trained on your business:
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
          {assistants.map((assistant, index) => (
            <div 
              key={index}
              className={`bg-gradient-to-br ${assistant.gradient} p-6 rounded-2xl border border-border hover:shadow-elegant transition-all duration-300 hover:-translate-y-1`}
            >
              <div className={`w-12 h-12 ${assistant.iconBg} rounded-xl flex items-center justify-center mb-3`}>
                <assistant.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold text-card-foreground mb-1">{assistant.title}</h3>
              <p className="text-sm text-muted-foreground mb-2">{assistant.description}</p>
              <p className="text-xs text-muted-foreground mb-2 italic">"{assistant.example}"</p>
              <p className={`text-sm font-semibold ${assistant.accentColor}`}>→ {assistant.benefit}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
