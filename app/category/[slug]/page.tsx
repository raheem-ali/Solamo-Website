'use client';

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Search, Package, LayoutGrid, Table as TableIcon, Eye, ChevronLeft,
  ChevronRight, X, RotateCcw, Info, Layers,
} from "lucide-react";

import SolamoHeader from "@/components/SolamoHeader";
import BrandAdBanner from "@/components/BrandAdBanner";
import SolamoCtaBanner from "@/components/SolamoCtaBanner";
import SolamoFooter from "@/components/SolamoFooter";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { useCity } from "@/app/context/CityContext";

import {
  getAllProducts, ApiProductLite, priceInfo, slugify,
  PLACEHOLDER, PRODUCT_LINK_PREFIX,
} from "@/lib/api-products";

const PAGE_SIZE = 12;
const STOCK_OPTIONS = ["In Stock", "Low Stock", "Pre-Order", "Out of Stock"] as const;
type StockLabel = (typeof STOCK_OPTIONS)[number];

function stockLabel(p: ApiProductLite): StockLabel {
  const s = String(p.stock_status || "").toLowerCase();
  const qty = Number(p.stock_quantity) || 0;
  if (s.includes("pre") || s.includes("back")) return "Pre-Order";
  if (s.includes("out") || (s !== "in_stock" && qty <= 0)) return "Out of Stock";
  if (qty > 0 && qty <= 5) return "Low Stock";
  return "In Stock";
}

const STOCK_STYLES: Record<StockLabel, string> = {
  "In Stock": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Low Stock": "bg-amber-50 text-amber-700 border-amber-200",
  "Pre-Order": "bg-blue-50 text-blue-700 border-blue-200",
  "Out of Stock": "bg-red-50 text-red-700 border-red-200",
};

const StockBadge = ({ p }: { p: ApiProductLite }) => {
  const label = stockLabel(p);
  return (
    <span className={`px-2 py-0.5 rounded-md text-[11px] font-semibold border ${STOCK_STYLES[label]}`}>
      {label}
      {label === "Low Stock" ? ` (${p.stock_quantity})` : ""}
    </span>
  );
};

const PriceView = ({ p, large = false }: { p: ApiProductLite; large?: boolean }) => {
  const { regular, current, onSale } = priceInfo(p);
  return (
    <div>
      <div className={`${large ? "text-2xl" : "text-xl"} font-extrabold text-slate-900`}>
        PKR {current.toLocaleString()}
      </div>
      {onSale && (
        <div className="text-xs text-slate-400 line-through">PKR {regular.toLocaleString()}</div>
      )}
    </div>
  );
};

