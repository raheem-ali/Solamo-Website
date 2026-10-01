"use client";

import React, { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Zap } from "lucide-react";

/* =========================================================
   SCROLL ANIMATION HOOK
   ========================================================= */

function useScrollAnimation<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.15,
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return {
    ref,
    isVisible,
  };
}

/* =========================================================
   PAGE
   ========================================================= */

export default function IndustrialSolarPage() {
  /* =========================================================
     MODAL
     ========================================================= */

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalClosing, setIsModalClosing] = useState(false);

  /* =========================================================
     FORM STATES
     ========================================================= */

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [industryType, setIndustryType] = useState("Textile Mill");
  const [honeypot, setHoneypot] = useState("");
  const [sourcePage, setSourcePage] = useState("");

  /* =========================================================
     SECTION 1
     Industrial Energy Crisis
     ========================================================= */

  const sec1Left = useScrollAnimation<HTMLDivElement>();
  const sec1Right = useScrollAnimation<HTMLDivElement>();

  /* =========================================================
     SECTION 2
     Industries We Serve
     ========================================================= */

  const sec2Heading = useScrollAnimation<HTMLHeadingElement>();

  const sec2Item1 = useScrollAnimation<HTMLDivElement>();
  const sec2Item2 = useScrollAnimation<HTMLDivElement>();
  const sec2Item3 = useScrollAnimation<HTMLDivElement>();
  const sec2Item4 = useScrollAnimation<HTMLDivElement>();

  const sec2Item5 = useScrollAnimation<HTMLDivElement>();
  const sec2Item6 = useScrollAnimation<HTMLDivElement>();
  const sec2Item7 = useScrollAnimation<HTMLDivElement>();
  const sec2Item8 = useScrollAnimation<HTMLDivElement>();

  /* =========================================================
     SECTION 3
     Industrial Solar Benefits
     ========================================================= */

  const sec3Heading = useScrollAnimation<HTMLHeadingElement>();

  const sec3Item1 = useScrollAnimation<HTMLDivElement>();
  const sec3Item2 = useScrollAnimation<HTMLDivElement>();
  const sec3Item3 = useScrollAnimation<HTMLDivElement>();
  const sec3Item4 = useScrollAnimation<HTMLDivElement>();
  const sec3Item5 = useScrollAnimation<HTMLDivElement>();

  const sec3Card6 = useScrollAnimation<HTMLAnchorElement>();

  /* =========================================================
     SECTION 4
     Industrial Process
     ========================================================= */

  const sec4Heading = useScrollAnimation<HTMLHeadingElement>();

  const sec4Step1 = useScrollAnimation<HTMLDivElement>();
  const sec4Step2 = useScrollAnimation<HTMLDivElement>();
  const sec4Step3 = useScrollAnimation<HTMLDivElement>();
  const sec4Step4 = useScrollAnimation<HTMLDivElement>();
  const sec4Step5 = useScrollAnimation<HTMLDivElement>();
  const sec4Step6 = useScrollAnimation<HTMLDivElement>();
  const sec4Step7 = useScrollAnimation<HTMLDivElement>();

  /* =========================================================
     SECTION 5
     CTA
     ========================================================= */

  const sec5Content = useScrollAnimation<HTMLDivElement>();
  const sec5Anchor = useScrollAnimation<HTMLAnchorElement>();

  /* =========================================================
     SOURCE URL
     ========================================================= */

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSourcePage(window.location.href);
    }
  }, []);

  /* =========================================================
     MODAL FUNCTIONS
     ========================================================= */

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

    if (honeypot) return;

    alert(
      `Industrial Solar Audit Requested!\nName: ${fullName}\nIndustry: ${industryType}\nWhatsApp: ${whatsappNumber}`,
    );

    handleCloseModal();
  };

  /* =========================================================
     SECTION 2 DATA
     ========================================================= */

  const industries = [
    {
      title: "Textile and garment manufacturing",
      animationClass: "animate-fadeInLeft",
      refObj: sec2Item1,
      icon: (
        <svg
          className="w-7 h-7 text-[#79B900]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
      ),
    },
    {
      title: "Food processing and packaging plants",
      animationClass: "animate-fadeInUp",
      refObj: sec2Item2,
      icon: (
        <svg
          className="w-7 h-7 text-[#79B900]"
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
    },
    {
      title: "Pharmaceutical and chemical industries",
      animationClass: "animate-fadeInUp",
      refObj: sec2Item3,
      icon: (
        <svg
          className="w-7 h-7 text-[#79B900]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
          />
        </svg>
      ),
    },
    {
      title: "Steel, cement, and construction materials",
      animationClass: "animate-fadeInRight",
      refObj: sec2Item4,
      icon: (
        <svg
          className="w-7 h-7 text-[#79B900]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
    },
    {
      title: "Cold storage and refrigeration facilities",
      animationClass: "animate-fadeInLeft",
      refObj: sec2Item5,
      icon: (
        <svg
          className="w-7 h-7 text-[#79B900]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      title: "Printing and packaging factories",
      animationClass: "animate-fadeInUp",
      refObj: sec2Item6,
      icon: (
        <svg
          className="w-7 h-7 text-[#79B900]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
          />
        </svg>
      ),
    },
    {
      title: "Automobile workshops and assembly units",
      animationClass: "animate-fadeInUp",
      refObj: sec2Item7,
      icon: (
        <svg
          className="w-7 h-7 text-[#79B900]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
    },
    {
      title: "Water treatment and purification plants",
      animationClass: "animate-fadeInRight",
      refObj: sec2Item8,
      icon: (
        <svg
          className="w-7 h-7 text-[#79B900]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
          />
        </svg>
      ),
    },
  ];

  /* =========================================================
     SECTION 3 DATA
     ========================================================= */

  const benefits = [
    {
      title: "Massive Cost Reduction",
      desc: "A 500kW industrial system can save PKR 1.5M to PKR 3M per month depending on energy consumption and tariff.",
      refObj: sec3Item1,
      animationClass: "animate-fadeInLeft",
    },
    {
      title: "Export Competitiveness",
      desc: "Textile and food exporters need lower production costs to compete globally. Solar directly reduces your per-unit cost.",
      refObj: sec3Item2,
      animationClass: "animate-fadeInUp",
    },
    {
      title: "Government Incentives",
      desc: "Net metering, duty-free equipment imports, and income tax exemptions make industrial solar financially compelling.",
      refObj: sec3Item3,
      animationClass: "animate-fadeInUp",
    },
    {
      title: "Load Shedding Protection",
      desc: "Industrial solar with battery backup ensures uninterrupted production during power outages.",
      refObj: sec3Item4,
      animationClass: "animate-fadeInUp",
    },
    {
      title: "Carbon Footprint Reduction",
      desc: "Global buyers increasingly require green manufacturing credentials. Solar helps you qualify for international sustainability standards.",
      refObj: sec3Item5,
      animationClass: "animate-fadeInRight",
    },
  ];

  /* =========================================================
     SECTION 4 DATA
     ========================================================= */

  const processSteps = [
    {
      step: "01",
      title: "Site Energy Audit",
      desc: "full analysis of your factory's electricity consumption and peak demand",
      delay: "0ms",
      refObj: sec4Step1,
    },
    {
      step: "02",
      title: "Custom System Design",
      desc: "engineered for your specific industrial load profile",
      delay: "200ms",
      refObj: sec4Step2,
    },
    {
      step: "03",
      title: "Structural Assessment",
      desc: "roof or ground-mount feasibility evaluation",
      delay: "400ms",
      refObj: sec4Step3,
    },
    {
      step: "04",
      title: "ROI Analysis",
      desc: "detailed financial model showing savings, payback period, and long-term returns",
      delay: "600ms",
      refObj: sec4Step4,
    },
    {
      step: "05",
      title: "Turnkey Installation",
      desc: "complete project management from permits to commissioning",
      delay: "800ms",
      refObj: sec4Step5,
    },
    {
      step: "06",
      title: "NEPRA Net Metering Application",
      desc: "all documentation handled by our team",
      delay: "1000ms",
      refObj: sec4Step6,
    },
    {
      step: "07",
      title: "Ongoing Monitoring And Maintenance",
      desc: "annual service contracts available",
      delay: "1200ms",
      refObj: sec4Step7,
    },
  ];

  return (
    <div className="min-h-screen bg-white text-[#172217] font-sans flex flex-col">
      {/* =====================================================
          ANIMATION CSS
      ===================================================== */}

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

        @keyframes fadeInDownCustom {
          from {
            opacity: 0;
            transform: translate3d(0, -20px, 0);
          }

          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes fadeInPlainCustom {
          from {
            opacity: 0;
          }

          to {
            opacity: 1;
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
            opacity: 1;
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

        .animate-fadeInDown {
          animation: fadeInDownCustom 0.8s ease-out forwards;
        }

        .animate-fadeInPlain {
          animation: fadeInPlainCustom 0.8s ease-out forwards;
        }

        .animate-zoom-in {
          animation: zoomInCustom 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275)
            forwards;
        }

        .animate-rotate-out-left {
          animation: rotateInUpLeftCustom 0.35s ease-in forwards;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-fadeInLeft,
          .animate-fadeInRight,
          .animate-fadeInUp,
          .animate-fadeInDown,
          .animate-fadeInPlain,
          .animate-zoom-in,
          .animate-rotate-out-left {
            animation: none !important;
          }
        }
      `}</style>

      <Header />

      <main className="flex-grow">
        {/* =====================================================
            SECTION 1
            INDUSTRIAL ENERGY CRISIS
        ===================================================== */}

        <section className="w-full bg-white py-24 px-6 sm:px-12 lg:px-20">
          <div className="max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* LEFT */}
            <div
              ref={sec1Left.ref}
              className={`lg:col-span-6 space-y-6 opacity-0 ${
                sec1Left.isVisible ? "animate-fadeInLeft" : ""
              }`}
            >
              <h2 className="text-4xl sm:text-[50px] font-black text-[#172217] leading-[1.1] tracking-tight uppercase">
                THE INDUSTRIAL <br />
                <span className="text-[#172217]">ENERGY CRISIS</span>
              </h2>

              <p className="text-base sm:text-lg text-[#515951] leading-relaxed">
                Commercial and industrial consumers currently account for over
                51% of Pakistan&apos;s total solar installations — and for good
                reason. Industrial electricity tariffs in Pakistan have risen
                dramatically, severely impacting the competitiveness of
                export-oriented industries. Textile mills, food processors,
                pharmaceutical plants, and cement factories are all turning to
                solar as their most effective cost-reduction strategy.
              </p>
            </div>

            {/* RIGHT */}
            <div
              ref={sec1Right.ref}
              className={`lg:col-span-6 opacity-0 ${
                sec1Right.isVisible ? "animate-fadeInRight" : ""
              }`}
            >
              <div className="relative rounded-[20px] overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.08)] bg-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1200&auto=format&fit=crop"
                  alt="Industrial Solar Plant Rooftop"
                  className="w-full h-[400px] sm:h-[430px] object-cover"
                />

                <div
                  className="absolute bottom-4 inset-x-4 backdrop-blur-md rounded-xl px-5 py-4 border shadow-lg flex items-center justify-between"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    borderColor: "rgba(255, 255, 255, 0.6)",
                  }}
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-[#79B900]/15 flex items-center justify-center text-[#79B900] flex-shrink-0">
                      <Zap className="w-5 h-5" />
                    </div>

                    <div>
                      <p className="text-[10px] font-bold tracking-wider text-gray-500 uppercase">
                        CURRENT CAPACITY
                      </p>

                      <p className="text-lg font-black text-[#172217]">
                        2.4 MW
                      </p>
                    </div>
                  </div>

                  <div className="h-8 w-[1px] bg-gray-300" />

                  <div className="text-right">
                    <p className="text-[10px] font-bold tracking-wider text-gray-500 uppercase">
                      ANNUAL SAVINGS
                    </p>

                    <p className="text-lg font-black text-[#79B900]">
                      PKR 45M+
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            SECTION 2
            INDUSTRIES WE SERVE
        ===================================================== */}

        <section className="w-full bg-white py-24 px-6 sm:px-12 lg:px-20">
          <div className="max-w-[1300px] mx-auto text-center space-y-16">
            <h2
              ref={sec2Heading.ref}
              className={`text-3xl sm:text-[42px] font-black text-[#172217] tracking-tight uppercase opacity-0 ${
                sec2Heading.isVisible ? "animate-fadeInUp" : ""
              }`}
            >
              INDUSTRIES WE SERVE
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
              {industries.map((item, idx) => (
                <div
                  key={idx}
                  ref={item.refObj.ref}
                  className={`bg-white rounded-[20px] p-8 border border-gray-200/80 hover:border-[#79B900]/50 transition-all duration-300 shadow-[0_10px_25px_rgba(0,0,0,0.03)] hover:shadow-lg flex flex-col justify-between space-y-6 opacity-0 ${
                    item.refObj.isVisible ? item.animationClass : ""
                  }`}
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#79B900]/10 flex items-center justify-center">
                    {item.icon}
                  </div>

                  <h3 className="text-lg font-bold text-[#172217] leading-snug">
                    {item.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            SECTION 3
            INDUSTRIAL SOLAR BENEFITS
        ===================================================== */}

        <section className="w-full bg-[#F4F9F1] py-24 px-6 sm:px-12 lg:px-20">
          <div className="max-w-[1300px] mx-auto text-center space-y-16">
            <h2
              ref={sec3Heading.ref}
              className={`text-3xl sm:text-[42px] font-black text-[#172217] tracking-tight uppercase opacity-0 ${
                sec3Heading.isVisible ? "animate-fadeInUp" : ""
              }`}
            >
              INDUSTRIAL SOLAR BENEFITS
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
              {benefits.map((card, idx) => (
                <div
                  key={idx}
                  ref={card.refObj.ref}
                  className={`bg-white rounded-[20px] p-8 border border-gray-200/60 shadow-sm flex flex-col justify-between space-y-4 opacity-0 ${
                    card.refObj.isVisible ? card.animationClass : ""
                  }`}
                >
                  <h3 className="text-xl font-bold text-[#172217]">
                    {card.title}
                  </h3>

                  <p className="text-gray-600 text-base leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              ))}

              {/* CARD 6 */}

              <a
                ref={sec3Card6.ref}
                href="#report"
                className={`bg-[#1B2E1E] rounded-[20px] p-8 flex flex-col justify-center items-start shadow-md hover:bg-[#162518] transition-all group cursor-pointer opacity-0 ${
                  sec3Card6.isVisible ? "animate-fadeInRight" : ""
                }`}
              >
                <div className="space-y-2">
                  <span className="text-[32px] sm:text-[38px] font-bold text-[#79B900] leading-tight block">
                    Industrial
                  </span>

                  <span className="text-[32px] sm:text-[38px] font-bold text-white leading-tight block">
                    Saving Report
                  </span>
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* =====================================================
            SECTION 4
            OUR INDUSTRIAL PROCESS
        ===================================================== */}

        <section className="w-full bg-white py-24 px-6 sm:px-12 lg:px-20">
          <div className="max-w-[1300px] mx-auto text-center space-y-16">
            <h2
              ref={sec4Heading.ref}
              className={`text-3xl sm:text-[42px] font-black text-[#172217] tracking-tight uppercase opacity-0 ${
                sec4Heading.isVisible ? "animate-fadeInUp" : ""
              }`}
            >
              OUR INDUSTRIAL PROCESS
            </h2>

            <div className="space-y-6 text-left">
              {processSteps.map((item) => (
                <div
                  key={item.step}
                  ref={item.refObj.ref}
                  style={{
                    animationDelay: item.delay,
                  }}
                  className={`bg-white rounded-[20px] p-8 border border-gray-200/80 shadow-[0_5px_20px_rgba(0,0,0,0.03)] hover:shadow-md transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6 opacity-0 ${
                    item.refObj.isVisible ? "animate-fadeInUp" : ""
                  }`}
                >
                  <div className="flex items-center gap-8 md:w-5/12">
                    <span className="text-4xl sm:text-5xl font-mono font-bold text-[#79B900] tracking-tighter">
                      {item.step}
                    </span>

                    <h3 className="text-xl sm:text-2xl font-bold text-[#172217]">
                      {item.title}
                    </h3>
                  </div>

                  <div className="hidden md:block h-12 w-[1px] bg-gray-200" />

                  <div className="md:w-6/12">
                    <p className="text-gray-500 text-base sm:text-lg">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
      SECTION 5
      CTA BANNER
  ===================================================== */}
        <section className="relative w-full py-24 sm:py-28 px-6 sm:px-12 lg:px-20 overflow-hidden bg-[#1B2E1E]">
          {/* =====================================================
        BACKGROUND
    ===================================================== */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              src="https://solamoenergy.com/wp-content/uploads/2026/05/New-Project-9.jpg"
              alt="Industrial Solar Audit"
              className="w-full h-full object-cover object-center"
            />

            {/* Green Overlay */}
            <div className="absolute inset-0 bg-[#4d741d]/55" />

            {/* Subtle Dark Overlay */}
            <div className="absolute inset-0 bg-black/10" />
          </div>

          {/* =====================================================
        CONTENT
    ===================================================== */}
          <div
            ref={sec5Content.ref}
            className={`relative z-10 w-full max-w-[1250px] mx-auto text-center flex flex-col items-center text-white opacity-0 ${
              sec5Content.isVisible ? "animate-fadeInUp" : ""
            }`}
          >
            {/* ===================================================
          BOOK NOW BADGE
      =================================================== */}
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

            {/* ===================================================
          HEADING
      =================================================== */}
            <h2 className="text-4xl sm:text-5xl lg:text-[60px] font-black text-white leading-[1.1] tracking-tight max-w-[1200px] mx-auto">
              Request An Industrial Solar Energy Audit Free Of Charge
            </h2>

            {/* ===================================================
          DESCRIPTION
      =================================================== */}
            <p className="max-w-[780px] mx-auto mt-7 text-gray-100 text-base sm:text-lg lg:text-xl font-normal leading-relaxed">
              Our industrial solar team will visit your facility, analyse your
              energy consumption, and deliver a detailed proposal with
              guaranteed savings projections.
            </p>

            {/* ===================================================
          CTA BUTTON
      =================================================== */}
            <div className="pt-9 flex justify-center">
              <a
                ref={sec5Anchor.ref}
                href="#consultation"
                onClick={(e) => {
                  e.preventDefault();
                  handleOpenQuote();
                }}
                className={`group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full border border-[#79B900] bg-transparent text-white font-semibold text-base sm:text-lg hover:bg-[#79B900] hover:border-[#79B900] hover:text-[#172217] transition-all duration-300 cursor-pointer opacity-0 ${
                  sec5Anchor.isVisible ? "animate-fadeInLeft" : ""
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
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* =====================================================
          POPUP FORM
      ===================================================== */}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div
            className={`bg-white rounded-[32px] max-w-lg w-full p-8 shadow-2xl relative space-y-6 ${
              isModalClosing ? "animate-rotate-out-left" : "animate-zoom-in"
            }`}
          >
            {/* HEADER */}

            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
              <div>
                <h3 className="text-2xl font-black text-[#172217]">
                  Industrial Solar Audit
                </h3>

                <p className="text-sm font-semibold text-[#79B900]">
                  Custom Megawatt Solutions
                </p>
              </div>

              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-700 text-xl font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* FORM */}

            <form onSubmit={handleSubmitForm} className="space-y-4">
              {/* HONEYPOT */}

              <input
                type="text"
                name="website_honeypot"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                style={{ display: "none" }}
                tabIndex={-1}
                autoComplete="off"
              />

              <input type="hidden" name="source_url" value={sourcePage} />

              {/* FULL NAME */}

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Full Name / Plant Manager*
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

              {/* EMAIL */}

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Email Address*
                </label>

                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="plant@industry.com"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#79B900]"
                />
              </div>

              {/* WHATSAPP */}

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  WhatsApp Number*
                </label>

                <input
                  type="tel"
                  required
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  placeholder="03XXXXXXXXX"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#79B900]"
                />
              </div>

              {/* INDUSTRY */}

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Industry Sector*
                </label>

                <select
                  value={industryType}
                  onChange={(e) => setIndustryType(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#79B900] bg-white"
                >
                  <option value="Textile Mill">Textile Mill</option>

                  <option value="Food Processor">Food Processor</option>

                  <option value="Pharmaceutical Plant">
                    Pharmaceutical Plant
                  </option>

                  <option value="Cement Factory">Cement Factory</option>

                  <option value="Other Manufacturing">
                    Other Manufacturing
                  </option>
                </select>
              </div>

              {/* SUBMIT */}

              <button
                type="submit"
                className="w-full bg-[#79B900] text-white py-4 rounded-full font-bold text-base hover:bg-[#689e00] transition-colors cursor-pointer shadow-md shadow-[#79B900]/25 mt-2"
              >
                Submit Industrial Inquiry
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
