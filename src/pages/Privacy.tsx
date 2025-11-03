import React from "react";
import SEO from "@/components/SEO";

const Privacy = () => {
  return (
    <main className="container mx-auto px-4 py-10">
      <SEO
        title="Privacy Policy | Helpzz"
        description="Learn how Helpzz handles your data in our Privacy Policy."
        canonicalPath="/privacy"
      />
      <article className="max-w-3xl mx-auto space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight">Privacy Policy</h1>
        <p className="text-muted-foreground">
          This page will include Helpzz's Privacy Policy. Share the document and I’ll insert
          the full text for you.
        </p>
      </article>
    </main>
  );
};

export default Privacy;
