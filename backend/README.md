# Gallery Regalo — Commerce Backend (Medusa v2)

This folder will hold the Medusa v2 server — catalog, orders, inventory, admin UI, and the BOG/TBC payment providers.

We deliberately do **not** commit a pre-scaffolded Medusa app — Medusa's `create-medusa-app` CLI is the canonical way to produce a fresh, up-to-date project tied to the current release.

## Bootstrap

From the `backend/` folder:

```bash
npx create-medusa-app@latest .
# when prompted: yes to seed demo data, no to Next.js starter (we already have our own storefront)
```

This creates the standard Medusa layout:

```
backend/
├── medusa-config.ts
├── src/
│   ├── admin/
│   ├── api/
│   ├── modules/
│   └── subscribers/
├── package.json
└── ...
```

Then:

```bash
createdb regalo_medusa          # or point to managed Postgres
cp .env.template .env
#   DATABASE_URL=postgres://...
#   REDIS_URL=redis://localhost:6379
#   JWT_SECRET=...
#   COOKIE_SECRET=...
npx medusa db:setup
npx medusa user --email owner@galleryregalo.ge --password <strong>
npm run dev        # starts API on :9000, admin on :9000/app
```

## Payment providers

Two Medusa payment provider modules to write — place in `backend/src/modules/payment-{bog,tbc}/`:

| File | Purpose |
|---|---|
| `service.ts` | Implements `AbstractPaymentProvider` — `initiatePayment`, `authorizePayment`, `capturePayment`, `refundPayment`, `cancelPayment`, `retrievePayment`, `updatePayment`, `getPaymentStatus`, `getWebhookActionAndData` |
| `index.ts` | Module loader, export provider |

Mirror the call shapes already documented in the storefront stubs at `../storefront/src/lib/payments/{bog,tbc}.ts`. Once these modules are live, delete the stub stubs from the storefront and replace with a thin client call to the Medusa Store API `store/carts/{id}/payment-sessions`.

## Linking the storefront

Once Medusa is running:

```bash
# in storefront/.env.local
NEXT_PUBLIC_MEDUSA_URL=http://localhost:9000
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_...
```

Then fill in `src/lib/commerce/medusa.ts` — it's currently a stub that throws. Map Medusa's product shape into the local `Product` type in `src/lib/commerce/types.ts`.

## Hosting

Recommended: **Railway** or **Render** — both have one-click Medusa + Postgres + Redis setups. Or run on any VPS with Docker. Storefront stays on Vercel.

## File structure this folder will hold once bootstrapped

- `medusa-config.ts` — backend-wide config (modules, plugins, CORS)
- `src/modules/payment-bog/` — BOG payment provider
- `src/modules/payment-tbc/` — TBC payment provider
- `src/api/` — any custom endpoints beyond the default Medusa Store/Admin APIs
- `src/admin/` — any custom admin widgets for the owner's day-to-day workflow
