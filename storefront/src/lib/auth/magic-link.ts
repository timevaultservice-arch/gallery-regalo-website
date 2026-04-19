import crypto from 'node:crypto';

/**
 * Magic-link auth — server-side stub.
 *
 * Real flow:
 *   1. Generate a signed short-lived token (HMAC over email + expiry).
 *   2. Send email via SMTP/Resend/SES with a link:
 *        https://site/{locale}/api/auth/verify?token=...
 *   3. On verify, set an httpOnly session cookie scoped to the site.
 *
 * This stub logs the link to stderr in development and stores nothing.
 * For production, wire this to Medusa's customer auth API or a dedicated
 * auth provider (Auth.js with Email provider is the cleanest drop-in).
 */
export interface MagicLinkRequest {
  email: string;
}

export async function issueMagicLink({ email }: MagicLinkRequest): Promise<{ ok: true }> {
  const secret = process.env.AUTH_SECRET || 'dev-secret-not-for-production';
  const expires = Date.now() + 15 * 60 * 1000;
  const payload = `${email}.${expires}`;
  const token = crypto.createHmac('sha256', secret).update(payload).digest('hex');
  const link = `${process.env.NEXT_PUBLIC_SITE_URL ?? ''}/api/auth/verify?token=${token}&e=${encodeURIComponent(email)}&x=${expires}`;

  if (process.env.EMAIL_SMTP_URL) {
    // TODO: send real email via nodemailer/resend once EMAIL_SMTP_URL is set.
    // const transport = nodemailer.createTransport(process.env.EMAIL_SMTP_URL);
    // await transport.sendMail({ from: process.env.EMAIL_FROM, to: email, subject: 'Sign in', html: `...${link}...` });
  } else {
    // Dev fallback — surface the link in server logs so the flow is testable.
    console.log(`[magic-link] ${email} → ${link}`);
  }

  return { ok: true };
}
