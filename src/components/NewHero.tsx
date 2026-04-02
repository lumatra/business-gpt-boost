import React, { useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent } from "./ui/dialog";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";

const NewHero = () => {
  const [videoOpen, setVideoOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyNumber = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText("07401271927");
    setCopied(true);
    toast("Number copied!");
    setTimeout(() => setCopied(false), 2000);
  };
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
            <h1 className="text-5xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Missed 3 jobs today?
              <br />
              <span className="text-primary">That's £600 gone.</span>
            </h1>
            <p className="mt-5 text-lg md:text-xl text-muted-foreground">
              Helpzz replies to your customers instantly — most trades lose jobs simply by replying too late.
            </p>
            <div className="flex flex-col gap-3 mt-6 justify-center lg:justify-start">
              <a
                href="sms:07401271927?body=How%20much%20for%20a%20call%20out%3F"
                onClick={(e) => {
                  if (typeof (window as any).gtag === "function") {
                    e.preventDefault();
                    (window as any).gtag("event", "sms_click", {
                      event_category: "engagement",
                      event_label: "cta_sms_click",
                    });
                    setTimeout(() => {
                      window.location.href = "sms:07401271927?body=How%20much%20for%20a%20call%20out%3F";
                    }, 150);
                  }
                }}
                className="block no-underline text-inherit border-2 border-primary bg-primary/10 rounded-xl px-6 py-6 text-center shadow-lg shadow-primary/20 hover:bg-primary/15 transition-colors"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <p className="text-lg md:text-xl font-extrabold text-primary uppercase tracking-wide">TEXT THIS NOW — SEE IT REPLY</p>
                <p className="text-6xl md:text-7xl font-extrabold text-primary leading-none mt-4">07401 271927</p>
                <p className="text-base text-muted-foreground mt-4">Tap → message opens → just press send</p>
                <p className="text-sm font-semibold text-foreground mt-3">No signup. No app. Just try it.</p>
                <p className="text-sm font-semibold text-primary mt-2">⚡ Replies in seconds</p>
                <p className="text-base text-primary mt-3 animate-bounce">⬇️ Tap here to try it</p>
              </a>
              <button
                onClick={copyNumber}
                className="hidden lg:inline-flex items-center justify-center gap-1.5 bg-primary/20 hover:bg-primary/30 text-primary rounded-lg px-4 py-2 text-sm font-medium transition-colors self-center"
                title="Copy number"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? "Copied!" : "Copy number"}
              </button>
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
              <p className="mt-3 text-sm font-medium text-muted-foreground text-center">No app. No signup. Just text it.</p>
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
