"use client";

import React, { useRef } from "react";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight, Award } from "lucide-react";

import "swiper/css";

export default function SolamoTrustedBrandsStrip() {
  const swiperRef = useRef<SwiperRef>(null);

  const brands = [
    {
      name: "Yingli",
      img: "https://solamoenergy.com/wp-content/uploads/2026/08/31.png",
      link: "/brand/yingli/",
    },
    {
      name: "Volnex",
      img: "https://solamoenergy.com/wp-content/uploads/2026/08/29.png",
      link: "/brand/volnex/",
    },
    {
      name: "Trina Solar",
      img: "https://solamoenergy.com/wp-content/uploads/2026/07/17.png",
      link: "/brand/trina-solar/",
    },
    {
      name: "Sunwoda",
      img: "https://solamoenergy.com/wp-content/uploads/2026/08/28.png",
      link: "/brand/sunwoda/",
    },
    {
      name: "Sunsynk",
      img: "https://solamoenergy.com/wp-content/uploads/2026/08/Solamo-Ecommerce-Brands-logo.png",
      link: "/brand/sunsynk/",
    },
    {
      name: "Sungrow",
      img: "https://solamoenergy.com/wp-content/uploads/2026/07/13.png",
      link: "/brand/sungrow/",
    },
    {
      name: "Solis",
      img: "https://solamoenergy.com/wp-content/uploads/2026/07/10.png",
      link: "/brand/solis/",
    },
    {
      name: "Resin",
      img: "https://solamoenergy.com/wp-content/uploads/2026/08/30.png",
      link: "/brand/resin/",
    },
    {
      name: "PylonTech",
      img: "https://solamoenergy.com/wp-content/uploads/2026/07/8-1.png",
      link: "/brand/pylontech/",
    },
    {
      name: "Osda",
      img: "https://solamoenergy.com/wp-content/uploads/2026/08/23.png",
      link: "/brand/osda/",
    },
    {
      name: "Osaka",
      img: "https://solamoenergy.com/wp-content/uploads/2026/07/1-1.png",
      link: "/brand/osaka/",
    },
    {
      name: "Longi",
      img: "https://solamoenergy.com/wp-content/uploads/2026/07/20.png",
      link: "/brand/longi/",
    },
    {
      name: "Jinko Solar",
      img: "https://solamoenergy.com/wp-content/uploads/2026/07/21.png",
      link: "/brand/jinko-solar/",
    },
    {
      name: "Jesko",
      img: "https://solamoenergy.com/wp-content/uploads/2026/08/27.png",
      link: "/brand/jesko/",
    },
    {
      name: "JA Solar",
      img: "https://solamoenergy.com/wp-content/uploads/2026/07/18.png",
      link: "/brand/ja-solar/",
    },
    {
      name: "Itel",
      img: "https://solamoenergy.com/wp-content/uploads/2026/08/26.png",
      link: "/brand/itel/",
    },
    {
      name: "Inverex",
      img: "https://solamoenergy.com/wp-content/uploads/2026/07/9.png",
      link: "/brand/inverex/",
    },
    {
      name: "Huawei",
      img: "https://solamoenergy.com/wp-content/uploads/2026/07/14-1.png",
      link: "/brand/huawei/",
    },
    {
      name: "Grow Watt",
      img: "https://solamoenergy.com/wp-content/uploads/2026/07/12.png",
      link: "/brand/grow-watt/",
    },
    {
      name: "Goodwe",
      img: "https://solamoenergy.com/wp-content/uploads/2026/07/11.png",
      link: "/brand/goodwe/",
    },
    {
      name: "Genix Green",
      img: "https://solamoenergy.com/wp-content/uploads/2026/07/6.png",
      link: "/brand/genix-green/",
    },
    {
      name: "Dynees",
      img: "https://solamoenergy.com/wp-content/uploads/2026/07/7.png",
      link: "/brand/dynees/",
    },
    {
      name: "Dongjing",
      img: "https://solamoenergy.com/wp-content/uploads/2026/08/3.png",
      link: "/brand/dongjing/",
    },
    {
      name: "Cora Dawn",
      img: "https://solamoenergy.com/wp-content/uploads/2026/08/24.png",
      link: "/brand/cora-dawn/",
    },
    {
      name: "Canadian Solar",
      img: "https://solamoenergy.com/wp-content/uploads/2026/07/19.png",
      link: "/brand/canadian-solar/",
    },
    {
      name: "Astronergy",
      img: "https://solamoenergy.com/wp-content/uploads/2026/07/15-1.png",
      link: "/brand/astronergy/",
    },
    {
      name: "Aiko",
      img: "https://solamoenergy.com/wp-content/uploads/2026/07/16.png",
      link: "/brand/aiko/",
    },
  ];

  return (
    <section className="w-full bg-[#f5f5f5] py-4 sm:py-5 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-3 sm:px-5 lg:px-6">
        <div className="bg-white rounded-lg overflow-hidden">
          {/* =====================================================
              HEADER
          ===================================================== */}
          <div className="px-4 sm:px-6 lg:px-7 pt-5 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#84CC16] flex items-center justify-center shrink-0">
                <Award className="w-4 h-4 text-black" />
              </div>
              <div>
                <h2 className="text-[20px] sm:text-[23px] font-black text-[#111] leading-none">
                  Trusted Brands We Carry
                </h2>
                <p className="text-[10px] sm:text-[11px] text-gray-500 mt-1">
                  Globally recognized manufacturers, stocked and warrantied
                  locally
                </p>
              </div>
            </div>
          </div>

          {/* =====================================================
              LOGO SLIDER
          ===================================================== */}
          <div className="relative px-10 sm:px-12 pb-5">
            <button
              type="button"
              onClick={() => swiperRef.current?.swiper?.slidePrev()}
              aria-label="Previous brand"
              className="
                absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-20
                w-8 h-8 sm:w-9 sm:h-9 bg-white border border-gray-200 rounded-full
                shadow-md flex items-center justify-center hover:bg-gray-50 transition
              "
            >
              <ChevronLeft className="w-4 h-4 text-gray-700" />
            </button>

            <button
              type="button"
              onClick={() => swiperRef.current?.swiper?.slideNext()}
              aria-label="Next brand"
              className="
                absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-20
                w-8 h-8 sm:w-9 sm:h-9 bg-white border border-gray-200 rounded-full
                shadow-md flex items-center justify-center hover:bg-gray-50 transition
              "
            >
              <ChevronRight className="w-4 h-4 text-gray-700" />
            </button>

            <Swiper
              ref={swiperRef}
              modules={[Autoplay]}
              autoplay={{ delay: 2200, disableOnInteraction: false }}
              loop
              spaceBetween={12}
              slidesPerView={3}
              breakpoints={{
                480: { slidesPerView: 4, spaceBetween: 14 },
                768: { slidesPerView: 5, spaceBetween: 16 },
                1024: { slidesPerView: 6, spaceBetween: 18 },
                1280: { slidesPerView: 7, spaceBetween: 18 },
              }}
              className="w-full"
            >
              {brands.map((brand, idx) => (
                <SwiperSlide key={idx}>
                  <a
                    href={brand.link}
                    aria-label={`View ${brand.name} brand`}
                    className="
                      h-[70px] sm:h-[84px] w-full flex items-center justify-center
                      bg-gray-50 border border-gray-100 rounded-md
                      hover:border-[#84CC16] hover:bg-[#F7FEE7] transition duration-300 group
                    "
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={brand.img}
                      alt={brand.name}
                      className="max-h-[36px] sm:max-h-[44px] max-w-[80%] object-contain grayscale group-hover:grayscale-0 transition duration-300"
                    />
                  </a>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
