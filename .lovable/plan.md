

# Fix Wasted Space in Hero Section

## The Problem
Two things are causing excess empty space between the nav bar and the hero content:

1. **Oversized navigation bar**: The logo is `h-20` on mobile / `h-16` on md / `h-14` on lg, plus `py-4` padding — this makes the nav bar ~90-100px tall, but the hero only accounts for 64px (`pt-16`).
2. **Vertical centering in full viewport**: The hero uses `min-h-screen flex items-center`, which centers content in the full viewport. But because the nav overlaps the top, the visual center sits too low, creating a large gap between the nav and the content.

## The Fix

### 1. Reduce nav bar height (`Navigation.tsx`)
- Shrink logo: `h-20 md:h-16 lg:h-14` → `h-12 md:h-10 lg:h-10`
- Reduce padding: `py-4` → `py-2`
- This brings the nav to ~56px total

### 2. Adjust hero vertical positioning (`NewHero.tsx`)
- Change `pt-16` → `pt-14` to match the slimmer nav
- Make text sizes slightly larger now that there's more room: bump h1 back up, increase subtitle text
- Increase chat bubble text from base to slightly larger for readability

This keeps everything fitting on one screen while using the space more effectively — less gap at the top, more room for content.

## Files
- `src/components/Navigation.tsx` — smaller logo, less padding
- `src/components/NewHero.tsx` — adjusted top padding, slightly larger content text

