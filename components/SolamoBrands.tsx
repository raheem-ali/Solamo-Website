"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import {
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Store,
  Package,
} from "lucide-react";

import {
  getAllProducts,
  slugify,
  PLACEHOLDER,
  type ApiProductLite,
} from "@/lib/api-products";

// @ts-expect-error Swiper's stylesheet is a side-effect import without module types.
import "swiper/css";

type BrandCard = {
  slug: string;
  name: string;
  image: string;
  hasLogo: boolean;
  count: number;
};

// list endpoint also returns the brand logo (brands.logo_url as brand_logo)
type ProductWithLogo = ApiProductLite & { brand_logo?: string | null };

export default function SolamoBrands() {
  const sliderRef = useRef<SwiperRef>(null);
  const [brands, setBrands] = useState<BrandCard[]>([]);

  // Brands that have products, built from the database
  useEffect(() => {
    let alive = true;
    getAllProducts()
      .then((all) => {
        const map = new Map<string, BrandCard>();
        for (const p of all as ProductWithLogo[]) {
          if (!p.brand_name) continue;
          const slug = slugify(p.brand_name);
          const existing = map.get(slug);
          if (existing) {
            existing.count += 1;
            if (!existing.hasLogo && p.brand_logo) {
              existing.image = p.brand_logo;
              existing.hasLogo = true;
            }
          } else {
            map.set(slug, {
              slug,
              name: p.brand_name,
              image: p.brand_logo || p.images?.[0] || PLACEHOLDER,
              hasLogo: !!p.brand_logo,
              count: 1,
            });
          }
        }
        if (alive)
          setBrands(
            Array.from(map.values()).sort((a, b) => b.count - a.count).slice(0, 12),
          );
      })
      .catch(() => alive && setBrands([]));
    return () => {
      alive = false;
    };
  }, []);

  return (
    <section className="w-full bg-[#f5f5f5] py-4 sm:py-5 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-3 sm:px-5 lg:px-6">
        <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
          {/* HEADER */}
          <div className="px-4 sm:px-6 lg:px-7 pt-5 pb-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#84CC16] flex items-center justify-center shrink-0">
                  <Store className="w-4 h-4 text-black" />
                </div>
                <div>
                  <h2 className="text-[20px] sm:text-[23px] font-black text-[#111] leading-none">
                    Popular Brands
                  </h2>
                  <p className="text-[10px] sm:text-[11px] text-gray-500 mt-1">
                    Explore trusted solar brands available at Solamo Energy
                  </p>
                </div>
              </div>

              <Link
                href="/brand"
                className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-[#111] hover:text-gray-600 transition"
              >
                View All
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* BRAND SLIDER */}
          {brands.length > 0 ? (
            <div className="relative px-2 sm:px-4 pb-5">
              <button
                type="button"
                aria-label="Previous brands"
                onClick={() => sliderRef.current?.swiper?.slidePrev()}
                className="absolute left-0 sm:left-1 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 bg-white border border-gray-200 rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 active:scale-95 transition"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
              </button>

              <button
                type="button"
                aria-label="Next brands"
                onClick={() => sliderRef.current?.swiper?.slideNext()}
                className="absolute right-0 sm:right-1 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 bg-white border border-gray-200 rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 active:scale-95 transition"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
              </button>

              <Swiper
                ref={sliderRef}
                spaceBetween={8}
                slidesPerView={2}
                watchOverflow={true}
                breakpoints={{
                  640: { slidesPerView: 3, spaceBetween: 10 },
                  768: { slidesPerView: 4, spaceBetween: 12 },
                  1024: { slidesPerView: 5, spaceBetween: 14 },
                  1280: { slidesPerView: 6, spaceBetween: 14 },
                }}
                className="!px-8 sm:!px-7"
              >
                {brands.map((brand) => (
                  <SwiperSlide key={brand.slug} className="h-auto">
                    <Link
                      href={`/brand/${brand.slug}`}
                      className="group block h-full bg-white border border-gray-200 rounded-md overflow-hidden hover:border-gray-300 hover:shadow-md transition"
                    >
                      <div className="h-[105px] sm:h-[120px] lg:h-[135px] bg-gray-50 flex items-center justify-center overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={brand.image}
                          alt={`${brand.name} solar products`}
                          loading="lazy"
                          className="w-full h-full object-contain  group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      <div className="px-3 py-3 border-t border-gray-100">
                        <h3 className="text-[12px] sm:text-[13px] font-bold text-[#111] truncate">
                          {brand.name}
                        </h3>
                        <div className="flex items-center gap-1 mt-1">
                          <Package className="w-3 h-3 text-gray-400 shrink-0" />
                          <span className="text-[9px] sm:text-[10px] text-gray-500">
                            {brand.count}{" "}
                            {brand.count === 1 ? "Product" : "Products"}
                          </span>
                        </div>
                      </div>

                      <div className="h-1 bg-[#84CC16] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          ) : (
            <div className="px-4 sm:px-6 pb-6">
              <div className="rounded-md bg-gray-50 border border-gray-100 py-8 text-center">
                <Store className="w-8 h-8 mx-auto text-gray-300" />
                <p className="mt-2 text-xs font-semibold text-gray-500">
                  No brands available right now.
                </p>
              </div>
            </div>
          )}

          {/* MOBILE VIEW ALL */}
          <div className="sm:hidden px-4 pb-5">
            <Link
              href="/brand"
              className="w-full h-[38px] bg-[#111] text-[#84CC16] rounded-md flex items-center justify-center gap-1 text-[10px] font-bold hover:bg-gray-900 active:scale-[0.99] transition"
            >
              View All Brands
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}