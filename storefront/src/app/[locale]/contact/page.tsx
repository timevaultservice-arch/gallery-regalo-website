import { getTranslations } from 'next-intl/server';
import { FadeIn } from '@/components/motion/fade-in';

const outlets = [
  { city: 'Batumi', name: 'Outlet 1', address: '—' },
  { city: 'Batumi', name: 'Outlet 2', address: '—' },
  { city: 'Batumi', name: 'Outlet 3', address: '—' },
  { city: 'Tbilisi', name: 'New Gallery', address: '—' }
];

export default async function ContactPage() {
  const t = await getTranslations('contact');

  return (
    <section className="container-page pt-28 md:pt-32 pb-24">
      <FadeIn>
        <h1 className="font-display text-5xl md:text-7xl tracking-tightest mb-3">{t('title')}</h1>
        <p className="text-ink/60 max-w-xl text-lg">{t('lead')}</p>
      </FadeIn>

      <FadeIn delay={0.15}>
        <div className="mt-16">
          <div className="eyebrow mb-6">{t('outlets')}</div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 border-t border-paper-border">
            {outlets.map((o, i) => (
              <li
                key={i}
                className="border-b border-paper-border py-6 flex items-baseline justify-between gap-4"
              >
                <div>
                  <div className="font-display text-2xl tracking-tightest">{o.name}</div>
                  <div className="text-sm text-ink/60 mt-1">{o.city}</div>
                </div>
                <span className="text-sm text-ink/50">{o.address}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm uppercase tracking-widest text-ink/50">{t('hours')}</p>
        </div>
      </FadeIn>
    </section>
  );
}
