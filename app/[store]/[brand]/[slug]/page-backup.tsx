"use client";

import React, { useState, useEffect, useRef } from "react";
import localFont from "next/font/local";
import { brandsData, BrandData, Product } from "@/lib/brand-data";
import SolamoHeader from "@/components/SolamoHeader";
import SolamoFooter from "@/components/SolamoFooter";
import ProductGallery from "@/components/ProductGallery";
import BrandAdBanner from "@/components/BrandAdBanner";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import SolamoProductCarousel from "@/components/SolamoProductCarousel";
import { SHOW_DEMO_CONTENT, getReviewStats, getDemoReviews, getCustomersSay } from "@/lib/demo-content";
import ScrollRow from "./ScrollRow";

const helvetica = localFont({
  src: [
    { path: "./fonts/HelveticaNeueRoman.otf", weight: "400", style: "normal" },
    { path: "./fonts/HelveticaNeueMedium.otf", weight: "500", style: "normal" },
    { path: "./fonts/HelveticaNeueBold.otf", weight: "700", style: "normal" },
  ],
  display: "swap",
  fallback: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
});

interface PDPPageProps {
  params: {
    brand: string;
    slug: string;
  };
}

const SpecRow = ({ label, value }: { label: string; value: string }) => (
  <div className="grid grid-cols-[42%_58%] min-h-[42px] items-center border-b border-white bg-[#f3f4f0] px-3 py-2 text-[14px]">
    <div className="text-[#6b7280] font-normal">{label}</div>
    <div className="break-words font-medium text-[#1f2937]">{value}</div>
  </div>
);

