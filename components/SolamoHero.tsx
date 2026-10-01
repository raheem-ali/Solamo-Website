"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BatteryCharging,
  Building2,
  Home,
  Settings,
  ShieldCheck,
  ShoppingBag,
  Sun,
  Wrench,
  Zap,
} from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";

// =============================================================
// HERO SLIDES DATA
// Each slide = one banner in the carousel (noon-style rotating hero)
// =============================================================

type HeroSlide = {
  badge: string;
  heading: React.ReactNode;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  media: string;
  mediaType: "video" | "image";
};

const heroSlides: HeroSlide[] = [
  {
    badge: "Karachi's #1 Partner",
    heading: (
      <>
        <span className="text-[#84CC16]">Pakistan&apos;s</span> Most Trusted
        Solar Energy Company
      </>
    ),
    description:
      "Cut your electricity bills by up to 80%. Premium solar solutions for homes, businesses, farms & industries across Karachi.",
    primaryCta: { label: "Get Free Quote", href: "/free-quote" },
    secondaryCta: { label: "WhatsApp Now", href: "https://wa.me/923141349717" },
    media: "https://solamoenergy.com/wp-content/uploads/2026/05/Karachi-1.mp4",
    mediaType: "video",
  },
  {
    badge: "Limited Time Offer",
    heading: (
      <>
        Zero Down Payment on <span className="text-[#84CC16]">Hybrid</span>{" "}
        Solar Systems
      </>
    ),
    description:
      "Flexible installment plans on 5kW to 15kW hybrid systems. Book a free site survey this month and lock in today's rate.",
    primaryCta: { label: "Check Eligibility", href: "/free-quote" },
    secondaryCta: { label: "View Packages", href: "/shop" },
    media: "https://solamoenergy.com/wp-content/uploads/2026/05/Karachi-1.mp4",
    mediaType: "video",
  },
  {
    badge: "Now In Stock",
    heading: (
      <>
        N-Type Bifacial Panels — <span className="text-[#84CC16]">More</span>{" "}
        Power, Less Roof
      </>
    ),
    description:
      "Higher yield per square foot with 25-year performance warranty. Available for residential and commercial rooftops.",
    primaryCta: { label: "Shop Panels", href: "/shop/bifacial" },
    secondaryCta: {
      label: "Talk to an Expert",
      href: "https://wa.me/923141349717",
    },
    media: "https://solamoenergy.com/wp-content/uploads/2026/05/Karachi-1.mp4",
    mediaType: "video",
  },
];

