import type { CommerceAdapter } from './adapter';

/**
 * Medusa adapter — stub.
 *
 * Once the Medusa backend (../backend) is running, swap these to call
 * the Medusa Store API at NEXT_PUBLIC_MEDUSA_URL with
 * NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY.
 *
 * The shape returned must match `Product` / `Category` in ./types.ts —
 * write a Medusa-product → local-Product mapper here.
 */
export const medusaAdapter: CommerceAdapter = {
  async listCategories() {
    throw new Error('Medusa adapter not yet implemented. Use mock adapter (unset NEXT_PUBLIC_MEDUSA_URL).');
  },
  async listProducts() {
    throw new Error('Medusa adapter not yet implemented.');
  },
  async getProduct() {
    throw new Error('Medusa adapter not yet implemented.');
  },
  async getRelated() {
    throw new Error('Medusa adapter not yet implemented.');
  }
};
