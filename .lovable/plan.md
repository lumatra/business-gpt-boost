

# Simplify CTA — Remove Extra Lines

## What changes
In `src/components/NewHero.tsx`, remove the two extra lines from the CTA box (lines 62-63):
- Remove `⚡ Replies in seconds`
- Remove `⬇️ Tap here to try it` (the bouncing arrow)

## Result — CTA becomes exactly:
```
TEXT THIS NOW — SEE IT REPLY
07401 271927
Tap → message opens → just press send
No signup. No app. Just try it.
```

Four lines. Zero confusion. Nothing else competing for attention inside the box.

## What stays the same
- Phone number size (`text-6xl md:text-7xl font-extrabold`)
- SMS link with GA tracking
- Desktop copy button (outside the box)
- Chat preview on desktop

## Technical detail
Two lines deleted from the `<a>` tag in `src/components/NewHero.tsx` (lines 62-63).