export default function SolamoHero() {
  const categoryRef = useRef<HTMLDivElement>(null);
  const heroSliderRef = useRef<SwiperRef>(null);

  const categories = [
    { title: "Deals", icon: ShoppingBag, href: "/shop", bg: "bg-[#ffe9df]" },
    { title: "Solar Panels", icon: Sun, href: "/shop", bg: "bg-[#ffe9df]" },
    { title: "Inverters", icon: Zap, href: "/shop", bg: "bg-[#eee7ff]" },
    {
      title: "Batteries",
      icon: BatteryCharging,
      href: "/shop",
      bg: "bg-[#e5f5e8]",
    },
    {
      title: "Hybrid Systems",
      icon: Settings,
      href: "/services",
      bg: "bg-[#fff1d4]",
    },
    { title: "Residential", icon: Home, href: "/services", bg: "bg-[#e8f1ff]" },
    {
      title: "Commercial",
      icon: Building2,
      href: "/services",
      bg: "bg-[#f4eafa]",
    },
    {
      title: "Installation",
      icon: Wrench,
      href: "/services",
      bg: "bg-[#e6f4f0]",
    },
    {
      title: "Warranty",
      icon: ShieldCheck,
      href: "/contact-us",
      bg: "bg-[#f1f1f1]",
    },
  ];

  const scrollCategories = (direction: "left" | "right") => {
    if (!categoryRef.current) return;
    categoryRef.current.scrollBy({
      left: direction === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full bg-[#f5f5f5] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-3 sm:px-5 lg:px-6 pt-2 pb-5">
        {/* =========================================================
            1. PROMOTION BAR
        ========================================================= */}
        <div
          className="
            min-h-[42px] sm:min-h-[44px] bg-[#2563eb] rounded-md
            flex items-center justify-between gap-3
            px-3 sm:px-5 lg:px-6 py-2 mb-2
          "
        >
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <span className="shrink-0 bg-white text-[#2563eb] font-black text-[10px] sm:text-xs px-2.5 sm:px-3 py-1 rounded">
              SOLAMO
            </span>
            <span className="text-white font-extrabold text-[10px] sm:text-sm truncate">
              Free Site Assessment
            </span>
            <span className="hidden md:inline text-blue-100 text-xs">
              Get a complete solar assessment for your home or business
            </span>
          </div>

          <Link
            href="/free-quote"
            className="shrink-0 bg-[#84CC16] text-black font-bold text-[9px] sm:text-xs px-3 sm:px-5 py-1.5 rounded-md whitespace-nowrap hover:bg-[#65A30D] transition"
          >
            Get Free Quote
          </Link>
        </div>

        {/* =========================================================
            2. HERO CAROUSEL + FEATURE CARD
            Left: rotating banner slider (autoplay, pagination, arrows)
            Right: static feature card — matches noon's split hero grid
        ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-[7fr_3fr] gap-0 overflow-hidden rounded-lg">
          {/* LEFT: CAROUSEL */}
          <div className="relative overflow-hidden group">
            <button
              type="button"
              aria-label="Previous slide"
              onClick={() => heroSliderRef.current?.swiper?.slidePrev()}
              className="
                absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-30
                w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 shadow-md
                flex items-center justify-center
                opacity-0 group-hover:opacity-100 transition
                hover:bg-white
              "
            >
              <ArrowLeft className="w-5 h-5 text-black" />
            </button>

            <button
              type="button"
              aria-label="Next slide"
              onClick={() => heroSliderRef.current?.swiper?.slideNext()}
              className="
                absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-30
                w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 shadow-md
                flex items-center justify-center
                opacity-0 group-hover:opacity-100 transition
                hover:bg-white
              "
            >
              <ArrowRight className="w-5 h-5 text-black" />
            </button>

            <Swiper
              ref={heroSliderRef}
              modules={[Pagination, Autoplay]}
              slidesPerView={1}
              loop
              autoplay={{ delay: 5500, disableOnInteraction: false }}
              pagination={{ clickable: true, el: ".hero-pagination" }}
              className="w-full"
            >
              {heroSlides.map((slide, i) => (
                <SwiperSlide key={i}>
                  <div
                    className="
                      relative overflow-hidden bg-black
                      min-h-[360px] sm:min-h-[380px] md:h-[300px] md:min-h-0
                    "
                  >
                    {slide.mediaType === "video" ? (
                      <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        className="absolute inset-0 w-full h-full object-cover"
                        src={slide.media}
                      />
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={slide.media}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    )}

                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                    <div className="relative z-10 h-full flex flex-col justify-center px-5 sm:px-8 lg:px-10 xl:px-12 py-8">
                      <span
                        className="
                          w-fit inline-flex items-center gap-1.5 bg-[#84CC16] text-black
                          font-bold text-[8px] sm:text-[10px] px-2.5 sm:px-3 py-1.5
                          rounded-full mb-3
                        "
                      >
                        <Zap className="w-3 h-3 fill-black shrink-0" />
                        {slide.badge}
                      </span>

                      <h1
                        className="
                          text-white font-black text-[28px] leading-[1.04]
                          sm:text-[34px] md:text-[32px] lg:text-[40px] xl:text-[44px]
                          max-w-[700px]
                        "
                      >
                        {slide.heading}
                      </h1>

                      <p className="text-gray-100 text-[10px] sm:text-xs lg:text-sm mt-3 max-w-[580px] leading-5">
                        {slide.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-2 mt-4">
                        <Link
                          href={slide.primaryCta.href}
                          className="
                            min-h-[38px] bg-[#84CC16] text-black font-bold text-[10px] sm:text-xs
                            px-3.5 sm:px-4 py-2.5 rounded-md flex items-center justify-center gap-1
                            hover:bg-[#65A30D] transition
                          "
                        >
                          {slide.primaryCta.label}
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>

                        {slide.secondaryCta && (
                          <a
                            href={slide.secondaryCta.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                              min-h-[38px] bg-white/15 border border-white/40 backdrop-blur-sm
                              text-white font-bold text-[10px] sm:text-xs px-3.5 sm:px-4 py-2.5
                              rounded-md flex items-center justify-center hover:bg-white/25 transition
                            "
                          >
                            {slide.secondaryCta.label}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="hero-pagination absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex gap-1.5" />
          </div>

          {/* RIGHT: FEATURE CARD (static) */}
          <div
            className="
              relative overflow-hidden bg-[#F7FEE7]
              min-h-[300px] sm:min-h-[310px] md:h-[300px] md:min-h-0
            "
          >
            <div className="absolute right-[-45px] top-[-50px] w-[170px] h-[170px] sm:w-[190px] sm:h-[190px] rounded-full bg-[#84CC16]/40" />
            <div className="absolute right-5 top-6 opacity-[0.12]">
              <Sun
                className="w-[80px] h-[80px] sm:w-[90px] sm:h-[90px]"
                strokeWidth={1}
              />
            </div>

            <div className="relative z-10 h-full px-5 sm:px-7 py-5 flex flex-col justify-between">
              <div>
                <span className="inline-block bg-black text-[#84CC16] font-bold text-[8px] sm:text-[9px] px-2.5 py-1 rounded">
                  FEATURED
                </span>

                <h2 className="mt-3 text-[24px] sm:text-[27px] lg:text-[29px] font-black leading-[1.02] text-black max-w-[300px]">
                  Every Solar Setup.
                  <br />
                  One Place.
                </h2>

                <p className="mt-3 text-[10px] sm:text-xs text-gray-600 leading-4 max-w-[300px]">
                  Inverters, batteries, solar panels and complete hybrid
                  solutions.
                </p>
              </div>

              <div className="mt-5">
                <div className="bg-white rounded-lg p-2.5 sm:p-3 text-center shadow-sm mb-2.5">
                  <p className="text-[8px] sm:text-[10px] text-gray-500 font-semibold uppercase">
                    Installation Warranty
                  </p>
                  <p className="text-lg sm:text-xl font-black text-black mt-0.5">
                    5+ Years
                  </p>
                </div>

                <Link
                  href="/shop"
                  className="
                    w-full min-h-[40px] bg-black text-[#84CC16] rounded-md
                    flex items-center justify-center gap-1 font-bold text-[10px] sm:text-xs
                    hover:bg-gray-900 transition
                  "
                >
                  Explore Shop
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================
            3. CATEGORY ROW
        ========================================================= */}
        <div className="relative bg-white mt-2 rounded-lg overflow-hidden">
          <button
            type="button"
            aria-label="Previous categories"
            onClick={() => scrollCategories("left")}
            className="
              absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-20
              w-8 h-8 sm:w-9 sm:h-9 bg-white border border-gray-200 rounded-full
              shadow-md flex items-center justify-center hover:bg-gray-50 transition
            "
          >
            <ArrowLeft className="w-4 h-4 text-gray-600" />
          </button>

          <div
            ref={categoryRef}
            className="px-10 sm:px-12 py-3 overflow-x-auto scrollbar-hide scroll-smooth"
          >
            <div className="flex items-start justify-start gap-3 sm:gap-4 min-w-max">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <Link
                    href={category.href}
                    key={category.title}
                    className="w-[78px] sm:w-[90px] md:w-[94px] shrink-0 flex flex-col items-center group"
                  >
                    <div
                      className={`
                        w-[64px] h-[64px] sm:w-[76px] sm:h-[76px] md:w-[82px] md:h-[82px]
                        rounded-[18px] sm:rounded-[20px] ${category.bg}
                        flex items-center justify-center overflow-hidden
                        transition-transform duration-200 group-hover:scale-105
                      `}
                    >
                      <Icon
                        className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-[#252525]"
                        strokeWidth={1.6}
                      />
                    </div>
                    <span className="mt-2 text-[9px] sm:text-[10px] md:text-[11px] font-medium text-[#222] text-center leading-[1.15]">
                      {category.title}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            aria-label="Next categories"
            onClick={() => scrollCategories("right")}
            className="
              absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-20
              w-8 h-8 sm:w-9 sm:h-9 bg-white border border-gray-200 rounded-full
              shadow-md flex items-center justify-center hover:bg-gray-50 transition
            "
          >
            <ArrowRight className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* =========================================================
            4. CONTENT MODULES
        ========================================================= */}
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* MORE REASONS */}
          <div>
            <h2 className="text-[19px] sm:text-[21px] lg:text-[22px] font-bold text-[#111] mb-3 px-1">
              More reasons to go solar
            </h2>

            <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
              <Link
                href="/shop"
                className="relative min-h-[175px] sm:min-h-[185px] rounded-lg overflow-hidden bg-[#e6f8d7] group"
              >
                <div className="p-3 sm:p-4 relative z-10">
                  <span className="inline-block bg-[#ef4444] text-white text-[7px] sm:text-[8px] font-bold px-2 py-1 rounded">
                    SAVE MORE
                  </span>
                  <h3 className="mt-2 text-[14px] sm:text-[15px] font-black leading-tight">
                    Solar
                    <br />
                    Panels
                  </h3>
                  <p className="mt-2 text-[8px] sm:text-[9px] text-gray-600 max-w-[100px]">
                    Premium panels for efficient energy generation.
                  </p>
                </div>
                <div className="absolute right-[-20px] bottom-[-20px] w-[115px] h-[115px] sm:w-[125px] sm:h-[125px] rounded-full bg-white/60 flex items-center justify-center group-hover:scale-105 transition">
                  <Sun
                    className="w-14 h-14 sm:w-16 sm:h-16 text-[#65A30D]"
                    strokeWidth={1.3}
                  />
                </div>
              </Link>

              <Link
                href="/shop"
                className="relative min-h-[175px] sm:min-h-[185px] rounded-lg overflow-hidden bg-[#fff0d8] group"
              >
                <div className="p-3 sm:p-4 relative z-10">
                  <span className="inline-block bg-black text-[#84CC16] text-[7px] sm:text-[8px] font-bold px-2 py-1 rounded">
                    POPULAR
                  </span>
                  <h3 className="mt-2 text-[14px] sm:text-[15px] font-black leading-tight">
                    Inverters &
                    <br />
                    Batteries
                  </h3>
                  <p className="mt-2 text-[8px] sm:text-[9px] text-gray-600 max-w-[105px]">
                    Reliable backup and hybrid energy solutions.
                  </p>
                </div>
                <div className="absolute right-[-20px] bottom-[-20px] w-[115px] h-[115px] sm:w-[125px] sm:h-[125px] rounded-full bg-white/60 flex items-center justify-center group-hover:scale-105 transition">
                  <BatteryCharging
                    className="w-14 h-14 sm:w-16 sm:h-16 text-gray-700"
                    strokeWidth={1.3}
                  />
                </div>
              </Link>
            </div>
          </div>

          {/* CENTER FEATURE */}
          <div className="relative min-h-[200px] sm:min-h-[220px] lg:h-[185px] lg:min-h-0 lg:mt-[39px] rounded-lg overflow-hidden bg-black">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 w-full h-full object-cover"
              src="https://solamoenergy.com/wp-content/uploads/2026/05/Karachi-1.mp4"
            />
            <div className="absolute inset-0 bg-black/45" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

            <div className="relative z-10 h-full p-5 flex flex-col justify-end">
              <span className="text-[#84CC16] text-[9px] font-bold uppercase">
                Solamo Energy
              </span>
              <h2 className="text-white text-[21px] sm:text-[23px] font-black leading-tight mt-1">
                Power your home
                <br />
                with solar.
              </h2>
              <Link
                href="/free-quote"
                className="w-fit mt-3 bg-[#84CC16] text-black font-bold text-[10px] px-4 py-2 rounded-md flex items-center gap-1 hover:bg-[#65A30D] transition"
              >
                Get Free Quote
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* IN FOCUS */}
          <div>
            <h2 className="text-[19px] sm:text-[21px] lg:text-[22px] font-bold text-[#111] mb-3 px-1">
              In focus
            </h2>

            <div className="relative min-h-[200px] sm:min-h-[220px] lg:h-[185px] rounded-lg overflow-hidden bg-[#F7FEE7]">
              <div className="absolute right-[-20px] top-[-25px] w-[150px] h-[150px] rounded-full bg-[#84CC16]/35" />

              <div className="relative z-10 p-5">
                <span className="inline-block bg-black text-[#84CC16] text-[8px] font-bold px-2.5 py-1 rounded">
                  SOLAMO ENERGY
                </span>
                <h3 className="mt-3 text-[22px] sm:text-[23px] font-black leading-[1.02]">
                  Complete
                  <br />
                  energy
                  <br />
                  solutions.
                </h3>
                <p className="mt-2 text-[9px] text-gray-600 max-w-[220px]">
                  Solar panels, inverters and batteries for homes and
                  businesses.
                </p>
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-1 mt-3 bg-black text-[#84CC16] font-bold text-[10px] px-4 py-2 rounded-md hover:bg-gray-900 transition"
                >
                  Shop Now
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </div>

              <ShieldCheck
                className="absolute right-5 bottom-4 w-20 h-20 sm:w-24 sm:h-24 text-black/10"
                strokeWidth={1}
              />
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .hero-pagination .swiper-pagination-bullet {
          width: 7px;
          height: 7px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.5);
          opacity: 1;
          transition: all 0.2s ease;
        }
        .hero-pagination .swiper-pagination-bullet-active {
          width: 20px;
          background: #84cc16;
        }
      `}</style>
    </section>
  );
}
