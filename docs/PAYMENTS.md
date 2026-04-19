# Payments — BOG & TBC integration

## Principle

**We never see or store card data.** The customer enters card details on the bank's hosted page; we only receive a redirect URL to send them to and a callback with the settlement result.

## Status

| Gateway | Status |
|---|---|
| Bank of Georgia (BOG) | Client stub in `storefront/src/lib/payments/bog.ts` — returns synthetic redirect so the UI flow is testable end-to-end. Real integration code is commented inline; needs `BOG_CLIENT_ID` + `BOG_CLIENT_SECRET`. |
| TBC Bank | Client stub in `storefront/src/lib/payments/tbc.ts` — same shape. Needs `TBC_API_KEY` + `TBC_MERCHANT_ID`. |

## Bank of Georgia flow (live)

1. **Auth** — `POST https://oauth2.bog.ge/auth/realms/bog/protocol/openid-connect/token`
   body: `grant_type=client_credentials`
   headers: `Authorization: Basic base64(BOG_CLIENT_ID:BOG_CLIENT_SECRET)`
   → `{ access_token }`
2. **Create order** — `POST https://api.bog.ge/payments/v1/ecommerce/orders`
   ```json
   {
     "callback_url": "https://galleryregalo.ge/api/payments/bog/callback",
     "external_order_id": "<our order id>",
     "purchase_units": { "currency": "GEL", "total_amount": 480.00 },
     "redirect_urls": {
       "success": "https://galleryregalo.ge/<locale>/checkout/success",
       "fail":    "https://galleryregalo.ge/<locale>/checkout"
     }
   }
   ```
   → `{ id, _links: { redirect: { href } } }`
3. **Redirect** user browser to `_links.redirect.href`.
4. **Callback** — BOG POSTs settlement details to `callback_url`. Verify the `Callback-Signature` header against BOG's RSA public key, then update the order.

Docs: https://api.bog.ge/docs/payments/ecommerce

## TBC Bank flow (live)

1. **Auth** — `POST https://api.tbcbank.ge/v1/tpay/access-token`
   headers: `apikey: TBC_API_KEY`
   body: `grant_type=client_credentials`
   → `{ access_token }`
2. **Create payment** — `POST https://api.tbcbank.ge/v1/tpay/payments`
   ```json
   {
     "amount": { "currency": "GEL", "total": 480.00 },
     "returnurl": "https://galleryregalo.ge/<locale>/checkout/success",
     "merchantPaymentId": "<our order id>"
   }
   ```
   → `{ payId, links: [{ rel: "approval_url", uri }] }`
3. **Redirect** user browser to `approval_url`.
4. **Callback** — TBC notifies the configured callback URL on settlement. Verify the JWT callback token against TBC's JWKS, then update the order.

Docs: https://developers.tbcbank.ge/docs/checkout

## Environment variables

Storefront `.env.local` (copy from `.env.example`):

```
BOG_CLIENT_ID=
BOG_CLIENT_SECRET=
BOG_RETURN_URL=https://galleryregalo.ge/ka/checkout/success
BOG_CALLBACK_URL=https://galleryregalo.ge/api/payments/bog/callback

TBC_API_KEY=
TBC_MERCHANT_ID=
TBC_RETURN_URL=https://galleryregalo.ge/ka/checkout/success
TBC_CALLBACK_URL=https://galleryregalo.ge/api/payments/tbc/callback
```

## Moving integration into Medusa

The current code runs the bank calls from the Next.js API route for speed of iteration. Once the Medusa backend ships, migrate each bank into a proper Medusa `AbstractPaymentProvider` under `backend/src/modules/payment-{bog|tbc}/` (see `backend/README.md`). The storefront then only calls the Medusa Store API (`POST /store/carts/{id}/payment-sessions`) and receives back a `redirect_url` — no direct bank calls from the storefront.

## Getting credentials

- **BOG** — your friend's Business Banking relationship manager issues `client_id`/`client_secret`. Ask for the e-commerce gateway product specifically.
- **TBC** — apply at https://developers.tbcbank.ge and link to the shop's merchant account.

Both banks require:
1. A registered legal entity with a business account at the bank.
2. A domain with HTTPS (for return/callback URLs).
3. A short review of the site before switching from sandbox to live credentials.
