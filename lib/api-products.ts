import type { Product } from "@/lib/brand-data";

export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
export const PLACEHOLDER = "https://via.placeholder.com/400";
// Where a product card links to
export const PRODUCT_LINK_PREFIX = "/shop";

// Minimal shape (what every page already has)
export interface ApiProductLite {
  id: number;
  slug: string;
  name: string;
  subtitle: string | null;
  description?: string | null;
  regular_price: number | string;
  sale_price: number | string | null;
  stock_status: string;
  stock_quantity: number;
  images: string[];

  // Brand
  brand_id: number;
  brand_name: string;
  brand_slug?: string | null;
  brand_logo?: string | null;

  // Category
  category_id: number | null;
  category_name: string | null;

  // Shop (tenant). Optional: only present once the backend sends them
  tenant_id?: number;
  tenant_name?: string | null;
  tenant_slug?: string | null;
  tenant_logo?: string | null;
  tenant_profile_image?: string | null;
  tenant_owner?: string | null;
  tenant_phone?: string | null;
  tenant_whatsapp?: string | null;
  tenant_email?: string | null;
  tenant_address?: string | null;
  tenant_city?: string | null;
  tenant_about?: string | null;
  tenant_ntn?: string | null;
  tenant_established?: string | number | null;
  tenant_verified?: boolean | number | null;
  tenant_rating?: number | null;
}

export type ApiProduct = ApiProductLite;

export const slugify = (s: string) =>
  (s || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

/** Slug used in URLs for a shop: the database slug if sent, otherwise built from the name */
export const tenantSlug = (p: Pick<ApiProductLite, "tenant_slug" | "tenant_name">) =>
  p.tenant_slug || slugify(p.tenant_name || "");

/** Slug used in URLs for a brand: the database slug if sent, otherwise built from the name */
export const brandSlugOf = (p: Pick<ApiProductLite, "brand_slug" | "brand_name">) =>
  p.brand_slug || slugify(p.brand_name);

export function priceInfo(p: { regular_price: number | string; sale_price: number | string | null }) {
  const regular = Number(p.regular_price) || 0;
  const sale = p.sale_price != null ? Number(p.sale_price) : 0;
  const onSale = sale > 0 && sale < regular;
  return { regular, current: onSale ? sale : regular, onSale };
}

export type CardProduct = Product & {
  brandName: string;
  images: string[];
  regularPrice: number;
  onSale: boolean;
};

/** Database product -> the shape ProductCard / carousels already understand */
export function toCardProduct(p: ApiProductLite): CardProduct {
  const { regular, current, onSale } = priceInfo(p);
  return {
    id: p.slug,
    name: p.name,
    price: current,
    image: p.images?.[0] || PLACEHOLDER,
    link: `${PRODUCT_LINK_PREFIX}/${slugify(p.brand_name)}/${p.slug}`,
    category: (p.category_name || "Products") as Product["category"],
    description: p.subtitle || "",
    brandName: p.brand_name,
    images: p.images || [],
    regularPrice: regular,
    onSale,
  } as unknown as CardProduct;
}

/** Loads every page of products (50 per request) */
async function loadAll(): Promise<ApiProductLite[]> {
  const all: ApiProductLite[] = [];
  for (let page = 1; page <= 40; page++) {
    const res = await fetch(`${API_URL}/products?per_page=50&page=${page}`, {
      headers: { Accept: "application/json" },
    });
    if (!res.ok) throw new Error(`Products request failed (HTTP ${res.status})`);
    const json = await res.json();
    all.push(...(Array.isArray(json?.data) ? json.data : []));
    if (!json?.last_page || Number(json.current_page) >= Number(json.last_page)) break;
  }
  return all;
}

// One shared request for the whole page (carousels, flash deals and brands all reuse it)
let cache: { at: number; promise: Promise<ApiProductLite[]> } | null = null;

export function getAllProducts(): Promise<ApiProductLite[]> {
  if (cache && Date.now() - cache.at < 60_000) return cache.promise;
  const promise = loadAll().catch((e) => {
    cache = null; // do not cache failures
    throw e;
  });
  cache = { at: Date.now(), promise };
  return promise;
}