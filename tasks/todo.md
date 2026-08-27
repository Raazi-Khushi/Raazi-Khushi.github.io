# Raazi Khushi — Landing Page

Source of truth: Figma `o7nPjwbkB5CSuYL20ZrmGw`
- DWEB (Getting Married state): node `135:733`
- DWEB variation (Parent state): node `135:790`
- MWEB: node `355:5480`

## Plan

- [x] Pull design context, metadata and variables from all three Figma nodes
- [x] Confirm toggle mapping with the user — dark hero = Getting Married, light hero = Parent
- [x] Scaffold Next.js 16 (App Router, TypeScript, Tailwind v4)
- [x] Download photos and icons from Figma into `public/`
- [x] Map Figma variables to Tailwind theme tokens in `globals.css`
- [x] Build shared primitives (CTA button, eyebrow pill, icon circle, audience toggle)
- [x] Build header with desktop nav and mobile hamburger menu
- [x] Build hero with both toggle treatments
- [x] Build How It Works, Trust bar, Waitlist form, Footer
- [x] Wire the waitlist form to a validating API route
- [x] Verify against Figma at 1440px and 440px, both toggle states
- [x] `npm run lint` and `npm run build` clean

## Review

**Structure**

```
src/app/layout.tsx            fonts (Poppins, Noto Sans) + metadata
src/app/globals.css           Figma variables as Tailwind theme tokens
src/app/page.tsx              holds the audience state, composes sections
src/app/api/waitlist/route.ts validates + logs signups (no datastore yet)
src/components/               hero, how-it-works, trust-bar, waitlist, footer, header, toggle
src/components/ui/            cta-button, eyebrow-pill, icon-circle
src/lib/content.ts            all copy and section data
public/images, public/icons   assets exported from Figma
```

**Design decisions**

- The audience toggle drives the hero treatment and the page background, matching
  the two Figma frames: `married` renders the deep-teal hero card on a pale page,
  `parent` renders the pale hero band with the photo leading on a white page.
- Copy is identical between both states in Figma, so `HERO_COPY` is keyed by
  audience with the same strings — the wording can diverge without layout changes.
- "How It Work" pill is white on the pale page and pale on the white page so it
  stays visible in both states. Step cards carry a soft shadow for the same reason.
- The form's "Main hoon" choice is seeded from the header toggle and sticks once
  the user picks by hand. Figma shows both pills unselected.
- Mobile has no Parent variation frame in Figma; the same variant rules are applied
  at the mobile breakpoint.
- The mobile trust bar scrolls horizontally — the Figma row is 1124px wide inside a
  440px frame.
- The iOS status bar in the mobile frame is Figma mockup chrome and is not built.

**Verified**

- `npm run lint` — clean
- `npm run build` — compiles, 3 routes
- Desktop 1440px, both toggle states, screenshot-compared against the Figma frames
- Mobile 440px, hamburger menu opens
- Waitlist form submits end to end and renders the success state
