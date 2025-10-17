import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, Phone, ArrowRight } from "lucide-react";
import { categories } from "@/data/categories";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const SpecialistsGrid = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleRequestConsultation = (categoryTitle: string) => {
    setSelectedCategory(categoryTitle);
    setIsDialogOpen(true);
  };

  const handleSubmitConsultation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber || !name) {
      toast({
        title: "Missing Information",
        description: "Please provide both your name and phone number.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('inquiries')
        .insert([
          {
            contact_name: name,
            phone: phoneNumber,
            use_case: selectedCategory,
            company_name: "To be discussed",
            email: "phone-consultation@temp.com",
            message: `Phone consultation requested for ${selectedCategory}`,
            status: 'pending'
          }
        ]);

      if (error) throw error;

      toast({
        title: "Consultation Requested",
        description: "We'll contact you within 24 hours to discuss your AI solution needs.",
      });
      
      setIsDialogOpen(false);
      setPhoneNumber("");
      setName("");
      setSelectedCategory("");
    } catch (error) {
      console.error('Error submitting consultation request:', error);
      toast({
        title: "Error",
        description: "Failed to submit consultation request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">All AI Specialists</h1>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Choose the specialist that best matches your current goal. Each one can be added individually or as part of a package.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card key={index} className="group hover:shadow-card transition-all duration-300 border-border bg-card relative">
                <div className="absolute top-6 right-6">
                  <div className="bg-primary/10 text-primary text-sm font-semibold px-3 py-1 rounded-full">
                    {category.price}
                  </div>
                </div>
                <CardHeader className="pb-4">
                  <div className={`w-12 h-12 rounded-xl ${category.bgColor} flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 ${category.color}`} />
                  </div>
                  <CardTitle className="text-xl mb-3 text-foreground pr-20">{category.title}</CardTitle>
                  <CardDescription className="text-muted-foreground text-sm leading-relaxed">
                    {category.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-6">
                    {category.features.slice(0, 4).map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-xs text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button 
                        onClick={() => handleRequestConsultation(category.title)}
                        className="w-full bg-primary hover:bg-primary/90 hover:shadow-elegant transition-all duration-300"
                      >
                        Request Consultation
                        <Phone className="w-4 h-4 ml-2" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Request a Consultation</DialogTitle>
                        <DialogDescription>
                          We'll call you within 24 hours to discuss your {selectedCategory} needs and explain how to get started.
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleSubmitConsultation} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Your Name</Label>
                          <Input
                            id="name"
                            type="text"
                            placeholder="Enter your full name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="Enter your phone number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                          />
                        </div>
                        <div className="flex justify-end space-x-2 pt-4">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsDialogOpen(false)}
                            disabled={isSubmitting}
                          >
                            Cancel
                          </Button>
                          <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-primary hover:bg-primary/90"
                          >
                            {isSubmitting ? "Submitting..." : "Request Call"}
                          </Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SpecialistsGrid;
