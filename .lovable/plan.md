

# Make CTA Box Tappable with SMS Link + Analytics Tracking

## What changes

### `src/components/NewHero.tsx`

1. **Wrap the entire CTA box in an `<a>` tag on mobile** — the `<div>` with the border/shadow becomes a clickable link:
   - `href="sms:07401271927?body=How%20much%20for%20a%20call%20out%3F"` (URL-encoded body)
   - Styled with `text-decoration: none; color: inherit;` so it doesn't look like a blue link
   - On desktop (lg+), the link still works but the box isn't visually different

2. **Phone number also individually linked** — the `07401 271927` text gets wrapped in the same `sms:` link with matching invisible styling, so desktop users can click just the number too.

3. **GA event tracking** — add an `onClick` handler that fires `gtag('event', 'sms_click')` when the box/number is tapped. This will show up in Google Analytics under Events as `sms_click`.

### Technical details
- Use `<a>` tag wrapping the CTA `<div>`, with classes `no-underline text-inherit block`
- The `onClick` handler calls `window.gtag('event', 'sms_click')` with a type guard check
- URL-encoded SMS body ensures cross-device compatibility (spaces as `%20`, `?` as `%3F`)

