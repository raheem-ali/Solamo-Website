"use client";

import React from "react";

export default function SolamoMarquee() {
  const items = [
    "Book Free Consultation — Call or WhatsApp us. Our expert visits your site at no charge.",
    "Get Your Custom Plan — We assess your energy needs and design the perfect solar system.",
    "Professional Installation — Our certified team installs your system quickly and safely.",
    "Start Saving — Your system goes live. Watch your electricity bills drop from month one.",
  ];

  return (
    <div className="bg-[#111] text-[#84CC16] py-3.5 sm:py-4 overflow-hidden whitespace-nowrap flex items-center">
      <div className="animate-marquee flex items-center gap-10 text-[13px] sm:text-base font-bold tracking-wide">
        {[...items, ...items, ...items].map((text, idx) => (
          <div key={idx} className="flex items-center gap-7">
            <span>{text}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#84CC16] inline-block shrink-0" />
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        .animate-marquee {
          animation: marquee 28s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
