

# Full-Screen Slide Sections

## Overview
Convert each section on the Index page into a full-viewport-height "slide" that fills exactly one screen. Users scroll section-by-section. Navigation dots on the side will indicate position.

## Approach

### 1. Each section gets `h-screen` + `overflow-hidden`
Every section component (NewHero, ProblemSection, SolutionSection, VideoSection, PricingSection, SignupSection, ContactSection) will be wrapped to fill exactly `100vh` with content centered vertically. This means:

- Add `min-h-screen flex flex-col justify-center` to each section's outermost element
- Remove fixed `py-XX` padding, replace with auto-centering
- Content that's too tall will need tightened spacing (especially SolutionSection which has assistants + how-it-works steps)

### 2. Section-specific adjustments

- **NewHero**: Already large; replace `pt-32 pb-24` with `min-h-screen flex items-center`, keep `pt-20` for nav clearance
- **ProblemSection**: Compact — fits easily. Switch `py-20` to `min-h-screen flex flex-col justify-center`
- **SolutionSection**: This is the largest section (assistants grid + how-it-works). Will need to split into two slides OR reduce spacing significantly. **Recommendation: split into two slides** — "Meet Your New Team" (assistants) and "How It Works" (3 steps)
- **VideoSection**: Simple — video + CTA. Fits one screen
- **PricingSection**: Has pricing card + "what happens next" steps. Reduce margins/spacing to fit
- **SignupSection**: Very compact — fits easily
- **ContactSection**: Very compact — fits easily

### 3. Optional: CSS scroll snapping
Add `scroll-snap-type: y mandatory` on the main container and `scroll-snap-align: start` on each section for a polished slide-by-slide scroll effect.

### 4. Footer
The Footer renders globally in App.tsx after all routes. It will be included within or after the last section so it doesn't break the slide layout. We can either merge it into ContactSection or keep it as a small bar at the bottom of the last slide.

## Files to modify
- **src/pages/Index.tsx** — Add scroll-snap container styles, split SolutionSection import into two
- **src/components/NewHero.tsx** — `min-h-screen` + vertical centering
- **src/components/ProblemSection.tsx** — `min-h-screen` + centering
- **src/components/SolutionSection.tsx** — Split into SolutionSection (assistants) + HowItWorksSection (steps), both `min-h-screen`
- **src/components/VideoSection.tsx** — `min-h-screen` + centering
- **src/components/PricingSection.tsx** — `min-h-screen` + tighter spacing
- **src/components/SignupSection.tsx** — `min-h-screen` + centering
- **src/components/ContactSection.tsx** — `min-h-screen` + centering, include footer content
- **src/components/HowItWorksSection.tsx** — New file, extracted from SolutionSection

