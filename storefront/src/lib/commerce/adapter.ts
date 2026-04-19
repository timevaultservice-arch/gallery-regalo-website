import type { Category, Product, ProductFilter } from './types';

export interface CommerceAdapter {
  listCategories(): Promise<Category[]>;
  listProducts(filter?: ProductFilter): Promise<Product[]>;
  getProduct(handle: string): Promise<Product | null>;
  getRelated(handle: string, limit?: number): Promise<Product[]>;
}

import { mockAdapter } from './mock';
import { medusaAdapter } from './medusa';

export function getCommerce(): CommerceAdapter {
  return process.env.NEXT_PUBLIC_MEDUSA_URL ? medusaAdapter : mockAdapter;
}
