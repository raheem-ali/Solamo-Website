"use client";

import React from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { Eye, Target, Leaf, ArrowUpRight, Lightbulb } from "lucide-react";

export default function AboutSection() {
  const teamMembers = [
    {
      name: "Shakeel Sattar",
      role: "Finance Manager",
      img: "https://solamoenergy.com/wp-content/uploads/2026/07/4-819x1024.png",
    },
    {
      name: "Muhammad Husnain",
      role: "Sales Manager",
      img: "https://solamoenergy.com/wp-content/uploads/2026/07/3-819x1024.png",
    },
    {
      name: "Muhammad Usman",
      role: "Site Supervisor",
      img: "https://solamoenergy.com/wp-content/uploads/2026/07/1-819x1024.png",
    },
    {
      name: "Sheriyar",
      role: "Sales Executive",
      img: "https://solamoenergy.com/wp-content/uploads/2026/07/2-819x1024.png",
    },
    {
      name: "Muhammad Alyan",
      role: "Sales Executive",
      img: "https://solamoenergy.com/wp-content/uploads/2026/07/5-819x1024.png",
    },
  ];

  const brandLogos = [
    {
      name: "GoodWe / Partner 1",
      src: "https://solamoenergy.com/wp-content/uploads/2026/07/26071-e1784286657746.png",
    },
    {
      name: "JA Solar / Partner 2",
      src: "https://solamoenergy.com/wp-content/uploads/2026/07/26065-e1784286527382.png",
    },
    {
      name: "Longi / Partner 3",
      src: "https://solamoenergy.com/wp-content/uploads/2026/07/26066-e1784286542776.png",
    },
    {
      name: "Canadian Solar",
      src: "https://solamoenergy.com/wp-content/uploads/2026/05/Canadian-Solar-Logo-Vector-1024x154.png",
    },
    {
      name: "Huawei / Partner 5",
      src: "https://solamoenergy.com/wp-content/uploads/2026/07/26068-e1784286559942.png",
    },
    {
      name: "Jinko / Partner 6",
      src: "https://solamoenergy.com/wp-content/uploads/2026/07/26070-e1784286639319.png",
    },
  ];

  const values = [
    {
      icon: Eye,
      title: "Transparency",
      desc: "Honest pricing, no hidden costs, clear communication always",
    },
    {
      icon: Lightbulb,
      title: "Quality",
      desc: "We only install premium, certified solar equipment from global manufacturers",
    },
    {
      icon: Lightbulb,
      title: "Customer First",
      desc: "Free consultation, on-time installation, and lifetime after-sales support.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      desc: "Embracing new technology including EV charging and battery storage",
    },
    {
      icon: Leaf,
      title: "Sustainability",
      desc: "Every system we install reduces carbon emissions and helps Pakistan's environment",
    },
  ];

  /* =========================================================
     ANIMATIONS
  ========================================================= */

  const fadeInUp: Variants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const fadeInLeft: Variants = {
    hidden: {
      opacity: 0,
      x: -30,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const fadeInRight: Variants = {
    hidden: {
      opacity: 0,
      x: 30,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const scaleIn: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const staggerContainer: Variants = {
    hidden: {
      opacity: 1,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  return (
    <div className="bg-white text-[#172217] font-sans w-full pb-20 overflow-hidden">
      {/* =========================================================
          1. FOUNDER MESSAGE SECTION
      ========================================================= */}
      <section className="py-[55px] sm:py-[70px] md:py-[90px] px-4 sm:px-6 lg:px-8 max-w-[1300px] mx-auto">
        {/* Section Label */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            margin: "-60px",
          }}
          variants={fadeInUp}
          className="
            inline-flex
            items-center
            gap-2
            border
            border-[#d8d8d8]
            rounded-full
            px-4
            py-1.5
            mb-6
            text-xs
            font-semibold
            tracking-wider
            uppercase
            text-[#172217]
          "
        >
          <span className="w-2 h-2 rounded-full bg-[#79B900]" />
          ABOUT CEO
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-center">
          {/* Founder Text */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              margin: "-60px",
            }}
            variants={fadeInLeft}
            className="lg:col-span-7 space-y-5 sm:space-y-6 text-[#4a5568] text-base leading-relaxed"
          >
            <h2 className="text-3xl sm:text-5xl font-bold text-[#172217] tracking-tight">
              A Message From Our <br />
              <span className="text-[#172217]">Founder</span>
            </h2>

            <p>
              I&apos;m Sahir Gogari, founder and CEO of Solamo Energy, a solar
              energy company in Karachi, Pakistan.
            </p>

            <p>
              I&apos;m based in Dubai, UAE, where I&apos;ve spent 14 years
              building businesses. I&apos;ve been part of 17+ ventures across
              different industries, each one teaching me something new about how
              business should actually be done.
            </p>

            <p>
              Living and working in the UAE taught me something I couldn&apos;t
              unsee once I noticed it. Here, customers are treated with
              priority, respect, and follow-through, as a baseline expectation,
              not a luxury. When you spend money on something, someone stands
              behind it.
            </p>

            <p>
              When I looked at the solar industry back home in Pakistan, I
              didn&apos;t see that same standard. I saw solar companies chasing
              the lowest quote, cutting corners on structure and material, and
              disappearing the moment the invoice was paid, leaving customers to
              deal with the consequences alone, years later.
            </p>

            <p>
              I started Solamo Energy to change that. I wanted to bring the same
              standard of customer service I&apos;ve come to expect and build
              into my other businesses in the UAE, where the customer is treated
              as a priority, not a transaction, to Karachi and to Pakistan.
            </p>

            <p>
              Every solar system we install is engineered specifically for
              Karachi&apos;s heat and coastal climate, and backed by 6 years of
              after-sales support, not 6 months. That&apos;s not a marketing
              line. It&apos;s the standard I hold every business I build to, and
              Solamo Energy is no exception.
            </p>

            <p>
              If you&apos;re considering solar panel installation in Karachi, I
              hope you&apos;ll let us show you the difference.
            </p>
          </motion.div>

          {/* Founder Image */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              margin: "-60px",
            }}
            variants={scaleIn}
            className="lg:col-span-5"
          >
            <div className="p-3 bg-white border border-[#d8d8d8] rounded-[15px] shadow-none hover:shadow-md transition-shadow duration-300">
              <div className="relative rounded-[12px] overflow-hidden aspect-square sm:aspect-[4/4.2] bg-gray-100 w-full min-h-[300px] sm:min-h-[350px]">
                <Image
                  src="https://sahirgogari.com/wp-content/uploads/2025/08/IMG_2969-2-scaled.webp"
                  alt="Sahir Gogari - Founder & CEO Solamo Energy"
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover object-center hover:scale-105 transition-transform duration-700"
                  priority
                />
              </div>

              {/* Founder Bio */}
              <div className="mt-5 px-2 pb-2">
                <h4 className="font-bold text-[#172217] text-lg">
                  Sahir Gogari
                </h4>

                <p className="text-sm text-gray-500 mt-1">
                  Founder and CEO, Solamo Energy
                </p>

                <p className="text-sm text-gray-500">Dubai, UAE</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          2. OUR TEAM SECTION
      ========================================================= */}
      <section className="py-[55px] sm:py-[70px] md:py-[90px] px-4 sm:px-6 lg:px-8 max-w-[1300px] mx-auto border-t border-gray-100">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            margin: "-60px",
          }}
          variants={fadeInUp}
          className="mb-10 sm:mb-14"
        >
          <div className="inline-flex items-center gap-2 border border-[#d8d8d8] rounded-full px-4 py-1.5 mb-6 text-xs font-semibold tracking-wider uppercase text-[#172217]">
            <span className="w-2 h-2 rounded-full bg-[#79B900]" />
            OUR TEAM
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold text-[#172217] tracking-tight">
            Dedicated Professionals For <br />
            <span className="text-[#79B900]">Solar Success</span>
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            margin: "-40px",
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-5"
        >
          {teamMembers.map((member, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              className="
                bg-white
                border
                border-[#d8d8d8]
                rounded-[15px]
                overflow-hidden
                flex
                flex-col
                shadow-none
                group
                hover:shadow-md
                transition-all
                duration-300
              "
            >
              <div className="relative aspect-[4/4.2] w-full bg-[#F3F4F1] overflow-hidden min-h-[280px] sm:min-h-[300px]">
                <Image
                  src={member.img}
                  alt={member.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-5 sm:p-6 bg-white border-t border-gray-100 flex flex-col justify-center min-h-[100px]">
                <h3 className="font-bold text-xl text-[#172217]">
                  {member.name}
                </h3>

                <p className="text-sm text-gray-500 mt-1">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* =========================================================
          3. OUR STORY SECTION
      ========================================================= */}
      <section className="py-[55px] sm:py-[70px] md:py-[90px] px-4 sm:px-6 lg:px-8 max-w-[1300px] mx-auto border-t border-gray-100">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            margin: "-60px",
          }}
          variants={fadeInUp}
          className="inline-flex items-center gap-2 border border-[#d8d8d8] rounded-full px-4 py-1.5 mb-6 text-xs font-semibold tracking-wider uppercase text-[#172217]"
        >
          <span className="w-2 h-2 rounded-full bg-[#79B900]" />
          ABOUT US
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-center">
          {/* Story Text */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              margin: "-60px",
            }}
            variants={fadeInLeft}
            className="lg:col-span-6 space-y-5 sm:space-y-6 text-[#4a5568] leading-relaxed"
          >
            <h2 className="text-3xl sm:text-5xl font-bold text-[#172217] tracking-tight">
              OUR STORY
            </h2>

            <p>
              Solamo Energy was founded with one mission: to make solar energy
              accessible, affordable, and hassle-free for every home, business,
              farm, and factory in Karachi.
            </p>

            <p>
              Pakistan is facing one of the worst electricity crises in its
              history. Bills have skyrocketed. Load shedding continues. Millions
              of households and businesses are suffering. We started Solamo
              Energy because we believe the answer is right above us — the sun
              shines 7 to 9 hours every day in Pakistan, making it one of the
              best countries in the world for solar energy.
            </p>

            <p>
              We are based in Karachi and backed by a team of experienced solar
              professionals, certified installers, and a world-class digital
              infrastructure that ensures every client gets the best system,
              best price, and best after-sales support in the market.
            </p>
          </motion.div>

          {/* Story Image */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              margin: "-60px",
            }}
            variants={scaleIn}
            className="lg:col-span-6"
          >
            <div className="relative h-80 sm:h-96 rounded-[15px] overflow-hidden shadow-none bg-gray-100 w-full">
              <Image
                src="https://solamoenergy.com/wp-content/uploads/2026/05/IMages-1.png"
                alt="Solamo Energy Our Story visual"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          4. MISSION & VISION
      ========================================================= */}
      <section className="py-[55px] sm:py-[70px] md:py-[80px] px-4 sm:px-6 lg:px-8 max-w-[1300px] mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            margin: "-50px",
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 md:gap-5"
        >
          {/* Mission */}
          <motion.div
            variants={fadeInLeft}
            className="
              group
              relative
              p-6
              sm:p-7
              md:p-8
              rounded-[15px]
              border
              border-[#d8d8d8]
              bg-white
              shadow-none
              flex
              flex-col
              justify-between
              min-h-[205px]
              hover:shadow-md
              transition-all
              duration-300
            "
          >
            <span className="text-4xl font-light text-[#79B900] select-none">
              01
            </span>

            <div>
              <div
                className="
                  w-14
                  h-14
                  rounded-full
                  border
                  border-[#79B900]
                  flex
                  items-center
                  justify-center
                  text-[#79B900]
                  mb-6
                  transition-all
                  duration-300
                  group-hover:bg-[#79B900]
                  group-hover:scale-105
                "
              >
                <Target className="w-6 h-6 transition-colors duration-300 group-hover:text-white" />
              </div>

              <h3 className="text-2xl font-bold text-[#172217] mb-3">
                Mission
              </h3>

              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                To deliver premium, affordable solar energy solutions to homes,
                businesses, farms, and industries across Karachi — reducing
                electricity costs and building a greener Pakistan
              </p>
            </div>
          </motion.div>

          {/* Vision */}
          <motion.div
            variants={fadeInRight}
            className="
              group
              relative
              p-6
              sm:p-7
              md:p-8
              rounded-[15px]
              border
              border-[#d8d8d8]
              bg-white
              shadow-none
              flex
              flex-col
              justify-between
              min-h-[205px]
              hover:shadow-md
              transition-all
              duration-300
            "
          >
            <span className="text-4xl font-light text-[#79B900] select-none">
              02
            </span>

            <div>
              <div
                className="
                  w-14
                  h-14
                  rounded-full
                  border
                  border-[#79B900]
                  flex
                  items-center
                  justify-center
                  text-[#79B900]
                  mb-6
                  transition-all
                  duration-300
                  group-hover:bg-[#79B900]
                  group-hover:scale-105
                "
              >
                <Eye className="w-6 h-6 transition-colors duration-300 group-hover:text-white" />
              </div>

              <h3 className="text-2xl font-bold text-[#172217] mb-3">Vision</h3>

              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                To become Pakistan&apos;s most trusted solar energy brand,
                powering 10,000 installations across the country through our
                growing franchise network.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* =========================================================
          5. EQUIPMENT PARTNERS / BRANDS
      ========================================================= */}
      <section className="py-[55px] sm:py-[70px] md:py-[80px] px-4 sm:px-6 lg:px-8 max-w-[1300px] mx-auto text-center">
        <motion.h3
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
          }}
          variants={fadeInUp}
          className="text-2xl sm:text-3xl font-bold text-[#172217] mb-10 sm:mb-12"
        >
          We Install Equipment From
        </motion.h3>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
          }}
          className="flex flex-wrap items-center justify-center gap-7 sm:gap-10 md:gap-14"
        >
          {brandLogos.map((brand, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              className="
                relative
                h-12
                w-32
                sm:w-36
                flex
                items-center
                justify-center
                opacity-90
                hover:opacity-100
                transition-opacity
                duration-300
              "
            >
              <Image
                src={brand.src}
                alt={brand.name}
                fill
                sizes="150px"
                className="object-contain"
              />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* =========================================================
          6. OUR VALUES
      ========================================================= */}
      <section className="py-[55px] sm:py-[70px] md:py-[90px] px-4 sm:px-6 lg:px-8 max-w-[1300px] mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
          }}
          variants={fadeInUp}
          className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 md:mb-16"
        >
          <h2 className="text-3xl sm:text-5xl font-bold text-[#172217] tracking-tight">
            OUR VALUES
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            margin: "-40px",
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 sm:gap-6"
        >
          {values.map((val, idx) => {
            const IconComponent = val.icon;

            return (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="
                  p-6
                  md:p-7
                  rounded-[15px]
                  border
                  border-[#d8d8d8]
                  bg-white
                  shadow-none
                  flex
                  flex-col
                  items-center
                  text-center
                  hover:shadow-md
                  hover:-translate-y-1
                  transition-all
                  duration-300
                "
              >
                <div
                  className="
                    w-14
                    h-14
                    rounded-full
                    border
                    border-[#79B900]
                    flex
                    items-center
                    justify-center
                    text-[#79B900]
                    mb-6
                    transition-all
                    duration-300
                  "
                >
                  <IconComponent className="w-6 h-6" />
                </div>

                <h3 className="font-bold text-lg text-[#172217] mb-3">
                  {val.title}
                </h3>

                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                  {val.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* =========================================================
          7. STATS BANNER
      ========================================================= */}
      <section className="bg-[#79B900] text-white py-14 sm:py-16 px-4 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
          }}
          variants={staggerContainer}
          className="
            max-w-[1300px]
            mx-auto
            grid
            grid-cols-2
            lg:grid-cols-4
            gap-6
            sm:gap-8
            text-center
            divide-y
            sm:divide-y-0
            sm:divide-x
            divide-white/20
          "
        >
          {/* Stat 1 */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col items-center justify-center pt-4 sm:pt-0"
          >
            <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-2 leading-none">
              500+
            </div>

            <div className="text-sm font-semibold text-white/90">
              Installations Completed
            </div>
          </motion.div>

          {/* Stat 2 */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col items-center justify-center pt-4 sm:pt-0"
          >
            <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-2 leading-none">
              PKR 50M+
            </div>

            <div className="text-sm font-semibold text-white/90">
              Saved For Clients In Electricity Bills
            </div>
          </motion.div>

          {/* Stat 3 */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col items-center justify-center pt-4 sm:pt-0"
          >
            <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-2 leading-none">
              6+
            </div>

            <div className="text-sm font-semibold text-white/90">
              Year Warranty On All Installations
            </div>
          </motion.div>

          {/* Stat 4 */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col items-center justify-center pt-4 sm:pt-0"
          >
            <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-2 leading-none">
              100%
            </div>

            <div className="text-sm font-semibold text-white/90">
              Client Satisfaction Rate
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* =========================================================
          8. CTA SECTION
      ========================================================= */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
        }}
        variants={fadeInUp}
        className="
          relative
          w-full
          py-20
          sm:py-24
          md:py-28
          px-4
          sm:px-12
          lg:px-20
          overflow-hidden
          bg-[#1B2E1E]
        "
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src="https://solamoenergy.com/wp-content/uploads/2026/05/New-Project-9.jpg"
            alt="Switch to Solar Background"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />

          <div className="absolute inset-0 bg-[#4d741d]/55" />
          <div className="absolute inset-0 bg-black/10" />
        </div>

        {/* CTA Content */}
        <div className="relative z-10 w-full max-w-[1250px] mx-auto text-center flex flex-col items-center text-white">
          {/* BOOK NOW BADGE */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
            }}
            variants={fadeInUp}
            className="
              inline-flex
              items-center
              gap-2
              border
              border-white/70
              rounded-full
              px-4
              py-1.5
              mb-7
              bg-white/5
              backdrop-blur-sm
              text-white
              text-sm
              font-semibold
              tracking-wide
              uppercase
            "
          >
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
          </motion.div>

          {/* HEADING */}
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
            }}
            variants={fadeInUp}
            className="
              text-3xl
              sm:text-5xl
              lg:text-[60px]
              font-black
              tracking-tight
              text-white
              leading-[1.1]
              max-w-[1200px]
              mx-auto
            "
          >
            Ready To Make The Switch To Solar? Our Team Is Ready To Help.
          </motion.h2>

          {/* FREE CONSULTATION BUTTON */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
            }}
            variants={fadeInUp}
            className="pt-8 sm:pt-9 flex justify-center"
          >
            <a
              href="#consultation"
              className="
                group
                inline-flex
                items-center
                justify-center
                gap-3
                px-7
                sm:px-8
                py-3.5
                sm:py-4
                rounded-full
                border
                border-[#79B900]
                bg-transparent
                text-white
                font-semibold
                text-base
                sm:text-lg
                hover:bg-[#79B900]
                hover:border-[#79B900]
                hover:text-[#172217]
                transition-all
                duration-300
              "
            >
              <span>Free Consultation</span>

              <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
