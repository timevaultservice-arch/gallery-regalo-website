'use client';

import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import type { Product } from '@/lib/commerce/types';
import type { Locale } from '@/i18n/config';
import { formatPrice } from '@/lib/format';

interface Props {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority }: Props) {
  const locale = useLocale() as Locale;
  const t = useTranslations('product');

  return (
    <motion.div
      whileHover="hover"
      className="group relative flex flex-col"
    >
      <Link href={`/shop/${product.handle}`} className="block">
        <div className="product-frame">
          <Image
            src={product.images[0].src}
            alt={product.images[0].alt}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            priority={priority}
            className="object-cover"
          />
          <div className="absolute top-3 left-3 flex gap-2">
            {product.onSale && <span className="badge-dark">{t('saleBadge')}</span>}
            {product.isNew && !product.onSale && <span className="badge-light">{t('newBadge')}</span>}
          </div>
          {!product.inStock && (
            <div className="absolute inset-0 bg-paper/70 flex items-center justify-center">
              <span className="text-xs uppercase tracking-widest">{t('outOfStock')}</span>
            </div>
          )}
        </div>

        <div className="pt-4 flex items-baseline justify-between gap-3">
          <h3 className="text-sm leading-snug">{product.title[locale]}</h3>
          <div className="flex items-baseline gap-2 shrink-0">
            {product.comparePriceGel && (
              <span className="text-xs text-ink/40 line-through tabular-nums">
                {formatPrice(product.comparePriceGel, locale)}
              </span>
            )}
            <span className="text-sm tabular-nums">
              {formatPrice(product.priceGel, locale)}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
