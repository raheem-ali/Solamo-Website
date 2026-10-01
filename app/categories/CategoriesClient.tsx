"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type CategoryItem = {
  slug: string;
  name: string;
  count: number;
  image: string | null;
};

export default function CategoriesClient({
  categories,
}: {
  categories: CategoryItem[];
}) {
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
        <h1 className="text-4xl sm:text-5xl font-bold mb-10 text-gray-900">
          Product <span className="text-lime-500">Categories</span>
        </h1>

        {categories.length === 0 && (
          <p className="text-gray-500">No categories yet.</p>
        )}

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category.slug}
              className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
            >
              <div>
                {/* Image of one product in this category */}
                {category.image ? (
                  <div className="mb-4 h-40 flex items-center justify-center bg-gray-50 rounded-xl p-3 border border-gray-100">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="object-contain max-h-full max-w-full"
                    />
                  </div>
                ) : (
                  <div className="mb-4 h-40 bg-lime-50 rounded-xl flex items-center justify-center border border-lime-100">
                    <span className="text-lg font-black text-lime-700 tracking-wider">
                      {category.name}
                    </span>
                  </div>
                )}

                {/* Category name */}
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {category.name}
                </h3>

                {/* Product count */}
                <p className="text-gray-600 text-sm mb-6">
                  {category.count} {category.count === 1 ? "product" : "products"}
                </p>
              </div>

              {/* View Category Products Button -> /solar-panels */}
              <Link
                href={`/${category.slug}`}
                className="w-full bg-lime-500 hover:bg-lime-600 text-white font-medium text-center py-2.5 rounded-lg transition-colors shadow-sm block"
              >
                View Products
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