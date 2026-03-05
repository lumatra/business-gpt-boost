import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const GA_ID = "G-R9JS1XFHGY";
const STORAGE_KEY = "helpzz-cookie-consent";

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(STORAGE_KEY);
    if (!consent) {
      // Disable GA until user accepts
      (window as any)[`ga-disable-${GA_ID}`] = true;
      setVisible(true);
    } else if (consent === "rejected") {
      (window as any)[`ga-disable-${GA_ID}`] = true;
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(STORAGE_KEY, "accepted");
    (window as any)[`ga-disable-${GA_ID}`] = false;
    setVisible(false);
    // Re-initialize GA
    if (typeof (window as any).gtag === "function") {
      (window as any).gtag("config", GA_ID);
    }
  };

  const handleReject = () => {
    localStorage.setItem(STORAGE_KEY, "rejected");
    (window as any)[`ga-disable-${GA_ID}`] = true;
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card shadow-lg">
      <div className="container mx-auto flex flex-col items-center gap-4 px-4 py-4 sm:flex-row sm:justify-between">
        <p className="text-sm text-muted-foreground text-center sm:text-left">
          We use analytics tools to understand how visitors use our website so we can improve the service.{" "}
          <Link to="/cookies" className="underline text-primary hover:text-primary/80">
            Cookie Policy
          </Link>
        </p>
        <div className="flex gap-3 shrink-0">
          <Button variant="outline" size="sm" onClick={handleReject}>
            Reject
          </Button>
          <Button size="sm" onClick={handleAccept}>
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
