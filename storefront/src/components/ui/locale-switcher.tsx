'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { locales, type Locale } from '@/i18n/config';
import { useTransition } from 'react';

export function LocaleSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <div className="inline-flex items-center gap-3 text-xs uppercase tracking-widest">
      {locales.map((l) => (
        <button
          key={l}
          onClick={() =>
            startTransition(() => router.replace(pathname, { locale: l }))
          }
          disabled={pending}
          className={
            'transition-opacity ' +
            (l === locale ? 'opacity-100' : 'opacity-40 hover:opacity-100')
          }
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
