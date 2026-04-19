import { mockAdapter } from '@/lib/commerce/mock';
import { ProductGrid } from '@/components/product-grid';
import { FilterBar } from '@/components/filter-bar';
import { getTranslations } from 'next-intl/server';
import type { CategorySlug, ProductFilter } from '@/lib/commerce/types';

interface Props {
  searchParams: Promise<{
    category?: string;
    onSaleOnly?: string;
    sort?: string;
  }>;
}

export default async function ShopPage({ searchParams }: Props) {
  const sp = await searchParams;
  const filter: ProductFilter = {
    category: sp.category as CategorySlug | undefined,
    onSaleOnly: sp.onSaleOnly === 'true',
    sort: (sp.sort as ProductFilter['sort']) ?? 'new'
  };

  const [categories, products, t] = await Promise.all([
    mockAdapter.listCategories(),
    mockAdapter.listProducts(filter),
    getTranslations('shop')
  ]);

  return (
    <section className="container-page pt-28 md:pt-32 pb-24">
      <header className="max-w-3xl">
        <h1 className="font-display text-5xl md:text-7xl tracking-tightest text-balance">
          {t('title')}
        </h1>
        <p className="mt-4 text-ink/60 text-lg">{t('subtitle')}</p>
      </header>

      <div className="mt-12">
        <FilterBar categories={categories} count={products.length} current={filter} />
        <ProductGrid products={products} emptyText={t('empty')} />
      </div>
    </section>
  );
}
