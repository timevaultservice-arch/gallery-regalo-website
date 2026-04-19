'use client';

import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { useCart } from '@/lib/store/cart';
import { mockAdapter } from '@/lib/commerce/mock';
import type { Product } from '@/lib/commerce/types';
import type { Locale } from '@/i18n/config';
import { formatPrice } from '@/lib/format';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

export default function CheckoutPage() {
  const t = useTranslations('checkout');
  const tCart = useTranslations('cart');
  const locale = useLocale() as Locale;
  const router = useRouter();
  const lines = useCart((s) => s.lines);
  const clear = useCart((s) => s.clear);
  const [products, setProducts] = useState<Product[]>([]);
  const [provider, setProvider] = useState<'bog' | 'tbc'>('bog');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    mockAdapter.listProducts().then(setProducts);
  }, []);

  const subtotal = lines.reduce((acc, line) => {
    const p = products.find((x) => x.id === line.productId);
    return acc + (p ? p.priceGel * line.qty : 0);
  }, 0);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (lines.length === 0 || submitting) return;
    setSubmitting(true);

    const form = new FormData(e.currentTarget);
    const payload = {
      email: String(form.get('email') ?? ''),
      fullName: String(form.get('fullName') ?? ''),
      phone: String(form.get('phone') ?? ''),
      address: String(form.get('address') ?? ''),
      city: String(form.get('city') ?? ''),
      region: String(form.get('region') ?? ''),
      notes: String(form.get('notes') ?? ''),
      lines,
      paymentProvider: provider,
      locale
    };

    try {
      const res = await fetch(`/api/payments/${provider}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data: { redirectUrl?: string } = await res.json();
      if (data.redirectUrl) {
        // In production, redirect to bank's hosted page.
        // For the stub, we route to the success page.
        clear();
        router.push('/checkout/success');
      } else {
        setSubmitting(false);
      }
    } catch {
      setSubmitting(false);
    }
  }

  return (
    <section className="container-page pt-28 md:pt-32 pb-24 grid grid-cols-1 lg:grid-cols-5 gap-12">
      <form onSubmit={onSubmit} className="lg:col-span-3 space-y-12">
        <header>
          <h1 className="font-display text-5xl md:text-6xl tracking-tightest mb-2">{t('title')}</h1>
        </header>

        <fieldset className="space-y-6">
          <legend className="eyebrow mb-6">{t('shipping')}</legend>
          <Input name="fullName" required placeholder={t('fullName')} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input name="email" type="email" required placeholder={t('email')} />
            <Input name="phone" type="tel" required placeholder={t('phone')} />
          </div>
          <Input name="address" required placeholder={t('address')} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input name="city" required placeholder={t('city')} />
            <Input name="region" placeholder={t('region')} />
          </div>
          <Input name="notes" placeholder={t('notes')} />
        </fieldset>

        <fieldset>
          <legend className="eyebrow mb-6">{t('payment')}</legend>
          <p className="text-sm text-ink/60 max-w-prose mb-6">{t('paymentNote')}</p>
          <div className="grid grid-cols-2 gap-4">
            {(['bog', 'tbc'] as const).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setProvider(p)}
                className={
                  'p-6 border text-left transition-colors duration-300 ' +
                  (provider === p
                    ? 'border-ink bg-ink text-paper'
                    : 'border-paper-border hover:border-ink')
                }
              >
                <div className="text-xs uppercase tracking-widest opacity-70">{t('payment')}</div>
                <div className="font-display text-2xl mt-2 tracking-tightest">
                  {p === 'bog' ? t('bog') : t('tbc')}
                </div>
              </button>
            ))}
          </div>
        </fieldset>

        <motion.button
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={lines.length === 0 || submitting}
          className="btn-primary w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? '...' : t('pay')}
        </motion.button>
      </form>

      <aside className="lg:col-span-2 lg:sticky lg:top-32 self-start border border-paper-border p-8">
        <div className="eyebrow mb-6">{tCart('title')}</div>
        <ul className="space-y-4">
          {lines.map((line) => {
            const p = products.find((x) => x.id === line.productId);
            if (!p) return null;
            return (
              <li key={line.productId} className="flex justify-between gap-3 text-sm">
                <span className="flex-1">
                  {p.title[locale]} <span className="text-ink/50">× {line.qty}</span>
                </span>
                <span className="tabular-nums">{formatPrice(p.priceGel * line.qty, locale)}</span>
              </li>
            );
          })}
        </ul>
        <div className="mt-8 hairline pt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="uppercase tracking-widest text-ink/60">{tCart('subtotal')}</span>
            <span className="tabular-nums">{formatPrice(subtotal, locale)}</span>
          </div>
          <div className="flex justify-between">
            <span className="uppercase tracking-widest text-ink/60">{tCart('shipping')}</span>
            <span className="text-ink/60">{tCart('shippingFree')}</span>
          </div>
          <div className="flex justify-between text-base font-medium pt-2">
            <span className="uppercase tracking-widest">{tCart('total')}</span>
            <span className="tabular-nums">{formatPrice(subtotal, locale)}</span>
          </div>
        </div>
      </aside>
    </section>
  );
}
