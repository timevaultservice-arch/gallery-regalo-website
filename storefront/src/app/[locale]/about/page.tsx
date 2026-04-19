import { getTranslations } from 'next-intl/server';
import { FadeIn } from '@/components/motion/fade-in';
import Image from 'next/image';

export default async function AboutPage() {
  const t = await getTranslations('about');

  return (
    <>
      <section className="container-page pt-28 md:pt-32 pb-24">
        <FadeIn>
          <h1 className="font-display text-6xl md:text-8xl tracking-tightest text-balance max-w-4xl">
            {t('title')}
          </h1>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p className="mt-12 font-display text-2xl md:text-3xl tracking-tightest text-ink/70 max-w-2xl">
            {t('lead')}
          </p>
        </FadeIn>
      </section>

      <section className="relative h-[60svh] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=2400&q=80"
          alt=""
          fill
          className="object-cover"
        />
      </section>

      <section className="container-page py-24 grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-start-3 md:col-span-8">
          <FadeIn>
            <p className="text-lg leading-relaxed text-ink/80 max-w-prose">{t('body')}</p>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
