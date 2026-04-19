import type { OrderInput } from '../commerce/types';

/**
 * TBC Bank e-commerce gateway — server-side stub.
 *
 * Real integration (outline):
 *   1. POST https://api.tbcbank.ge/v1/tpay/access-token
 *      with apikey=TBC_API_KEY + client credentials → access_token
 *   2. POST https://api.tbcbank.ge/v1/tpay/payments
 *      with { amount, returnurl, extra, merchantPaymentId }
 *      → payId + links[rel="approval_url"].uri
 *   3. Redirect user to approval_url
 *   4. TBC notifies TBC_CALLBACK_URL on settlement — update order status.
 *
 * Docs: https://developers.tbcbank.ge/docs/checkout
 *
 * This stub returns a fake redirect URL so the UI flow is testable end-to-end.
 */
export async function createTbcPayment(order: OrderInput, amountGel: number): Promise<{ redirectUrl: string; externalOrderId: string }> {
  const hasCreds = !!(process.env.TBC_API_KEY && process.env.TBC_MERCHANT_ID);
  if (!hasCreds) {
    const externalOrderId = `stub_tbc_${Date.now()}`;
    return {
      redirectUrl: `/checkout/success?ref=${externalOrderId}`,
      externalOrderId
    };
  }

  // --- Real integration goes here ---
  //
  // const token = await fetch('https://api.tbcbank.ge/v1/tpay/access-token', {
  //   method: 'POST',
  //   headers: { apikey: process.env.TBC_API_KEY!, 'Content-Type': 'application/x-www-form-urlencoded' },
  //   body: new URLSearchParams({ grant_type: 'client_credentials' })
  // }).then(r => r.json());
  // const payment = await fetch('https://api.tbcbank.ge/v1/tpay/payments', {
  //   method: 'POST',
  //   headers: {
  //     apikey: process.env.TBC_API_KEY!,
  //     Authorization: `Bearer ${token.access_token}`,
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify({
  //     amount: { currency: 'GEL', total: amountGel },
  //     returnurl: process.env.TBC_RETURN_URL,
  //     merchantPaymentId: externalOrderId,
  //     extra: order.notes
  //   })
  // }).then(r => r.json());
  // const approval = payment.links.find((l: { rel: string; uri: string }) => l.rel === 'approval_url');
  // return { redirectUrl: approval.uri, externalOrderId: payment.payId };
  void order;
  void amountGel;
  throw new Error('TBC live integration not yet implemented.');
}

export async function verifyTbcCallback(payload: unknown): Promise<{ externalOrderId: string; status: 'paid' | 'failed' | 'pending' }> {
  void payload;
  throw new Error('TBC callback verification not yet implemented.');
}
