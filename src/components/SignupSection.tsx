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
    <section id="signup" className="py-24 bg-muted">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-foreground sm:text-5xl">
            Let's Get You Set Up
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Fill in your details and we'll be in touch shortly to build your assistant.
          </p>
        </div>

        {!formSubmitted ? (
          <div className="mt-12">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-6">
              <div>
                <Label htmlFor="name" className="block text-sm font-medium text-foreground">
                  Name
                </Label>
                <div className="mt-1">
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="name"
                    required
                    className="block w-full p-3"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="email" className="block text-sm font-medium text-foreground">
                  Email
                </Label>
                <div className="mt-1">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full p-3"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="phone" className="block text-sm font-medium text-foreground">
                  Phone Number
                </Label>
                <div className="mt-1">
                  <Input
                    type="tel"
                    name="phone"
                    id="phone"
                    autoComplete="tel"
                    required
                    className="block w-full p-3"
                  />
                </div>
              </div>
              <div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-4 text-lg bg-primary hover:bg-primary/90"
                >
                  {isSubmitting ? "Sending..." : "Send"}
                </Button>
              </div>
            </form>
          </div>
        ) : (
          <div className="mt-12 p-8 bg-card rounded-lg shadow-card text-center border border-border">
            <h3 className="text-3xl font-bold text-primary">We got your message!</h3>
            <p className="mt-4 text-lg text-muted-foreground">
              Someone will be in touch shortly to set up your assistant.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default SignupSection;
