import React from "react";
import SEO from "@/components/SEO";
import Navigation from "@/components/Navigation";

const Cookies = () => {
  return (
    <>
      <Navigation />
      <main className="container mx-auto px-4 py-10 mt-24">
      <SEO
        title="Cookies Policy | Helpzz"
        description="Understand how Helpzz uses cookies on our website."
        canonicalPath="/cookies"
      />
      <article className="max-w-3xl mx-auto space-y-6 prose prose-slate">
        <h1 className="text-4xl font-bold tracking-tight">Helpzz Cookie Policy</h1>
        <p className="text-sm text-muted-foreground">(Last updated: October 2025)</p>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introduction</h2>
          <p>
            This Cookie Policy explains how Helpzz, operated by Lumatra Ltd (company no.
            SC813300), uses cookies and similar technologies on our website and platform.
          </p>
          <p>
            By using the Helpzz website, you agree that we can place cookies on your device as
            described in this policy.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">2. What Are Cookies?</h2>
          <p>
            Cookies are small text files that are stored on your computer or device when you
            visit a website. They help the site remember your preferences, login status, and
            other information to improve your experience.
          </p>
          <p>Cookies can be:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Session cookies – deleted automatically when you close your browser.</li>
            <li>Persistent cookies – remain stored until they expire or are deleted.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">3. How We Use Cookies</h2>
          <p>Helpzz uses cookies for the following purposes:</p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Essential Cookies</h3>
          <p>
            Required for the website and Helpzz platform to function (e.g. user authentication,
            account security, session management).
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Performance & Analytics Cookies</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Used to collect anonymous information about how visitors use our site (e.g. pages
              visited, time spent).
            </li>
            <li>Helps us improve functionality and user experience.</li>
            <li>Example: Google Analytics (if used — ensure IP anonymisation is enabled).</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">Preference Cookies</h3>
          <p>Remember your settings, such as language or cookie preferences.</p>

          <p>
            We do not use advertising or tracking cookies for marketing purposes without your
            explicit consent.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">4. Third-Party Cookies</h2>
          <p>
            Some cookies may be set by trusted third-party services that help us deliver our
            platform, including:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Stripe (for secure payment processing)</li>
            <li>Hosting or analytics providers (for performance monitoring)</li>
          </ul>
          <p>
            All third parties we work with are GDPR-compliant and may only use cookies as
            necessary to provide their services to us.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">5. Managing Your Cookie Preferences</h2>
          <p>
            When you first visit our website, a cookie banner will ask you to accept or manage
            cookies.
          </p>
          <p>You can:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Accept all cookies.</li>
            <li>Reject non-essential cookies.</li>
            <li>Change your cookie preferences at any time.</li>
          </ul>
          <p>You can also control cookies through your browser settings:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Google Chrome: Settings → Privacy and security → Cookies and site data.</li>
            <li>Safari: Preferences → Privacy.</li>
            <li>Firefox: Options → Privacy & Security.</li>
            <li>Edge: Settings → Cookies and site permissions.</li>
          </ul>
          <p>
            Please note that disabling essential cookies may affect the functionality of the
            Helpzz platform.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">6. Updates to This Policy</h2>
          <p>
            We may update this Cookie Policy occasionally. Any updates will be posted on this page
            with a revised date at the top.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">7. Contact Us</h2>
          <p>
            If you have any questions about this Cookie Policy or how we use cookies, please
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

export default Cookies;
