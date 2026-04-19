import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export default async function CheckoutSuccessPage() {
  const t = await getTranslations('checkout');
  return (
    <section className="container-page pt-40 pb-32 text-center">
      <h1 className="font-display text-6xl md:text-8xl tracking-tightest mb-6">
        {t('successTitle')}
      </h1>
      <p className="text-ink/60 max-w-md mx-auto text-lg leading-relaxed">{t('successBody')}</p>
      <Link href="/shop" className="btn-link mt-12 inline-flex">
        {t('successCta')}
      </Link>
    </section>
  );
}
