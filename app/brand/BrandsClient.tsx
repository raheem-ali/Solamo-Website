"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type BrandItem = {
  slug: string;
  name: string;
  description: string;
  image: string | null;
};

export default function BrandsClient({ brands }: { brands: BrandItem[] }) {
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
        {/* Heading matching live site ("Our" in dark, "Brands" in green) */}
        <h1 className="text-4xl sm:text-5xl font-bold mb-10 text-gray-900">
          Our <span className="text-lime-500">Brands</span>
        </h1>

        {brands.length === 0 && (
          <p className="text-gray-500">No brands yet.</p>
        )}

        {/* Brands Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {brands.map((brand) => (
            <div
              key={brand.slug}
              className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
            >
              <div>
                {/* Brand logo (uploaded in the dashboard) */}
                {brand.image ? (
                  <div className="mb-4 h-16 relative flex items-center justify-center bg-gray-50 rounded-xl p-2 border border-gray-100">
                    <img
                      src={brand.image}
                      alt={brand.name}
                      className="object-contain max-h-12 w-auto"
                    />
                  </div>
                ) : (
                  <div className="mb-4 h-16 bg-lime-50 rounded-xl flex items-center justify-center border border-lime-100">
                    <span className="text-lg font-black text-lime-700 tracking-wider">
                      {brand.name}
                    </span>
                  </div>
                )}

                {/* Brand Name Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {brand.name}
                </h3>

                {/* Brand Description */}
                <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                  {brand.description}
                </p>
              </div>

              {/* View Brand Products Button -> /shop/aiko */}
              <Link
                href={`/shop/${brand.slug}`}
                className="w-full bg-lime-500 hover:bg-lime-600 text-white font-medium text-center py-2.5 rounded-lg transition-colors shadow-sm block"
              >
                View Brand Products
              </Link>
            </div>
          ))}
        </div>
      </main>

      {/* Global Application Footer */}
      <Footer />
    </div>
  );
}