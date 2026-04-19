# Deployment

## Storefront → Vercel

1. Push `storefront/` to a GitHub repo (or this folder as root).
2. `vercel link` → connect the GitHub project.
3. **Root directory**: `storefront`
4. **Environment variables** — copy every key from `storefront/.env.example` and fill:
   - `NEXT_PUBLIC_SITE_URL` = `https://galleryregalo.ge` (once domain is purchased)
   - `BOG_*`, `TBC_*` — real credentials from each bank
   - `NEXT_PUBLIC_MEDUSA_URL` + `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` — once backend is deployed
   - `AUTH_SECRET` — 32-byte random hex
   - `EMAIL_SMTP_URL`, `EMAIL_FROM` — SMTP provider (Resend, SendGrid, Mailgun, etc.)
5. Deploy.
6. Add the custom domain. Vercel will issue the SSL cert automatically.

## Backend → Railway or Render

1. `cd backend && npx create-medusa-app@latest .` (see `backend/README.md`).
2. Deploy to Railway:
   - New project → deploy from `backend/` folder.
   - Add Postgres + Redis add-ons.
   - Environment: `DATABASE_URL`, `REDIS_URL`, `JWT_SECRET`, `COOKIE_SECRET`, `STORE_CORS=https://galleryregalo.ge`, `ADMIN_CORS=https://admin.galleryregalo.ge`.
3. Run first-time setup through Railway's shell: `npx medusa db:setup && npx medusa user ...`.
4. Create a publishable API key in the admin UI → paste into Vercel as `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY`.

## Domain

Once `galleryregalo.ge` is purchased:
1. Point apex + `www` to Vercel (A/CNAME records Vercel specifies).
2. Optionally point `admin.galleryregalo.ge` to the Medusa instance (Railway gives you the target CNAME).
3. Update all `*_RETURN_URL` / `*_CALLBACK_URL` env vars in Vercel to use the real domain.
4. Re-submit the domain to BOG + TBC for sandbox → live credential switch.

## Pre-launch checklist

- [ ] Real bank credentials set in Vercel (live, not sandbox)
- [ ] BOG + TBC callback URLs registered with each bank
- [ ] SMTP for magic-link emails wired
- [ ] Owner has a Medusa admin account and can upload a test product
- [ ] Run one real test transaction through each bank
- [ ] Refund a test transaction to verify the reverse flow
- [ ] Product photos loaded and appear on white background per the shop standard
- [ ] `robots.txt` + basic OG meta sanity-check
- [ ] Analytics tag installed (Plausible / Google Analytics — decide)
