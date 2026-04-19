import { notFound } from 'next/navigation';
import { mockAdapter } from '@/lib/commerce/mock';
import { ProductDetail } from '@/components/product-detail';
import { ProductGrid } from '@/components/product-grid';
import { FadeIn } from '@/components/motion/fade-in';
import { getTranslations } from 'next-intl/server';

interface Props {
  params: Promise<{ handle: string; locale: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { handle, locale } = await params;
  const product = await mockAdapter.getProduct(handle);
  if (!product) return {};
  return {
    title: product.title[locale === 'ka' ? 'ka' : 'en'],
    description: product.description[locale === 'ka' ? 'ka' : 'en']
  };
}

export default async function ProductPage({ params }: Props) {
  const { handle } = await params;
  const product = await mockAdapter.getProduct(handle);
  if (!product) notFound();
  const [related, t] = await Promise.all([
    mockAdapter.getRelated(handle, 4),
    getTranslations('product')
  ]);

  return (
    <>
      <ProductDetail product={product} />
      {related.length > 0 && (
        <section className="container-page pb-24">
          <FadeIn>
            <h2 className="font-display text-3xl md:text-4xl tracking-tightest mb-12">
              {t('youMayLike')}
            </h2>
          </FadeIn>
          <ProductGrid products={related} />
        </section>
      )}
    </>
  );
}
