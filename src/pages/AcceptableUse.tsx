import React from "react";
import SEO from "@/components/SEO";

const AcceptableUse = () => {
  return (
    <main className="container mx-auto px-4 py-10">
      <SEO
        title="Acceptable Use Policy | Helpzz"
        description="Review Helpzz's Acceptable Use Policy."
        canonicalPath="/acceptable-use"
      />
      <article className="max-w-3xl mx-auto space-y-6 prose prose-slate">
        <h1 className="text-4xl font-bold tracking-tight">Helpzz Acceptable Use Policy (AUP)</h1>
        <p className="text-sm text-muted-foreground">(Last updated: October 2025)</p>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introduction</h2>
          <p>
            This Acceptable Use Policy ("Policy") sets out the rules for using Helpzz, a service
            operated by Lumatra Ltd (company no. SC813300), registered at 132 Strathcarron Drive,
            Paisley, Scotland, PA2 7AY.
          </p>
          <p>
            By creating an account or using Helpzz, you agree to comply with this Policy. Lumatra
            reserves the right to suspend or terminate access to the Helpzz platform if this
            Policy is violated.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">2. Purpose of This Policy</h2>
          <p>
            Helpzz is designed to help small and micro businesses use AI to manage FAQs, customer
            queries, and related communication tasks. To keep the platform safe and compliant for
            all users, you must use Helpzz responsibly and lawfully.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">3. Prohibited Activities</h2>
          <p>When using Helpzz, you must not:</p>

          <h3 className="text-xl font-semibold mt-6 mb-3">a) Unlawful or Harmful Use</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Use Helpzz to create, store, or distribute any material that is illegal, harmful,
              threatening, abusive, defamatory, or discriminatory.
            </li>
            <li>Engage in harassment, hate speech, or incite violence.</li>
            <li>Use Helpzz to deceive, mislead, or impersonate others.</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">b) Inappropriate or Misleading AI Use</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Generate or distribute false, misleading, or deceptive information.</li>
            <li>Use AI-generated outputs as factual without appropriate human review.</li>
            <li>
              Attempt to use Helpzz for spam, mass messaging, or unsolicited commercial
              communication.
            </li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">c) Security and System Abuse</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Attempt to access accounts or data belonging to other users.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">4. Enforcement</h2>
          <p>Lumatra may, at its discretion:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Suspend or terminate your account if this Policy is breached.</li>
            <li>Remove any content deemed inappropriate, unlawful, or non-compliant.</li>
            <li>Report illegal activities to relevant authorities.</li>
          </ul>
          <p>
            We aim to resolve most issues by contacting the user first, but serious or repeated
            violations may result in immediate suspension.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">5. Reporting Misuse</h2>
          <p>
            If you believe someone is violating this Policy or using Helpzz inappropriately,
            please contact us at info@lumatra.net. We review all reports promptly.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">6. Changes to This Policy</h2>
          <p>
            We may update this Policy from time to time. The latest version will always be
            available on the Helpzz website, and continued use of the platform constitutes
            acceptance of any changes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">7. Contact</h2>
          <p>Lumatra Ltd (Company no. SC813300)</p>
          <p>132 Strathcarron Drive, Paisley, Scotland, PA2 7AY</p>
          <p>Email: info@lumatra.net</p>
        </section>
      </article>
    </main>
  );
};

export default AcceptableUse;
