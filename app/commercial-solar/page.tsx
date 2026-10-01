"use client";

import React, { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Building2,
  ShoppingBag,
  Hotel,
  BriefcaseMedical,
  GraduationCap,
  Warehouse,
  Store,
  Fuel,
  ArrowUpRight,
  LayoutGrid,
  DollarSign,
  Landmark,
  Lightbulb,
  Tag,
  Gauge,
  Building,
  Factory,
} from "lucide-react";

// Custom hook for scroll-triggered entrance (triggers once per element, ~0.8s ease-out)
function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.1,
) {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // Trigger once per element
        }
      },
      { threshold },
    );

    observer.observe(element);
    return () => {
      if (element) observer.unobserve(element);
    };
  }, [threshold]);

  return [ref, isVisible] as const;
}

export default function CommercialSolarWhoWeServePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalClosing, setIsModalClosing] = useState(false);
  const [selectedSector, setSelectedSector] = useState("");

  // Form states
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [monthlyBill, setMonthlyBill] = useState("50k–100k");
  const [honeypot, setHoneypot] = useState("");
  const [sourcePage, setSourcePage] = useState("");

  // Section 1 refs
  const [sec1HeaderRef, sec1HeaderVisible] = useScrollReveal();
  const sec1Card0 = useScrollReveal();
  const sec1Card1 = useScrollReveal();
  const sec1Card2 = useScrollReveal();
  const sec1Card3 = useScrollReveal();
  const sec1Card4 = useScrollReveal();
  const sec1Card5 = useScrollReveal();
  const sec1Card6 = useScrollReveal();
  const sec1Card7 = useScrollReveal();
  const sec1CardRefs = [
    sec1Card0,
    sec1Card1,
    sec1Card2,
    sec1Card3,
    sec1Card4,
    sec1Card5,
    sec1Card6,
    sec1Card7,
  ];

  // Section 2 refs
  const [sec2HeaderRef, sec2HeaderVisible] = useScrollReveal();
  const sec2Card0 = useScrollReveal();
  const sec2Card1 = useScrollReveal();
  const sec2Card2 = useScrollReveal();
  const sec2Card3 = useScrollReveal();
  const sec2Card4 = useScrollReveal();
  const sec2CardRefs = [sec2Card0, sec2Card1, sec2Card2, sec2Card3, sec2Card4];
  const [sec2CtaRef, sec2CtaVisible] = useScrollReveal();

  // Section 3 refs
  const [sec3HeaderRef, sec3HeaderVisible] = useScrollReveal();
  const sec3Size0 = useScrollReveal();
  const sec3Size1 = useScrollReveal();
  const sec3Size2 = useScrollReveal();
  const sec3Size3 = useScrollReveal();
  const sec3SizeRefs = [sec3Size0, sec3Size1, sec3Size2, sec3Size3];

  // Section 4 refs
  const [sec4PillRef, sec4PillVisible] = useScrollReveal();
  const [sec4HeadingRef, sec4HeadingVisible] = useScrollReveal();
  const [sec4ParaRef, sec4ParaVisible] = useScrollReveal();
  const [sec4BtnRef, sec4BtnVisible] = useScrollReveal();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSourcePage(window.location.href);
    }
  }, []);

  const handleOpenQuote = (sectorName = "Commercial Inquiry") => {
    setSelectedSector(sectorName);
    setIsModalClosing(false);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalClosing(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsModalClosing(false);
    }, 400); // match modal animation duration
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return; // spam prevention
    alert(
      `Commercial Solar Inquiry Submitted for ${selectedSector}!\nName: ${fullName}\nEmail: ${email}\nWhatsApp: ${whatsappNumber}\nMonthly Bill: ${monthlyBill}`,
    );
    handleCloseModal();
  };

  const sectors = [
    {
      title: "Office",
      subtitle: "Offices and corporate headquarters",
      animBase: "animate-fade-in-left-base",
      icon: <Building2 className="w-8 h-8 text-[#79B900]" strokeWidth={1.5} />,
    },
    {
      title: "Shopping plazas",
      subtitle: "Shopping plazas and commercial markets",
      animBase: "animate-fade-in-up-base",
      delayStyle: { transitionDelay: "100ms" },
      icon: (
        <ShoppingBag className="w-8 h-8 text-[#79B900]" strokeWidth={1.5} />
      ),
    },
    {
      title: "Hotels/restaurants",
      subtitle: "Hotels, restaurants, and hospitality businesses",
      animBase: "animate-fade-in-up-base",
      delayStyle: { transitionDelay: "200ms" },
      icon: <Hotel className="w-8 h-8 text-[#79B900]" strokeWidth={1.5} />,
    },
    {
      title: "Hospitals/clinics",
      subtitle: "Hospitals, clinics, and medical centres",
      animBase: "animate-fade-in-right-base",
      icon: (
        <BriefcaseMedical
          className="w-8 h-8 text-[#79B900]"
          strokeWidth={1.5}
        />
      ),
    },
    {
      title: "Schools/colleges",
      subtitle: "Schools, colleges, and educational institutions",
      animBase: "animate-fade-in-left-base",
      icon: (
        <GraduationCap className="w-8 h-8 text-[#79B900]" strokeWidth={1.5} />
      ),
    },
    {
      title: "Warehouses",
      subtitle: "Warehouses and storage facilities",
      animBase: "animate-fade-in-up-base",
      delayStyle: { transitionDelay: "100ms" },
      icon: <Warehouse className="w-8 h-8 text-[#79B900]" strokeWidth={1.5} />,
    },
    {
      title: "Retail stores",
      subtitle: "Retail stores and showrooms",
      animBase: "animate-fade-in-up-base",
      delayStyle: { transitionDelay: "200ms" },
      icon: <Store className="w-8 h-8 text-[#79B900]" strokeWidth={1.5} />,
    },
    {
      title: "Petrol pumps",
      subtitle: "Petrol pumps and CNG stations",
      animBase: "animate-fade-in-right-base",
      icon: <Fuel className="w-8 h-8 text-[#79B900]" strokeWidth={1.5} />,
    },
  ];

  const benefits = [
    {
      title: "Cost Reduction",
      backDescription:
        "Commercial electricity rates in Pakistan have hit record highs. A 20kW commercial system can save businesses PKR 80,000 to PKR 200,000 per month.",
      animBase: "animate-fade-in-left-base",
      icon: <DollarSign className="w-8 h-8 text-[#79B900]" strokeWidth={1.5} />,
    },
    {
      title: "Tax Benefits",
      backDescription:
        "Pakistan's government offers tax exemptions on solar equipment imports. Businesses can deduct solar investment from taxable income.",
      animBase: "animate-fade-in-up-base",
      icon: <Landmark className="w-8 h-8 text-[#79B900]" strokeWidth={1.5} />,
    },
    {
      title: "Energy Independence",
      backDescription:
        "No more dependency on KESC supply. Solar ensures consistent power during business hours when productivity matters most.",
      animBase: "animate-fade-in-down-base",
      icon: <Lightbulb className="w-8 h-8 text-[#79B900]" strokeWidth={1.5} />,
    },
    {
      title: "Green Brand Image",
      backDescription:
        "Customers increasingly prefer businesses committed to sustainability. Solar makes your brand environmentally responsible.",
      animBase: "animate-fade-in-up-base",
      icon: <Tag className="w-8 h-8 text-[#79B900]" strokeWidth={1.5} />,
    },
    {
      title: "Net Metering Income",
      backDescription:
        "Sell excess electricity back to the grid and create a passive income stream from your rooftop.",
      animBase: "animate-fade-in-right-base",
      icon: <Gauge className="w-8 h-8 text-[#79B900]" strokeWidth={1.5} />,
    },
  ];

  const systemSizes = [
    {
      title: "10kW – 20kW",
      items: ["Small offices", "Medical clinics", "small retail shops"],
      animBase: "animate-fade-in-left-base",
      icon: <Store className="w-9 h-9 text-[#79B900]" strokeWidth={1.5} />,
    },
    {
      title: "20kW – 50kW",
      items: [
        "Medium businesses",
        "Educational facilities",
        "Restaurant groups",
        "Retail plazas",
      ],
      animBase: "animate-fade-in-up-base",
      icon: <Building className="w-9 h-9 text-[#79B900]" strokeWidth={1.5} />,
    },
    {
      title: "50kW – 100kW",
      items: [
        "Large offices",
        "Public Hospital",
        "Full service hotels",
        "shopping centres",
      ],
      animBase: "animate-fade-in-up-base",
      icon: <Building2 className="w-9 h-9 text-[#79B900]" strokeWidth={1.5} />,
    },
    {
      title: "100kW+",
      items: [
        "Industrial-scale commercial",
        "large buildings",
        "Factory head offices",
      ],
      animBase: "animate-fade-in-right-base",
      icon: <Factory className="w-9 h-9 text-[#79B900]" strokeWidth={1.5} />,
    },
  ];

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
        .animate-zoom-in {
          animation: zoomInCustom 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275)
            forwards;
        }
        .animate-rotate-out-left {
          animation: rotateInUpLeftCustom 0.35s ease-in forwards;
        }

        .animate-fade-in-left-base {
          opacity: 0;
          transform: translate3d(-20px, 0, 0);
          transition:
            opacity 0.8s ease-out,
            transform 0.8s ease-out;
        }
        .animate-fade-in-left-base.revealed {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }

        .animate-fade-in-right-base {
          opacity: 0;
          transform: translate3d(20px, 0, 0);
          transition:
            opacity 0.8s ease-out,
            transform 0.8s ease-out;
        }
        .animate-fade-in-right-base.revealed {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }

        .animate-fade-in-up-base {
          opacity: 0;
          transform: translate3d(0, 20px, 0);
          transition:
            opacity 0.8s ease-out,
            transform 0.8s ease-out;
        }
        .animate-fade-in-up-base.revealed {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }

        .animate-fade-in-down-base {
          opacity: 0;
          transform: translate3d(0, -20px, 0);
          transition:
            opacity 0.8s ease-out,
            transform 0.8s ease-out;
        }
        .animate-fade-in-down-base.revealed {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }

        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>

      {/* Shared Header with Hover-intent Mega Menu Support */}
      <Header />

      <main className="flex-grow">
        {/* 1. WHO WE SERVE SECTION */}
        <section className="w-full bg-white py-24 px-6 sm:px-12 lg:px-20">
          <div className="max-w-[1300px] mx-auto space-y-16">
            <div
              ref={sec2HeaderRef as any}
              className={`text-center space-y-4 animate-fade-in-up-base ${
                sec2HeaderVisible ? "revealed" : ""
              }`}
            >
              <div className="inline-flex items-center gap-2 border border-gray-200/80 rounded-full px-5 py-2 text-xs font-semibold text-gray-700 bg-white shadow-xs">
                <LayoutGrid className="w-4 h-4 text-[#79B900]" />
                <span className="text-[#172217] font-bold tracking-wider uppercase">
                  COMMERCIAL SOLAR
                </span>
              </div>
              <h2 className="text-4xl sm:text-[52px] font-black text-[#172217] tracking-tight uppercase">
                WHO WE <span className="text-[#79B900]">SERVE</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {sectors.map((sector, idx) => {
                const [cardRef, cardVisible] = sec1CardRefs[idx];
                return (
                  <div
                    key={idx}
                    ref={cardRef as any}
                    style={sector.delayStyle || {}}
                    className={`group bg-white border border-gray-200/90 rounded-[24px] p-8 flex flex-col justify-between shadow-[0_12px_35px_-12px_rgba(0,0,0,0.06)] hover:shadow-xl hover:border-[#79B900]/50 transition-all duration-300 ${
                      sector.animBase
                    } ${cardVisible ? "revealed" : ""}`}
                  >
                    <div className="mb-10 w-16 h-16 rounded-2xl bg-[#f4f9eb] flex items-center justify-center group-hover:bg-[#79B900]/10 transition-colors">
                      {sector.icon}
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-[#172217] group-hover:text-[#79B900] transition-colors">
                        {sector.title}
                      </h3>
                      <p className="text-sm text-[#515951] leading-relaxed">
                        {sector.subtitle}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 2. WHY BUSINESSES CHOOSE SOLAR SECTION */}
        <section className="w-full bg-white py-24 px-6 sm:px-12 lg:px-20 border-t border-gray-100">
          <div className="max-w-[1300px] mx-auto space-y-16">
            <div
              ref={sec2HeaderRef as any}
              className={`text-center animate-fade-in-up-base ${
                sec2HeaderVisible ? "revealed" : ""
              }`}
            >
              <h2 className="text-3xl sm:text-[46px] font-black text-[#172217] tracking-tight uppercase">
                WHY BUSINESSES CHOOSE SOLAR
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {benefits.map((benefit, idx) => {
                const [cardRef, cardVisible] = sec2CardRefs[idx];
                return (
                  <div
                    key={idx}
                    ref={cardRef as any}
                    className={`group perspective-1000 h-[260px] ${
                      benefit.animBase
                    } ${cardVisible ? "revealed" : ""}`}
                  >
                    <div className="relative w-full h-full duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                      {/* Front Face: Icon + Title */}
                      <div className="absolute inset-0 bg-white border border-[#79B900] rounded-[24px] p-6 flex flex-col items-center text-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.03)] [backface-visibility:hidden]">
                        <div className="mb-6 w-16 h-16 rounded-2xl bg-[#f4f9eb] flex items-center justify-center">
                          {benefit.icon}
                        </div>
                        <h3 className="text-lg font-bold text-[#172217] leading-snug">
                          {benefit.title}
                        </h3>
                      </div>

                      {/* Back Face: Title + Description */}
                      <div className="absolute inset-0 bg-[#f4f9eb] border border-[#79B900] rounded-[24px] p-6 flex flex-col items-center text-center justify-center [transform:rotateY(180deg)] [backface-visibility:hidden] shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
                        <h3 className="text-sm font-bold text-[#172217] mb-2 uppercase tracking-wide">
                          {benefit.title}
                        </h3>
                        <p className="text-xs text-[#515951] leading-relaxed">
                          {benefit.backDescription}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Explicit CTA */}
            <div
              ref={sec2CtaRef as any}
              className={`text-center animate-fade-in-up-base ${
                sec2CtaVisible ? "revealed" : ""
              }`}
            >
              <button
                onClick={() => handleOpenQuote("Commercial Inquiry")}
                className="inline-flex items-center gap-2 bg-[#79B900] text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-[#689e00] transition-colors cursor-pointer shadow-md shadow-[#79B900]/25"
              >
                Get a Custom Commercial Proposal
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* 3. COMMERCIAL SYSTEM SIZES SECTION */}
        <section className="w-full bg-white py-24 px-6 sm:px-12 lg:px-20 border-t border-gray-100">
          <div className="max-w-[1300px] mx-auto space-y-16">
            <div
              ref={sec3HeaderRef as any}
              className={`text-center animate-fade-in-up-base ${
                sec3HeaderVisible ? "revealed" : ""
              }`}
            >
              <h2 className="text-3xl sm:text-[46px] font-black text-[#172217] tracking-tight uppercase">
                COMMERCIAL SYSTEM SIZES
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {systemSizes.map((size, idx) => {
                const [cardRef, cardVisible] = sec3SizeRefs[idx];
                return (
                  <div
                    key={idx}
                    ref={cardRef as any}
                    className={`bg-white border border-[#79B900] rounded-[20px] p-8 flex flex-col gap-6 hover:shadow-lg transition-shadow duration-300 ${
                      size.animBase
                    } ${cardVisible ? "revealed" : ""}`}
                  >
                    <div>{size.icon}</div>
                    <h3 className="text-2xl font-bold text-[#172217]">
                      {size.title}
                    </h3>
                    <ul className="space-y-2 text-[#172217]">
                      {size.items.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-[15px]"
                        >
                          <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[#172217] flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================
      CTA — GET A CUSTOM COMMERCIAL SOLAR PROPOSAL
  ========================================================= */}
        <section className="relative w-full py-24 sm:py-28 px-6 sm:px-12 lg:px-20 overflow-hidden bg-[#1B2E1E]">
          {/* =========================================================
        BACKGROUND IMAGE
    ========================================================= */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              src="https://solamoenergy.com/wp-content/uploads/2026/05/New-Project-9.jpg"
              alt="Commercial Solar Proposal"
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
            <div
              ref={sec4PillRef as any}
              className={`inline-flex items-center gap-2 border border-white/70 rounded-full px-4 py-1.5 mb-7 bg-white/5 backdrop-blur-sm text-white text-sm font-semibold tracking-wide uppercase animate-fade-in-up-base ${
                sec4PillVisible ? "revealed" : ""
              }`}
            >
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
            <h2
              ref={sec4HeadingRef as any}
              className={`text-4xl sm:text-5xl lg:text-[60px] font-black text-white leading-[1.1] tracking-tight max-w-[1200px] mx-auto animate-fade-in-up-base ${
                sec4HeadingVisible ? "revealed" : ""
              }`}
            >
              Get A Custom Commercial Solar Proposal In 48 Hours
            </h2>

            {/* =======================================================
          DESCRIPTION
      ======================================================= */}
            <p
              ref={sec4ParaRef as any}
              style={{ transitionDelay: "100ms" }}
              className={`max-w-[780px] mx-auto mt-7 text-gray-100 text-base sm:text-lg lg:text-xl font-normal leading-relaxed animate-fade-in-up-base ${
                sec4ParaVisible ? "revealed" : ""
              }`}
            >
              Tell us your monthly electricity bill and we will design a system
              that maximises your savings and delivers the fastest possible ROI.
            </p>

            {/* =======================================================
          FREE CONSULTATION
      ======================================================= */}
            <div
              ref={sec4BtnRef as any}
              className={`pt-9 flex justify-center animate-fade-in-left-base ${
                sec4BtnVisible ? "revealed" : ""
              }`}
            >
              <button
                onClick={() => handleOpenQuote("Commercial Inquiry")}
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full border border-[#79B900] bg-transparent text-white font-semibold text-base sm:text-lg hover:bg-[#79B900] hover:border-[#79B900] hover:text-[#172217] transition-all duration-300 cursor-pointer"
              >
                <span>Free Consultation</span>

                <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* POPUP — COMMERCIAL CONSULTATION FORM WITH zoomIn / rotateInUpLeft */}
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
                  Commercial Solar Audit
                </h3>
                <p className="text-sm font-semibold text-[#79B900]">
                  Selection: {selectedSector}
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

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Full Name / Company Representative*
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
                  Email*
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#79B900]"
                />
              </div>

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

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Estimated Monthly Commercial Bill*
                </label>
                <select
                  value={monthlyBill}
                  onChange={(e) => setMonthlyBill(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#79B900] bg-white"
                >
                  <option value="50k–100k">PKR 50k–100k</option>
                  <option value="100k–250k">PKR 100k–250k</option>
                  <option value="250k–500k">PKR 250k–500k</option>
                  <option value="500k+">PKR 500k+</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-[#79B900] text-white py-4 rounded-full font-bold text-base hover:bg-[#689e00] transition-colors cursor-pointer shadow-md shadow-[#79B900]/25 mt-2"
              >
                Request Commercial Proposal
              </button>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
