import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const ContactSection = () => {
  return (
    <section id="contact" className="min-h-screen flex flex-col justify-center snap-start bg-card">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex-1 flex flex-col justify-center">
        <h2 className="text-4xl font-extrabold text-card-foreground sm:text-5xl">
          Got a Question?
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Have questions before you sign up? Drop us a line. We're a small business too — happy to answer any questions before you start.
        </p>
        <Button
          asChild
          className="mt-10 px-8 py-4 text-lg bg-accent text-accent-foreground hover:bg-accent/90 mx-auto"
        >
          <a href="mailto:info@helpzz.co.uk">
            Contact Us at info@helpzz.co.uk
          </a>
        </Button>
      </div>

      {/* Footer */}
      <div className="w-full py-6 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-3">
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
              <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">Terms & Conditions</Link>
              <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
              <Link to="/cookies" className="text-muted-foreground hover:text-primary transition-colors">Cookies Policy</Link>
              <Link to="/acceptable-use" className="text-muted-foreground hover:text-primary transition-colors">Acceptable Use</Link>
              <Link to="/dpa" className="text-muted-foreground hover:text-primary transition-colors">DPA</Link>
              <Link to="/ai-disclaimer" className="text-muted-foreground hover:text-primary transition-colors">AI Disclaimer</Link>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Helpzz is a product of Lumatra Ltd, registered in the UK.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
