"use client";

import React, { useEffect, useRef, useState } from "react";
import { Star, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";

export default function Testimonials() {
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

  /*
   * Duplicate reviews for seamless looping
   */
  const carouselReviews = [...reviews, ...reviews];

  /*
   * Start from second copy
   */
  const [currentIndex, setCurrentIndex] = useState(reviews.length);

  /*
   * Controls smooth CSS transition
   */
  const [isTransitioning, setIsTransitioning] = useState(true);

  /*
   * Finger drag offset on mobile
   */
  const [dragOffset, setDragOffset] = useState(0);

  const touchStartX = useRef<number | null>(null);
  const isDragging = useRef(false);

  const transitionTimeout = useRef<NodeJS.Timeout | null>(null);

  /*
   * NEXT
   */
  const nextSlide = () => {
    if (!isTransitioning) return;

    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  /*
   * PREVIOUS
   */
  const prevSlide = () => {
    if (!isTransitioning) return;

    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  /*
   * Seamless carousel reset
   */
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
      if (transitionTimeout.current) {
        clearTimeout(transitionTimeout.current);
      }
    };
  }, [currentIndex, reviews.length]);

  /*
   * Re-enable transition after instant reset
   */
  useEffect(() => {
    if (!isTransitioning) {
      const timeout = setTimeout(() => {
        setIsTransitioning(true);
      }, 30);

      return () => clearTimeout(timeout);
    }
  }, [isTransitioning]);

  /*
   * ==============================
   * MOBILE TOUCH / SWIPE
   * ==============================
   */

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    /*
     * Only activate swipe behaviour on mobile.
     */
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

    /*
     * Slight resistance makes dragging feel natural.
     */
    setDragOffset(diff * 0.85);
  };

  const handleTouchEnd = () => {
    if (!isDragging.current) return;

    isDragging.current = false;

    const threshold = 60;

    /*
     * Swipe left = next
     */
    if (dragOffset < -threshold) {
      setDragOffset(0);
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev + 1);
    } else if (dragOffset > threshold) {
      /*
       * Swipe right = previous
       */
      setDragOffset(0);
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev - 1);
    } else {
      /*
       * Small drag = snap back
       */
      setDragOffset(0);
      setIsTransitioning(true);
    }

    touchStartX.current = null;
  };

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-[1300px] mx-auto px-6">
        {/* =========================
            HEADER
        ========================= */}
        <div
          className="
            mb-14
            text-center
            md:text-left
          "
        >
          {/* Badge */}
          <div
            className="
    inline-flex
    items-center
    justify-center
    gap-2
    border
    border-gray-300
    rounded-full
    px-4
    py-1.5
    mb-6
    text-sm
    text-[#172217]
    font-medium
  "
          >
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4 text-[#79B900] shrink-0"
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
            OUR TESTIMONIALS
          </div>

          {/* Heading */}
          <h2
            className="
              text-3xl
              sm:text-5xl
              font-bold
              text-[#172217]
              tracking-tight
              text-center
              md:text-left
            "
          >
            See What Our <span className="text-[#79B900]">Clients Say</span>
          </h2>
        </div>

        {/* =========================
            CAROUSEL
        ========================= */}
        <div className="relative overflow-hidden">
          <div
            className="
              overflow-hidden
              touch-pan-y
              select-none
            "
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchEnd}
          >
            <div
              className={`testimonial-track flex gap-6 ${
                isTransitioning
                  ? "transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                  : "transition-none"
              }`}
              style={
                {
                  "--current-index": currentIndex,
                  transform: `translate3d(
                    calc(
                      -1 * var(--current-index) * (var(--card-width) + 24px)
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
                    testimonial-card
                    shrink-0
                    bg-gray-50
                    border
                    border-gray-200/80
                    p-6
                    rounded-2xl
                    shadow-sm
                    flex
                    flex-col
                    justify-between
                    min-h-[280px]
                    transition-shadow
                    duration-300
                    hover:shadow-lg
                  "
                >
                  <div>
                    {/* User Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3 min-w-0">
                        {review.img ? (
                          <img
                            src={review.img}
                            alt={review.name}
                            className="
                              w-11
                              h-11
                              rounded-full
                              object-cover
                              shrink-0
                            "
                          />
                        ) : (
                          <div
                            className={`
                              w-11
                              h-11
                              rounded-full
                              ${review.bgGradient}
                              text-white
                              flex
                              items-center
                              justify-center
                              font-bold
                              text-lg
                              shrink-0
                            `}
                          >
                            {review.initial}
                          </div>
                        )}

                        <div className="min-w-0">
                          <div className="flex items-center gap-1">
                            <h3 className="font-bold text-sm text-[#172217] line-clamp-1">
                              {review.name}
                            </h3>

                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 fill-blue-500/10 shrink-0" />
                          </div>

                          <p className="text-xs text-gray-500">{review.time}</p>
                        </div>
                      </div>

                      {/* Google Icon */}
                      <svg
                        className="w-5 h-5 shrink-0"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fill="#4285F4"
                          d="M23.745 12.27c0-.79-.07-1.54-.19-2.27h-11.3v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"
                        />

                        <path
                          fill="#34A853"
                          d="M12.255 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96h-3.98v3.09C3.515 21.3 7.565 24 12.255 24z"
                        />

                        <path
                          fill="#FBBC05"
                          d="M5.525 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62h-3.98a11.86 11.86 0 000 10.76l3.98-3.09z"
                        />

                        <path
                          fill="#EA4335"
                          d="M12.255 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C18.205 1.19 15.495 0 12.255 0 7.565 0 3.515 2.7 1.545 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"
                        />
                      </svg>
                    </div>

                    {/* Stars */}
                    <div className="flex items-center gap-1 text-amber-400 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>

                    {/* Review */}
                    <p className="text-gray-700 text-sm leading-relaxed line-clamp-4">
                      {review.text}
                    </p>
                  </div>

                  {/* Read More */}
                  {review.text.length > 100 && (
                    <span className="text-xs text-gray-400 font-medium mt-3 block">
                      Read more
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* =========================
              NAVIGATION
          ========================= */}
          <div className="flex items-center justify-end gap-2 mt-8">
            {/* Previous */}
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous review"
              className="
                group
                w-11
                h-11
                rounded-full
                border
                border-gray-300
                flex
                items-center
                justify-center
                text-[#172217]
                hover:bg-[#79B900]
                hover:border-[#79B900]
                hover:text-white
                active:scale-95
                transition-all
                duration-300
              "
            >
              <ChevronLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-0.5" />
            </button>

            {/* Next */}
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next review"
              className="
                group
                w-11
                h-11
                rounded-full
                border
                border-gray-300
                flex
                items-center
                justify-center
                text-[#172217]
                hover:bg-[#79B900]
                hover:border-[#79B900]
                hover:text-white
                active:scale-95
                transition-all
                duration-300
              "
            >
              <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </div>

      {/* =========================
          CAROUSEL CSS
      ========================= */}
      <style jsx>{`
        .testimonial-track {
          will-change: transform;
        }

        .testimonial-card {
          width: var(--card-width);
        }

        /* Desktop - 4 cards */
        :global(:root) {
          --card-width: calc((100% - 72px) / 4);
        }

        /* Tablet - 2 cards */
        @media (max-width: 1023px) {
          .testimonial-track {
            --card-width: calc((100% - 24px) / 2);
          }
        }

        /* Mobile - 1 card */
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
