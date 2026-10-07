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