export default function CategoryShopPage() {
  const params = useParams();
  const categorySlug = String(params?.slug ?? params?.category ?? "").toLowerCase();

  // Selected city from the header ("" = All Cities)
  const { city } = useCity();

  const [allCategoryProducts, setAllCategoryProducts] = useState<ApiProductLite[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedStock, setSelectedStock] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [page, setPage] = useState(1);
  const [modalProduct, setModalProduct] = useState<ApiProductLite | null>(null);

  // Load only this category's products
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getAllProducts()
      .then((all) => {
        if (cancelled) return;
        setAllCategoryProducts(
          all.filter((p) => p.category_name && slugify(p.category_name) === categorySlug),
        );
      })
      .catch((e) => !cancelled && setError(e.message || "Could not load products"))
      .finally(() => !cancelled && setLoading(false));
    return () => { cancelled = true; };
  }, [categorySlug]);

  const categoryName =
    allCategoryProducts[0]?.category_name ||
    categorySlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  // Brands come from this category's real products
  const brandOptions = useMemo(() => {
    const map = new Map<string, number>();
    allCategoryProducts.forEach((p) => {
      const b = p.brand_name || "Other";
      map.set(b, (map.get(b) || 0) + 1);
    });
    return Array.from(map.entries()).sort((a, b) => a[0].localeCompare(b[0]));
  }, [allCategoryProducts]);

  const toggle = (setter: React.Dispatch<React.SetStateAction<string[]>>, v: string) =>
    setter((prev) => (prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]));

  const resetFilters = () => {
    setSearchQuery(""); setSelectedBrands([]); setSelectedStock([]);
    setMinPrice(""); setMaxPrice(""); setSortBy("default");
  };

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase();
    const minVal = minPrice !== "" ? Number(minPrice) : 0;
    const maxVal = maxPrice !== "" ? Number(maxPrice) : Infinity;

    return allCategoryProducts
      .filter((p) => {
        const price = priceInfo(p).current;
        return (
          (p.name.toLowerCase().includes(q) || (p.subtitle || "").toLowerCase().includes(q)) &&
          (selectedBrands.length === 0 || selectedBrands.includes(p.brand_name || "Other")) &&
          (selectedStock.length === 0 || selectedStock.includes(stockLabel(p))) &&
          price >= minVal && price <= maxVal
        );
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return priceInfo(a).current - priceInfo(b).current;
        if (sortBy === "price-high") return priceInfo(b).current - priceInfo(a).current;
        if (sortBy === "name-asc") return a.name.localeCompare(b.name);
        return 0;
      });
  }, [allCategoryProducts, searchQuery, selectedBrands, selectedStock, minPrice, maxPrice, sortBy]);

  // Back to page 1 whenever filters change
  useEffect(() => { setPage(1); }, [searchQuery, selectedBrands, selectedStock, minPrice, maxPrice, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const hasActiveFilters =
    selectedBrands.length > 0 || selectedStock.length > 0 ||
    minPrice !== "" || maxPrice !== "" || searchQuery !== "";

  // Product pages live at PRODUCT_LINK_PREFIX/<brand-slug>/<product-slug>
  const productHref = (p: ApiProductLite) =>
    `${PRODUCT_LINK_PREFIX}/${slugify(p.brand_name || "")}/${p.slug}`;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col justify-between">
      <div>
        <SolamoHeader />

        {/* Category header */}
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-xl bg-slate-900 text-[#8BC34A] flex items-center justify-center font-bold text-xl border border-slate-700 flex-shrink-0 overflow-hidden">
                {allCategoryProducts[0]?.images?.[0] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={allCategoryProducts[0].images[0]} alt={categoryName} className="w-full h-full object-contain bg-white" />
                ) : (
                  categoryName.slice(0, 3).toUpperCase()
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">{categoryName}</h1>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs text-slate-500">
                  <span className="flex items-center">
                    <Package className="w-3.5 h-3.5 mr-1" />
                    {allCategoryProducts.length} Products
                  </span>
                  <span className="flex items-center">
                    <Layers className="w-3.5 h-3.5 mr-1" />
                    {brandOptions.length} {brandOptions.length === 1 ? "Brand" : "Brands"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Catalog */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {loading ? (
            <div className="bg-white rounded-xl p-12 text-center border border-slate-200 text-sm text-slate-500">
              Loading products...
            </div>
          ) : error ? (
            <div className="bg-white rounded-xl p-12 text-center border border-red-200 text-sm text-red-600">
              {error}
            </div>
          ) : allCategoryProducts.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center border border-slate-200">
              <Info className="w-10 h-10 text-slate-400 mx-auto mb-3" />
              <h3 className="text-lg font-semibold">
                {city ? `No products found in ${city}` : "No products in this category yet"}
              </h3>
              {city && (
                <p className="text-sm text-slate-500 mt-1">
                  Try selecting another city from the header.
                </p>
              )}
              <div className="flex items-center justify-center gap-2 mt-4">
                <Link href="/category" className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-xs font-semibold rounded-lg">
                  All categories
                </Link>
                <Link href="/shop" className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-xs font-semibold rounded-lg">
                  Back to shop
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar */}
              <aside className="lg:col-span-1 space-y-6 bg-white p-5 rounded-xl border border-slate-200 h-fit sticky top-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h2 className="font-bold text-slate-900 text-base">Filters</h2>
                  {hasActiveFilters && (
                    <button onClick={resetFilters} className="text-xs text-slate-500 hover:text-[#8BC34A] flex items-center gap-1 font-medium">
                      <RotateCcw className="w-3 h-3" /> Reset
                    </button>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Search Item</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text" placeholder="Search product..." value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8BC34A]"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-3">Price Range (PKR)</h3>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <input type="number" placeholder="Min" value={minPrice} onChange={(e) => setMinPrice(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8BC34A]" />
                    <input type="number" placeholder="Max" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8BC34A]" />
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { label: "Under 50k", min: "0", max: "50000" },
                      { label: "50k - 300k", min: "50000", max: "300000" },
                      { label: "300k+", min: "300000", max: "" },
                    ].map((c) => (
                      <button key={c.label} onClick={() => { setMinPrice(c.min); setMaxPrice(c.max); }}
                        className="px-2 py-1 text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-md font-medium">
                        {c.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-3">Brand</h3>
                  <div className="space-y-2.5">
                    {brandOptions.map(([brand, count]) => (
                      <label key={brand} className="flex items-center space-x-2.5 cursor-pointer text-xs font-medium text-slate-700">
                        <input type="checkbox" checked={selectedBrands.includes(brand)}
                          onChange={() => toggle(setSelectedBrands, brand)}
                          className="w-4 h-4 rounded border-slate-300 accent-[#8BC34A]" />
                        <span>{brand}</span>
                        <span className="ml-auto text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-full">{count}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-3">Availability</h3>
                  <div className="space-y-2.5">
                    {STOCK_OPTIONS.map((status) => (
                      <label key={status} className="flex items-center space-x-2.5 cursor-pointer text-xs font-medium text-slate-700">
                        <input type="checkbox" checked={selectedStock.includes(status)}
                          onChange={() => toggle(setSelectedStock, status)}
                          className="w-4 h-4 rounded border-slate-300 accent-[#8BC34A]" />
                        <span>{status}</span>
                        <span className="ml-auto text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-full">
                          {allCategoryProducts.filter((p) => stockLabel(p) === status).length}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </aside>

              {/* Main */}
              <main className="lg:col-span-3 space-y-4">
                <div className="bg-white p-3 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-3">
                  <div className="text-xs text-slate-500">
                    Showing <strong className="text-slate-800">{filtered.length}</strong> products
                  </div>
                  <div className="flex items-center space-x-3">
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
                      className="px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#8BC34A]">
                      <option value="default">Sort: Default</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="name-asc">Name: A to Z</option>
                    </select>
                    <div className="flex items-center border border-slate-200 rounded-lg p-0.5 bg-slate-100">
                      {(["grid", "table"] as const).map((m) => (
                        <button key={m} onClick={() => setViewMode(m)}
                          className={`p-1.5 rounded-md text-xs flex items-center transition-all ${
                            viewMode === m ? "bg-white text-slate-900 shadow-sm font-semibold" : "text-slate-500 hover:text-slate-800"
                          }`}>
                          {m === "grid" ? <LayoutGrid className="w-4 h-4 mr-1" /> : <TableIcon className="w-4 h-4 mr-1" />}
                          {m === "grid" ? "Grid" : "Table"}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {filtered.length === 0 ? (
                  <div className="bg-white rounded-xl p-12 text-center border border-slate-200">
                    <Info className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                    <h3 className="text-lg font-semibold">No products found</h3>
                    <p className="text-sm text-slate-500 mt-1">No items match your selected filters.</p>
                    <button onClick={resetFilters} className="mt-4 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-xs font-semibold rounded-lg">
                      Clear All Filters
                    </button>
                  </div>
                ) : viewMode === "grid" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {pageItems.map((p) => (
                      <div key={p.id} className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-md hover:border-[#8BC34A] transition-all flex flex-col">
                        <Link href={productHref(p)} className="block aspect-square bg-slate-50 rounded-lg overflow-hidden mb-3">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={p.images?.[0] || PLACEHOLDER} alt={p.name} className="w-full h-full object-contain" />
                        </Link>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-slate-100 text-slate-700 border border-slate-200 truncate">
                            {p.brand_name || "Other"}
                          </span>
                          <StockBadge p={p} />
                        </div>
                        <Link href={productHref(p)}>
                          <h3 className="font-bold text-slate-900 text-base leading-snug line-clamp-2 hover:text-[#6da02f]">{p.name}</h3>
                        </Link>
                        {p.subtitle && <p className="text-xs text-slate-500 mt-1 line-clamp-2">{p.subtitle}</p>}

                        <div className="border-t border-slate-100 pt-3 mt-auto">
                          <div className="mt-3"><PriceView p={p} /></div>
                          <div className="grid grid-cols-2 gap-2 mt-3">
                            <Link href={productHref(p)}
                              className="py-2 px-2 bg-[#8BC34A] hover:bg-[#7cb33d] text-slate-900 font-semibold text-xs rounded-lg flex items-center justify-center">
                              View Product
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-100 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                            <th className="py-3 px-4">Product</th>
                            <th className="py-3 px-4">Brand</th>
                            <th className="py-3 px-4">Status</th>
                            <th className="py-3 px-4 text-right">Price (PKR)</th>
                            <th className="py-3 px-4 text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 text-sm">
                          {pageItems.map((p) => (
                            <tr key={p.id} className="hover:bg-slate-50">
                              <td className="py-3.5 px-4">
                                <div className="flex items-center gap-3">
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img src={p.images?.[0] || PLACEHOLDER} alt="" className="w-10 h-10 object-contain bg-slate-50 rounded" />
                                  <div>
                                    <div className="font-bold text-slate-900">{p.name}</div>
                                    {p.subtitle && <div className="text-xs text-slate-400">{p.subtitle}</div>}
                                  </div>
                                </div>
                              </td>
                              <td className="py-3.5 px-4 text-xs">
                                <span className="px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200 font-medium">
                                  {p.brand_name || "Other"}
                                </span>
                              </td>
                              <td className="py-3.5 px-4 text-xs"><StockBadge p={p} /></td>
                              <td className="py-3.5 px-4 text-right font-extrabold">
                                {priceInfo(p).current.toLocaleString()}
                              </td>
                              <td className="py-3.5 px-4">
                                <div className="flex items-center justify-center space-x-2">
                                  <button onClick={() => setModalProduct(p)} className="p-1.5 bg-slate-100 hover:bg-slate-200 rounded-md" title="Quick View">
                                    <Eye className="w-4 h-4" />
                                  </button>
                                  <Link href={productHref(p)} className="px-3 py-1.5 bg-[#8BC34A] hover:bg-[#7cb33d] font-semibold text-xs rounded-md">
                                    View
                                  </Link>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Pagination */}
                {filtered.length > 0 && (
                  <div className="mt-8 flex items-center justify-between border-t border-slate-200 pt-4">
                    <div className="text-xs text-slate-500">
                      Showing <strong className="text-slate-800">{pageItems.length}</strong> of{" "}
                      <strong className="text-slate-800">{filtered.length}</strong> items
                    </div>
                    {totalPages > 1 && (
                      <div className="flex items-center space-x-1">
                        <button disabled={page === 1} onClick={() => setPage((n) => n - 1)}
                          className="p-1.5 border border-slate-200 rounded-md text-slate-600 hover:bg-slate-100 disabled:text-slate-300 disabled:cursor-not-allowed">
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                          <button key={n} onClick={() => setPage(n)}
                            className={`px-3 py-1 rounded-md text-xs font-semibold ${
                              n === page ? "bg-[#8BC34A] text-slate-900" : "text-slate-600 hover:bg-slate-100"
                            }`}>
                            {n}
                          </button>
                        ))}
                        <button disabled={page === totalPages} onClick={() => setPage((n) => n + 1)}
                          className="p-1.5 border border-slate-200 rounded-md text-slate-600 hover:bg-slate-100 disabled:text-slate-300 disabled:cursor-not-allowed">
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </main>
            </div>
          )}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
          <BrandAdBanner />
        </div>
      </div>

      <div>
        <SolamoCtaBanner />
        <SolamoFooter />
        <WhatsAppFloat />
      </div>

      {/* Quick view modal */}
      {modalProduct && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4" onClick={() => setModalProduct(null)}>
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setModalProduct(null)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100">
              <X className="w-5 h-5" />
            </button>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={modalProduct.images?.[0] || PLACEHOLDER} alt={modalProduct.name}
              className="w-full h-48 object-contain bg-slate-50 rounded-lg mb-4" />

            <div className="flex items-center space-x-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase bg-slate-100 text-slate-700">
                {modalProduct.brand_name || "Other"}
              </span>
              <StockBadge p={modalProduct} />
            </div>

            <h2 className="text-xl font-bold text-slate-900 mb-1">{modalProduct.name}</h2>
            {modalProduct.subtitle && <p className="text-sm text-slate-500 mb-4">{modalProduct.subtitle}</p>}

            <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
              <PriceView p={modalProduct} large />
              <Link href={productHref(modalProduct)}
                className="px-5 py-2.5 bg-[#8BC34A] hover:bg-[#7cb33d] text-slate-900 font-bold rounded-xl text-sm">
                View Full Details
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}