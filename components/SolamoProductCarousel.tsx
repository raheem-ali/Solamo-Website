"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { ChevronLeft, ChevronRight, ArrowUpRight, Zap } from "lucide-react";
import { brandsData, Product } from "@/lib/brand-data";
import { DummyProduct } from "@/lib/dummy-products";
import { getAllProducts, toCardProduct } from "@/lib/api-products";
import ProductCard from "./ProductCard";
// @ts-expect-error Swiper's stylesheet is a side-effect import without module types.
import "swiper/css";

const MAX_ITEMS = 1200;

// Set to true only if you want old static brandsData to appear
// when there are no real products and no dummy products.
const USE_STATIC_FALLBACK = false;

type CarouselProduct = Product & { brandName?: string };

interface SolamoProductCarouselProps {
  title: string;
  subtitle: string;
  /** Matches category_name (case-insensitive). Several allowed: "Power Banks,Charge Controllers" */
  categoryFilter?: string;
  badgeText: string;
  viewAllHref: string;
  dummyProducts?: DummyProduct[];
  products?: Product[];
  variant?: "default" | "noon";
}

function dummyToProduct(dp: DummyProduct): CarouselProduct {
  return {
    id: dp.id,
    name: dp.name,
    price: dp.price,
    image: dp.image,
    link: dp.link,
    category: "Accessories" as const,
    brandName: dp.brandName,
    priceOnRequest: dp.priceOnRequest,
  } as unknown as CarouselProduct;
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
  const [realProducts, setRealProducts] = useState<CarouselProduct[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Load real products from the API (skipped when `products` is passed directly)
  useEffect(() => {
    if (products) {
      setLoaded(true);
      return;
    }

    let cancelled = false;
    const filters = (categoryFilter || "")
      .toLowerCase()
      .split(",")
      .map((f) => f.trim())
      .filter(Boolean);

    getAllProducts()
      .then((all) => {
        if (cancelled) return;
        const matched = all
          .filter((p) => {
            if (filters.length === 0) return true;
            const cat = String(p.category_name || "").toLowerCase();
            return filters.some((f) => cat.includes(f));
          })
          .map((p) => toCardProduct(p) as unknown as CarouselProduct);
        setRealProducts(matched);
      })
      .catch(() => {
        if (!cancelled) setRealProducts([]);
      })
      .finally(() => {
        if (!cancelled) setLoaded(true);
      });

    return () => {
      cancelled = true;
    };
  }, [categoryFilter, products]);

  let productsToDisplay: CarouselProduct[] = [];

  if (products) {
    productsToDisplay = products.slice(0, MAX_ITEMS);
  } else {
    // Wait for the API so dummy items don't flash before real ones
    if (!loaded) return null;

    productsToDisplay = [...realProducts];

    // Fill the rest with dummy products (if provided)
    if (dummyProducts && productsToDisplay.length < MAX_ITEMS) {
      const needed = MAX_ITEMS - productsToDisplay.length;
      productsToDisplay.push(...dummyProducts.slice(0, needed).map(dummyToProduct));
    }

    // Optional old static fallback
    if (productsToDisplay.length === 0 && USE_STATIC_FALLBACK) {
      const filter = (categoryFilter || "").toLowerCase();
      productsToDisplay = Object.values(brandsData)
        .flatMap((brand) =>
          (brand.products || []).map((product) => ({
            ...product,
            brandName: brand.name,
          })),
        )
        .filter((product) =>
          String(product.category || "").toLowerCase().includes(filter),
        )
        .filter((product) => Number(product.price) > 0);
    }

    productsToDisplay = productsToDisplay.slice(0, MAX_ITEMS);
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
                  <ProductCard
                    product={product}
                    variant={variant}
                    badgeText={badgeText}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}