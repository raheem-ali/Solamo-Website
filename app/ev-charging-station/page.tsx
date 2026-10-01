"use client";

import React, { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CompatibleEvCarousel from "@/components/CompatibleEvCarousel";

// Reusable Intersection Observer hook for strict once-only scroll-trigger
function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold },
    );

    observer.observe(element);
    return () => {
      if (element) observer.unobserve(element);
    };
  }, [threshold]);

  return { ref, isVisible };
}

function ScrollRevealBlock({
  children,
  animationClass,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  animationClass: string;
  delay?: number;
  className?: string;
}) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <div
      ref={ref}
      style={{
        animationDelay: isVisible ? `${delay}ms` : "0ms",
        animationFillMode: "forwards",
      }}
      className={`${className} ${isVisible ? animationClass : "opacity-0"}`}
    >
      {children}
    </div>
  );
}

export default function EVChargingStationPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalClosing, setIsModalClosing] = useState(false);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [systemSize, setSystemSize] = useState("Fast Charger Station");
  const [sourcePage, setSourcePage] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSourcePage(window.location.href);
    }
  }, []);

  const handleOpenQuote = () => {
    setIsModalClosing(false);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalClosing(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsModalClosing(false);
    }, 400);
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      `EV Charging Inquiry Requested!\nName: ${fullName}\nPhone: ${phone}\nOption: ${systemSize}`,
    );
    handleCloseModal();
  };

  return (
    <div className="min-h-screen bg-white text-[#172217] font-sans flex flex-col">
      <style jsx global>{`
        @keyframes fadeInLeftCustom {
          from {
            opacity: 0;
            transform: translate3d(-20px, 0, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
        @keyframes fadeInRightCustom {
          from {
            opacity: 0;
            transform: translate3d(20px, 0, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
        @keyframes fadeInUpCustom {
          from {
            opacity: 0;
            transform: translate3d(0, 20px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
        @keyframes zoomInCustom {
          from {
            opacity: 0;
            transform: scale3d(0.3, 0.3, 0.3);
          }
          50% {
            opacity: 1;
          }
          to {
            opacity: 1;
            transform: scale3d(1, 1, 1);
          }
        }
        @keyframes rotateInUpLeftCustom {
          from {
            transform-origin: left bottom;
            transform: translate3d(0, 100%, 0) rotate3d(0, 0, 1, 45deg);
            opacity: 0;
          }
          to {
            transform-origin: left bottom;
            transform: translate3d(0, 0, 0);
            opacity: 0;
          }
        }
        .animate-fadeInLeft {
          animation: fadeInLeftCustom 0.8s ease-out forwards;
        }
        .animate-fadeInRight {
          animation: fadeInRightCustom 0.8s ease-out forwards;
        }
        .animate-fadeInUp {
          animation: fadeInUpCustom 0.8s ease-out forwards;
        }
        .animate-zoom-in {
          animation: zoomInCustom 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275)
            forwards;
        }
        .animate-rotate-out-left {
          animation: rotateInUpLeftCustom 0.35s ease-in forwards;
        }
      `}</style>

      <Header />

      <main className="flex-grow">
        {/* SECTION 1: THE EV OPPORTUNITY IN PAKISTAN */}
        <section className="w-full bg-white py-24 px-6 sm:px-12 lg:px-20 overflow-hidden">
          <div className="max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <ScrollRevealBlock
              animationClass="animate-fadeInLeft"
              className="lg:col-span-6 space-y-6"
            >
              <h2 className="text-3xl sm:text-[42px] font-bold text-[#172217] tracking-tight uppercase leading-[1.1]">
                THE EV OPPORTUNITY IN PAKISTAN
              </h2>
              <p className="text-gray-600 text-base leading-relaxed">
                Pakistan&apos;s National Electric Vehicle Policy targets 30% of
                all new vehicle sales to be electric by 2030. The government has
                slashed EV charging tariffs by 45% in January 2025, making it
                cheaper to operate charging stations. Over 3,800 investors have
                already expressed interest in charging infrastructure and
                Pakistan plans 3,000 charging stations nationwide.
              </p>
              <p className="text-gray-600 text-base leading-relaxed">
                Right now, fewer than 100 public EV charging stations exist
                across all of Pakistan. In Karachi — a city of 20 million people
                — the number is critically low. This is not a problem. This is
                an opportunity for businesses, property owners, and
                entrepreneurs who act now.
              </p>
            </ScrollRevealBlock>

            <ScrollRevealBlock
              animationClass="animate-fadeInRight"
              className="lg:col-span-6"
            >
              <div className="relative rounded-[20px] overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.08)] bg-gray-100">
                <img
                  src="https://solamoenergy.com/wp-content/uploads/2026/05/screen-1-1024x687.png"
                  alt="The EV Opportunity in Pakistan"
                  className="w-full h-auto object-cover"
                />
              </div>
            </ScrollRevealBlock>
          </div>
        </section>

        {/* SECTION 2 / SOLUTIONS GRID */}
        <section className="w-full bg-white py-24 px-6 sm:px-12 lg:px-20">
          <div className="max-w-[1300px] mx-auto text-center space-y-16">
            <ScrollRevealBlock animationClass="animate-fadeInUp">
              <h2 className="text-3xl sm:text-[42px] font-bold text-[#172217] tracking-tight uppercase">
                EV CHARGING SOLUTIONS WE OFFER
              </h2>
            </ScrollRevealBlock>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 text-left">
              {[
                {
                  animationClass: "animate-fadeInLeft",
                  icon: (
                    <svg
                      className="w-8 h-8 text-[#79B900]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                  ),
                  title: "Home EV Charger (Level 2)",
                  desc: "Dedicated home EV charging point. Charge your electric car overnight. Compatible with all major EV brands available in Pakistan.",
                },
                {
                  animationClass: "animate-fadeInUp",
                  icon: (
                    <svg
                      className="w-8 h-8 text-[#79B900]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  ),
                  title: "Commercial EV Charger",
                  desc: "For offices, hotels, restaurants, and shopping plazas. Attract EV-driving customers. Add a revenue stream by charging per session.",
                },
                {
                  animationClass: "animate-fadeInUp",
                  delay: 200,
                  icon: (
                    <svg
                      className="w-8 h-8 text-[#79B900]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  ),
                  title: "Public Fast Charger (DC)",
                  desc: "High-speed DC fast chargers for petrol stations, motorway stops, and public spaces. Charges EVs in under 30 minutes.",
                },
                {
                  animationClass: "animate-fadeInUp",
                  delay: 400,
                  icon: (
                    <svg
                      className="w-8 h-8 text-[#79B900]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm3 2v6m6-6v6m6-6v6M4 14h16M9 18l-1 3m8-3l1 3"
                      />
                    </svg>
                  ),
                  title: "Solar-Powered EV Station",
                  desc: "The smartest solution — combine solar panels with EV chargers. Charge vehicles with 100% free solar energy. Zero electricity cost per charge.",
                },
                {
                  animationClass: "animate-fadeInRight",
                  icon: (
                    <svg
                      className="w-8 h-8 text-[#79B900]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                      />
                    </svg>
                  ),
                  title: "Fleet Charging Solutions",
                  desc: "For businesses operating electric vehicle fleets — delivery companies, ride-hailing, corporate transport. Multi-charger setups with fleet management software.",
                },
              ].map((item, idx) => (
                <ScrollRevealBlock
                  key={idx}
                  animationClass={item.animationClass}
                  delay={item.delay || idx * 100}
                  className="bg-white rounded-[24px] p-6 border border-gray-200/80 shadow-[0_5px_20px_rgba(0,0,0,0.03)] hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-[#79B900]/10 flex items-center justify-center">
                      {item.icon}
                    </div>
                    <h3 className="text-lg font-bold text-[#172217] leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </ScrollRevealBlock>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3: WHY ADD AN EV CHARGER */}
        <section className="w-full bg-white py-20 px-6 sm:px-10 lg:px-9 overflow-visible">
          <div className="max-w-[1260px] mx-auto">
            <ScrollRevealBlock animationClass="animate-fadeInUp">
              <h2 className="text-[42px] leading-[1.08] font-black text-[#172217] tracking-tight uppercase mb-10">
                WHY ADD AN EV CHARGER
                <br />
                TO YOUR PROPERTY
              </h2>
            </ScrollRevealBlock>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_550px] gap-8 lg:gap-10 items-start">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-9">
                <ScrollRevealBlock
                  animationClass="animate-fadeInLeft"
                  delay={0}
                  className="flex items-start gap-4"
                >
                  <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center">
                    <svg
                      className="w-9 h-9 text-[#79B900]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-[#172217] mb-1">
                      Attract EV-driving customers
                    </h3>
                    <p className="text-sm sm:text-[15px] leading-[1.55] text-[#172217] max-w-[220px]">
                      who spend more time and money at your business
                    </p>
                  </div>
                </ScrollRevealBlock>

                <ScrollRevealBlock
                  animationClass="animate-fadeInUp"
                  delay={200}
                  className="flex items-start gap-4"
                >
                  <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center">
                    <svg
                      className="w-9 h-9 text-[#79B900]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-[#172217] mb-1">
                      Generate additional revenue
                    </h3>
                    <p className="text-sm sm:text-[15px] leading-[1.55] text-[#172217] max-w-[220px]">
                      charge per kWh or per session
                    </p>
                  </div>
                </ScrollRevealBlock>

                <ScrollRevealBlock
                  animationClass="animate-fadeInUp"
                  delay={400}
                  className="flex items-start gap-4"
                >
                  <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center">
                    <svg
                      className="w-9 h-9 text-[#79B900]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-[#172217] mb-1">
                      Government incentives
                    </h3>
                    <p className="text-sm sm:text-[15px] leading-[1.55] text-[#172217] max-w-[220px]">
                      Government incentives and reduced tariffs make EV charging
                      highly profitable
                    </p>
                  </div>
                </ScrollRevealBlock>

                <ScrollRevealBlock
                  animationClass="animate-fadeInRight"
                  delay={600}
                  className="flex items-start gap-4"
                >
                  <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center">
                    <svg
                      className="w-9 h-9 text-[#79B900]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-[#172217] mb-1">
                      Future-proof
                    </h3>
                    <p className="text-sm sm:text-[15px] leading-[1.55] text-[#172217] max-w-[220px]">
                      Future-proof your property as EV adoption accelerates
                      toward 2030
                    </p>
                  </div>
                </ScrollRevealBlock>

                <ScrollRevealBlock
                  animationClass="animate-fadeInLeft"
                  delay={200}
                  className="flex items-start gap-4"
                >
                  <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center">
                    <svg
                      className="w-9 h-9 text-[#79B900]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-[#172217] mb-1">
                      Solar Synergy
                    </h3>
                    <p className="text-sm sm:text-[15px] leading-[1.55] text-[#172217] max-w-[220px]">
                      When paired with solar charging is completely free,
                      maximising profit margins
                    </p>
                  </div>
                </ScrollRevealBlock>

                <ScrollRevealBlock
                  animationClass="animate-fadeInRight"
                  delay={400}
                  className="flex items-start gap-4"
                >
                  <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center">
                    <svg
                      className="w-9 h-9 text-[#79B900]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-[#172217] mb-1">
                      Old CNG stations
                    </h3>
                    <p className="text-sm sm:text-[15px] leading-[1.55] text-[#172217] max-w-[220px]">
                      Old CNG stations can be converted into EV hubs —
                      capitalise on existing infrastructure
                    </p>
                  </div>
                </ScrollRevealBlock>
              </div>

              {/* RIGHT IMAGE + GREEN BADGE */}
              <ScrollRevealBlock
                animationClass="animate-fadeInRight"
                className="relative w-full lg:w-[550px]"
              >
                <div className="relative">
                  <img
                    src="https://solamoenergy.com/wp-content/uploads/2026/05/Container.png"
                    alt="Property EV charger integration view"
                    className="w-full h-auto block"
                  />
                </div>
              </ScrollRevealBlock>
            </div>
          </div>
        </section>

        {/* SECTION 4: COMPATIBLE EV BRANDS */}
        <section className="w-full bg-white py-24 px-6 sm:px-12 lg:px-20 overflow-hidden">
          <div className="max-w-[1300px] mx-auto text-center space-y-12">
            <ScrollRevealBlock
              animationClass="animate-fadeInUp"
              className="space-y-4"
            >
              <h2 className="text-3xl sm:text-[42px] font-bold text-[#172217] tracking-tight uppercase leading-[1.1]">
                COMPATIBLE EV BRANDS
              </h2>
              <p className="text-gray-600 text-base max-w-2xl mx-auto leading-relaxed">
                Our EV charging stations are compatible with all major electric
                vehicles available in Pakistan including BYD, MG ZS EV, Hyundai
                Ioniq, Nishat EV, Prince Pearl EV, Inverex XiO, and all future
                EV models entering the Pakistan market.
              </p>
            </ScrollRevealBlock>

            <ScrollRevealBlock animationClass="animate-fadeInUp" delay={200}>
              <CompatibleEvCarousel />
            </ScrollRevealBlock>
          </div>
        </section>

        {/* SECTION 5: EV + SOLAR: THE ULTIMATE COMBINATION */}
        <section className="w-full bg-white py-24 px-6 sm:px-12 lg:px-20 overflow-hidden">
          <div className="max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <ScrollRevealBlock
              animationClass="animate-fadeInLeft"
              className="space-y-6"
            >
              <h2 className="text-3xl sm:text-[42px] font-bold text-[#172217] tracking-tight uppercase leading-[1.1]">
                EV + SOLAR THE ULTIMATE COMBINATION
              </h2>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                The smartest EV charging setup combines solar panels with your
                charging station. During the day, your solar system generates
                free electricity. Your EV charger uses that free solar power to
                charge vehicles. If you are operating a commercial charger — you
                charge customers and your input cost is zero. Pure profit.
              </p>
            </ScrollRevealBlock>

            <ScrollRevealBlock
              animationClass="animate-fadeInRight"
              className="flex justify-center lg:justify-end"
            >
              <div className="w-full max-w-md aspect-square flex items-center justify-center p-8">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-64 h-64 sm:w-80 sm:h-80 text-[#79B900]"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M19 7h-1V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v3H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM8 4h8v3H8V4zm11 15H5V9h14v10z" />
                  <path d="M11 11h2v6h-2z" />
                </svg>
              </div>
            </ScrollRevealBlock>
          </div>
        </section>

        {/* =========================================================
      SECTION 6: CTA
  ========================================================= */}
        <section className="relative w-full py-24 sm:py-28 px-6 sm:px-12 lg:px-20 overflow-hidden bg-[#1B2E1E]">
          {/* =========================================================
        BACKGROUND IMAGE
    ========================================================= */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              src="https://solamoenergy.com/wp-content/uploads/2026/05/New-Project-9.jpg"
              alt="EV Charging Station"
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
            <ScrollRevealBlock animationClass="animate-fadeInUp">
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
            </ScrollRevealBlock>

            {/* =======================================================
          HEADING
      ======================================================= */}
            <ScrollRevealBlock animationClass="animate-fadeInUp" delay={150}>
              <h2 className="text-4xl sm:text-5xl lg:text-[60px] font-black tracking-tight leading-[1.1] max-w-[1200px] mx-auto">
                Get Ahead Of Pakistan&apos;s EV Revolution. Install Your
                Charging Station Today.
              </h2>
            </ScrollRevealBlock>

            {/* =======================================================
          DESCRIPTION
      ======================================================= */}
            <ScrollRevealBlock animationClass="animate-fadeInUp" delay={300}>
              <p className="max-w-[780px] mx-auto mt-7 text-gray-100 text-base sm:text-lg lg:text-xl font-normal leading-relaxed">
                Whether for your home, office, or commercial property — our EV
                charging team will design and install the perfect solution.
              </p>
            </ScrollRevealBlock>

            {/* =======================================================
          TWO CTA BUTTONS
      ======================================================= */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-9">
              {/* =====================================================
            FREE CONSULTATION
        ===================================================== */}
              <ScrollRevealBlock
                animationClass="animate-fadeInLeft"
                delay={450}
              >
                <button
                  onClick={handleOpenQuote}
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full border border-[#79B900] bg-transparent text-white font-semibold text-base sm:text-lg hover:bg-[#79B900] hover:border-[#79B900] hover:text-[#172217] transition-all duration-300 cursor-pointer"
                >
                  <span>Free Consultation</span>

                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M7 17L17 7" />
                    <path d="M17 7H7" />
                    <path d="M17 7V17" />
                  </svg>
                </button>
              </ScrollRevealBlock>

              {/* =====================================================
            WHATSAPP
        ===================================================== */}
              <ScrollRevealBlock
                animationClass="animate-fadeInRight"
                delay={600}
              >
                <a
                  href="https://wa.me/923141349717"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#79B900] border border-[#79B900] text-[#172217] font-semibold text-base sm:text-lg hover:bg-[#689e00] hover:border-[#689e00] hover:text-white transition-all duration-300"
                >
                  <span>WhatsApp Us Now</span>

                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M7 17L17 7" />
                    <path d="M17 7H7" />
                    <path d="M17 7V17" />
                  </svg>
                </a>
              </ScrollRevealBlock>
            </div>
          </div>
        </section>
      </main>

      {/* POPUP FORM MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div
            className={`bg-white rounded-[32px] max-w-lg w-full p-8 shadow-2xl relative space-y-6 ${
              isModalClosing ? "animate-rotate-out-left" : "animate-zoom-in"
            }`}
          >
            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
              <div>
                <h3 className="text-2xl font-black text-[#172217]">
                  EV Charging Consultation
                </h3>
                <p className="text-sm font-semibold text-[#79B900]">
                  Solamo Energy Infrastructure
                </p>
              </div>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-700 text-xl font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitForm} className="space-y-4">
              <input type="hidden" name="source_url" value={sourcePage} />

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Full Name*
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter full name"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#79B900]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Phone / WhatsApp Number*
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="03XXXXXXXXX"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#79B900]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Project Type*
                </label>
                <select
                  value={systemSize}
                  onChange={(e) => setSystemSize(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#79B900] bg-white"
                >
                  <option value="Fast Charger Station">
                    Commercial Fast Charger Station
                  </option>
                  <option value="Fleet Charging">Fleet Depot Charging</option>
                  <option value="Property Owner">
                    Property / Plaza Rooftop EV Hub
                  </option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-[#79B900] text-white py-4 rounded-full font-bold text-base hover:bg-[#689e00] transition-colors cursor-pointer shadow-md shadow-[#79B900]/25 mt-2"
              >
                Submit Inquiry
              </button>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
