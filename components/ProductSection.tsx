"use client";

import React from "react";
import SolamoProductCarousel from "@/components/SolamoProductCarousel";

/**
 * Home page shop section.
 * Each carousel loads real products from the database (filtered by the city
 * selected in the header) and renders them with the shared ProductCard design.
 *
 * categoryFilter matches category_name (case-insensitive, partial match), so
 * "batter" matches both "Battery" and "Batteries". Separate several with commas.
 */
export default function ShopSection() {
  return (
    <section className="py-10 sm:py-12 bg-white overflow-hidden">
      <div className="w-full px-0">
        {/* TOP ABOUT & STRIP HEADER */}
        <div className="flex flex-col items-center justify-center text-center mb-6 px-6 sm:px-12">
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

        {/* SOLAR PANELS */}
        <SolamoProductCarousel
          title="Solar Panels"
          subtitle="Mono, bifacial and N-type panels"
          categoryFilter="solar panel"
          badgeText="PANEL"
          viewAllHref="/category/solar-panels"
        />

        {/* INVERTERS */}
        <SolamoProductCarousel
          title="Inverters"
          subtitle="Hybrid, on-grid and off-grid inverters"
          categoryFilter="inverter"
          badgeText="INVERTER"
          viewAllHref="/category/inverters"
        />

        {/* BATTERIES */}
        <SolamoProductCarousel
          title="Batteries"
          subtitle="Lithium and storage batteries"
          categoryFilter="batter"
          badgeText="BATTERY"
          viewAllHref="/category/batteries"
        />
      </div>
    </section>
  );
}