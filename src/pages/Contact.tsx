import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ContactForm from '@/components/ContactForm';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <header className="border-b bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-6">
            Let's Build Your Custom GPT
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to transform your business with AI? Tell us about your needs and we'll create a tailored solution.
          </p>
        </div>

        <ContactForm />

        <div className="text-center mt-16 space-y-6">
          <h2 className="text-2xl font-bold">Why Choose Our Custom GPT Solutions?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="p-6 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2">Industry Expertise</h3>
              <p className="text-sm text-muted-foreground">
                We understand your business vertical and create GPTs that speak your industry's language.
              </p>
            </div>
            <div className="p-6 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2">Rapid Deployment</h3>
              <p className="text-sm text-muted-foreground">
                Get your custom GPT up and running in days, not months. Start seeing ROI immediately.
              </p>
            </div>
            <div className="p-6 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2">Ongoing Support</h3>
              <p className="text-sm text-muted-foreground">
                Continuous optimization and support to ensure your GPT evolves with your business needs.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;