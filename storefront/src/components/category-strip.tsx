'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import type { Category } from '@/lib/commerce/types';
import type { Locale } from '@/i18n/config';

export function CategoryStrip({ categories }: { categories: Category[] }) {
  const t = useTranslations('home');
  const locale = useLocale() as Locale;

  return (
    <section className="py-24 md:py-32">
      <div className="container-page">
        <div className="flex items-end justify-between mb-12">
          <h2 className="font-display text-4xl md:text-6xl tracking-tightest text-balance max-w-2xl">
            {t('categoriesTitle')}
          </h2>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8"
        >
          {categories.map((c) => (
            <motion.div
              key={c.slug}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
              }}
            >
              <Link href={{ pathname: '/shop', query: { category: c.slug } }} className="group block">
                <div className="relative aspect-[3/4] bg-paper-muted overflow-hidden">
                  <Image
                    src={c.cover}
                    alt={c.name[locale]}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/20 transition-colors duration-500" />
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-display text-xl tracking-tightest">{c.name[locale]}</span>
                  <span className="text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                    →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
