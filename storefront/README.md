# Gallery Regalo — Storefront

Premium, bilingual (ქართული / English) storefront for Gallery Regalo.

Next.js 15 (App Router) · Tailwind · Framer Motion · next-intl · Zustand.

## Quick start

```bash
cd storefront
npm install
cp .env.example .env.local
npm run dev
```

Then open http://localhost:3000 — it redirects to `/ka` (default locale). Append `/en` for English.

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint (Next.js + TypeScript rules) |
| `npm run typecheck` | TypeScript strict check |

## Data mode

The storefront runs off an in-memory `mockAdapter` by default — no backend needed to see the UI. When `NEXT_PUBLIC_MEDUSA_URL` is set, it switches to the Medusa adapter (see `src/lib/commerce/`). Until the Medusa integration is filled in, leave `NEXT_PUBLIC_MEDUSA_URL` unset.

## What's wired

- **Home, Shop, Product detail, Sale, Cart, Checkout, Success, Sign-in, Account, About, Contact** — all 11 routes.
- **Bilingual UI**: `/ka` (default) and `/en` via `next-intl`. Both JSONs live in `messages/`.
- **Cart** with Zustand persistence (survives refresh).
- **Cart drawer** and **mobile nav** with framer-motion transitions.
- **Filter bar**: category, on-sale toggle, sort. `/sale` is just `shop` with `onSaleOnly` forced on.
- **Checkout** collects delivery details and posts to `/api/payments/{bog|tbc}`. Without real bank credentials, the API returns a synthetic redirect so the whole flow is testable end-to-end.
- **Magic-link sign-in**: POST `/api/auth/magic-link` issues a signed token; in dev the link is printed to the server console.

## What needs real credentials

1. **Bank of Georgia** and **TBC Bank** e-commerce keys. Drop into `.env.local` — the stubs in `src/lib/payments/` already show the exact real-integration call shapes.
2. **SMTP / email** for magic links (`EMAIL_SMTP_URL`, `EMAIL_FROM`).
3. A **domain** — site URL and payment return/callback URLs must point to the real origin in production.

See `../docs/PAYMENTS.md` for integration notes.
