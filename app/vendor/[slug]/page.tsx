'use client';

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Search, MapPin, Clock, Package, LayoutGrid, Table as TableIcon,
  ChevronLeft, ChevronRight, RotateCcw, Info, Phone, Mail,
  Building2, BadgeCheck, MessageCircle, Share2, UserCheck, Star,
} from "lucide-react";

import SolamoHeader from "@/components/SolamoHeader";
import BrandAdBanner from "@/components/BrandAdBanner";
import SolamoCtaBanner from "@/components/SolamoCtaBanner";
import SolamoFooter from "@/components/SolamoFooter";
import WhatsAppFloat from "@/components/WhatsAppFloat";

import {
  getAllProducts, ApiProductLite, priceInfo, slugify, tenantSlug,
  API_URL, PLACEHOLDER, PRODUCT_LINK_PREFIX,
} from "@/lib/api-products";

const PAGE_SIZE = 12;
const STOCK_OPTIONS = ["In Stock", "Out of Stock"] as const;
type StockLabel = (typeof STOCK_OPTIONS)[number];

function stockLabel(p: ApiProductLite): StockLabel {
  const s = String(p.stock_status || "").toLowerCase();
  const qty = Number(p.stock_quantity) || 0;
  if (s.includes("out") || (s !== "in_stock" && qty <= 0)) return "Out of Stock";
  return "In Stock";
}

const STOCK_STYLES: Record<StockLabel, string> = {
  "In Stock": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Out of Stock": "bg-red-50 text-red-700 border-red-200",
};

const digits = (s?: string | null) => (s || "").replace(/[^0-9]/g, "");

