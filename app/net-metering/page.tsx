"use client";

import React, { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Custom hook for intersection observer (runs once per element)
function useScrollAnimation(threshold = 0.1) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element); // trigger once
        }
      },
      { threshold },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible] as const;
}

export default function NetMeteringCompletePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalClosing, setIsModalClosing] = useState(false);

  // Form states
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [systemSize, setSystemSize] = useState("10 kW");
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
      `Net Metering Audit Requested!\nName: ${fullName}\nPhone: ${phone}\nSystem Size: ${systemSize}`,
    );
    handleCloseModal();
  };

  // Section 1 refs
  const [sec1LeftRef, sec1LeftVisible] = useScrollAnimation();
  const [sec1RightRef, sec1RightVisible] = useScrollAnimation();

  // Section 2 refs
  const [sec2TitleRef, sec2TitleVisible] = useScrollAnimation();
  const [sec2GridRef, sec2GridVisible] = useScrollAnimation();

  // Section 3 refs
  const [sec3TitleRef, sec3TitleVisible] = useScrollAnimation();
  const [sec3GridRef, sec3GridVisible] = useScrollAnimation();

  // Section 5 CTA buttons ref
  const [sec5CtaRef, sec5CtaVisible] = useScrollAnimation();

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
          opacity: 0;
        }
        .animate-fadeInLeft.is-visible {
          animation: fadeInLeftCustom 0.8s ease-out forwards;
        }
        .animate-fadeInRight {
          opacity: 0;
        }
        .animate-fadeInRight.is-visible {
          animation: fadeInRightCustom 0.8s ease-out forwards;
        }
        .animate-fadeInUp {
          opacity: 0;
        }
        .animate-fadeInUp.is-visible {
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
        {/* SECTION 1: WHAT IS NET METERING? */}
        <section className="w-full bg-white py-24 px-6 sm:px-12 lg:px-20 overflow-hidden">
          <div className="max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Text Column */}
            <div
              ref={sec1LeftRef}
              className={`lg:col-span-6 space-y-6 animate-fadeInLeft ${
                sec1LeftVisible ? "is-visible" : ""
              }`}
            >
              <h2 className="text-3xl sm:text-[45px] font-black text-[#172217] tracking-tight uppercase leading-[1.1]">
                WHAT IS NET METERING?
              </h2>

              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                Net metering is a government policy that allows solar system
                owners to connect their system to the national grid. When your
                solar panels produce more electricity than you need, the excess
                is sent to the KESC grid. Your meter runs backwards — and KESC
                credits that electricity against your future bills.
              </p>

              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                Since 2022, net-metered solar installations in Pakistan have
                nearly doubled. Solamo Energy manages the complete NEPRA and
                KESC application process so you never have to deal with the
                paperwork.
              </p>
            </div>

            {/* Right Image Column */}
            <div
              ref={sec1RightRef}
              className={`lg:col-span-6 animate-fadeInRight ${
                sec1RightVisible ? "is-visible" : ""
              }`}
            >
              <div className="relative rounded-[20px] overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.08)] bg-gray-100">
                <img
                  src="https://solamoenergy.com/wp-content/uploads/2026/05/screen-2-1024x687.png"
                  alt="What is Net Metering"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: HOW NET METERING WORKS */}
        <section className="w-full bg-gray-50/50 py-24 px-6 sm:px-12 lg:px-20">
          <div className="max-w-[1300px] mx-auto text-center space-y-16">
            <h2
              ref={sec2TitleRef}
              className={`text-3xl sm:text-[42px] font-black text-[#172217] tracking-tight uppercase animate-fadeInUp ${
                sec2TitleVisible ? "is-visible" : ""
              }`}
            >
              HOW NET METERING WORKS
            </h2>

            <div
              ref={sec2GridRef}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-left"
            >
              {[
                {
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
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M12 8a4 4 0 100 8 4 4 0 000-8z"
                      />
                    </svg>
                  ),
                  title: "Solar Generation",
                  desc: "Your solar panels generate electricity during daylight hours.",
                  animClass: "animate-fadeInLeft",
                  delay: "0ms",
                },
                {
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
                  title: "Self Consumption",
                  desc: "Your home or business uses solar electricity first — reducing grid consumption to zero during the day.",
                  animClass: "animate-fadeInUp",
                  delay: "200ms",
                },
                {
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
                  title: "Grid Export",
                  desc: "Any excess electricity flows into the KESC grid — your meter records the export.",
                  animClass: "animate-fadeInRight",
                  delay: "400ms",
                },
                {
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
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                  ),
                  title: "Grid Backup",
                  desc: "At night or during cloudy periods, you draw from the grid as normal.",
                  animClass: "animate-fadeInLeft",
                  delay: "100ms",
                },
                {
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
                        d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                  ),
                  title: "Net Calculation",
                  desc: "Your monthly bill calculates the difference: electricity drawn minus electricity exported.",
                  animClass: "animate-fadeInUp",
                  delay: "300ms",
                },
                {
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
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  ),
                  title: "Zero Bill Future",
                  desc: "If you export more than you import — your bill is zero or you carry forward credits.",
                  animClass: "animate-fadeInRight",
                  delay: "500ms",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`bg-white rounded-[24px] p-8 border border-gray-200/80 shadow-[0_5px_20px_rgba(0,0,0,0.03)] hover:shadow-xl transition-all duration-300 flex flex-col justify-between ${
                    item.animClass
                  } ${sec2GridVisible ? "is-visible" : ""}`}
                  style={{ animationDelay: item.delay }}
                >
                  <div className="space-y-5">
                    <div className="w-14 h-14 rounded-2xl bg-[#79B900]/10 flex items-center justify-center">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold text-[#172217] leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 text-base leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3: NET METERING — SOLAMO'S COMPLETE SERVICE */}
        <section className="w-full bg-white py-24 px-6 sm:px-12 lg:px-20">
          <div className="max-w-[1300px] mx-auto text-center space-y-16">
            <h2
              ref={sec3TitleRef}
              className={`text-3xl sm:text-[42px] font-black text-[#172217] tracking-tight uppercase animate-fadeInUp ${
                sec3TitleVisible ? "is-visible" : ""
              }`}
            >
              NET METERING — SOLAMO&apos;S COMPLETE SERVICE
            </h2>

            <div
              ref={sec3GridRef}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-left"
            >
              {[
                {
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
                        d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                      />
                    </svg>
                  ),
                  title: "Free Eligibility Assessment",
                  desc: "we confirm your system size qualifies for net metering",
                  animClass: "animate-fadeInLeft",
                  delay: "0ms",
                },
                {
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
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  ),
                  title: "NEPRA Application",
                  desc: "Complete NEPRA application preparation and submission",
                  animClass: "animate-fadeInUp",
                  delay: "200ms",
                },
                {
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
                        d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"
                      />
                    </svg>
                  ),
                  title: "KESC Coordination",
                  desc: "all communications handled by our team",
                  animClass: "animate-fadeInRight",
                  delay: "400ms",
                },
                {
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
                  title: "Bi-Directional Meter",
                  desc: "Bi-directional meter installation we arrange and supervise",
                  animClass: "animate-fadeInLeft",
                  delay: "100ms",
                },
                {
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
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                      />
                    </svg>
                  ),
                  title: "Integration Testing",
                  desc: "System integration testing ensure your system feeds correctly to grid",
                  animClass: "animate-fadeInUp",
                  delay: "300ms",
                },
                {
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
                        d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                  ),
                  title: "Ongoing Support",
                  desc: "Ongoing support — help with any billing queries or disputes with KESC",
                  animClass: "animate-fadeInRight",
                  delay: "500ms",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`bg-white rounded-[24px] p-8 border border-gray-200/80 shadow-[0_5px_20px_rgba(0,0,0,0.03)] hover:shadow-xl transition-all duration-300 flex flex-col justify-between ${
                    item.animClass
                  } ${sec3GridVisible ? "is-visible" : ""}`}
                  style={{ animationDelay: item.delay }}
                >
                  <div className="space-y-5">
                    <div className="w-14 h-14 rounded-2xl bg-[#79B900]/10 flex items-center justify-center">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold text-[#172217] leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 text-base leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4: FAQ (Static/instant per prompt rule) */}
        {/* Placeholder / Section skipped or static as per requirements */}

        {/* =========================================================
      SECTION 5 — BOTTOM CTA
  ========================================================= */}
        <section className="relative w-full py-24 sm:py-28 px-6 sm:px-12 lg:px-20 overflow-hidden bg-[#1B2E1E]">
          {/* =========================================================
        BACKGROUND
    ========================================================= */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              src="https://solamoenergy.com/wp-content/uploads/2026/05/New-Project-9.jpg"
              alt="Net Metering"
              className="w-full h-full object-cover object-center"
            />

            {/* Green Overlay */}
            <div className="absolute inset-0 bg-[#4d741d]/55" />

            {/* Subtle Dark Overlay */}
            <div className="absolute inset-0 bg-black/10" />
          </div>

          {/* =========================================================
        CONTENT
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
              We Handle Your Net Metering Application.{" "}
              <br className="hidden sm:inline" />
              You Just Enjoy The Savings
            </h2>

            {/* =======================================================
          TWO CTA BUTTONS
      ======================================================= */}
            <div
              ref={sec5CtaRef}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-9"
            >
              {/* =====================================================
            FREE CONSULTATION
        ===================================================== */}
              <button
                onClick={handleOpenQuote}
                className={`group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full border border-[#79B900] bg-transparent text-white font-semibold text-base sm:text-lg hover:bg-[#79B900] hover:border-[#79B900] hover:text-[#172217] transition-all duration-300 cursor-pointer animate-fadeInLeft ${
                  sec5CtaVisible ? "is-visible" : ""
                }`}
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

              {/* =====================================================
            WHATSAPP
        ===================================================== */}
              <a
                href="https://wa.me/923000000000"
                target="_blank"
                rel="noopener noreferrer"
                className={`group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#79B900] border border-[#79B900] text-[#172217] font-semibold text-base sm:text-lg hover:bg-[#689e00] hover:border-[#689e00] hover:text-white transition-all duration-300 animate-fadeInRight ${
                  sec5CtaVisible ? "is-visible" : ""
                }`}
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
                  Net Metering Consultation
                </h3>
                <p className="text-sm font-semibold text-[#79B900]">
                  NEPRA & KESC Process
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
                  Desired / Existing System Capacity*
                </label>
                <select
                  value={systemSize}
                  onChange={(e) => setSystemSize(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#79B900] bg-white"
                >
                  <option value="5 kW">5 kW System</option>
                  <option value="10 kW">10 kW System</option>
                  <option value="15 kW">15 kW System</option>
                  <option value="20 kW+">20+ kW Commercial/Residential</option>
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
