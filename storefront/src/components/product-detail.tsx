'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import type { Product } from '@/lib/commerce/types';
import type { Locale } from '@/i18n/config';
import { formatPrice } from '@/lib/format';
import { useCart } from '@/lib/store/cart';
import { Check } from 'lucide-react';

export function ProductDetail({ product }: { product: Product }) {
  const locale = useLocale() as Locale;
  const t = useTranslations('product');
  const add = useCart((s) => s.add);
  const [activeImg, setActiveImg] = useState(0);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    add(product.id, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <section className="container-page pt-28 md:pt-32 pb-20 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
      <div>
        <div className="relative bg-white aspect-[4/5] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeImg}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={product.images[activeImg].src}
                alt={product.images[activeImg].alt}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>
          <div className="absolute top-4 left-4 flex gap-2">
            {product.onSale && <span className="badge-dark">{t('saleBadge')}</span>}
            {product.isNew && !product.onSale && <span className="badge-light">{t('newBadge')}</span>}
          </div>
        </div>
        {product.images.length > 1 && (
          <div className="mt-4 grid grid-cols-5 gap-2">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={
                  'relative aspect-square bg-white overflow-hidden ' +
                  (i === activeImg ? 'ring-1 ring-ink' : 'opacity-60 hover:opacity-100')
                }
              >
                <Image src={img.src} alt={img.alt} fill sizes="80px" className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col"
      >
        <div className="flex items-baseline gap-3 text-xs uppercase tracking-widest text-ink/50">
          <span>{product.category.replace('-', ' ')}</span>
        </div>
        <h1 className="font-display text-4xl md:text-6xl tracking-tightest mt-4 text-balance">
          {product.title[locale]}
        </h1>
        <div className="mt-6 flex items-baseline gap-3">
          {product.comparePriceGel && (
            <span className="text-ink/40 line-through tabular-nums">
              {formatPrice(product.comparePriceGel, locale)}
            </span>
          )}
          <span className="text-2xl tabular-nums">{formatPrice(product.priceGel, locale)}</span>
        </div>

        <p className="mt-8 text-ink/80 leading-relaxed max-w-prose">{product.description[locale]}</p>

        <div className="mt-10">
          <button
            onClick={handleAdd}
            disabled={!product.inStock}
            className={
              'w-full md:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 text-sm uppercase tracking-wider transition-all duration-300 ease-out-expo ' +
              (product.inStock
                ? 'bg-ink text-paper hover:tracking-widest'
                : 'bg-paper-muted text-ink/40 cursor-not-allowed')
            }
          >
            {added ? (
              <>
                <Check className="w-4 h-4" /> {t('added')}
              </>
            ) : product.inStock ? (
              t('addToCart')
            ) : (
              t('outOfStock')
            )}
          </button>
        </div>

        <div className="mt-16 space-y-6 text-sm">
          <details className="group border-t border-paper-border pt-4">
            <summary className="cursor-pointer flex justify-between items-center uppercase tracking-widest text-xs">
              {t('shipping')}
              <span className="transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 text-ink/70 leading-relaxed">{t('shippingBody')}</p>
          </details>
          <details className="group border-t border-paper-border pt-4">
            <summary className="cursor-pointer flex justify-between items-center uppercase tracking-widest text-xs">
              {t('care')}
              <span className="transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 text-ink/70 leading-relaxed">{t('careBody')}</p>
          </details>
        </div>
      </motion.div>
    </section>
  );
}
