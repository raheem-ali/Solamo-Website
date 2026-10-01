"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { ChevronLeft, ChevronRight, ArrowUpRight, Zap } from "lucide-react";

import { brandsData } from "@/lib/brand-data";

import "swiper/css";

export default function SolamoEnergySolutions() {
  const sliderRef = useRef<SwiperRef>(null);

  const energyProducts = Object.values(brandsData)
    .flatMap((brand) =>
      (brand.products || []).map((product) => ({
        ...product,
        brandName: brand.name,
      })),
    )
    .filter((product) => {
      const category = String(product.category || "").toLowerCase();
      return (
        category.includes("battery") ||
        category.includes("inverter") ||
        category.includes("power bank")
      );
    })
    .filter((product) => Number(product.price) > 0);

  if (energyProducts.length === 0) return null;

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
                    Energy Solutions
                  </h2>
                  <p className="text-[10px] sm:text-[11px] text-gray-500 mt-1">
                    Batteries, inverters & complete energy solutions
                  </p>
                </div>
              </div>
              <Link
                href="/shop"
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
              {energyProducts.map((product, index) => (
                <SwiperSlide key={`${product.id}-${index}`}>
                  <Link
                    href={product.link}
                    className="group block bg-white border border-gray-200 rounded-md overflow-hidden h-full hover:shadow-md hover:border-gray-300 transition"
                  >
                    <div className="relative h-[145px] sm:h-[165px] lg:h-[180px] bg-white flex items-center justify-center p-3">
                      <span className="absolute left-2 top-2 z-10 inline-flex items-center gap-1 bg-[#84CC16] text-black font-black text-[8px] px-2 py-1 rounded-sm">
                        <Zap className="w-2.5 h-2.5 fill-current" />
                        ENERGY
                      </span>

                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-[1.04]"
                      />
                    </div>

                    <div className="px-3 pb-3">
                      <span className="text-[9px] uppercase font-bold text-gray-400">
                        {product.brandName}
                      </span>
                      <h3 className="mt-0.5 text-[11px] sm:text-[12px] font-medium text-[#222] leading-[1.35] line-clamp-2 min-h-[32px]">
                        {product.name}
                      </h3>

                      <div className="mt-3">
                        <span className="block text-[9px] text-gray-400 uppercase font-semibold">
                          Starting from
                        </span>
                        <span className="block text-[15px] sm:text-[16px] font-black text-[#111] mt-0.5">
                          Rs {Number(product.price).toLocaleString()}
                        </span>
                      </div>

                      <div className="mt-3 w-full h-[32px] bg-[#84CC16] text-black rounded-sm flex items-center justify-center text-[9px] sm:text-[10px] font-bold group-hover:bg-[#65A30D] transition">
                        View Details
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="sm:hidden px-4 pb-5">
            <Link
              href="/shop"
              className="w-full h-[38px] bg-[#111] text-[#84CC16] rounded-md flex items-center justify-center gap-1 text-[10px] font-bold"
            >
              View All Solutions
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
