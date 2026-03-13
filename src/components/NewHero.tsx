import React, { useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent } from "./ui/dialog";

const NewHero = () => {
  const [videoOpen, setVideoOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
    <section className="bg-gradient-hero min-h-screen flex items-center snap-start pt-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center bg-primary/10 rounded-full px-4 py-2 mb-3">
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse mr-2"></span>
              <span className="text-sm font-medium text-foreground">Trusted by UK businesses</span>
            </div>
            <h1 className="text-5xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Never Miss Another Customer.
            </h1>
            <p className="mt-3 text-lg md:text-xl text-muted-foreground">
              An AI assistant that replies to customer enquiries 24/7 while you're on the job.
            </p>
            <p className="mt-2 text-lg text-muted-foreground">
              One simple plan from <span className="font-bold text-primary">£14.99/month</span>.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-4 justify-center lg:justify-start">
              <Button
                size="lg"
                onClick={() => scrollToSection("signup")}
                className="px-8 py-6 text-lg bg-primary hover:bg-primary/90 shadow-elegant"
              >
                Start 30-Day Free Pilot
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection("how-it-works")}
                className="px-8 py-6 text-lg border-2"
              >
                See How It Works
              </Button>
            </div>
            <button
              onClick={() => setVideoOpen(true)}
              className="inline-flex items-center gap-2 mt-3 text-primary font-semibold hover:underline cursor-pointer bg-transparent border-none p-0 text-sm"
            >
              🎬 Watch Helpzz capture your customer while you're busy
            </button>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 justify-center lg:justify-start text-xs text-muted-foreground">
              <span>✓ Built for UK trades</span>
              <span>✓ Works with SMS & WhatsApp</span>
              <span>✓ Setup in 10 minutes</span>
              <span>✓ Cancel anytime</span>
            </div>
          </div>
          
          {/* Chat Preview */}
          <div className="hidden lg:block mt-8 lg:mt-0">
            <h3 className="text-xl font-bold text-foreground mb-3">This is what happens when a customer messages your business.</h3>
            <div className="bg-card/50 backdrop-blur-lg rounded-2xl p-4 shadow-elegant border border-border">
              <div className="space-y-2">
                 <div className="bg-muted rounded-lg p-2.5">
                   <p className="text-sm font-medium text-muted-foreground mb-1">Customer (10:37pm)</p>
                   <p className="text-foreground">"Do you work weekends?"</p>
                 </div>
                 <div className="bg-primary rounded-lg p-2.5 ml-8">
                   <p className="text-sm font-medium text-primary-foreground/80 mb-1">Helpzz Assistant (10:37pm)</p>
                   <p className="text-primary-foreground">"Yes, I work Saturdays 9am-5pm. Sundays by exception for urgent jobs. What do you need help with?"</p>
                 </div>
                 <div className="bg-muted rounded-lg p-2.5">
                   <p className="text-sm font-medium text-muted-foreground mb-1">Customer</p>
                   <p className="text-foreground">Do you hang doors?</p>
                 </div>
                 <div className="bg-primary rounded-lg p-2.5 ml-8">
                   <p className="text-sm font-medium text-primary-foreground/80 mb-1">Helpzz Assistant (10:39pm)</p>
                   <p className="text-primary-foreground">Yes — £60 per door and I cover Livingston. What's your postcode and phone number?</p>
                 </div>
                  <div className="bg-muted rounded-lg p-2.5">
                    <p className="text-sm font-medium text-muted-foreground mb-1">Customer</p>
                    <p className="text-foreground">EH54 6XX — 07700 900123</p>
                  </div>
                </div>
                <p className="mt-3 text-sm text-muted-foreground text-center">
                  Your customers get replies like this instantly — even when you're busy on a job.
                </p>
              </div>
          </div>
        </div>
      </div>
    </section>

    <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden bg-foreground/95 border-none">
        <video
          controls
          autoPlay
          playsInline
          className="w-full aspect-video"
        >
          <source src="/videos/promo.mp4" type="video/mp4" />
        </video>
      </DialogContent>
    </Dialog>
    </>
  );

};

export default NewHero;
