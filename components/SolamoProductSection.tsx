"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import {
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  ShoppingBag,
} from "lucide-react";

import "swiper/css";

type Product = {
  name: string;
  price: string;
  image: string;
  link: string;
};

export default function ProductSection() {
  const [activeCategory, setActiveCategory] = useState<
    "Solar Panels" | "Inverters" | "Batteries"
  >("Solar Panels");

  const sliderRef = useRef<SwiperRef>(null);

  const solarPanels: Product[] = [
    {
      name: "Jesko 620W",
      price: "24,400",
      image:
        "https://solamoenergy.com/wp-content/uploads/2026/08/Website-Listing-18-2.webp",
      link: "#",
    },
    {
      name: "Risen HJT BF 740W Bifacial Solar Panel",
      price: "30,850",
      image:
        "https://solamoenergy.com/wp-content/uploads/2026/08/Website-Listing-8-1.webp",
      link: "#",
    },
    {
      name: "TCL 620W N-Type Bifacial Solar Panel",
      price: "25,300",
      image:
        "https://solamoenergy.com/wp-content/uploads/2026/08/Website-Listing-21.webp",
      link: "#",
    },
    {
      name: "TCL 615W N-Type Bifacial Solar Panel",
      price: "25,100",
      image:
        "https://solamoenergy.com/wp-content/uploads/2026/08/Website-Listing-19-2.webp",
      link: "#",
    },
    {
      name: "Ronma 620W N-Type Bifacial Solar Panel",
      price: "24,700",
      image:
        "https://solamoenergy.com/wp-content/uploads/2026/08/Website-Listing-22.webp",
      link: "#",
    },
  ];

  const inverters: Product[] = [
    {
      name: "Sunsynk LifeLynk Lynx Pro 6kW IP65 Hybrid Inverter",
      price: "210,000",
      image:
        "https://solamoenergy.com/wp-content/uploads/2026/08/Website-Listing-1-1.webp",
      link: "#",
    },
    {
      name: "Sunsynk LifeLynk Lynks 6kW Hybrid Inverter (IP41)",
      price: "175,000",
      image:
        "https://solamoenergy.com/wp-content/uploads/2026/08/Website-Listing-1-1.webp",
      link: "#",
    },
    {
      name: "VFD KING PRO PLUS IP-65 75KW",
      price: "496,000",
      image:
        "https://solamoenergy.com/wp-content/uploads/2026/08/Website-Listing-3.webp",
      link: "#",
    },
    {
      name: "VFD KING PRO PLUS IP-65 55KW",
      price: "350,000",
      image:
        "https://solamoenergy.com/wp-content/uploads/2026/08/Website-Listing-3.webp",
      link: "#",
    },
  ];

  const batteries: Product[] = [
    {
      name: "CN GREEN 16kW",
      price: "555,000",
      image:
        "https://solamoenergy.com/wp-content/uploads/2026/08/Website-Listing-12.webp",
      link: "#",
    },
    {
      name: "VOLNEX IP65 51.2V 100Ah",
      price: "261,000",
      image:
        "https://solamoenergy.com/wp-content/uploads/2026/08/Website-Listing-14.webp",
      link: "#",
    },
    {
      name: "Sunwoda 51.2V 100Ah",
      price: "221,000",
      image:
        "https://solamoenergy.com/wp-content/uploads/2026/08/Website-Listing-15.webp",
      link: "#",
    },
    {
      name: "Sunsynk X Series 10.24kWh 8000 Cycles IP65 Lithium Battery",
      price: "555,000",
      image:
        "https://solamoenergy.com/wp-content/uploads/2026/08/Website-Listing-16.webp",
      link: "#",
    },
  ];

  const activeProducts =
    activeCategory === "Solar Panels"
      ? solarPanels
      : activeCategory === "Inverters"
        ? inverters
        : batteries;

  const categoryLinks = {
    "Solar Panels": "/shop/monocrystalline",
    Inverters: "/shop/hybrid-inverters",
    Batteries: "/shop/lithium-batteries",
  };

  const changeCategory = (
    category: "Solar Panels" | "Inverters" | "Batteries",
  ) => {
    setActiveCategory(category);
    setTimeout(() => {
      sliderRef.current?.swiper?.slideTo(0);
    }, 0);
  };

  return (
    <section className="w-full bg-[#f5f5f5] py-4 sm:py-5 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-3 sm:px-5 lg:px-6">
        <div className="bg-white rounded-lg overflow-hidden">
          <div className="px-4 sm:px-6 lg:px-7 pt-5 pb-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#84CC16] flex items-center justify-center">
                  <ShoppingBag className="w-4 h-4 text-black" />
                </div>

                <div>
                  <h2 className="text-[20px] sm:text-[23px] font-black text-[#111] leading-none">
                    Popular Solar Products
                  </h2>
                  <p className="text-[10px] sm:text-[11px] text-gray-500 mt-1">
                    Shop premium solar equipment from Solamo Energy
                  </p>
                </div>
              </div>

              <Link
                href={categoryLinks[activeCategory]}
                className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-[#111] hover:text-gray-600 transition"
              >
                View All
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="flex items-center gap-2 mt-5 overflow-x-auto scrollbar-hide">
              {(["Solar Panels", "Inverters", "Batteries"] as const).map(
                (category) => {
                  const active = activeCategory === category;
                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => changeCategory(category)}
                      className={`
                      shrink-0 px-4 py-2 rounded-md text-[10px] sm:text-[11px] font-bold transition border
                      ${
                        active
                          ? "bg-[#84CC16] border-[#84CC16] text-black"
                          : "bg-white border-gray-200 text-gray-600 hover:border-gray-400"
                      }
                    `}
                    >
                      {category}
                    </button>
                  );
                },
              )}
            </div>
          </div>

          <div className="relative px-2 sm:px-4 pb-5">
            <button
              type="button"
              aria-label="Previous products"
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
              aria-label="Next products"
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
              key={activeCategory}
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
              {activeProducts.map((product, index) => (
                <SwiperSlide key={`${activeCategory}-${index}`}>
                  <Link
                    href={product.link}
                    className="
                      group block bg-white border border-gray-200 rounded-md overflow-hidden h-full
                      hover:shadow-md hover:border-gray-300 transition
                    "
                  >
                    <div className="relative h-[145px] sm:h-[165px] lg:h-[180px] bg-white flex items-center justify-center p-3">
                      {index === 0 && (
                        <span
                          className="
                          absolute left-2 top-2 z-10 bg-[#84CC16] text-black font-black text-[8px] px-2 py-1 rounded-sm
                        "
                        >
                          POPULAR
                        </span>
                      )}

                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-[1.04]"
                      />
                    </div>

                    <div className="px-3 pb-3">
                      <h3 className="text-[11px] sm:text-[12px] font-medium text-[#222] leading-[1.35] line-clamp-2 min-h-[32px]">
                        {product.name}
                      </h3>

                      <div className="mt-3">
                        <span className="block text-[9px] text-gray-400 uppercase font-semibold">
                          Starting from
                        </span>
                        <span className="block text-[15px] sm:text-[16px] font-black text-[#111] mt-0.5">
                          Rs {product.price}
                        </span>
                      </div>

                      <div
                        className="
                        mt-3 w-full h-[32px] bg-[#84CC16] text-black rounded-sm flex items-center justify-center
                        text-[9px] sm:text-[10px] font-bold group-hover:bg-[#65A30D] transition
                      "
                      >
                        View Product
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="sm:hidden px-4 pb-5">
            <Link
              href={categoryLinks[activeCategory]}
              className="w-full h-[38px] bg-[#111] text-[#84CC16] rounded-md flex items-center justify-center gap-1 text-[10px] font-bold"
            >
              View All Products
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
