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
      <article className="max-w-3xl mx-auto space-y-6 prose prose-slate">
        <h1 className="text-4xl font-bold tracking-tight">Helpzz Terms and Conditions</h1>
        <p className="text-sm text-muted-foreground">(Last updated: October 2025)</p>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">1. About Us</h2>
          <p>
            Helpzz is a platform operated by Lumatra Ltd (company no. SC813300), a company
            registered in Scotland.
          </p>
          <p>Registered office: 132 Strathcarron Drive, Paisley, Scotland, PA2 7AY.</p>
          <p>Trading name: "Helpzz".</p>
          <p>Contact: info@lumatra.net.</p>
          <p>
            Helpzz enables small and micro businesses to use AI-powered tools to automate FAQs,
            customer queries, and similar support functions. These Terms and Conditions ("Terms")
            set out how you may access and use the Helpzz platform and related services (the
            "Service"). By creating an account or using Helpzz, you agree to these Terms. You
            agree to provide accurate business information during registration and to keep it up
            to date.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">3. Token Purchases and Usage</h2>
          <p>
            Helpzz operates on a pay-per-use model. You can purchase tokens that allow a set
            number of interactions or AI agent uses. Token usage and pricing are shown within
            your account dashboard. Tokens are non-transferable and non-refundable once used.
            Refunds or credits for unused tokens will be managed separately outside these Terms.
            Lumatra may change pricing or token structures from time to time, but changes will
            not affect existing purchased tokens.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">4. Service Availability</h2>
          <p>
            We aim to provide continuous access to Helpzz, but availability may vary due to
            maintenance, updates, or technical issues.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">5. AI Outputs and Responsibilities</h2>
          <p>
            Helpzz uses artificial intelligence to generate automated responses or suggestions.
            These outputs are based on data and models provided by Lumatra and its partners. You
            are responsible for reviewing and approving any AI-generated content before sharing
            it with your customers or the public. Lumatra is not liable for losses or damages
            arising from reliance on AI-generated outputs.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">6. Data Protection and Privacy</h2>
          <p>
            We collect and store limited business contact information (name, email, phone number)
            to operate your account. Payment processing is handled securely by Stripe; Lumatra
            does not store or have access to your payment details. All data for UK users is
            hosted within the UK. By using Helpzz, you agree to our Privacy Policy and Data
            Processing Agreement, which explain how we handle data in compliance with UK GDPR.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">7. Acceptable Use</h2>
          <p>You agree not to use Helpzz to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>create or distribute unlawful, harmful, or misleading content,</li>
            <li>infringe on the rights of others,</li>
            <li>interfere with or disrupt the Service,</li>
            <li>reverse-engineer or copy any part of the platform.</li>
          </ul>
          <p>Lumatra reserves the right to suspend or terminate accounts that breach this policy.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">8. Intellectual Property</h2>
          <p>
            All intellectual property in the Helpzz platform, including software, design, and AI
            systems, belongs to Lumatra Ltd or its licensors. You retain ownership of any content
            or data you upload to your account. By using Helpzz, you grant Lumatra a limited
            licence to process your uploaded data for the purpose of providing the Service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">9. Limitation of Liability</h2>
          <p>
            Helpzz is provided on an "as is" and "as available" basis. To the maximum extent
            permitted by law, Lumatra is not liable for any indirect, consequential, or special
            losses. Our total liability to you for any claim arising under these Terms shall not
            exceed the total amount paid by you for tokens in the 12 months preceding the claim.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">10. Termination</h2>
          <p>
            You may close your account at any time by contacting us. Lumatra may suspend or
            terminate your access if you breach these Terms or misuse the Service. Upon
            termination, any unused tokens will lapse.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">11. Changes to These Terms</h2>
          <p>
            We may update these Terms from time to time. Any changes will be posted on the Helpzz
            website, and your continued use of the Service means you accept the updated version.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">12. Governing Law</h2>
          <p>
            These Terms are governed by the laws of the United Kingdom. Any disputes will be
            subject to the exclusive jurisdiction of the UK courts.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">13. Contact</h2>
          <p>If you have any questions about these Terms or the Service, please contact:</p>
          <p>Lumatra Ltd (Helpzz)</p>
          <p>132 Strathcarron Drive, Paisley, Scotland, PA2 7AY</p>
          <p>Email: info@lumatra.net</p>
        </section>
      </article>
    </main>
  );
};

export default Terms;
