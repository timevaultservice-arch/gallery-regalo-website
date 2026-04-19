'use client';

import { motion } from 'framer-motion';
import type { Product } from '@/lib/commerce/types';
import { ProductCard } from './product-card';

interface Props {
  products: Product[];
  emptyText?: string;
}

export function ProductGrid({ products, emptyText }: Props) {
  if (products.length === 0) {
    return (
      <div className="py-32 text-center text-ink/50">
        {emptyText ?? 'No items.'}
      </div>
    );
  }
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.06 } }
      }}
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12"
    >
      {products.map((p, i) => (
        <motion.div
          key={p.id}
          variants={{
            hidden: { opacity: 0, y: 24 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
          }}
        >
          <ProductCard product={p} priority={i < 4} />
        </motion.div>
      ))}
    </motion.div>
  );
}
