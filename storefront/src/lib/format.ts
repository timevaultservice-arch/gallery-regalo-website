import type { Locale } from '@/i18n/config';

export function formatPrice(amount: number, locale: Locale): string {
  const formatter = new Intl.NumberFormat(locale === 'ka' ? 'ka-GE' : 'en-US', {
    style: 'currency',
    currency: 'GEL',
    maximumFractionDigits: 0
  });
  return formatter.format(amount);
}

export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}
