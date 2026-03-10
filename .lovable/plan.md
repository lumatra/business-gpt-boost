

## Plan: Add "What happens next" steps below pricing card

Add a 3-step horizontal timeline/grid below the existing pricing card content (after the "pays for itself" text) showing the onboarding process.

### Changes

**`src/components/PricingSection.tsx`**

Insert a new block after line 73 (after the closing `</div>` of the "pays for itself" section), before the section's closing tags. It will be a 3-column grid with:

1. **Book your setup call** — "We learn about your business"
2. **We configure your assistants** — "Pricing, services, and service area"
3. **You're live the same day** — "Helpzz starts capturing enquiries"

Each step will have a numbered emoji, bold title, and description underneath. Centered heading "What happens next" above the grid. Styled consistently with the existing section using `text-foreground` and `text-muted-foreground`.

