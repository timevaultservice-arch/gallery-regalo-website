'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useCart } from '@/lib/store/cart';
import { mockAdapter } from '@/lib/commerce/mock';
import type { Product } from '@/lib/commerce/types';
import type { Locale } from '@/i18n/config';
import { formatPrice } from '@/lib/format';
import { Minus, Plus } from 'lucide-react';

export default function CartPage() {
  const t = useTranslations('cart');
  const locale = useLocale() as Locale;
  const lines = useCart((s) => s.lines);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    mockAdapter.listProducts().then(setProducts);
  }, []);

  const subtotal = lines.reduce((acc, line) => {
    const p = products.find((x) => x.id === line.productId);
    return acc + (p ? p.priceGel * line.qty : 0);
  }, 0);

  return (
    <section className="container-page pt-28 md:pt-32 pb-24">
      <h1 className="font-display text-5xl md:text-7xl tracking-tightest mb-12">{t('title')}</h1>

      {lines.length === 0 ? (
        <div className="py-24 text-center text-ink/50">
          <p className="mb-6">{t('empty')}</p>
          <Link href="/shop" className="btn-link">{t('continueShopping')}</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <ul className="lg:col-span-2 border-t border-paper-border">
            {lines.map((line) => {
              const p = products.find((x) => x.id === line.productId);
              if (!p) return null;
              return (
                <li
                  key={line.productId}
                  className="flex flex-col md:flex-row gap-6 py-6 border-b border-paper-border"
                >
                  <div className="relative w-full md:w-32 aspect-[4/5] md:aspect-square bg-white shrink-0 overflow-hidden">
                    <Image
                      src={p.images[0].src}
                      alt={p.images[0].alt}
                      fill
                      sizes="200px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <Link href={`/shop/${p.handle}`} className="text-lg hover:opacity-60">
                      {p.title[locale]}
                    </Link>
                    <span className="text-xs uppercase tracking-widest text-ink/50 mt-1">
                      {p.category.replace('-', ' ')}
                    </span>
                    <div className="mt-auto pt-6 flex items-center justify-between">
                      <div className="flex items-center border border-paper-border">
                        <button
                          onClick={() => setQty(line.productId, line.qty - 1)}
                          className="w-9 h-9 flex items-center justify-center hover:bg-paper-muted"
                          aria-label="Decrease"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-10 text-center text-sm tabular-nums">{line.qty}</span>
                        <button
                          onClick={() => setQty(line.productId, line.qty + 1)}
                          className="w-9 h-9 flex items-center justify-center hover:bg-paper-muted"
                          aria-label="Increase"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => remove(line.productId)}
                        className="text-xs uppercase tracking-widest text-ink/50 hover:text-ink"
                      >
                        {t('remove')}
                      </button>
                    </div>
                  </div>
                  <div className="text-lg tabular-nums shrink-0">
                    {formatPrice(p.priceGel * line.qty, locale)}
                  </div>
                </li>
              );
            })}
          </ul>

          <aside className="lg:sticky lg:top-32 self-start border border-paper-border p-8 space-y-6">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="uppercase tracking-widest text-ink/60">{t('subtotal')}</span>
                <span className="tabular-nums">{formatPrice(subtotal, locale)}</span>
              </div>
              <div className="flex justify-between">
                <span className="uppercase tracking-widest text-ink/60">{t('shipping')}</span>
                <span className="text-ink/60">{t('shippingFree')}</span>
              </div>
              <div className="hairline pt-4 flex justify-between text-base font-medium">
                <span className="uppercase tracking-widest">{t('total')}</span>
                <span className="tabular-nums">{formatPrice(subtotal, locale)}</span>
              </div>
            </div>
            <Link href="/checkout" className="btn-primary w-full">{t('checkout')}</Link>
          </aside>
        </div>
      )}
    </section>
  );
}
