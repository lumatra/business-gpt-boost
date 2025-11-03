import React from "react";
import SEO from "@/components/SEO";

const Terms = () => {
  return (
    <main className="container mx-auto px-4 py-10">
      <SEO
        title="Terms and Conditions | Helpzz"
        description="Read Helpzz Terms and Conditions."
        canonicalPath="/terms"
      />
      <article className="max-w-3xl mx-auto space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight">Terms and Conditions</h1>
        <p className="text-muted-foreground">
          This page will display the official Terms and Conditions for Helpzz. If you've
          uploaded or shared the document, I can populate the full content here.
        </p>
      </article>
    </main>
  );
};

export default Terms;
