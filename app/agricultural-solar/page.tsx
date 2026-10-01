"use client";

import React, { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Custom hook to trigger once per element when entering viewport
function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (ref.current) observer.unobserve(ref.current); // trigger once per element
        }
      },
      { threshold: 0.1 },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return { ref, isVisible };
}

function AnimatedSection({
  children,
  className = "",
  animClass = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  animClass?: string;
  delay?: number;
}) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: delay ? `${delay}ms` : "0ms",
      }}
      className={`${className} ${
        isVisible ? animClass : "opacity-0 translate-y-5"
      } transition-all duration-[800ms] ease-out`}
    >
      {children}
    </div>
  );
}

export default function AgriculturalSolarPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalClosing, setIsModalClosing] = useState(false);

  // Form states
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [tubewellHP, setTubewellHP] = useState("15 HP");
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
      `Agricultural Solar Audit Requested!\nName: ${fullName}\nPhone: ${phone}\nTubewell: ${tubewellHP}`,
    );
    handleCloseModal();
  };

  return (
    <div className="min-h-screen bg-white text-[#172217] font-sans flex flex-col">
      <style jsx global>{`
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
        {/* 1. THE AGRICULTURAL ENERGY PROBLEM (Section 1 pattern: Left fadeInLeft, Right fadeInRight) */}
        <section className="w-full bg-white py-24 px-6 sm:px-12 lg:px-20 overflow-hidden">
          <div className="max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <AnimatedSection
              className="lg:col-span-6 space-y-6"
              animClass="opacity-100 !transform-none"
              // Mapping translateX/Y via inline styling or utility classes
            >
              <div
                className="transition-all duration-[800ms] ease-out"
                style={{
                  transform: "translateX(0)",
                }}
              >
                <AnimatedSection
                  animClass="opacity-100 translate-x-0"
                  className="opacity-0 -translate-x-[20px]"
                >
                  <h2 className="text-3xl sm:text-[45px] font-black text-[#172217] tracking-tight uppercase leading-[1.1]">
                    THE AGRICULTURAL <br />
                    ENERGY PROBLEM
                  </h2>

                  <p className="text-gray-600 text-base sm:text-lg leading-relaxed mt-6">
                    Pakistan has 1.5 to 2 million agricultural tube wells, of
                    which 80% historically ran on expensive diesel. With diesel
                    subsidies removed, farmers are facing unsustainable fuel
                    costs that directly eat into their profits. Studies show
                    that farmers with lower monthly expenditures show the
                    highest solar adoption rate at 85% because the savings are
                    immediate and dramatic.
                  </p>

                  <p className="text-gray-600 text-base sm:text-lg leading-relaxed mt-4">
                    Agricultural solar is not a luxury it is a necessity for
                    Pakistan&apos;s farming sector. And Solamo Energy is here to
                    make the transition simple, affordable, and fast.
                  </p>
                </AnimatedSection>
              </div>
            </AnimatedSection>

            <AnimatedSection
              className="lg:col-span-6"
              animClass="opacity-100 translate-x-0"
            >
              <div
                className="relative rounded-[20px] overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.08)] bg-gray-100 opacity-0 translate-x-[20px] duration-[800ms] transition-all ease-out"
                ref={(el) => {
                  if (el) {
                    const observer = new IntersectionObserver(
                      ([e]) => {
                        if (e.isIntersecting) {
                          el.style.opacity = "1";
                          el.style.transform = "translateX(0)";
                          observer.unobserve(el);
                        }
                      },
                      { threshold: 0.1 },
                    );
                    observer.observe(el);
                  }
                }}
              >
                <img
                  src="https://solamoenergy.com/wp-content/uploads/2026/05/screen-1024x572.png"
                  alt=""
                  className="w-full h-auto object-cover"
                />
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* 2. AGRICULTURAL SOLAR SOLUTIONS SECTION (Staggered cards/items matching pricing/grid rule) */}
        <section className="w-full bg-white py-24 px-6 sm:px-12 lg:px-20">
          <div className="max-w-[1300px] mx-auto text-center space-y-16">
            <AnimatedSection
              animClass="opacity-100 translate-y-0"
              className="opacity-0 translate-y-[20px]"
            >
              <h2 className="text-3xl sm:text-[42px] font-black text-[#172217] tracking-tight uppercase">
                AGRICULTURAL SOLAR SOLUTIONS
              </h2>
            </AnimatedSection>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 text-left">
              {[
                {
                  title: "Solar Tube Wells",
                  desc: "Replace diesel-powered tube wells with solar water pumps. Eliminate fuel costs entirely. Available in AC and DC pump configurations for all farm sizes.",
                  animDir: "-translate-x-[20px]",
                  delay: 0,
                },
                {
                  title: "Farm Power Systems",
                  desc: "Complete solar energy systems for farm buildings, storage facilities, staff quarters, and cold storage rooms.",
                  animDir: "translate-y-[20px]",
                  delay: 100,
                },
                {
                  title: "Solar Irrigation Systems",
                  desc: "Automated solar-powered drip and sprinkler irrigation systems. Save water, save fuel, increase yield.",
                  animDir: "translate-y-[20px]",
                  delay: 200,
                },
                {
                  title: "Off-Grid Farm Systems",
                  desc: "For farms without grid access, we design fully off-grid solar systems with battery storage for 24-hour power.",
                  animDir: "translate-y-[20px]",
                  delay: 300,
                },
                {
                  title: "Poultry & Livestock Farms",
                  desc: "Dedicated solar systems for poultry farms, dairy operations, and livestock facilities. Maintain controlled environments without grid dependency.",
                  animDir: "translate-x-[20px]",
                  delay: 400,
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  ref={(el) => {
                    if (el) {
                      const obs = new IntersectionObserver(
                        ([e]) => {
                          if (e.isIntersecting) {
                            setTimeout(() => {
                              el.style.opacity = "1";
                              el.style.transform = "translate(0, 0)";
                            }, item.delay);
                            obs.unobserve(el);
                          }
                        },
                        { threshold: 0.1 },
                      );
                      obs.observe(el);
                    }
                  }}
                  className={`bg-white rounded-[20px] p-6 sm:p-7 border border-gray-200/80 shadow-[0_5px_20px_rgba(0,0,0,0.03)] hover:shadow-lg transition-all duration-[800ms] ease-out opacity-0 ${item.animDir} flex flex-col justify-between`}
                >
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-[#172217] leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. AGRICULTURAL SOLAR SAVINGS EXAMPLE SECTION */}
        <section className="w-full bg-white py-24 px-6 sm:px-12 lg:px-20">
          <div className="max-w-[1200px] mx-auto text-center space-y-16">
            <h2 className="text-3xl sm:text-[42px] font-black text-[#172217] tracking-tight uppercase">
              AGRICULTURAL SOLAR SAVINGS EXAMPLE
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left">
              {/* Left Column — Before Solar (fadeInLeft) */}
              <div
                ref={(el) => {
                  if (el) {
                    const obs = new IntersectionObserver(
                      ([e]) => {
                        if (e.isIntersecting) {
                          el.style.opacity = "1";
                          el.style.transform = "translateX(0)";
                          obs.unobserve(el);
                        }
                      },
                      { threshold: 0.1 },
                    );
                    obs.observe(el);
                  }
                }}
                className="bg-white rounded-[24px] p-8 sm:p-10 border border-gray-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.04)] space-y-8 opacity-0 -translate-x-[20px] transition-all duration-[800ms] ease-out"
              >
                <div className="flex items-center gap-3 border-b border-gray-100 pb-5">
                  <div className="text-red-500">
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-black text-[#172217]">
                    Before Solar
                  </h3>
                </div>

                <div className="space-y-5 text-base sm:text-lg">
                  <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                    <span className="text-gray-600 font-medium">
                      Monthly Fuel Cost
                    </span>
                    <span className="font-bold text-[#172217]">
                      PKR 60,000 – 120,000
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                    <span className="text-gray-600 font-medium">
                      Electricity Bills
                    </span>
                    <span className="font-bold text-[#172217]">
                      PKR 15,000 – 40,000
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                    <span className="text-gray-600 font-medium">
                      Generator Maintenance
                    </span>
                    <span className="font-bold text-[#172217]">
                      PKR 5,000 – 15,000
                    </span>
                  </div>
                  <div className="flex justify-between items-center bg-gray-100/80 rounded-xl px-5 py-4">
                    <span className="font-bold text-[#172217]">
                      Total Monthly Cost
                    </span>
                    <span className="font-black text-xl text-[#172217]">
                      PKR 80,000 – 175,000
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column — After Solar (fadeInRight, Green Theme) */}
              <div
                ref={(el) => {
                  if (el) {
                    const obs = new IntersectionObserver(
                      ([e]) => {
                        if (e.isIntersecting) {
                          setTimeout(() => {
                            el.style.opacity = "1";
                            el.style.transform = "translateX(0)";
                          }, 200);
                          obs.unobserve(el);
                        }
                      },
                      { threshold: 0.1 },
                    );
                    obs.observe(el);
                  }
                }}
                className="bg-[#6CA200] rounded-[24px] p-8 sm:p-10 shadow-[0_15px_35px_rgba(108,162,0,0.2)] text-white space-y-8 opacity-0 translate-x-[20px] transition-all duration-[800ms] ease-out"
              >
                <div className="flex items-center gap-3 border-b border-white/20 pb-5">
                  <div className="text-white">
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-black text-white">
                    After Solar
                  </h3>
                </div>

                <div className="space-y-5 text-base sm:text-lg">
                  <div className="flex justify-between items-center border-b border-white/15 pb-4">
                    <span className="text-white/90 font-medium">
                      Monthly Fuel Cost
                    </span>
                    <span className="font-bold text-white">PKR 0</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/15 pb-4">
                    <span className="text-white/90 font-medium">
                      Electricity Bills
                    </span>
                    <span className="font-bold text-white">PKR 0</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/15 pb-4">
                    <span className="text-white/90 font-medium">
                      Maintenance
                    </span>
                    <span className="font-bold text-white">Minimal</span>
                  </div>
                  <div className="flex justify-between items-center bg-[#547d00] rounded-xl px-5 py-4 border border-white/20">
                    <span className="font-bold text-white">
                      Total Monthly Saving
                    </span>
                    <span className="font-black text-xl text-white">
                      PKR 80,000 – 175,000
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
      CTA — FREE FARM CONSULTATION
  ========================================================= */}
        <section className="relative w-full py-24 sm:py-28 px-6 sm:px-12 lg:px-20 overflow-hidden bg-[#1B2E1E]">
          {/* =========================================================
        BACKGROUND IMAGE
    ========================================================= */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              src="https://solamoenergy.com/wp-content/uploads/2026/05/New-Project-9.jpg"
              alt="Free Farm Consultation"
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
              Stop Spending On Diesel. Switch To Free Solar Energy For Your Farm
            </h2>

            {/* =======================================================
          DESCRIPTION
      ======================================================= */}
            <p className="max-w-[780px] mx-auto mt-7 text-gray-100 text-base sm:text-lg lg:text-xl font-normal leading-relaxed">
              Our agricultural solar team understands farming operations. We
              design systems specifically for your land size, water needs, and
              crop requirements.
            </p>

            {/* =======================================================
          TWO CTA BUTTONS
      ======================================================= */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-9">
              {/* =====================================================
            FREE CONSULTATION
        ===================================================== */}
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

              {/* =====================================================
            WHATSAPP
        ===================================================== */}
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
                  Agricultural Solar Audit
                </h3>
                <p className="text-sm font-semibold text-[#79B900]">
                  VFD & Tubewell Solution
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
                  Farmer Name*
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
                  Tubewell / VFD Capacity*
                </label>
                <select
                  value={tubewellHP}
                  onChange={(e) => setTubewellHP(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#79B900] bg-white"
                >
                  <option value="10 HP">10 HP Tubewell</option>
                  <option value="15 HP">15 HP Tubewell</option>
                  <option value="20 HP">20 HP Tubewell</option>
                  <option value="30 HP+">30+ HP Heavy Duty</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-[#79B900] text-white py-4 rounded-full font-bold text-base hover:bg-[#689e00] transition-colors cursor-pointer shadow-md shadow-[#79B900]/25 mt-2"
              >
                Submit Farm Inquiry
              </button>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
