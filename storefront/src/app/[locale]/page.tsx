import { Hero } from '@/components/hero';
import { CategoryStrip } from '@/components/category-strip';
import { ProductGrid } from '@/components/product-grid';
import { FadeIn } from '@/components/motion/fade-in';
import { mockAdapter } from '@/lib/commerce/mock';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export default async function HomePage() {
  const [categories, featured, t] = await Promise.all([
    mockAdapter.listCategories(),
    mockAdapter.listProducts({ sort: 'new' }).then((p) => p.slice(0, 8)),
    getTranslations('home')
  ]);

  return (
    <>
      <Hero />

      <CategoryStrip categories={categories} />

      <section className="container-page pb-24">
        <FadeIn>
          <div className="flex items-end justify-between mb-12">
            <h2 className="font-display text-4xl md:text-6xl tracking-tightest text-balance">
              {t('featuredTitle')}
            </h2>
          </div>
        </FadeIn>
        <ProductGrid products={featured} />
      </section>

      <section className="bg-ink text-paper py-32">
        <div className="container-page grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <FadeIn>
            <h2 className="font-display text-5xl md:text-7xl tracking-tightest text-balance">
              {t('storyTitle')}
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="text-paper/80 leading-relaxed text-lg max-w-prose">{t('storyBody')}</p>
            <Link href="/about" className="btn-link mt-8 !text-paper after:!bg-paper">
              {t('storyCta')}
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
