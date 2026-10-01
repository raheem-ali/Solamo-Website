"use client";

import React, { useEffect, useRef, useState } from "react";
import { Star, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";

export default function SolamoTestimonials() {
  const reviews = [
    {
      name: "Noor Noreen",
      initial: "N",
      bgGradient: "bg-purple-600",
      time: "2 months ago",
      text: "I installed a 10 kW solar system from Solamo Energy, and my experience has been excellent. The system is working perfectly, the pricing was very reasonable compared to the market, and their customer service was outstanding. The team was professional, cooperative, and provided great support throughout the process. Highly recommended!",
    },
    {
      name: "Irrum Shakeel",
      initial: "I",
      bgGradient: "bg-green-700",
      time: "2 months ago",
      text: "Really impressive service.",
    },
    {
      name: "Usmankhan Usmankhan",
      initial: "U",
      bgGradient: "bg-blue-700",
      time: "2 months ago",
      text: "This project has been successfully completed by Solamo Energy with the highest level of professionalism and quality. We are truly satisfied with the outcome, and it is a pleasure to see such outstanding workmanship.",
    },
    {
      name: "MUHAMMED HASNAIN",
      img: "https://lh3.googleusercontent.com/a-/ALV-UjWW2S4JRpAbG7_sWMzcYl_WmViHFnlfT7MH15Q46yW3TiAnT1PP=w40-h40-c-rp-mo-br100",
      time: "2 months ago",
      text: "Me and my clients are very happy with the services specially after sales services. Matlab itna costumer Ka khayal rakhne Ka tareeka bhut Acha hai. Ab main bagair Kisi problem ke inko clients de deta hn apne",
    },
    {
      name: "raheem ali",
      img: "https://lh3.googleusercontent.com/a-/ALV-UjXBFttdWKZ_qsRFBtSXWVMF3yjpX6IruhkXrGkZUzJsyLoMLY1B=w40-h40-c-rp-mo-br100",
      time: "2 months ago",
      text: "I had a great experience with Solamo Energy. From consultation to installation, everything was smooth. The engineers were experts and answered all my questions patiently. System is working perfectly even in Karachi heat.",
    },
  ];

  const carouselReviews = [...reviews, ...reviews];
  const [currentIndex, setCurrentIndex] = useState(reviews.length);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [dragOffset, setDragOffset] = useState(0);

  const touchStartX = useRef<number | null>(null);
  const isDragging = useRef(false);
  const transitionTimeout = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => {
    if (!isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    if (!isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  useEffect(() => {
    if (currentIndex >= reviews.length * 2 - 1) {
      transitionTimeout.current = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(reviews.length);
      }, 600);
    }

    if (currentIndex <= 0) {
      transitionTimeout.current = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(reviews.length);
      }, 600);
    }

    return () => {
      if (transitionTimeout.current) clearTimeout(transitionTimeout.current);
    };
  }, [currentIndex, reviews.length]);

  useEffect(() => {
    if (!isTransitioning) {
      const timeout = setTimeout(() => setIsTransitioning(true), 30);
      return () => clearTimeout(timeout);
    }
  }, [isTransitioning]);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (window.innerWidth > 767) return;
    touchStartX.current = e.touches[0].clientX;
    isDragging.current = true;
    setIsTransitioning(false);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging.current || touchStartX.current === null) return;
    if (window.innerWidth > 767) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - touchStartX.current;
    setDragOffset(diff * 0.85);
  };

  const handleTouchEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const threshold = 60;

    if (dragOffset < -threshold) {
      setDragOffset(0);
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev + 1);
    } else if (dragOffset > threshold) {
      setDragOffset(0);
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev - 1);
    } else {
      setDragOffset(0);
      setIsTransitioning(true);
    }

    touchStartX.current = null;
  };

  return (
    <section className="w-full bg-[#f5f5f5] py-4 sm:py-5 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-3 sm:px-5 lg:px-6">
        <div className="bg-white rounded-lg overflow-hidden">
          {/* =====================================================
              HEADER
          ===================================================== */}
          <div className="px-4 sm:px-6 lg:px-7 pt-5 pb-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#84CC16] flex items-center justify-center shrink-0">
                  <Star className="w-4 h-4 text-black fill-black" />
                </div>

                <div>
                  <h2 className="text-[20px] sm:text-[23px] font-black text-[#111] leading-none">
                    What Our Customers Say
                  </h2>
                  <p className="text-[10px] sm:text-[11px] text-gray-500 mt-1">
                    Real reviews from Solamo Energy installations
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* =====================================================
              CAROUSEL
          ===================================================== */}
          <div className="relative pb-6 px-4 sm:px-6 lg:px-7">
            <div
              className="overflow-hidden touch-pan-y select-none"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onTouchCancel={handleTouchEnd}
            >
              <div
                className={`testimonial-track flex gap-4 ${
                  isTransitioning
                    ? "transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                    : "transition-none"
                }`}
                style={
                  {
                    "--current-index": currentIndex,
                    transform: `translate3d(
                      calc(
                        -1 * var(--current-index) * (var(--card-width) + 16px)
                        + ${dragOffset}px
                      ),
                      0,
                      0
                    )`,
                  } as React.CSSProperties
                }
              >
                {carouselReviews.map((review, index) => (
                  <div
                    key={`${review.name}-${index}`}
                    className="
                      testimonial-card shrink-0 bg-[#fafafa] border border-gray-200
                      p-4 sm:p-5 rounded-lg flex flex-col justify-between
                      min-h-[240px] transition-shadow duration-300 hover:shadow-md
                    "
                  >
                    <div>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2.5 min-w-0">
                          {review.img ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={review.img}
                              alt={review.name}
                              className="w-9 h-9 rounded-full object-cover shrink-0"
                            />
                          ) : (
                            <div
                              className={`w-9 h-9 rounded-full ${review.bgGradient} text-white flex items-center justify-center font-bold text-sm shrink-0`}
                            >
                              {review.initial}
                            </div>
                          )}

                          <div className="min-w-0">
                            <div className="flex items-center gap-1">
                              <h3 className="font-bold text-[12px] text-[#111] line-clamp-1">
                                {review.name}
                              </h3>
                              <CheckCircle2 className="w-3 h-3 text-blue-500 fill-blue-500/10 shrink-0" />
                            </div>
                            <p className="text-[10px] text-gray-500">
                              {review.time}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-0.5 text-amber-400 mb-2.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>

                      <p className="text-gray-600 text-[11px] sm:text-[12px] leading-relaxed line-clamp-4">
                        {review.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* NAVIGATION */}
            <div className="flex items-center justify-end gap-2 mt-4">
              <button
                type="button"
                onClick={prevSlide}
                aria-label="Previous review"
                className="
                  w-9 h-9 rounded-full bg-white border border-gray-200 shadow-md
                  flex items-center justify-center text-gray-700
                  hover:bg-[#84CC16] hover:border-[#84CC16] hover:text-black
                  active:scale-95 transition
                "
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next review"
                className="
                  w-9 h-9 rounded-full bg-white border border-gray-200 shadow-md
                  flex items-center justify-center text-gray-700
                  hover:bg-[#84CC16] hover:border-[#84CC16] hover:text-black
                  active:scale-95 transition
                "
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .testimonial-track {
          will-change: transform;
        }
        .testimonial-card {
          width: var(--card-width);
        }
        :global(:root) {
          --card-width: calc((100% - 48px) / 4);
        }
        @media (max-width: 1023px) {
          .testimonial-track {
            --card-width: calc((100% - 16px) / 2);
          }
        }
        @media (max-width: 767px) {
          .testimonial-track {
            --card-width: 100%;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .testimonial-track {
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}
