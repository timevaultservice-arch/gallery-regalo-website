# Gallery Regalo — Architecture

## Two-service layout

```
┌──────────────────────────┐              ┌──────────────────────────┐
│       STOREFRONT         │              │         BACKEND          │
│  Next.js 15 (App Router) │              │     Medusa v2 (Node)     │
│        Vercel            │ ───────────▶ │   Railway / Render       │
│                          │  Store API   │                          │
│  · bilingual ka / en     │              │  · Postgres + Redis      │
│  · Framer Motion         │              │  · admin UI (/app)       │
│  · Zustand cart          │              │  · BOG / TBC providers   │
│  · hosted payment pages  │◀──────────── │  · webhooks / callbacks  │
└──────────────────────────┘              └──────────────────────────┘
         ▲                                             ▲
         │ redirect                                    │ settlement
         │                                             │ callback
         │       ┌─────────────────────────────┐       │
         └────── │  Bank of Georgia / TBC Bank │ ──────┘
                 │  hosted payment pages       │
                 └─────────────────────────────┘
```

## Why this split

- **Design freedom** — premium, animated storefront needs full front-end control that hosted ecommerce platforms restrict.
- **Security** — card data never touches our infrastructure; it goes straight to BOG/TBC hosted pages. We only store order references and statuses.
- **Owner UX** — Medusa ships a real admin UI for uploading products, managing orders, running sales, and handling inventory. No bespoke admin to build.
- **Scale fit** — one small instance of Medusa handles a single shop comfortably; storefront scales on Vercel's edge automatically.

## Data flow (checkout)

1. User fills `/checkout` form → storefront POSTs to `/api/payments/{bog|tbc}` with cart lines and delivery details.
2. Route handler computes amount, creates a Medusa order (pending), and calls the selected bank's payment provider (BOG or TBC).
3. Bank returns a redirect URL for their hosted page.
4. User is redirected → enters card details on the bank's page → bank processes payment.
5. Bank calls our `/api/payments/{bog|tbc}/callback` with the settlement result.
6. Callback handler verifies the signature, flips the Medusa order to `paid` or `failed`, triggers the confirmation email.
7. User lands on `/checkout/success`.

## Module map

| Path | Purpose |
|---|---|
| `storefront/src/app/[locale]/` | All public pages, bilingual |
| `storefront/src/app/api/` | Payment + auth endpoints called by the browser |
| `storefront/src/lib/commerce/` | Data adapter: `mock` today, `medusa` once backend ships |
| `storefront/src/lib/payments/` | Bank gateway client code (BOG, TBC) |
| `storefront/src/lib/auth/` | Magic-link issuance |
| `storefront/src/lib/store/` | Zustand client-side cart store |
| `storefront/src/components/` | UI components (nav, cart drawer, product cards, motion primitives) |
| `storefront/messages/` | `en.json`, `ka.json` copy |
| `backend/` | Medusa scaffold, bootstrap via `npx create-medusa-app` |

## Custom sales

"Sale" is a first-class concept in two places:

- **Product schema** carries `onSale: boolean` and optional `comparePriceGel`. These render as a "Sale" badge and a strikethrough price everywhere a product appears.
- **Filter** — every filter bar has an `onSaleOnly` toggle. The `/sale` route hardcodes this filter on and becomes the canonical "on sale now" page, linked from the home hero, the always-visible top sale strip (marquee), and the main nav.

When Medusa is live, map Medusa's **promotions** engine to set `onSale = true` for any product inside an active promotion, so the owner manages sales entirely from the Medusa admin.

## Inventory

Pooled (single online inventory), per the project decisions. In Medusa that's a single `stock_location` named "Online". Per-outlet stock is not modelled.
