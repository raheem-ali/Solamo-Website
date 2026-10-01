"use client";

import React, { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Reusable Intersection Observer hook for strict once-only scroll-trigger
function useScrollReveal(threshold = 0.1) {
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

const franchiseCards = [
  {
    num: "46% Annual Growth",
    desc: "Pakistan solar market projected to grow from 7.95 GW to 18 GW by 2031 — 46% annual growth",
    animation: "animate-fadeInLeft",
    icon: (
      <svg
        className="w-6 h-6 text-[#79B900]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
        />
      </svg>
    ),
  },
  {
    num: "Exclusive Territory",
    desc: "Exclusive territory rights — you own your city or district, no competition from within the network",
    animation: "animate-fadeInUp",
    icon: (
      <svg
        className="w-6 h-6 text-[#79B900]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
  {
    num: "Proven Model",
    desc: "Proven business model — everything is already built and tested in Karachi",
    animation: "animate-fadeInUp",
    icon: (
      <svg
        className="w-6 h-6 text-[#79B900]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
  },
  {
    num: "Marketing Support",
    desc: "Complete marketing support Solamo Energy handles all digital marketing, leads are delivered to you",
    animation: "animate-fadeInRight",
    icon: (
      <svg
        className="w-6 h-6 text-[#79B900]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
        />
      </svg>
    ),
  },
  {
    num: "Technical Training",
    desc: "Technical training — full installation and operations training provided",
    animation: "animate-fadeInLeft",
    icon: (
      <svg
        className="w-6 h-6 text-[#79B900]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    ),
  },
  {
    num: "National Brand Power",
    desc: "Brand power — operate under an established, trusted national brand",
    animation: "animate-fadeInUp",
    icon: (
      <svg
        className="w-6 h-6 text-[#79B900]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
        />
      </svg>
    ),
  },
  {
    num: "Dedicated Support",
    desc: "Ongoing support — dedicated franchise support team, monthly review calls",
    animation: "animate-fadeInUp",
    icon: (
      <svg
        className="w-6 h-6 text-[#79B900]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    ),
  },
  {
    num: "Low Capital",
    desc: "Low capital requirement — one of the most affordable franchise opportunities in Pakistan",
    animation: "animate-fadeInRight",
    icon: (
      <svg
        className="w-6 h-6 text-[#79B900]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
];

const whatYouGetItems = [
  {
    num: "01",
    title: "Exclusive Territory",
    desc: "Your city or district is locked for you. No other Solamo Energy franchise can operate in your territory.",
    animationClass: "animate-fadeInLeft",
  },
  {
    num: "02",
    title: "Lead Generation",
    desc: "Solamo Energy's marketing team generates leads for your territory. You focus on conversion and installation.",
    animationClass: "animate-fadeInUp",
  },
  {
    num: "03",
    title: "Brand & Marketing Kit",
    desc: "Full brand identity, marketing materials, social media templates, and digital presence for your franchise.",
    animationClass: "animate-fadeInRight",
  },
  {
    num: "04",
    title: "Technical Training",
    desc: "Comprehensive installation training program. Your team learns from Solamo's certified technicians.",
    animationClass: "animate-fadeInLeft",
  },
  {
    num: "05",
    title: "Business Systems",
    desc: "CRM, quoting tools, project management systems, and customer service processes — all ready to use.",
    animationClass: "animate-fadeInUp",
  },
  {
    num: "06",
    title: "Ongoing Support",
    desc: "Dedicated franchise manager. Monthly performance reviews. Access to central procurement for better equipment pricing.",
    animationClass: "animate-fadeInRight",
  },
];

const franchiseRequirements = [
  {
    num: "01",
    title: "Genuine Passion",
    desc: "Genuine passion for business and entrepreneurship",
  },
  {
    num: "02",
    title: "Minimum Capital",
    desc: "Minimum capital available for franchise fee and initial operations",
  },
  {
    num: "03",
    title: "Office Space",
    desc: "Office space or ability to secure office space in your target city",
  },
  {
    num: "04",
    title: "Willingness",
    desc: "Willingness to follow Solamo Energy systems and standards",
  },
  {
    num: "05",
    title: "Network & Connections",
    desc: "Preferred: existing business network or industry connections in your city",
  },
];

export default function FranchisePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalClosing, setIsModalClosing] = useState(false);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [targetCity, setTargetCity] = useState("");
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
      `Franchise Application Received!\nName: ${fullName}\nPhone: ${phone}\nTarget City: ${targetCity}`,
    );
    handleCloseModal();
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#172217] font-sans">
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

      <main className="flex-grow w-full">
        {/* Section 1 — Why a Solamo Energy Franchise? */}
        <section className="py-20 px-6 sm:px-12 lg:px-20 bg-white">
          <div className="max-w-[1300px] mx-auto space-y-16">
            <ScrollRevealBlock
              animationClass="animate-fadeInUp"
              className="text-center"
            >
              <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#172217] tracking-tight uppercase">
                WHY A SOLAMO ENERGY FRANCHISE?
              </h1>
            </ScrollRevealBlock>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {franchiseCards.map((item, index) => (
                <ScrollRevealBlock
                  key={index}
                  animationClass={item.animation}
                  delay={index * 100}
                  className="p-6 sm:p-8 rounded-3xl border border-gray-200/80 bg-white hover:border-[#79B900]/50 transition-all duration-300 shadow-sm flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#79B900]/10 flex items-center justify-center">
                      {item.icon}
                    </div>

                    <h3 className="text-xl font-bold text-[#172217] leading-snug">
                      {item.num}
                    </h3>
                  </div>

                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed mt-4">
                    {item.desc}
                  </p>
                </ScrollRevealBlock>
              ))}
            </div>
          </div>
        </section>

        {/* Section 2 — What You Get As a Franchisee */}
        <section className="w-full bg-[#f3f8ec] py-24 px-6 sm:px-12 lg:px-20">
          <div className="max-w-[1300px] mx-auto space-y-16">
            <ScrollRevealBlock
              animationClass="animate-fadeInUp"
              className="text-center"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#172217] tracking-tight uppercase">
                WHAT YOU GET AS A FRANCHISEE
              </h2>
            </ScrollRevealBlock>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {whatYouGetItems.map((item, index) => (
                <ScrollRevealBlock
                  key={index}
                  animationClass={item.animationClass}
                  delay={index * 150}
                  className="p-8 sm:p-10 rounded-3xl border border-gray-200/80 bg-white hover:border-[#79B900]/50 transition-all duration-300 shadow-sm flex flex-col justify-between"
                >
                  <div className="space-y-6">
                    <div className="flex justify-start">
                      <span className="text-4xl sm:text-5xl font-light text-[#79B900] tracking-tight font-mono">
                        {item.num}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-[#172217] leading-snug">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-gray-600 text-base leading-relaxed mt-6">
                    {item.desc}
                  </p>
                </ScrollRevealBlock>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3 — Franchise Requirements */}
        <section className="py-24 px-6 sm:px-12 lg:px-20 bg-white">
          <div className="max-w-[1100px] mx-auto space-y-16">
            <ScrollRevealBlock
              animationClass="animate-fadeInUp"
              className="text-center"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#172217] tracking-tight uppercase">
                FRANCHISE REQUIREMENTS
              </h2>
            </ScrollRevealBlock>

            <div className="space-y-6">
              {franchiseRequirements.map((item, index) => (
                <ScrollRevealBlock
                  key={index}
                  animationClass="animate-fadeInUp"
                  delay={index * 150}
                  className="p-6 sm:px-10 sm:py-8 rounded-3xl border border-gray-200/80 bg-white hover:border-[#79B900]/50 transition-all duration-300 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div className="flex items-center gap-6 sm:gap-10 md:w-5/12">
                    <span className="text-3xl sm:text-4xl font-light text-[#79B900] tracking-tight font-mono">
                      {item.num}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#172217]">
                      {item.title}
                    </h3>
                  </div>

                  <div className="md:w-7/12 md:border-l md:border-gray-200/80 md:pl-10">
                    <p className="text-gray-600 text-base leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </ScrollRevealBlock>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================
      SECTION 4 — BOTTOM CTA
  ========================================================= */}
        <section className="relative w-full py-24 sm:py-28 px-6 sm:px-12 lg:px-20 overflow-hidden bg-[#1B2E1E]">
          {/* =========================================================
        BACKGROUND IMAGE
    ========================================================= */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              src="https://solamoenergy.com/wp-content/uploads/2026/05/New-Project-9.jpg"
              alt="Solar Franchise"
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
          HEADING + DESCRIPTION
      ======================================================= */}
            <ScrollRevealBlock animationClass="animate-fadeInUp" delay={150}>
              <div className="space-y-7">
                {/* Heading */}
                <h2 className="text-4xl sm:text-5xl lg:text-[60px] font-black text-white tracking-tight leading-[1.1] max-w-[1200px] mx-auto">
                  Pakistan&apos;s Solar Boom Is Here. Your Franchise Territory
                  Is Waiting.
                </h2>

                {/* Description */}
                <p className="max-w-[780px] mx-auto text-gray-100 text-base sm:text-lg lg:text-xl font-normal leading-relaxed">
                  Apply today and our franchise team will be in touch within 48
                  hours to discuss territory availability and next steps.
                </p>
              </div>
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
                delay={300}
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
                delay={450}
              >
                <a
                  href="https://wa.me/923000000000"
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
                  Franchise Consultation
                </h3>
                <p className="text-sm font-semibold text-[#79B900]">
                  Solamo Energy Partner Network
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
                  Target City / Territory*
                </label>
                <input
                  type="text"
                  required
                  value={targetCity}
                  onChange={(e) => setTargetCity(e.target.value)}
                  placeholder="e.g. Hyderabad, Faisalabad"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#79B900]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#79B900] text-white py-4 rounded-full font-bold text-base hover:bg-[#689e00] transition-colors cursor-pointer shadow-md shadow-[#79B900]/25 mt-2"
              >
                Submit Application
              </button>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
