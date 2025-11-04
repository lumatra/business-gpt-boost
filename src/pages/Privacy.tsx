import React from "react";
import SEO from "@/components/SEO";
import Navigation from "@/components/Navigation";

const Privacy = () => {
  return (
    <>
      <Navigation />
      <main className="container mx-auto px-4 py-10 mt-24">
      <SEO
        title="Privacy Policy | Helpzz"
        description="Learn how Helpzz handles your data in our Privacy Policy."
        canonicalPath="/privacy"
      />
      <article className="max-w-3xl mx-auto space-y-6 prose prose-slate">
        <h1 className="text-4xl font-bold tracking-tight">Helpzz Privacy Policy</h1>
        <p className="text-sm text-muted-foreground">(Last updated: October 2025)</p>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introduction</h2>
          <p>
            Helpzz ("we", "our", or "us") is a platform operated by Lumatra Ltd (company no.
            SC813300), a company registered in Scotland with its registered address at 132
            Strathcarron Drive, Paisley, Scotland, PA2 7AY.
          </p>
          <p>
            This Privacy Policy explains how we collect, use, store, and protect your information
            when you use the Helpzz platform or visit our website.
          </p>
          <p>
            Lumatra Ltd (company no. SC813300) is the data controller for any personal data
            collected directly from Helpzz users.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">2. Information We Collect</h2>
          <p>We collect the following information from you when you use Helpzz:</p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Account Information</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Business name</li>
            <li>Contact name</li>
            <li>Email address</li>
            <li>Telephone number</li>
            <li>Password (encrypted)</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">Payment Information</h3>
          <p>
            Payments are handled securely by Stripe. Helpzz does not store or have access to your
            card or bank details.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Usage Information</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Activity on the Helpzz platform (e.g. token use, logins, preferences)</li>
            <li>
              Technical data such as IP address, browser type, and device information (for service
              security and analytics)
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">3. How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Create and manage your Helpzz account.</li>
            <li>Process token purchases and send usage notifications.</li>
            <li>Provide customer support and respond to queries.</li>
            <li>Improve and maintain the Helpzz platform.</li>
            <li>
              Send service updates and important notices (not marketing unless you opt in).
            </li>
          </ul>
          <p>
            We will only use your data where we have a lawful basis to do so under UK GDPR —
            typically to perform our contract with you, comply with legal obligations, or pursue
            legitimate interests.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">4. How We Store and Protect Your Data</h2>
          <p>
            All Helpzz user data is stored securely within the United Kingdom. We use
            industry-standard encryption and access controls to protect your information.
            Passwords are hashed and never stored in plain text. Access to data is limited to
            authorised personnel only.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">5. Sharing Your Information</h2>
          <p>We do not sell or rent your data to anyone.</p>
          <p>
            We may share data with trusted third parties who help us deliver our service, such
            as:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Stripe for payment processing.</li>
            <li>
              Cloud hosting and AI service providers (UK-based or GDPR-compliant sub-processors)
              for data storage and AI processing.
            </li>
          </ul>
          <p>
            All third parties are bound by data protection agreements and cannot use your data
            for their own purposes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">6. Data Retention</h2>
          <p>
            We keep your account data for as long as your Helpzz account remains active. If you
            close your account, we will delete or anonymise your data within 90 days, unless
            retention is required by law (e.g. financial records).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">7. Your Rights</h2>
          <p>Under UK GDPR, you have the right to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Access the personal data we hold about you.</li>
            <li>Request correction or deletion of your data.</li>
            <li>Object to processing or request restriction.</li>
            <li>Withdraw consent (where applicable).</li>
            <li>
              Lodge a complaint with the Information Commissioner's Office (ICO) if you believe
              your data has been misused.
            </li>
          </ul>
          <p>
            You can exercise your rights by emailing privacy@lumatra.com (replace with your chosen
            contact email).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">8. Cookies and Tracking</h2>
          <p>
            Our website uses cookies to enhance your browsing experience and collect limited
            analytics data. See our Cookie Policy for more details and to manage your cookie
            preferences.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">9. International Data Transfers</h2>
          <p>
            All UK customer data is hosted within the UK. If we ever transfer data outside the
            UK, it will be protected by appropriate safeguards (e.g. UK-approved Standard
            Contractual Clauses).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">10. Updates to This Policy</h2>
          <p>
            We may update this Privacy Policy occasionally. Any changes will be posted on the
            Helpzz website, and the updated version will take effect immediately upon posting.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">11. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy or how we handle your data, please
            contact:
          </p>
          <p>Lumatra Ltd (Company no. SC813300)</p>
          <p>132 Strathcarron Drive, Paisley, Scotland, PA2 7AY</p>
          <p>Email: info@lumatra.net</p>
        </section>
      </article>
    </main>
    </>
  );
};

export default Privacy;
