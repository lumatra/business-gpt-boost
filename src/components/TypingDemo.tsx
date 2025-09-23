import React, { useState, useEffect } from 'react';

const TypingDemo = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [showResponse, setShowResponse] = useState(false);

  const userInput = "do a relevant post for today";
  const aiResponse = {
    platform: "Instagram",
    content: "🍞 Fresh Friday Vibes at Mary Bakes! 🌟\n\nKick off your weekend with our warm, buttery croissants straight from the oven! Perfect with your morning coffee ☕\n\n✨ Available until 3pm (or while supplies last!)\n📍 Downtown Mary Bakes\n\n#FreshFriday #MaryBakes #CroissantLovers #WeekendTreat #LocalBakery #FreshBaked",
    hashtags: "#FreshFriday #MaryBakes #CroissantLovers",
    bestTime: "8:30 AM - Perfect for morning coffee crowd"
  };

  useEffect(() => {
    if (currentStep === 0) {
      // Start typing animation after 1 second
      const timer = setTimeout(() => {
        setCurrentStep(1);
      }, 1000);
      return () => clearTimeout(timer);
    }

    if (currentStep === 1) {
      // Typing effect
      const timer = setTimeout(() => {
        if (typedText.length < userInput.length) {
          setTypedText(userInput.slice(0, typedText.length + 1));
        } else {
          setCurrentStep(2);
        }
      }, 100);
      return () => clearTimeout(timer);
    }

    if (currentStep === 2) {
      // Show AI response after typing is complete
      const timer = setTimeout(() => {
        setShowResponse(true);
        setCurrentStep(3);
      }, 500);
      return () => clearTimeout(timer);
    }

    if (currentStep === 3) {
      // Reset after showing response for 4 seconds
      const timer = setTimeout(() => {
        setCurrentStep(0);
        setTypedText('');
        setShowResponse(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [currentStep, typedText, userInput]);

  return (
    <div className="p-4 bg-muted/30 rounded-lg border border-border/50 space-y-3">
      {/* User Input */}
      <div className="flex items-start gap-2">
        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs">
          👤
        </div>
        <div className="flex-1">
          <div className="text-xs text-muted-foreground mb-1">You:</div>
          <div className="text-sm">
            {typedText}
            {currentStep === 1 && (
              <span className="animate-pulse">|</span>
            )}
          </div>
        </div>
      </div>

      {/* AI Response */}
      {showResponse && (
        <div className="flex items-start gap-2 animate-fade-in">
          <div className="w-6 h-6 rounded-full bg-gradient-primary flex items-center justify-center text-xs">
            🤖
          </div>
          <div className="flex-1">
            <div className="text-xs text-muted-foreground mb-1">Mary Bakes AI:</div>
            <div className="bg-card border border-border/50 rounded-lg p-3 space-y-2">
              <div className="text-xs font-medium text-primary">📱 Instagram Post Ready</div>
              <div className="text-xs text-foreground leading-relaxed whitespace-pre-line">
                {aiResponse.content}
              </div>
              <div className="text-xs text-muted-foreground border-t border-border/30 pt-2">
                ⏰ Scheduled for: {aiResponse.bestTime}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TypingDemo;