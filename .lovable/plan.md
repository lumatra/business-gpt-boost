

# Fix GA Click Tracking on SMS CTA

## Problem
The current `onClick` fires `gtag` but the browser immediately navigates to the `sms:` link, so the GA beacon likely never completes.

## Change (`src/components/NewHero.tsx`, lines 36-40)

Replace the current `onClick` with one that prevents the default navigation, fires the GA event with category/label metadata, then redirects after a 150ms delay:

```tsx
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
```

Single file, single edit. GA will now reliably capture the event before the SMS app opens.

