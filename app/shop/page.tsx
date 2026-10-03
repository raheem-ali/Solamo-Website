"use client";

import React, { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SolamoHeader from "@/components/SolamoHeader";
import SolamoFooter from "@/components/SolamoFooter";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
const PLACEHOLDER = "https://via.placeholder.com/400";
// Where a product card links to (we will fix the single product page next)
const PRODUCT_LINK_PREFIX = "/shop";

// ---------- API types ----------
interface ApiProduct {
  id: number;
  slug: string;
  name: string;
  subtitle: string | null;
  regular_price: number | string;
  sale_price: number | string | null;
  stock_status: string;
  stock_quantity: number;
  images: string[];
  brand_id: number;
  brand_name: string;
  category_id: number | null;
  category_name: string | null;
}

interface ApiCategory {
  id: number;
  name: string;
  slug: string;
}

// ---------- helpers ----------
const slugify = (s: string) =>
  (s || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

function priceInfo(p: ApiProduct) {
  const regular = Number(p.regular_price) || 0;
  const sale = p.sale_price != null ? Number(p.sale_price) : 0;
  const onSale = sale > 0 && sale < regular;
  return { regular, current: onSale ? sale : regular, onSale };
}

/** Loads every page of products (50 per request) */
async function fetchAllProducts(): Promise<ApiProduct[]> {
  const all: ApiProduct[] = [];
  for (let page = 1; page <= 40; page++) {
    const res = await fetch(`${API_URL}/products?per_page=50&page=${page}`, {
      headers: { Accept: "application/json" },
    });
    if (!res.ok) throw new Error(`Products request failed (HTTP ${res.status})`);
    const json = await res.json();
    const rows: ApiProduct[] = Array.isArray(json?.data) ? json.data : [];
    all.push(...rows);
    if (!json?.last_page || Number(json.current_page) >= Number(json.last_page)) break;
  }
  return all;
}

// ---------- image carousel for a card (arrows show on hover; always visible on touch screens) ----------
function CardCarousel({ images, alt, href }: { images: string[]; alt: string; href: string }) {
  const list = images && images.length ? images : [PLACEHOLDER];
  const [index, setIndex] = useState(0);
  const safe = index < list.length ? index : 0;

  const go = (dir: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex((safe + dir + list.length) % list.length);
  };

  const arrowCls =
    "absolute top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow transition-opacity hover:bg-white opacity-100 md:opacity-0 md:group-hover:opacity-100";

  return (
    <div className="relative h-56 w-full bg-[#f4f7f2]">
      <a href={href} className="flex h-full w-full items-center justify-center">
        <img src={list[safe]} alt={alt} className="h-full w-full object-contain p-4" />
      </a>

      {list.length > 1 && (
        <>
          <button type="button" onClick={go(-1)} aria-label="Previous image" className={`${arrowCls} left-2`}>
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button type="button" onClick={go(1)} aria-label="Next image" className={`${arrowCls} right-2`}>
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <div className="pointer-events-none absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-1">
            {list.map((_, i) => (
              <span key={i} className={`h-1.5 w-1.5 rounded-full ${i === safe ? "bg-lime-500" : "bg-gray-300"}`} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ---------- product card ----------
function DbProductCard({ product }: { product: ApiProduct }) {
  const { regular, current, onSale } = priceInfo(product);
  const href = `${PRODUCT_LINK_PREFIX}/${slugify(product.brand_name)}/${product.slug}`;
  const inStock = product.stock_status === "in_stock";

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-shadow hover:shadow-lg">
      <div className="relative">
        <CardCarousel images={product.images} alt={product.name} href={href} />
        {onSale && (
          <span className="pointer-events-none absolute left-3 top-3 z-10 rounded-full bg-lime-500 px-2.5 py-1 text-xs font-bold text-white">
            {Math.round((1 - current / regular) * 100)}% OFF
          </span>
        )}
        {!inStock && (
          <span className="pointer-events-none absolute right-3 top-3 z-10 rounded-full bg-gray-800 px-2.5 py-1 text-xs font-bold text-white">
            Out of stock
          </span>
        )}
      </div>

      <a href={href} className="flex flex-1 flex-col gap-1.5 p-4">
        <span className="text-xs font-semibold uppercase tracking-wide text-lime-700">{product.brand_name}</span>
        <h3 className="line-clamp-2 text-base font-semibold leading-snug text-gray-900">{product.name}</h3>
        {product.subtitle && <p className="line-clamp-1 text-xs text-gray-500">{product.subtitle}</p>}

        <div className="mt-auto pt-3">
          {current > 0 ? (
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-gray-900">Rs {current.toLocaleString()}</span>
              {onSale && <span className="text-xs text-gray-400 line-through">Rs {regular.toLocaleString()}</span>}
            </div>
          ) : (
            <span className="text-sm font-semibold text-gray-600">Price on Request</span>
          )}
        </div>
      </a>
    </div>
  );
}

// ---------- page ----------
function ShopPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initial filter state from the URL
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    (searchParams.get("categories") || "").split(",").filter(Boolean),
  );
  const [selectedBrands, setSelectedBrands] = useState<string[]>(
    (searchParams.get("brands") || "").split(",").filter(Boolean),
  );
  const [minPrice, setMinPrice] = useState<string>(searchParams.get("min") || "");
  const [maxPrice, setMaxPrice] = useState<string>(searchParams.get("max") || "");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Data from the API
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    (async () => {
      try {
        const [rows, catRes] = await Promise.all([
          fetchAllProducts(),
          fetch(`${API_URL}/products/categories`, { headers: { Accept: "application/json" } }),
        ]);
        if (cancelled) return;
        setProducts(rows);

        if (catRes.ok) {
          const cats = await catRes.json();
          setCategories(Array.isArray(cats) ? cats : []);
        }
      } catch (e: any) {
        if (cancelled) return;
        setError(
          `${e?.message || "Could not load products."} Tried: ${API_URL}/products. ` +
            `Check that the backend is running and that CORS allows this site.`,
        );
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [reloadKey]);

  // Update the URL query string when filters change
  const updateUrlParams = (cats: string[], brands: string[], min: string, max: string) => {
    const params = new URLSearchParams();
    if (cats.length) params.set("categories", cats.join(","));
    if (brands.length) params.set("brands", brands.join(","));
    if (min) params.set("min", min);
    if (max) params.set("max", max);
    const q = params.toString();
    router.push(q ? `/shop?${q}` : "/shop", { scroll: false });
  };

  // Sidebar options
  const availableCategories = useMemo(() => {
    const names = categories.map((c) => c.name);
    // include categories seen on products even if the categories call failed
    products.forEach((p) => {
      if (p.category_name && !names.includes(p.category_name)) names.push(p.category_name);
    });
    return names.sort((a, b) => a.localeCompare(b));
  }, [categories, products]);

  const availableBrands = useMemo(
    () => Array.from(new Set(products.map((p) => p.brand_name).filter(Boolean))).sort((a, b) => a.localeCompare(b)),
    [products],
  );

  const toggle = (list: string[], value: string) =>
    list.includes(value) ? list.filter((x) => x !== value) : [...list, value];

  const handleCategoryChange = (name: string) => {
    const next = toggle(selectedCategories, name);
    setSelectedCategories(next);
    updateUrlParams(next, selectedBrands, minPrice, maxPrice);
  };

  const handleBrandChange = (name: string) => {
    const next = toggle(selectedBrands, name);
    setSelectedBrands(next);
    updateUrlParams(selectedCategories, next, minPrice, maxPrice);
  };

  const handleMinPriceChange = (val: string) => {
    setMinPrice(val);
    updateUrlParams(selectedCategories, selectedBrands, val, maxPrice);
  };

  const handleMaxPriceChange = (val: string) => {
    setMaxPrice(val);
    updateUrlParams(selectedCategories, selectedBrands, minPrice, val);
  };

  // Apply filters
  const filteredProducts = products.filter((p) => {
    const cat = (p.category_name || "").toLowerCase();
    const matchesCategory =
      selectedCategories.length === 0 || selectedCategories.some((c) => c.toLowerCase() === cat);

    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(p.brand_name);

    const price = priceInfo(p).current;
    const min = minPrice === "" ? 0 : Number(minPrice);
    const max = maxPrice === "" ? Infinity : Number(maxPrice);

    return matchesCategory && matchesBrand && price >= min && price <= max;
  });

  const renderFilterContent = (isMobile = false) => (
    <>
      {isMobile && (
        <div className="flex justify-between items-center mb-6 border-b pb-3">
          <h3 className="font-bold text-xl text-gray-900">Filters</h3>
          <button onClick={() => setIsMobileFilterOpen(false)} className="text-gray-500 hover:text-gray-900 p-1">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* Categories */}
      <div className="mb-6">
        <h3 className="font-bold text-lg mb-4 text-gray-900">Product Categories</h3>
        <div className="space-y-2.5">
          {availableCategories.length === 0 && <p className="text-sm text-gray-400">No categories</p>}
          {availableCategories.map((name) => (
            <label key={name} className="flex items-center gap-2.5 text-sm text-gray-800 cursor-pointer hover:text-lime-700">
              <input
                type="checkbox"
                checked={selectedCategories.includes(name)}
                onChange={() => handleCategoryChange(name)}
                className="w-4 h-4 rounded border-gray-300 text-lime-600 focus:ring-lime-500"
              />
              <span>{name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div className="mb-6 pt-5 border-t border-gray-200">
        <h3 className="font-bold text-lg mb-4 text-gray-900">Brands</h3>
        <div className="space-y-2.5">
          {availableBrands.length === 0 && <p className="text-sm text-gray-400">No brands</p>}
          {availableBrands.map((name) => (
            <label key={name} className="flex items-center gap-2.5 text-sm text-gray-800 cursor-pointer hover:text-lime-700">
              <input
                type="checkbox"
                checked={selectedBrands.includes(name)}
                onChange={() => handleBrandChange(name)}
                className="w-4 h-4 rounded border-gray-300 text-lime-600 focus:ring-lime-500"
              />
              <span>{name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div className="pt-5 border-t border-gray-200">
        <h3 className="font-bold text-lg mb-4 text-gray-900">Price</h3>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => handleMinPriceChange(e.target.value)}
            className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-lime-500"
          />
          <span className="text-gray-400">–</span>
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => handleMaxPriceChange(e.target.value)}
            className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-lime-500"
          />
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SolamoHeader />

      <main className="container mx-auto px-4 md:px-8 pt-16 pb-10 flex-grow">
        <div className="inline-flex items-center gap-2.5 border border-gray-300 rounded-full px-5 py-2 mb-4 text-sm font-semibold tracking-wider text-gray-600 uppercase">
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-lime-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 16h16" />
            <path d="M5 16l1.5-8h11L19 16" />
            <path d="M8 8l1 8" />
            <path d="M12 8v8" />
            <path d="M16 8l-1 8" />
            <path d="M3 19h18" />
            <path d="M12 19v2" />
          </svg>
          SHOP
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold mb-12 text-gray-900">
          All <span className="text-lime-500">Products</span>
        </h1>

        {/* Mobile filter button */}
        <div className="mb-6 lg:hidden">
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="flex items-center gap-2 bg-lime-500 hover:bg-lime-600 text-white font-medium px-5 py-2.5 rounded-md transition-colors shadow-sm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
            Filters
          </button>
        </div>

        {/* Mobile drawer */}
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="fixed inset-0 bg-black/50 transition-opacity" onClick={() => setIsMobileFilterOpen(false)} />
            <aside className="fixed inset-y-0 left-0 w-80 bg-[#f4f7f2] p-6 shadow-2xl overflow-y-auto z-50 flex flex-col">
              {renderFilterContent(true)}
            </aside>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          <aside className="hidden lg:block bg-[#f4f7f2] p-6 rounded-2xl w-full">{renderFilterContent(false)}</aside>

          <div className="lg:col-span-3">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-3">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-lime-500" />
                <p className="text-sm text-gray-500">Loading products...</p>
              </div>
            ) : error ? (
              <div className="rounded-xl border border-rose-200 bg-rose-50 p-5 text-rose-700">
                <p className="text-sm font-medium break-words">{error}</p>
                <button
                  onClick={() => setReloadKey((k) => k + 1)}
                  className="mt-3 rounded-lg bg-rose-100 px-4 py-2 text-sm font-semibold hover:bg-rose-200"
                >
                  Retry
                </button>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="py-12">
                <p className="text-2xl font-normal text-gray-900">No Products Found</p>
                {products.length === 0 && (
                  <p className="mt-2 text-sm text-gray-500">
                    The API returned no approved products. Check that the product, its brand and its shop are all approved.
                  </p>
                )}
              </div>
            ) : (
              <>
                <p className="mb-4 text-sm text-gray-500">
                  Showing {filteredProducts.length} of {products.length} products
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <DbProductCard key={product.id} product={product} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      <SolamoFooter />
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="text-gray-500">Loading...</div>
        </div>
      }
    >
      <ShopPageContent />
    </Suspense>
  );
}