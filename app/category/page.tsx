"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Search, Package, LayoutGrid, Info, ArrowUpRight } from "lucide-react";

import SolamoHeader from "@/components/SolamoHeader";
import SolamoFooter from "@/components/SolamoFooter";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { useCity } from "@/app/context/CityContext";

import {
  getAllProducts,
  slugify,
  PLACEHOLDER,
  type ApiProductLite,
} from "@/lib/api-products";

type CategoryCard = {
  slug: string;
  name: string;
  image: string;
  count: number;
};

export default function AllCategoriesPage() {
  // Selected city from the header ("" = All Cities)
  const { city } = useCity();

  const [categories, setCategories] = useState<CategoryCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  // Every category that has products (getAllProducts uses the city saved by the header)
  useEffect(() => {
    let alive = true;
    setLoading(true);
    getAllProducts()
      .then((all: ApiProductLite[]) => {
        const map = new Map<string, CategoryCard>();
        for (const p of all) {
          if (!p.category_name) continue;
          const slug = slugify(p.category_name);
          const existing = map.get(slug);
          if (existing) {
            existing.count += 1;
            // use the first real product image we find
            if (existing.image === PLACEHOLDER && p.images?.[0]) {
              existing.image = p.images[0];
            }
          } else {
            map.set(slug, {
              slug,
              name: p.category_name,
              image: p.images?.[0] || PLACEHOLDER,
              count: 1,
            });
          }
        }
        if (alive) {
          setCategories(
            Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name)),
          );
        }
      })
      .catch((e) => {
        if (alive) setError(e?.message || "Could not load categories");
      })
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, []);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? categories.filter((c) => c.name.toLowerCase().includes(q)) : categories;
  }, [categories, query]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col justify-between">
      <div>
        <SolamoHeader />

        {/* Page title */}
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#84CC16] flex items-center justify-center shrink-0">
                  <LayoutGrid className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">All Categories</h1>
                  <p className="text-xs text-slate-500 mt-1">
                    {loading
                      ? "Loading categories..."
                      : `${categories.length} ${categories.length === 1 ? "category" : "categories"}${
                          city ? ` available in ${city}` : " available"
                        }`}
                  </p>
                </div>
              </div>

              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search categories..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8BC34A]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Category grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {loading ? (
            <div className="bg-white rounded-xl p-12 text-center border border-slate-200 text-sm text-slate-500">
              Loading categories...
            </div>
          ) : error ? (
            <div className="bg-white rounded-xl p-12 text-center border border-red-200 text-sm text-red-600">
              {error}
            </div>
          ) : categories.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center border border-slate-200">
              <Info className="w-10 h-10 text-slate-400 mx-auto mb-3" />
              <h3 className="text-lg font-semibold">
                {city ? `No categories found in ${city}` : "No categories available right now"}
              </h3>
              {city && (
                <p className="text-sm text-slate-500 mt-1">
                  Try selecting another city from the header.
                </p>
              )}
              <Link
                href="/shop"
                className="inline-block mt-4 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-xs font-semibold rounded-lg"
              >
                Back to shop
              </Link>
            </div>
          ) : visible.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center border border-slate-200">
              <Info className="w-10 h-10 text-slate-400 mx-auto mb-3" />
              <h3 className="text-lg font-semibold">No categories found</h3>
              <p className="text-sm text-slate-500 mt-1">
                No category matches &ldquo;{query}&rdquo;.
              </p>
              <button
                onClick={() => setQuery("")}
                className="mt-4 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-xs font-semibold rounded-lg"
              >
                Clear search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
              {visible.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="group block bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-[#8BC34A] hover:shadow-md transition"
                >
                  <div className="h-[110px] sm:h-[130px] bg-slate-50 flex items-center justify-center overflow-hidden p-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={cat.image}
                      alt={`${cat.name} products`}
                      loading="lazy"
                      className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="px-3 py-3 border-t border-slate-100">
                    <h3 className="text-[13px] font-bold text-slate-900 truncate">
                      {cat.name}
                    </h3>
                    <div className="flex items-center justify-between mt-1">
                      <span className="flex items-center gap-1 text-[11px] text-slate-500">
                        <Package className="w-3 h-3 text-slate-400 shrink-0" />
                        {cat.count} {cat.count === 1 ? "Product" : "Products"}
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#6da02f] transition-colors" />
                    </div>
                  </div>

                  <div className="h-1 bg-[#84CC16] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <div>
        <SolamoFooter />
        <WhatsAppFloat />
      </div>
    </div>
  );
}