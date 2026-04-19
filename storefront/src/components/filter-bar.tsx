'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { useSearchParams } from 'next/navigation';
import type { Category, ProductFilter } from '@/lib/commerce/types';
import type { Locale } from '@/i18n/config';
import { useTransition } from 'react';

interface Props {
  categories: Category[];
  count: number;
  current: ProductFilter;
}

export function FilterBar({ categories, count, current }: Props) {
  const t = useTranslations('shop');
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [, startTransition] = useTransition();

  function update(next: Partial<ProductFilter>) {
    const sp = new URLSearchParams(params);
    Object.entries(next).forEach(([k, v]) => {
      if (v == null || v === '' || v === false) sp.delete(k);
      else sp.set(k, String(v));
    });
    startTransition(() => router.push(`${pathname}?${sp.toString()}`));
  }

  function clear() {
    startTransition(() => router.push(pathname));
  }

  return (
    <div className="border-y border-paper-border py-4 mb-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs uppercase tracking-widest">
          <button
            onClick={() => update({ category: undefined })}
            className={current.category ? 'text-ink/40 hover:text-ink' : 'text-ink'}
          >
            {t('all')}
          </button>
          {categories.map((c) => (
            <button
              key={c.slug}
              onClick={() => update({ category: c.slug })}
              className={
                current.category === c.slug ? 'text-ink' : 'text-ink/40 hover:text-ink'
              }
            >
              {c.name[locale]}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-6 text-xs uppercase tracking-widest">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={!!current.onSaleOnly}
              onChange={(e) => update({ onSaleOnly: e.target.checked || undefined })}
              className="accent-ink"
            />
            {t('onSaleOnly')}
          </label>
          <select
            value={current.sort ?? 'new'}
            onChange={(e) => update({ sort: e.target.value as ProductFilter['sort'] })}
            className="bg-transparent border-none uppercase tracking-widest text-xs focus:outline-none cursor-pointer"
          >
            <option value="new">{t('sortNew')}</option>
            <option value="price-asc">{t('sortPriceAsc')}</option>
            <option value="price-desc">{t('sortPriceDesc')}</option>
          </select>
          <button onClick={clear} className="text-ink/50 hover:text-ink">
            {t('clear')}
          </button>
        </div>
      </div>

      <div className="mt-3 text-xs uppercase tracking-widest text-ink/50">
        {t('results', { count })}
      </div>
    </div>
  );
}
