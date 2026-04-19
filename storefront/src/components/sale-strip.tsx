'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Marquee } from './motion/marquee';
import { motion } from 'framer-motion';

export function SaleStrip() {
  const t = useTranslations('home');
  return (
    <section className="bg-ink text-paper py-3 overflow-hidden">
      <Marquee>
        <Link href="/sale" className="inline-flex items-center gap-6 text-xs uppercase tracking-widest">
          <motion.span
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            className="inline-block w-1.5 h-1.5 rounded-full bg-paper"
          />
          {t('saleStripTitle')}
          <span className="opacity-60">·</span>
          <span className="underline underline-offset-4">{t('saleStripCta')}</span>
        </Link>
      </Marquee>
    </section>
  );
}
