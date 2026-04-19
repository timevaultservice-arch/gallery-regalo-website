import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export default async function AccountPage() {
  const t = await getTranslations('account');
  const tNav = await getTranslations('nav');

  return (
    <section className="container-page pt-28 md:pt-32 pb-24">
      <h1 className="font-display text-5xl md:text-7xl tracking-tightest mb-12">{t('title')}</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <aside className="space-y-3 text-sm uppercase tracking-widest">
          <Link href="/account" className="block hover:opacity-60">{t('orders')}</Link>
          <Link href="/sign-in" className="block hover:opacity-60">{tNav('signIn')}</Link>
        </aside>
        <div className="md:col-span-2">
          <h2 className="font-display text-3xl tracking-tightest mb-8">{t('orders')}</h2>
          <div className="border border-paper-border p-12 text-center text-ink/50">
            {t('noOrders')}
          </div>
        </div>
      </div>
    </section>
  );
}
