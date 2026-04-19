'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag, User } from 'lucide-react';
import { LocaleSwitcher } from './ui/locale-switcher';
import { useCart } from '@/lib/store/cart';
import { cn } from '@/lib/format';

export function Nav() {
  const t = useTranslations('nav');
  const tBrand = useTranslations('brand');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const cartCount = useCart((s) => s.lines.reduce((a, l) => a + l.qty, 0));
  const openCart = useCart((s) => s.open);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-all duration-500 ease-out-expo',
        scrolled ? 'bg-paper/90 backdrop-blur border-b border-paper-border' : 'bg-transparent'
      )}
    >
      <div className="container-page flex items-center justify-between h-16 md:h-20">
        <Link href="/" className="flex items-center gap-3 group">
          <span className="font-display text-xl md:text-2xl tracking-tightest leading-none">
            {tBrand('name')}
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-10 text-sm uppercase tracking-widest">
          <Link href="/shop" className="hover:opacity-60 transition-opacity">{t('shop')}</Link>
          <Link href="/sale" className="hover:opacity-60 transition-opacity">{t('sale')}</Link>
          <Link href="/about" className="hover:opacity-60 transition-opacity">{t('about')}</Link>
          <Link href="/contact" className="hover:opacity-60 transition-opacity">{t('contact')}</Link>
        </nav>

        <div className="flex items-center gap-5">
          <div className="hidden md:block">
            <LocaleSwitcher />
          </div>
          <Link href="/account" aria-label={t('account')} className="hover:opacity-60 transition-opacity">
            <User className="w-5 h-5" strokeWidth={1.25} />
          </Link>
          <button
            onClick={openCart}
            aria-label={t('cart')}
            className="relative hover:opacity-60 transition-opacity"
          >
            <ShoppingBag className="w-5 h-5" strokeWidth={1.25} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-ink text-paper rounded-full w-4 h-4 text-[10px] flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          <button
            className="md:hidden hover:opacity-60 transition-opacity"
            onClick={() => setMobileOpen(true)}
            aria-label={t('menu')}
          >
            <Menu className="w-5 h-5" strokeWidth={1.25} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-paper"
          >
            <div className="container-page flex items-center justify-between h-16">
              <span className="font-display text-xl">{tBrand('name')}</span>
              <button onClick={() => setMobileOpen(false)} aria-label={t('close')}>
                <X className="w-5 h-5" strokeWidth={1.25} />
              </button>
            </div>
            <nav className="container-page mt-12 flex flex-col gap-8 text-3xl font-display">
              {[
                { href: '/shop', key: 'shop' },
                { href: '/sale', key: 'sale' },
                { href: '/about', key: 'about' },
                { href: '/contact', key: 'contact' },
                { href: '/account', key: 'account' }
              ].map((item, i) => (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link href={item.href} onClick={() => setMobileOpen(false)}>
                    {t(item.key as 'shop' | 'sale' | 'about' | 'contact' | 'account')}
                  </Link>
                </motion.div>
              ))}
              <div className="mt-8">
                <LocaleSwitcher />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
