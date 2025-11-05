import React from "react";
import { Button } from "./ui/button";

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 bg-card">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-extrabold text-card-foreground sm:text-5xl">
          Got a Question?
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Have questions before you sign up? Drop us a line. We're a small business too, and we're here to help.
        </p>
        <Button
          asChild
          className="mt-10 px-8 py-4 text-lg bg-accent text-accent-foreground hover:bg-accent/90"
        >
          <a href="mailto:info@helpzz.co.uk">
            Contact Us at info@helpzz.co.uk
          </a>
        </Button>
      </div>
    </section>
  );
};

export default ContactSection;
