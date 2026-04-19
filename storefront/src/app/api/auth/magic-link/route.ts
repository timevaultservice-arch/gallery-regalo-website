import { NextResponse } from 'next/server';
import { z } from 'zod';
import { issueMagicLink } from '@/lib/auth/magic-link';

const schema = z.object({ email: z.string().email() });

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'invalid_email' }, { status: 400 });
  }
  await issueMagicLink({ email: parsed.data.email });
  return NextResponse.json({ ok: true });
}
