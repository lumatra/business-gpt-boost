import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full py-8 bg-muted/30 border-t border-border">
      <div className="container mx-auto px-4">
      <div className="flex flex-col items-center gap-4">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            <Link
              to="/terms"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Terms & Conditions
            </Link>
            <Link
              to="/privacy"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/cookies"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Cookies Policy
            </Link>
            <Link
              to="/acceptable-use"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Acceptable Use
            </Link>
            <Link
              to="/dpa"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              DPA
            </Link>
            <Link
              to="/ai-disclaimer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              AI Disclaimer
            </Link>
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
