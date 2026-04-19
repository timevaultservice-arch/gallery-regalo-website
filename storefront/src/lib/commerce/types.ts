export type CategorySlug =
  | 'porcelain'
  | 'tableware'
  | 'silverware'
  | 'pictures'
  | 'board-games'
  | 'holiday'
  | 'christmas-trees'
  | 'gifts';

export interface LocalizedString {
  en: string;
  ka: string;
}

export interface Category {
  slug: CategorySlug;
  name: LocalizedString;
  blurb: LocalizedString;
  cover: string;
}

export interface ProductImage {
  src: string;
  alt: string;
}

export interface Product {
  id: string;
  handle: string;
  title: LocalizedString;
  description: LocalizedString;
  category: CategorySlug;
  priceGel: number;
  comparePriceGel?: number;
  onSale: boolean;
  isNew: boolean;
  inStock: boolean;
  images: ProductImage[];
  tags?: string[];
}

export interface ProductFilter {
  category?: CategorySlug;
  onSaleOnly?: boolean;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sort?: 'new' | 'price-asc' | 'price-desc';
}

export interface CartLine {
  productId: string;
  qty: number;
}

export interface OrderInput {
  email: string;
  fullName: string;
  phone: string;
  address: string;
  city: string;
  region: string;
  notes?: string;
  lines: CartLine[];
  paymentProvider: 'bog' | 'tbc';
  locale: 'en' | 'ka';
}
