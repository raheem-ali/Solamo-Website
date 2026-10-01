"use client";

import React, { useState } from "react";
import { motion, type Variants } from "framer-motion";
import {
  MapPin,
  CircleCheck,
  Clock3,
  PanelsTopLeft,
  ShieldCheck,
  ChevronDown,
} from "lucide-react";

const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 25,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

const fadeInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -25,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

const fadeInDown: Variants = {
  hidden: {
    opacity: 0,
    y: -25,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

const fadeInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 25,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

const fieldClass = `
  w-full
  bg-transparent
  border-b
  border-white/60
  py-3
  text-[15px]
  sm:text-[16px]
  text-white
  placeholder:text-[#9ba5a3]
  focus:outline-none
  focus:border-[#79B900]
  transition-colors
  duration-200
`;

const selectClass = `
  w-full
  appearance-none
  bg-transparent
  border-b
  border-white/60
  py-3
  pr-10
  text-[15px]
  sm:text-[16px]
  text-[#a9b1af]
  focus:outline-none
  focus:border-[#79B900]
  transition-colors
  duration-200
  cursor-pointer
`;

const trustSignals = [
  {
    title: "Free site visit",
    description: "our expert comes to you",
    icon: MapPin,
    variants: fadeInLeft,
  },
  {
    title: "No obligation",
    description: "zero pressure, just information",
    icon: CircleCheck,
    variants: fadeInUp,
  },
  {
    title: "Response",
    description: "2 hours during business hours",
    icon: Clock3,
    variants: fadeInDown,
  },
  {
    title: "500+ installations",
    description: "completed across Karachi",
    icon: PanelsTopLeft,
    variants: fadeInUp,
  },
  {
    title: "5-Year Warranty",
    description: "5-year installation warranty on all systems",
    icon: ShieldCheck,
    variants: fadeInRight,
  },
];

export default function FreeQuoteClient() {
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSending) return;

    setIsSending(true);

    // Front-end loading state.
    // Connect your API/email service here when the backend is ready.
    setTimeout(() => {
      setIsSending(false);
    }, 1500);
  };

  return (
    <main className="w-full">
      {/* =====================================================
          SECTION 1: QUOTE FORM
      ===================================================== */}
      <section
        className="
    bg-[#f4f8ee]
    px-3
    sm:px-6
    lg:px-8
    pt-[40px]
    pb-[55px]
    sm:pt-[70px]
    sm:pb-[70px]
    md:pt-[100px]
    md:pb-[90px]
  "
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
          className="
  w-full
  max-w-[1250px]
  mx-auto
  bg-[#0b2423]
  rounded-[10px]
  px-4
  py-7
  sm:px-10
  sm:py-12
  md:px-16
  md:py-14
  lg:px-20
  shadow-[0_18px_45px_rgba(0,0,0,0.08)]
"
        >
          <form
            onSubmit={handleSubmit}
            className="
  w-full
  max-w-[860px]
  mx-auto
  space-y-4
  sm:space-y-5
  md:space-y-6
"
          >
            {/* FIRST NAME + LAST NAME */}
            <div className="grid grid-cols-1 min-[380px]:grid-cols-2 gap-3 sm:gap-5 md:gap-6">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                required
                autoComplete="given-name"
                className={fieldClass}
              />

              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                required
                autoComplete="family-name"
                className={fieldClass}
              />
            </div>

            {/* EMAIL */}
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                autoComplete="email"
                className={fieldClass}
              />
            </div>

            {/* PHONE */}
            <div className="flex items-center border-b border-white/60 focus-within:border-[#79B900] transition-colors duration-200">
              <div className="flex items-center gap-2 pr-3 mr-3 border-r border-white/20 shrink-0">
                <span className="text-[13px] font-medium text-[#9ba5a3]">
                  PK
                </span>

                <span className="text-[10px] text-[#9ba5a3]">▼</span>
              </div>

              <input
                type="tel"
                name="phone"
                placeholder="Enter your Phone No."
                autoComplete="tel"
                className="
                  w-full
                  bg-transparent
                  py-3
                  text-[15px] sm:text-[16px]
                  text-white
                  placeholder:text-[#9ba5a3]
                  focus:outline-none
                "
              />
            </div>

            {/* PROPERTY TYPE */}
            <div className="relative">
              <select
                name="propertyType"
                defaultValue=""
                className={selectClass}
              >
                <option value="" disabled className="bg-[#0b2423]">
                  Property Type
                </option>

                <option value="residential" className="bg-[#0b2423] text-white">
                  Residential
                </option>

                <option value="commercial" className="bg-[#0b2423] text-white">
                  Commercial
                </option>

                <option value="industrial" className="bg-[#0b2423] text-white">
                  Industrial
                </option>

                <option
                  value="agricultural"
                  className="bg-[#0b2423] text-white"
                >
                  Agricultural
                </option>

                <option value="other" className="bg-[#0b2423] text-white">
                  Other
                </option>
              </select>

              <ChevronDown
                className="
                  absolute
                  right-2
                  top-1/2
                  -translate-y-1/2
                  w-4
                  h-4
                  text-white
                  pointer-events-none
                "
              />
            </div>

            {/* SYSTEM TYPE */}
            <div className="relative">
              <select name="systemType" defaultValue="" className={selectClass}>
                <option value="" disabled className="bg-[#0b2423]">
                  System Type Interest
                </option>

                <option value="solar-only" className="bg-[#0b2423] text-white">
                  Solar Only
                </option>

                <option
                  value="solar-battery"
                  className="bg-[#0b2423] text-white"
                >
                  Solar + Battery
                </option>

                <option value="solar-ev" className="bg-[#0b2423] text-white">
                  Solar + EV Charger
                </option>

                <option
                  value="full-package"
                  className="bg-[#0b2423] text-white"
                >
                  Full Package
                </option>

                <option value="other" className="bg-[#0b2423] text-white">
                  Other
                </option>
              </select>

              <ChevronDown
                className="
                  absolute
                  right-2
                  top-1/2
                  -translate-y-1/2
                  w-4
                  h-4
                  text-white
                  pointer-events-none
                "
              />
            </div>

            {/* MONTHLY ELECTRICITY BILL */}
            <div className="relative">
              <select
                name="monthlyBill"
                defaultValue=""
                className={selectClass}
              >
                <option value="" disabled className="bg-[#0b2423]">
                  Monthly Electricity Bill
                </option>

                <option value="under-10k" className="bg-[#0b2423] text-white">
                  Under 10k
                </option>

                <option value="10k-30k" className="bg-[#0b2423] text-white">
                  10k – 30k
                </option>

                <option value="30k-80k" className="bg-[#0b2423] text-white">
                  30k – 80k
                </option>

                <option value="80k-plus" className="bg-[#0b2423] text-white">
                  80k+
                </option>

                <option value="na" className="bg-[#0b2423] text-white">
                  N/A
                </option>
              </select>

              <ChevronDown
                className="
                  absolute
                  right-2
                  top-1/2
                  -translate-y-1/2
                  w-4
                  h-4
                  text-white
                  pointer-events-none
                "
              />
            </div>

            {/* CITY / AREA */}
            <div>
              <input
                type="text"
                name="cityArea"
                placeholder="City / Area in Karachi"
                required
                autoComplete="address-level2"
                className={fieldClass}
              />
            </div>

            {/* PREFERRED CONTACT TIME */}
            <div className="relative">
              <select
                name="contactTime"
                defaultValue=""
                className={selectClass}
              >
                <option value="" disabled className="bg-[#0b2423]">
                  Preferred Contact Time
                </option>

                <option value="morning" className="bg-[#0b2423] text-white">
                  Morning
                </option>

                <option value="afternoon" className="bg-[#0b2423] text-white">
                  Afternoon
                </option>

                <option value="evening" className="bg-[#0b2423] text-white">
                  Evening
                </option>
              </select>

              <ChevronDown
                className="
                  absolute
                  right-2
                  top-1/2
                  -translate-y-1/2
                  w-4
                  h-4
                  text-white
                  pointer-events-none
                "
              />
            </div>

            {/* HOW DID YOU HEAR ABOUT US */}
            <div className="relative">
              <select
                name="heardAboutUs"
                defaultValue=""
                className={selectClass}
              >
                <option value="" disabled className="bg-[#0b2423]">
                  How Did You Hear About Us
                </option>

                <option value="google" className="bg-[#0b2423] text-white">
                  Google
                </option>

                <option value="facebook" className="bg-[#0b2423] text-white">
                  Facebook
                </option>

                <option value="instagram" className="bg-[#0b2423] text-white">
                  Instagram
                </option>

                <option value="friend" className="bg-[#0b2423] text-white">
                  Friend
                </option>

                <option value="other" className="bg-[#0b2423] text-white">
                  Other
                </option>
              </select>

              <ChevronDown
                className="
                  absolute
                  right-2
                  top-1/2
                  -translate-y-1/2
                  w-4
                  h-4
                  text-white
                  pointer-events-none
                "
              />
            </div>

            {/* SUBMIT BUTTON */}
            <div className="pt-1">
              <button
                type="submit"
                disabled={isSending}
                className="
                  w-full
                  bg-[#79B900]
                  hover:bg-[#68a000]
                  disabled:opacity-70
                  disabled:cursor-not-allowed
                  text-white
                  font-semibold
                  text-[16px]
                  py-[12px]
                  rounded-[3px]
                  transition-all
                  duration-200
                  hover:-translate-y-[1px]
                  shadow-sm
                  cursor-pointer
                "
              >
                {isSending ? "Sending..." : "Get My Free Quote"}
              </button>
            </div>
          </form>
        </motion.div>
      </section>

      {/* =====================================================
          SECTION 2: TRUST SIGNALS
      ===================================================== */}

      <section
        className="
    bg-white
    px-4
    sm:px-6
    lg:px-8
    pt-[70px]
    pb-20
    md:pt-[90px]
    md:pb-[90px]
  "
      >
        <div className="max-w-[1250px] mx-auto">
          {/* HEADING */}
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
            className="
    text-center
    text-[30px]
    sm:text-[42px]
    md:text-[48px]
    leading-[1.2]
    font-medium
    tracking-[0.03em]
    text-[#172217]
    mb-12
  "
          >
            TRUST SIGNALS NEXT TO FORM
          </motion.h2>

          {/* TRUST CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5">
            {trustSignals.map((item) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={item.variants}
                  className="
                    min-h-[205px]
                    bg-white
                    border
                    border-[#d8d8d8]
                    rounded-[15px]
                    p-6
                    md:p-5
                    lg:p-6
                    flex
                    flex-col
                    items-start
                    text-left
                    shadow-none
                    hover:shadow-md
                    transition-shadow
                    duration-300
                  "
                >
                  <div className="mb-6 text-[#79B900]">
                    <Icon className="w-[48px] h-[48px]" strokeWidth={1.7} />
                  </div>

                  <h3
                    className="
                      text-[22px]
                      leading-[1.2]
                      font-medium
                      text-[#172217]
                      mb-2
                    "
                  >
                    {item.title}
                  </h3>

                  <p
                    className="
                      text-[16px]
                      leading-[1.5]
                      font-normal
                      text-[#172217]
                    "
                  >
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
