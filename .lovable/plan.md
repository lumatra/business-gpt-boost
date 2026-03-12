

# Hero Section Updates

## Changes to `src/components/NewHero.tsx`

### 1. Make chat preview heading more prominent
Change line 64 from `text-lg font-semibold text-foreground` to `text-xl font-bold text-foreground` for darker/bolder styling.

### 2. Add subtitle below "Never Miss Another Customer"
Replace the current subtitle (line 28-30) with:
> "An AI assistant that replies to customer enquiries while you're on the job."

### 3. Add feature bullets below the video link
After the "Watch Helpzz capture..." button (line 54-59), add a compact horizontal row of trust signals:
- Built for UK trades
- Works with SMS & WhatsApp  
- Setup in 10 minutes
- Cancel anytime

This replaces the current "✓ Cancel anytime ✓ Setup in 10 minutes" line (line 51-53) since the new bullets cover the same info.

### 4. Tighten spacing to fit on one screen
- Reduce margins (`mt-6` → `mt-4` on buttons, `mt-4` → `mt-3` on trust line, `mb-4` → `mb-3` on badge)
- Reduce chat bubble padding (`p-3` → `p-2.5`, `space-y-3` → `space-y-2`)
- Use smaller text on feature bullets (`text-xs`)

All changes in a single file: `src/components/NewHero.tsx`.

