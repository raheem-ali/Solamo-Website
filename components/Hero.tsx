"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Hero() {
  const [count500, setCount500] = useState(0);
  const [count5, setCount5] = useState(0);
  const [count1, setCount1] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);

    let start500 = 0;
    const end500 = 500;
    const duration500 = 1800;
    const stepTime500 = Math.max(Math.floor(duration500 / end500), 10);

    const timer500 = setInterval(() => {
      start500 += 10;

      if (start500 >= end500) {
        setCount500(end500);
        clearInterval(timer500);
      } else {
        setCount500(start500);
      }
    }, stepTime500);

    let start5 = 0;
    const end5 = 5;
    const duration5 = 1200;
    const stepTime5 = Math.floor(duration5 / end5);

    const timer5 = setInterval(() => {
      start5 += 1;

      if (start5 >= end5) {
        setCount5(end5);
        clearInterval(timer5);
      } else {
        setCount5(start5);
      }
    }, stepTime5);

    const timer1 = setTimeout(() => {
      setCount1(1);
    }, 1000);

    return () => {
      clearInterval(timer500);
      clearInterval(timer5);
      clearTimeout(timer1);
    };
  }, []);

  return (
    <section className="relative min-h-[85vh] flex flex-col justify-between overflow-hidden bg-black text-white pt-16 pb-10">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-gray-800 to-black">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-75"
          src="http://solamoenergy.com/wp-content/uploads/2026/05/Karachi-1.mp4"
          onError={(e) =>
            console.error("Hero video failed to load:", e.currentTarget.error)
          }
        />

        <div className="absolute inset-0 bg-black/45" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-[1300px] mx-auto px-6 w-full my-auto py-12">
        <div
          className={`max-w-3xl mx-auto lg:mx-0 flex flex-col items-center lg:items-start text-center lg:text-left transition-all duration-1000 ease-out transform ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-[62px] font-bold tracking-tight leading-[1.12] mb-6">
            <span className="text-[#79B900]">Pakistan's</span> Most Trusted{" "}
            Solar Energy Company
          </h1>

          <p className="text-sm sm:text-base text-gray-200 mb-6 max-w-2xl leading-relaxed">
            Cut Your Electricity Bills by Up to 80%. Premium Solar Solutions for
            Homes, Businesses, Farms & Industries Across Karachi
          </p>

          <div className="h-px w-full max-w-md bg-white/25 mb-6 mx-auto lg:mx-0" />

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
            <Link
              href="/free-quote"
              className="inline-flex items-center gap-2 bg-[#79B900] text-white font-bold py-3.5 px-8 rounded-full shadow-lg hover:bg-[#5f9200] transition text-base"
            >
              Get Free Quote
              <ArrowUpRight className="w-5 h-5" />
            </Link>

            <Link
              href="https://wa.me/923141349717"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-transparent border-2 border-[#79B900] text-white font-bold py-3 px-8 rounded-full hover:bg-[#79B900]/10 transition text-base"
            >
              Whatsapp Now
              <ArrowUpRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Counters Box */}
      <div className="relative z-10 max-w-[1300px] mx-auto px-6 w-full">
        <div
          className={`w-full lg:w-fit lg:ml-0 lg:mr-auto border border-[#79B900]/70 bg-black/30 backdrop-blur-sm rounded-2xl grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#79B900]/40 px-6 py-5 transition-all duration-1000 delay-300 ease-out transform ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* 500+ */}
          <div className="text-center sm:px-6 first:pl-0 pb-3 sm:pb-0">
            <div className="text-3xl sm:text-5xl font-normal text-white tracking-tight">
              {count500}+
            </div>

            <div className="text-sm sm:text-base text-gray-300 mt-1 font-medium">
              Installations Completed
            </div>
          </div>

          {/* 5+ */}
          <div className="text-center sm:px-6 py-3 sm:py-0">
            <div className="text-3xl sm:text-5xl font-normal text-white tracking-tight">
              {count5}+
            </div>

            <div className="text-sm sm:text-base text-gray-300 mt-1 font-medium">
              Year Installation Warranty
            </div>
          </div>

          {/* 1# */}
          <div className="text-center sm:px-6 last:pr-0 pt-3 sm:pt-0">
            <div className="text-3xl sm:text-5xl font-normal text-white tracking-tight">
              {count1}#
            </div>

            <div className="text-sm sm:text-base text-gray-300 mt-1 font-medium">
              Karachi's #1 Solar Partner
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
