

# Brutally Obvious CTA — Final Tweaks

## Summary
Apply all feedback: strip distractions, rewrite CTA copy for maximum urgency, make number the dominant visual element, add reassurance and urgency lines.

## Changes to `src/components/NewHero.tsx`

### 1. Remove distractions from above the fold
- Remove "Trusted by UK businesses" badge (lines 32-35)
- Remove video button (lines 80-85) — video dialog stays, trigger moves below fold or is accessed elsewhere

### 2. Rewrite CTA box content (lines 62-76)
New structure inside the `<a>` tag:

```
TEXT THIS NOW — SEE IT REPLY        ← uppercase, bold, tracking-wide
07401 271927                        ← text-6xl md:text-7xl, biggest element on page
Tap → message opens → just press send
No signup. No app. Just try it.
⚡ Replies in seconds
⬇️ Tap here to try it
```

### 3. Make phone number visually dominant
- Bump to `text-6xl md:text-7xl font-extrabold text-primary` — largest element on the entire page
- Give it its own line, centered on mobile
- Remove the "Text:" prefix label — the number speaks for itself

### 4. Move copy button outside the `<a>` tag
- Prevents any click interception on the SMS link
- Desktop only (`hidden lg:flex`), sits below the CTA box

### 5. Consolidate helper text
- Move "Opens your messages — just press send" (line 78) inside the box as the instruction line
- Remove the separate `<p>` outside

### What stays the same
- Mobile tap opens SMS with pre-filled message — unchanged
- GA tracking with 150ms delay — unchanged
- Desktop chat preview (right column) — unchanged
- Headline and subheadline — unchanged