// Makes a relative image path (uploads/...) into a full URL on your API host
const API_ORIGIN = API_URL.replace(/\/api\/?$/, "");
const absUrl = (v?: string | null) => {
  if (!v) return null;
  if (/^(https?:)?\/\//i.test(v) || v.startsWith("data:")) return v;
  return `${API_ORIGIN}/${v.replace(/^\/+/, "")}`;
};

// Decodes %20 etc. safely, then slugifies so "solar%20house" -> "solar-house"
const readSlug = (raw: unknown) => {
  const s = String(raw ?? "");
  try {
    return slugify(decodeURIComponent(s));
  } catch {
    return slugify(s);
  }
};

export default function VendorPage() {
  const params = useParams();
  const vendorSlug = readSlug(params?.slug);

  const [products, setProducts] = useState<ApiProductLite[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"products" | "trust" | "about">("products");

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedStock, setSelectedStock] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [page, setPage] = useState(1);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getAllProducts()
      .then((all) => {
        if (cancelled) return;
        setProducts(
          all.filter(
            (p) => tenantSlug(p) === vendorSlug || slugify(p.tenant_name || "") === vendorSlug
          )
        );
      })
      .catch((e) => !cancelled && setError(e.message || "Could not load store"))
      .finally(() => !cancelled && setLoading(false));
    return () => { cancelled = true; };
  }, [vendorSlug]);

  // Shop details come from the first product (every product carries the tenant fields)
  const v = products[0];
  const shopName =
    v?.tenant_name || vendorSlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const phone = v?.tenant_phone || null;
  const whatsapp = digits(v?.tenant_whatsapp || v?.tenant_phone);
  const email = v?.tenant_email || null;
  const address = v?.tenant_address || null;
  const city = v?.tenant_city || null;
  const owner = v?.tenant_owner || null;
  const about = v?.tenant_about || null;
  const established = v?.tenant_established || null;

  // Profile image: profile image first, then logo
  const profileImage = absUrl(v?.tenant_profile_image || v?.tenant_logo);

  // Defaults: verified and 5 stars unless the API says otherwise
  const verified = v?.tenant_verified == null ? true : Boolean(Number(v.tenant_verified));
  const rating = Math.min(5, Math.max(0, Number(v?.tenant_rating ?? 5)));

  const hasTrust = !!(phone || whatsapp || email || address || city);

  const categoryOptions = useMemo(() => {
    const m = new Map<string, number>();
    products.forEach((p) => m.set(p.category_name || "Other", (m.get(p.category_name || "Other") || 0) + 1));
    return Array.from(m.entries());
  }, [products]);

  const brandOptions = useMemo(() => {
    const m = new Map<string, number>();
    products.forEach((p) => m.set(p.brand_name, (m.get(p.brand_name) || 0) + 1));
    return Array.from(m.entries());
  }, [products]);

  const toggle = (setter: React.Dispatch<React.SetStateAction<string[]>>, val: string) =>
    setter((prev) => (prev.includes(val) ? prev.filter((x) => x !== val) : [...prev, val]));

  const resetFilters = () => {
    setSearchQuery(""); setSelectedCategories([]); setSelectedBrands([]);
    setSelectedStock([]); setMinPrice(""); setMaxPrice(""); setSortBy("default");
  };

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase();
    const minVal = minPrice !== "" ? Number(minPrice) : 0;
    const maxVal = maxPrice !== "" ? Number(maxPrice) : Infinity;
    return products
      .filter((p) => {
        const price = priceInfo(p).current;
        return (
          (p.name.toLowerCase().includes(q) || p.brand_name.toLowerCase().includes(q)) &&
          (selectedCategories.length === 0 || selectedCategories.includes(p.category_name || "Other")) &&
          (selectedBrands.length === 0 || selectedBrands.includes(p.brand_name)) &&
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
  }, [products, searchQuery, selectedCategories, selectedBrands, selectedStock, minPrice, maxPrice, sortBy]);

  useEffect(() => { setPage(1); }, [searchQuery, selectedCategories, selectedBrands, selectedStock, minPrice, maxPrice, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const hasActiveFilters =
    selectedCategories.length > 0 || selectedBrands.length > 0 || selectedStock.length > 0 ||
    minPrice !== "" || maxPrice !== "" || searchQuery !== "";

  const productHref = (p: ApiProductLite) => `${PRODUCT_LINK_PREFIX}/${slugify(p.brand_name)}/${p.slug}`;

  const share = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  const StockBadge = ({ p }: { p: ApiProductLite }) => {
    const l = stockLabel(p);
    return <span className={`px-2 py-0.5 rounded-md text-[11px] font-semibold border ${STOCK_STYLES[l]}`}>{l}</span>;
  };

  const tabs: { id: "products" | "trust" | "about"; label: string; show: boolean }[] = [
    { id: "products", label: `Products Catalog (${products.length})`, show: true },
    { id: "trust", label: "Contact & Location", show: hasTrust },
    { id: "about", label: "About Store", show: !!(about || owner) },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col justify-between">
      <div>
        <SolamoHeader />

        {loading ? (
          <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="bg-white rounded-xl p-12 text-center border border-slate-200 text-sm text-slate-500">Loading store...</div>
          </div>
        ) : error ? (
          <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="bg-white rounded-xl p-12 text-center border border-red-200 text-sm text-red-600">{error}</div>
          </div>
        ) : products.length === 0 ? (
          <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="bg-white rounded-xl p-12 text-center border border-slate-200">
              <Info className="w-10 h-10 text-slate-400 mx-auto mb-3" />
              <h3 className="text-lg font-semibold">Store not found or has no products yet</h3>
              <Link href="/shop" className="inline-block mt-4 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-xs font-semibold rounded-lg">
                Back to shop
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* STORE HEADER */}
            <div className="bg-slate-900 text-white border-b border-slate-800">
              <div className="h-32 bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-900 opacity-90" />
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 -mt-14 relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
                    {/* PROFILE IMAGE */}
                    <div className="w-28 h-28 rounded-2xl bg-slate-800 text-[#8BC34A] flex items-center justify-center font-black text-3xl border-4 border-slate-900 shadow-2xl flex-shrink-0 overflow-hidden">
                      {profileImage ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={profileImage} alt={shopName} className="w-full h-full object-cover bg-white" />
                      ) : (
                        shopName.slice(0, 3).toUpperCase()
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">{shopName}</h1>
                        {verified && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            <BadgeCheck className="w-4 h-4 mr-1" /> Verified Seller
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1 pt-0.5">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i <= Math.round(rating) ? "text-amber-400 fill-amber-400" : "text-slate-600"}`}
                          />
                        ))}
                        <strong className="text-white text-xs ml-1">{rating.toFixed(1)}</strong>
                      </div>

                      <div className="flex flex-wrap items-center gap-y-1 gap-x-4 pt-1 text-xs text-slate-300">
                        {city && (
                          <span className="flex items-center font-semibold text-white">
                            <MapPin className="w-3.5 h-3.5 mr-1 text-emerald-400" />
                            {city}
                          </span>
                        )}
                        {address && (
                          <span className="flex items-center">
                            <Building2 className="w-3.5 h-3.5 mr-1 text-slate-400" />
                            {address}
                          </span>
                        )}
                        {established && (
                          <span className="flex items-center">
                            <Clock className="w-3.5 h-3.5 mr-1 text-slate-400" /> Established {established}
                          </span>
                        )}
                        <span className="flex items-center">
                          <Package className="w-3.5 h-3.5 mr-1 text-slate-400" /> {products.length} Products
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 bg-slate-800/80 p-3 rounded-2xl border border-slate-700/80">
                    {phone && (
                      <a href={`tel:${phone}`} className="px-4 py-2.5 bg-[#8BC34A] hover:bg-[#7cb33d] text-slate-900 font-bold rounded-xl text-xs flex items-center justify-center">
                        <Phone className="w-3.5 h-3.5 mr-2" /> {phone}
                      </a>
                    )}
                    {whatsapp && (
                      <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer"
                        className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center justify-center">
                        <MessageCircle className="w-3.5 h-3.5 mr-2" /> WhatsApp Shop
                      </a>
                    )}
                    <button onClick={share} className="px-3 py-2.5 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-xl text-xs flex items-center justify-center gap-1.5" title="Copy store link">
                      <Share2 className="w-4 h-4" /> {copied ? "Copied" : "Share"}
                    </button>
                  </div>
                </div>

                {/* TRUST BAR */}
                {verified && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-6 border-t border-slate-800 text-xs">
                    <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60 flex items-center space-x-3">
                      <BadgeCheck className="w-6 h-6 text-[#8BC34A] flex-shrink-0" />
                      <div>
                        <div className="font-bold text-white">Verified Seller</div>
                        <div className="text-[10px] text-slate-400">Checked by our team</div>
                      </div>
                    </div>
                    <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60 flex items-center space-x-3">
                      <Building2 className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                      <div>
                        <div className="font-bold text-white">Verified Shop</div>
                        <div className="text-[10px] text-slate-400">{city ? `Based in ${city}` : "Real store, real stock"}</div>
                      </div>
                    </div>
                    <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60 flex items-center space-x-3">
                      <Star className="w-6 h-6 text-amber-400 fill-amber-400 flex-shrink-0" />
                      <div>
                        <div className="font-bold text-white">{rating.toFixed(1)} Star Rated</div>
                        <div className="text-[10px] text-slate-400">Top-rated store</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* TABS */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex space-x-8 text-sm font-semibold overflow-x-auto">
                  {tabs.filter((t) => t.show).map((t) => (
                    <button key={t.id} onClick={() => setActiveTab(t.id)}
                      className={`py-4 border-b-2 transition-colors whitespace-nowrap ${
                        activeTab === t.id ? "border-[#8BC34A] text-slate-900 font-bold" : "border-transparent text-slate-500 hover:text-slate-800"
                      }`}>
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {/* PRODUCTS TAB */}
              {activeTab === "products" && (
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                  <aside className="lg:col-span-1 space-y-6 bg-white p-5 rounded-xl border border-slate-200 h-fit sticky top-20">
                    {owner && (
                      <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-200/80 space-y-2">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-xs border border-emerald-500 flex-shrink-0 overflow-hidden">
                            {profileImage ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={profileImage} alt={owner} className="w-full h-full object-cover" />
                            ) : (
                              owner.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase()
                            )}
                          </div>
                          <div>
                            <div className="font-bold text-xs text-slate-900 flex items-center">
                              {owner} {verified && <BadgeCheck className="w-3.5 h-3.5 text-emerald-600 ml-1" />}
                            </div>
                            <div className="text-[10px] text-slate-500">
                              Shop Owner{city ? ` · ${city}` : ""}
                            </div>
                          </div>
                        </div>
                        {phone && (
                          <div className="pt-2 border-t border-emerald-200/60 text-[11px] font-semibold text-emerald-800 flex items-center">
                            <Phone className="w-3 h-3 mr-1" /> {phone}
                          </div>
                        )}
                      </div>
                    )}

                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <h2 className="font-bold text-slate-900 text-base">Filter Catalog</h2>
                      {hasActiveFilters && (
                        <button onClick={resetFilters} className="text-xs text-slate-500 hover:text-[#8BC34A] flex items-center gap-1 font-medium">
                          <RotateCcw className="w-3 h-3" /> Reset
                        </button>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Search Store</label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input type="text" placeholder="Search product or brand..." value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8BC34A]" />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-3">Price Range (PKR)</h3>
                      <div className="grid grid-cols-2 gap-2 mb-2">
                        <input type="number" placeholder="Min" value={minPrice} onChange={(e) => setMinPrice(e.target.value)}
                          className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8BC34A]" />
                        <input type="number" placeholder="Max" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)}
                          className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8BC34A]" />
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {[
                          { l: "Under 50k", a: "0", b: "50000" },
                          { l: "50k - 300k", a: "50000", b: "300000" },
                          { l: "300k+", a: "300000", b: "" },
                        ].map((c) => (
                          <button key={c.l} onClick={() => { setMinPrice(c.a); setMaxPrice(c.b); }}
                            className="px-2 py-1 text-[10px] bg-slate-100 hover:bg-slate-200 rounded text-slate-600 font-medium">{c.l}</button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-3">Category</h3>
                      <div className="space-y-2.5">
                        {categoryOptions.map(([c, n]) => (
                          <label key={c} className="flex items-center space-x-2.5 cursor-pointer text-xs font-medium text-slate-700">
                            <input type="checkbox" checked={selectedCategories.includes(c)} onChange={() => toggle(setSelectedCategories, c)}
                              className="w-4 h-4 rounded border-slate-300 accent-[#8BC34A]" />
                            <span>{c}</span>
                            <span className="ml-auto text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-full">{n}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-3">Brand</h3>
                      <div className="space-y-2.5">
                        {brandOptions.map(([b, n]) => (
                          <label key={b} className="flex items-center space-x-2.5 cursor-pointer text-xs font-medium text-slate-700">
                            <input type="checkbox" checked={selectedBrands.includes(b)} onChange={() => toggle(setSelectedBrands, b)}
                              className="w-4 h-4 rounded border-slate-300 accent-[#8BC34A]" />
                            <span>{b}</span>
                            <span className="ml-auto text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-full">{n}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-3">Availability</h3>
                      <div className="space-y-2.5">
                        {STOCK_OPTIONS.map((s) => (
                          <label key={s} className="flex items-center space-x-2.5 cursor-pointer text-xs font-medium text-slate-700">
                            <input type="checkbox" checked={selectedStock.includes(s)} onChange={() => toggle(setSelectedStock, s)}
                              className="w-4 h-4 rounded border-slate-300 accent-[#8BC34A]" />
                            <span>{s}</span>
                            <span className="ml-auto text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-full">
                              {products.filter((p) => stockLabel(p) === s).length}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </aside>

                  <main className="lg:col-span-3 space-y-4">
                    <div className="bg-white p-3 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-3">
                      <div className="text-xs text-slate-500">
                        Showing <strong className="text-slate-800">{filtered.length}</strong> items from this store
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
                        <h3 className="text-lg font-semibold">No matching products</h3>
                        <button onClick={resetFilters} className="mt-4 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-xs font-semibold rounded-lg">
                          Clear Filters
                        </button>
                      </div>
                    ) : viewMode === "grid" ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {pageItems.map((p) => {
                          const { regular, current, onSale } = priceInfo(p);
                          return (
                            <div key={p.id} className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-md hover:border-[#8BC34A] transition-all flex flex-col">
                              <Link href={productHref(p)} className="block aspect-square bg-slate-50 rounded-lg overflow-hidden mb-3">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={p.images?.[0] || PLACEHOLDER} alt={p.name} className="w-full h-full object-contain" />
                              </Link>
                              <div className="flex items-center justify-between gap-2 mb-2">
                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-slate-100 text-slate-700 border border-slate-200 truncate">
                                  {p.category_name || "Other"}
                                </span>
                                <StockBadge p={p} />
                              </div>
                              <Link href={productHref(p)}>
                                <h3 className="font-bold text-slate-900 text-base leading-snug line-clamp-2 hover:text-[#6da02f]">{p.name}</h3>
                              </Link>
                              <p className="text-xs text-slate-500 mt-1">{p.brand_name}</p>
                              <div className="border-t border-slate-100 pt-3 mt-auto">
                                <div className="mt-3 text-xl font-extrabold text-slate-900">PKR {current.toLocaleString()}</div>
                                {onSale && <div className="text-xs text-slate-400 line-through">PKR {regular.toLocaleString()}</div>}
                                <Link href={productHref(p)}
                                  className="mt-3 w-full py-2 bg-[#8BC34A] hover:bg-[#7cb33d] text-slate-900 font-semibold text-xs rounded-lg flex items-center justify-center">
                                  View Product
                                </Link>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr className="bg-slate-100 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase">
                                <th className="py-3 px-4">Product</th>
                                <th className="py-3 px-4">Brand</th>
                                <th className="py-3 px-4">Category</th>
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
                                      <div className="font-bold text-slate-900">{p.name}</div>
                                    </div>
                                  </td>
                                  <td className="py-3.5 px-4 text-xs">{p.brand_name}</td>
                                  <td className="py-3.5 px-4 text-xs">
                                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">{p.category_name || "Other"}</span>
                                  </td>
                                  <td className="py-3.5 px-4 text-xs"><StockBadge p={p} /></td>
                                  <td className="py-3.5 px-4 text-right font-extrabold">{priceInfo(p).current.toLocaleString()}</td>
                                  <td className="py-3.5 px-4 text-center">
                                    <Link href={productHref(p)} className="px-3 py-1.5 bg-[#8BC34A] font-semibold text-xs rounded-md">View</Link>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {filtered.length > 0 && totalPages > 1 && (
                      <div className="mt-8 flex items-center justify-between border-t border-slate-200 pt-4">
                        <div className="text-xs text-slate-500">
                          Showing <strong className="text-slate-800">{pageItems.length}</strong> of{" "}
                          <strong className="text-slate-800">{filtered.length}</strong> items
                        </div>
                        <div className="flex items-center space-x-1">
                          <button disabled={page === 1} onClick={() => setPage((n) => n - 1)}
                            className="p-1.5 border border-slate-200 rounded-md text-slate-600 hover:bg-slate-100 disabled:text-slate-300 disabled:cursor-not-allowed">
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                            <button key={n} onClick={() => setPage(n)}
                              className={`px-3 py-1 rounded-md text-xs font-semibold ${n === page ? "bg-[#8BC34A] text-slate-900" : "text-slate-600 hover:bg-slate-100"}`}>
                              {n}
                            </button>
                          ))}
                          <button disabled={page === totalPages} onClick={() => setPage((n) => n + 1)}
                            className="p-1.5 border border-slate-200 rounded-md text-slate-600 hover:bg-slate-100 disabled:text-slate-300 disabled:cursor-not-allowed">
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </main>
                </div>
              )}

              {/* CONTACT & LOCATION TAB */}
              {activeTab === "trust" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {(phone || whatsapp || email) && (
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
                      <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
                        <Phone className="w-5 h-5 text-emerald-600" />
                        <h4 className="font-bold text-slate-900 text-sm">Contact Channels</h4>
                      </div>
                      <div className="space-y-3 text-xs">
                        {phone && (
                          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                            <span className="text-[10px] text-slate-400 block font-semibold uppercase">Phone</span>
                            <a href={`tel:${phone}`} className="font-bold text-slate-900 text-sm">{phone}</a>
                          </div>
                        )}
                        {whatsapp && (
                          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                            <span className="text-[10px] text-slate-400 block font-semibold uppercase">WhatsApp</span>
                            <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="font-bold text-slate-900 text-sm">
                              +{whatsapp}
                            </a>
                          </div>
                        )}
                        {email && (
                          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                            <span className="text-[10px] text-slate-400 font-semibold uppercase flex items-center gap-1">
                              <Mail className="w-3 h-3" /> Email
                            </span>
                            <a href={`mailto:${email}`} className="font-bold text-slate-900 text-xs break-all">{email}</a>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {(address || city) && (
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
                      <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
                        <Building2 className="w-5 h-5 text-amber-600" />
                        <h4 className="font-bold text-slate-900 text-sm">Shop Location</h4>
                      </div>
                      <div className="space-y-3 text-xs">
                        {city && (
                          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                            <span className="text-[10px] text-slate-400 block font-semibold uppercase">City</span>
                            <span className="font-bold text-slate-900 text-sm">{city}</span>
                          </div>
                        )}
                        {address && (
                          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                            <span className="text-[10px] text-slate-400 block font-semibold uppercase">Address</span>
                            <span className="font-medium text-slate-800">{address}</span>
                          </div>
                        )}
                      </div>
                      <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent([shopName, address, city].filter(Boolean).join(" "))}`}
                        target="_blank" rel="noopener noreferrer"
                        className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-lg text-xs flex items-center justify-center">
                        <MapPin className="w-3.5 h-3.5 mr-1.5 text-red-500" /> View on Google Maps
                      </a>
                    </div>
                  )}
                </div>
              )}

              {/* ABOUT TAB */}
              {activeTab === "about" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {owner && (
                    <div className="md:col-span-1 bg-white p-6 rounded-2xl border border-slate-200 text-center space-y-2">
                      <div className="w-20 h-20 mx-auto rounded-full bg-slate-900 text-[#8BC34A] flex items-center justify-center font-black text-2xl border-4 border-emerald-100 overflow-hidden">
                        {profileImage ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={profileImage} alt={owner} className="w-full h-full object-cover" />
                        ) : (
                          owner.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase()
                        )}
                      </div>
                      <h4 className="font-bold text-slate-900 text-base">{owner}</h4>
                      <p className="text-xs text-slate-500 flex items-center justify-center gap-1">
                        <UserCheck className="w-3.5 h-3.5" /> Shop Owner
                      </p>
                      {city && (
                        <p className="text-xs text-slate-500 flex items-center justify-center gap-1">
                          <MapPin className="w-3.5 h-3.5" /> {city}
                        </p>
                      )}
                    </div>
                  )}
                  {about && (
                    <div className={`${owner ? "md:col-span-2" : "md:col-span-3"} bg-white p-6 rounded-2xl border border-slate-200`}>
                      <h3 className="text-lg font-bold text-slate-900 mb-2">About {shopName}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">{about}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
          <BrandAdBanner />
        </div>
      </div>

      <div>
        <SolamoCtaBanner />
        <SolamoFooter />
        <WhatsAppFloat />
      </div>
    </div>
  );
}