import { Product } from "./brand-data";

const WISHLIST_KEY = "solamo_wishlist";

export function getWishlist(): Product[] {
  if (typeof window === "undefined") return [];
  try {
    const item = localStorage.getItem(WISHLIST_KEY);
    return item ? JSON.parse(item) : [];
  } catch {
    return [];
  }
}

export function addToWishlist(product: Product): void {
  if (typeof window === "undefined") return;
  try {
    const list = getWishlist();
    if (!list.some((p) => p.id === product.id)) {
      list.push(product);
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(list));
      window.dispatchEvent(new Event("storage"));
      window.dispatchEvent(new CustomEvent("wishlistUpdated"));
    }
  } catch {}
}

export function removeFromWishlist(productId: string): void {
  if (typeof window === "undefined") return;
  try {
    const list = getWishlist();
    const updated = list.filter((p) => p.id !== productId);
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new CustomEvent("wishlistUpdated"));
  } catch {}
}

export function isInWishlist(productId: string): boolean {
  return getWishlist().some((p) => p.id === productId);
}
