'use client';

import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus } from 'lucide-react';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { useCart } from '@/lib/store/cart';
import { mockAdapter } from '@/lib/commerce/mock';
import type { Product } from '@/lib/commerce/types';
import type { Locale } from '@/i18n/config';
import { formatPrice } from '@/lib/format';

export function CartDrawer() {
  const t = useTranslations('cart');
  const tNav = useTranslations('nav');
  const locale = useLocale() as Locale;
  const isOpen = useCart((s) => s.isOpen);
  const close = useCart((s) => s.close);
  const lines = useCart((s) => s.lines);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (lines.length === 0) {
      setProducts([]);
      return;
    }
    mockAdapter.listProducts().then((all) =>
      setProducts(all.filter((p) => lines.some((l) => l.productId === p.id)))
    );
  }, [lines]);

  const subtotal = lines.reduce((acc, line) => {
    const p = products.find((x) => x.id === line.productId);
    return acc + (p ? p.priceGel * line.qty : 0);
  }, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={close}
            className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-paper flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-paper-border">
              <span className="font-display text-2xl tracking-tightest">{t('title')}</span>
              <button onClick={close} aria-label={tNav('close')}>
                <X className="w-5 h-5" strokeWidth={1.25} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {lines.length === 0 ? (
                <div className="p-10 text-center text-ink/50">
                  <p className="mb-6">{t('empty')}</p>
                  <Link href="/shop" onClick={close} className="btn-link">
                    {t('continueShopping')}
                  </Link>
                </div>
              ) : (
                <ul>
                  {lines.map((line) => {
                    const p = products.find((x) => x.id === line.productId);
                    if (!p) return null;
                    return (
                      <li key={line.productId} className="flex gap-4 p-6 border-b border-paper-border">
                        <div className="w-20 h-24 bg-white shrink-0 relative overflow-hidden">
                          <Image
                            src={p.images[0].src}
                            alt={p.images[0].alt}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 flex flex-col">
                          <div className="flex justify-between gap-3">
                            <Link
                              href={`/shop/${p.handle}`}
                              onClick={close}
                              className="text-sm leading-snug hover:opacity-60"
                            >
                              {p.title[locale]}
                            </Link>
                            <span className="text-sm tabular-nums">
                              {formatPrice(p.priceGel * line.qty, locale)}
                            </span>
                          </div>
                          <div className="mt-auto flex items-center justify-between">
                            <div className="flex items-center border border-paper-border">
                              <button
                                onClick={() => setQty(line.productId, line.qty - 1)}
                                className="w-8 h-8 flex items-center justify-center hover:bg-paper-muted"
                                aria-label="Decrease"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-8 text-center text-sm tabular-nums">{line.qty}</span>
                              <button
                                onClick={() => setQty(line.productId, line.qty + 1)}
                                className="w-8 h-8 flex items-center justify-center hover:bg-paper-muted"
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
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {lines.length > 0 && (
              <div className="border-t border-paper-border p-6 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="uppercase tracking-widest text-ink/60">{t('subtotal')}</span>
                  <span className="tabular-nums">{formatPrice(subtotal, locale)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="uppercase tracking-widest text-ink/60">{t('shipping')}</span>
                  <span className="text-ink/60">{t('shippingFree')}</span>
                </div>
                <Link href="/checkout" onClick={close} className="btn-primary w-full">
                  {t('checkout')}
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
