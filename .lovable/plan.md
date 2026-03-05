

## Update All Email Addresses to info@helpzz.co.uk

Two files need changes:

1. **src/components/SignupSection.tsx** (line 32) -- Change `helpzz@lumatra.net` (both the mailto link and display text) to `info@helpzz.co.uk`

2. **supabase/functions/send-contact-email/index.ts** (line 34) -- Change the recipient `helpzz@lumatra.net` to `info@helpzz.co.uk`

The ContactSection.tsx already uses `info@helpzz.co.uk`, so no change needed there. The signup email function sends to `signup@helpzz.co.uk` which is a separate address and will remain unchanged.

