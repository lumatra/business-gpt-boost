

# Boost Hero Engagement — Clean, Practical Approach

## Problem
Visitors leave after 5 seconds. The "Try it now" phone number box doesn't stand out enough and there's too much content competing for attention above the fold.

## Plan

### 1. Increase headline spacing (`src/components/NewHero.tsx`)
- Increase gaps between headline, subtitle, and CTA (`mt-3` → `mt-5`/`mt-6`) so the eye flows naturally

### 2. Make the "Try it now" box more prominent (`src/components/NewHero.tsx`)
- Stronger border: `border-2 border-primary`
- Tinted background: `bg-primary/10`
- Larger shadow: `shadow-lg shadow-primary/20`
- Increase phone number size
- No animations — keep it clean and solid

### 3. Simplify above-the-fold content (`src/components/NewHero.tsx`)
- Remove the pricing line and the description card ("Helpzz is an AI assistant...") from the hero section — move them below the fold or remove entirely
- Remove or shrink the trust signals row — these matter after interest, not before
- Hero becomes: **Headline → Subtitle → CTA Box → Video link**. Nothing else competing in the first 5 seconds.

