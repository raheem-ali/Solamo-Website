"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import SolamoHeader from "@/components/SolamoHeader";
import SolamoFooter from "@/components/SolamoFooter";
import { getWishlist, removeFromWishlist } from "@/lib/wishlist";
import { Product } from "@/lib/brand-data";
import { Heart, Trash2, ArrowRight } from "lucide-react";

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);

  useEffect(() => {
    setWishlistItems(getWishlist());
    const handleUpdate = () => {
      setWishlistItems(getWishlist());
    };
    window.addEventListener("storage", handleUpdate);
    window.addEventListener("wishlistUpdated", handleUpdate as EventListener);
    return () => {
      window.removeEventListener("storage", handleUpdate);
      window.removeEventListener("wishlistUpdated", handleUpdate as EventListener);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#1f2937]">
      <SolamoHeader />

      <main className="max-w-[1400px] mx-auto px-3 sm:px-5 lg:px-6 xl:px-8 py-10 flex-grow w-full">
        <div className="mb-8 flex items-center justify-between border-b border-gray-200 pb-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-2">
              <Heart className="w-7 h-7 text-[#79B900] fill-[#79B900]" />
              My <span className="text-[#4D7C0F]">Wishlist</span>
            </h1>
            <p className="text-gray-600 text-sm mt-1">
              Saved solar equipment and accessories for your upcoming projects.
            </p>
          </div>
          <span className="text-sm font-medium bg-[#f2f9e6] text-[#4D7C0F] px-3 py-1 rounded-full">
            {wishlistItems.length} {wishlistItems.length === 1 ? "Item" : "Items"}
          </span>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center bg-[#f9faf8] rounded-2xl border border-gray-200">
            <div className="w-16 h-16 rounded-full bg-[#f2f9e6] text-[#79B900] flex items-center justify-center mb-4">
              <Heart className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-gray-500 text-sm max-w-md mb-6">
              Browse our high-efficiency solar panels, inverters, batteries, and accessories and click the heart icon to save products here.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-[#79B900] hover:bg-[#5f9200] text-white font-bold px-6 py-3 rounded-xl transition shadow-sm text-sm"
            >
              Browse Shop
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlistItems.map((product) => (
              <div
                key={product.id}
                className="relative bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <button
                  type="button"
                  onClick={() => removeFromWishlist(product.id)}
                  aria-label="Remove from wishlist"
                  className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/90 rounded-full shadow border border-gray-200 flex items-center justify-center text-red-500 hover:bg-red-50 transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <div>
                  <div className="h-40 flex items-center justify-center mb-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <span className="text-[10px] uppercase font-bold text-gray-400">
                    {product.category}
                  </span>
                  <h3 className="font-semibold text-sm text-gray-900 line-clamp-2 mt-1 mb-2">
                    {product.name}
                  </h3>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <div className="text-[11px] text-gray-500">Price</div>
                    <div className="font-bold text-base text-[#4D7C0F]">
                      {product.price && product.price > 0
                        ? `Rs ${product.price.toLocaleString()}`
                        : "Price on Request"}
                    </div>
                  </div>
                  <Link
                    href={product.link}
                    className="bg-[#79B900] hover:bg-[#5f9200] text-white text-xs font-bold px-3 py-2 rounded-md transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <SolamoFooter />
    </div>
  );
}
