"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Shape of one product on the shop page (built from the Laravel API in page.tsx)
export type CardProduct = {
  id: number;
  slug: string;
  link: string;
  name: string;
  shortDescription: string;
  price: number;
  regularPrice: number;
  salePrice: number | null;
  image: string;
  images: string[];
  category: string;
  brand: string;
  inStock: boolean;
};

export type BrandOption = { name: string; slug: string };

type Props = {
  products: CardProduct[];
  categories: string[];
  brands: BrandOption[];
  // Brands ticked from the start, used on /shop/{brand}
  initialBrands?: string[];
  // On /shop/{brand}: show only that brand in the Brands filter
  lockBrand?: boolean;
  // On /{category}: show only that category in the Categories filter.
  // matchNames = the category plus its sub-categories.
  lockCategory?: { name: string; slug: string; matchNames: string[] };
  // Heading text, e.g. "Solar Panel" -> "Solar Panel Products"
  title?: string;
};

function ShopPageContent({
  products,
  categories,
  brands,
  initialBrands: presetBrands = [],
  lockBrand = false,
  lockCategory,
  title,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read initial states from URL query parameters safely
  const categoriesParam = searchParams.get("categories");
  const initialCategories = categoriesParam
    ? categoriesParam.split(",").filter(Boolean)
    : lockCategory
      ? [lockCategory.name]
      : [];

  const brandsParam = searchParams.get("brands");
  const initialBrands = brandsParam
    ? brandsParam.split(",").filter(Boolean)
    : presetBrands;

  const initialMin = searchParams.get("min") || "";
  const initialMax = searchParams.get("max") || "";

  const [selectedCategories, setSelectedCategories] =
    useState<string[]>(initialCategories);
  const [selectedBrands, setSelectedBrands] = useState<string[]>(initialBrands);
  const [minPrice, setMinPrice] = useState<string>(initialMin);
  const [maxPrice, setMaxPrice] = useState<string>(initialMax);

  // State for mobile filter slide-in drawer
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  const allBrandOptions = brands;

  // Set only on /shop/{brand}
  const lockedBrand =
    lockBrand && presetBrands.length === 1
      ? allBrandOptions.find((b) => b.name === presetBrands[0])
      : undefined;

  // Helper function to update URL query parameters dynamically
  const updateUrlParams = (
    categories: string[],
    brands: string[],
    min: string,
    max: string,
  ) => {
    const params = new URLSearchParams();

    if (categories.length > 0) {
      params.set("categories", categories.join(","));
    }

    if (brands.length > 0) {
      params.set("brands", brands.join(","));
    }

    if (min) {
      params.set("min", min);
    }

    if (max) {
      params.set("max", max);
    }

    // On a category page, stay on it while other filters change: /solar-panels?brands=...
    if (lockCategory && categories.includes(lockCategory.name)) {
      params.delete("categories");
      const q = params.toString();
      router.push(
        q ? `/${lockCategory.slug}?${q}` : `/${lockCategory.slug}`,
        { scroll: false },
      );
      return;
    }

    // On a brand page, stay on it while other filters change: /shop/aiko?categories=...
    if (lockedBrand && brands.includes(lockedBrand.name)) {
      params.delete("brands");
      const q = params.toString();
      router.push(
        q ? `/shop/${lockedBrand.slug}?${q}` : `/shop/${lockedBrand.slug}`,
        { scroll: false },
      );
      return;
    }

    // Only one brand ticked and nothing else -> clean URL: /shop/aiko
    const onlyBrandSlug =
      categories.length === 0 && brands.length === 1 && !min && !max
        ? allBrandOptions.find((b) => b.name === brands[0])?.slug
        : undefined;

    const queryStr = params.toString();
    const newUrl = onlyBrandSlug
      ? `/shop/${onlyBrandSlug}`
      : queryStr
        ? `/shop?${queryStr}`
        : "/shop";

    router.push(newUrl, { scroll: false });
  };

  // Data now comes from the Laravel API (props), not from brand-data
  const allProducts = products;
  const availableCategories = lockCategory ? [lockCategory.name] : categories;
  const availableBrands = lockedBrand
    ? [lockedBrand.name]
    : brands.map((b) => b.name);

  // Handle Category checkbox toggle selection
  const handleCategoryChange = (catName: string) => {
    let updatedCategories: string[];

    if (selectedCategories.includes(catName)) {
      updatedCategories = selectedCategories.filter((c) => c !== catName);
    } else {
      updatedCategories = [...selectedCategories, catName];
    }

    setSelectedCategories(updatedCategories);
    updateUrlParams(updatedCategories, selectedBrands, minPrice, maxPrice);
  };

  // Handle Brand checkbox toggle selection
  const handleBrandChange = (brandName: string) => {
    let updatedBrands: string[];

    if (selectedBrands.includes(brandName)) {
      updatedBrands = selectedBrands.filter((b) => b !== brandName);
    } else {
      updatedBrands = [...selectedBrands, brandName];
    }

    setSelectedBrands(updatedBrands);
    updateUrlParams(selectedCategories, updatedBrands, minPrice, maxPrice);
  };

  // Handle Min Price change
  const handleMinPriceChange = (val: string) => {
    setMinPrice(val);
    updateUrlParams(selectedCategories, selectedBrands, val, maxPrice);
  };

  // Handle Max Price change
  const handleMaxPriceChange = (val: string) => {
    setMaxPrice(val);
    updateUrlParams(selectedCategories, selectedBrands, minPrice, val);
  };

  // Filter products based on selected categories, brands, and price range inputs
  const filteredProducts = allProducts.filter((product) => {
    if (!product) return false;

    // Category matching: exact name match (case-insensitive)
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.some((selectedCat) => {
        // The locked category also covers its sub-categories
        const names =
          lockCategory && selectedCat === lockCategory.name
            ? lockCategory.matchNames
            : [selectedCat];
        return names.some(
          (n) => n.toLowerCase() === product.category.toLowerCase(),
        );
      });

    // Brand matching: exact name match
    const matchesBrand =
      selectedBrands.length === 0 || selectedBrands.includes(product.brand);

    // Price matching logic
    const price = product.price || 0;
    const min = minPrice === "" ? 0 : Number(minPrice);
    const max = maxPrice === "" ? Infinity : Number(maxPrice);

    const matchesPrice = price >= min && price <= max;

    return matchesCategory && matchesBrand && matchesPrice;
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

      {/* Product Categories Section */}
      <div className="mb-6">
        <h3 className="font-bold text-lg mb-4 text-gray-900">
          Product Categories
        </h3>

        <div className="space-y-2.5">
          {availableCategories.map((catName) => (
            <label
              key={catName}
              className="flex items-center gap-2.5 text-sm text-gray-800 cursor-pointer hover:text-lime-700"
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(catName)}
                onChange={() => handleCategoryChange(catName)}
                className="w-4 h-4 rounded border-gray-300 text-lime-600 focus:ring-lime-500"
              />

              <span>{catName}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Brand Filter Section */}
      <div className="mb-6 pt-5 border-t border-gray-200">
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
          SHOP
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl font-bold mb-12 text-gray-900">
          {title ? `${title} ` : "All "}
          <span className="text-lime-500">Products</span>
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
          {/* Desktop Sidebar: Filters */}
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
                  <ProductCard key={product.id} product={product as any} />
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

export default function ShopClient(props: Props) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="text-gray-500">Loading...</div>
        </div>
      }
    >
      <ShopPageContent {...props} />
    </Suspense>
  );
}