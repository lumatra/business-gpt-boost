import React from "react";
import { Button } from "./ui/button";

const VideoSection = () => {
  return (
    <section id="video" className="py-24 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            See Helpzz In Action
          </h2>
          <p className="text-xl text-muted-foreground">
            Watch how Helpzz keeps your business running — even when you can't answer the phone.
          </p>
        </div>

        <div className="rounded-2xl overflow-hidden shadow-elegant border border-border">
          <video
            controls
            playsInline
            preload="metadata"
            className="w-full aspect-video bg-foreground/5"
            poster=""
          >
            <source src="/videos/promo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="text-center mt-10">
          <a href="https://portal.helpzz.co.uk/signup?plan=pro" target="_blank" rel="noopener noreferrer">
            <Button
              size="lg"
              className="px-10 py-7 text-xl bg-primary hover:bg-primary/90 shadow-elegant"
            >
              Start Your Free 30-Day Pilot
            </Button>
          </a>
          <p className="text-sm text-muted-foreground mt-3">
            No payment required to start
          </p>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
