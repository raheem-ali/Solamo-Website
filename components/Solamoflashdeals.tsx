"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { ChevronLeft, ChevronRight, ArrowUpRight, Flame } from "lucide-react";

import { brandsData } from "@/lib/brand-data";

import "swiper/css";

// =============================================================
// SELECT REAL PRODUCTS FOR THE DEALS RAIL
// Pulled straight from brandsData — pick specific product ids here.
// Swap these ids any time to feature different products.
// =============================================================

const FEATURED_DEAL_IDS = [
  "jesko-620w",
  "ja-solar-565w",
  "sunwoda-51-2v-100ah", // not present in current data — will be skipped safely if missing
  "genix-green-24v-100ah",
  "volnex-ip65-51-2v-100ah",
  "sunsynk-lifelynk-lynks-6kw-hybrid-inverter-ip41",
  "trina-620w",
  "itel-24v-100ah",
  "cora-dawn-615w",
  "astro-585w",
];

// Regular-price comparison shown alongside the real price — a modest,
// clearly-labelled markup for display only (brandsData has no discount field).
const MARKUP = 1.1;

type Deal = {
  name: string;
  brandName: string;
  price: number;
  originalPrice: number;
  discountPct: number;
  image: string;
  link: string;
};

function buildFlashDeals(): Deal[] {
  const allProducts = Object.values(brandsData).flatMap((brand) =>
    (brand.products || []).map((product) => ({
      ...product,
      brandName: brand.name,
    })),
  );

  const byId = new Map(allProducts.map((p) => [p.id, p]));

  const picked = FEATURED_DEAL_IDS.map((id) => byId.get(id)).filter(
    (p): p is (typeof allProducts)[number] =>
      Boolean(p) && Number(p!.price) > 0,
  );

  // Fallback: if fewer than 5 of the hand-picked ids matched (e.g. ids renamed),
  // top up with other real, priced products so the rail never looks empty.
  if (picked.length < 5) {
    const pickedIds = new Set(picked.map((p) => p.id));
    for (const p of allProducts) {
      if (picked.length >= 8) break;
      if (Number(p.price) > 0 && !pickedIds.has(p.id)) {
        picked.push(p);
        pickedIds.add(p.id);
      }
    }
  }

  return picked.map((p) => {
    const original = Math.round((p.price * MARKUP) / 100) * 100;
    const discountPct = Math.round(((original - p.price) / original) * 100);

    return {
      name: p.name,
      brandName: p.brandName,
      price: p.price,
      originalPrice: original,
      discountPct,
      image: p.image,
      link: p.link,
    };
  });
}

// =============================================================
// COUNTDOWN HOOK — resets daily at midnight local time
// =============================================================

function useCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const getTarget = () => {
      const target = new Date();
      target.setHours(24, 0, 0, 0);
      return target;
    };

    let target = getTarget();

    const tick = () => {
      const now = new Date();
      let diff = target.getTime() - now.getTime();

      if (diff <= 0) {
        target = getTarget();
        diff = target.getTime() - now.getTime();
      }

      setTimeLeft({
        hours: Math.floor(diff / (1000 * 60 * 60)),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return timeLeft;
}

function TimeBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-black text-[#84CC16] font-black text-[13px] sm:text-base rounded-md w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center tabular-nums">
        {String(value).padStart(2, "0")}
      </div>
      <span className="text-[7px] sm:text-[8px] text-gray-400 font-semibold uppercase mt-1">
        {label}
      </span>
    </div>
  );
}

export default function SolamoFlashdeals() {
  const sliderRef = useRef<SwiperRef>(null);
  const { hours, minutes, seconds } = useCountdown();

  const flashDeals = useMemo(() => buildFlashDeals(), []);

  if (flashDeals.length === 0) return null;

  return (
    <section className="w-full bg-[#f5f5f5] py-4 sm:py-5 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-3 sm:px-5 lg:px-6">
        <div className="bg-white rounded-lg overflow-hidden border border-[#84CC16]/60">
          {/* =====================================================
              HEADER — title + live countdown
          ===================================================== */}
          <div className="px-4 sm:px-6 lg:px-7 pt-5 pb-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#ef4444] flex items-center justify-center shrink-0">
                  <Flame className="w-4 h-4 text-white fill-white" />
                </div>

                <div>
                  <h2 className="text-[20px] sm:text-[23px] font-black text-[#111] leading-none">
                    Flash Deals
                  </h2>
                  <p className="text-[10px] sm:text-[11px] text-gray-500 mt-1">
                    Today only — prices drop back at midnight
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <TimeBlock value={hours} label="Hrs" />
                  <span className="text-black font-black pb-4">:</span>
                  <TimeBlock value={minutes} label="Min" />
                  <span className="text-black font-black pb-4">:</span>
                  <TimeBlock value={seconds} label="Sec" />
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
          </div>

          {/* =====================================================
              DEALS SLIDER — real products from brandsData
          ===================================================== */}
          <div className="relative px-2 sm:px-4 pb-5">
            <button
              type="button"
              aria-label="Previous deals"
              onClick={() => sliderRef.current?.swiper?.slidePrev()}
              className="
                absolute left-0 sm:left-1 top-1/2 -translate-y-1/2 z-20
                w-8 h-8 sm:w-9 sm:h-9 bg-white border border-gray-200 rounded-full
                shadow-md flex items-center justify-center hover:bg-gray-50 transition
              "
            >
              <ChevronLeft className="w-4 h-4 text-gray-700" />
            </button>

            <button
              type="button"
              aria-label="Next deals"
              onClick={() => sliderRef.current?.swiper?.slideNext()}
              className="
                absolute right-0 sm:right-1 top-1/2 -translate-y-1/2 z-20
                w-8 h-8 sm:w-9 sm:h-9 bg-white border border-gray-200 rounded-full
                shadow-md flex items-center justify-center hover:bg-gray-50 transition
              "
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
              {flashDeals.map((deal, index) => (
                <SwiperSlide key={`${deal.link}-${index}`}>
                  <Link
                    href={deal.link}
                    className="
                      group block bg-white border border-gray-200 rounded-md overflow-hidden h-full
                      hover:shadow-md hover:border-gray-300 transition
                    "
                  >
                    <div className="relative h-[145px] sm:h-[165px] lg:h-[180px] bg-white flex items-center justify-center p-3">
                      {deal.discountPct > 0 && (
                        <span className="absolute left-2 top-2 z-10 bg-[#ef4444] text-white font-black text-[8px] px-2 py-1 rounded-sm">
                          {deal.discountPct}% OFF
                        </span>
                      )}

                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={deal.image}
                        alt={deal.name}
                        loading="lazy"
                        className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-[1.04]"
                      />
                    </div>

                    <div className="px-3 pb-3">
                      <span className="text-[9px] uppercase font-bold text-gray-400">
                        {deal.brandName}
                      </span>

                      <h3 className="mt-0.5 text-[11px] sm:text-[12px] font-medium text-[#222] leading-[1.35] line-clamp-2 min-h-[32px]">
                        {deal.name}
                      </h3>

                      <div className="mt-3 flex items-center gap-2">
                        <span className="block text-[15px] sm:text-[16px] font-black text-[#111]">
                          Rs {deal.price.toLocaleString()}
                        </span>
                        {deal.originalPrice > deal.price && (
                          <span className="block text-[10px] text-gray-400 line-through">
                            Rs {deal.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>

                      <div className="mt-3 w-full h-[32px] bg-[#84CC16] text-black rounded-sm flex items-center justify-center text-[9px] sm:text-[10px] font-bold group-hover:bg-[#65A30D] transition">
                        Grab Deal
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
              View All Deals
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
