import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const SignupSection = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      business_name: formData.get("business_name") as string,
      business_type: formData.get("business_type") as string,
    };

    try {
      const { error } = await supabase.functions.invoke("send-signup-email", {
        body: data,
      });

      if (error) throw error;

      setFormSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="signup" className="py-20 bg-gradient-hero">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
          Ready to Stop Missing Customers?
        </h2>
        <p className="text-xl md:text-2xl mb-8 text-muted-foreground">
          Start your 14-day free trial. No credit card required.
        </p>
        
        {!formSubmitted ? (
          <div className="bg-card rounded-2xl p-8 max-w-md mx-auto shadow-elegant border border-border">
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div>
                <Label htmlFor="name" className="block text-sm font-medium text-card-foreground mb-1">
                  Your Name
                </Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  required
                  placeholder="Andy"
                  className="w-full"
                />
              </div>
              <div>
                <Label htmlFor="business_name" className="block text-sm font-medium text-card-foreground mb-1">
                  Business Name
                </Label>
                <Input
                  type="text"
                  name="business_name"
                  id="business_name"
                  required
                  placeholder="West Lothian Handyman"
                  className="w-full"
                />
              </div>
              <div>
                <Label htmlFor="phone" className="block text-sm font-medium text-card-foreground mb-1">
                  Phone Number
                </Label>
                <Input
                  type="tel"
                  name="phone"
                  id="phone"
                  required
                  placeholder="07700 900123"
                  className="w-full"
                />
              </div>
              <div>
                <Label htmlFor="email" className="block text-sm font-medium text-card-foreground mb-1">
                  Email
                </Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  required
                  placeholder="andy@example.com"
                  className="w-full"
                />
              </div>
              <div>
                <Label htmlFor="business_type" className="block text-sm font-medium text-card-foreground mb-1">
                  What do you do?
                </Label>
                <select
                  name="business_type"
                  id="business_type"
                  required
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="handyman">Handyman</option>
                  <option value="electrician">Electrician</option>
                  <option value="plumber">Plumber</option>
                  <option value="decorator">Decorator</option>
                  <option value="builder">Builder</option>
                  <option value="therapist">Therapist/Counsellor</option>
                  <option value="florist">Florist</option>
                  <option value="other">Other Service Business</option>
                </select>
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-primary hover:bg-primary/90"
              >
                {isSubmitting ? "Sending..." : "Start My Free Trial"}
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                We'll call you within 24 hours to set everything up
              </p>
            </form>
          </div>
        ) : (
          <div className="bg-card rounded-2xl p-8 max-w-md mx-auto shadow-elegant border border-border text-center">
            <h3 className="text-3xl font-bold text-primary">We got your message!</h3>
            <p className="mt-4 text-lg text-muted-foreground">
              Someone will be in touch within 24 hours to set up your assistants.
            </p>
          </div>
        )}

        <p className="text-sm text-muted-foreground mt-8">
          Or email us: <a href="mailto:helpzz@lumatra.net" className="underline font-semibold hover:text-primary">helpzz@lumatra.net</a>
        </p>
      </div>
    </section>
  );
};

export default SignupSection;
