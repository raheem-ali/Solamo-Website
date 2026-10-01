"use client";

import React, { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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

const solutions = [
  {
    num: "01",
    title: "Lithium-Ion Battery Systems",
    desc: "The gold standard for solar storage. Long cycle life (4,000+ cycles), fast charging, compact size, and excellent performance in Karachi’s heat.",
  },
  {
    num: "02",
    title: "Hybrid Inverter Systems",
    desc: "Combines solar, battery, and grid into one smart system. Automatically switches between sources for maximum efficiency and savings.",
  },
  {
    num: "03",
    title: "Whole-Home Backup",
    desc: "Store enough energy to power your entire home through 6 to 8 hours of load shedding with all essential appliances running.",
  },
  {
    num: "04",
    title: "Business Backup Systems",
    desc: "Keep your business operational during power cuts. Never lose productivity or sales due to KESC outages again.",
  },
];

const faqs = [
  {
    question: "How long does the battery last?",
    answer:
      "Lithium-ion batteries last 10 to 15 years with proper use. Most come with a 10-year manufacturer warranty.",
  },
  {
    question: "How many hours of backup does it provide?",
    answer:
      "Depends on battery capacity and your consumption. A typical home system provides 6 to 10 hours of backup.",
  },
  {
    question: "Can battery storage be added to an existing solar system?",
    answer:
      "Yes. We can retrofit battery storage to most existing solar systems. Our team will assess compatibility.",
  },
  {
    question: "Is battery storage worth the investment?",
    answer:
      "Absolutely. With Karachi's ongoing load shedding and high electricity costs, battery storage pays for itself within 3 to 5 years.",
  },
];

export default function SolarBatteryStoragePage() {
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(0); // First FAQ open by default
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalClosing, setIsModalClosing] = useState(false);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [systemSize, setSystemSize] = useState("Lithium-Ion Battery System");
  const [sourcePage, setSourcePage] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSourcePage(window.location.href);
    }
  }, []);

  const toggleFAQ = (index: number) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
  };

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
      `Battery Storage Inquiry Requested!\nName: ${fullName}\nPhone: ${phone}\nOption: ${systemSize}`,
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

      {/* Header */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-grow w-full">
        {/* 1️⃣ SECTION 1: WHY BATTERY STORAGE? (Top Section) */}
        <section className="w-full py-24 px-6 sm:px-12 lg:px-20 overflow-hidden">
          <div className="max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Side: Text Content (fadeInLeft) */}
            <ScrollRevealBlock
              animationClass="animate-fadeInLeft"
              className="space-y-6"
            >
              <h1 className="text-3xl sm:text-[42px] font-bold text-[#172217] tracking-tight uppercase leading-[1.1]">
                WHY BATTERY STORAGE?
              </h1>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                A standard on-grid solar system shuts down during load shedding
                for safety reasons. This means during Karachi&apos;s frequent
                power cuts, your solar system stops working too. Battery storage
                solves this completely. Your solar panels charge the battery
                during the day. When load shedding hits — your battery kicks in
                automatically. No interruption. No UPS. No generator noise or
                fuel cost.
              </p>
            </ScrollRevealBlock>

            {/* Right Side: Image only (fadeInRight) */}
            <ScrollRevealBlock
              animationClass="animate-fadeInRight"
              className="flex justify-center lg:justify-end"
            >
              <div className="w-full max-w-lg">
                <img
                  src="https://solamoenergy.com/wp-content/uploads/2026/05/Group-483728.png"
                  alt="Battery Storage System"
                  className="w-full h-full object-contain"
                />
              </div>
            </ScrollRevealBlock>
          </div>
        </section>

        {/* 2️⃣ SECTION 2: BATTERY STORAGE SOLUTIONS (Staggered fadeInUp) */}
        <section className="w-full bg-white py-24 px-6 sm:px-12 lg:px-20">
          <div className="max-w-[1300px] mx-auto space-y-16">
            <ScrollRevealBlock
              animationClass="animate-fadeInUp"
              className="text-center"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#172217] tracking-tight uppercase">
                BATTERY STORAGE SOLUTIONS
              </h2>
            </ScrollRevealBlock>

            <div className="space-y-6">
              {solutions.map((item, index) => (
                <ScrollRevealBlock
                  key={index}
                  animationClass="animate-fadeInUp"
                  delay={index * 200}
                  className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-6 sm:p-8 rounded-3xl border border-gray-200/80 bg-white hover:border-[#79B900]/50 transition-all duration-300 shadow-sm"
                >
                  <div className="flex items-center gap-6 md:w-5/12">
                    <span className="text-4xl sm:text-5xl font-light text-[#79B900] tracking-tight font-mono">
                      {item.num}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#172217] leading-snug">
                      {item.title}
                    </h3>
                  </div>
                  <div className="hidden md:block w-px h-16 bg-gray-200"></div>
                  <div className="md:w-6/12 text-gray-600 text-base leading-relaxed">
                    {item.desc}
                  </div>
                </ScrollRevealBlock>
              ))}
            </div>
          </div>
        </section>

        {/* 3️⃣ SECTION 3: BATTERY STORAGE FAQ (Accordion) */}
        <section className="w-full bg-white py-24 px-6 sm:px-12 lg:px-20">
          <div className="max-w-[900px] mx-auto space-y-12">
            <ScrollRevealBlock
              animationClass="animate-fadeInUp"
              className="text-center space-y-4"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-200 text-xs font-semibold tracking-wider uppercase text-gray-600 bg-gray-50">
                <svg
                  className="w-4 h-4 text-[#79B900]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 3h20v14H2z" />
                  <path d="M2 10h20" />
                  <path d="M8 3v14" />
                  <path d="M16 3v14" />
                  <path d="M6 17l-2 4h16l-2-4" />
                </svg>
                <span>faq</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#172217] tracking-tight uppercase">
                BATTERY STORAGE FAQ
              </h2>
            </ScrollRevealBlock>

            <ScrollRevealBlock animationClass="animate-fadeInUp" delay={200}>
              <div className="space-y-4">
                {faqs.map((faq, index) => {
                  const isOpen = openFAQIndex === index;
                  return (
                    <div key={index} className="flex flex-col">
                      <button
                        onClick={() => toggleFAQ(index)}
                        className={`w-full flex items-center justify-between px-6 py-5 text-left font-bold text-base sm:text-lg transition-all duration-300 bg-[#79B900] text-white cursor-pointer ${
                          isOpen
                            ? "rounded-t-2xl"
                            : "rounded-2xl hover:bg-[#6ba300]"
                        }`}
                      >
                        <span>
                          {String(index + 1).padStart(2, "0")}. {faq.question}
                        </span>
                        <span className="ml-4 flex-shrink-0 text-xl font-bold">
                          {isOpen ? "−" : "+"}
                        </span>
                      </button>
                      {isOpen && (
                        <div className="px-6 py-5 bg-gray-50 text-gray-700 text-base leading-relaxed rounded-b-2xl border-x border-b border-gray-200">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </ScrollRevealBlock>
          </div>
        </section>

        {/* =========================================================
      SECTION 4 — CTA: END LOAD SHEDDING
  ========================================================= */}
        <section className="relative w-full py-24 sm:py-28 px-6 sm:px-12 lg:px-20 overflow-hidden bg-[#1B2E1E]">
          {/* =========================================================
        BACKGROUND
    ========================================================= */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              src="https://solamoenergy.com/wp-content/uploads/2026/05/New-Project-9.jpg"
              alt="Solar Battery Storage"
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
                End Load Shedding Once And For All. Install Solar Battery
                Storage Today.
              </h2>
            </ScrollRevealBlock>

            {/* =======================================================
          CTA BUTTON
      ======================================================= */}
            <ScrollRevealBlock
              animationClass="animate-fadeInLeft"
              delay={300}
              className="flex justify-center pt-9"
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
                  Battery Storage Consultation
                </h3>
                <p className="text-sm font-semibold text-[#79B900]">
                  Solamo Energy Storage Solutions
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
                  System Preference*
                </label>
                <select
                  value={systemSize}
                  onChange={(e) => setSystemSize(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#79B900] bg-white"
                >
                  <option value="Lithium-Ion Battery System">
                    Lithium-Ion Battery System
                  </option>
                  <option value="Hybrid Inverter System">
                    Hybrid Inverter System
                  </option>
                  <option value="Whole-Home Backup">Whole-Home Backup</option>
                  <option value="Business Backup System">
                    Business Backup System
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

      {/* Footer */}
      <Footer />
    </div>
  );
}