export default function ProductDetailPage({ params }: PDPPageProps) {
  const brandKey = Object.keys(brandsData).find(
    (key) => brandsData[key].slug.toLowerCase() === params.brand.toLowerCase(),
  );

  const brand: BrandData | undefined = brandKey
    ? brandsData[brandKey]
    : undefined;

  const product: Product | undefined = brand?.products.find(
    (p) => p.id.toLowerCase() === params.slug.toLowerCase(),
  );

  // State for FBT checkboxes
  const [fbtChecked, setFbtChecked] = useState<Record<string, boolean>>({});
  // State for sticky bottom bar (IntersectionObserver)
  const [showStickyBar, setShowStickyBar] = useState(false);
  const buyBoxRef = useRef<HTMLDivElement>(null);

  // State for back-to-top button
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Review states (Phase 3)
  const [helpfulMap, setHelpfulMap] = useState<Record<string, boolean>>({});
  const [helpfulCounts, setHelpfulCounts] = useState<Record<string, number>>({});
  const [reviewFilter, setReviewFilter] = useState<number | null>(null);
  const [reviewSort, setReviewSort] = useState<"top" | "newest">("top");
  const [showAllReviews, setShowAllReviews] = useState(false);

  useEffect(() => {
    if (!product) return;
    const otherProducts = brand?.products.filter((p) => p.id !== product.id) || [];
    const uniqueOther = otherProducts.filter(
      (p, index, self) =>
        index === self.findIndex((t) => t.name.trim().toLowerCase() === p.name.trim().toLowerCase()),
    );
    const list = [product, uniqueOther[0] || product, uniqueOther[1] || uniqueOther[0] || product];
    const initialChecked: Record<string, boolean> = {};
    list.forEach((p, idx) => {
      initialChecked[`${p.id}-${idx}`] = true;
    });
    setFbtChecked(initialChecked);

    // Initialize reviews helpful state
    const reviews = SHOW_DEMO_CONTENT ? getDemoReviews(product.id) : [];
    const counts: Record<string, number> = {};
    const map: Record<string, boolean> = {};
    reviews.forEach((r) => {
      counts[r.id] = r.helpfulCount;
      try {
        const saved = localStorage.getItem(`solamo_helpful_${r.id}`);
        if (saved === "true") map[r.id] = true;
      } catch { }
    });
    setHelpfulCounts(counts);
    setHelpfulMap(map);
  }, [product, brand]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const node = buyBoxRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowStickyBar(!entry.isIntersecting);
      },
      { threshold: 0.1 },
    );
    observer.observe(node);
    return () => {
      if (node) observer.unobserve(node);
    };
  }, []);

  if (!brand || !product) {
    return (
      <>
        <SolamoHeader />
        <div
          className={`${helvetica.className} [&_:is(h1,h2,h3,h4,h5,h6,p,span,a,button,input,table,th,td,li,label)]:![font-family:inherit] min-h-screen bg-white text-[#1f2937]`}
        >
          <main className="mx-auto flex min-h-[60vh] max-w-[1800px] items-center justify-center px-4 py-20 md:px-6">
            <div className="text-center">
              <h1 className="mb-4 text-[22px] font-bold text-[#1f2937]">Product Not Found</h1>
              <p className="mb-8 text-[14px] font-normal text-[#6b7280]">
                The product you are looking for does not exist or has been removed.
              </p>
              <a
                href="/shop"
                className="inline-flex rounded-[6px] bg-[#79B900] px-6 py-3 text-[14px] font-bold text-white transition-colors hover:bg-[#5f9200]"
              >
                Back to Shop
              </a>
            </div>
          </main>
        </div>
        <SolamoFooter />
      </>
    );
  }

  const galleryImages = [product.image, brand.bannerImage].filter(Boolean) as string[];

  const price = product.price ?? 0;
  const hasPrice = price > 0;
  const oldPrice = hasPrice ? Math.round(price * 1.18) : 0;
  const whatsappUrl = `https://wa.me/923141349717?text=${encodeURIComponent(
    `I am interested in getting a quote for ${product.name}`,
  )}`;

  // Frequently bought together list with duplicate removal
  const otherProducts = brand.products.filter((p) => p.id !== product.id);
  const uniqueOtherProducts = otherProducts.filter(
    (p, index, self) =>
      index === self.findIndex((t) => t.name.trim().toLowerCase() === p.name.trim().toLowerCase()),
  );
  const rawFbt = [
    product,
    uniqueOtherProducts[0] || product,
    uniqueOtherProducts[1] || uniqueOtherProducts[0] || product,
  ];
  const seenFbtIds = new Set<string>();
  const fbtProducts = rawFbt.filter((p) => {
    if (seenFbtIds.has(p.id)) return false;
    seenFbtIds.add(p.id);
    return true;
  });

  const fbtTotalPrice = fbtProducts.reduce((sum, p, idx) => {
    const key = `${p.id}-${idx}`;
    const isChecked = fbtChecked[key] ?? true;
    return isChecked ? sum + (p.price ?? 150000) : sum;
  }, 0);

  const selectedFbtNames = fbtProducts
    .filter((p, idx) => fbtChecked[`${p.id}-${idx}`] ?? true)
    .map((p) => p.name);

  const fbtWhatsAppUrl = `https://wa.me/923141349717?text=${encodeURIComponent(
    `I would like to get a quote for the following items (Total: Rs ${fbtTotalPrice.toLocaleString()}): ${selectedFbtNames.join(", ")}`,
  )}`;

  const sidebarProduct = uniqueOtherProducts.find((p) => p.id !== product.id);
  const promoProducts = uniqueOtherProducts.filter((p) => p.id !== sidebarProduct?.id).slice(0, 2);

  // Review stats & data
  const reviewStats = SHOW_DEMO_CONTENT ? getReviewStats(product.id) : null;
  const rawReviews = SHOW_DEMO_CONTENT ? getDemoReviews(product.id) : [];
  const customersSayBullets = SHOW_DEMO_CONTENT ? getCustomersSay(product.id) : [];

  const handleHelpfulToggle = (reviewId: string) => {
    const current = helpfulMap[reviewId] || false;
    const next = !current;
    setHelpfulMap((prev) => ({ ...prev, [reviewId]: next }));
    setHelpfulCounts((prev) => ({
      ...prev,
      [reviewId]: (prev[reviewId] || 0) + (next ? 1 : -1),
    }));
    try {
      localStorage.setItem(`solamo_helpful_${reviewId}`, String(next));
    } catch { }
  };

  const filteredReviews = rawReviews.filter((r) => {
    if (reviewFilter === null) return true;
    return r.rating === reviewFilter;
  });

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (reviewSort === "top") {
      return (helpfulCounts[b.id] ?? b.helpfulCount) - (helpfulCounts[a.id] ?? a.helpfulCount);
    } else {
      return b.id.localeCompare(a.id);
    }
  });

  const displayedReviews = showAllReviews ? sortedReviews : sortedReviews.slice(0, 3);

  // Carousels data (Phase 2)
  const allProductsWithBrand = Object.values(brandsData).flatMap((b) =>
    (b.products || []).map((p) => ({ ...p, brandName: b.name, brandSlug: b.slug }))
  );

  const usedProductIds = new Set<string>([product.id]);

  const moreFromBrandProducts = (brand.products || [])
    .filter((p) => p.id !== product.id && !usedProductIds.has(p.id))
    .slice(0, 12);
  moreFromBrandProducts.forEach((p) => usedProductIds.add(p.id));

  const customersAlsoViewedProducts = allProductsWithBrand
    .filter(
      (p) =>
        p.category.toLowerCase() === product.category.toLowerCase() &&
        p.brandSlug !== brand.slug &&
        !usedProductIds.has(p.id)
    )
    .slice(0, 12);
  customersAlsoViewedProducts.forEach((p) => usedProductIds.add(p.id));

  const relatedToThisProducts = allProductsWithBrand
    .filter(
      (p) =>
        p.category.toLowerCase() === product.category.toLowerCase() &&
        !usedProductIds.has(p.id)
    )
    .slice(0, 12);
  relatedToThisProducts.forEach((p) => usedProductIds.add(p.id));

  const topPicksProducts = allProductsWithBrand
    .filter(
      (p) =>
        p.category.toLowerCase() !== product.category.toLowerCase() &&
        !usedProductIds.has(p.id)
    )
    .slice(0, 12);
  topPicksProducts.forEach((p) => usedProductIds.add(p.id));

  const categoryRouteMap: Record<string, string> = {
    "batteries": "/batteries",
    "inverters": "/inverters",
    "solar panel": "/solar-panels",
    "power bank": "/shop",
  };
  const catLower = product.category.toLowerCase();
  const categoryHref = categoryRouteMap[catLower] || "/shop";

  return (
    <>
      <SolamoHeader />
      <div
        className={`${helvetica.className} [&_:is(h1,h2,h3,h4,h5,h6,p,span,a,button,input,table,th,td,li,label)]:![font-family:inherit] min-h-screen bg-white text-[#1f2937] pb-24 sm:pb-0 overflow-x-clip`}
      >
       

        <main className="w-full min-w-0">
          {/* =========================
              PDP TOP AREA
          ========================== */}
          <div className="mx-auto max-w-[1800px] px-4 pb-8 pt-4 md:px-6 lg:px-8">
            {/* Breadcrumb — unchanged */}
            <nav
              aria-label="Breadcrumb"
              className="mb-4 flex min-w-0 items-center gap-2 overflow-x-auto whitespace-nowrap text-[13px] text-[#6b7280]"
            >
              <a href="/" className="shrink-0 hover:text-[#5f9200]">
                Home
              </a>
              <span>/</span>
              <a href="/shop" className="shrink-0 hover:text-[#5f9200]">
                Shop
              </a>
              <span>/</span>
              <span className="shrink-0">{brand.name}</span>
              <span>/</span>
              <span className="max-w-[320px] truncate font-medium text-[#1f2937]">
                {product.name}
              </span>
            </nav>

            {/* Noon-inspired PDP grid */}
            <div
              className="
                grid
                grid-cols-1
                items-start
                gap-x-6
                gap-y-8
                lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)_300px]
                xl:grid-cols-[minmax(0,1.08fr)_minmax(400px,0.92fr)_320px]
              "
            >
              {/* LEFT — Gallery */}
              <div className="min-w-0 lg:sticky lg:top-24 lg:self-start lg:max-h-[calc(100vh-120px)] lg:overflow-y-auto">
                <ProductGallery images={galleryImages} productName={product.name} />
              </div>

              {/* CENTER — Product Information */}
              <div className="min-w-0 text-[#1f2937]">
                {/* Brand Link */}
                <a
                  href="/shop"
                  className="
                    inline-flex
                    items-center
                    gap-1
                    text-[13px]
                    font-bold
                    text-[#4D7C0F]
                    hover:underline
                  "
                >
                  {brand.name}
                  <svg
                    className="h-3 w-3 shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </a>

                {/* Product Title (20-22px, weight 500) */}
                <h1
                  className="
                    mt-1
                    text-[20px]
                    sm:text-[22px]
                    font-medium
                    leading-[1.3]
                    text-[#1f2937]
                  "
                >
                  {product.name}
                </h1>

                {/* Rating Row (Phase 3 - Item 11: hidden when no reviews or flag false) */}
                {/* {reviewStats && reviewStats.count > 0 && (
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className="text-[14px] font-medium text-[#1f2937]">{reviewStats.rating}</span>
                    <div className="flex items-center text-[#4D7C0F]">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="h-4 w-4 shrink-0 fill-current" viewBox="0 0 24 24">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                    <a
                      href="#ratings-reviews"
                      className="text-[14px] font-medium text-[#4D7C0F] underline hover:text-[#5f9200]"
                    >
                      {reviewStats.count} Ratings
                    </a>
                  </div>
                )} */}

                {/* Price Block */}
                <div className="mt-4 border-b border-[#e7eae4] pb-4">
                  <div className="flex flex-wrap items-baseline gap-2">
                    <span className="text-[24px] sm:text-[28px] font-bold text-[#1f2937]">
                      {hasPrice ? `Rs ${price.toLocaleString()}` : "Price on Request"}
                    </span>
                    {hasPrice && (
                      <>
                        <span className="text-[13px] text-[#6b7280] line-through">
                          Rs {oldPrice.toLocaleString()}
                        </span>
                        <span className="rounded bg-[#f2f9e6] px-1.5 py-0.5 text-[13px] font-bold text-[#4D7C0F]">
                          15% Off
                        </span>
                      </>
                    )}
                  </div>

                  {hasPrice && (
                    <div className="mt-1 text-[13px] text-[#6b7280]">
                      Inclusive of all applicable taxes &amp; standard warranty
                    </div>
                  )}
                </div>

                {/* Explore other products in category */}
                <a
                  href="/shop"
                  className="
                    mt-3
                    flex
                    min-h-[40px]
                    items-center
                    justify-between
                    rounded-[6px]
                    bg-[#f2f9e6]
                    px-3
                    py-2
                    text-[14px]
                    font-normal
                    text-[#1f2937]
                    transition-colors
                    hover:bg-[#e8f3d2]
                  "
                >
                  <div className="flex min-w-0 items-center gap-2">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#79B900] text-white text-[10px]">
                      ★
                    </span>
                    <span className="min-w-0 truncate">
                      Explore other products in{" "}
                      <span className="font-medium text-[#4D7C0F]">
                        {product.category}
                      </span>
                    </span>
                  </div>
                  <svg
                    className="ml-3 h-4 w-4 shrink-0 text-[#4D7C0F]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </a>

                {/* Service Information */}
                <div className="mt-5 border-t border-[#e7eae4] pt-4">
                  <div className="mb-2 text-[13px] font-bold text-[#6b7280] tracking-[0.02em] uppercase">
                    SERVICE INFORMATION
                  </div>
                  <div
                    className="
                      flex
                      flex-wrap
                      items-center
                      justify-between
                      gap-2
                      gap-x-3
                      rounded-[6px]
                      bg-[#f7fbeF]
                      px-3
                      py-2.5
                      text-[14px]
                    "
                  >
                    <div className="flex items-center gap-2">
                      <svg
                        className="h-4 w-4 shrink-0 text-[#79B900]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>Professional installation in Karachi</span>
                    </div>
                    <span className="font-bold text-[#4D7C0F]">
                      Free Site Assessment
                    </span>
                  </div>
                </div>

                {/* Coupons Section */}
                <div className="mt-5 border-t border-[#e7eae4] pt-4">
                  <div className="mb-2 text-[13px] font-bold text-[#6b7280] tracking-[0.02em] uppercase">
                    COUPONS
                  </div>
                  <ScrollRow className="gap-3">
                    {/* Coupon Card 1 */}
                    <div className="flex-none w-[300px] sm:w-[340px] snap-start flex items-center justify-between rounded-[8px] border border-[#d8ddd3] bg-white p-3 text-[14px]">
                      <div className="flex items-start gap-2.5 min-w-0">
                        <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded bg-[#f2f9e6] text-[#4D7C0F]">
                          🏷️
                        </div>
                        <div className="min-w-0">
                          <div className="font-medium text-[#1f2937] line-clamp-2">
                            Get 15% cashback up to Rs 5,000
                          </div>
                          <a href="#learn-more" className="text-[13px] text-[#4D7C0F] underline hover:text-[#5f9200]">
                            Learn more
                          </a>
                        </div>
                      </div>
                      <div
                        className="flex-none ml-2 flex items-center gap-1 rounded border border-dashed border-[#79B900] bg-[#f2f9e6] px-2 py-1 font-mono font-bold text-[#4D7C0F] text-[12px]"
                        title="Coupon code"
                      >
                        <span>SAVE15</span>
                        <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"></path></svg>
                      </div>
                    </div>

                    {/* Coupon Card 2 */}
                    <div className="flex-none w-[300px] sm:w-[340px] snap-start flex items-center justify-between rounded-[8px] border border-[#d8ddd3] bg-white p-3 text-[14px]">
                      <div className="flex items-start gap-2.5 min-w-0">
                        <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded bg-[#f2f9e6] text-[#4D7C0F]">
                          🏷️
                        </div>
                        <div className="min-w-0">
                          <div className="font-medium text-[#1f2937] line-clamp-2">
                            Rs 2,000 off on Inverters &amp; Panels
                          </div>
                          <a href="#learn-more" className="text-[13px] text-[#4D7C0F] underline hover:text-[#5f9200]">
                            Learn more
                          </a>
                        </div>
                      </div>
                      <div
                        className="flex-none ml-2 flex items-center gap-1 rounded border border-dashed border-[#79B900] bg-[#f2f9e6] px-2 py-1 font-mono font-bold text-[#4D7C0F] text-[12px]"
                        title="Coupon code"
                      >
                        <span>SOLAMO2K</span>
                        <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"></path></svg>
                      </div>
                    </div>
                  </ScrollRow>
                </div>

                {/* Payment Discount Section */}
                <div className="mt-5 border-t border-[#e7eae4] pt-4">
                  <div className="mb-2 text-[13px] font-bold text-[#6b7280] tracking-[0.02em] uppercase">
                    PAYMENT DISCOUNTS
                  </div>
                  <ScrollRow className="gap-3">
                    {/* Payment Card 1 */}
                    <div className="flex-none min-w-[280px] snap-start flex items-center justify-between rounded-[8px] bg-[#f2f9e6] p-3 text-[14px]">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-[#4D7C0F] font-bold text-[12px] shadow-sm">
                          MB
                        </div>
                        <div className="min-w-0">
                          <div className="font-medium text-[#1f2937] line-clamp-2">Meezan Bank Credit Cards</div>
                          <div className="text-[13px] text-[#6b7280] line-clamp-2">Save Rs 500 &amp; 0% markup installments</div>
                        </div>
                      </div>
                      <a href="#apply" className="flex-none ml-2 font-medium text-[#4D7C0F] underline hover:text-[#5f9200]">
                        Coming Soon
                      </a>
                    </div>

                    {/* Payment Card 2 */}
                    <div className="flex-none min-w-[280px] snap-start flex items-center justify-between rounded-[8px] bg-[#f2f9e6] p-3 text-[14px]">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-[#4D7C0F] font-bold text-[12px] shadow-sm">
                          HB
                        </div>
                        <div className="min-w-0">
                          <div className="font-medium text-[#1f2937] line-clamp-2">HBL Solar Financing</div>
                          <div className="text-[13px] text-[#6b7280] line-clamp-2">Flexible monthly payment plans</div>
                        </div>
                      </div>
                      <a href="#apply" className="flex-none ml-2 font-medium text-[#4D7C0F] underline hover:text-[#5f9200]">
                        Coming Soon
                      </a>
                    </div>
                  </ScrollRow>
                </div>

                {/* Promo Banners */}
                <div className="mt-5 flex flex-col gap-3">
                  {/* Banner 1 */}
                  <div className="relative flex min-h-[110px] sm:min-h-[120px] items-center justify-between overflow-hidden rounded-[12px] bg-gradient-to-r from-[#4D7C0F] to-[#79B900] p-5 text-white shadow-sm">
                 <h1>video ad</h1>
                   
                  </div>

                  {/* Banner 2 */}
                  <div className="relative flex min-h-[110px] sm:min-h-[120px] items-center justify-between overflow-hidden rounded-[12px] bg-gradient-to-r from-[#1f2937] to-[#344034] p-5 text-white shadow-sm">
                    video ad
                  </div>
                </div>
              </div>

              {/* RIGHT SIDEBAR with ref for IntersectionObserver */}
              <div ref={buyBoxRef}>
                <aside
                  className="
                    lg:sticky
                    lg:top-24
                    flex
                    flex-col
                    rounded-[8px]
                    border
                    border-[#e5e8e1]
                    bg-white
                    text-[#1f2937]
                    overflow-hidden
                    shadow-sm
                  "
                >
                  {/* Seller Header */}
                  <div className="p-4 border-b border-[#e5e8e1] flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f2f9e6] text-[#4D7C0F] font-bold text-[14px]">
                      S
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[14px] font-medium text-[#1f2937] hover:underline cursor-pointer">
                        Sold by <span className="font-bold">Solamo Energy</span> &gt;
                      </div>
                      <div className="text-[13px] font-medium text-[#4D7C0F] mt-0.5">
                        Trusted Partner ★ | Solamo Energy
                      </div>
                    </div>
                  </div>

                  {/* Rows with icons */}
                  <div className="px-4 py-3 border-b border-[#e5e8e1] space-y-2.5">
                    <div className="flex items-center gap-2.5 text-[14px] text-[#1f2937]">
                      <svg className="h-4 w-4 shrink-0 text-[#79B900]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      <span>Warranty Included</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-[14px] text-[#1f2937]">
                      <svg className="h-4 w-4 shrink-0 text-[#79B900]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                      <span>Secure Payments</span>
                    </div>
                  </div>

                  {/* Estimated Price Content */}
                  <div className="px-4 py-3.5 border-b border-[#e5e8e1]">
                    <div className="text-[14px] font-normal text-[#6b7280]">
                      Estimated Price
                    </div>
                    <div className="mt-1 text-[22px] font-bold leading-7 text-[#1f2937]">
                      {hasPrice ? `Rs ${price.toLocaleString()}` : "Price on Request"}
                    </div>
                  </div>

                  <div className="p-4">
                    <a
                      href="/free-quote"
                      className="
                        flex
                        h-[44px]
                        w-full
                        items-center
                        justify-center
                        rounded-[6px]
                        bg-[#79B900]
                        text-[14px]
                        font-bold
                        uppercase
                        text-white
                        transition-colors
                        hover:bg-[#5f9200]
                      "
                    >
                      Get Free Quote
                    </a>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        mt-2
                        flex
                        h-[44px]
                        w-full
                        items-center
                        justify-center
                        rounded-[6px]
                        border
                        border-[#25D366]
                        text-[14px]
                        font-bold
                        uppercase
                        text-[#128C7E]
                        transition-colors
                        hover:bg-[#25D366]
                        hover:text-white
                      "
                    >
                      WhatsApp Us
                    </a>
                  </div>
                </aside>

                {/* PHASE 1 - Item 4: Sidebar below buy box ("Discover [Brand]" card and one small product card) */}
                {brand.bannerImage && (
                  <div className="mt-4 rounded-[8px] border border-[#e5e8e1] bg-white p-4 shadow-sm">
                    <div className="text-[12px] font-bold text-[#6b7280] uppercase mb-2">
                      Discover {brand.name}
                    </div>
                    <a href={`/brand/${brand.slug}`} className="block overflow-hidden rounded-md border border-[#e5e8e1] hover:opacity-95 transition">
                      <img src={brand.bannerImage} alt={brand.name} className="w-full h-24 object-cover" />
                      <div className="p-2 text-center text-[13px] font-bold text-[#4D7C0F]">
                        Visit {brand.name} Store &gt;
                      </div>
                    </a>
                  </div>
                )}

                {sidebarProduct && (
                  <div className="mt-3 rounded-[8px] border border-[#e5e8e1] bg-white p-3 shadow-sm flex items-center gap-3">
                    <div className="h-16 w-16 shrink-0 flex items-center justify-center bg-[#f3f4f0] rounded p-1">
                      <img src={sidebarProduct.image} alt={sidebarProduct.name} className="max-h-full max-w-full object-contain" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[12px] text-[#6b7280]">{brand.name}</div>
                      <div className="text-[13px] font-medium text-[#1f2937] truncate">{sidebarProduct.name}</div>
                      <div className="text-[13px] font-bold text-[#4D7C0F] mt-0.5">Rs {(sidebarProduct.price ?? 0).toLocaleString()}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Light gray full-width separator band */}
          <div className="h-3 w-full bg-[#f3f4f0]" />
 {/* PHASE 1 - Item 1: Ad strip between header and breadcrumb */}
        <div className="mx-auto max-w-[1800px] px-4 pt-3 md:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[10px] shadow-xs">
            <BrandAdBanner video="/ads/banner-1.mp4.mp4" />
          </div>
        </div>
          {/* =========================
              TABS & PRODUCT OVERVIEW
          ========================== */}
          <div className="border-b border-[#eceee8] bg-white sticky top-0 z-20 shadow-xs">
            <div className="mx-auto flex max-w-[1800px] gap-3 overflow-x-auto px-4 py-3 md:px-6 lg:px-8 scrollbar-none">
              <a
                href="#overview"
                className="
                  shrink-0
                  rounded-full
                  border
                  border-[#d8ddd3]
                  bg-white
                  px-4
                  py-2
                  text-[14px]
                  font-medium
                  text-[#1f2937]
                  transition-colors
                  hover:border-[#79B900]
                  hover:text-[#5f9200]
                "
              >
                Product Overview
              </a>
              <a
                href="#ratings-reviews"
                className="
                  shrink-0
                  rounded-full
                  border
                  border-[#d8ddd3]
                  bg-white
                  px-4
                  py-2
                  text-[14px]
                  font-medium
                  text-[#1f2937]
                  transition-colors
                  hover:border-[#79B900]
                  hover:text-[#5f9200]
                "
              >
                Ratings &amp; Reviews
              </a>
            </div>
          </div>

          <div className="mx-auto max-w-[1800px] px-4 md:px-6 lg:px-8 py-8">
            <section id="overview" className="scroll-mt-24">
              <h2 className="mb-4 border-b border-[#e5e8e1] pb-3 text-[22px] font-bold leading-[1.3] text-[#1f2937]">
                Product Overview
              </h2>
              <p className="max-w-[1000px] text-[14px] font-normal leading-6 text-[#4f584f]">
                {product.description || brand.description}
              </p>

              {/* Specifications INSIDE Product Overview */}
              <div id="specifications" className="mt-8 scroll-mt-24">
                <div className="mb-3 text-[13px] font-bold text-[#6b7280] tracking-[0.02em] uppercase">
                  SPECIFICATIONS
                </div>
                <div className="grid grid-cols-1 gap-x-3 md:grid-cols-2">
                  <SpecRow label="Model Name" value={product.name} />
                  <SpecRow label="Model Number" value={product.id} />
                  <SpecRow label="Category" value={product.category} />
                  <SpecRow label="Manufacturer" value={brand.name} />
                  <SpecRow label="Availability" value="In Stock / Ready" />
                  <SpecRow label="Warranty" value="Standard warranty included" />
                </div>
              </div>
            </section>
          </div>

          {/* Light gray full-width separator band */}
          <div className="h-3 w-full bg-[#f3f4f0]" />

          {/* =========================
              PHASE 3 - NOON-STYLE RATINGS & REVIEWS
          ========================== */}
          <div className="mx-auto max-w-[1800px] px-4 md:px-6 lg:px-8 py-12" id="ratings-reviews">
            <h2 className="mb-6 border-b border-[#e5e8e1] pb-3 text-[22px] font-bold leading-[1.3] text-[#1f2937]">
              Product Ratings &amp; Reviews
            </h2>

            {SHOW_DEMO_CONTENT && reviewStats && reviewStats.count > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left side: Rating summary & distribution (Col span 4) */}
                <div className="lg:col-span-4 bg-[#f9faf8] border border-[#e5e8e1] rounded-xl p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-4xl font-black text-[#1f2937]">
                      {reviewStats.rating}
                    </div>
                    <div>
                      <div className="flex items-center text-[#4D7C0F] mb-1">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="h-4 w-4 shrink-0 fill-current" viewBox="0 0 24 24">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        ))}
                      </div>
                      <div className="text-[13px] text-[#6b7280]">
                        Based on {reviewStats.count} ratings
                      </div>
                    </div>
                  </div>

                  {/* Distribution bars */}
                  <div className="space-y-2 mb-6">
                    {[
                      { stars: 5, pct: 78 },
                      { stars: 4, pct: 16 },
                      { stars: 3, pct: 4 },
                      { stars: 2, pct: 1 },
                      { stars: 1, pct: 1 },
                    ].map((row) => (
                      <button
                        key={row.stars}
                        onClick={() => setReviewFilter(reviewFilter === row.stars ? null : row.stars)}
                        className={`w-full flex items-center gap-2 text-xs transition hover:opacity-80 p-1 rounded ${reviewFilter === row.stars ? "bg-[#f2f9e6]" : ""
                          }`}
                      >
                        <span className="w-12 text-left font-medium text-[#1f2937]">{row.stars} ★</span>
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#79B900] rounded-full"
                            style={{ width: `${row.pct}%` }}
                          />
                        </div>
                        <span className="w-10 text-right text-[#6b7280]">{row.pct}%</span>
                      </button>
                    ))}
                    {reviewFilter !== null && (
                      <button
                        onClick={() => setReviewFilter(null)}
                        className="mt-2 text-xs font-bold text-[#4D7C0F] underline hover:text-[#5f9200]"
                      >
                        Clear filter ({reviewFilter}★)
                      </button>
                    )}
                  </div>

                  {/* Customers say summary box */}
                  {customersSayBullets.length > 0 && (
                    <div className="bg-white border border-[#e5e8e1] rounded-lg p-4 mt-6">
                      <div className="text-[13px] font-bold text-[#1f2937] mb-2">
                        Customers say
                      </div>
                      <ul className="space-y-2 text-[13px] text-[#4f584f]">
                        {customersSayBullets.map((bullet, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-[#79B900] font-bold">•</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Right side: Review list, filter/sort, FAQ blocks (Col span 8) */}
                <div className="lg:col-span-8 flex flex-col gap-6">
                  {/* Controls */}
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#e5e8e1] pb-4">
                    <div className="flex items-center gap-2 text-[14px] font-medium text-[#1f2937]">
                      <span>Reviews ({rawReviews.length})</span>
                      {reviewFilter !== null && (
                        <span className="text-xs bg-[#f2f9e6] text-[#4D7C0F] px-2 py-0.5 rounded font-bold">
                          Filtered: {reviewFilter}★
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-[#6b7280]">Sort by:</span>
                      <select
                        value={reviewSort}
                        onChange={(e) => setReviewSort(e.target.value as "top" | "newest")}
                        aria-label="Sort reviews"
                        className="border border-[#d8ddd3] rounded px-3 py-1.5 text-sm bg-white text-[#1f2937] outline-none font-medium"
                      >
                        <option value="top">Top Reviews</option>
                        <option value="newest">Newest</option>
                      </select>
                    </div>
                  </div>

                  {/* Review Cards */}
                  <div className="space-y-4">
                    {displayedReviews.length === 0 ? (
                      <div className="text-center py-8 text-[#6b7280] text-sm">
                        No reviews match your selected filter.
                      </div>
                    ) : (
                      displayedReviews.map((rev) => {
                        const isHelpful = helpfulMap[rev.id] || false;
                        const currentCount = helpfulCounts[rev.id] ?? rev.helpfulCount;
                        return (
                          <div key={rev.id} className="border border-[#e5e8e1] rounded-xl p-5 bg-white shadow-xs">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <div className="flex items-center text-[#4D7C0F]">
                                  {[...Array(rev.rating)].map((_, i) => (
                                    <svg key={i} className="h-3.5 w-3.5 shrink-0 fill-current" viewBox="0 0 24 24">
                                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                    </svg>
                                  ))}
                                </div>
                                <span className="font-bold text-[14px] text-[#1f2937]">{rev.title}</span>
                              </div>
                              <span className="text-xs text-[#6b7280]">{rev.date}</span>
                            </div>

                            <p className="text-[14px] text-[#4f584f] mb-3 leading-relaxed">
                              {rev.text}
                            </p>

                            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#f3f4f0] text-xs">
                              <div className="flex items-center gap-3">
                                <span className="font-semibold text-[#1f2937]">{rev.author}</span>
                                {rev.verified && (
                                  <span className="inline-flex items-center gap-1 bg-[#f2f9e6] text-[#4D7C0F] px-2 py-0.5 rounded font-medium">
                                    ✓ Verified Purchase
                                  </span>
                                )}
                              </div>

                              <button
                                onClick={() => handleHelpfulToggle(rev.id)}
                                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded border transition ${isHelpful
                                    ? "bg-[#f2f9e6] border-[#79B900] text-[#4D7C0F] font-bold"
                                    : "bg-white border-[#d8ddd3] text-[#6b7280] hover:text-[#1f2937]"
                                  }`}
                              >
                                <span>Helpful ({currentCount})</span>
                              </button>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>

                  {/* View All Reviews Button */}
                  {!showAllReviews && sortedReviews.length > 3 && (
                    <button
                      onClick={() => setShowAllReviews(true)}
                      className="w-full py-3 rounded-lg border border-[#79B900] text-[#4D7C0F] font-bold text-sm bg-[#f2f9e6] hover:bg-[#e8f3d2] transition text-center"
                    >
                      View All Reviews ({sortedReviews.length})
                    </button>
                  )}

                  {/* Existing FAQ blocks */}
                  <div className="mt-6 pt-6 border-t border-[#e5e8e1] space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f2f9e6] text-[#4D7C0F] text-[12px] font-bold mt-0.5">
                        ?
                      </div>
                      <div>
                        <h3 className="text-[15px] font-medium text-[#1f2937]">
                          How do I review this product?
                        </h3>
                        <p className="mt-1 text-[14px] font-normal text-[#6b7280] leading-5">
                          If you recently purchased this product from Solamo Energy, go to your Orders page and click on the Submit Review button.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f2f9e6] text-[#4D7C0F] text-[12px] font-bold mt-0.5">
                        ?
                      </div>
                      <div>
                        <h3 className="text-[15px] font-medium text-[#1f2937]">
                          Where do the reviews come from?
                        </h3>
                        <p className="mt-1 text-[14px] font-normal text-[#6b7280] leading-5">
                          Our reviews are from Solamo Energy customers who purchased the product and submitted a review.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // Empty state
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start relative">
                <div className="flex flex-col items-center justify-center py-6 text-center">
                  <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-[#f2f9e6] text-[#79B900]">
                    <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <p className="text-[15px] font-medium text-[#1f2937] max-w-[320px]">
                    This product doesn&apos;t have any ratings or reviews yet.
                  </p>
                  <p className="mt-1.5 text-[14px] font-normal text-[#6b7280] max-w-[320px]">
                    Be the first to share your experience with Solamo Energy products!
                  </p>
                </div>

                <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-[#e5e8e1]" />

                <div className="flex flex-col gap-6 lg:pl-8">
                  <div className="flex items-start gap-3">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f2f9e6] text-[#4D7C0F] text-[12px] font-bold mt-0.5">
                      ?
                    </div>
                    <div>
                      <h3 className="text-[15px] font-medium text-[#1f2937]">
                        How do I review this product?
                      </h3>
                      <p className="mt-1 text-[14px] font-normal text-[#6b7280] leading-5">
                        If you recently purchased this product from Solamo Energy, go to your Orders page and click on the Submit Review button.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f2f9e6] text-[#4D7C0F] text-[12px] font-bold mt-0.5">
                      ?
                    </div>
                    <div>
                      <h3 className="text-[15px] font-medium text-[#1f2937]">
                        Where do the reviews come from?
                      </h3>
                      <p className="mt-1 text-[14px] font-normal text-[#6b7280] leading-5">
                        Our reviews are from Solamo Energy customers who purchased the product and submitted a review.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* PHASE 1 - Item 5: Brand promo strip between reviews section and carousels */}
          {brand.bannerImage && (
            <div className="mx-auto max-w-[1800px] px-4 py-6 md:px-6 lg:px-8">
              <div className="rounded-[12px] border border-[#e5e8e1] bg-white p-4 shadow-sm">

                {(() => {
                  const numCards = promoProducts.length;
                  const gridClass =
                    numCards === 2
                      ? ""
                      : numCards === 1
                        ? ""
                        : "grid-cols-1";
                  return (
                    <div className={`grid ${gridClass} gap-4 items-center`}>
                      <div className="overflow-hidden rounded-lg shadow-xs h-[220px] min-w-0">
                        <BrandAdBanner brand={brand.slug} video="/ads/banner-2.mp4.mp4" noWrapper />
                      </div>
                     
                    </div>
                  );
                })()}
                {promoProducts.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-4 mt-4">
                    {promoProducts.map((p) => (
                      <div key={p.id} className="rounded-lg border border-[#e5e8e1] p-3 flex items-center gap-3 bg-[#f9faf8]">
                        <div className="h-16 w-16 shrink-0 flex items-center justify-center bg-white rounded p-1">
                          <img src={p.image} alt={p.name} className="max-h-full max-w-full object-contain" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-[12px] text-[#6b7280]">{brand.name}</div>
                          <div className="text-[13px] font-medium text-[#1f2937] truncate">{p.name}</div>
                          <div className="text-[13px] font-bold text-[#4D7C0F] mt-0.5">Rs {(p.price ?? 0).toLocaleString()}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* PHASE 2 - Item 8: Four Carousels with real products and variant="noon" */}
          {moreFromBrandProducts.length >= 3 && (
            <SolamoProductCarousel
              title={`More From ${brand.name}`}
              subtitle={`Explore more products from ${brand.name}`}
              products={moreFromBrandProducts}
              badgeText={brand.name.toUpperCase()}
              viewAllHref={`/brand/${brand.slug}`}
              variant="noon"
            />
          )}

          {customersAlsoViewedProducts.length >= 3 && (
            <SolamoProductCarousel
              title="Customers Also Viewed"
              subtitle={`Popular alternatives in ${product.category}`}
              products={customersAlsoViewedProducts}
              badgeText="VIEWED"
              viewAllHref={categoryHref}
              variant="noon"
            />
          )}

          {relatedToThisProducts.length >= 3 && (
            <SolamoProductCarousel
              title="Products Related To This"
              subtitle={`More ${product.category} options`}
              products={relatedToThisProducts}
              badgeText="RELATED"
              viewAllHref={categoryHref}
              variant="noon"
            />
          )}

          {topPicksProducts.length >= 3 && (
            <SolamoProductCarousel
              title="Top Picks For You"
              subtitle="Recommended across other categories"
              products={topPicksProducts}
              badgeText="TOP PICK"
              viewAllHref="/shop"
              variant="noon"
            />
          )}
        </main>

        {/* PHASE 1 - Item 2: Sticky Bottom Bar after scrolling past buy box */}
        {showStickyBar && (
          <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#e5e8e1] px-4 py-2.5 shadow-xl flex items-center justify-between gap-3 sm:hidden animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center gap-2.5 min-w-0 flex-1">
              <div className="h-10 w-10 shrink-0 bg-[#f3f4f0] rounded p-1 flex items-center justify-center">
                <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[12px] font-medium text-[#1f2937] truncate">{product.name}</div>
                <div className="text-[13px] font-bold text-[#4D7C0F]">{hasPrice ? `Rs ${price.toLocaleString()}` : "On Request"}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <a
                href="/free-quote"
                className="rounded-[6px] bg-[#79B900] px-3 py-2 text-[12px] font-bold uppercase text-white"
              >
                Quote
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-[6px] border border-[#25D366] px-3 py-2 text-[12px] font-bold uppercase text-[#128C7E]"
              >
                WhatsApp
              </a>
            </div>
          </div>
        )}

        {/* PHASE 1 - Item 6: Back-to-top round button */}
        {showBackToTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
            className="fixed bottom-20 right-6 z-40 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#1f2937] shadow-lg border border-[#e5e8e1] hover:bg-[#f3f4f0] transition-colors"
          >
            ▲
          </button>
        )}

        {/* WhatsApp Float positioned at bottom-28 right-6 on mobile when sticky bar is active so there is ZERO overlap */}
        <div className={showStickyBar ? "sm:hidden" : ""}>
          <WhatsAppFloat />
        </div>

        <SolamoFooter />
      </div>
    </>
  );
}
