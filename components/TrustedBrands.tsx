"use client";

import React, { useRef } from "react";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";

export default function TrustedBrands() {
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
            ref={swiperRef}
            modules={[Autoplay]}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            loop={true}
            spaceBetween={30}
            slidesPerView={2}
            breakpoints={{
              640: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 50,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 60,
              },
            }}
            className="w-full flex items-center"
          >
            {brands.map((brand, idx) => (
              <SwiperSlide
                key={idx}
                className="flex items-center justify-center py-4"
              >
                <a
                  href={brand.link}
                  aria-label={`View ${brand.name} brand`}
                  className="h-20 w-full flex items-center justify-center transition duration-300 group"
                >
                  <img
                    src={brand.img}
                    alt={brand.name}
                    className="max-h-full max-w-[140px] object-contain group-hover:scale-105 transition duration-300"
                  />
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
