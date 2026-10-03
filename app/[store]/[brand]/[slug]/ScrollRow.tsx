"use client";

import React, { useRef, useState, useEffect } from "react";

interface ScrollRowProps {
  children: React.ReactNode;
  className?: string;
}

export default function ScrollRow({
  children,
  className = "gap-3",
}: ScrollRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setShowLeft(scrollLeft > 1);
    setShowRight(scrollLeft < scrollWidth - clientWidth - 1);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => checkScroll();
    el.addEventListener("scroll", handleScroll, { passive: true });

    const resizeObserver = new ResizeObserver(() => {
      checkScroll();
    });
    resizeObserver.observe(el);
    if (el.parentElement) {
      resizeObserver.observe(el.parentElement);
    }

    window.addEventListener("resize", checkScroll);

    return () => {
      el.removeEventListener("scroll", handleScroll);
      resizeObserver.disconnect();
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const scrollByAmount = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8;
    el.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative group">
      <div
        ref={scrollRef}
        className={`flex overflow-x-auto pb-0 scrollbar-none snap-x [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${className}`}
      >
        {children}
      </div>

      {showLeft && (
        <button
          type="button"
          aria-label="Scroll left"
          onClick={() => scrollByAmount("left")}
          className="
            hidden
            lg:flex
            absolute
            left-0
            top-1/2
            -translate-y-1/2
            z-10
            h-[48px]
            w-[28px]
            items-center
            justify-center
            rounded-md
            bg-[rgba(209,213,219,0.9)]
            text-[#1f2937]
            shadow-sm
            opacity-0
            group-hover:opacity-100
            transition-opacity
            duration-150
            hover:bg-[rgba(156,163,175,0.95)]
          "
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      )}

      {showRight && (
        <button
          type="button"
          aria-label="Scroll right"
          onClick={() => scrollByAmount("right")}
          className="
            hidden
            lg:flex
            absolute
            right-0
            top-1/2
            -translate-y-1/2
            z-10
            h-[48px]
            w-[28px]
            items-center
            justify-center
            rounded-md
            bg-[rgba(209,213,219,0.9)]
            text-[#1f2937]
            shadow-sm
            opacity-0
            group-hover:opacity-100
            transition-opacity
            duration-150
            hover:bg-[rgba(156,163,175,0.95)]
          "
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
