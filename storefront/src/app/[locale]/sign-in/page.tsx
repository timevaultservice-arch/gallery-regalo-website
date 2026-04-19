'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function SignInPage() {
  const t = useTranslations('auth');
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting || !email) return;
    setSubmitting(true);
    try {
      await fetch('/api/auth/magic-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      setSent(true);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="container-page pt-32 md:pt-40 pb-32 max-w-md mx-auto">
      <AnimatePresence mode="wait">
        {!sent ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="font-display text-5xl md:text-6xl tracking-tightest mb-3">
              {t('signInTitle')}
            </h1>
            <p className="text-ink/60 mb-12">{t('signInSubtitle')}</p>
            <form onSubmit={onSubmit} className="space-y-8">
              <Input
                name="email"
                type="email"
                required
                placeholder={t('emailPlaceholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button type="submit" disabled={submitting} className="w-full">
                {submitting ? '...' : t('send')}
              </Button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="sent"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="font-display text-5xl md:text-6xl tracking-tightest mb-3">
              {t('sentTitle')}
            </h1>
            <p className="text-ink/60">{t('sentBody', { email })}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
