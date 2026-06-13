import type { CartItem } from '../../domain/Cart';
import type { ICartStorage } from '../../ports/repositories';

const STORAGE_KEY = 'apptstore_cart';

export class SessionCartStorage implements ICartStorage {
  async load(): Promise<CartItem[]> {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    try {
      return JSON.parse(raw) as CartItem[];
    } catch {
      return [];
    }
  }

  async save(items: CartItem[]): Promise<void> {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }

  async clear(): Promise<void> {
    sessionStorage.removeItem(STORAGE_KEY);
  }
}
