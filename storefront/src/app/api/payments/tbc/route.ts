import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createTbcPayment } from '@/lib/payments/tbc';
import { mockAdapter } from '@/lib/commerce/mock';

const schema = z.object({
  email: z.string().email(),
  fullName: z.string().min(1),
  phone: z.string().min(1),
  address: z.string().min(1),
  city: z.string().min(1),
  region: z.string().optional().default(''),
  notes: z.string().optional().default(''),
  lines: z.array(z.object({ productId: z.string(), qty: z.number().int().positive() })).min(1),
  paymentProvider: z.literal('tbc'),
  locale: z.enum(['en', 'ka'])
});

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'invalid_input', details: parsed.error.flatten() }, { status: 400 });
  }

  const all = await mockAdapter.listProducts();
  const amount = parsed.data.lines.reduce((acc, l) => {
    const p = all.find((x) => x.id === l.productId);
    return acc + (p ? p.priceGel * l.qty : 0);
  }, 0);
  if (amount <= 0) {
    return NextResponse.json({ error: 'empty_cart' }, { status: 400 });
  }

  const result = await createTbcPayment(parsed.data, amount);
  return NextResponse.json(result);
}
