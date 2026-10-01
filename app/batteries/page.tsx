"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { brandsData, Product } from "@/lib/brand-data";
import ProductCard from "@/components/ProductCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

function BatteriesPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read initial states from URL query parameters safely
  const brandsParam = searchParams.get("brands");
  const initialBrands = brandsParam
    ? brandsParam.split(",").filter(Boolean)
    : [];

  const initialMin = searchParams.get("min") || "";
  const initialMax = searchParams.get("max") || "";

  const [selectedBrands, setSelectedBrands] = useState<string[]>(initialBrands);
  const [minPrice, setMinPrice] = useState<string>(initialMin);
  const [maxPrice, setMaxPrice] = useState<string>(initialMax);

  // State for mobile filter slide-in drawer
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  // Helper function to update URL query parameters dynamically
  const updateUrlParams = (brands: string[], min: string, max: string) => {
    const params = new URLSearchParams();

    if (brands.length > 0) {
      params.set("brands", brands.join(","));
    }

    if (min) {
      params.set("min", min);
    }

    if (max) {
      params.set("max", max);
    }

    const queryStr = params.toString();
    const newUrl = queryStr ? `/batteries?${queryStr}` : "/batteries";

    router.push(newUrl, { scroll: false });
  };

  // Flatten all brand products into a single array safely
  const allProducts: Product[] = Object.values(brandsData).flatMap(
    (brand) => brand?.products || [],
  );

  // Flexible filter for Batteries
  const batteryProducts = allProducts.filter((product) => {
    if (!product || !product.category) return false;

    const cat = product.category.toLowerCase();

    return cat.includes("batter") || cat.includes("storage");
  });

  // Extract unique brand names to populate the sidebar filter dynamically
  const availableBrands = Object.values(brandsData)
    .map((brand) => brand.name)
    .filter(Boolean)
    .sort();

  // Handle brand checkbox toggle selection and update URL instantly
  const handleBrandChange = (brandName: string) => {
    let updatedBrands: string[];

    if (selectedBrands.includes(brandName)) {
      updatedBrands = selectedBrands.filter((b) => b !== brandName);
    } else {
      updatedBrands = [...selectedBrands, brandName];
    }

    setSelectedBrands(updatedBrands);

    updateUrlParams(updatedBrands, minPrice, maxPrice);
  };

  // Handle Min Price change and update URL
  const handleMinPriceChange = (val: string) => {
    setMinPrice(val);

    updateUrlParams(selectedBrands, val, maxPrice);
  };

  // Handle Max Price change and update URL
  const handleMaxPriceChange = (val: string) => {
    setMaxPrice(val);

    updateUrlParams(selectedBrands, minPrice, val);
  };

  // Filter products based on selected brands and price range inputs
  const filteredProducts = batteryProducts.filter((product) => {
    const brandEntry = Object.values(brandsData).find((brand) =>
      brand?.products?.some((p) => p.id === product.id),
    );

    const brandName = brandEntry ? brandEntry.name : "";

    const matchesBrand =
      selectedBrands.length === 0 || selectedBrands.includes(brandName);

    const price = product.price || 0;

    const min = minPrice === "" ? 0 : Number(minPrice);

    const max = maxPrice === "" ? Infinity : Number(maxPrice);

    const matchesPrice = price >= min && price <= max;

    return matchesBrand && matchesPrice;
  });

  // Reusable Filter Content component
  const renderFilterContent = (isMobile = false) => (
    <>
      {isMobile && (
        <div className="flex justify-between items-center mb-6 border-b pb-3">
          <h3 className="font-bold text-xl text-gray-900">Filters</h3>

          <button
            onClick={() => setIsMobileFilterOpen(false)}
            className="text-gray-500 hover:text-gray-900 p-1"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}

      {/* Brand Filter Section */}
      <div className="mb-6">
        <h3 className="font-bold text-lg mb-4 text-gray-900">Brands</h3>

        <div className="space-y-2.5">
          {availableBrands.map((brandName) => (
            <label
              key={brandName}
              className="flex items-center gap-2.5 text-sm text-gray-800 cursor-pointer hover:text-lime-700"
            >
              <input
                type="checkbox"
                checked={selectedBrands.includes(brandName)}
                onChange={() => handleBrandChange(brandName)}
                className="w-4 h-4 rounded border-gray-300 text-lime-600 focus:ring-lime-500"
              />

              <span>{brandName}</span>
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
      {/* Global Application Header */}
      <Header />

      {/* Main container */}
      <main className="container mx-auto px-4 md:px-8 pt-16 pb-10 flex-grow">
        {/* Category Badge */}
        <div className="inline-flex items-center gap-2.5 border border-gray-300 rounded-full px-5 py-2 mb-4 text-sm font-semibold tracking-wider text-gray-600 uppercase">
          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4 text-lime-600 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M4 16h16" />
            <path d="M5 16l1.5-8h11L19 16" />
            <path d="M8 8l1 8" />
            <path d="M12 8v8" />
            <path d="M16 8l-1 8" />
            <path d="M3 19h18" />
            <path d="M12 19v2" />
          </svg>
          CATEGORY
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl font-bold mb-10 text-gray-900">
          <span className="text-lime-500">Batteries</span>
        </h1>

        {/* Mobile Filter Toggle Button */}
        <div className="mb-6 lg:hidden">
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="flex items-center gap-2 bg-lime-500 hover:bg-lime-600 text-white font-medium px-5 py-2.5 rounded-md transition-colors shadow-sm"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
            Filters
          </button>
        </div>

        {/* Mobile Slide-in Drawer */}
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="fixed inset-0 bg-black/50 transition-opacity"
              onClick={() => setIsMobileFilterOpen(false)}
            />

            <aside className="fixed inset-y-0 left-0 w-80 bg-[#f4f7f2] p-6 shadow-2xl overflow-y-auto z-50 flex flex-col">
              {renderFilterContent(true)}
            </aside>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block bg-[#f4f7f2] p-6 rounded-2xl w-full">
            {renderFilterContent(false)}
          </aside>

          {/* Right Section: Product Grid */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="py-12">
                <p className="text-2xl font-normal text-gray-900">
                  No Products Found
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Global Application Footer */}
      <Footer />
    </div>
  );
}

export default function BatteriesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="text-gray-500">Loading...</div>
        </div>
      }
    >
      <BatteriesPageContent />
    </Suspense>
  );
}
