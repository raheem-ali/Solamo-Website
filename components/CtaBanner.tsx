"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function CtaBanner() {
  return (
    <section className="relative w-full py-24 sm:py-28 px-6 sm:px-12 lg:px-20 overflow-hidden bg-[#1B2E1E] my-6">
      {/* =========================================================
          BACKGROUND IMAGE
      ========================================================= */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="https://solamoenergy.com/wp-content/uploads/2026/05/New-Project-9.jpg"
          alt="Solar panel installation"
          className="w-full h-full object-cover object-center"
        />

        {/* Green Overlay */}
        <div className="absolute inset-0 bg-[#4d741d]/55" />

        {/* Subtle Dark Overlay */}
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* =========================================================
          CTA CONTENT
      ========================================================= */}
      <div className="relative z-10 w-full max-w-[1250px] mx-auto text-center flex flex-col items-center text-white">
        {/* =======================================================
            BOOK NOW BADGE
        ======================================================= */}
        <div className="inline-flex items-center gap-2 border border-white/70 rounded-full px-4 py-1.5 mb-7 bg-white/5 backdrop-blur-sm text-white text-sm font-semibold tracking-wide uppercase">
          {/* Solar Panel Icon */}
          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4 shrink-0"
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

          <span>BOOK NOW</span>
        </div>

        {/* =======================================================
            HEADING
        ======================================================= */}
        <h2 className="text-4xl sm:text-5xl lg:text-[60px] font-black text-white leading-[1.1] tracking-tight max-w-[1200px] mx-auto">
          Stop Paying Oversized Electricity Bills. Switch To Solar Today
        </h2>

        {/* =======================================================
            DESCRIPTION
        ======================================================= */}
        <p className="max-w-[780px] mx-auto mt-7 text-gray-100 text-base sm:text-lg lg:text-xl font-normal leading-relaxed">
          Free consultation. No obligation. Our expert visits your site and
          gives you a complete cost-savings analysis.
        </p>

        {/* =======================================================
            TWO CTA BUTTONS
        ======================================================= */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-9">
          {/* FREE CONSULTATION */}
          <Link
            href="/free-quote"
            className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full border border-[#79B900] bg-transparent text-white font-semibold text-base sm:text-lg hover:bg-[#79B900] hover:border-[#79B900] hover:text-[#172217] transition-all duration-300"
          >
            <span>Free Consultation</span>

            <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>

          {/* WHATSAPP */}
          <a
            href="https://wa.me/923141349717"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#79B900] border border-[#79B900] text-[#172217] font-semibold text-base sm:text-lg hover:bg-[#689e00] hover:border-[#689e00] hover:text-white transition-all duration-300"
          >
            <span>WhatsApp Us Now</span>

            <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
