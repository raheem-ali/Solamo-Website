"use client";

import React, { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Check,
  ArrowUpRight,
  Sun,
  Zap,
  Building2,
  ShieldCheck,
  RefreshCw,
  Activity,
  Plus,
  Minus,
  LayoutGrid,
  Layers,
  FileCheck,
} from "lucide-react";

// Custom hook for scroll-triggered entrance (triggers once per element)
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

export default function ResidentialSolarCombinedPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalClosing, setIsModalClosing] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Form states
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [monthlyBill, setMonthlyBill] = useState("0–5k");
  const [honeypot, setHoneypot] = useState("");
  const [sourcePage, setSourcePage] = useState("");

  // Section 1 refs
  const [sec1LeftRef, sec1LeftVisible] = useScrollReveal();
  const [sec1RightRef, sec1RightVisible] = useScrollReveal();

  // Section 2 refs
  const [sec2HeaderRef, sec2HeaderVisible] = useScrollReveal();
  const [starterCardRef, starterCardVisible] = useScrollReveal();
  const [standardCardRef, standardCardVisible] = useScrollReveal();
  const [premiumCardRef, premiumCardVisible] = useScrollReveal();

  // Section 3 refs
  const [sec3HeaderRef, sec3HeaderVisible] = useScrollReveal();
  // Section 5 CTA animation
  const [sec5CtaRef, sec5CtaVisible] = useScrollReveal(0.5);
  const incl1Ref = useScrollReveal();
  const incl2Ref = useScrollReveal();
  const incl3Ref = useScrollReveal();
  const incl4Ref = useScrollReveal();
  const incl5Ref = useScrollReveal();
  const incl6Ref = useScrollReveal();
  const incl7Ref = useScrollReveal();
  const incl8Ref = useScrollReveal();
  const inclusionRefs = [
    incl1Ref,
    incl2Ref,
    incl3Ref,
    incl4Ref,
    incl5Ref,
    incl6Ref,
    incl7Ref,
    incl8Ref,
  ];

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSourcePage(window.location.href);
    }
  }, []);

  const handleOpenQuote = (planName = "Free Consultation") => {
    setSelectedPlan(planName);
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
      `Form Submitted for ${selectedPlan}!\nName: ${fullName}\nEmail: ${email}\nWhatsApp: ${whatsappNumber}\nBill: ${monthlyBill}`,
    );
    handleCloseModal();
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const plans = [
    {
      name: "Starter Package",
      size: "3KW System",
      desc: "Perfect for 2–3 bedroom apartments and small homes.",
      highlights: [
        "Powers Fans, Lights, Fridge, TV",
        "Save: PKR 8k – 15k / mo",
      ],
      startingLabel: "Starting from:",
      price: "PKR 350,000",
      highlightCard: false,
    },
    {
      name: "Standard Package",
      size: "5KW System",
      desc: "Ideal for 3–4 bedroom family homes.",
      highlights: [
        "Full Appliances + 1.5 Ton AC",
        "Save: PKR 18k – 30k / mo",
        "Battery Backup Optional",
      ],
      startingLabel: "Starting from:",
      price: "PKR 550,000",
      highlightCard: true,
    },
    {
      name: "Premium Package",
      size: "10KW System",
      desc: "Designed for large villas and high energy loads.",
      highlights: ["Multiple ACs & Heavy Load", "Save: PKR 40k – 70k / mo"],
      startingLabel: "Starting from:",
      price: "PKR 950,000",
      highlightCard: false,
    },
  ];

  const inclusions = [
    {
      title: "Premium Solar Panels",
      desc: "Tier-1 global manufacturers, 25-year panel performance warranty",
      icon: <Sun className="w-6 h-6 text-[#79B900]" strokeWidth={1.5} />,
    },
    {
      title: "Hybrid Or On-Grid Inverter",
      desc: "based on your requirement",
      icon: <Zap className="w-6 h-6 text-[#79B900]" strokeWidth={1.5} />,
    },
    {
      title: "Complete Mounting Structure",
      desc: "roof-safe, weather-resistant installation",
      icon: <Building2 className="w-6 h-6 text-[#79B900]" strokeWidth={1.5} />,
    },
    {
      title: "Circuit Protection",
      desc: "Industrial-grade circuit breakers and surge protection for every component.",
      icon: (
        <ShieldCheck className="w-6 h-6 text-[#79B900]" strokeWidth={1.5} />
      ),
    },
    {
      title: "Net Metering Application",
      desc: "we handle all KESC/NEPRA paperwork",
      icon: <RefreshCw className="w-6 h-6 text-[#79B900]" strokeWidth={1.5} />,
    },
    {
      title: "System Monitoring Setup",
      desc: "based on your requirement",
      icon: <Activity className="w-6 h-6 text-[#79B900]" strokeWidth={1.5} />,
    },
    {
      title: "Complete Mounting Structure",
      desc: "roof-safe, weather-resistant installation",
      icon: <Layers className="w-6 h-6 text-[#79B900]" strokeWidth={1.5} />,
    },
    {
      title: "Circuit Protection",
      desc: "Industrial-grade circuit breakers and surge protection for every component.",
      icon: <FileCheck className="w-6 h-6 text-[#79B900]" strokeWidth={1.5} />,
    },
  ];

  const faqs = [
    {
      question: "01. How long does installation take?",
      answer:
        "Most residential installations are completed within 1 to 2 days depending on system size.",
    },
    {
      question: "02. Will solar work during load shedding?",
      answer:
        "With a hybrid system and battery storage, yes. With an on-grid system, it works during sunlight hours only.",
    },
    {
      question: "03. What is net metering?",
      answer:
        "Net metering lets you sell excess electricity back to KESC. We handle the entire application process for you.",
    },
    {
      question: "04. How long until I recover my investment?",
      answer:
        "Typically 3 to 4 years depending on your system size and electricity consumption.",
    },
    {
      question: "05. Do I need a roof assessment?",
      answer:
        "Yes. Our expert visits your home for free to assess roof condition, shading, and optimal panel placement.",
    },
    {
      question: "06. What warranty do I get?",
      answer:
        "25-year panel performance warranty from manufacturer. 5-year installation warranty from Solamo Energy.",
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question.replace(/^\d+\.\s*/, ""),
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const getInclusionAnimationClass = (index: number) => {
    switch (index) {
      case 0:
        return "animate-fade-in-left";
      case 1:
      case 2:
      case 5:
      case 6:
        return "animate-fade-in-up";
      case 3:
      case 7:
        return "animate-fade-in-right";
      default:
        return "animate-fade-in-up";
    }
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
        .animate-fade-in-left {
          animation: fadeInLeftCustom 0.8s ease-out forwards;
        }
        .animate-fade-in-right {
          animation: fadeInRightCustom 0.8s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fadeInUpCustom 0.8s ease-out forwards;
        }
      `}</style>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Header />

      <main className="flex-grow">
        {/* 1. THE PROBLEM WE SOLVE SECTION */}
        <section className="w-full bg-white py-20 px-6 sm:px-10 lg:px-16">
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div
              ref={sec1LeftRef as any}
              className={`space-y-6 pr-0 lg:pr-4 animate-fade-in-left-base ${
                sec1LeftVisible ? "revealed" : ""
              }`}
            >
              <h2 className="text-4xl sm:text-[44px] font-bold text-[#172217] tracking-tight leading-[1.2]">
                THE PROBLEM WE <br /> SOLVE
              </h2>
              <p className="text-[#515951] text-base leading-[1.8]">
                Pakistani homeowners are paying electricity bills that have
                increased by over 200% in the past 3 years. In Karachi, a
                typical 3-bedroom home pays PKR 25,000 to PKR 60,000 every month
                to KESC. Add to this the constant load shedding and you have a
                crisis that solar energy solves completely.
              </p>
            </div>
            <div
              ref={sec1RightRef as any}
              className={`flex justify-center lg:justify-end animate-fade-in-right-base ${
                sec1RightVisible ? "revealed" : ""
              }`}
            >
              <img
                src="https://solamoenergy.com/wp-content/uploads/2026/05/OverlayBorderShadow.png"
                alt="Solar installation solving electricity crisis"
                className="w-full max-w-[652px] h-auto object-contain"
              />
            </div>
          </div>
        </section>

        {/* 2. RESIDENTIAL PRICING SECTION */}
        <section className="w-full bg-white py-24 px-6 sm:px-12 lg:px-20 border-t border-gray-100">
          <div className="max-w-[1300px] mx-auto space-y-20">
            <div
              ref={sec2HeaderRef as any}
              className={`text-center space-y-4 animate-fade-in-up-base ${
                sec2HeaderVisible ? "revealed" : ""
              }`}
            >
              <div className="inline-flex items-center gap-2 border border-gray-200/80 rounded-full px-5 py-2 text-xs font-semibold text-gray-700 bg-white shadow-xs">
                <LayoutGrid className="w-4 h-4 text-[#79B900]" />
                <span className="text-[#172217] font-bold tracking-wider">
                  PRICING PLAN
                </span>
              </div>
              <h2 className="text-4xl sm:text-[50px] font-extrabold text-[#172217] tracking-tight">
                Residential <span className="text-[#79B900]">Pricing</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch pt-4">
              {plans.map((plan, idx) => {
                const cardRef =
                  idx === 0
                    ? starterCardRef
                    : idx === 1
                      ? standardCardRef
                      : premiumCardRef;
                const cardVisible =
                  idx === 0
                    ? starterCardVisible
                    : idx === 1
                      ? standardCardVisible
                      : premiumCardVisible;
                const animClass =
                  idx === 0
                    ? "animate-fade-in-left-base"
                    : idx === 1
                      ? "animate-fade-in-up-base"
                      : "animate-fade-in-right-base";
                const delayStyle =
                  idx === 1
                    ? { transitionDelay: "200ms" }
                    : idx === 2
                      ? { transitionDelay: "400ms" }
                      : {};

                return (
                  <div
                    key={idx}
                    ref={cardRef as any}
                    style={delayStyle}
                    className={`${animClass} ${
                      cardVisible ? "revealed" : ""
                    } rounded-[32px] pt-12 pb-9 px-9 sm:pt-14 sm:pb-11 sm:px-11 flex flex-col justify-between transition-all duration-500 ease-out ${
                      plan.highlightCard
                        ? "border-2 border-[#79B900] bg-[#172217] text-white shadow-2xl lg:-translate-y-4"
                        : "border border-gray-200/90 bg-white text-[#172217] shadow-[0_12px_35px_-12px_rgba(0,0,0,0.06)] hover:shadow-xl"
                    }`}
                  >
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <h3
                          className={`text-xl font-bold tracking-tight ${
                            plan.highlightCard ? "text-white" : "text-[#172217]"
                          }`}
                        >
                          {plan.name}
                        </h3>
                        <div className="text-4xl sm:text-[46px] font-black text-[#79B900] tracking-tight">
                          {plan.size}
                        </div>
                      </div>

                      <p
                        className={`text-sm leading-relaxed ${
                          plan.highlightCard
                            ? "text-gray-300"
                            : "text-[#515951]"
                        }`}
                      >
                        {plan.desc}
                      </p>

                      <hr
                        className={
                          plan.highlightCard
                            ? "border-gray-800 my-6"
                            : "border-gray-100 my-6"
                        }
                      />

                      <ul
                        className={`space-y-4 text-sm ${
                          plan.highlightCard
                            ? "text-gray-200"
                            : "text-[#172217]"
                        }`}
                      >
                        {plan.highlights.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-3.5">
                            <Check className="w-4 h-4 text-[#79B900] mt-1 flex-shrink-0" />
                            <span className="leading-snug">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div
                      className={`mt-12 pt-7 border-t space-y-7 ${
                        plan.highlightCard
                          ? "border-gray-800"
                          : "border-gray-100"
                      }`}
                    >
                      <div>
                        <span
                          className={`text-sm block font-normal normal-case mb-1 ${
                            plan.highlightCard
                              ? "text-gray-300"
                              : "text-gray-700"
                          }`}
                        >
                          {plan.startingLabel}
                        </span>
                        <div
                          className={`text-3xl sm:text-[34px] font-extrabold tracking-tight ${
                            plan.highlightCard ? "text-white" : "text-[#172217]"
                          }`}
                        >
                          {plan.price}
                        </div>
                      </div>

                      <button
                        onClick={() => handleOpenQuote(plan.name)}
                        className={`w-full inline-flex items-center justify-center gap-2 font-bold py-4 px-6 rounded-full transition-all text-base cursor-pointer ${
                          plan.highlightCard
                            ? "border-2 border-[#79B900] text-[#79B900] hover:bg-[#79B900] hover:text-[#172217]"
                            : "bg-[#79B900] text-white hover:bg-[#689e00] shadow-md shadow-[#79B900]/25"
                        }`}
                      >
                        <span>Get Quote</span>
                        <ArrowUpRight className="w-5 h-5 text-current" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 3. WHAT'S INCLUDED IN EVERY INSTALLATION SECTION */}
        <section className="w-full bg-white py-20 px-6 sm:px-12 lg:px-20 border-t border-gray-100">
          <div className="max-w-[1300px] mx-auto space-y-16">
            <div
              ref={sec3HeaderRef as any}
              className={`text-center animate-fade-in-up-base ${
                sec3HeaderVisible ? "revealed" : ""
              }`}
            >
              <h2 className="text-3xl sm:text-[42px] font-extrabold text-[#172217] tracking-tight uppercase">
                WHAT&apos;S INCLUDED IN EVERY INSTALLATION
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {inclusions.map((item, idx) => {
                const [itemRef, itemVisible] = inclusionRefs[idx];
                const baseClass =
                  idx === 0
                    ? "animate-fade-in-left-base"
                    : idx === 3 || idx === 7
                      ? "animate-fade-in-right-base"
                      : "animate-fade-in-up-base";

                return (
                  <div
                    key={idx}
                    ref={itemRef as any}
                    className={`${baseClass} ${
                      itemVisible ? "revealed" : ""
                    } bg-white border border-gray-200/90 rounded-[24px] p-7 flex flex-col justify-between shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-md transition-all duration-300`}
                  >
                    <div className="mb-8">{item.icon}</div>
                    <div className="space-y-2.5">
                      <h3 className="text-lg font-bold text-[#172217] leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-sm text-[#515951] leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 4. RESIDENTIAL SOLAR FAQ SECTION */}
        <section className="w-full bg-white py-24 px-6 sm:px-12 lg:px-20 border-t border-gray-100">
          <div className="max-w-[1000px] mx-auto space-y-16">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 border border-gray-200/80 rounded-full px-5 py-2 text-xs font-semibold text-gray-700 bg-white shadow-xs">
                <LayoutGrid className="w-4 h-4 text-[#79B900]" />
                <span className="text-[#172217] font-bold">FAQ</span>
              </div>
              <h2 className="text-3xl sm:text-[46px] font-extrabold text-[#172217] tracking-tight uppercase">
                RESIDENTIAL SOLAR FAQ
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl overflow-hidden transition-all duration-300"
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full flex items-center justify-between bg-[#79B900] text-white py-5 px-6 sm:px-8 font-bold text-base sm:text-lg text-left transition-colors cursor-pointer"
                    >
                      <span>{faq.question}</span>
                      <span className="ml-4 flex-shrink-0">
                        {isOpen ? (
                          <Minus className="w-5 h-5 text-white" />
                        ) : (
                          <Plus className="w-5 h-5 text-white" />
                        )}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="bg-[#f4f9eb] text-[#515951] px-6 sm:px-8 py-5 text-base leading-relaxed border-x border-b border-gray-200/60 rounded-b-2xl">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section
          ref={sec5CtaRef as any}
          id="t9asyl"
          className="relative w-full py-24 sm:py-28 px-6 sm:px-12 lg:px-20 overflow-hidden bg-[#1B2E1E]"
        >
          {/* Background */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              src="https://solamoenergy.com/wp-content/uploads/2026/05/New-Project-9.jpg"
              alt="Home Solar Assessment"
              className="w-full h-full object-cover object-center"
            />

            <div className="absolute inset-0 bg-[#4d741d]/55" />
            <div className="absolute inset-0 bg-black/10" />
          </div>

          {/* CTA Content */}
          <div className="relative z-10 w-full max-w-[1250px] mx-auto text-center flex flex-col items-center text-white">
            {/* Badge */}
            <div
              style={{ transitionDelay: "0ms" }}
              className={`animate-fade-in-up-base ${
                sec5CtaVisible ? "revealed" : ""
              } inline-flex items-center gap-2 border border-white/70 rounded-full px-4 py-1.5 mb-7 bg-white/5 backdrop-blur-sm text-white text-sm font-semibold tracking-wide uppercase`}
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
            </div>

            {/* Heading */}
            <h2
              style={{ transitionDelay: "100ms" }}
              className={`animate-fade-in-up-base ${
                sec5CtaVisible ? "revealed" : ""
              } text-4xl sm:text-5xl lg:text-[60px] font-black text-white leading-[1.1] tracking-tight max-w-[1200px] mx-auto`}
            >
              Book Your Free Home Solar Assessment Today
            </h2>

            {/* Description */}
            <p
              style={{ transitionDelay: "200ms" }}
              className={`animate-fade-in-up-base ${
                sec5CtaVisible ? "revealed" : ""
              } max-w-[780px] mx-auto mt-7 text-gray-100 text-base sm:text-lg lg:text-xl font-normal leading-relaxed`}
            >
              Our solar expert visits your home, assesses your electricity
              usage, and gives you a complete cost analysis — completely free,
              no obligation.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-9">
              {/* Free Consultation */}
              <button
                onClick={() => handleOpenQuote("Free Home Solar Assessment")}
                style={{ transitionDelay: "300ms" }}
                className={`animate-fade-in-left-base ${
                  sec5CtaVisible ? "revealed" : ""
                } group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full border border-[#79B900] bg-transparent text-white font-semibold text-base sm:text-lg hover:bg-[#79B900] hover:border-[#79B900] hover:text-[#172217] transition-all duration-300 cursor-pointer`}
              >
                <span>Free Consultation</span>

                <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>

              {/* WhatsApp */}
              <a
                href="https://wa.me/923141349717"
                target="_blank"
                rel="noopener noreferrer"
                style={{ transitionDelay: "450ms" }}
                className={`animate-fade-in-right-base ${
                  sec5CtaVisible ? "revealed" : ""
                } group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#79B900] border border-[#79B900] text-[#172217] font-semibold text-base sm:text-lg hover:bg-[#689e00] hover:border-[#689e00] hover:text-white transition-all duration-300`}
              >
                <span>WhatsApp Us Now</span>

                <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* POPUP — QUOTE/CONSULTATION FORM WITH zoomIn / rotateInUpLeft */}
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
                  Stop Paying High Electricity Bills
                </h3>
                <p className="text-sm font-semibold text-[#79B900]">
                  Let&apos;s have a chat ({selectedPlan})
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
                  Full Name*
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
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
                  placeholder="name@example.com"
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
                  Monthly Bill Amount*
                </label>
                <select
                  value={monthlyBill}
                  onChange={(e) => setMonthlyBill(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#79B900] bg-white"
                >
                  <option value="0–5k">0–5k</option>
                  <option value="5–10k">5–10k</option>
                  <option value="10–15k">10–15k</option>
                  <option value="15–20k">15–20k</option>
                  <option value="20–30k">20–30k</option>
                  <option value="30k+">30k+</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-[#79B900] text-white py-4 rounded-full font-bold text-base hover:bg-[#689e00] transition-colors cursor-pointer shadow-md shadow-[#79B900]/25 mt-2"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
