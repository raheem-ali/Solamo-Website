"use client";

import React, { useState, useMemo } from "react";
import { BrandData, Product } from "@/lib/brand-data";
import { SlidersHorizontal, X } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface BrandArchiveClientProps {
  brand: BrandData;
}

const CATEGORIES = [
  "Batteries",
  "Inverters",
  "Power Bank",
  "Solar Panel",
] as const;

export default function BrandArchiveClient({ brand }: BrandArchiveClientProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    );
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setMinPrice("");
    setMaxPrice("");
  };

  const filteredProducts = useMemo(() => {
    return brand.products.filter((product) => {
      if (
        selectedCategories.length > 0 &&
        !selectedCategories.includes(product.category)
      ) {
        return false;
      }
      if (minPrice !== "" && product.price < Number(minPrice)) {
        return false;
      }
      if (maxPrice !== "" && product.price > Number(maxPrice)) {
        return false;
      }
      return true;
    });
  }, [brand.products, selectedCategories, minPrice, maxPrice]);

  const FilterSidebarContent = () => (
    <>
      {/* Product Categories Section */}
      <div className="mb-6">
        <h3 className="font-bold text-lg mb-4 text-gray-900">
          Product Categories
        </h3>

        <div className="space-y-2.5">
          {CATEGORIES.map((cat) => (
            <label
              key={cat}
              className="flex items-center gap-2.5 text-sm text-gray-800 cursor-pointer hover:text-lime-700"
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat)}
                onChange={() => handleCategoryChange(cat)}
                className="w-4 h-4 rounded border-gray-300 text-lime-600 focus:ring-lime-500"
              />
              <span>{cat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Filter Section */}
      <div className="pt-5 border-t border-gray-200">
        <h3 className="font-bold text-lg mb-4 text-gray-900">Price</h3>

        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-lime-500"
          />

          <span className="text-gray-400">–</span>

          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-lime-500"
          />
        </div>
      </div>
    </>
  );

  return (
    <div className="flex flex-col min-h-screen bg-white text-[#172217]">
      <Header />

      <main className="flex-grow pb-24">
        {/* Top Banner Image (Dynamic per brand) */}
        {brand.bannerImage && (
          <div className="w-full flex justify-center bg-white py-4 sm:py-6 overflow-hidden">
            <div className="max-w-[1300px] w-full px-6 flex justify-center">
              <img
                src={brand.bannerImage}
                alt={brand.name}
                className="max-h-[120px] sm:max-h-[170px] w-auto object-contain"
              />
            </div>
          </div>
        )}

        <div className="max-w-[1300px] mx-auto px-6 space-y-8">
          {/* Mobile Filter Toggle Button */}
          <div className="flex lg:hidden justify-between items-center pb-4 border-b border-gray-100">
            <span className="text-sm font-medium text-gray-600">
              Showing {filteredProducts.length} results
            </span>
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="flex items-center gap-2 bg-lime-500 hover:bg-lime-600 text-white font-medium px-5 py-2.5 rounded-md transition-colors shadow-sm"
            >
              <SlidersHorizontal className="w-4 h-4" /> Filters
            </button>
          </div>

          {/* Mobile Off-Canvas Sidebar Overlay */}
          {isMobileFilterOpen && (
            <div className="fixed inset-0 z-50 lg:hidden flex">
              <div
                className="fixed inset-0 bg-black/50"
                onClick={() => setIsMobileFilterOpen(false)}
              />
              <div className="relative w-80 max-w-full bg-white h-full p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-lg">Filters</h3>
                    <button onClick={() => setIsMobileFilterOpen(false)}>
                      <X className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>
                  <FilterSidebarContent />
                </div>
                <div className="pt-6 border-t border-gray-100">
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="w-full bg-[#79B900] text-white font-semibold py-3 rounded-full text-sm shadow-md"
                  >
                    Show Results ({filteredProducts.length})
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Main Layout: 3 Columns Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
            {/* Desktop Filter Sidebar */}
            <aside className="hidden lg:block lg:col-span-1 bg-[#f4f7f2] p-6 rounded-2xl w-full sticky top-24">
              <FilterSidebarContent />
            </aside>

            {/* Product Grid */}
            <div className="lg:col-span-3">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
                  <p className="text-gray-500 font-medium">No Products Found</p>
                  <button
                    onClick={handleClearFilters}
                    className="mt-3 text-xs bg-[#79B900] text-white px-4 py-2 rounded-full font-medium"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <article
                      key={product.id}
                      className="e-loop-item border border-black/10 rounded-[5px] p-5 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-md transition-all flex flex-col justify-between"
                    >
                      <div>
                        {/* Product Image */}
                        <div className="w-full h-48 bg-white rounded flex items-center justify-center overflow-hidden mb-4">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        {/* Product Name */}
                        <h2 className="text-base font-bold text-[#172217] line-clamp-2 min-h-[48px]">
                          {product.name}
                        </h2>
                      </div>

                      <div className="mt-4 pt-4 border-t border-gray-100 space-y-4">
                        {/* Price section */}
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500 font-medium">
                            Price
                          </span>
                          <span className="font-bold text-[#79B900] text-base">
                            Rs{product.price.toLocaleString()}
                          </span>
                        </div>

                        {/* See Details button */}
                        <a
                          href={product.link}
                          className="block w-full text-center bg-[#79B900] hover:bg-[#689e00] text-white font-semibold py-2.5 rounded-full text-sm transition-colors"
                        >
                          See Details
                        </a>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <style jsx global>{`
        .e-loop-item {
          transition:
            opacity 0.35s ease,
            transform 0.35s ease;
        }
        .e-loop-item.cpf-hide {
          opacity: 0;
          transform: scale(0.92);
        }
      `}</style>
    </div>
  );
}
