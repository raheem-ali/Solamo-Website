"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";

import "swiper/css";

export default function ShopSection() {
  const panelRef = useRef<SwiperRef>(null);
  const inverterRef = useRef<SwiperRef>(null);
  const batteryRef = useRef<SwiperRef>(null);

  // =========================
  // SOLAR PANELS
  // =========================
  const solarPanels = [
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

  // =========================
  // INVERTERS
  // =========================
  const inverters = [
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

  // =========================
  // BATTERIES
  // =========================
  const batteries = [
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

  // =========================
  // CATEGORY SLIDER
  // =========================
  const renderCategorySlider = (
    title: string,
    items: typeof solarPanels,
    sliderRef: React.RefObject<SwiperRef | null>,
    viewAllLink: string,
  ) => (
    <div className="mb-12 sm:mb-14">
      {/* CATEGORY TITLE */}
      <h3
        className="
          font-josefin
          text-[32px]
          sm:text-2xl
          font-bold
          mb-5
          sm:mb-6
          text-[#172217]
          text-center
          sm:text-left
          px-6
          sm:px-12
        "
      >
        {title}
      </h3>

      {/* SLIDER */}
      <div className="relative w-full">
        {/* LEFT ARROW */}
        <button
          onClick={() => sliderRef.current?.swiper?.slidePrev()}
          aria-label="Previous slide"
          className="
            absolute
            left-1
            sm:left-3
            top-1/2
            -translate-y-1/2
            z-30
            text-[#79B900]
            hover:text-[#5f9200]
            transition
            p-0
          "
        >
          <ChevronLeft className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2.5]" />
        </button>

        {/* RIGHT ARROW */}
        <button
          onClick={() => sliderRef.current?.swiper?.slideNext()}
          aria-label="Next slide"
          className="
            absolute
            right-1
            sm:right-3
            top-1/2
            -translate-y-1/2
            z-30
            text-[#79B900]
            hover:text-[#5f9200]
            transition
            p-0
          "
        >
          <ChevronRight className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2.5]" />
        </button>

        <Swiper
          ref={sliderRef}
          spaceBetween={6}
          slidesPerView={2}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 12,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          }}
          className="w-full py-1"
        >
          {items.map((item, idx) => (
            <SwiperSlide key={idx}>
              {/* PRODUCT CARD */}
              <div
                className="
                  border
                  border-gray-200
                  rounded-[5px]
                  p-[10px]
                  sm:p-4
                  bg-white
                  flex
                  flex-col
                  justify-between
                  h-[327px]
                  sm:h-[360px]
                  lg:h-[380px]
                  transition
                  hover:shadow-md
                "
              >
                {/* PRODUCT CONTENT */}
                <div>
                  {/* IMAGE */}
                  <div
                    className="
                      h-[128px]
                      sm:h-36
                      lg:h-[190px]
                      relative
                      mb-3
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="
                        max-h-full
                        max-w-full
                        object-contain
                      "
                    />
                  </div>

                  {/* PRODUCT NAME */}
                  <h4
                    className="
                      font-medium
                      text-[#172217]
                      text-[14px]
                      sm:text-sm
                      leading-[1.3]
                      mb-2
                      line-clamp-2
                      h-[38px]
                    "
                  >
                    {item.name}
                  </h4>
                </div>

                {/* PRICE + BUTTON */}
                <div>
                  {/* PRICE */}
                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      border-t
                      border-gray-100
                      pt-2.5
                      mb-2.5
                      gap-1
                    "
                  >
                    <span className="text-[14px] sm:text-xs font-bold text-[#172217]">
                      Price
                    </span>

                    <span
                      className="
                        text-[14px]
                        sm:text-base
                        font-bold
                        text-[#79B900]
                        whitespace-nowrap
                      "
                    >
                      Rs{item.price}
                    </span>
                  </div>

                  {/* SEE DETAILS */}
                  <Link
                    href={item.link}
                    className="
                      block
                      w-full
                      text-center
                      bg-[#79B900]
                      text-white
                      font-semibold
                      py-2.5
                      rounded-[6px]
                      text-[11px]
                      sm:text-xs
                      hover:bg-[#5f9200]
                      transition
                    "
                  >
                    See Details
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* VIEW ALL */}
      <div className="text-center mt-6">
        <Link
          href={viewAllLink}
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            bg-[#79B900]
            text-white
            font-bold
            px-7
            sm:px-8
            py-3
            rounded-[6px]
            text-sm
            hover:bg-[#5f9200]
            transition
            shadow-sm
          "
        >
          View All Products
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );

  return (
    <section className="py-10 sm:py-12 bg-white overflow-hidden">
      {/* FULL WIDTH CONTAINER */}
      <div className="w-full px-0">
        {/* =========================
            TOP ABOUT & STRIP HEADER
        ========================= */}
        <div className="flex flex-col items-center justify-center text-center mb-12 px-6 sm:px-12">
          {/* ABOUT US BADGE */}
          <div
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              border
              border-gray-300
              rounded-full
              px-4
              py-1.5
              mb-4
              text-sm
              text-[#172217]
              font-medium
            "
          >
            {/* SOLAR PANEL ICON */}
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4 text-[#79B900] shrink-0"
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

            <span>ABOUT US</span>
          </div>

          {/* HEADING */}
          <h2
            className="
              font-josefin
              text-3xl
              sm:text-5xl
              font-bold
              tracking-tight
              text-[#172217]
              uppercase
              text-center
            "
          >
            WHY SOLAR NOW <span className="text-[#79B900]">STATS STRIP</span>
          </h2>
        </div>

        {/* =========================
            SOLAR PANELS
        ========================= */}
        {renderCategorySlider(
          "Solar Panels",
          solarPanels,
          panelRef,
          "/solar-panels",
        )}

        {/* =========================
            INVERTERS
        ========================= */}
        {renderCategorySlider(
          "Inverters",
          inverters,
          inverterRef,
          "/inverters",
        )}

        {/* =========================
            BATTERIES
        ========================= */}
        {renderCategorySlider("Batteries", batteries, batteryRef, "/batteries")}
      </div>
    </section>
  );
}
