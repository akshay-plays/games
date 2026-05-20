# Akshay Gaming Website

A wildly animated, hilarious, mobile-first personal gaming website for Akshay Yadav — a Free Fire legend with infinite rage, zero chill, and a legendary fear of his mother.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite + Tailwind CSS + Framer Motion
- Fonts: Press Start 2P (display), Outfit (body)
- No backend needed — pure frontend site

## Where things live

- `artifacts/akshay-gaming/src/pages/Home.tsx` — main page with all sections
- `artifacts/akshay-gaming/src/components/` — all section components
  - `LoadingScreen.tsx` — "Booting Akshay.exe..." boot sequence
  - `Hero.tsx` — hero with rage meter and explosions
  - `About.tsx` — fact cards with confetti on sweets
  - `Interactive.tsx` — rage button, mother alert mode, XP bars, schedule
  - `FunnyStats.tsx` — anger levels, weapons, fear chart
  - `Achievements.tsx` — funny trophy cards
  - `BackgroundEffects.tsx` — floating emojis + custom cursor

## Product

A mobile-first, single-page personal gaming profile website. Features:
- Animated loading screen (gaming boot sequence)
- Hero section with rage meter + explosions
- About section with funny animated fact cards
- RAGE BUTTON that shakes the whole screen
- MOTHER ALERT MODE (transforms site to "studying" mode)
- Gaming stats with animated XP bars
- Daily schedule timeline
- Anger levels bar chart
- Top weapons with stats
- Future surgeon / dream games sections
- Fear level analysis (mom = 100%)
- Achievements/trophies section
- Floating emoji background + custom cursor glow

## User preferences

- Mobile-first approach
- Intended for publishing on Git (GitHub Pages / Netlify)

## Gotchas

- Site is always dark mode — no light mode toggle
- CSS vars use space-separated HSL format (not hsl() wrapper)
- Google Fonts @import must be the very FIRST line in index.css
