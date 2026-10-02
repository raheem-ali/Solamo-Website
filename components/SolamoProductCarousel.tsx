"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { ChevronLeft, ChevronRight, ArrowUpRight, Zap } from "lucide-react";
import { brandsData, Product } from "@/lib/brand-data";
import { DummyProduct } from "@/lib/dummy-products";
import ProductCard from "./ProductCard";
import "swiper/css";

interface SolamoProductCarouselProps {
  title: string;
  subtitle: string;
  categoryFilter?: string;
  badgeText: string;
  viewAllHref: string;
  dummyProducts?: DummyProduct[];
  products?: Product[];
  variant?: "default" | "noon";
}

export default function SolamoProductCarousel({
  title,
  subtitle,
  categoryFilter,
  badgeText,
  viewAllHref,
  dummyProducts,
  products,
  variant = "default",
}: SolamoProductCarouselProps) {
  const sliderRef = useRef<SwiperRef>(null);

  let productsToDisplay: (Product & { brandName?: string })[] = [];

  if (products) {
    productsToDisplay = products.slice(0, 12);
  } else if (dummyProducts) {
    productsToDisplay = dummyProducts.slice(0, 12).map((dp) => ({
      id: dp.id,
      name: dp.name,
      price: dp.price,
      image: dp.image,
      link: dp.link,
      category: "Accessories" as const,
      brandName: dp.brandName,
    }));
  } else {
    productsToDisplay = Object.values(brandsData)
      .flatMap((brand) =>
        (brand.products || []).map((product) => ({
          ...product,
          brandName: brand.name,
        })),
      )
      .filter((product) => {
        const category = String(product.category || "").toLowerCase();
        const filter = (categoryFilter || "").toLowerCase();
        return category.includes(filter);
      })
      .filter((product) => Number(product.price) > 0)
      .slice(0, 12);
  }

  if (productsToDisplay.length === 0) return null;

  return (
    <section className="w-full bg-[#f5f5f5] py-4 sm:py-5 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-3 sm:px-5 lg:px-6">
        <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
          <div className="px-4 sm:px-6 lg:px-7 pt-5 pb-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#84CC16] flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4 text-black fill-black" />
                </div>
                <div>
                  <h2 className="text-[20px] sm:text-[23px] font-black text-[#111] leading-none">
                    {title}
                  </h2>
                  <p className="text-[10px] sm:text-[11px] text-gray-500 mt-1">
                    {subtitle}
                  </p>
                </div>
              </div>
              <Link
                href={viewAllHref}
                className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-[#111] hover:text-gray-600 transition"
              >
                View All
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="relative px-2 sm:px-4 pb-5">
            <button
              type="button"
              aria-label="Previous products"
              onClick={() => sliderRef.current?.swiper?.slidePrev()}
              className="absolute left-0 sm:left-1 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 bg-white border border-gray-200 rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition"
            >
              <ChevronLeft className="w-4 h-4 text-gray-700" />
            </button>

            <button
              type="button"
              aria-label="Next products"
              onClick={() => sliderRef.current?.swiper?.slideNext()}
              className="absolute right-0 sm:right-1 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 bg-white border border-gray-200 rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition"
            >
              <ChevronRight className="w-4 h-4 text-gray-700" />
            </button>

            <Swiper
              ref={sliderRef}
              spaceBetween={8}
              slidesPerView={2}
              breakpoints={{
                480: { slidesPerView: 2, spaceBetween: 10 },
                640: { slidesPerView: 3, spaceBetween: 10 },
                768: { slidesPerView: 4, spaceBetween: 12 },
                1100: { slidesPerView: 5, spaceBetween: 12 },
              }}
              className="!px-8 sm:!px-7"
            >
              {productsToDisplay.map((product, index) => (
                <SwiperSlide key={`${product.id}-${index}`} className="h-auto">
                  <ProductCard product={product} variant={variant} badgeText={badgeText} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
