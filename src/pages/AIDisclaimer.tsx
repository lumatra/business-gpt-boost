import React from "react";
import SEO from "@/components/SEO";

const AIDisclaimer = () => {
  return (
    <main className="container mx-auto px-4 py-10">
      <SEO
        title="AI Disclaimer | Helpzz"
        description="Important information about Helpzz's AI features and limitations."
        canonicalPath="/ai-disclaimer"
      />
      <article className="max-w-3xl mx-auto space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight">AI Disclaimer</h1>
        <p className="text-muted-foreground">
          This page will contain the AI Disclaimer. Share the document and I’ll publish the full
          text here.
        </p>
      </article>
    </main>
  );
};

export default AIDisclaimer;
