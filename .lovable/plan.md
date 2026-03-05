

## Add Cookie Consent Banner

Create a new `CookieConsent` component that:
- Shows a fixed banner at the bottom of the screen
- Displays: "We use analytics tools to understand how visitors use our website so we can improve the service."
- Has "Accept" and "Reject" buttons
- Stores the user's choice in `localStorage` so it only shows once
- If rejected, disables Google Analytics by setting `window['ga-disable-G-R9JS1XFHGY'] = true`
- Links to the `/cookies` policy page

**Files:**
1. **New: `src/components/CookieConsent.tsx`** — Banner component with accept/reject logic and localStorage persistence
2. **Edit: `src/App.tsx`** — Add `<CookieConsent />` inside the BrowserRouter

