"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Zap } from "lucide-react";

export default function SolamoCtaBanner() {
  return (
    <section className="w-full bg-[#f5f5f5] py-4 sm:py-5 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-3 sm:px-5 lg:px-6">
        <div className="relative w-full overflow-hidden rounded-lg">
          {/* =====================================================
              BACKGROUND IMAGE
          ===================================================== */}
          <div className="absolute inset-0 z-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://solamoenergy.com/wp-content/uploads/2026/05/New-Project-9.jpg"
              alt="Solar panel installation"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/70" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/60" />
          </div>

          {/* =====================================================
              CTA CONTENT
          ===================================================== */}
          <div className="relative z-10 w-full px-6 sm:px-10 lg:px-16 py-14 sm:py-20 text-center flex flex-col items-center text-white">
            <div className="inline-flex items-center gap-2 bg-[#84CC16] rounded-full px-3.5 py-1.5 mb-6 text-black text-[10px] sm:text-xs font-bold uppercase tracking-wide">
              <Zap className="w-3.5 h-3.5 fill-black shrink-0" />
              <span>Book Now</span>
            </div>

            <h2 className="text-[28px] sm:text-[40px] lg:text-[48px] font-black leading-[1.08] tracking-tight max-w-[900px]">
              Stop Paying Oversized Electricity Bills. Switch To Solar Today.
            </h2>

            <p className="max-w-[600px] mx-auto mt-5 text-gray-200 text-sm sm:text-base leading-relaxed">
              Free consultation, no obligation. Our expert visits your site and
              gives you a complete cost-savings analysis.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-7">
              <Link
                href="/free-quote"
                className="
                  group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-md
                  border border-white/50 bg-white/10 backdrop-blur-sm text-white font-bold text-sm
                  hover:bg-white/20 transition-all duration-300
                "
              >
                <span>Free Consultation</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <a
                href="https://wa.me/923141349717"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-md
                  bg-[#84CC16] text-black font-bold text-sm
                  hover:bg-[#65A30D] transition-all duration-300
                "
              >
                <span>WhatsApp Us Now</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
