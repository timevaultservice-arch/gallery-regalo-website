import type { OrderInput } from '../commerce/types';

/**
 * Bank of Georgia e-commerce gateway — server-side stub.
 *
 * Real integration (outline):
 *   1. POST https://oauth2.bog.ge/auth/realms/bog/protocol/openid-connect/token
 *      with grant_type=client_credentials + BOG_CLIENT_ID / BOG_CLIENT_SECRET
 *      → access_token
 *   2. POST https://api.bog.ge/payments/v1/ecommerce/orders
 *      with { callback_url, external_order_id, purchase_units, redirect_urls }
 *      → _links.redirect.href
 *   3. Redirect the user to _links.redirect.href
 *   4. BOG posts to BOG_CALLBACK_URL when the payment settles — update order status there.
 *
 * Docs: https://api.bog.ge/docs/payments/ecommerce
 *
 * This stub returns a fake redirect URL so the UI flow is testable end-to-end.
 */
export async function createBogPayment(order: OrderInput, amountGel: number): Promise<{ redirectUrl: string; externalOrderId: string }> {
  const hasCreds = !!(process.env.BOG_CLIENT_ID && process.env.BOG_CLIENT_SECRET);
  if (!hasCreds) {
    // Stub mode — echo a synthetic redirect so the checkout flow remains testable.
    const externalOrderId = `stub_bog_${Date.now()}`;
    return {
      redirectUrl: `/checkout/success?ref=${externalOrderId}`,
      externalOrderId
    };
  }

  // --- Real integration goes here ---
  //
  // const token = await fetch('https://oauth2.bog.ge/.../token', { ... }).then(r => r.json());
  // const res = await fetch('https://api.bog.ge/payments/v1/ecommerce/orders', {
  //   method: 'POST',
  //   headers: { Authorization: `Bearer ${token.access_token}`, 'Content-Type': 'application/json' },
  //   body: JSON.stringify({
  //     callback_url: process.env.BOG_CALLBACK_URL,
  //     external_order_id: externalOrderId,
  //     purchase_units: { currency: 'GEL', total_amount: amountGel },
  //     redirect_urls: { success: process.env.BOG_RETURN_URL, fail: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout` }
  //   })
  // }).then(r => r.json());
  // return { redirectUrl: res._links.redirect.href, externalOrderId: res.order_id };
  //
  // Keep order details (order, amountGel) — write them to your Medusa backend or DB here.
  void order;
  void amountGel;
  throw new Error('BOG live integration not yet implemented.');
}

export async function verifyBogCallback(payload: unknown): Promise<{ externalOrderId: string; status: 'paid' | 'failed' | 'pending' }> {
  void payload;
  throw new Error('BOG callback verification not yet implemented.');
}
