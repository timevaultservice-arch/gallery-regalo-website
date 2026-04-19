'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { RevealText } from './motion/reveal-text';

export function Hero() {
  const t = useTranslations('home');
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative h-[100svh] overflow-hidden bg-ink">
      <motion.div style={{ y }} className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=2400&q=80"
          alt=""
          fill
          priority
          className="object-cover opacity-70"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink/20 via-ink/10 to-ink/60" />

      <motion.div
        style={{ opacity }}
        className="container-page absolute inset-x-0 bottom-0 pb-16 md:pb-24 text-paper"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="eyebrow !text-paper/70 mb-6"
        >
          {t('heroEyebrow')}
        </motion.div>

        <RevealText
          text={t('heroTitle')}
          as="h1"
          className="font-display text-[14vw] md:text-[9vw] leading-[0.95] text-balance max-w-[16ch]"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 1 }}
          className="mt-8 max-w-md text-paper/80 text-base md:text-lg leading-relaxed"
        >
          {t('heroSubtitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center gap-6"
        >
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 bg-paper text-ink px-8 py-4 text-sm uppercase tracking-wider transition-all duration-500 ease-out-expo hover:tracking-widest"
          >
            {t('heroCta')}
          </Link>
          <Link href="/sale" className="text-paper btn-link !text-paper after:!bg-paper">
            {t('heroCtaSecondary')}
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
