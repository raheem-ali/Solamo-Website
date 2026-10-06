"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { getAllProducts, slugify, type ApiProductLite } from "@/lib/api-products";
import { useCity } from "@/app/context/CityContext";

import "swiper/css";

type TrustedBrand = {
  slug: string;
  name: string;
  logo: string | null;
};

// list endpoint also returns the brand logo (brands.logo_url as brand_logo)
type ProductWithLogo = ApiProductLite & { brand_logo?: string | null };

export default function TrustedBrands() {
  const swiperRef = useRef<SwiperRef>(null);

  // Selected city from the header ("" = All Cities)
  const { city, ready } = useCity();

  const [brands, setBrands] = useState<TrustedBrand[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Every brand that has products, with its logo. Reloads when the city changes.
  useEffect(() => {
    if (!ready) return; // wait until the saved city is read from localStorage

    let cancelled = false;
    getAllProducts(city)
      .then((all) => {
        if (cancelled) return;
        const map = new Map<string, TrustedBrand>();
        for (const p of all as ProductWithLogo[]) {
          if (!p.brand_name) continue;
          const slug = slugify(p.brand_name);
          const existing = map.get(slug);
          if (existing) {
            if (!existing.logo && p.brand_logo) existing.logo = p.brand_logo;
          } else {
            map.set(slug, {
              slug,
              name: p.brand_name,
              logo: p.brand_logo || null,
            });
          }
        }
        // Brands with a logo first, then A to Z
        setBrands(
          Array.from(map.values()).sort((a, b) => {
            if (!!a.logo !== !!b.logo) return a.logo ? -1 : 1;
            return a.name.localeCompare(b.name);
          }),
        );
      })
      .catch(() => {
        if (!cancelled) setBrands([]);
      })
      .finally(() => {
        if (!cancelled) setLoaded(true);
      });

    return () => {
      cancelled = true;
    };
  }, [city, ready]);

  // Hide the section until loaded, and when there are no brands
  if (!loaded || brands.length === 0) return null;

  // Loop and autoplay only work smoothly with enough slides
  const canLoop = brands.length > 6;

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="max-w-[1300px] mx-auto px-4">
        {/* Title */}
        <h2 className="font-josefin text-3xl sm:text-4xl font-bold text-center text-[#172217] mb-12">
          Trusted Brands We Carry
        </h2>

        {/* Carousel Container */}
        <div className="relative px-8 sm:px-12 flex items-center">
          {/* Left Arrow */}
          <button
            onClick={() => swiperRef.current?.swiper?.slidePrev()}
            aria-label="Previous brand"
            className="absolute left-0 z-20 text-[#79B900] hover:scale-110 transition p-1"
          >
            <ChevronLeft className="w-8 h-8 stroke-[3]" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => swiperRef.current?.swiper?.slideNext()}
            aria-label="Next brand"
            className="absolute right-0 z-20 text-[#79B900] hover:scale-110 transition p-1"
          >
            <ChevronRight className="w-8 h-8 stroke-[3]" />
          </button>

          {/* Brand Slider */}
          <Swiper
            key={`${city || "all"}-${brands.length}`} // rebuild when the list changes
            ref={swiperRef}
            modules={[Autoplay]}
            autoplay={
              canLoop ? { delay: 2500, disableOnInteraction: false } : false
            }
            loop={canLoop}
            spaceBetween={30}
            slidesPerView={2}
            breakpoints={{
              640: { slidesPerView: 3, spaceBetween: 40 },
              768: { slidesPerView: 4, spaceBetween: 50 },
              1024: { slidesPerView: 5, spaceBetween: 60 },
            }}
            className="w-full flex items-center"
          >
            {brands.map((brand) => (
              <SwiperSlide
                key={brand.slug}
                className="flex items-center justify-center py-4"
              >
                <Link
                  href={`/brand/${brand.slug}`}
                  aria-label={`View ${brand.name} brand`}
                  className="h-20 w-full flex items-center justify-center transition duration-300 group"
                >
                  {brand.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      loading="lazy"
                      className="max-h-full max-w-[140px] object-contain group-hover:scale-105 transition duration-300"
                    />
                  ) : (
                    // No logo uploaded for this brand: show its name instead
                    <span className="text-lg font-bold text-[#172217] group-hover:text-[#79B900] transition duration-300 text-center">
                      {brand.name}
                    </span>
                  )}
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}