import React from "react";

const Footer = () => {
  return (
    <footer className="w-full py-8 bg-muted/30 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            <a 
              href="https://helpzz.co.uk/terms" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Terms & Conditions
            </a>
            <a 
              href="https://helpzz.co.uk/privacy" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Privacy Policy
            </a>
            <a 
              href="https://helpzz.co.uk/cookies" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Cookies Policy
            </a>
            <a 
              href="https://helpzz.co.uk/acceptable-use" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Acceptable Use
            </a>
            <a 
              href="https://helpzz.co.uk/dpa" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              DPA
            </a>
            <a 
              href="https://helpzz.co.uk/ai-disclaimer" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              AI Disclaimer
            </a>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Helpzz is a product of Lumatra Ltd, registered in the UK.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
