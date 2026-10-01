"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Product } from "@/lib/brand-data";
import { Heart, Plus, Zap } from "lucide-react";
import { addToWishlist, removeFromWishlist, isInWishlist } from "@/lib/wishlist";
import { SHOW_DEMO_CONTENT, getReviewStats, getProductExtras } from "@/lib/demo-content";

interface ProductCardProps {
  product: Product;
  variant?: "default" | "noon";
  badgeText?: string;
}

export default function ProductCard({ product, variant = "default", badgeText = "PANEL" }: ProductCardProps) {
  const [inWish, setInWish] = useState(false);

  useEffect(() => {
    setInWish(isInWishlist(product.id));
    const handleUpdate = () => setInWish(isInWishlist(product.id));
    window.addEventListener("storage", handleUpdate);
    window.addEventListener("wishlistUpdated", handleUpdate as EventListener);
    return () => {
      window.removeEventListener("storage", handleUpdate);
      window.removeEventListener("wishlistUpdated", handleUpdate as EventListener);
    };
  }, [product.id]);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWish) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handlePlusClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const whatsappUrl = `https://wa.me/923141349717?text=${encodeURIComponent(
      `I am interested in ordering ${product.name}`,
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const price = product.price ?? 0;
  const hasPrice = price > 0;
  const oldPrice = hasPrice ? Math.round(price * 1.18) : 0;

  const reviewStats = SHOW_DEMO_CONTENT ? getReviewStats(product.id) : null;
  const extras = SHOW_DEMO_CONTENT ? getProductExtras(product.id) : null;

  if (variant === "noon") {
    return (
      <Link
        href={product.link}
        className="group relative bg-white border border-gray-200 rounded-lg overflow-hidden h-full flex flex-col justify-between hover:shadow-md hover:border-gray-300 transition p-3"
      >
        <div>
          {/* Image & Badges */}
          <div className="relative h-[160px] sm:h-[180px] bg-white flex items-center justify-center mb-2">
            {/* Top-left Best Seller / Badge */}
            {extras?.isBestSeller && (
              <span className="absolute left-0 top-0 z-10 bg-[#FFD814] text-black font-bold text-[9px] px-2 py-0.5 rounded-br shadow-xs">
                BEST SELLER
              </span>
            )}

            {/* Top-right Wishlist Heart */}
            <button
              type="button"
              onClick={toggleWishlist}
              aria-label="Wishlist"
              className="absolute right-1 top-1 z-20 w-8 h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-xs border border-gray-100 transition"
            >
              <Heart
                className={`w-4 h-4 ${
                  inWish ? "text-red-500 fill-red-500" : "text-gray-500 hover:text-black"
                }`}
              />
            </button>

            {/* Product Image */}
            <img
              src={product.image}
              alt={product.name}
              className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-[1.03]"
            />

            {/* Bottom-right Plus button */}
            <button
              type="button"
              onClick={handlePlusClick}
              aria-label="Add to cart / order"
              className="absolute right-1 bottom-1 z-20 w-8 h-8 rounded-full bg-[#79B900] hover:bg-[#5f9200] text-white flex items-center justify-center shadow-md transition"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
            </button>
          </div>

          {/* Rank Badge */}
          {SHOW_DEMO_CONTENT && extras?.rankBadge && (
            <div className="text-[10px] font-bold text-[#4D7C0F] mb-1">
              {extras.rankBadge}
            </div>
          )}

          {/* Product Name */}
          <h3 className="text-[12px] sm:text-[13px] font-medium text-[#1f2937] leading-[1.3] line-clamp-2 min-h-[34px]">
            {product.name}
          </h3>

          {/* Stars & Rating count */}
          {SHOW_DEMO_CONTENT && reviewStats && (
            <div className="flex items-center gap-1.5 mt-1.5">
              <div className="flex items-center text-[#4D7C0F]">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-3 w-3 shrink-0 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <span className="text-[11px] text-[#6b7280]">({reviewStats.count})</span>
            </div>
          )}
        </div>

        <div className="mt-3 pt-2 border-t border-gray-100">
          {/* Price & Old price / discount */}
          <div className="flex flex-wrap items-baseline gap-1.5">
            <span className="text-[15px] sm:text-[16px] font-bold text-[#1f2937]">
              {hasPrice ? `Rs ${price.toLocaleString()}` : "Price on Request"}
            </span>
            {SHOW_DEMO_CONTENT && hasPrice && (
              <>
                <span className="text-[11px] text-[#6b7280] line-through">
                  Rs {oldPrice.toLocaleString()}
                </span>
                <span className="text-[11px] font-bold text-[#4D7C0F]">15% off</span>
              </>
            )}
          </div>

          {/* Lowest price in 30 days */}
          {SHOW_DEMO_CONTENT && (
            <div className="text-[10px] text-[#6b7280] mt-0.5">
              Lowest price in 30 days
            </div>
          )}

          {/* Installation available tag */}
          <div className="mt-2 inline-flex items-center gap-1 bg-[#f2f9e6] text-[#4D7C0F] text-[10px] font-bold px-2 py-0.5 rounded">
            <Zap className="w-3 h-3 fill-current" />
            Installation available
          </div>
        </div>
      </Link>
    );
  }

  // Default variant (homepage)
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
      <div className="flex-1 flex items-center justify-center mb-4 min-h-[180px]">
        <img
          src={product?.image || "https://solamoenergy.com/wp-content/uploads/2026/07/default-banner.png"}
          alt={product?.name || "Solar Product"}
          className="max-h-44 w-auto object-contain"
        />
      </div>

      <h3 className="font-semibold text-[15px] text-gray-900 mb-3 leading-snug line-clamp-2 min-h-[42px]">
        {product?.name}
      </h3>

      <div className="mt-auto">
        <div className="mb-4">
          <span className="text-sm text-gray-600">Price</span>
          <div className="text-lime-600 font-bold text-xl">
            {product?.price && product.price > 0
              ? `Rs ${product.price.toLocaleString()}`
              : "Price on Request"}
          </div>
        </div>

        <Link
          href={product?.link || "#"}
          className="block w-full text-center bg-lime-500 hover:bg-lime-600 text-white py-2.5 rounded-md font-medium transition-colors"
        >
          See Details
        </Link>
      </div>
    </div>
  );
}
