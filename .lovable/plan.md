

# Make Helpzz Description Section Stand Out

## Current State
The Helpzz description paragraph (lines 63-65) is just plain text on the page, making it blend in with the rest of the content.

## Plan
Wrap the description in a styled container with a light background tint and subtle styling to make it more visible and distinct from the surrounding content.

### Changes to `src/components/NewHero.tsx`
- Wrap the Helpzz description paragraph in a `div` with:
  - `bg-muted/50` — light background tint
  - `rounded-lg` — soft rounded corners
  - `p-4` — comfortable padding
  - `border border-border/50` — subtle border
  - `mt-4 max-w-md` — keep spacing and width constraints

This creates a subtle "card" effect that draws attention without being overwhelming.

