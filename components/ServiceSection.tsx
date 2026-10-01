"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const serviceImage =
  "https://solamoenergy.com/wp-content/uploads/2026/05/New-Project-9.jpg";

const servicesData = [
  {
    title: "Residential Solar",
    description:
      "Power your home with clean energy. Save up to 80% on KESC bills every month",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="w-[38px] h-[38px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 21V7h16v14" />
        <path d="M8 7V4h8v3" />
        <path d="M7 11h2" />
        <path d="M15 11h2" />
        <path d="M7 15h2" />
        <path d="M15 15h2" />
        <path d="M10 21v-4h4v4" />
      </svg>
    ),
    image: serviceImage,
    link: "/services/residential-solar",
  },

  {
    title: "Commercial Solar",
    description:
      "Reduce operating costs for your office, plaza, or retail business in Karachi",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="w-[38px] h-[38px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 21V8l8-5 8 5v13" />
        <path d="M8 21v-6h8v6" />
        <path d="M8 10h2" />
        <path d="M14 10h2" />
        <path d="M8 13h2" />
        <path d="M14 13h2" />
      </svg>
    ),
    image: serviceImage,
    link: "/services/commercial-solar",
  },

  {
    title: "Industrial Solar",
    description:
      "Large-scale solar solutions for factories, warehouses, and manufacturing plants",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="w-[38px] h-[38px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 21V9l6 3V7l6 3V5l6 3v13" />
        <path d="M3 21h18" />
        <path d="M7 17h2" />
        <path d="M12 17h2" />
        <path d="M17 17h2" />
      </svg>
    ),
    image: serviceImage,
    link: "/services/industrial-solar",
  },

  {
    title: "Agricultural Solar",
    description:
      "Solar tube wells and farm energy systems. Replace diesel, reduce costs dramatically.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="w-[38px] h-[38px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 21V10" />
        <path d="M12 14c-4 0-7-2-7-6 4 0 7 2 7 6Z" />
        <path d="M12 11c0-4 3-7 7-7 0 4-3 7-7 7Z" />
      </svg>
    ),
    image: serviceImage,
    link: "/services/agricultural-solar",
  },

  {
    title: "EV Charging Stations",
    description:
      "Future-ready EV charging infrastructure for homes, businesses, and commercial spaces",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="w-[38px] h-[38px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="5" y="3" width="10" height="18" rx="2" />
        <path d="M9 7h2" />
        <path d="M10 11l-2 3h3l-1 3 4-5h-3l1-3Z" />
        <path d="M18 7v5" />
        <path d="M18 12c2 0 3 1 3 3v2" />
      </svg>
    ),
    image: serviceImage,
    link: "/services/ev-charging-stations",
  },

  {
    title: "Solar Battery Storage",
    description:
      "Store your solar energy and use it during load shedding or at night.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="w-[38px] h-[38px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="6" y="3" width="12" height="18" rx="2" />
        <path d="M9 6h6" />
        <path d="M12 9v5" />
        <path d="M10 12h4" />
        <path d="M9 18h6" />
      </svg>
    ),
    image: serviceImage,
    link: "/services/solar-battery-storage",
  },
];

/* ---------------------------------------
   Scroll Reveal Hook
--------------------------------------- */
function useScrollReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(element);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -50px 0px",
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

export default function ServicesSection() {
  const header = useScrollReveal(0.1);

  return (
    <section className="w-full py-20 sm:py-24 bg-[#F4F7EE]">
      <div className="max-w-[1300px] mx-auto px-6">
        {/* ================= HEADER ================= */}
        <div
          ref={header.ref}
          className={`
            text-center
            max-w-[1000px]
            mx-auto
            mb-12
            sm:mb-14
            transition-all
            duration-1000
            ease-out
            ${
              header.visible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }
          `}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full bg-transparent border border-[#C9CEC5] text-[#172217] text-sm font-medium tracking-wide uppercase">
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4 text-[#79B900]"
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
            SERVICES
          </div>

          <h2 className="text-[38px] sm:text-[44px] lg:text-[50px] leading-[1.15] font-semibold tracking-tight text-[#172217]">
            Buy Directly From The{" "}
            <span className="text-[#79B900]">Official Dealer</span>
          </h2>
        </div>

        {/* ================= SERVICES GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {servicesData.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------
   Service Card
--------------------------------------- */
function ServiceCard({
  service,
  index,
}: {
  service: (typeof servicesData)[number];
  index: number;
}) {
  const card = useScrollReveal(0.08);

  return (
    <article
      ref={card.ref}
      style={{
        transitionDelay: card.visible ? `${index * 120}ms` : "0ms",
      }}
      className={`
        bg-transparent
        border border-[#CDD2C9]
        rounded-[10px]
        p-5 sm:p-[30px]
        min-h-[520px] sm:min-h-[357px]
        flex flex-col
        transition-all
        duration-1000
        ease-out

        ${
          card.visible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-12"
        }

        hover:border-[#79B900]/50
      `}
    >
      {/* Top Content */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
        {/* Icon + Title */}
        <div className="flex-1 min-w-0">
          <div className="text-[#79B900] mb-3">{service.icon}</div>

          <h3
            className="
              text-[24px]
              sm:text-[25px]
              leading-[1.28]
              font-semibold
              text-[#172217]
              max-w-none
              lg:max-w-[175px]
            "
          >
            {service.title}
          </h3>
        </div>

        {/* Image */}
        <div
          className="
            w-full
            h-[200px]
            lg:w-[165px]
            lg:h-[133px]
            shrink-0
            rounded-[10px]
            overflow-hidden
            bg-[#E8EBE4]
          "
        >
          <img
            src={service.image}
            alt={service.title}
            className="
              w-full
              h-full
              object-cover
              object-center
              block
              transition-transform
              duration-500
              hover:scale-105
            "
          />
        </div>
      </div>

      {/* Divider */}
      <div className="w-full border-t border-[#D3D7D0] mt-5 mb-7" />

      {/* Description */}
      <p className="text-[15px] leading-[1.55] text-[#172217] underline underline-offset-[3px] mb-8">
        {service.description}
      </p>

      {/* Button */}
      <div className="mt-auto">
        <Link
          href={service.link}
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            bg-[#79B900]
            hover:bg-[#689E00]
            text-white
            font-semibold
            text-[16px]
            px-6
            py-3
            rounded-full
            transition-all
            duration-300
          "
        >
          View More
          <ArrowUpRight className="w-5 h-5" strokeWidth={1.8} />
        </Link>
      </div>
    </article>
  );
}
