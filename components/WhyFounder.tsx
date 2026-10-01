"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function WhyFounder() {
  return (
    <section className="py-16 md:py-20 bg-white overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-josefin text-4xl sm:text-5xl font-medium text-center mb-12 md:mb-16 text-[#172217]"
        >
          Why We Built Solamo Differently
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center"
        >
          {/* Left Column: Photo Card & Founder Details */}
          <div className="flex flex-col items-center text-center lg:col-span-5">
            <div className="w-full max-w-[270px] bg-[#f7f9f2] border border-[#e2e8d5] p-3 rounded-2xl shadow-none mb-3">
              <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden">
                <Image
                  src="https://sahirgogari.com/wp-content/uploads/2025/08/IMG_2969-2-scaled.webp"
                  alt="Sahir Gogari"
                  fill
                  className="object-cover object-top"
                  sizes="270px"
                  priority
                />
              </div>
            </div>
            <h3 className="font-josefin text-xl md:text-2xl font-medium text-[#172217]">
              Sahir Gogari
            </h3>
            <p className="font-josefin text-sm md:text-[15px] text-[#666666] font-normal mt-1.5">
              Founder And CEO
            </p>
          </div>

          {/* Right Column: Quotes Content */}
          <div className="space-y-6 text-[15px] md:text-base leading-relaxed text-[#666666] font-normal lg:col-span-7 max-w-xl mx-auto lg:mx-0">
            <p>
              “I’m based in Dubai, where I’ve spent 14 years building
              businesses. Living and working in the UAE taught me something I
              couldn’t unsee: customers there are treated with priority and
              follow-through as a baseline, not a luxury.”
            </p>
            <p>
              “When I looked at the solar industry back home, I saw companies
              chasing the lowest quote and disappearing after installation. I
              started Solamo to bring that same standard, quality and real
              follow-through, to Karachi.”
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
