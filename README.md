# Gallery Regalo — Website

Monorepo for **Gallery Regalo** — a premium, bilingual (ქართული / English) ecommerce site for the Batumi & Tbilisi gift gallery.

## Structure

```
regalo-store-website/
├── storefront/        Next.js 15 customer-facing site (Vercel)
├── backend/           Medusa v2 commerce backend (Railway/Render) — bootstrap per backend/README.md
├── docs/              Architecture, payments, deployment notes
└── assets/            Raw inputs: logo, brand, product photography
```

## Get running in 3 minutes

```bash
cd storefront
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000 — redirects to `/ka` by default. Full storefront runs off mock data; no backend required to preview the UI.

## Project hub (decisions, status, requirements)

The canonical project hub lives in the Obsidian vault: `Vault/01 Projects/Marketing/Regalo Store Website.md`. This repo is the implementation; the vault note is the single source of truth for scope, decisions, and status.

## Status

- ✅ Storefront: 11 pages built, bilingual, cart + checkout + magic-link sign-in wired, black/white premium design with Framer Motion animations throughout.
- ✅ Payment integration points: BOG + TBC stubs return synthetic redirects; real integration shapes documented inline — swap the stub bodies when credentials arrive.
- 🔜 Medusa backend: folder + setup README in place; bootstrap via `npx create-medusa-app` when ready to leave mock data.
- 🔜 Live bank credentials, domain, SMTP, owner-supplied product photos.

See `docs/` for details.
