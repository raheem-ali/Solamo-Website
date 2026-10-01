// Server-side helper. API_URL has no NEXT_PUBLIC_ prefix on purpose:
// these calls run on the Next.js server, never in the visitor's browser.
const API = process.env.API_URL || 'http://localhost:8000/api';

// No caching while developing, 60 seconds in production
const REVALIDATE = process.env.NODE_ENV === 'development' ? 0 : 60;

export type Product = {
  id: number;
  name: string;
  slug: string;
  category_id: number;
  category_slug: string | null;
  subtitle: string | null;
  description: string | null;
  regular_price: string;
  sale_price: string | null;
  stock_status: 'in_stock' | 'out_of_stock';
  images: string[];
  brand_name: string;
  brand_logo?: string | null;
  category_name: string | null;
  tenant_name: string;
  tenant_phone: string | null;
  tenant_whatsapp: string | null;
  attributes: { attribute_name: string; attribute_value: string }[];
};

export type Paginated<T> = {
  data: T[];
  current_page: number;
  last_page: number;
  total: number;
};

export type Category = { id: number; name: string; slug: string; parent_id: number | null };
export type Brand = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  count: number;
};

async function get<T>(path: string, revalidate = REVALIDATE): Promise<T | null> {
  try {
    // No Authorization header: guests only ever get approved products.
    const res = await fetch(`${API}${path}`, {
      headers: { Accept: 'application/json' },
      next: { revalidate },
    });
    if (res.status === 404) return null;
    if (!res.ok) {
      console.error(`API ${res.status} on ${path}`);
      return null;
    }
    return res.json();
  } catch (e) {
    console.error(`API unreachable: ${API}${path}`, e);
    return null;
  }
}

export async function getProducts(params: Record<string, string | number | undefined> = {}) {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== '') qs.set(k, String(v));
  });
  return get<Paginated<Product>>(`/products?${qs.toString()}`);
}

/** Every approved product (the API returns at most 50 per page, so walk the pages). */
export async function getAllProducts(
  params: Record<string, string | number | undefined> = {},
): Promise<Product[]> {
  const all: Product[] = [];
  let page = 1;
  let last = 1;

  do {
    const res = await getProducts({ ...params, per_page: 50, page });
    if (!res) break;
    all.push(...res.data);
    last = res.last_page;
    page++;
  } while (page <= last && page <= 20);

  return all;
}

export const getProduct = (slug: string) => get<Product>(`/products/${encodeURIComponent(slug)}`);

export async function getCategories() {
  return (await get<Category[]>('/products/categories', 300)) ?? [];
}

export async function getBrands() {
  return (await get<Brand[]>('/brands', 300)) ?? [];
}

export const rs = (n: string | number) => `Rs ${Math.round(Number(n)).toLocaleString('en-PK')}`;

// 0300 1234567 -> 923001234567 (wa.me needs digits with the country code)
export function waLink(num: string, text = '') {
  let d = num.replace(/\D/g, '');
  if (d.startsWith('0')) d = '92' + d.slice(1);
  return `https://wa.me/${d}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
}