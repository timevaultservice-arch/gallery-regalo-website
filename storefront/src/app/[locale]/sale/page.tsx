import { mockAdapter } from '@/lib/commerce/mock';
import { ProductGrid } from '@/components/product-grid';
import { FilterBar } from '@/components/filter-bar';
import { getTranslations } from 'next-intl/server';
import type { CategorySlug, ProductFilter } from '@/lib/commerce/types';

interface Props {
  searchParams: Promise<{
    category?: string;
    sort?: string;
  }>;
}

export default async function SalePage({ searchParams }: Props) {
  const sp = await searchParams;
  const filter: ProductFilter = {
    category: sp.category as CategorySlug | undefined,
    onSaleOnly: true,
    sort: (sp.sort as ProductFilter['sort']) ?? 'new'
  };

  const [categories, products, tHome, tShop] = await Promise.all([
    mockAdapter.listCategories(),
    mockAdapter.listProducts(filter),
    getTranslations('home'),
    getTranslations('shop')
  ]);

  return (
    <section className="container-page pt-28 md:pt-32 pb-24">
      <header className="max-w-3xl">
        <div className="eyebrow mb-4">{tHome('saleStripTitle')}</div>
        <h1 className="font-display text-5xl md:text-7xl tracking-tightest text-balance">
          {tHome('heroCtaSecondary')}
        </h1>
      </header>

      <div className="mt-12">
        <FilterBar categories={categories} count={products.length} current={filter} />
        <ProductGrid products={products} emptyText={tShop('empty')} />
      </div>
    </section>
  );
}
