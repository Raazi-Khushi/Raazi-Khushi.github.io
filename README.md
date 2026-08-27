# Raazi Khushi — Landing Page

Next.js 16 (App Router) + Tailwind CSS v4 implementation of the Raazi Khushi
landing page, built from Figma file `o7nPjwbkB5CSuYL20ZrmGw`.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Scripts

| Command         | What it does                     |
| --------------- | -------------------------------- |
| `npm run dev`   | Dev server                       |
| `npm run build` | Production build                 |
| `npm run start` | Serve the production build       |
| `npm run lint`  | ESLint                           |

## The audience toggle

The header toggle switches the page between two Figma states:

- **Getting Married** — deep-teal hero card on a pale page, copy left, photo right.
- **Parent** — pale hero band on a white page, photo left, copy right.

Copy for both states lives in `src/lib/content.ts` (`HERO_COPY`), keyed by audience.

## Waitlist form

`POST /api/waitlist` validates the payload and logs it. Persistence is not wired
up yet — see the `TODO` in `src/app/api/waitlist/route.ts`.

## Design tokens

Figma variables are declared as Tailwind theme tokens in `src/app/globals.css`:

| Token             | Value     |
| ----------------- | --------- |
| `deep-teal`       | `#1b4d5c` |
| `teal-light`      | `#2a6a7d` |
| `gold`            | `#d4af37` |
| `muted`           | `#7a8a94` |
| `pale`            | `#e8f4f8` |
| `ink`             | `#0b3c4b` |
| `step`            | `#c6dde4` |
| `field`           | `#fbfbfb` |
